import { ref as U, inject as kt, provide as Nn, computed as v, toValue as Pt, shallowRef as Nt, watch as $e, onScopeDispose as Os, defineComponent as pe, onBeforeUnmount as Qe, openBlock as f, createElementBlock as m, createElementVNode as y, toDisplayString as A, Fragment as Q, renderList as ce, createCommentVNode as T, unref as E, withKeys as it, withModifiers as Le, normalizeStyle as Re, renderSlot as be, withDirectives as xn, vModelText as Cn, useSlots as Bt, nextTick as Dt, createBlock as re, createTextVNode as Ue, createVNode as ye, withCtx as We, resolveDynamicComponent as Bs, normalizeClass as cn, createSlots as tn, useModel as zt, useId as Ks, mergeModels as un, Comment as rl, Text as ol, onMounted as il, resolveComponent as Vs, getCurrentScope as cl, h as ul } from "vue";
const qs = Symbol("dc.routeAdapter");
function Ge(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function dl() {
  const e = typeof window < "u", t = U(e ? Ge(window.location.search) : ""), n = U(e ? window.location.pathname : "/"), s = () => {
    t.value = Ge(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (l, r) => {
    const o = Ge(l);
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
const Ws = ["list", "cards", "grid", "table", "links", "preview"], kd = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Zt = ["ok", "running", "queued", "review", "failed"], bd = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], $d = [480, 620, 760, 900, 1100], fl = "cards", Mn = "updated";
function Us(e) {
  return typeof e == "string" && Ws.includes(e);
}
const pl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Hs(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function ht(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function js(e, t = {}) {
  const n = ht(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function Xs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Gs(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Xs(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const vl = { key: Mn, label: Mn };
function tt(e, t, n = null) {
  const s = Gs(e, n);
  return (t ? s.find((l) => l.key === t) : void 0) ?? s.find((l) => l.key === Mn) ?? s[0] ?? vl;
}
function Dn(e) {
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
  for (const n of e?.facets ?? []) t[n.key] = Dn(n);
  return t;
}
function Ys(e) {
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
function Qs(e) {
  return Object.values(e).some(Ys);
}
function In(e) {
  return e.entity === null && e.expr.trim() === "" && !Qs(e.facets);
}
function xd(e) {
  return e.entity !== null;
}
function On(e) {
  return e.entity === null && e.view === "cards";
}
function ml(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Bn(e, t = {}) {
  const s = t.landing === "entity" ? js(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && Us(t.view) ? t.view : fl,
    sort: tt(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: It(s),
    page: 1
  };
}
const Zs = ["entity", "sort", "dir", "expr", "facets"];
function ys(e) {
  return Zs.some((t) => t in e);
}
function Js(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : Dn(s);
  }
  return n;
}
function nn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function hl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function vt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function _l(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function gl(e) {
  return String(e + 1).padStart(2, "0");
}
const Sn = "—";
function Oe(e, t) {
  return e.find((n) => n.role === t);
}
function ea(e, t) {
  return e.filter((n) => n.role === t);
}
function yl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const wl = ["id", "entityKey", "entityLabel"];
function De(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (wl.includes(n))
      return t[n];
  }
}
function ws(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function kl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function bl(e, t) {
  if (e == null || e === "") return Sn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? hl(n) : String(e);
  }
  return t === "date" ? _l(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Sn : String(e);
}
function Kt(e, t) {
  const n = De(e, t);
  return e.format ? e.format(n, t) : bl(n, e.kind);
}
function $l(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function ta(e, t) {
  const n = Kt(e, t), s = $l(De(e, t));
  return s && s !== n ? s : n;
}
function sn(e, t) {
  return e ? Kt(e, t) : "";
}
function ks(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const xl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function bs(e) {
  return [xl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function En(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Cl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Ml(e) {
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
function st(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of Ml(t)) {
    const l = a.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const r = Cl.exec(a);
    r && r[3] !== "" ? s.push({
      kind: "field",
      field: r[1].toLowerCase(),
      comparator: r[2],
      value: r[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
const yn = (e) => e.toLowerCase().replace(/\s+/g, ""), Sl = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function El(e, t, n) {
  const s = yn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && yn(u.label) === s
  );
  if (l) return De(l, t);
  const r = n.facets.find((u) => yn(u.label) === s);
  if (r && r.key in t.fields) return t.fields[r.key];
  const o = Sl.find(([u]) => u === s)?.[1];
  if (o) {
    const u = Oe(a, o);
    if (u) return De(u, t);
  }
  const i = /^metric(\d+)$/.exec(s);
  if (i) {
    const u = ea(a, "metric")[Number(i[1]) - 1];
    if (u) return De(u, t);
  }
}
function wn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function Pl(e, t, n) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const i = Oe(r, o), u = i ? De(i, t) : void 0;
      return typeof u == "string" && wn(u, e.value);
    });
  }
  const s = El(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((o) => wn(String(o), e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const r = e.value.toLowerCase();
      return r === "true" || r === "yes" ? s : r === "false" || r === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const r = Number(e.value);
      return Number.isFinite(r) ? s === r : !0;
    }
    return wn(String(s), e.value);
  }
  const a = Number(e.value), l = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(l) ? !0 : Al(e.comparator, l, a);
}
function Al(e, t, n) {
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
function zl(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => Pl(a, t, n))) : !0;
}
function $s(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Vt(e) {
  return e.kind === "text" ? $s(e.value) : `${e.field}${e.comparator}${$s(e.value)}`;
}
function an(e) {
  return e.filter((t) => t.length).map((t) => t.map(Vt).join(" ")).join(" OR ");
}
function Tl(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((l, r) => r !== n) : s).filter((s) => s.length);
}
function Rl(e) {
  const t = st(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(Vt).join(" ")
  };
}
function xs(e, t) {
  return [...e.map(Vt), t.trim()].filter(Boolean).join(" ");
}
const Cs = (e, t) => e.toLowerCase() === t.toLowerCase();
function na(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Cs(e.value, t.value) : t.kind === "text" && Cs(e.value, t.value);
}
function Fl(e, t) {
  return t.filter((n) => !e.some((s) => na(s, n)));
}
function sa(e, t) {
  const n = st(e), s = st(t);
  return n.length ? s.length ? an(
    n.flatMap((a) => s.map((l) => [...a, ...Fl(a, l)]))
  ) : an(n) : an(s);
}
const Ms = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function aa(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ll = 7, Nl = 3;
function Dl(e, t, n, s) {
  const a = (t * Ll + nn(n)) % s, l = [];
  for (let r = 0; r < Math.min(Nl, s); r++)
    l.push(aa(e, (a + r) % s));
  return l;
}
function Il(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ol(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ol(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) a.add((s + l) % e.length);
  return [...a].sort((l, r) => l - r).map((l) => e[l]);
}
function Bl(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: l } = t, r = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${r}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return Zt[n % Zt.length];
    case "updated":
      return l;
    case "tint":
      return Ms[n % Ms.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Zt[n % Zt.length];
    case "date":
      return l;
    default:
      return;
  }
}
function Kl(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const u = l[i % l.length], d = Math.floor(i / l.length), _ = nn(`${s}:${e.key}:${u[0]}:${i}`), w = aa(e.key, i), k = new Date(a.getTime() - _ % 900 * 36e5).toISOString(), b = {};
    for (const C of e.columns ?? []) {
      const g = C.field ?? C.key;
      if (!g || C.value) continue;
      const $ = Bl(C, {
        hash: nn(`${_}:${g}`),
        sample: u,
        revision: d,
        updatedAt: k
      });
      $ !== void 0 && (b[g] = $);
    }
    for (const C of e.facets)
      b[C.key] = Il(C, nn(`${_}:${C.key}`));
    for (const [C, g] of r)
      b[C] = g === e.key ? w : Dl(g, i, C, n);
    o.push({ id: w, entityKey: e.key, entityLabel: e.label, fields: b });
  }
  return o;
}
function Vl(e, t) {
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
function ql(e, t) {
  const n = e.find((r) => r.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", l = s === "date" || n.role === "updated";
  return (r, o) => {
    const i = De(n, r), u = De(n, o);
    return a ? Number(u ?? 0) - Number(i ?? 0) : l ? Date.parse(String(u ?? "")) - Date.parse(String(i ?? "")) : String(u ?? "").localeCompare(String(i ?? ""));
  };
}
function Wl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const l = t.get(s.key);
    if (l) return l;
    const r = e.scopes ?? a.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), o = Kl(s, { ...e, scopes: r });
    return t.set(s.key, o), o;
  };
  return {
    query({ query: s, schema: a, entity: l, limit: r, offset: o }) {
      const i = st(s.expr), u = l ? [l] : a.entities, d = [], _ = [];
      for (const b of u)
        for (const C of n(b, a))
          d.push(C), (l ? Vl(C, s.facets) : !0) && zl(i, C, b) && _.push(C);
      const w = tt(l, s.sort, a), k = _.sort(ql(Xs(l, a), w.key));
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
function Ul(e, t) {
  return la(e, t.id);
}
function la(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Kn(e, t) {
  return Ul(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function ra(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = st(t).flat();
  return s ? st(n).some(
    (l) => l.some((r) => na(r, s))
  ) ? n : `${n} ${t}` : n;
}
function Hl(e, t, n) {
  return ra(t.expr, Kn(e, n));
}
function jl(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const oa = Symbol("dc.shellContext");
function Xl(e) {
  return Nn(oa, e), e;
}
function Ce() {
  const e = kt(oa, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Vn = "e", qn = "v", Wn = "s", Un = "d", Hn = "q", jn = "p", Xn = "f_", ia = "*", Gl = [
  Vn,
  qn,
  Wn,
  Un,
  Hn,
  jn
], Pn = "..", ca = ",", Yl = [
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
function kn(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of Yl) t = t.replace(n, s);
  return t;
}
function Xe(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ua(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), l = a === -1 ? s : s.slice(0, a), r = a === -1 ? "" : s.slice(a + 1);
    n.push([Xe(l), r]);
  }
  return n;
}
function Ql(e) {
  return Gl.includes(e) || e.startsWith(Xn);
}
function Ss(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Zl(e, t) {
  const n = Xe(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(ca).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => s.has(l)) };
    }
    case "range": {
      const s = n.indexOf(Pn), a = (s === -1 ? n : n.slice(0, s)).trim(), l = (s === -1 ? "" : n.slice(s + Pn.length)).trim(), r = a === "" ? null : Number(a), o = l === "" ? null : Number(l);
      let i = r !== null && Number.isFinite(r) ? Ss(r, e.min, e.max) : null, u = o !== null && Number.isFinite(o) ? Ss(o, e.min, e.max) : null;
      return i !== null && u !== null && i > u && ([i, u] = [u, i]), { kind: "range", min: i, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Jl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(ca) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Pn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function er(e, t, n = {}) {
  const s = Bn(t, n), a = new Map(ua(e)), l = a.get(Vn), r = l === void 0 ? s.entity : Xe(l), o = r === ia ? null : ht(t, r), i = a.get(qn), u = i && Us(Xe(i)) ? Xe(i) : s.view, d = a.get(Wn), _ = tt(o, d ? Xe(d) : n.sort, t), w = a.get(Un), k = w ? Xe(w) === "asc" ? "asc" : "desc" : s.dir, b = a.get(Hn), C = a.get(jn), g = C === void 0 ? 1 : Number(Xe(C)), $ = Number.isFinite(g) ? Math.max(1, Math.floor(g)) : 1, R = {};
  for (const D of o?.facets ?? []) {
    const F = a.get(`${Xn}${D.key}`);
    R[D.key] = F === void 0 ? Dn(D) : Zl(D, F);
  }
  return {
    entity: o?.key ?? null,
    view: u,
    sort: _.key,
    dir: k,
    expr: b === void 0 ? "" : Xe(b),
    facets: Js(o, R),
    page: $
  };
}
function Es(e, t, n = {}, s = "") {
  const a = Bn(t, n), l = ht(t, e.entity), r = ua(s).filter(([_]) => !Ql(_)), o = [], i = (_, w) => o.push([_, kn(w)]), u = l?.key ?? null;
  u !== a.entity && i(Vn, u ?? ia), e.view !== a.view && i(qn, e.view), e.sort !== a.sort && i(Wn, e.sort), e.dir !== a.dir && i(Un, e.dir), e.expr.trim() !== "" && i(Hn, e.expr);
  for (const _ of l?.facets ?? []) {
    const w = e.facets[_.key];
    if (!w) continue;
    const k = Jl(w, _);
    k !== null && o.push([`${Xn}${_.key}`, kn(k)]);
  }
  e.page > 1 && i(jn, String(e.page));
  const d = [
    ...r.map(([_, w]) => [kn(_), w]),
    ...o
  ];
  return d.length ? `?${d.map(([_, w]) => w === "" ? _ : `${_}=${w}`).join("&")}` : "";
}
const dn = "entity", Ot = "expr";
function tr(e, t) {
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
function Gn(e, t) {
  const n = [];
  t && n.push({
    id: dn,
    label: `entity:${t.key}`,
    facetKey: dn
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Ys(a) && n.push(...tr(s, a));
  }
  return st(e.expr).forEach((s, a) => {
    s.forEach((l, r) => {
      n.push({
        id: `${Ot}:${a}:${r}`,
        label: Vt(l),
        facetKey: Ot,
        group: a,
        index: r,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {}
      });
    });
  }), n;
}
function nr(e, t, n = null) {
  if (In(e)) {
    const l = tt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const s = Gn(e, t).filter((l) => l.facetKey !== Ot).map((l) => l.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function sr(e) {
  const { adapter: t } = e, n = v(() => Pt(e.schema)), s = v(() => Pt(e.defaults) ?? {}), a = v(() => er(t.search.value, n.value, s.value)), l = v(() => ht(n.value, a.value.entity)), r = v(() => l.value ?? js(n.value, s.value)), o = v(() => Gs(l.value, n.value)), i = v(() => tt(l.value, a.value.sort, n.value)), u = (g, $) => {
    const R = Es(g, n.value, s.value, t.search.value);
    R !== t.search.value && ($ === "push" ? t.push(R) : t.replace(R));
  }, d = () => Pt(e.navigationMode) ?? "push", _ = () => Pt(e.facetNavigationMode) ?? "replace", w = (g, $) => {
    const R = g.page ?? (ys(g) ? 1 : a.value.page);
    u({ ...a.value, ...g, page: R }, $);
  }, k = (g, $) => {
    const R = a.value.facets[g];
    if (!R) return;
    const D = { ...a.value.facets, [g]: $(R) };
    w({ facets: D }, _());
  }, b = (g) => {
    const $ = g === null ? null : ht(n.value, g);
    return ($?.key ?? null) === a.value.entity ? {} : {
      entity: $?.key ?? null,
      sort: tt($, a.value.sort, n.value).key,
      facets: It($)
    };
  }, C = (g) => {
    const $ = b(g);
    Object.keys($).length && w($, d());
  };
  return {
    query: a,
    entity: l,
    focus: r,
    sort: i,
    sorts: o,
    summary: v(() => nr(a.value, l.value, n.value)),
    terms: v(() => Gn(a.value, l.value)),
    isPristine: v(() => In(a.value)),
    isEverything: v(() => a.value.entity === null),
    hasFacets: v(() => Qs(a.value.facets)),
    setEntity: C,
    clearEntity: () => C(null),
    setView(g) {
      w({ view: g }, d());
    },
    setSort(g) {
      w({ sort: tt(l.value, g, n.value).key }, d());
    },
    toggleDirection() {
      w({ dir: a.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(g) {
      w({ expr: g }, d());
    },
    narrow(g, $, R) {
      w({ expr: g, ...b($), ...R ? { view: R } : {} }, d());
    },
    setPage(g, $) {
      w({ page: Math.max(1, Math.floor(g)) }, $ ?? d());
    },
    setFacet(g, $) {
      k(g, () => $);
    },
    toggleChip(g, $) {
      k(g, (R) => R.kind !== "chips" ? R : { kind: "chips", selected: R.selected.includes($) ? R.selected.filter((F) => F !== $) : [...R.selected, $] });
    },
    setRange(g, $, R) {
      k(g, (D) => D.kind === "range" ? { kind: "range", min: $, max: R } : D);
    },
    toggleFlag(g) {
      k(
        g,
        ($) => $.kind === "toggle" ? { kind: "toggle", on: !$.on } : $
      );
    },
    removeTerm(g) {
      if (g.facetKey === dn) {
        C(null);
        return;
      }
      if (g.facetKey === Ot) {
        const $ = Tl(st(a.value.expr), g.group ?? 0, g.index ?? 0);
        w({ expr: an($) }, d());
        return;
      }
      k(g.facetKey, ($) => $.kind === "chips" && g.option ? { kind: "chips", selected: $.selected.filter((R) => R !== g.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      w({ entity: null, expr: "", facets: It(null) }, d());
    },
    reset() {
      u(Bn(n.value, s.value), d());
    },
    hrefFor(g) {
      const $ = { ...a.value, ...g };
      return $.page = g.page ?? (ys(g) ? 1 : a.value.page), $.facets = Js(ht(n.value, $.entity), $.facets), `${t.path.value}${Es($, n.value, s.value, t.search.value)}`;
    }
  };
}
function ar(e) {
  const t = Nt([]), n = U(0), s = U(!1), a = Nt(null);
  let l = 0, r = null;
  const o = v(() => (e.query.value.page - 1) * e.limit.value), i = v(() => ml(n.value, e.limit.value)), u = () => {
    const g = e.query.value, $ = e.within?.value.trim();
    return $ ? { ...g, expr: sa($, g.expr) } : g;
  }, d = (g) => {
    t.value = g.rows, n.value = g.total, a.value = null;
  }, _ = (g) => {
    a.value = g, t.value = [], n.value = 0;
  }, w = (g, $) => {
    let R = !0;
    const D = () => g === l, F = () => {
      R && (R = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return D();
      },
      insert(N, q) {
        if (!D()) return;
        const S = Array.isArray(N) ? N : [N];
        if (!S.length) return;
        F();
        const z = [...t.value];
        z.splice(q ?? z.length, 0, ...S), t.value = $ > 0 ? z.slice(0, $) : z, n.value += S.length;
      },
      set(N) {
        D() && (N.rows && (F(), t.value = $ > 0 ? N.rows.slice(0, $) : N.rows, n.value = N.rows.length), N.total !== void 0 && (n.value = N.total));
      },
      close() {
        D() && (s.value = !1);
      },
      fail(N) {
        D() && (_(N), s.value = !1);
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
        r = R.stream($, w(g, $.limit)) ?? null;
      } catch (F) {
        _(F), s.value = !1;
      }
      return;
    }
    let D;
    try {
      D = R.query($);
    } catch (F) {
      _(F);
      return;
    }
    if (!(D instanceof Promise)) {
      d(D), s.value = !1;
      return;
    }
    s.value = !0, D.then((F) => {
      g === l && d(F);
    }).catch((F) => {
      g === l && _(F);
    }).finally(() => {
      g === l && (s.value = !1);
    });
  }, C = v(() => {
    const g = u();
    return `${JSON.stringify(Zs.map(($) => g[$]))}|${g.page}`;
  });
  return $e([e.source, C, e.schema, e.entity, e.limit], b, {
    immediate: !0
  }), Os(() => {
    l++, k();
  }, !0), { rows: t, total: n, offset: o, pageCount: i, pending: s, error: a, refresh: b };
}
const lr = 25, da = (e, t) => e.toLowerCase() === t.toLowerCase();
function rr(e, t) {
  return e.find((n) => da(n.id, t));
}
function or(e) {
  const t = Nt(/* @__PURE__ */ new Map()), n = (r) => {
    if (r.facetKey !== Ot || !r.field || !r.value) return null;
    const o = jl(e.schema.value, r.field);
    return o ? { entity: o, id: r.value, key: `${o.key}:${r.value}` } : null;
  }, s = (r) => {
    const { entity: o, id: i } = r, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: la(o, i) ?? "",
        facets: It(o),
        sort: tt(o, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: lr,
      offset: 0
    });
  }, a = (r, o) => {
    const i = sn(Oe(r.columns ?? [], "identity"), o);
    return i === Sn || da(i, o.id) ? "" : i;
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
      u.forEach((_, w) => {
        const { reference: k } = o[w], b = rr(_.rows, k.id);
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
const ir = ["data-dc-expanded"], cr = { class: "dc-header__domain" }, ur = {
  key: 0,
  class: "dc-header__within"
}, dr = ["title"], fr = ["data-dc-more", "title"], pr = {
  key: 0,
  class: "dc-header__pick"
}, vr = { class: "dc-header__pick-box" }, mr = ["value"], hr = { value: "" }, _r = ["value"], gr = { class: "dc-header__pick" }, yr = { class: "dc-header__pick-box" }, wr = ["value"], kr = ["value"], br = { class: "dc-header__pick" }, $r = { class: "dc-header__pick-box" }, xr = ["value"], Cr = ["value"], Mr = ["title", "aria-label"], Sr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Er = ["title", "aria-label", "onClick"], Pr = ["aria-expanded", "aria-controls"], Ar = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, zr = { class: "dc-header__sr" }, Tr = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Rr = ["disabled"], Fr = ["title"], Lr = ["value", "onKeydown"], Nr = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Dr = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Ir = ["disabled"], Or = {
  key: 1,
  class: "dc-header__actions"
}, Br = /* @__PURE__ */ pe({
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
    ), o = v(() => l.value.formatCount ?? vt);
    function i(I) {
      return I.key === a.query.value.entity && r.value && !n.hideCount ? o.value(a.total.value) : I.count;
    }
    function u(I) {
      return `${I.label} · ${i(I)}`;
    }
    const d = v(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${o.value(a.total.value)}`), _ = v(() => {
      const I = a.within.value.trim();
      return I ? Gn({ ...a.query.value, expr: I, facets: {} }, null) : [];
    }), w = v(
      () => (n.views ?? [...Ws]).map((I) => ({ key: I, label: pl[I] }))
    ), k = v(() => Hs(a.query.value.view, n.views)), b = v(
      () => !(a.within.value && a.query.value.entity === null && k.value === "cards")
    );
    function C(I) {
      a.setView(I.target.value);
    }
    const g = v(
      () => a.sorts.value.map((I) => ({ key: I.key, label: I.label }))
    ), $ = v(
      () => g.value.length > 0 && a.query.value.entity !== null && !a.within.value
    );
    function R(I) {
      a.setSort(I.target.value);
    }
    const D = v(() => a.query.value.dir === "desc"), F = v(
      () => a.terms.value.filter((I) => I.facetKey !== dn).map((I, K, W) => {
        const ke = W[K - 1];
        return {
          term: I,
          or: ke?.group !== void 0 && I.group !== void 0 && I.group !== ke.group
        };
      })
    ), N = or({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [..._.value, ...a.terms.value])
    });
    function q(I) {
      const K = N.nameOf(I);
      return K ? `${I.field}:${K} (${I.value})` : I.label;
    }
    function S(I) {
      const K = I.target.value;
      a.setEntity(K || null);
    }
    function z(I) {
      I.target?.closest("button, select, label") || s("toggle");
    }
    const te = U(null), se = U("");
    function ue() {
      const I = te.value;
      if (!I) {
        se.value = "";
        return;
      }
      const K = I.scrollLeft > 1, W = I.scrollWidth - I.clientWidth - I.scrollLeft > 1;
      se.value = K && W ? "both" : K ? "start" : W ? "end" : "";
    }
    let G = null;
    $e(
      te,
      (I) => {
        G?.disconnect(), G = null, ue(), !(!I || typeof ResizeObserver > "u") && (G = new ResizeObserver(ue), G.observe(I));
      },
      { flush: "post" }
    ), $e(F, ue, { flush: "post" }), Qe(() => G?.disconnect());
    const ve = v(() => a.query.value.page), Se = v(
      () => (a.pageCount.value > 1 || !!n.pagesNote) && !On(a.query.value)
    ), x = v(
      () => `${a.pending.value ? "~" : ""}${vt(a.pageCount.value)}`
    ), O = v(() => {
      let I = `Page ${vt(ve.value)} of ${x.value}`;
      const K = a.rows.value.length;
      if (K) {
        const W = a.offset.value + 1, ke = `${a.pending.value ? "~" : ""}${vt(a.total.value)}`;
        I += ` — rows ${vt(W)} to ${vt(W + K - 1)} of ${ke}`;
      }
      return n.pagesNote ? `${I}
${n.pagesNote}` : I;
    }), Y = U(null), le = v(() => Y.value ?? String(ve.value)), ge = v(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function ze(I) {
      I.target.select();
    }
    function Ke(I) {
      const K = I.target, W = K.value.replace(/[^0-9]/g, "");
      K.value !== W && (K.value = W), Y.value = W;
    }
    function Ie(I) {
      const K = I.target, W = Number(Y.value);
      Y.value = null;
      const ke = Number.isFinite(W) && W >= 1 ? Math.min(Math.trunc(W), Math.max(1, a.pageCount.value)) : ve.value;
      K.value = String(ke), ke !== ve.value && a.setPage(ke);
    }
    function Ve(I) {
      const K = I.target;
      Y.value = null, K.value = String(ve.value), K.blur();
    }
    return (I, K) => (f(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      y("div", {
        class: "dc-header__trigger",
        onClick: z
      }, [
        y("span", cr, A(l.value.label), 1),
        _.value.length ? (f(), m("span", ur, [
          K[4] || (K[4] = y("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), m(Q, null, ce(_.value, (W) => (f(), m("span", {
            key: `scope:${W.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: q(W)
          }, A(q(W)), 9, dr))), 128))
        ])) : T("", !0),
        y("div", {
          ref_key: "termBar",
          ref: te,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": se.value,
          title: E(a).summary.value,
          onScroll: ue
        }, [
          b.value ? (f(), m("label", pr, [
            K[6] || (K[6] = y("span", { class: "dc-header__sr" }, "Type", -1)),
            y("span", vr, [
              y("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: E(a).query.value.entity ?? "",
                onChange: S
              }, [
                y("option", hr, A(d.value), 1),
                (f(!0), m(Q, null, ce(E(a).entities.value, (W) => (f(), m("option", {
                  key: W.key,
                  value: W.key
                }, A(u(W)), 9, _r))), 128))
              ], 40, mr),
              K[5] || (K[5] = y("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ])) : T("", !0),
          y("label", gr, [
            K[8] || (K[8] = y("span", { class: "dc-header__sr" }, "View", -1)),
            y("span", yr, [
              y("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: k.value,
                onChange: C
              }, [
                (f(!0), m(Q, null, ce(w.value, (W) => (f(), m("option", {
                  key: W.key,
                  value: W.key
                }, A(W.label), 9, kr))), 128))
              ], 40, wr),
              K[7] || (K[7] = y("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          $.value ? (f(), m(Q, { key: 1 }, [
            y("label", br, [
              K[10] || (K[10] = y("span", { class: "dc-header__sr" }, "Sort", -1)),
              y("span", $r, [
                y("select", {
                  class: "dc-header__pick-select dc-header__sort-select dc-mono",
                  value: E(a).sort.value.key,
                  onChange: R
                }, [
                  (f(!0), m(Q, null, ce(g.value, (W) => (f(), m("option", {
                    key: W.key,
                    value: W.key
                  }, A(W.label), 9, Cr))), 128))
                ], 40, xr),
                K[9] || (K[9] = y("span", {
                  class: "dc-header__pick-mark",
                  "aria-hidden": "true"
                }, "▾", -1))
              ])
            ]),
            y("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: D.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${D.value ? "descending" : "ascending"}`,
              onClick: K[0] || (K[0] = (W) => E(a).toggleDirection())
            }, A(D.value ? "↓" : "↑"), 9, Mr)
          ], 64)) : T("", !0),
          (f(!0), m(Q, null, ce(F.value, (W) => (f(), m(Q, {
            key: W.term.id
          }, [
            W.or ? (f(), m("span", Sr, "or")) : T("", !0),
            y("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${q(W.term)}`,
              "aria-label": `Remove ${q(W.term)}`,
              onClick: (ke) => E(a).removeTerm(W.term)
            }, A(q(W.term)), 9, Er)
          ], 64))), 128))
        ], 40, fr),
        y("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: K[1] || (K[1] = (W) => s("toggle"))
        }, [
          y("span", Ar, A(e.expanded ? "▲" : "▼"), 1),
          y("span", zr, A(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Pr)
      ]),
      Se.value ? (f(), m("nav", Tr, [
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: ve.value <= 1,
          onClick: K[2] || (K[2] = (W) => E(a).setPage(ve.value - 1))
        }, [...K[11] || (K[11] = [
          y("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Rr),
        y("span", {
          class: "dc-header__page dc-mono",
          title: O.value
        }, [
          y("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Re({ width: ge.value }),
            value: le.value,
            onFocus: ze,
            onInput: Ke,
            onKeydown: [
              it(Le(Ie, ["prevent"]), ["enter"]),
              it(Le(Ve, ["prevent"]), ["esc"])
            ],
            onBlur: Ie
          }, null, 44, Lr),
          y("span", Nr, "/ " + A(x.value), 1)
        ], 8, Fr),
        y("span", Dr, A(O.value), 1),
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: ve.value >= E(a).pageCount.value,
          onClick: K[3] || (K[3] = (W) => E(a).setPage(ve.value + 1))
        }, [...K[12] || (K[12] = [
          y("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Ir)
      ])) : T("", !0),
      I.$slots.actions ? (f(), m("div", Or, [
        be(I.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ], 8, ir));
  }
}), me = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, fa = /* @__PURE__ */ me(Br, [["__scopeId", "data-v-5c8b485e"]]), Kr = { class: "dc-facet" }, Vr = ["id"], qr = { class: "dc-facet__body" }, Wr = ["aria-labelledby"], Ur = ["aria-pressed", "data-dc-active", "onClick"], Hr = ["aria-labelledby"], jr = ["aria-label", "placeholder", "onKeydown"], Xr = ["aria-label", "placeholder", "onKeydown"], Gr = ["aria-checked"], Yr = { class: "dc-switch__text" }, Qr = ["data-dc-active"], Zr = /* @__PURE__ */ pe({
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
      const w = a.value.has(_) ? n.value.selected.filter((k) => k !== _) : [...n.value.selected, _];
      s("update", { kind: "chips", selected: w });
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
      const w = _.trim();
      if (!w) return null;
      const k = Number(w);
      return Number.isFinite(k) ? k : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const _ = i(r.value), w = i(o.value);
      _ === n.value.min && w === n.value.max || s("update", { kind: "range", min: _, max: w });
    }
    function d() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (_, w) => (f(), m("div", Kr, [
      y("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, A(e.facet.label), 9, Vr),
      y("div", qr, [
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
          }, A(k), 9, Ur))), 128))
        ], 8, Wr)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), m("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          xn(y("input", {
            "onUpdate:modelValue": w[0] || (w[0] = (k) => r.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: it(Le(u, ["prevent"]), ["enter"])
          }, null, 40, jr), [
            [Cn, r.value]
          ]),
          w[2] || (w[2] = y("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          xn(y("input", {
            "onUpdate:modelValue": w[1] || (w[1] = (k) => o.value = k),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: it(Le(u, ["prevent"]), ["enter"])
          }, null, 40, Xr), [
            [Cn, o.value]
          ])
        ], 8, Hr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          y("span", Yr, A(e.facet.text), 1),
          y("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...w[3] || (w[3] = [
            y("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, Qr)
        ], 8, Gr)) : T("", !0)
      ])
    ]));
  }
}), pa = /* @__PURE__ */ me(Zr, [["__scopeId", "data-v-36d1334b"]]), Jr = ["id"], eo = { class: "dc-panel__section dc-panel__rows" }, to = { class: "dc-panel__row" }, no = ["for"], so = ["title", "aria-label", "onClick"], ao = ["id", "placeholder", "onKeydown"], lo = { class: "dc-panel__actions" }, ro = ["disabled"], oo = {
  key: 0,
  class: "dc-panel__section"
}, io = /* @__PURE__ */ pe({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Bt(), a = Ce(), l = v(() => Rl(a.query.value.expr)), r = v(() => l.value.parts.map(Vt)), o = U(l.value.text), i = U(null);
    $e(
      () => l.value.text,
      (C) => {
        o.value = C;
      }
    );
    const u = v(() => o.value !== l.value.text);
    function d() {
      u.value && a.setExpression(xs(l.value.parts, o.value)), n("close");
    }
    function _(C) {
      const { parts: g, text: $ } = l.value;
      a.setExpression(xs(g.filter((R, D) => D !== C), $));
    }
    function w(C) {
      const { parts: g } = l.value;
      o.value || !g.length || (C.preventDefault(), _(g.length - 1));
    }
    function k() {
      o.value = "", a.clearFilters();
    }
    function b(C, g) {
      a.setFacet(C, g);
    }
    return Dt(() => i.value?.focus()), (C, g) => (f(), m("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: g[2] || (g[2] = it(Le(($) => n("close"), ["stop"]), ["esc"]))
    }, [
      y("section", eo, [
        y("div", to, [
          y("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, no),
          y("div", {
            class: "dc-field",
            onMousedown: g[1] || (g[1] = Le(($) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), m(Q, null, ce(r.value, ($, R) => (f(), m("button", {
              key: `${R}:${$}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${$}`,
              "aria-label": `Remove ${$}`,
              onClick: (D) => _(R)
            }, A($), 9, so))), 128)),
            xn(y("input", {
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
                it(Le(d, ["prevent"]), ["enter"]),
                it(w, ["backspace"])
              ]
            }, null, 40, ao), [
              [Cn, o.value]
            ])
          ], 32)
        ]),
        E(a).entity.value ? (f(!0), m(Q, { key: 0 }, ce(E(a).entity.value.facets, ($) => (f(), re(pa, {
          key: $.key,
          facet: $,
          value: E(a).query.value.facets[$.key],
          onUpdate: (R) => b($.key, R)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : T("", !0),
        y("div", lo, [
          y("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          y("button", {
            type: "button",
            class: "dc-button",
            disabled: E(a).isPristine.value && !u.value,
            onClick: k
          }, " Reset ", 8, ro)
        ])
      ]),
      s["panel-section"] ? (f(), m("section", oo, [
        be(C.$slots, "panel-section", {}, void 0, !0)
      ])) : T("", !0)
    ], 40, Jr));
  }
}), va = /* @__PURE__ */ me(io, [["__scopeId", "data-v-2642c02d"]]), co = {
  key: 0,
  class: "dc-actions"
}, uo = {
  key: 0,
  class: "dc-actions__select"
}, fo = { class: "dc-actions__all" }, po = ["checked", "indeterminate"], vo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, mo = { class: "dc-actions__ops" }, ho = ["disabled"], _o = ["disabled"], go = /* @__PURE__ */ pe({
  __name: "RecordActions",
  setup(e) {
    const t = Ce(), n = v(() => t.entity.value), s = v(() => !On(t.query.value)), a = v(() => s.value && t.selectable.value), l = v(
      () => s.value && (a.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), r = v(() => t.selection.value.ids.length), o = v(() => t.rows.value.filter((w) => t.isSelected(w)).length), i = v(
      () => t.rows.value.length > 0 && o.value === t.rows.value.length
    ), u = v(() => o.value > 0 && !i.value), d = v(() => r.value ? `${r.value} selected` : "Select all");
    function _(w) {
      return r.value ? `${w} ${r.value}` : w;
    }
    return (w, k) => l.value ? (f(), m("div", co, [
      a.value ? (f(), m("div", uo, [
        y("label", fo, [
          y("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: i.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: k[0] || (k[0] = (b) => E(t).selectPage(!i.value))
          }, null, 40, po),
          y("span", vo, A(d.value), 1)
        ]),
        r.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: k[1] || (k[1] = (b) => E(t).clearSelection())
        }, " Clear ")) : T("", !0)
      ])) : T("", !0),
      y("div", mo, [
        n.value?.create ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: k[2] || (k[2] = (b) => E(t).create(n.value))
        }, [
          k[5] || (k[5] = y("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ue(" " + A(n.value.create), 1)
        ])) : T("", !0),
        n.value?.duplicate ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !r.value,
          onClick: k[3] || (k[3] = (b) => E(t).duplicate())
        }, A(_(n.value.duplicate)), 9, ho)) : T("", !0),
        n.value?.delete ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !r.value,
          onClick: k[4] || (k[4] = (b) => E(t).delete())
        }, A(_(n.value.delete)), 9, _o)) : T("", !0)
      ])
    ])) : T("", !0);
  }
}), ma = /* @__PURE__ */ me(go, [["__scopeId", "data-v-ca4aca14"]]);
function yo(e, t) {
  if (!e) return null;
  const n = De(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function wo(e, t) {
  const n = Oe(t, "state"), s = Oe(t, "tint");
  return {
    identity: sn(Oe(t, "identity"), e),
    reference: sn(Oe(t, "reference"), e),
    metrics: ea(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Kt(a, e)
    })),
    state: n ? De(n, e) ?? null : null,
    updated: sn(Oe(t, "updated"), e),
    image: yo(Oe(t, "image"), e),
    tint: s ? De(s, e) ?? null : null
  };
}
function ha(e, t, n, s, a = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: kl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: gl(t),
    parts: wo(e, l),
    pinned: s,
    selected: a
  };
}
function $t() {
  const e = Ce(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, s) => ha(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const ko = ["data-dc-status"], bo = /* @__PURE__ */ pe({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, A(e.status), 9, ko));
  }
}), qt = /* @__PURE__ */ me(bo, [["__scopeId", "data-v-23e59fbf"]]), $o = ["title"], xo = { key: 1 }, Co = /* @__PURE__ */ pe({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), a = v(() => t.column.label ?? ""), l = v(() => Kt(t.column, t.entry.row));
    function r(o) {
      o.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
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
    ], 8, $o)) : (f(), m("span", xo, [
      be(o.$slots, "default", {}, () => [
        Ue(A(l.value), 1)
      ], !0)
    ]));
  }
}), Wt = /* @__PURE__ */ me(Co, [["__scopeId", "data-v-3bd0cbdb"]]), Mo = ["data-dc-active", "aria-pressed", "aria-label"], So = /* @__PURE__ */ pe({
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
    }, A(e.pinned ? "★" : "☆"), 9, Mo));
  }
}), Yn = /* @__PURE__ */ me(So, [["__scopeId", "data-v-ef63d763"]]), Eo = ["src"], Po = /* @__PURE__ */ pe({
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
    }, null, 40, Eo)) : T("", !0);
  }
}), Qn = /* @__PURE__ */ me(Po, [["__scopeId", "data-v-afaab300"]]), Ao = ["title", "aria-label"], zo = /* @__PURE__ */ pe({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    );
    function a(l) {
      l.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (l, r) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, Ao)) : T("", !0);
  }
}), Ut = /* @__PURE__ */ me(zo, [["__scopeId", "data-v-e481cf12"]]), To = ["checked", "aria-label"], xt = /* @__PURE__ */ pe({
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
    }, null, 8, To));
  }
}), Ro = { class: "dc-cards" }, Fo = { class: "dc-card__top dc-mono" }, Lo = { class: "dc-card__lead" }, No = {
  key: 1,
  class: "dc-card__entity"
}, Do = { class: "dc-card__top-right" }, Io = ["onClick"], Oo = { class: "dc-card__names" }, Bo = { class: "dc-card__primary" }, Ko = { class: "dc-card__secondary dc-mono" }, Vo = { class: "dc-card__metrics dc-mono" }, qo = {
  key: 0,
  class: "dc-card__date"
}, Wo = /* @__PURE__ */ pe({
  __name: "CardsView",
  setup(e) {
    const t = Ce(), n = $t(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), m("div", Ro, [
      (f(!0), m(Q, null, ce(E(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-card"
      }, [
        y("div", Fo, [
          y("span", Lo, [
            E(t).selectable.value ? (f(), re(xt, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            Ue(" " + A(r.ordinal) + " ", 1),
            s.value ? (f(), m("span", No, A(r.entityLabel), 1)) : T("", !0)
          ]),
          y("span", Do, [
            r.parts.state ? (f(), re(qt, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : T("", !0),
            ye(Ut, { entry: r }, null, 8, ["entry"]),
            E(t).pinnable.value ? (f(), re(Yn, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : T("", !0)
          ])
        ]),
        y("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => E(t).activate(r.row)
        }, [
          r.parts.image ? (f(), re(Qn, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : T("", !0),
          y("span", Oo, [
            y("span", Bo, A(r.parts.identity), 1),
            y("span", Ko, A(r.parts.reference), 1)
          ])
        ], 8, Io),
        y("div", Vo, [
          (f(!0), m(Q, null, ce(r.parts.metrics.slice(0, 2), (o) => (f(), re(Wt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, {
            default: We(() => [
              Ue(A(o.label) + " " + A(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (f(), m("span", qo, A(r.parts.updated), 1)) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), _a = /* @__PURE__ */ me(Wo, [["__scopeId", "data-v-05d69cb4"]]), Uo = { class: "dc-grid" }, Ho = ["onClick"], jo = { class: "dc-tile__scrim" }, Xo = { class: "dc-tile__top dc-mono" }, Go = { class: "dc-tile__chip" }, Yo = { class: "dc-tile__caption" }, Qo = { class: "dc-tile__secondary dc-truncate" }, Zo = { class: "dc-tile__primary" }, Jo = /* @__PURE__ */ pe({
  __name: "GridView",
  setup(e) {
    const t = Ce(), n = $t();
    return (s, a) => (f(), m("div", Uo, [
      (f(!0), m(Q, null, ce(E(n), (l) => (f(), m("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        y("button", {
          type: "button",
          class: "dc-tile",
          style: Re({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => E(t).activate(l.row)
        }, [
          l.parts.image ? (f(), re(Qn, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : T("", !0),
          y("span", jo, [
            y("span", Xo, [
              y("span", Go, A(l.ordinal), 1)
            ]),
            y("span", Yo, [
              y("span", Qo, A(l.parts.reference), 1),
              y("span", Zo, A(l.parts.identity), 1)
            ])
          ])
        ], 12, Ho),
        E(t).selectable.value ? (f(), re(xt, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), ga = /* @__PURE__ */ me(Jo, [["__scopeId", "data-v-c9789911"]]), ei = { class: "dc-links" }, ti = ["onClick"], ni = { class: "dc-link__primary dc-truncate" }, si = { class: "dc-link__secondary dc-mono dc-truncate" }, ai = /* @__PURE__ */ pe({
  __name: "LinksView",
  setup(e) {
    const t = Ce(), n = $t();
    return (s, a) => (f(), m("div", ei, [
      (f(!0), m(Q, null, ce(E(n), (l) => (f(), m("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        E(t).selectable.value ? (f(), re(xt, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        y("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => E(t).activate(l.row)
        }, [
          y("span", ni, A(l.parts.identity), 1),
          y("span", si, A(l.parts.reference), 1)
        ], 8, ti)
      ]))), 128))
    ]));
  }
}), ya = /* @__PURE__ */ me(ai, [["__scopeId", "data-v-cc3a66fa"]]), li = {
  class: "dc-list",
  role: "list"
}, ri = ["onClick"], oi = { class: "dc-list__ordinal dc-mono" }, ii = { class: "dc-list__identity" }, ci = { class: "dc-list__primary dc-truncate" }, ui = { class: "dc-list__secondary dc-mono dc-truncate" }, di = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, fi = { class: "dc-list__metrics dc-mono" }, pi = { class: "dc-list__trailing" }, vi = /* @__PURE__ */ pe({
  __name: "ListView",
  setup(e) {
    const t = Ce(), n = $t(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), m("div", li, [
      (f(!0), m(Q, null, ce(E(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        E(t).selectable.value ? (f(), re(xt, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        y("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => E(t).activate(r.row)
        }, [
          y("span", oi, A(r.ordinal), 1),
          y("span", ii, [
            y("span", ci, A(r.parts.identity), 1),
            y("span", ui, A(r.parts.reference), 1)
          ])
        ], 8, ri),
        s.value ? (f(), m("span", di, A(r.entityLabel), 1)) : T("", !0),
        y("span", fi, [
          (f(!0), m(Q, null, ce(r.parts.metrics.slice(0, 2), (o) => (f(), re(Wt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        y("span", pi, [
          r.parts.state ? (f(), re(qt, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : T("", !0),
          ye(Ut, { entry: r }, null, 8, ["entry"]),
          E(t).pinnable.value ? (f(), re(Yn, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), An = /* @__PURE__ */ me(vi, [["__scopeId", "data-v-6c92ff27"]]), mi = { class: "dc-preview" }, hi = { class: "dc-preview__pager dc-mono" }, _i = ["disabled"], gi = { "aria-live": "polite" }, yi = ["disabled"], wi = {
  key: 0,
  class: "dc-preview__card"
}, ki = { class: "dc-preview__body" }, bi = { class: "dc-preview__top" }, $i = { class: "dc-preview__badges" }, xi = { class: "dc-preview__entity dc-mono" }, Ci = { class: "dc-preview__marks" }, Mi = { class: "dc-preview__primary" }, Si = { class: "dc-preview__secondary dc-mono" }, Ei = { class: "dc-preview__fields" }, Pi = { class: "dc-preview__key" }, Ai = { class: "dc-preview__value dc-mono" }, zi = /* @__PURE__ */ pe({
  __name: "PreviewView",
  setup(e) {
    const t = Ce(), n = $t(), s = U(0);
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
    return (i, u) => (f(), m("div", mi, [
      y("div", hi, [
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (d) => o(-1))
        }, " ‹ ", 8, _i),
        y("span", gi, A(r.value), 1),
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= E(n).length - 1,
          onClick: u[1] || (u[1] = (d) => o(1))
        }, " › ", 8, yi)
      ]),
      a.value ? (f(), m("div", wi, [
        y("div", {
          class: "dc-preview__media",
          style: Re({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        y("div", ki, [
          y("div", bi, [
            y("span", $i, [
              E(t).selectable.value ? (f(), re(xt, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              a.value.parts.state ? (f(), re(qt, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              y("span", xi, A(a.value.entityLabel), 1)
            ]),
            y("span", Ci, [
              ye(Ut, { entry: a.value }, null, 8, ["entry"]),
              E(t).pinnable.value ? (f(), re(Yn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          y("div", null, [
            y("div", Mi, A(a.value.parts.identity), 1),
            y("div", Si, A(a.value.parts.reference), 1)
          ]),
          y("dl", Ei, [
            (f(!0), m(Q, null, ce(l.value, (d) => (f(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              y("dt", Pi, A(d.key), 1),
              y("dd", Ai, [
                d.column && a.value ? (f(), re(Wt, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), m(Q, { key: 1 }, [
                  Ue(A(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          y("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (d) => E(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : T("", !0)
    ]));
  }
}), wa = /* @__PURE__ */ me(zi, [["__scopeId", "data-v-a236412c"]]);
function Ti() {
  const e = Ce();
  return v(() => yl(e.schema.value, e.entity.value));
}
const Ri = ["title"], Fi = {
  key: 5,
  class: "dc-cell__text"
}, Li = /* @__PURE__ */ pe({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = v(() => t.column.kind ?? "text"), a = v(() => De(t.column, t.entry.row)), l = v(
      () => s.value === "ordinal" ? t.entry.ordinal : Kt(t.column, t.entry.row)
    ), r = v(() => a.value), o = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => En(t.column)), u = v(() => ta(t.column, t.entry.row));
    function d(_) {
      o.value && (_.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (_, w) => s.value === "component" && e.column.component ? (f(), re(Bs(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (f(), re(qt, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : s.value === "image" ? (f(), re(Qn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof a.value == "string" ? a.value : "",
      style: Re({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), re(Wt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), m("button", {
      key: 4,
      type: "button",
      class: cn(["dc-table__open", { "dc-truncate": i.value }]),
      title: u.value,
      onClick: d
    }, A(l.value), 11, Ri)) : (f(), m("span", Fi, A(l.value), 1));
  }
}), Ps = /* @__PURE__ */ me(Li, [["__scopeId", "data-v-d746be44"]]), Ni = {
  key: 0,
  class: "dc-table__none"
}, Di = { class: "dc-table__detail" }, Ii = ["data-dc-wrap"], Oi = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Bi = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Ki = ["onClick"], Vi = ["onClick"], qi = {
  key: 0,
  class: "dc-table__pick"
}, Wi = ["data-dc-align", "data-dc-hide", "title"], Ui = {
  key: 0,
  class: "dc-table__name"
}, Hi = /* @__PURE__ */ pe({
  __name: "TableView",
  setup(e) {
    const t = Ce(), n = $t(), s = Ti(), a = v(
      () => s.value.some((w) => w.kind === "image" || w.height !== void 0)
    );
    function l(w) {
      w && (t.query.value.sort === w ? t.toggleDirection() : t.setSort(w));
    }
    const r = v(() => t.entity.value?.label ?? "The result set"), o = v(() => new Set(t.sorts.value.map((w) => w.key))), i = (w) => w.sort !== void 0 && o.value.has(w.sort), u = (w) => {
      if (i(w))
        return t.query.value.sort !== w.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function d(w) {
      return [
        bs(w),
        w.muted ? "dc-table__muted" : "",
        w.mono ? "dc-mono" : "",
        En(w) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function _(w, k) {
      if (!(!En(w) || w.activate || w.click))
        return ta(w, k.row);
    }
    return (w, k) => E(s).length ? (f(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": a.value ? "" : void 0
    }, [
      y("thead", null, [
        y("tr", null, [
          E(t).selectable.value ? (f(), m("th", Oi, [...k[3] || (k[3] = [
            y("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : T("", !0),
          (f(!0), m(Q, null, ce(E(s), (b, C) => (f(), m("th", {
            key: E(ws)(b, C),
            scope: "col",
            class: cn(E(bs)(b)),
            style: Re({ width: b.width }),
            "data-dc-align": E(ks)(b),
            "data-dc-hide": b.hideBelow,
            "aria-sort": u(b),
            title: b.hint
          }, [
            i(b) ? (f(), m("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (g) => l(b.sort)
            }, A(b.label), 9, Ki)) : (f(), m(Q, { key: 1 }, [
              Ue(A(b.label), 1)
            ], 64))
          ], 14, Bi))), 128))
        ])
      ]),
      y("tbody", null, [
        (f(!0), m(Q, null, ce(E(n), (b) => (f(), m("tr", {
          key: b.key,
          class: "dc-table__row",
          onClick: (C) => E(t).activate(b.row)
        }, [
          E(t).selectable.value ? (f(), m("td", qi, [
            ye(xt, {
              row: b.row,
              selected: b.selected,
              name: b.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          (f(!0), m(Q, null, ce(E(s), (C, g) => (f(), m("td", {
            key: E(ws)(C, g),
            class: cn(d(C)),
            "data-dc-align": E(ks)(C),
            "data-dc-hide": C.hideBelow,
            title: _(C, b)
          }, [
            C.scope ? (f(), m("span", Ui, [
              ye(Ps, {
                column: C,
                entry: b
              }, null, 8, ["column", "entry"]),
              ye(Ut, { entry: b }, null, 8, ["entry"])
            ])) : (f(), re(Ps, {
              key: 1,
              column: C,
              entry: b
            }, null, 8, ["column", "entry"]))
          ], 10, Wi))), 128))
        ], 8, Vi))), 128))
      ])
    ], 8, Ii)) : (f(), m("p", Ni, [
      k[2] || (k[2] = y("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      y("span", Di, [
        Ue(A(r.value) + " has no ", 1),
        k[0] || (k[0] = y("code", null, "columns", -1)),
        k[1] || (k[1] = Ue(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ka = /* @__PURE__ */ me(Hi, [["__scopeId", "data-v-cb4433f9"]]);
function ji(e) {
  const t = Nt([]), n = U(!1), s = Nt(null);
  let a = 0;
  const l = (i, u, d, _, w) => ({
    entity: i,
    rows: u.rows.map(
      (k, b) => ha(k, b, i, e.isPinned(k.id))
    ),
    total: u.total,
    count: d ? i.count : String(u.total),
    pinned: Xi(_, u, w)
  }), r = () => {
    const i = ++a, u = e.query.value, d = e.schema.value, _ = e.entities.value, w = e.limit.value, k = e.within?.value.trim() ?? "", b = In(u) && !k, C = k ? sa(k, u.expr) : u.expr, g = _.map(($) => ({
      entity: $,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: $.key, expr: C, facets: It($), page: 1 },
        schema: d,
        entity: $,
        limit: w,
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
        (R, D) => l(g[D].entity, R, b, d, C)
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
function Xi(e, t, n) {
  const s = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !s)
    return !1;
  const a = n.trim();
  if (!a)
    return !1;
  const l = Kn(e, s);
  return !!l && ra(a, l) === a;
}
const Gi = ["data-dc-pending"], Yi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Qi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Zi = {
  key: 2,
  class: "dc-types__state"
}, Ji = ["data-dc-empty"], ec = ["onClick"], tc = { class: "dc-type__name" }, nc = { class: "dc-type__count dc-mono" }, sc = { class: "dc-type__sr" }, ac = {
  key: 0,
  class: "dc-type__empty"
}, lc = ["onClick"], rc = { class: "dc-type__identity" }, oc = { class: "dc-type__primary dc-truncate" }, ic = { class: "dc-type__secondary dc-mono dc-truncate" }, cc = { class: "dc-type__trailing dc-mono" }, uc = { class: "dc-type__metric-value" }, dc = { class: "dc-type__metric-label" }, fc = {
  key: 0,
  class: "dc-type__date"
}, pc = ["onClick"], vc = /* @__PURE__ */ pe({
  __name: "TypeCardsView",
  setup(e) {
    const t = Ce(), { previews: n, pending: s, error: a } = ji({
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
      E(a) ? (f(), m("p", Yi, " Could not load results: " + A(E(a) instanceof Error ? E(a).message : "the data source failed."), 1)) : !r.value.length && E(s) ? (f(), m("p", Qi, " Running query… ")) : r.value.length ? T("", !0) : (f(), m("p", Zi, A(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), m(Q, null, ce(r.value, (u) => (f(), m("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.rows.length ? "false" : "true"
      }, [
        y("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => E(t).setEntity(u.entity.key)
        }, [
          y("span", tc, A(u.entity.label), 1),
          y("span", nc, A(u.count), 1),
          i[0] || (i[0] = y("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          y("span", sc, "Show only " + A(u.entity.label.toLowerCase()), 1)
        ], 8, ec),
        u.rows.length ? T("", !0) : (f(), m("p", ac, A(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), m(Q, null, ce(u.rows, (d) => (f(), m("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          y("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (_) => E(t).activate(d.row)
          }, [
            y("span", rc, [
              y("span", oc, A(d.parts.identity), 1),
              y("span", ic, A(d.parts.reference), 1)
            ])
          ], 8, lc),
          y("span", cc, [
            (f(!0), m(Q, null, ce(d.parts.metrics.slice(0, 1), (_) => (f(), re(Wt, {
              key: _.column.key ?? _.label,
              class: "dc-type__metric",
              entry: d,
              column: _.column
            }, {
              default: We(() => [
                y("span", uc, A(_.text), 1),
                y("span", dc, A(_.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), m("span", fc, A(d.parts.updated), 1)) : T("", !0),
            ye(Ut, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => E(t).create(u.entity)
        }, [
          i[1] || (i[1] = y("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ue(" " + A(u.entity.create), 1)
        ], 8, pc)) : T("", !0)
      ], 8, Ji))), 128)),
      be(o.$slots, "after", {}, void 0, !0)
    ], 8, Gi));
  }
}), ba = /* @__PURE__ */ me(vc, [["__scopeId", "data-v-4e45be99"]]), mc = ["data-dc-pending"], hc = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, _c = { class: "dc-results__detail" }, gc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, yc = {
  key: 3,
  class: "dc-results__state"
}, wc = { class: "dc-results__detail" }, kc = /* @__PURE__ */ pe({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = Ce(), s = Bt(), a = {
      list: An,
      cards: _a,
      grid: ga,
      table: ka,
      links: ya,
      preview: wa
    }, l = v(() => On(n.query.value)), r = v(() => Hs(n.query.value.view, t.views)), o = v(() => a[r.value] ?? An), i = v(() => n.rows.value.length > 0), u = v(() => n.error.value !== null), d = U(null);
    return $e(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (_, w) => (f(), m("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": E(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), re(ba, { key: 0 }, tn({ _: 2 }, [
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
      ]), 1024)) : u.value ? (f(), m("p", hc, [
        w[1] || (w[1] = y("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        y("span", _c, A(E(n).error.value instanceof Error ? E(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && E(n).pending.value ? (f(), m("p", gc, [...w[2] || (w[2] = [
        y("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), re(Bs(o.value), { key: 4 })) : (f(), m("div", yc, [
        w[3] || (w[3] = y("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        y("span", wc, A(E(n).summary.value), 1),
        E(n).isPristine.value ? T("", !0) : (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: w[0] || (w[0] = (k) => E(n).clearFilters())
        }, A(E(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, mc));
  }
}), $a = /* @__PURE__ */ me(kc, [["__scopeId", "data-v-41f54508"]]), bc = ["data-dc-theme"], $c = ["data-dc-width", "data-dc-align"], xc = { class: "dc-shell__panel" }, Cc = /* @__PURE__ */ pe({
  __name: "DataShell",
  props: /* @__PURE__ */ un({
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
  emits: /* @__PURE__ */ un(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = zt(e, "open"), r = zt(e, "pinned"), o = zt(e, "selected"), i = Bt(), u = kt(qs, null), d = s.route || u ? null : dl(), _ = s.route ?? u ?? d;
    Qe(() => d?.dispose?.());
    const w = v(() => Wl({ seed: s.schema.key })), k = v(() => s.source ?? w.value), b = sr({
      schema: () => s.schema,
      adapter: _,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), C = v(() => s.within?.trim() ?? ""), g = ar({
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
    const $ = Ks() ?? "dc-query-panel", R = U(null);
    function D() {
      l.value && (l.value = !1, Dt(() => {
        R.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const F = v(() => new Set(r.value));
    function N(x) {
      const O = new Set(F.value);
      O.has(x.id) ? O.delete(x.id) : O.add(x.id), r.value = [...O], a("toggle-pin", x);
    }
    const q = v(() => {
      if (s.selectable === !0) return !0;
      const x = b.entity.value;
      return !!(x?.duplicate || x?.delete);
    }), S = v(() => new Set(o.value));
    function z(x) {
      const O = new Set(S.value);
      O.has(x.id) ? O.delete(x.id) : O.add(x.id), o.value = [...O];
    }
    function te(x) {
      const O = new Set(S.value);
      for (const Y of g.rows.value)
        x ? O.add(Y.id) : O.delete(Y.id);
      o.value = [...O];
    }
    function se() {
      o.value.length && (o.value = []);
    }
    const ue = v(() => ({
      ids: [...o.value],
      rows: g.rows.value.filter((x) => S.value.has(x.id)),
      entity: b.entity.value
    }));
    $e(() => b.query.value.entity, se);
    function G(x, O) {
      b.narrow(
        Hl(s.schema, b.query.value, x),
        O?.key ?? null,
        O ? void 0 : "cards"
      ), a("drill", x, O);
    }
    const ve = Xl({
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
      isPinned: (x) => F.value.has(x.id),
      isPinnedId: (x) => F.value.has(x),
      togglePin: N,
      selectable: q,
      selection: ue,
      isSelected: (x) => S.value.has(x.id),
      toggleSelect: z,
      selectPage: te,
      clearSelection: se,
      narrowsOnPress: v(() => s.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (x) => {
        if (s.rowPress === "narrow" && Kn(s.schema, x)) {
          G(x, null);
          return;
        }
        a("activate", x);
      },
      create: (x) => a("create", x),
      duplicate: () => a("duplicate", ue.value),
      delete: () => a("delete", ue.value),
      drill: G
    }), Se = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: b.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: D
    }), (x, O) => (f(), m("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Re(Se.value)
    }, [
      y("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ye(fa, {
          ref_key: "headerRef",
          ref: R,
          expanded: l.value,
          "panel-id": E($),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: O[0] || (O[0] = (Y) => l.value = !l.value)
        }, tn({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: We(() => [
              be(x.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), m(Q, { key: 0 }, [
          y("div", {
            class: "dc-shell__scrim",
            onClick: D
          }),
          y("div", xc, [
            ye(va, {
              "panel-id": E($),
              onClose: D
            }, tn({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: We(() => [
                  be(x.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : T("", !0)
      ], 8, $c),
      ye(ma),
      be(x.$slots, "results", {
        rows: E(ve).rows.value,
        total: E(ve).total.value,
        offset: E(ve).offset.value,
        pageCount: E(ve).pageCount.value,
        query: E(ve).query.value,
        pending: E(ve).pending.value
      }, () => [
        ye($a, { views: e.views }, tn({ _: 2 }, [
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
    ], 12, bc));
  }
}), Mc = /* @__PURE__ */ me(Cc, [["__scopeId", "data-v-6beb9a87"]]), Sc = ["data-dc-muted"], Ec = {
  key: 0,
  class: "dc-shell-card__head"
}, Pc = { class: "dc-shell-card__title" }, Ac = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, zc = {
  key: 0,
  class: "dc-shell-card__aside"
}, Tc = ["data-dc-flush"], Rc = {
  key: 2,
  class: "dc-shell-card__foot"
}, Fc = /* @__PURE__ */ pe({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), s = Bt();
    function a(d) {
      return l(d?.() ?? []);
    }
    function l(d) {
      return d.some((_) => _.type === rl ? !1 : _.type === ol ? String(_.children ?? "").trim().length > 0 : _.type === Q ? l(_.children ?? []) : !0);
    }
    const r = v(() => !!t.title || o.value || a(s.head)), o = v(() => a(s.aside)), i = v(() => a(s.default)), u = v(() => a(s.foot));
    return (d, _) => (f(), m("section", {
      class: "dc-shell-card",
      style: Re(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      r.value ? (f(), m("header", Ec, [
        be(d.$slots, "head", {}, () => [
          y("h2", Pc, A(e.title), 1),
          e.count !== void 0 ? (f(), m("span", Ac, A(e.count), 1)) : T("", !0)
        ], !0),
        o.value ? (f(), m("span", zc, [
          be(d.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ])) : T("", !0),
      i.value ? (f(), m("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        be(d.$slots, "default", {}, void 0, !0)
      ], 8, Tc)) : T("", !0),
      u.value ? (f(), m("footer", Rc, [
        be(d.$slots, "foot", {}, void 0, !0)
      ])) : T("", !0)
    ], 12, Sc));
  }
}), Cd = /* @__PURE__ */ me(Fc, [["__scopeId", "data-v-75f2ef0b"]]), Lc = ["aria-label"], Nc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Dc = /* @__PURE__ */ pe({
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
        class: cn(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": i.key === e.modelValue,
        "data-dc-active": i.key === e.modelValue ? "true" : "false",
        tabindex: i.key === e.modelValue ? 0 : -1,
        onClick: (d) => s("update:modelValue", i.key),
        onKeydown: (d) => l(d, u)
      }, A(i.label), 43, Nc))), 128))
    ], 8, Lc));
  }
}), Ic = /* @__PURE__ */ me(Dc, [["__scopeId", "data-v-63fb5482"]]), Tt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Oc = ["aria-label"], Bc = ["role", "aria-label"], Kc = ["data-dc-item"], Vc = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, qc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Wc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Uc = { class: "dc-menu__label dc-truncate" }, Hc = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, jc = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Xc = /* @__PURE__ */ pe({
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
      () => s.items.flatMap((S, z) => Tt(S) ? [z] : [])
    ), w = v(() => {
      const S = [{ entries: [] }];
      return s.items.forEach((z, te) => {
        z.heading ? S.push({ heading: z, entries: [] }) : S[S.length - 1]?.entries.push({ item: z, index: te });
      }), S.filter((z) => z.entries.length > 0);
    }), k = U({ x: s.at.x, y: s.at.y });
    async function b() {
      k.value = { x: s.at.x, y: s.at.y }, await Dt();
      const S = l.value?.getBoundingClientRect();
      if (!S) return;
      const z = 8;
      let te = s.at.x, se = s.at.y;
      if (te + S.width > window.innerWidth - z) {
        const ue = s.at.mirrorX === void 0 ? null : s.at.mirrorX - S.width;
        te = ue !== null && ue >= z ? ue : window.innerWidth - S.width - z;
      }
      se + S.height > window.innerHeight - z && (se = window.innerHeight - S.height - z), k.value = { x: Math.max(z, te), y: Math.max(z, se) };
    }
    const C = v(() => ({ left: `${k.value.x}px`, top: `${k.value.y}px` }));
    function g(S) {
      o.value = S, S !== null && Dt(() => r.value[S]?.focus());
    }
    function $(S, z) {
      const te = _.value;
      if (te.length === 0) return null;
      if (S === null) return z === 1 ? te[0] ?? null : te[te.length - 1] ?? null;
      const se = te.indexOf(S);
      return se === -1 ? te[0] ?? null : te[(se + z + te.length) % te.length] ?? null;
    }
    function R(S, z) {
      if (!s.items[S]?.items?.length) return;
      const se = r.value[S]?.getBoundingClientRect(), ue = l.value?.getBoundingClientRect();
      !se || !ue || (u.value = { x: ue.right - 4, y: se.top - 4, mirrorX: ue.left + 4 }, i.value = S, d.value = z);
    }
    function D(S) {
      const z = i.value;
      i.value = null, u.value = null, S && z !== null && g(z);
    }
    function F(S) {
      const z = s.items[S];
      if (!(!z || !Tt(z))) {
        if (z.items?.length) {
          R(S, !0);
          return;
        }
        a("choose", z);
      }
    }
    function N(S) {
      const z = S.key;
      if (z === "Escape") {
        S.preventDefault(), S.stopPropagation(), i.value !== null ? D(!0) : a("dismiss");
        return;
      }
      if (z === "ArrowDown" || z === "ArrowUp") {
        S.preventDefault(), S.stopPropagation(), D(!1), g($(o.value, z === "ArrowDown" ? 1 : -1));
        return;
      }
      if (z === "Home" || z === "End") {
        S.preventDefault(), S.stopPropagation(), D(!1), g($(null, z === "Home" ? 1 : -1));
        return;
      }
      if (z === "ArrowRight") {
        const te = o.value;
        te !== null && s.items[te]?.items?.length && (S.preventDefault(), S.stopPropagation(), R(te, !0));
        return;
      }
      if (z === "ArrowLeft") {
        i.value !== null && (S.preventDefault(), S.stopPropagation(), D(!0));
        return;
      }
      if (z === "Enter" || z === " ") {
        const te = o.value;
        if (te === null) return;
        S.preventDefault(), S.stopPropagation(), F(te);
      }
    }
    function q(S) {
      const z = s.items[S];
      !z || !Tt(z) || (i.value !== null && i.value !== S && D(!1), g(S), z.items?.length && R(S, !1));
    }
    return il(() => {
      b(), s.autofocus && g($(null, 1));
    }), $e(() => s.at, b, { deep: !0 }), $e(() => s.items, () => void b(), { deep: !0 }), Qe(() => {
      i.value = null;
    }), t({ root: l }), (S, z) => {
      const te = Vs("MenuList", !0);
      return f(), m("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Re(C.value),
        onKeydown: N
      }, [
        (f(!0), m(Q, null, ce(w.value, (se, ue) => (f(), m("div", {
          key: `${ue}-${se.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: se.heading ? "group" : "none",
          "aria-label": se.heading?.label
        }, [
          se.heading ? (f(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": se.heading.id
          }, A(se.heading.label), 9, Kc)) : T("", !0),
          (f(!0), m(Q, null, ce(se.entries, ({ item: G, index: ve }) => (f(), m(Q, {
            key: G.id ?? `${ve}-${G.label ?? ""}`
          }, [
            G.separator ? (f(), m("div", Vc)) : (f(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (Se) => {
                Se && (r.value[ve] = Se);
              },
              type: "button",
              class: "dc-menu__item",
              role: G.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": G.checked === void 0 ? void 0 : G.checked,
              "aria-haspopup": G.items?.length ? "menu" : void 0,
              "aria-expanded": G.items?.length ? i.value === ve : void 0,
              "aria-disabled": G.disabled ? "true" : void 0,
              disabled: G.disabled,
              "data-dc-item": G.id,
              tabindex: "-1",
              onClick: (Se) => F(ve),
              onMouseenter: (Se) => q(ve)
            }, [
              y("span", Wc, A(G.checked ? "✓" : ""), 1),
              y("span", Uc, A(G.label), 1),
              G.shortcut ? (f(), m("span", Hc, A(G.shortcut), 1)) : G.items?.length ? (f(), m("span", jc, "›")) : T("", !0)
            ], 40, qc))
          ], 64))), 128))
        ], 8, Bc))), 128)),
        i.value !== null && u.value ? (f(), re(te, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: u.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: z[0] || (z[0] = (se) => a("choose", se)),
          onDismiss: z[1] || (z[1] = (se) => D(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
      ], 44, Oc);
    };
  }
}), xa = /* @__PURE__ */ me(Xc, [["__scopeId", "data-v-9b1413fa"]]), Gc = ["data-dc-theme", "aria-label"], Yc = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Qc = /* @__PURE__ */ pe({
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
      () => n.menus.flatMap((F, N) => Tt(F) ? [N] : [])
    );
    function _(F, N) {
      const q = r.value[F]?.getBoundingClientRect(), S = n.menus[F];
      !q || !S || !Tt(S) || (i.value = { x: q.left, y: q.bottom + 2, mirrorX: q.right }, o.value = F, u.value = N);
    }
    function w(F) {
      const N = o.value;
      o.value = null, i.value = null, F && N !== null && r.value[N]?.focus();
    }
    function k(F) {
      o.value === F ? w(!0) : _(F, !1);
    }
    function b(F) {
      o.value === null || o.value === F || _(F, !1);
    }
    function C(F, N) {
      const q = d.value;
      if (q.length === 0) return null;
      if (F === null) return N === 1 ? q[0] ?? null : q[q.length - 1] ?? null;
      const S = q.indexOf(F);
      return S === -1 ? q[0] ?? null : q[(S + N + q.length) % q.length] ?? null;
    }
    function g(F) {
      const N = F.key;
      if (N === "Escape") {
        if (o.value === null) return;
        F.preventDefault(), w(!0);
        return;
      }
      if (N === "ArrowDown" && o.value === null) {
        const z = $();
        if (z === null) return;
        F.preventDefault(), _(z, !0);
        return;
      }
      if (N !== "ArrowLeft" && N !== "ArrowRight") return;
      const q = o.value ?? $(), S = C(q, N === "ArrowRight" ? 1 : -1);
      S !== null && (F.preventDefault(), o.value !== null ? _(S, !0) : r.value[S]?.focus());
    }
    function $() {
      const F = r.value.findIndex((N) => N === document.activeElement);
      return F === -1 ? d.value[0] ?? null : F;
    }
    function R(F) {
      const N = F.target;
      !N || l.value?.contains(N) || w(!1);
    }
    $e(o, (F) => {
      F !== null ? window.addEventListener("pointerdown", R, !0) : window.removeEventListener("pointerdown", R, !0);
    }), Qe(() => window.removeEventListener("pointerdown", R, !0));
    function D(F) {
      w(!0), F.action?.(), a("choose", F);
    }
    return (F, N) => (f(), m("div", {
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
        ref: (z) => {
          z && (r.value[S] = z);
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
        onClick: (z) => k(S),
        onMouseenter: (z) => b(S)
      }, A(q.label), 41, Yc))), 128)),
      o.value !== null && i.value ? (f(), re(xa, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: u.value,
        onChoose: D,
        onDismiss: N[0] || (N[0] = (q) => w(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 44, Gc));
  }
}), Md = /* @__PURE__ */ me(Qc, [["__scopeId", "data-v-93dbd2e4"]]), Zc = ["aria-label", "aria-expanded", "disabled"], Jc = { "aria-hidden": "true" }, eu = /* @__PURE__ */ pe({
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
    function w(b) {
      const C = b.target;
      C && (s.value?.contains(C) || a.value?.root?.contains(C) || u(!1));
    }
    $e(o, (b) => {
      b ? window.addEventListener("pointerdown", w, !0) : window.removeEventListener("pointerdown", w, !0);
    }), Qe(() => window.removeEventListener("pointerdown", w, !0));
    function k(b) {
      u(!0), b.action?.(), n("choose", b);
    }
    return (b, C) => (f(), m(Q, null, [
      y("button", {
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
        y("span", Jc, A(e.glyph), 1)
      ], 40, Zc),
      l.value ? (f(), re(xa, {
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
}), Zn = /* @__PURE__ */ me(eu, [["__scopeId", "data-v-48f5ada5"]]), Ct = (e) => e.kind === "split", j = (e) => e.kind === "group", ee = (e) => e.kind === "float", ct = { x: 16, y: 16, w: 360, h: 260 }, fn = 28, Ca = 120, zn = 220, Ma = 38, mt = 6;
function Ht(e, t) {
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
function Sd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const he = (e) => typeof e == "string", Jn = (e) => he(e) ? He(e) : e, jt = (e) => he(e) ? [e] : Ze(e), As = (e) => e.panels.filter(he), tu = (e) => e.panels.filter((t) => !he(t)), Ne = (e, t) => e.panels.includes(t);
function Xt(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (he(l) || !oe(l, t)) return l;
    const r = n(l);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, panels: a } : e;
}
function vn(e, t) {
  return { node: e, rect: { ...ct, ...t } };
}
function es(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function ts(e, t) {
  const n = { ...ct, ...t };
  return es(
    e.map(
      (s, a) => vn(s, {
        ...n,
        x: n.x + a * fn,
        y: n.y + a * fn
      })
    )
  );
}
function ns(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const ss = (e, t, n) => ns("row", e, t, n), Ed = (e, t, n) => ns("column", e, t, n);
function we(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ft = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Pd = (e) => ({ ...e, headless: !0 }), Ad = (e) => ({ ...e, fixedView: !0 }), nu = (e) => e === "left" || e === "right" ? "row" : "column";
function Ze(e) {
  return j(e) ? e.panels.flatMap(jt) : ee(e) ? e.frames.flatMap((t) => Ze(t.node)) : e.children.flatMap(Ze);
}
function oe(e, t) {
  return j(e) ? e.panels.some((n) => he(n) ? n === t : oe(n, t)) : ee(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const Sa = (e) => Ze(e).length === 0, Tn = (e) => !j(e) && ft(e), Rn = (e) => Sa(e) && !Tn(e);
function mn(e) {
  return Ct(e) ? e.children.map((t, n) => ({ node: t, index: n })) : ee(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => he(t) ? [] : [{ node: t, index: n }]);
}
const as = (e) => mn(e).map((t) => t.node);
function pt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => he(s) ? s === t : oe(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Ea(e) {
  const t = e.panels[pt(e)];
  return t !== void 0 && he(t) ? t : "";
}
function Ae(e) {
  if (he(e)) return e;
  if (j(e)) {
    const n = e.panels[pt(e)];
    return n === void 0 ? "" : Ae(n);
  }
  if (ee(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Ae(n.node) : "";
  }
  const t = e.children[0];
  return t ? Ae(t) : "";
}
function _t(e, t) {
  if (j(e) && Ne(e, t)) return e;
  for (const n of as(e)) {
    const s = _t(n, t);
    if (s) return s;
  }
  return null;
}
function su(e) {
  const t = as(e).flatMap(su);
  return j(e) ? [e, ...t] : t;
}
function Me(e, t) {
  if (j(e)) {
    for (const n of tu(e)) {
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
function bn(e, t, n = Ca) {
  const s = (o, i) => i > 0 ? Math.max(Math.min(o, i), Math.min(n, i)) : Math.max(o, n), a = s(e.w, t.w), l = s(e.h, t.h), r = (o, i, u) => Math.min(Math.max(o, 0), Math.max(u - i, 0));
  return {
    x: Math.round(r(e.x, a, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(a),
    h: Math.round(l)
  };
}
function zs(e, t, n, s, a = Ca) {
  let { x: l, y: r, w: o, h: i } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + s), t.includes("n") && (i = e.h - s, r = e.y + s), o < a && (t.includes("w") && (l = e.x + e.w - a), o = a), i < a && (t.includes("n") && (r = e.y + e.h - a), i = a), { x: l, y: r, w: o, h: i };
}
const Pa = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function gt(e, t, n) {
  if (j(e)) return Xt(e, t, (l) => gt(l, t, n));
  if (ee(e)) {
    let l = !1;
    const r = e.frames.map((o) => {
      if (!oe(o.node, t)) return o;
      if (Me(o.node, t)) {
        const u = gt(o.node, t, n);
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
    const r = gt(l, t, n);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, children: a } : e;
}
function au(e, t, n) {
  return gt(e, t, (s) => Pa(s.rect, n) ? s : { ...s, rect: n });
}
const et = (e) => e.maximized === !0, Aa = (e) => (t) => {
  if (et(t) === e) return t;
  if (e) {
    const { minimized: a, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function lu(e, t, n = !0) {
  return gt(e, t, Aa(n));
}
function zd(e, t) {
  const n = Me(e, t);
  return n ? lu(e, t, !et(n)) : e;
}
const ot = (e) => e.minimized === !0, za = (e) => (t) => {
  if (ot(t) === e) return t;
  if (e) {
    const { maximized: a, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function ru(e, t, n = !0) {
  return gt(e, t, za(n));
}
function Td(e, t) {
  const n = Me(e, t);
  return n ? ru(e, t, !ot(n)) : e;
}
function rt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = nt(e, t.slice(0, -1));
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
  for (const { node: n, index: s } of mn(e)) {
    if (!oe(n, t)) continue;
    const a = Fn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function ls(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), l = nt(e, a);
  if (!l || !ee(l)) return e;
  const r = l.frames[s];
  if (!r) return e;
  const o = n(r);
  if (o === r) return e;
  const i = [...l.frames];
  return i[s] = o, dt(e, a, { ...l, frames: i });
}
function Ts(e, t, n) {
  return ls(
    e,
    t,
    (s) => Pa(s.rect, n) ? s : { ...s, rect: n }
  );
}
function ou(e, t, n = !0) {
  return ls(e, t, Aa(n));
}
function iu(e, t, n = !0) {
  return ls(e, t, za(n));
}
function Rt(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (ee(e)) {
    const r = e.frames[n];
    if (!r) return e;
    const o = Rt(r.node, s), i = o === r.node ? r : { ...r, node: o };
    if (n === e.frames.length - 1 && i === r) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(i), { ...e, frames: u };
  }
  const a = nt(e, [n]);
  if (!a) return e;
  const l = Rt(a, s);
  return l === a ? e : dt(e, [n], l);
}
function cu(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (ee(s) && (n[l] = s.frames.length - 1), s = nt(s, [a]));
  }), n;
}
function ln(e, t, n, s) {
  if (j(e)) return Xt(e, n, (r) => ln(r, t, n, s));
  if (ee(e)) {
    const r = e.frames.findIndex((i) => oe(i.node, n)), o = e.frames[r];
    if (!o) return e;
    if (Me(o.node, n)) {
      const i = ln(o.node, t, n, s);
      if (i === o.node) return e;
      const u = [...e.frames];
      return u[r] = { ...o, node: i }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, vn(He(t), s)] };
  }
  if (!oe(e, n)) return e;
  let a = !1;
  const l = e.children.map((r) => {
    const o = ln(r, t, n, s);
    return o !== r && (a = !0), o;
  });
  return a ? { ...e, children: l } : e;
}
function Rs(e, t, n, s) {
  if (t === n || !oe(e, t) || !oe(e, n) || !Me(e, n)) return e;
  const a = ut(e, t);
  if (!a) return e;
  const l = ln(a, t, n, s);
  return l === a ? e : xe(l);
}
function uu(e, t, n) {
  return ee(e) ? { ...e, frames: [...e.frames, vn(He(t), n)] } : j(e) ? Ra(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, He(t)],
    sizes: [...Ye(e), 1],
    ...we(e)
  };
}
function Ta(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return uu(e, t, s);
  const l = n.slice(1), r = (d, _) => _ === a ? Ta(d, t, l, s) : ut(d, t);
  if (ee(e)) {
    const d = e.frames.flatMap((_, w) => {
      const k = r(_.node, w);
      return k ? [k === _.node ? _ : { ..._, node: k }] : [];
    });
    return { ...e, frames: d };
  }
  if (j(e)) {
    const d = pt(e), _ = [];
    e.panels.forEach((b, C) => {
      if (he(b)) {
        b !== t && _.push(b);
        return;
      }
      const g = r(b, C);
      g && _.push(g);
    });
    const k = e.active && _.some((b) => jt(b).includes(e.active)) ? e.active : Ae(_[d] ?? _[_.length - 1]);
    return {
      kind: "group",
      panels: _,
      ...k ? { active: k } : {},
      ...we(e)
    };
  }
  const o = Ye(e), i = [], u = [];
  return e.children.forEach((d, _) => {
    const w = r(d, _);
    w && (i.push(w), u.push(o[_] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: u, ...we(e) };
}
function Fs(e, t, n, s) {
  const a = nt(e, n);
  return !a || !Sa(a) || !oe(e, t) ? e : xe(Ta(e, t, n, s));
}
function $n(e, t) {
  if (j(e)) return Xt(e, t, (a) => $n(a, t));
  if (ee(e)) {
    const a = e.frames.findIndex((u) => oe(u.node, t)), l = e.frames[a];
    if (!l) return e;
    const r = $n(l.node, t), o = r === l.node ? l : { ...l, node: r };
    if (a === e.frames.length - 1 && o === l) return e;
    const i = [...e.frames];
    return i.splice(a, 1), i.push(o), { ...e, frames: i };
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = $n(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function rs(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), a = s.reduce((l, r) => l + r, 0);
  return a <= 0 ? n() : s.map((l) => l / a);
}
const Ye = (e) => rs(e.children.length, e.sizes), Be = (e) => {
  const t = j(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function xe(e) {
  if (j(e)) return du(e);
  if (ee(e)) {
    const o = e.frames.flatMap((i) => {
      const u = xe(i.node);
      return Rn(u) ? [] : [u === i.node ? i : { ...i, node: u }];
    });
    return o.length === e.frames.length && o.every((i, u) => i === e.frames[u]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = Ye(e), n = Be(e), s = [], a = [], l = [];
  e.children.forEach((o, i) => {
    const u = xe(o), d = t[i] ?? 0;
    if (Rn(u)) return;
    if (!n && Ct(u) && u.direction === e.direction && !Be(u) && !ft(u)) {
      const w = Ye(u);
      u.children.forEach((k, b) => {
        s.push(k), a.push(d * (w[b] ?? 0));
      });
      return;
    }
    s.push(u), a.push(d);
    const _ = n?.[i];
    _ && l.push(_);
  });
  const r = s[0];
  return s.length === 1 && r && !ft(e) ? r : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: rs(s.length, a),
    ...we(e),
    ...l.length === s.length && l.length > 0 ? { places: l } : {}
  };
}
function du(e) {
  if (e.panels.every(he)) return e;
  const t = Ae(e), n = Be(e), s = [], a = [];
  e.panels.forEach((o, i) => {
    const u = n?.[i];
    if (he(o)) {
      s.push(o), u && a.push(u);
      return;
    }
    const d = xe(o);
    if (!Rn(d)) {
      if (j(d) && !ft(d) && !Be(d)) {
        s.push(...d.panels);
        return;
      }
      s.push(d), u && a.push(u);
    }
  });
  const l = s[0];
  if (s.length === 1 && l !== void 0 && !he(l) && !ft(e))
    return l;
  if (s.length === e.panels.length && s.every((o, i) => o === e.panels[i]))
    return e;
  const r = t && s.some((o) => jt(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...r ? { active: r } : {},
    ...we(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function ut(e, t) {
  if (ee(e)) {
    const r = e.frames.flatMap((o) => {
      const i = ut(o.node, t);
      return i ? [i === o.node ? o : { ...o, node: i }] : [];
    });
    return r.length === 0 && !Tn(e) ? null : { ...e, frames: r };
  }
  if (j(e)) {
    if (!oe(e, t)) return e;
    const r = pt(e), o = [];
    for (const d of e.panels) {
      if (he(d)) {
        d !== t && o.push(d);
        continue;
      }
      const _ = ut(d, t);
      _ && o.push(_);
    }
    if (o.length === 0) return null;
    const u = e.active && o.some((d) => jt(d).includes(e.active)) ? e.active : Ae(o[r] ?? o[o.length - 1]);
    return u ? { kind: "group", panels: o, active: u, ...we(e) } : { kind: "group", panels: o, ...we(e) };
  }
  const n = Ye(e), s = [], a = [];
  if (e.children.forEach((r, o) => {
    const i = ut(r, t);
    i && (s.push(i), a.push(n[o] ?? 0));
  }), s.length === 0)
    return Tn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ...we(e) } : null;
  const l = s[0];
  return s.length === 1 && l && !ft(e) ? l : xe({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ...we(e)
  });
}
function Ra(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ...we(e) };
}
function At(e, t, n, s, a) {
  const l = (k) => Ht(
    k,
    (b) => oe(b, n) ? At(b, t, n, s, a) : b
  );
  if (s === "float") return e;
  const r = (k) => Xt(k, n, (b) => At(b, t, n, s, a));
  if (s === "center")
    return j(e) ? Ne(e, n) ? Ra(e, t, a) : r(e) : ee(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (k) => oe(k, n) ? At(k, t, n, s, a) : k
      )
    };
  const o = nu(s), i = s === "left" || s === "top", u = (k) => ({
    kind: "split",
    direction: o,
    children: i ? [He(t), k] : [k, He(t)],
    sizes: [0.5, 0.5]
  });
  if (j(e)) return Ne(e, n) ? u(e) : r(e);
  if (ee(e)) return l(e);
  const d = Ye(e), _ = e.children.findIndex(
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
  const w = e.children.map((k) => oe(k, n) ? j(k) && Ne(k, n) ? u(k) : At(k, t, n, s) : k);
  return {
    kind: "split",
    direction: e.direction,
    children: w,
    sizes: d,
    ...we(e)
  };
}
function yt(e, t) {
  if (j(e)) {
    if (Ne(e, t))
      return Ea(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((i) => !he(i) && oe(i, t)), l = e.panels[a];
    if (l === void 0 || he(l)) return e;
    const r = yt(l, t);
    if (r === l && e.active === t) return e;
    const o = [...e.panels];
    return o[a] = r, { ...e, panels: o, active: t };
  }
  if (!oe(e, t)) return e;
  if (ee(e)) return Ht(e, (a) => yt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const l = yt(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Ft(e, t, n) {
  if (j(e)) {
    if (!Ne(e, t)) return Xt(e, t, (u) => Ft(u, t, n));
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
  return oe(e, t) ? ee(e) ? Ht(e, (s) => Ft(s, t, n)) : { ...e, children: e.children.map((s) => Ft(s, t, n)) } : e;
}
function rn(e, t, n) {
  if (t === n) return e;
  if (j(e)) {
    if (!oe(e, t) && !oe(e, n)) return e;
    const s = (l) => l === t ? n : l === n ? t : l, a = e.panels.map((l) => he(l) ? s(l) : rn(l, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return ee(e) ? Ht(e, (s) => rn(s, t, n)) : { ...e, children: e.children.map((s) => rn(s, t, n)) };
}
function Jt(e, t, n, s, a) {
  if (s === "float" || !oe(e, t) || !oe(e, n)) return e;
  const l = _t(e, t);
  if (s === "center" && l && Ne(l, n)) {
    if (a === void 0) return e;
    const o = l.panels.indexOf(t), i = a > o ? a - 1 : a;
    return i === o ? e : yt(Ft(e, t, i), t);
  }
  if (t === n) return e;
  const r = ut(e, t);
  return r ? xe(At(r, t, n, s, a)) : e;
}
function Fa(e, t, n) {
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
function Gt(e, t, n) {
  const s = mn(e);
  if (!j(e) && s.some(({ node: a }) => j(a) && Ne(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!oe(a, t)) continue;
    const r = Gt(a, t, n);
    return r ? Fa(e, l, r) : null;
  }
  return null;
}
function Rd(e, t, n) {
  const s = Gt(
    e,
    t,
    (a) => Ct(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? xe(s) : e;
}
function La(e) {
  return ee(e) ? [e] : Be(e) || ft(e) ? [e] : j(e) ? [...e.panels] : e.children.flatMap(La);
}
function Na(e, t) {
  if (j(e)) return e;
  const n = as(e).map(La), s = n.flat(), a = t && s.some((r) => jt(r).includes(t)) ? t : void 0, l = fu(e, n);
  return xe({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ...we(e),
    ...l ? { places: l } : {}
  });
}
function fu(e, t) {
  const n = ee(e) ? e.frames.map(({ node: s, ...a }) => a) : Be(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function pu(e, t) {
  const n = Gt(e, t, (s) => Na(s, t));
  return n ? xe(n) : e;
}
function os(e, t, n) {
  if (j(e) && Ne(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of mn(e)) {
    if (!oe(s, t)) continue;
    const l = os(s, t, n);
    return l ? Fa(e, a, l) : null;
  }
  return null;
}
function Ls(e, t, n) {
  const s = os(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const l = Be(a);
    return {
      ...ns(n, a.panels.map(Jn)),
      ...we(a),
      ...l ? { places: l } : {}
    };
  });
  return s ? xe(s) : e;
}
function Ln(e, t) {
  if (j(e)) return e;
  if (ee(e)) {
    const a = e.frames.findIndex(
      (o) => j(o.node) && o.node.panels.includes(t)
    ), l = e.frames[a], r = l && j(l.node) ? l.node : null;
    if (l && r && r.panels.length > 1) {
      const o = ts(r.panels.map(Jn), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...o, ...e.frames.slice(a + 1)]
      };
    }
    return Ht(e, (o) => Ln(o, t));
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = Ln(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function vu(e, t, n) {
  const s = _t(e, t);
  if (!s || s.panels.length < 2) return e;
  if (Me(e, t)?.node === s) {
    const r = Ln(e, t);
    return r === e ? e : xe(r);
  }
  const l = os(e, t, (r) => ({
    ...es(Da(r.panels.map(Jn), Be(r), n)),
    ...we(r)
  }));
  return l ? xe(l) : e;
}
function Da(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : ts(e, n).frames;
}
function Ia(e, t) {
  return { ...es(Da(e.children, Be(e), t)), ...we(e) };
}
function Fd(e, t, n) {
  const s = Gt(
    e,
    t,
    (a) => ee(a) ? a : Ia(a, n)
  );
  return s ? xe(s) : j(e) && Ne(e, t) ? ts([e], n) : e;
}
function mu(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function Oa(e, t) {
  const n = mu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ...we(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Ld(e, t, n = "row") {
  const s = Gt(
    e,
    t,
    (a) => ee(a) ? Oa(a, n) : a
  );
  return s ? xe(s) : e;
}
function Ba(e) {
  if (ee(e)) return null;
  const t = j(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || he(t) || j(t) && t.panels.length === 1 && he(t.panels[0]) ? null : t;
}
const hu = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function _u(e, t) {
  const n = Ba(e);
  return n ? t === "inner" ? n : { ...hu(n), ...we(e) } : e;
}
function bt(e) {
  return e.title ? e.title : j(e) ? "" : ee(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Lt(e, t) {
  if (j(e)) {
    const s = e.panels[pt(e)];
    return s === void 0 ? "" : he(s) ? t(s) ?? s : bt(s) || Lt(s, t);
  }
  if (e.title) return e.title;
  if (ee(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? Lt(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? Lt(n, t) : "";
}
function nt(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (Ct(n)) n = n.children[s];
    else if (ee(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || he(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function dt(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (ee(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const u = dt(i.node, a, n);
    if (u === i.node) return e;
    const d = [...e.frames];
    return d[s] = { ...i, node: u }, { ...e, frames: d };
  }
  if (j(e)) {
    const i = e.panels[s];
    if (i === void 0 || he(i)) return e;
    const u = dt(i, a, n);
    if (u === i) return e;
    const d = [...e.panels];
    return d[s] = u, { ...e, panels: d };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = dt(l, a, n);
  if (r === l) return e;
  const o = [...e.children];
  return o[s] = r, { ...e, children: o };
}
function on(e, t, n) {
  if (t.length === 0)
    return Ct(e) ? { ...e, sizes: rs(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (ee(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const i = on(o.node, a, n);
    if (i === o.node) return e;
    const u = [...e.frames];
    return u[s] = { ...o, node: i }, { ...e, frames: u };
  }
  if (j(e)) {
    const o = e.panels[s];
    if (o === void 0 || he(o)) return e;
    const i = on(o, a, n);
    if (i === o) return e;
    const u = [...e.panels];
    return u[s] = i, { ...e, panels: u };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = [...e.children];
  return r[s] = on(l, a, n), { ...e, children: r };
}
function Ns(e, t, n, s = 0.02) {
  const a = e[t], l = e[t + 1];
  if (a === void 0 || l === void 0) return e;
  const r = a + l;
  if (r < s * 2) return e;
  const o = [...e], i = Math.min(Math.max(a + n, s), r - s);
  return o[t] = i, o[t + 1] = r - i, o;
}
function pn(e) {
  if (!j(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !he(t) ? e : { ...ss([gu(e)]), ...we(e) };
}
const gu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ds(e) {
  return e.length === 0 ? null : ss(e.map(He));
}
function yu(e, t) {
  if (!e) return Ds(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const i of Ze(e))
    !n.has(i) || s.has(i) ? a.add(i) : s.add(i);
  let l = e;
  for (const i of a)
    l = l ? ut(l, i) : null;
  const r = new Set(l ? Ze(l) : []), o = t.filter((i) => !r.has(i));
  if (o.length === 0) return l ? pn(xe(l)) : null;
  if (!l) return Ds(o);
  if (ee(l)) {
    const i = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...o.map(
          (u, d) => vn(He(u), {
            x: ct.x + (i + d) * fn,
            y: ct.y + (i + d) * fn
          })
        )
      ]
    };
  }
  return pn(xe(ss([l, ...o.map(He)])));
}
const is = Symbol("dc.windowContext");
function wu(e) {
  return Nn(is, e), e;
}
function cs() {
  const e = kt(is, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const ku = ["data-dc-glyph"], bu = { class: "dc-glyph__line" }, $u = ["d"], xu = {
  key: 0,
  class: "dc-glyph__aqua"
}, Cu = ["d"], Mu = /* @__PURE__ */ pe({
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
      y("g", bu, [
        (f(!0), m(Q, null, ce(t[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, $u))), 128))
      ]),
      n[e.kind] ? (f(), m("g", xu, [
        (f(!0), m(Q, null, ce(n[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, Cu))), 128))
      ])) : T("", !0)
    ], 8, ku));
  }
}), wt = /* @__PURE__ */ me(Mu, [["__scopeId", "data-v-4d2872c0"]]), Su = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Eu = ["data-dc-movable"], Pu = { class: "dc-float__title dc-truncate" }, Au = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, zu = ["aria-label", "aria-pressed", "data-dc-minimize"], Tu = ["aria-label", "aria-pressed", "data-dc-maximize"], Ru = ["aria-label", "data-dc-close"], Fu = { class: "dc-float__content" }, Lu = ["data-dc-handle", "onPointerdown"], Nu = /* @__PURE__ */ pe({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = cs(), s = v(() => Ae(t.frame.node)), a = v(() => n.panelFor(s.value)?.fixed === !0), l = v(() => et(t.frame)), r = v(() => ot(t.frame)), o = v(() => l.value || r.value), i = v(() => n.resizable.value && !a.value && !o.value), u = v(() => n.movable.value && !a.value && !o.value), d = v(() => {
      const N = Ze(t.frame.node);
      return N.length === 1 ? N[0] ?? null : null;
    }), _ = v(() => d.value !== null && n.closable(d.value)), w = v(() => t.frame.node.headless === !0), k = v(
      () => !w.value && (!j(t.frame.node) || r.value)
    ), b = v(
      () => t.frame.title || bt(t.frame.node) || Lt(t.frame.node, (N) => n.panelFor(N)?.title)
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
    }), D = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : r.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${zn}px`,
        height: `${Ma}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), F = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (N, q) => (f(), m("div", {
      class: "dc-float",
      style: Re(D.value),
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
        y("span", Pu, A(b.value), 1),
        C.value.length ? (f(), re(Zn, {
          key: 0,
          items: C.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : T("", !0),
        !a.value || r.value && _.value && d.value ? (f(), m("div", Au, [
          a.value ? T("", !0) : (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": s.value,
            onClick: q[0] || (q[0] = (S) => E(n).toggleMinimizeAt(e.path))
          }, [
            ye(wt, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, zu)),
          a.value ? T("", !0) : (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: q[1] || (q[1] = (S) => E(n).toggleMaximizeAt(e.path))
          }, [
            ye(wt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Tu)),
          r.value && _.value && d.value ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${b.value}`,
            "data-dc-close": d.value,
            onClick: q[2] || (q[2] = (S) => E(n).close(d.value))
          }, [
            ye(wt, { kind: "close" })
          ], 8, Ru)) : T("", !0)
        ])) : T("", !0)
      ], 40, Eu)) : T("", !0),
      y("div", Fu, [
        be(N.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), m(Q, null, ce(i.value ? F : [], (S) => (f(), m("span", {
        key: S,
        class: "dc-float__grip",
        "data-dc-handle": S,
        "aria-hidden": "true",
        onPointerdown: Le((z) => E(n).beginFrameDragAt(e.path, z, S), ["stop"])
      }, null, 40, Lu))), 128))
    ], 44, Su));
  }
}), Du = /* @__PURE__ */ me(Nu, [["__scopeId", "data-v-f035684c"]]), us = Symbol("dc.paneContext");
function Iu(e) {
  return Nn(us, e), e;
}
function Nd() {
  return kt(us, null);
}
function Dd(e) {
  const t = kt(is, null), n = kt(us, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Pt(e)
  );
  return cl() && Os(s), s;
}
const Ou = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Bu = ["data-dc-movable"], Ku = ["aria-label", "aria-pressed"], Vu = ["data-dc-space-name"], qu = { class: "dc-truncate" }, Wu = ["aria-label"], Uu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Hu = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], ju = { class: "dc-tab__name dc-truncate" }, Xu = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Gu = ["aria-label", "data-dc-close", "onClick"], Yu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Qu = { class: "dc-pane__tools" }, Zu = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Ju = ["aria-label", "data-dc-minimize"], ed = ["aria-label", "aria-pressed", "data-dc-maximize"], td = ["aria-label", "data-dc-close"], nd = ["id", "role", "aria-labelledby"], sd = ["id", "role", "aria-labelledby"], ad = ["data-dc-edge"], ld = /* @__PURE__ */ pe({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = cs(), s = Ks() ?? "dc-pane", a = v(
      () => t.group.panels.flatMap((B, H) => {
        if (!he(B)) {
          const Te = bt(B) || Lt(B, (Ee) => n.panelFor(Ee)?.title);
          return [{ kind: "space", index: H, id: `space-${H}`, title: Te, node: B }];
        }
        const ne = n.panelFor(B);
        return ne ? [{ kind: "panel", index: H, id: B, title: ne.title, panel: ne }] : [];
      })
    ), l = v(() => a.value.length > 1), r = v(() => {
      const B = pt(t.group);
      return a.value.find((H) => H.index === B) ?? a.value[0] ?? null;
    }), o = v(() => r.value?.kind === "space" ? r.value.node : null), i = v(() => o.value ? "" : Ea(t.group)), u = v(() => o.value ? null : n.panelFor(i.value)), d = v(() => r.value?.title ?? ""), _ = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), w = v(() => [...t.path, r.value?.index ?? 0]), k = v(() => i.value || As(t.group)[0] || ""), b = v(() => n.viewFor(i.value)), C = v(() => t.group.headless === !0), g = v(() => n.focused.value === i.value), $ = v(() => n.dragging.value === i.value), R = v(() => n.moving.value === i.value), D = v(() => n.frameOf(k.value) !== null), F = v(() => n.panelFor(k.value)?.fixed === !0), N = v(
      () => !o.value && (n.canMove(i.value) || D.value && n.movable.value && !F.value)
    ), q = v(
      () => o.value ? n.spaceMenu(w.value) : n.menuFor(i.value)
    ), S = (B) => n.closable(B);
    Iu({ panel: i });
    const z = v(() => n.maximized(k.value)), te = v(
      () => D.value && !F.value || !l.value && !!u.value && S(u.value.id)
    ), se = (B) => `${s}-tab-${B}`, ue = v(() => `${s}-body`), G = v(() => {
      const B = n.dropTarget.value;
      return !B || !Ne(t.group, B.panel) || B.edge === "float" ? null : B;
    }), ve = v(() => G.value?.index === void 0 ? G.value?.edge ?? null : null), Se = v(() => G.value?.index ?? null), x = () => u.value ? n.renderContent(u.value, b.value, g.value) ?? null : null, O = () => u.value ? n.renderActions(u.value, b.value, g.value) ?? null : null;
    let Y = null;
    function le(B) {
      const H = Y !== null && Math.hypot(B.clientX - Y.x, B.clientY - Y.y) >= 4;
      return Y = null, H;
    }
    const ge = (B) => B.kind === "panel" ? B.id : Ae(B.node);
    function ze(B, H) {
      H.kind !== "space" && (n.focus(H.id), Y = { x: B.clientX, y: B.clientY }, n.beginDrag(H.id, B));
    }
    function Ke(B, H) {
      if (le(B)) return;
      const ne = ge(H);
      ne && n.selectPanel(ne);
    }
    function Ie(B) {
      i.value && n.focus(i.value), !B.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (D.value ? n.beginFrameDrag(k.value, B, "move") : n.beginDrag(i.value, B));
    }
    function Ve(B) {
      Y = { x: B.clientX, y: B.clientY }, n.beginDrag(i.value, B);
    }
    function I(B) {
      le(B) || n.toggleMoveMode(i.value);
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
      H && (B.preventDefault(), D.value ? n.nudgeFrame(i.value, H, B.shiftKey) : n.nudge(i.value, H, B.shiftKey));
    }
    function ke(B) {
      !D.value || B.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(k.value);
    }
    function Mt(B, H) {
      B.stopPropagation(), Y = null, n.close(H);
    }
    function Yt(B, H) {
      const ne = a.value.length;
      let Te = null;
      if (B.key === "ArrowRight" ? Te = (H + 1) % ne : B.key === "ArrowLeft" ? Te = (H - 1 + ne) % ne : B.key === "Home" ? Te = 0 : B.key === "End" && (Te = ne - 1), Te === null) return;
      B.preventDefault();
      const Ee = a.value[Te];
      if (!Ee) return;
      const St = ge(Ee);
      St && n.selectPanel(St);
    }
    return (B, H) => r.value ? (f(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": E(As)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": D.value ? "true" : "false",
      "data-dc-maximized": z.value ? "true" : "false",
      "data-dc-headless": C.value ? "true" : "false",
      "data-dc-active": g.value ? "true" : "false",
      "data-dc-dragging": $.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: H[7] || (H[7] = (ne) => i.value && E(n).focus(i.value))
    }, [
      C.value ? T("", !0) : (f(), m("header", {
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
          onClick: I,
          onKeydown: W
        }, [...H[8] || (H[8] = [
          y("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Ku)) : T("", !0),
        _.value ? (f(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": _.value
        }, [
          y("span", qu, A(_.value), 1)
        ], 8, Vu)) : T("", !0),
        y("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), m(Q, null, ce(a.value, (ne, Te) => (f(), m(Q, {
            key: ne.id
          }, [
            Se.value === Te ? (f(), m("span", Uu)) : T("", !0),
            y("button", {
              id: se(ne.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ne.kind === "panel" ? ne.id : void 0,
              "data-dc-space": ne.kind === "space" ? ne.title : void 0,
              "aria-selected": ne.index === r.value.index,
              "aria-controls": ue.value,
              tabindex: ne.index === r.value.index ? 0 : -1,
              onPointerdown: (Ee) => ze(Ee, ne),
              onClick: (Ee) => Ke(Ee, ne),
              onKeydown: (Ee) => Yt(Ee, Te)
            }, [
              y("span", ju, A(ne.title), 1),
              ne.kind === "panel" && ne.panel.subtitle ? (f(), m("span", Xu, A(ne.panel.subtitle), 1)) : T("", !0),
              l.value && ne.kind === "panel" && S(ne.id) ? (f(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ne.title}`,
                "data-dc-close": ne.id,
                onPointerdown: H[0] || (H[0] = Le(() => {
                }, ["stop"])),
                onClick: (Ee) => Mt(Ee, ne.id)
              }, [...H[9] || (H[9] = [
                y("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Gu)) : T("", !0)
            ], 40, Hu)
          ], 64))), 128)),
          Se.value === a.value.length ? (f(), m("span", Yu)) : T("", !0)
        ], 8, Wu),
        y("div", Qu, [
          ye(O),
          q.value.length ? (f(), re(Zn, {
            key: 0,
            items: q.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ]),
        te.value ? (f(), m("div", Zu, [
          D.value && !F.value ? (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": k.value,
            onPointerdown: H[1] || (H[1] = Le(() => {
            }, ["stop"])),
            onClick: H[2] || (H[2] = (ne) => E(n).toggleMinimize(k.value))
          }, [
            ye(wt, { kind: "minimize" })
          ], 40, Ju)) : T("", !0),
          D.value && !F.value ? (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${z.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": z.value,
            "data-dc-maximize": k.value,
            onPointerdown: H[3] || (H[3] = Le(() => {
            }, ["stop"])),
            onClick: H[4] || (H[4] = (ne) => E(n).toggleMaximize(k.value))
          }, [
            ye(wt, {
              kind: z.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, ed)) : T("", !0),
          !l.value && u.value && S(u.value.id) ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: H[5] || (H[5] = Le(() => {
            }, ["stop"])),
            onClick: H[6] || (H[6] = (ne) => E(n).close(u.value.id))
          }, [
            ye(wt, { kind: "close" })
          ], 40, td)) : T("", !0)
        ])) : T("", !0)
      ], 40, Bu)),
      o.value ? (f(), m("div", {
        key: 1,
        id: ue.value,
        class: "dc-pane__space",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : se(r.value.id)
      }, [
        be(B.$slots, "space", {
          node: o.value,
          path: w.value
        }, void 0, !0)
      ], 8, nd)) : (f(), m("div", {
        key: 2,
        id: ue.value,
        class: "dc-pane__body",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : se(i.value)
      }, [
        ye(x)
      ], 8, sd)),
      ve.value ? (f(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ve.value,
        "aria-hidden": "true"
      }, null, 8, ad)) : T("", !0)
    ], 40, Ou)) : T("", !0);
  }
}), Ka = /* @__PURE__ */ me(ld, [["__scopeId", "data-v-44fd2b2d"]]), rd = ["data-dc-space", "data-dc-path", "aria-label"], od = {
  key: 0,
  class: "dc-space__head"
}, id = { class: "dc-space__title dc-truncate" }, cd = ["data-dc-direction"], ud = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, dd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], fd = /* @__PURE__ */ pe({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = cs(), s = U(null), a = v(() => j(t.node) ? t.node : null), l = v(() => Ct(t.node) ? t.node : null), r = v(() => ee(t.node) ? t.node : null), o = v(
      () => l.value ? l.value.children : r.value?.frames.map((x) => x.node) ?? []
    ), i = v(() => l.value ? Ye(l.value) : []), u = v(
      () => (r.value?.frames ?? []).map((x, O) => ({
        held: x,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: O,
        key: S(x.node),
        path: [...t.path, O]
      })).sort((x, O) => x.key < O.key ? -1 : x.key > O.key ? 1 : 0)
    ), d = v(() => bt(t.node)), _ = v(() => n.spaceMenu(t.path)), w = v(() => t.node.headless === !0), k = v(() => r.value ? "desktop" : l.value?.direction ?? ""), b = U(null), C = U(0);
    let g = null;
    $e(
      b,
      (x) => {
        g?.disconnect(), g = null, !(!x || typeof ResizeObserver > "u") && (C.value = x.clientWidth, g = new ResizeObserver(([O]) => {
          C.value = O?.contentRect.width ?? 0;
        }), g.observe(x));
      },
      { immediate: !0 }
    ), Qe(() => g?.disconnect());
    const $ = v(() => {
      const x = Math.max(
        1,
        Math.floor((C.value + mt) / (zn + mt))
      ), O = /* @__PURE__ */ new Map();
      let Y = 0;
      for (const le of u.value)
        le.held.minimized === !0 && (O.set(le.key, {
          x: mt + Y % x * (zn + mt),
          bottom: mt + Math.floor(Y / x) * (Ma + mt)
        }), Y += 1);
      return O;
    }), R = (x) => !!x && x.join("/") === t.path.join("/"), D = v(() => {
      const x = n.dropTarget.value, O = r.value;
      if (!O || !x?.rect || x.edge !== "float") return null;
      if (x.space) return R(x.space) ? x.rect : null;
      const Y = Me(O, x.panel);
      return Y && O.frames.includes(Y) ? x.rect : null;
    }), F = v(() => {
      const x = n.dropTarget.value;
      return !!x && !x.rect && R(x.space);
    }), N = v(() => l.value?.direction === "row"), q = v(() => o.value.map((x, O) => [...t.path, O])), S = (x) => [...Ze(x)].sort().join("/"), z = (x) => {
      const O = Ze(x)[0];
      return (O ? n.panelFor(O)?.title : null) ?? O ?? "panel";
    }, te = (x) => {
      const O = o.value[x], Y = o.value[x + 1];
      return !O || !Y ? "Resize panels" : `Resize ${z(O)} and ${z(Y)}`;
    }, se = (x) => {
      const O = i.value[x] ?? 0, Y = i.value[x + 1] ?? 0, le = O + Y;
      return le > 0 ? Math.round(O / le * 100) : 50;
    };
    function ue() {
      const x = s.value, O = x ? N.value ? x.clientWidth : x.clientHeight : 0;
      return O <= 0 ? 0.05 : Math.min(n.minPanelSize.value / O, 0.4);
    }
    let G = null;
    function ve(x, O) {
      const Y = l.value, le = s.value;
      if (!n.resizable.value || !Y || !le || x.button !== 0) return;
      const ge = N.value ? le.clientWidth : le.clientHeight;
      if (ge <= 0) return;
      const ze = N.value ? x.clientX : x.clientY, Ke = Ye(Y), Ie = Math.min(n.minPanelSize.value / ge, 0.4);
      x.preventDefault();
      const Ve = (W) => {
        const ke = ((N.value ? W.clientX : W.clientY) - ze) / ge;
        n.setSizes(t.path, Ns(Ke, O, ke, Ie));
      }, I = () => G?.(), K = (W) => {
        W.key === "Escape" && (n.setSizes(t.path, Ke), G?.());
      };
      G = () => {
        window.removeEventListener("pointermove", Ve), window.removeEventListener("pointerup", I), window.removeEventListener("pointercancel", I), window.removeEventListener("keydown", K), G = null;
      }, window.addEventListener("pointermove", Ve), window.addEventListener("pointerup", I), window.addEventListener("pointercancel", I), window.addEventListener("keydown", K);
    }
    Qe(() => G?.());
    function Se(x, O) {
      const Y = l.value;
      if (!n.resizable.value || !Y) return;
      const le = N.value ? "ArrowRight" : "ArrowDown", ge = N.value ? "ArrowLeft" : "ArrowUp", ze = x.shiftKey ? 0.1 : 0.02;
      if (x.key !== le && x.key !== ge) return;
      const Ke = x.key === le ? ze : -ze;
      x.preventDefault(), n.setSizes(t.path, Ns(Ye(Y), O, Ke, ue()));
    }
    return (x, O) => {
      const Y = Vs("WindowNode", !0);
      return a.value ? (f(), re(Ka, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: We(({ node: le, path: ge }) => [
          ye(Y, {
            node: le,
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
        !e.framed && !w.value ? (f(), m("header", od, [
          y("span", id, A(d.value), 1),
          _.value.length ? (f(), re(Zn, {
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
          D.value ? (f(), m("div", {
            key: 0,
            class: "dc-window__drop",
            style: Re({
              left: `${D.value.x}px`,
              top: `${D.value.y}px`,
              width: `${D.value.w}px`,
              height: `${D.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : T("", !0),
          (f(!0), m(Q, null, ce(u.value, (le) => (f(), re(Du, {
            key: le.key,
            frame: le.held,
            path: le.path,
            order: le.order,
            place: $.value.get(le.key) ?? null
          }, {
            default: We(() => [
              ye(Y, {
                node: le.held.node,
                path: le.path,
                framed: le.held.node.kind !== "group"
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
          F.value ? (f(), m("div", ud)) : T("", !0),
          (f(!0), m(Q, null, ce(o.value, (le, ge) => (f(), m(Q, {
            key: S(le)
          }, [
            y("div", {
              class: "dc-window__cell",
              style: Re({ flexGrow: i.value[ge] ?? 1 })
            }, [
              ye(Y, {
                node: le,
                path: q.value[ge] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            ge < o.value.length - 1 ? (f(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": N.value ? "vertical" : "horizontal",
              "aria-label": te(ge),
              "aria-valuenow": se(ge),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": E(n).resizable.value ? void 0 : "true",
              tabindex: E(n).resizable.value ? 0 : -1,
              onPointerdown: (ze) => ve(ze, ge),
              onKeydown: (ze) => Se(ze, ge)
            }, null, 40, dd)) : T("", !0)
          ], 64))), 128))
        ], 8, cd)) : T("", !0)
      ], 8, rd));
    };
  }
}), pd = /* @__PURE__ */ me(fd, [["__scopeId", "data-v-fb5b403f"]]), vd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], md = {
  key: 1,
  class: "dc-window__empty"
}, hd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, en = 16, _d = /* @__PURE__ */ pe({
  __name: "WindowFrame",
  props: /* @__PURE__ */ un({
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
  emits: /* @__PURE__ */ un(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, l = zt(e, "layout"), r = zt(e, "views"), o = Bt(), i = v(() => new Map(s.panels.map((c) => [c.id, c]))), u = v(() => s.panels.map((c) => c.id)), d = v(() => yu(l.value, u.value)), _ = U(null), w = U(null), k = U(null), b = U(!0), C = U(null), g = U(null), $ = U(null), R = U(""), D = U(null);
    function F() {
      const c = D.value;
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
      return F().map((c) => ({ pane: c, order: N(c.element) })).sort((c, p) => {
        const h = Math.max(c.order.length, p.order.length);
        for (let M = 0; M < h; M += 1) {
          const P = (c.order[M] ?? -1) - (p.order[M] ?? -1);
          if (P !== 0) return P;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const S = (c) => F().find((p) => p.panels.includes(c)) ?? null;
    function z(c) {
      const p = i.value.get(c);
      if (!p) return "";
      const h = r.value[c];
      return h && p.views?.some((M) => M.key === h) ? h : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function te(c, p) {
      r.value = { ...r.value, [c]: p }, a("view-change", { panel: c, view: p });
    }
    const se = v(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function ue(c) {
      return !s.movable || se.value < 1 || s.panels.length < 2 ? !1 : i.value.get(c)?.fixed !== !0;
    }
    function G(c, p) {
      const h = d.value;
      !c || !h || c === h || (l.value = c, p && a("panel-move", p));
    }
    function ve(c, p, h) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const M = (p - c.left) / c.width, P = (h - c.top) / c.height, L = 0.3;
      return M > L && M < 1 - L && P > L && P < 1 - L ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: P },
        { edge: "bottom", distance: 1 - P }
      ].reduce(
        (ae, V) => V.distance < ae.distance ? V : ae
      ).edge;
    }
    function Se(c, p) {
      const h = [...c.querySelectorAll(".dc-tab")], M = h.findIndex((P) => {
        const L = P.getBoundingClientRect();
        return p < L.left + L.width / 2;
      });
      return M === -1 ? h.length : M;
    }
    function x(c, p, h) {
      for (const { panels: M, element: P } of q().reverse()) {
        const L = P.getBoundingClientRect();
        if (c < L.left || c > L.right || p < L.top || p > L.bottom) continue;
        const de = M.find((Z) => Z !== h), ae = P.querySelector(".dc-pane__tabs"), V = ae?.getBoundingClientRect();
        if (ae && V && p >= V.top && p <= V.bottom)
          return de ? { panel: de, edge: "center", index: Se(ae, c) } : null;
        const X = P.querySelector(":scope > .dc-pane__space");
        if (X) {
          const Z = X.getBoundingClientRect();
          if (c >= Z.left && c <= Z.right && p >= Z.top && p <= Z.bottom) continue;
        }
        return de ? { panel: de, edge: ve(L, c, p) } : null;
      }
      return Y(c, p, h) ?? ze(c, p);
    }
    function O() {
      const c = D.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function Y(c, p, h) {
      const M = d.value;
      if (!M) return null;
      for (const P of O()) {
        const L = P.getBoundingClientRect();
        if (c < L.left || c > L.right || p < L.top || p > L.bottom) continue;
        const de = Ke(P), ae = de.flatMap((ie) => ie.panels).find((ie) => ie !== h);
        if (!ae && de.length > 0) return null;
        const V = Me(M, h)?.rect, X = bn(
          {
            x: c - L.left - 24,
            y: p - L.top - 12,
            w: V?.w ?? ct.w,
            h: V?.h ?? ct.h
          },
          { w: P.clientWidth, h: P.clientHeight },
          s.minPanelSize
        );
        if (ae) return { panel: ae, edge: "float", rect: X };
        const Z = le(P);
        return Z ? { panel: "", space: Z, edge: "float", rect: X } : null;
      }
      return null;
    }
    function le(c) {
      const p = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function ge() {
      const c = D.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === c).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const h = le(p);
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
      return F().filter(
        (p) => p.element.closest(".dc-window__desktop") === c
      );
    }
    let Ie = null;
    const Ve = (c) => c.altKey;
    function I(c, p) {
      if (!ue(c) || w.value || g.value || p.button !== 0) return;
      const h = p.clientX, M = p.clientY;
      let P = !1, L = Ve(p);
      const de = () => {
        const fe = $.value;
        fe && (k.value = L ? Y(fe.x, fe.y, c) : x(fe.x, fe.y, c));
      }, ae = (fe) => {
        if (!P) {
          if (Math.hypot(fe.clientX - h, fe.clientY - M) < 4) return;
          P = !0, w.value = c, C.value = null;
        }
        L = Ve(fe), b.value = !L, $.value = { x: fe.clientX, y: fe.clientY }, de();
      }, V = (fe) => {
        Ve(fe) !== L && (L = !L, b.value = !L, P && de());
      }, X = (fe) => {
        Ie?.();
        const J = k.value, Pe = d.value;
        if (fe && P && J && Pe) {
          const Je = J.space ? Fs(Pe, c, J.space, J.rect) : J.edge === "float" && J.rect ? Rs(Pe, c, J.panel, J.rect) : Jt(Pe, c, J.panel, J.edge, J.index);
          G(Je, {
            panel: c,
            target: J.panel,
            edge: J.edge,
            ...J.space === void 0 ? {} : { space: J.space },
            ...J.index === void 0 ? {} : { index: J.index },
            ...J.rect === void 0 ? {} : { rect: J.rect }
          });
        }
        w.value = null, k.value = null, $.value = null, b.value = !0;
      }, Z = () => X(!0), ie = () => X(!1), _e = (fe) => {
        if (fe.key === "Escape") {
          X(!1);
          return;
        }
        V(fe);
      };
      Ie = () => {
        window.removeEventListener("pointermove", ae), window.removeEventListener("pointerup", Z), window.removeEventListener("pointercancel", ie), window.removeEventListener("keydown", _e), window.removeEventListener("keyup", V), Ie = null;
      }, window.addEventListener("pointermove", ae), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", ie), window.addEventListener("keydown", _e), window.addEventListener("keyup", V);
    }
    Qe(() => Ie?.());
    let K = null;
    function W(c) {
      const p = D.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((P) => P.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function ke(c) {
      const p = d.value;
      return p ? Fn(p, c) : null;
    }
    function Mt(c) {
      const p = d.value;
      if (!p) return;
      const h = Rt(p, c);
      h !== p && (l.value = h);
    }
    function Yt(c) {
      const p = ke(c);
      p && Mt(p);
    }
    function B(c) {
      const p = d.value, h = p ? Me(p, c) : null;
      return h !== null && et(h);
    }
    function H(c) {
      const p = d.value, h = p ? Me(p, c) : null;
      return h !== null && ot(h);
    }
    function ne(c) {
      const p = d.value, h = p ? rt(p, c) : null;
      return h ? Ae(h.node) : "";
    }
    function Te(c) {
      const p = d.value, h = p ? rt(p, c) : null;
      if (!p || !h) return;
      const M = Ae(h.node);
      if (i.value.get(M)?.fixed === !0) return;
      const P = !ot(h);
      let L = iu(p, c, P);
      L !== p && (P || (L = Rt(L, c)), l.value = L, a("frame-minimize", { panel: M, minimized: P }));
    }
    function Ee(c) {
      const p = ke(c);
      p && Te(p);
    }
    function St(c) {
      const p = d.value, h = p ? rt(p, c) : null;
      if (!p || !h) return;
      const M = Ae(h.node);
      if (i.value.get(M)?.fixed === !0) return;
      const P = !et(h);
      let L = ou(p, c, P);
      L !== p && (P && (L = Rt(L, c)), l.value = L, a("frame-maximize", { panel: M, maximized: P }));
    }
    function ds(c) {
      const p = ke(c);
      p && St(p);
    }
    function fs(c, p, h) {
      const M = d.value, P = M ? rt(M, c) : null;
      if (!M || !P || p.button !== 0 || w.value || g.value) return;
      const L = Ae(P.node);
      if (i.value.get(L)?.fixed === !0 || et(P) || ot(P) || (h === "move" ? !s.movable : !s.resizable)) return;
      const de = W(c), ae = cu(M, c);
      Mt(c);
      const V = { w: de?.clientWidth ?? 0, h: de?.clientHeight ?? 0 }, X = { ...P.rect }, Z = p.clientX, ie = p.clientY, _e = s.minPanelSize;
      g.value = L;
      const fe = (Fe) => {
        const je = d.value;
        if (!je) return;
        const Et = Ts(je, ae, bn(Fe, V, _e));
        Et !== je && (l.value = Et);
      }, J = (Fe) => {
        Fe.preventDefault();
        const je = Fe.clientX - Z, Et = Fe.clientY - ie;
        fe(
          h === "move" ? { ...X, x: X.x + je, y: X.y + Et } : zs(X, h, je, Et, _e)
        );
      }, Pe = (Fe) => {
        if (K?.(), g.value = null, !Fe) {
          fe(X);
          return;
        }
        const je = d.value ? rt(d.value, ae) : null;
        je && a("frame-change", { panel: ne(ae), rect: je.rect });
      }, Je = () => Pe(!0), at = () => Pe(!1), lt = (Fe) => {
        Fe.key === "Escape" && Pe(!1);
      };
      K = () => {
        window.removeEventListener("pointermove", J), window.removeEventListener("pointerup", Je), window.removeEventListener("pointercancel", at), window.removeEventListener("keydown", lt), K = null;
      }, window.addEventListener("pointermove", J), window.addEventListener("pointerup", Je), window.addEventListener("pointercancel", at), window.addEventListener("keydown", lt);
    }
    function Va(c, p, h) {
      const M = ke(c);
      M && fs(M, p, h);
    }
    function qa(c, p, h = !1) {
      const M = d.value, P = ke(c), L = M && P ? rt(M, P) : null;
      if (!M || !P || !L || i.value.get(c)?.fixed === !0 || (h ? !s.resizable : !s.movable)) return;
      if (et(L) || ot(L)) {
        R.value = `${qe(c)} is ${et(L) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const de = p === "left" ? -en : p === "right" ? en : 0, ae = p === "up" ? -en : p === "down" ? en : 0, V = W(P), X = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, Z = h ? zs(L.rect, "se", de, ae, s.minPanelSize) : { ...L.rect, x: L.rect.x + de, y: L.rect.y + ae }, ie = Ts(M, P, bn(Z, X, s.minPanelSize));
      if (ie === M) {
        R.value = h ? `${qe(c)} cannot be resized further.` : `${qe(c)} cannot move ${p}.`;
        return;
      }
      l.value = ie;
      const _e = rt(ie, P);
      _e && (a("frame-change", { panel: c, rect: _e.rect }), R.value = h ? `${qe(c)} resized to ${_e.rect.w} by ${_e.rect.h}.` : `${qe(c)} moved to ${_e.rect.x}, ${_e.rect.y}.`);
    }
    Qe(() => K?.());
    function Wa(c, p) {
      const h = S(c), M = h?.element.getBoundingClientRect();
      if (!h || !M) return null;
      const P = p === "left" || p === "right", L = (V) => {
        if (!(P ? V.bottom > M.top + 1 && V.top < M.bottom - 1 : V.right > M.left + 1 && V.left < M.right - 1)) return null;
        const Z = p === "left" ? M.left - V.right : p === "right" ? V.left - M.right : p === "up" ? M.top - V.bottom : V.top - M.bottom;
        return Z < -1 ? null : Z;
      }, de = [];
      for (const V of F()) {
        if (V === h || V.element === h.element) continue;
        const X = L(V.element.getBoundingClientRect());
        if (X === null) continue;
        const Z = V.panels.find((ie) => ie !== c);
        Z && de.push({ to: { panel: Z }, distance: X });
      }
      for (const { element: V, path: X } of ge()) {
        const Z = L(V.getBoundingClientRect());
        Z !== null && de.push({ to: { space: X }, distance: Z });
      }
      return de.reduce(
        (V, X) => V && V.distance <= X.distance ? V : X,
        null
      )?.to ?? null;
    }
    function Ua(c) {
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
    const qe = (c) => i.value.get(c)?.title ?? c, Ha = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function ja(c, p, h = !1) {
      if (!ue(c)) return;
      const M = d.value;
      if (!M) return;
      const P = qe(c), L = _t(M, c);
      if (!h && L && (p === "left" || p === "right") && L.panels.length > 1) {
        const ie = L.panels.indexOf(c), _e = p === "left" ? ie - 1 : ie + 1;
        if (_e >= 0 && _e < L.panels.length) {
          G(Ft(M, c, _e), { panel: c, target: c, edge: "center", index: _e }), R.value = `${P} moved ${p}, now tab ${_e + 1} of ${L.panels.length}.`, hn(c);
          return;
        }
      }
      const ae = Wa(c, p);
      if (!ae || ae.panel !== void 0 && !ue(ae.panel)) {
        R.value = `${P} cannot move ${p}.`;
        return;
      }
      const V = Ha[p];
      if (ae.space) {
        const ie = ae.space, _e = nt(M, ie), fe = Me(M, c)?.rect, J = { ...ct, ...fe ? { w: fe.w, h: fe.h } : {} };
        G(Fs(M, c, ie, J), { panel: c, target: "", space: ie, edge: V }), R.value = `${P} moved ${p}, into ${_e ? bt(_e) : "the space"}.`, hn(c);
        return;
      }
      const X = ae.panel, Z = L?.panels.length === 1 && _t(M, X)?.panels.length === 1;
      h ? (G(Jt(M, c, X, "center"), {
        panel: c,
        target: X,
        edge: "center"
      }), R.value = `${P} joined ${qe(X)} as a tab.`) : Z ? (G(rn(M, c, X), { panel: c, target: X, edge: V }), R.value = `${P} moved ${p}, trading places with ${qe(X)}.`) : (G(Jt(M, c, X, V), { panel: c, target: X, edge: V }), R.value = `${P} moved ${p}, beside ${qe(X)}.`), hn(c);
    }
    function hn(c) {
      Dt(() => {
        S(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Xa(c, p) {
      const h = d.value;
      h && (l.value = on(h, c, p));
    }
    function _n(c) {
      const p = d.value;
      if (!p) return;
      const h = yt(p, c);
      h !== p && (l.value = h, a("tab-select", { panel: c }));
    }
    function ps(c) {
      return i.value.get(c)?.closable ?? s.closable;
    }
    function Ga(c) {
      ps(c) && a("panel-close", c);
    }
    const gn = U(/* @__PURE__ */ new Map());
    let Ya = 0;
    function Qa(c, p) {
      const h = Ya += 1;
      return gn.value.set(h, { panel: c, items: p }), () => {
        gn.value.delete(h);
      };
    }
    function Za(c) {
      const p = [];
      for (const h of gn.value.values())
        h.panel() === c && p.push(...h.items());
      return p;
    }
    function vs(c) {
      const p = c.filter((h) => h.items.length > 0);
      return p.length < 2 ? p.flatMap((h) => h.items) : p.flatMap((h) => [
        { id: h.id, heading: !0, label: h.title },
        ...h.items
      ]);
    }
    const ms = (c) => c.title || "These tabs";
    function Ja(c, p) {
      const h = p.id, M = _t(c, h), P = (M?.panels.length ?? 0) > 1, L = M?.fixedView === !0, de = (Z) => ({
        action: () => {
          Z !== c && (l.value = Z);
        }
      }), ae = [], V = [], X = p.views ?? [];
      if (X.length > 1 && !L) {
        const Z = z(h);
        ae.push({
          id: "view",
          label: "View",
          items: X.map((ie) => ({
            id: `view-${ie.key}`,
            label: ie.label,
            checked: ie.key === Z,
            action: () => te(h, ie.key)
          }))
        });
      }
      return P && !L && V.push(
        { id: "show-row", label: "Row", checked: !1, ...de(Ls(c, h, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...de(Ls(c, h, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...de(pu(c, h))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...de(vu(c, h))
        }
      ), P && M && (V.length && V.push({ separator: !0 }), V.push(...hs(M, h))), { panel: ae, tabs: V, tabsTitle: M ? ms(M) : "" };
    }
    function hs(c, p) {
      const h = pt(c), M = (P) => {
        const L = c.panels[(h + P + c.panels.length) % c.panels.length];
        return (L === void 0 ? "" : Ae(L)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => _n(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => _n(M(-1)) }
      ];
    }
    function Qt(c) {
      return c.title ? c.title : j(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : bt(c);
    }
    function _s(c) {
      if (!c || ee(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Be(c)) return null;
      const p = Ba(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function el(c) {
      const p = d.value;
      if (!s.menu || !p) return [];
      const h = nt(p, c);
      if (!h || j(h)) return [];
      if (h.fixedView) return [];
      const M = ee(h) ? "desktop" : h.direction, P = (J, Pe, Je) => ({
        id: `show-${J}`,
        label: Pe,
        checked: M === J,
        action: () => {
          const at = d.value, lt = Je();
          !at || lt === h || (l.value = pn(xe(dt(at, c, lt))));
        }
      }), L = () => {
        const J = Na(h, tl(h));
        if (j(J) && J.panels.length === 0) return h;
        const Pe = j(J) && J.panels.length === 1 ? J.panels[0] : void 0;
        return Pe !== void 0 && he(Pe) ? h : J;
      }, de = (J) => () => ee(h) ? Oa(h, J) : h.direction === J ? h : { ...h, direction: J }, ae = c.slice(0, -1), V = c.length > 0 ? nt(p, ae) : null, X = V && j(V) && V.panels.length > 1 ? V : null, Z = V && _s(V) === h ? V : null, ie = _s(h), _e = h.title || "this space", fe = (J, Pe, Je, at, lt) => ({
        id: J,
        label: lt,
        action: () => {
          const Fe = d.value;
          Fe && (l.value = pn(xe(dt(Fe, Pe, _u(Je, at)))));
        }
      });
      return vs([
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
            P("tabs", "Tabs", () => L()),
            P("desktop", "Desktop", () => ee(h) ? h : Ia(h))
          ]
        },
        {
          id: "about-around",
          title: ie ? `Around ${Qt(ie)}` : "",
          items: ie ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ie.title ? [] : [fe("merge-around-keep-this", c, h, "outer", `Keep ${_e}`)],
            ...h.title ? [] : [fe("merge-around-keep-that", c, h, "inner", `Keep ${Qt(ie)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Z ? `Inside ${Qt(Z)}` : "",
          items: Z ? [
            ...h.title ? [] : [fe("merge-inside-keep-that", ae, Z, "outer", `Keep ${Qt(Z)}`)],
            ...Z.title ? [] : [fe("merge-inside-keep-this", ae, Z, "inner", `Keep ${_e}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: X ? ms(X) : "",
          items: X ? hs(X, Ae(h)) : []
        }
      ]);
    }
    function tl(c) {
      const p = _.value;
      return p && oe(c, p) ? p : void 0;
    }
    function nl(c) {
      const p = d.value, h = i.value.get(c);
      if (!p || !h) return [];
      const M = s.menu ? Ja(p, h) : null, P = Za(c);
      P.length && M?.panel.length && P.push({ separator: !0 }), M && P.push(...M.panel);
      const L = vs([
        { id: "about-panel", title: h.title, items: P },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(h, L) : L;
    }
    function sl(c, p) {
      return o[`${c}-${p}`] ?? o[c];
    }
    function gs(c, p, h, M) {
      return sl(c, p.id)?.({ panel: p, view: h, active: M });
    }
    wu({
      panelFor: (c) => i.value.get(c) ?? null,
      viewFor: z,
      setView: te,
      movable: v(() => s.movable),
      resizable: v(() => s.resizable),
      minPanelSize: v(() => s.minPanelSize),
      spaceNames: v(() => s.spaceNames),
      focused: _,
      dragging: w,
      dropTarget: k,
      moving: C,
      framing: g,
      canMove: ue,
      focus(c) {
        _.value !== c && (_.value = c, a("panel-activate", c));
      },
      selectPanel: _n,
      beginDrag: I,
      toggleMoveMode: Ua,
      nudge: ja,
      setSizes: Xa,
      frameOf: (c) => d.value ? Me(d.value, c) : null,
      beginFrameDrag: Va,
      nudgeFrame: qa,
      raise: Yt,
      maximized: B,
      toggleMaximize: ds,
      minimized: H,
      toggleMinimize: Ee,
      beginFrameDragAt: fs,
      raiseAt: Mt,
      toggleMaximizeAt: St,
      toggleMinimizeAt: Te,
      menuFor: nl,
      spaceMenu: el,
      registerMenu: Qa,
      closable: ps,
      close: Ga,
      renderContent: (c, p, h) => gs("panel", c, p, h),
      renderActions: (c, p, h) => gs("actions", c, p, h),
      layout: d
    });
    const al = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), ll = () => {
      const c = w.value, p = $.value;
      return !c || !p ? null : ul(
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
        P && G(Jt(P, c, p, h, M), {
          panel: c,
          target: p,
          edge: h,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (l.value = yt(p, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, p, h) {
        const M = d.value;
        M && G(Rs(M, c, p, h), {
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
        const M = au(h, c, p);
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
      raise: Yt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ds,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Ee
    }), (c, p) => (f(), m("div", {
      ref_key: "root",
      ref: D,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": w.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Re(al.value)
    }, [
      d.value ? (f(), re(pd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), m("p", md, " This window has no panels. ")),
      ye(ll),
      y("p", hd, A(R.value), 1)
    ], 12, vd));
  }
}), gd = /* @__PURE__ */ me(_d, [["__scopeId", "data-v-711565af"]]);
function Id(e = "", t = "/") {
  const n = U(Ge(e)), s = U(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(l) {
      n.value = Ge(l), a.push(`${s.value}${n.value}`);
    },
    replace(l) {
      n.value = Ge(l), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function Is(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Ge(s === -1 ? n : n.slice(0, s));
}
function Od(e) {
  const t = U(Is(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), s = $e(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Is(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${Ge(a)}`),
    replace: (a) => e.replace(`${n.value}${Ge(a)}`),
    dispose: s
  };
}
const yd = {
  DataShell: Mc,
  ShellHeader: fa,
  QueryPanel: va,
  RecordActions: ma,
  ResultsArea: $a,
  FacetControl: pa,
  SegmentedControl: Ic,
  StatusPill: qt,
  WindowFrame: gd,
  WindowPane: Ka,
  ListView: An,
  CardsView: _a,
  GridView: ga,
  TableView: ka,
  LinksView: ya,
  PreviewView: wa,
  TypeCardsView: ba
}, Bd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(yd))
      e.component(`${n}${s}`, a);
    t.route && e.provide(qs, t.route);
  }
};
export {
  fn as CASCADE_STEP,
  $d as COLUMN_BREAKPOINTS,
  bd as COLUMN_ROLES,
  _a as CardsView,
  Ps as ColumnCell,
  ct as DEFAULT_FRAME,
  Mn as DEFAULT_SORT,
  fl as DEFAULT_VIEW,
  Mc as DataShell,
  Sn as EMPTY_CELL,
  ia as ENTITY_ALL,
  dn as ENTITY_TERM,
  Ot as EXPRESSION_TERM,
  Xn as FACET_PREFIX,
  pa as FacetControl,
  ga as GridView,
  Bd as HeaderContentLayoutPlugin,
  ya as LinksView,
  An as ListView,
  mt as MINIMIZED_GAP,
  Ma as MINIMIZED_HEIGHT,
  zn as MINIMIZED_WIDTH,
  Ca as MIN_FRAME,
  Ms as MOCK_TINTS,
  Md as MenuBar,
  Zn as MenuButton,
  xa as MenuList,
  Wt as MetricDrill,
  us as PANE_CONTEXT_KEY,
  Un as PARAM_DIR,
  Vn as PARAM_ENTITY,
  Hn as PARAM_EXPR,
  jn as PARAM_PAGE,
  Wn as PARAM_SORT,
  qn as PARAM_VIEW,
  Yn as PinStar,
  wa as PreviewView,
  va as QueryPanel,
  Zt as RECORD_STATUSES,
  Zs as RESULT_FIELDS,
  qs as ROUTE_ADAPTER_KEY,
  ma as RecordActions,
  $a as ResultsArea,
  oa as SHELL_CONTEXT_KEY,
  kd as SHELL_THEMES,
  Ut as ScopeMark,
  Ic as SegmentedControl,
  xt as SelectTick,
  Cd as ShellCard,
  fa as ShellHeader,
  qt as StatusPill,
  ka as TableView,
  ba as TypeCardsView,
  Ws as VIEW_KINDS,
  pl as VIEW_LABELS,
  is as WINDOW_CONTEXT_KEY,
  gd as WindowFrame,
  Ka as WindowPane,
  Ea as activePanel,
  pt as activeTab,
  ra as addTerm,
  sa as andExpression,
  nu as axisOf,
  ts as cascade,
  ta as cellFull,
  Kt as cellText,
  sn as cellTextOf,
  De as cellValue,
  ys as changesResults,
  bn as clampRect,
  Na as collapseSpace,
  pu as collapseToTabs,
  Ed as column,
  ks as columnAlign,
  bs as columnClass,
  ws as columnKey,
  En as columnTruncates,
  yl as columnsFor,
  ml as countPages,
  dl as createHistoryAdapter,
  Id as createMemoryAdapter,
  Wl as createMockDataSource,
  Od as createVueRouterAdapter,
  bl as defaultCellText,
  Ds as defaultLayout,
  Bn as defaultQuery,
  Hl as drillExpression,
  Fs as dropIntoSpace,
  It as emptyFacetState,
  Dn as emptyFacetValue,
  ht as findEntity,
  tt as findSort,
  Ad as fixedView,
  es as float,
  Rs as floatPanel,
  Ia as floatSplit,
  vu as floatTabs,
  nn as fnv1a,
  js as focusEntity,
  vt as formatCount,
  _l as formatDate,
  an as formatExpression,
  hl as formatMetric,
  gl as formatOrdinal,
  Vt as formatTerm,
  vn as frame,
  rt as frameAt,
  Me as frameOf,
  Fn as framePathOf,
  Ae as frontPanel,
  Kl as generateRows,
  Sd as group,
  _t as groupOf,
  su as groups,
  Qs as hasActiveFacets,
  oe as hasPanel,
  Pd as headless,
  At as insertPanel,
  Tt as isChoosable,
  xd as isEntityScoped,
  Ys as isFacetActive,
  ee as isFloat,
  j as isGroup,
  et as isMaximized,
  ot as isMinimized,
  he as isPanelTab,
  In as isPristineQuery,
  Ct as isSplit,
  Ne as isTabOf,
  On as isTypeCardsQuery,
  Us as isViewKind,
  xs as joinExpression,
  zl as matchesExpression,
  Vl as matchesFacets,
  lu as maximizeFrame,
  ou as maximizeFrameAt,
  _u as mergeSpace,
  ru as minimizeFrame,
  iu as minimizeFrameAt,
  Jt as movePanel,
  Ft as moveTab,
  nt as nodeAt,
  Lt as nodeTitle,
  xe as normalizeLayout,
  Ge as normalizeSearch,
  rs as normalizeSizes,
  Ba as onlySpace,
  Ze as panelIds,
  He as panelNode,
  As as panelTabs,
  st as parseExpression,
  er as parseQuery,
  wo as presentParts,
  ha as presentRow,
  Iu as providePaneContext,
  Xl as provideShellContext,
  wu as provideWindowContext,
  $n as raiseFrame,
  Rt as raiseFrameAt,
  cu as raisedPath,
  Js as reconcileFacets,
  yu as reconcileLayout,
  la as recordTerm,
  ut as removePanel,
  dt as replaceAt,
  zs as resizeRect,
  Ns as resizeSplit,
  Hs as resolveView,
  Oe as roleColumn,
  ea as roleColumns,
  pn as rootSpace,
  ss as row,
  kl as rowKey,
  na as sameTerm,
  Ul as scopeTerm,
  Kn as scopeTermFor,
  jl as scopedEntity,
  Es as serializeQuery,
  yt as setActivePanel,
  au as setFrameRect,
  Ts as setFrameRectAt,
  on as setSizesAt,
  Rd as setSplitDirection,
  Ye as sizesOf,
  Gs as sortsFor,
  we as spaceChrome,
  bt as spaceTitle,
  ns as split,
  Rl as splitExpression,
  Ls as spreadTabs,
  nr as summarizeQuery,
  Gn as summaryTerms,
  rn as swapPanels,
  Jn as tabNode,
  jt as tabPanels,
  Oa as tileFloat,
  Fd as toFloat,
  Ld as toTiled,
  zd as toggleMaximized,
  Td as toggleMinimized,
  Ti as useColumns,
  ji as useEntityPreviews,
  Nd as usePaneContext,
  Dd as usePaneMenu,
  $t as usePresentedRows,
  sr as useQueryState,
  or as useRecordNames,
  ar as useResults,
  Ce as useShellContext,
  cs as useWindowContext,
  Tl as withoutTerm
};
