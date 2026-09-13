import { ref as U, inject as wt, provide as Nn, computed as v, toValue as Et, shallowRef as Nt, watch as ye, onScopeDispose as Os, defineComponent as de, onBeforeUnmount as je, openBlock as f, createElementBlock as m, createElementVNode as y, toDisplayString as z, Fragment as Y, renderList as oe, createCommentVNode as T, unref as P, renderSlot as ge, withDirectives as xn, withKeys as At, withModifiers as Ne, vModelText as Cn, useSlots as Bt, nextTick as Dt, createBlock as ae, createTextVNode as Ie, createVNode as he, withCtx as De, normalizeStyle as Re, resolveDynamicComponent as Bs, normalizeClass as cn, createSlots as tn, useModel as zt, useId as Ks, mergeModels as un, Comment as rl, Text as ol, onMounted as il, resolveComponent as Vs, getCurrentScope as cl, h as ul } from "vue";
const qs = Symbol("dc.routeAdapter");
function Ue(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function dl() {
  const e = typeof window < "u", t = U(e ? Ue(window.location.search) : ""), n = U(e ? window.location.pathname : "/"), s = () => {
    t.value = Ue(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (l, r) => {
    const o = Ue(l);
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
const Ws = ["list", "cards", "grid", "table", "links", "preview"], yd = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Zt = ["ok", "running", "queued", "review", "failed"], wd = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], kd = [480, 620, 760, 900, 1100], fl = "cards", Mn = "updated";
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
function mt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function js(e, t = {}) {
  const n = mt(e, t.entity), s = e.entities[0];
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
function bd(e) {
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
function pt(e) {
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
function Te(e, t) {
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
function ze(e, t) {
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
  const n = ze(e, t);
  return e.format ? e.format(n, t) : bl(n, e.kind);
}
function $l(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function ta(e, t) {
  const n = Kt(e, t), s = $l(ze(e, t));
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
  if (l) return ze(l, t);
  const r = n.facets.find((u) => yn(u.label) === s);
  if (r && r.key in t.fields) return t.fields[r.key];
  const o = Sl.find(([u]) => u === s)?.[1];
  if (o) {
    const u = Te(a, o);
    if (u) return ze(u, t);
  }
  const i = /^metric(\d+)$/.exec(s);
  if (i) {
    const u = ea(a, "metric")[Number(i[1]) - 1];
    if (u) return ze(u, t);
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
      const i = Te(r, o), u = i ? ze(i, t) : void 0;
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
function Rl(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((l, r) => r !== n) : s).filter((s) => s.length);
}
function Tl(e) {
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
function Ll(e, t) {
  return t.filter((n) => !e.some((s) => na(s, n)));
}
function sa(e, t) {
  const n = st(e), s = st(t);
  return n.length ? s.length ? an(
    n.flatMap((a) => s.map((l) => [...a, ...Ll(a, l)]))
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
const Fl = 7, Nl = 3;
function Dl(e, t, n, s) {
  const a = (t * Fl + nn(n)) % s, l = [];
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
    const i = ze(n, r), u = ze(n, o);
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
function be() {
  const e = wt(oa, null);
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
function We(e) {
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
    n.push([We(l), r]);
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
  const n = We(t);
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
  const s = Bn(t, n), a = new Map(ua(e)), l = a.get(Vn), r = l === void 0 ? s.entity : We(l), o = r === ia ? null : mt(t, r), i = a.get(qn), u = i && Us(We(i)) ? We(i) : s.view, d = a.get(Wn), _ = tt(o, d ? We(d) : n.sort, t), w = a.get(Un), k = w ? We(w) === "asc" ? "asc" : "desc" : s.dir, b = a.get(Hn), C = a.get(jn), g = C === void 0 ? 1 : Number(We(C)), $ = Number.isFinite(g) ? Math.max(1, Math.floor(g)) : 1, L = {};
  for (const O of o?.facets ?? []) {
    const N = a.get(`${Xn}${O.key}`);
    L[O.key] = N === void 0 ? Dn(O) : Zl(O, N);
  }
  return {
    entity: o?.key ?? null,
    view: u,
    sort: _.key,
    dir: k,
    expr: b === void 0 ? "" : We(b),
    facets: Js(o, L),
    page: $
  };
}
function Es(e, t, n = {}, s = "") {
  const a = Bn(t, n), l = mt(t, e.entity), r = ua(s).filter(([_]) => !Ql(_)), o = [], i = (_, w) => o.push([_, kn(w)]), u = l?.key ?? null;
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
  const { adapter: t } = e, n = v(() => Et(e.schema)), s = v(() => Et(e.defaults) ?? {}), a = v(() => er(t.search.value, n.value, s.value)), l = v(() => mt(n.value, a.value.entity)), r = v(() => l.value ?? js(n.value, s.value)), o = v(() => Gs(l.value, n.value)), i = v(() => tt(l.value, a.value.sort, n.value)), u = (g, $) => {
    const L = Es(g, n.value, s.value, t.search.value);
    L !== t.search.value && ($ === "push" ? t.push(L) : t.replace(L));
  }, d = () => Et(e.navigationMode) ?? "push", _ = () => Et(e.facetNavigationMode) ?? "replace", w = (g, $) => {
    const L = g.page ?? (ys(g) ? 1 : a.value.page);
    u({ ...a.value, ...g, page: L }, $);
  }, k = (g, $) => {
    const L = a.value.facets[g];
    if (!L) return;
    const O = { ...a.value.facets, [g]: $(L) };
    w({ facets: O }, _());
  }, b = (g) => {
    const $ = g === null ? null : mt(n.value, g);
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
    narrow(g, $, L) {
      w({ expr: g, ...b($), ...L ? { view: L } : {} }, d());
    },
    setPage(g, $) {
      w({ page: Math.max(1, Math.floor(g)) }, $ ?? d());
    },
    setFacet(g, $) {
      k(g, () => $);
    },
    toggleChip(g, $) {
      k(g, (L) => L.kind !== "chips" ? L : { kind: "chips", selected: L.selected.includes($) ? L.selected.filter((N) => N !== $) : [...L.selected, $] });
    },
    setRange(g, $, L) {
      k(g, (O) => O.kind === "range" ? { kind: "range", min: $, max: L } : O);
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
        const $ = Rl(st(a.value.expr), g.group ?? 0, g.index ?? 0);
        w({ expr: an($) }, d());
        return;
      }
      k(g.facetKey, ($) => $.kind === "chips" && g.option ? { kind: "chips", selected: $.selected.filter((L) => L !== g.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      w({ entity: null, expr: "", facets: It(null) }, d());
    },
    reset() {
      u(Bn(n.value, s.value), d());
    },
    hrefFor(g) {
      const $ = { ...a.value, ...g };
      return $.page = g.page ?? (ys(g) ? 1 : a.value.page), $.facets = Js(mt(n.value, $.entity), $.facets), `${t.path.value}${Es($, n.value, s.value, t.search.value)}`;
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
    let L = !0;
    const O = () => g === l, N = () => {
      L && (L = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return O();
      },
      insert(I, W) {
        if (!O()) return;
        const S = Array.isArray(I) ? I : [I];
        if (!S.length) return;
        N();
        const R = [...t.value];
        R.splice(W ?? R.length, 0, ...S), t.value = $ > 0 ? R.slice(0, $) : R, n.value += S.length;
      },
      set(I) {
        O() && (I.rows && (N(), t.value = $ > 0 ? I.rows.slice(0, $) : I.rows, n.value = I.rows.length), I.total !== void 0 && (n.value = I.total));
      },
      close() {
        O() && (s.value = !1);
      },
      fail(I) {
        O() && (_(I), s.value = !1);
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
    }, L = e.source.value;
    if (L.stream) {
      s.value = !0;
      try {
        r = L.stream($, w(g, $.limit)) ?? null;
      } catch (N) {
        _(N), s.value = !1;
      }
      return;
    }
    let O;
    try {
      O = L.query($);
    } catch (N) {
      _(N);
      return;
    }
    if (!(O instanceof Promise)) {
      d(O), s.value = !1;
      return;
    }
    s.value = !0, O.then((N) => {
      g === l && d(N);
    }).catch((N) => {
      g === l && _(N);
    }).finally(() => {
      g === l && (s.value = !1);
    });
  }, C = v(() => {
    const g = u();
    return `${JSON.stringify(Zs.map(($) => g[$]))}|${g.page}`;
  });
  return ye([e.source, C, e.schema, e.entity, e.limit], b, {
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
    const i = sn(Te(r.columns ?? [], "identity"), o);
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
  return ye([e.source, e.schema, e.terms], () => {
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
}, zr = { class: "dc-header__sr" }, Rr = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Tr = ["disabled"], Lr = ["title"], Fr = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Nr = ["disabled"], Dr = {
  key: 1,
  class: "dc-header__actions"
}, Ir = /* @__PURE__ */ de({
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
    const n = e, s = t, a = be(), l = v(() => a.schema.value), r = v(
      () => a.hasFacets.value || !!a.query.value.expr.trim() || !!a.within.value
    ), o = v(() => l.value.formatCount ?? pt);
    function i(E) {
      return E.key === a.query.value.entity && r.value && !n.hideCount ? o.value(a.total.value) : E.count;
    }
    function u(E) {
      return `${E.label} · ${i(E)}`;
    }
    const d = v(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${o.value(a.total.value)}`), _ = v(() => {
      const E = a.within.value.trim();
      return E ? Gn({ ...a.query.value, expr: E, facets: {} }, null) : [];
    }), w = v(
      () => (n.views ?? [...Ws]).map((E) => ({ key: E, label: pl[E] }))
    ), k = v(() => Hs(a.query.value.view, n.views)), b = v(
      () => !(a.within.value && a.query.value.entity === null && k.value === "cards")
    );
    function C(E) {
      a.setView(E.target.value);
    }
    const g = v(
      () => a.sorts.value.map((E) => ({ key: E.key, label: E.label }))
    ), $ = v(
      () => g.value.length > 0 && a.query.value.entity !== null && !a.within.value
    );
    function L(E) {
      a.setSort(E.target.value);
    }
    const O = v(() => a.query.value.dir === "desc"), N = v(
      () => a.terms.value.filter((E) => E.facetKey !== dn).map((E, F, q) => {
        const ke = q[F - 1];
        return {
          term: E,
          or: ke?.group !== void 0 && E.group !== void 0 && E.group !== ke.group
        };
      })
    ), I = or({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [..._.value, ...a.terms.value])
    });
    function W(E) {
      const F = I.nameOf(E);
      return F ? `${E.field}:${F} (${E.value})` : E.label;
    }
    function S(E) {
      const F = E.target.value;
      a.setEntity(F || null);
    }
    function R(E) {
      E.target?.closest("button, select, label") || s("toggle");
    }
    const ee = U(null), ne = U("");
    function ie() {
      const E = ee.value;
      if (!E) {
        ne.value = "";
        return;
      }
      const F = E.scrollLeft > 1, q = E.scrollWidth - E.clientWidth - E.scrollLeft > 1;
      ne.value = F && q ? "both" : F ? "start" : q ? "end" : "";
    }
    let G = null;
    ye(
      ee,
      (E) => {
        G?.disconnect(), G = null, ie(), !(!E || typeof ResizeObserver > "u") && (G = new ResizeObserver(ie), G.observe(E));
      },
      { flush: "post" }
    ), ye(N, ie, { flush: "post" }), je(() => G?.disconnect());
    const ve = v(() => a.query.value.page), xe = v(
      () => (a.pageCount.value > 1 || !!n.pagesNote) && !On(a.query.value)
    ), x = v(
      () => `${a.pending.value ? "~" : ""}${pt(a.pageCount.value)}`
    ), B = v(() => {
      let E = `Page ${pt(ve.value)} of ${x.value}`;
      const F = a.rows.value.length;
      if (F) {
        const q = a.offset.value + 1, ke = `${a.pending.value ? "~" : ""}${pt(a.total.value)}`;
        E += ` — rows ${pt(q)} to ${pt(q + F - 1)} of ${ke}`;
      }
      return n.pagesNote ? `${E}
${n.pagesNote}` : E;
    });
    return (E, F) => (f(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      y("div", {
        class: "dc-header__trigger",
        onClick: R
      }, [
        y("span", cr, z(l.value.label), 1),
        _.value.length ? (f(), m("span", ur, [
          F[4] || (F[4] = y("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), m(Y, null, oe(_.value, (q) => (f(), m("span", {
            key: `scope:${q.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: W(q)
          }, z(W(q)), 9, dr))), 128))
        ])) : T("", !0),
        y("div", {
          ref_key: "termBar",
          ref: ee,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": ne.value,
          title: P(a).summary.value,
          onScroll: ie
        }, [
          b.value ? (f(), m("label", pr, [
            F[6] || (F[6] = y("span", { class: "dc-header__sr" }, "Type", -1)),
            y("span", vr, [
              y("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: P(a).query.value.entity ?? "",
                onChange: S
              }, [
                y("option", hr, z(d.value), 1),
                (f(!0), m(Y, null, oe(P(a).entities.value, (q) => (f(), m("option", {
                  key: q.key,
                  value: q.key
                }, z(u(q)), 9, _r))), 128))
              ], 40, mr),
              F[5] || (F[5] = y("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ])) : T("", !0),
          y("label", gr, [
            F[8] || (F[8] = y("span", { class: "dc-header__sr" }, "View", -1)),
            y("span", yr, [
              y("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: k.value,
                onChange: C
              }, [
                (f(!0), m(Y, null, oe(w.value, (q) => (f(), m("option", {
                  key: q.key,
                  value: q.key
                }, z(q.label), 9, kr))), 128))
              ], 40, wr),
              F[7] || (F[7] = y("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          $.value ? (f(), m(Y, { key: 1 }, [
            y("label", br, [
              F[10] || (F[10] = y("span", { class: "dc-header__sr" }, "Sort", -1)),
              y("span", $r, [
                y("select", {
                  class: "dc-header__pick-select dc-header__sort-select dc-mono",
                  value: P(a).sort.value.key,
                  onChange: L
                }, [
                  (f(!0), m(Y, null, oe(g.value, (q) => (f(), m("option", {
                    key: q.key,
                    value: q.key
                  }, z(q.label), 9, Cr))), 128))
                ], 40, xr),
                F[9] || (F[9] = y("span", {
                  class: "dc-header__pick-mark",
                  "aria-hidden": "true"
                }, "▾", -1))
              ])
            ]),
            y("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: O.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${O.value ? "descending" : "ascending"}`,
              onClick: F[0] || (F[0] = (q) => P(a).toggleDirection())
            }, z(O.value ? "↓" : "↑"), 9, Mr)
          ], 64)) : T("", !0),
          (f(!0), m(Y, null, oe(N.value, (q) => (f(), m(Y, {
            key: q.term.id
          }, [
            q.or ? (f(), m("span", Sr, "or")) : T("", !0),
            y("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${W(q.term)}`,
              "aria-label": `Remove ${W(q.term)}`,
              onClick: (ke) => P(a).removeTerm(q.term)
            }, z(W(q.term)), 9, Er)
          ], 64))), 128))
        ], 40, fr),
        y("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: F[1] || (F[1] = (q) => s("toggle"))
        }, [
          y("span", Ar, z(e.expanded ? "▲" : "▼"), 1),
          y("span", zr, z(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Pr)
      ]),
      xe.value ? (f(), m("nav", Rr, [
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: ve.value <= 1,
          onClick: F[2] || (F[2] = (q) => P(a).setPage(ve.value - 1))
        }, [...F[11] || (F[11] = [
          y("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Tr),
        y("span", {
          class: "dc-header__page dc-mono",
          title: B.value,
          "aria-hidden": "true"
        }, z(ve.value) + " / " + z(x.value), 9, Lr),
        y("span", Fr, z(B.value), 1),
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: ve.value >= P(a).pageCount.value,
          onClick: F[3] || (F[3] = (q) => P(a).setPage(ve.value + 1))
        }, [...F[12] || (F[12] = [
          y("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Nr)
      ])) : T("", !0),
      E.$slots.actions ? (f(), m("div", Dr, [
        ge(E.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ], 8, ir));
  }
}), fe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, fa = /* @__PURE__ */ fe(Ir, [["__scopeId", "data-v-1004766f"]]), Or = { class: "dc-facet" }, Br = ["id"], Kr = { class: "dc-facet__body" }, Vr = ["aria-labelledby"], qr = ["aria-pressed", "data-dc-active", "onClick"], Wr = ["aria-labelledby"], Ur = ["aria-label", "placeholder", "onKeydown"], Hr = ["aria-label", "placeholder", "onKeydown"], jr = ["aria-checked"], Xr = { class: "dc-switch__text" }, Gr = ["data-dc-active"], Yr = /* @__PURE__ */ de({
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
    ye(
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
    return (_, w) => (f(), m("div", Or, [
      y("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, z(e.facet.label), 9, Br),
      y("div", Kr, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), m("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), m(Y, null, oe(e.facet.options, (k) => (f(), m("button", {
            key: k,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(k),
            "data-dc-active": a.value.has(k) ? "true" : "false",
            onClick: (b) => l(k)
          }, z(k), 9, qr))), 128))
        ], 8, Vr)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), m("div", {
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
            onKeydown: At(Ne(u, ["prevent"]), ["enter"])
          }, null, 40, Ur), [
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
            onKeydown: At(Ne(u, ["prevent"]), ["enter"])
          }, null, 40, Hr), [
            [Cn, o.value]
          ])
        ], 8, Wr)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          y("span", Xr, z(e.facet.text), 1),
          y("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...w[3] || (w[3] = [
            y("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, Gr)
        ], 8, jr)) : T("", !0)
      ])
    ]));
  }
}), pa = /* @__PURE__ */ fe(Yr, [["__scopeId", "data-v-36d1334b"]]), Qr = ["id"], Zr = { class: "dc-panel__section dc-panel__rows" }, Jr = { class: "dc-panel__row" }, eo = ["for"], to = ["title", "aria-label", "onClick"], no = ["id", "placeholder", "onKeydown"], so = { class: "dc-panel__actions" }, ao = ["disabled"], lo = {
  key: 0,
  class: "dc-panel__section"
}, ro = /* @__PURE__ */ de({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Bt(), a = be(), l = v(() => Tl(a.query.value.expr)), r = v(() => l.value.parts.map(Vt)), o = U(l.value.text), i = U(null);
    ye(
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
      a.setExpression(xs(g.filter((L, O) => O !== C), $));
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
      onKeydown: g[2] || (g[2] = At(Ne(($) => n("close"), ["stop"]), ["esc"]))
    }, [
      y("section", Zr, [
        y("div", Jr, [
          y("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, eo),
          y("div", {
            class: "dc-field",
            onMousedown: g[1] || (g[1] = Ne(($) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), m(Y, null, oe(r.value, ($, L) => (f(), m("button", {
              key: `${L}:${$}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${$}`,
              "aria-label": `Remove ${$}`,
              onClick: (O) => _(L)
            }, z($), 9, to))), 128)),
            xn(y("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": g[0] || (g[0] = ($) => o.value = $),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: r.value.length ? "" : P(a).schema.value.placeholder,
              onKeydown: [
                At(Ne(d, ["prevent"]), ["enter"]),
                At(w, ["backspace"])
              ]
            }, null, 40, no), [
              [Cn, o.value]
            ])
          ], 32)
        ]),
        P(a).entity.value ? (f(!0), m(Y, { key: 0 }, oe(P(a).entity.value.facets, ($) => (f(), ae(pa, {
          key: $.key,
          facet: $,
          value: P(a).query.value.facets[$.key],
          onUpdate: (L) => b($.key, L)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : T("", !0),
        y("div", so, [
          y("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          y("button", {
            type: "button",
            class: "dc-button",
            disabled: P(a).isPristine.value && !u.value,
            onClick: k
          }, " Reset ", 8, ao)
        ])
      ]),
      s["panel-section"] ? (f(), m("section", lo, [
        ge(C.$slots, "panel-section", {}, void 0, !0)
      ])) : T("", !0)
    ], 40, Qr));
  }
}), va = /* @__PURE__ */ fe(ro, [["__scopeId", "data-v-2642c02d"]]), oo = {
  key: 0,
  class: "dc-actions"
}, io = {
  key: 0,
  class: "dc-actions__select"
}, co = { class: "dc-actions__all" }, uo = ["checked", "indeterminate"], fo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, po = { class: "dc-actions__ops" }, vo = ["disabled"], mo = ["disabled"], ho = /* @__PURE__ */ de({
  __name: "RecordActions",
  setup(e) {
    const t = be(), n = v(() => t.entity.value), s = v(() => !On(t.query.value)), a = v(() => s.value && t.selectable.value), l = v(
      () => s.value && (a.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), r = v(() => t.selection.value.ids.length), o = v(() => t.rows.value.filter((w) => t.isSelected(w)).length), i = v(
      () => t.rows.value.length > 0 && o.value === t.rows.value.length
    ), u = v(() => o.value > 0 && !i.value), d = v(() => r.value ? `${r.value} selected` : "Select all");
    function _(w) {
      return r.value ? `${w} ${r.value}` : w;
    }
    return (w, k) => l.value ? (f(), m("div", oo, [
      a.value ? (f(), m("div", io, [
        y("label", co, [
          y("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: i.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: k[0] || (k[0] = (b) => P(t).selectPage(!i.value))
          }, null, 40, uo),
          y("span", fo, z(d.value), 1)
        ]),
        r.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: k[1] || (k[1] = (b) => P(t).clearSelection())
        }, " Clear ")) : T("", !0)
      ])) : T("", !0),
      y("div", po, [
        n.value?.create ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: k[2] || (k[2] = (b) => P(t).create(n.value))
        }, [
          k[5] || (k[5] = y("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ie(" " + z(n.value.create), 1)
        ])) : T("", !0),
        n.value?.duplicate ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !r.value,
          onClick: k[3] || (k[3] = (b) => P(t).duplicate())
        }, z(_(n.value.duplicate)), 9, vo)) : T("", !0),
        n.value?.delete ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !r.value,
          onClick: k[4] || (k[4] = (b) => P(t).delete())
        }, z(_(n.value.delete)), 9, mo)) : T("", !0)
      ])
    ])) : T("", !0);
  }
}), ma = /* @__PURE__ */ fe(ho, [["__scopeId", "data-v-ca4aca14"]]);
function _o(e, t) {
  if (!e) return null;
  const n = ze(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function go(e, t) {
  const n = Te(t, "state"), s = Te(t, "tint");
  return {
    identity: sn(Te(t, "identity"), e),
    reference: sn(Te(t, "reference"), e),
    metrics: ea(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Kt(a, e)
    })),
    state: n ? ze(n, e) ?? null : null,
    updated: sn(Te(t, "updated"), e),
    image: _o(Te(t, "image"), e),
    tint: s ? ze(s, e) ?? null : null
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
    parts: go(e, l),
    pinned: s,
    selected: a
  };
}
function bt() {
  const e = be(), t = v(
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
const yo = ["data-dc-status"], wo = /* @__PURE__ */ de({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, z(e.status), 9, yo));
  }
}), qt = /* @__PURE__ */ fe(wo, [["__scopeId", "data-v-23e59fbf"]]), ko = ["title"], bo = { key: 1 }, $o = /* @__PURE__ */ de({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = be(), s = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), a = v(() => t.column.label ?? ""), l = v(() => Kt(t.column, t.entry.row));
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
      ge(o.$slots, "default", {}, () => [
        Ie(z(l.value), 1)
      ], !0)
    ], 8, ko)) : (f(), m("span", bo, [
      ge(o.$slots, "default", {}, () => [
        Ie(z(l.value), 1)
      ], !0)
    ]));
  }
}), Wt = /* @__PURE__ */ fe($o, [["__scopeId", "data-v-3bd0cbdb"]]), xo = ["data-dc-active", "aria-pressed", "aria-label"], Co = /* @__PURE__ */ de({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = be();
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
    }, z(e.pinned ? "★" : "☆"), 9, xo));
  }
}), Yn = /* @__PURE__ */ fe(Co, [["__scopeId", "data-v-ef63d763"]]), Mo = ["src"], So = /* @__PURE__ */ de({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = U(!1);
    return ye(
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
    }, null, 40, Mo)) : T("", !0);
  }
}), Qn = /* @__PURE__ */ fe(So, [["__scopeId", "data-v-afaab300"]]), Eo = ["title", "aria-label"], Po = /* @__PURE__ */ de({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), s = v(
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
    }, " → ", 8, Eo)) : T("", !0);
  }
}), Ut = /* @__PURE__ */ fe(Po, [["__scopeId", "data-v-e481cf12"]]), Ao = ["checked", "aria-label"], $t = /* @__PURE__ */ de({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = be();
    function s(a) {
      a.stopPropagation(), n.toggleSelect(t.row);
    }
    return (a, l) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: s
    }, null, 8, Ao));
  }
}), zo = { class: "dc-cards" }, Ro = { class: "dc-card__top dc-mono" }, To = { class: "dc-card__lead" }, Lo = {
  key: 1,
  class: "dc-card__entity"
}, Fo = { class: "dc-card__top-right" }, No = ["onClick"], Do = { class: "dc-card__names" }, Io = { class: "dc-card__primary" }, Oo = { class: "dc-card__secondary dc-mono" }, Bo = { class: "dc-card__metrics dc-mono" }, Ko = {
  key: 0,
  class: "dc-card__date"
}, Vo = /* @__PURE__ */ de({
  __name: "CardsView",
  setup(e) {
    const t = be(), n = bt(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), m("div", zo, [
      (f(!0), m(Y, null, oe(P(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-card"
      }, [
        y("div", Ro, [
          y("span", To, [
            P(t).selectable.value ? (f(), ae($t, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            Ie(" " + z(r.ordinal) + " ", 1),
            s.value ? (f(), m("span", Lo, z(r.entityLabel), 1)) : T("", !0)
          ]),
          y("span", Fo, [
            r.parts.state ? (f(), ae(qt, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : T("", !0),
            he(Ut, { entry: r }, null, 8, ["entry"]),
            P(t).pinnable.value ? (f(), ae(Yn, {
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
          onClick: (o) => P(t).activate(r.row)
        }, [
          r.parts.image ? (f(), ae(Qn, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : T("", !0),
          y("span", Do, [
            y("span", Io, z(r.parts.identity), 1),
            y("span", Oo, z(r.parts.reference), 1)
          ])
        ], 8, No),
        y("div", Bo, [
          (f(!0), m(Y, null, oe(r.parts.metrics.slice(0, 2), (o) => (f(), ae(Wt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, {
            default: De(() => [
              Ie(z(o.label) + " " + z(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (f(), m("span", Ko, z(r.parts.updated), 1)) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), _a = /* @__PURE__ */ fe(Vo, [["__scopeId", "data-v-05d69cb4"]]), qo = { class: "dc-grid" }, Wo = ["onClick"], Uo = { class: "dc-tile__scrim" }, Ho = { class: "dc-tile__top dc-mono" }, jo = { class: "dc-tile__chip" }, Xo = { class: "dc-tile__caption" }, Go = { class: "dc-tile__secondary dc-truncate" }, Yo = { class: "dc-tile__primary" }, Qo = /* @__PURE__ */ de({
  __name: "GridView",
  setup(e) {
    const t = be(), n = bt();
    return (s, a) => (f(), m("div", qo, [
      (f(!0), m(Y, null, oe(P(n), (l) => (f(), m("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        y("button", {
          type: "button",
          class: "dc-tile",
          style: Re({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => P(t).activate(l.row)
        }, [
          l.parts.image ? (f(), ae(Qn, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : T("", !0),
          y("span", Uo, [
            y("span", Ho, [
              y("span", jo, z(l.ordinal), 1)
            ]),
            y("span", Xo, [
              y("span", Go, z(l.parts.reference), 1),
              y("span", Yo, z(l.parts.identity), 1)
            ])
          ])
        ], 12, Wo),
        P(t).selectable.value ? (f(), ae($t, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), ga = /* @__PURE__ */ fe(Qo, [["__scopeId", "data-v-c9789911"]]), Zo = { class: "dc-links" }, Jo = ["onClick"], ei = { class: "dc-link__primary dc-truncate" }, ti = { class: "dc-link__secondary dc-mono dc-truncate" }, ni = /* @__PURE__ */ de({
  __name: "LinksView",
  setup(e) {
    const t = be(), n = bt();
    return (s, a) => (f(), m("div", Zo, [
      (f(!0), m(Y, null, oe(P(n), (l) => (f(), m("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (f(), ae($t, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        y("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => P(t).activate(l.row)
        }, [
          y("span", ei, z(l.parts.identity), 1),
          y("span", ti, z(l.parts.reference), 1)
        ], 8, Jo)
      ]))), 128))
    ]));
  }
}), ya = /* @__PURE__ */ fe(ni, [["__scopeId", "data-v-cc3a66fa"]]), si = {
  class: "dc-list",
  role: "list"
}, ai = ["onClick"], li = { class: "dc-list__ordinal dc-mono" }, ri = { class: "dc-list__identity" }, oi = { class: "dc-list__primary dc-truncate" }, ii = { class: "dc-list__secondary dc-mono dc-truncate" }, ci = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, ui = { class: "dc-list__metrics dc-mono" }, di = { class: "dc-list__trailing" }, fi = /* @__PURE__ */ de({
  __name: "ListView",
  setup(e) {
    const t = be(), n = bt(), s = v(() => t.isEverything.value);
    return (a, l) => (f(), m("div", si, [
      (f(!0), m(Y, null, oe(P(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (f(), ae($t, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        y("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => P(t).activate(r.row)
        }, [
          y("span", li, z(r.ordinal), 1),
          y("span", ri, [
            y("span", oi, z(r.parts.identity), 1),
            y("span", ii, z(r.parts.reference), 1)
          ])
        ], 8, ai),
        s.value ? (f(), m("span", ci, z(r.entityLabel), 1)) : T("", !0),
        y("span", ui, [
          (f(!0), m(Y, null, oe(r.parts.metrics.slice(0, 2), (o) => (f(), ae(Wt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        y("span", di, [
          r.parts.state ? (f(), ae(qt, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : T("", !0),
          he(Ut, { entry: r }, null, 8, ["entry"]),
          P(t).pinnable.value ? (f(), ae(Yn, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), An = /* @__PURE__ */ fe(fi, [["__scopeId", "data-v-6c92ff27"]]), pi = { class: "dc-preview" }, vi = { class: "dc-preview__pager dc-mono" }, mi = ["disabled"], hi = { "aria-live": "polite" }, _i = ["disabled"], gi = {
  key: 0,
  class: "dc-preview__card"
}, yi = { class: "dc-preview__body" }, wi = { class: "dc-preview__top" }, ki = { class: "dc-preview__badges" }, bi = { class: "dc-preview__entity dc-mono" }, $i = { class: "dc-preview__marks" }, xi = { class: "dc-preview__primary" }, Ci = { class: "dc-preview__secondary dc-mono" }, Mi = { class: "dc-preview__fields" }, Si = { class: "dc-preview__key" }, Ei = { class: "dc-preview__value dc-mono" }, Pi = /* @__PURE__ */ de({
  __name: "PreviewView",
  setup(e) {
    const t = be(), n = bt(), s = U(0);
    ye(n, (i) => {
      s.value > i.length - 1 && (s.value = Math.max(0, i.length - 1));
    });
    const a = v(() => n.value[s.value]), l = v(() => {
      const i = a.value;
      if (!i) return [];
      const u = Te(i.columns, "reference"), d = Te(i.columns, "updated");
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
    return (i, u) => (f(), m("div", pi, [
      y("div", vi, [
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (d) => o(-1))
        }, " ‹ ", 8, mi),
        y("span", hi, z(r.value), 1),
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= P(n).length - 1,
          onClick: u[1] || (u[1] = (d) => o(1))
        }, " › ", 8, _i)
      ]),
      a.value ? (f(), m("div", gi, [
        y("div", {
          class: "dc-preview__media",
          style: Re({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        y("div", yi, [
          y("div", wi, [
            y("span", ki, [
              P(t).selectable.value ? (f(), ae($t, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              a.value.parts.state ? (f(), ae(qt, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              y("span", bi, z(a.value.entityLabel), 1)
            ]),
            y("span", $i, [
              he(Ut, { entry: a.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (f(), ae(Yn, {
                key: 0,
                row: a.value.row,
                name: a.value.parts.identity,
                pinned: a.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : T("", !0)
            ])
          ]),
          y("div", null, [
            y("div", xi, z(a.value.parts.identity), 1),
            y("div", Ci, z(a.value.parts.reference), 1)
          ]),
          y("dl", Mi, [
            (f(!0), m(Y, null, oe(l.value, (d) => (f(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              y("dt", Si, z(d.key), 1),
              y("dd", Ei, [
                d.column && a.value ? (f(), ae(Wt, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), m(Y, { key: 1 }, [
                  Ie(z(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          y("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: u[2] || (u[2] = (d) => P(t).activate(a.value.row))
          }, " Open record → ")
        ])
      ])) : T("", !0)
    ]));
  }
}), wa = /* @__PURE__ */ fe(Pi, [["__scopeId", "data-v-a236412c"]]);
function Ai() {
  const e = be();
  return v(() => yl(e.schema.value, e.entity.value));
}
const zi = ["title"], Ri = {
  key: 5,
  class: "dc-cell__text"
}, Ti = /* @__PURE__ */ de({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), s = v(() => t.column.kind ?? "text"), a = v(() => ze(t.column, t.entry.row)), l = v(
      () => s.value === "ordinal" ? t.entry.ordinal : Kt(t.column, t.entry.row)
    ), r = v(() => a.value), o = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => En(t.column)), u = v(() => ta(t.column, t.entry.row));
    function d(_) {
      o.value && (_.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (_, w) => s.value === "component" && e.column.component ? (f(), ae(Bs(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (f(), ae(qt, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : s.value === "image" ? (f(), ae(Qn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof a.value == "string" ? a.value : "",
      style: Re({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), ae(Wt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), m("button", {
      key: 4,
      type: "button",
      class: cn(["dc-table__open", { "dc-truncate": i.value }]),
      title: u.value,
      onClick: d
    }, z(l.value), 11, zi)) : (f(), m("span", Ri, z(l.value), 1));
  }
}), Ps = /* @__PURE__ */ fe(Ti, [["__scopeId", "data-v-d746be44"]]), Li = {
  key: 0,
  class: "dc-table__none"
}, Fi = { class: "dc-table__detail" }, Ni = ["data-dc-wrap"], Di = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Ii = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Oi = ["onClick"], Bi = ["onClick"], Ki = {
  key: 0,
  class: "dc-table__pick"
}, Vi = ["data-dc-align", "data-dc-hide", "title"], qi = {
  key: 0,
  class: "dc-table__name"
}, Wi = /* @__PURE__ */ de({
  __name: "TableView",
  setup(e) {
    const t = be(), n = bt(), s = Ai(), a = v(
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
    return (w, k) => P(s).length ? (f(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": a.value ? "" : void 0
    }, [
      y("thead", null, [
        y("tr", null, [
          P(t).selectable.value ? (f(), m("th", Di, [...k[3] || (k[3] = [
            y("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : T("", !0),
          (f(!0), m(Y, null, oe(P(s), (b, C) => (f(), m("th", {
            key: P(ws)(b, C),
            scope: "col",
            class: cn(P(bs)(b)),
            style: Re({ width: b.width }),
            "data-dc-align": P(ks)(b),
            "data-dc-hide": b.hideBelow,
            "aria-sort": u(b),
            title: b.hint
          }, [
            i(b) ? (f(), m("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (g) => l(b.sort)
            }, z(b.label), 9, Oi)) : (f(), m(Y, { key: 1 }, [
              Ie(z(b.label), 1)
            ], 64))
          ], 14, Ii))), 128))
        ])
      ]),
      y("tbody", null, [
        (f(!0), m(Y, null, oe(P(n), (b) => (f(), m("tr", {
          key: b.key,
          class: "dc-table__row",
          onClick: (C) => P(t).activate(b.row)
        }, [
          P(t).selectable.value ? (f(), m("td", Ki, [
            he($t, {
              row: b.row,
              selected: b.selected,
              name: b.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          (f(!0), m(Y, null, oe(P(s), (C, g) => (f(), m("td", {
            key: P(ws)(C, g),
            class: cn(d(C)),
            "data-dc-align": P(ks)(C),
            "data-dc-hide": C.hideBelow,
            title: _(C, b)
          }, [
            C.scope ? (f(), m("span", qi, [
              he(Ps, {
                column: C,
                entry: b
              }, null, 8, ["column", "entry"]),
              he(Ut, { entry: b }, null, 8, ["entry"])
            ])) : (f(), ae(Ps, {
              key: 1,
              column: C,
              entry: b
            }, null, 8, ["column", "entry"]))
          ], 10, Vi))), 128))
        ], 8, Bi))), 128))
      ])
    ], 8, Ni)) : (f(), m("p", Li, [
      k[2] || (k[2] = y("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      y("span", Fi, [
        Ie(z(r.value) + " has no ", 1),
        k[0] || (k[0] = y("code", null, "columns", -1)),
        k[1] || (k[1] = Ie(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ka = /* @__PURE__ */ fe(Wi, [["__scopeId", "data-v-cb4433f9"]]);
function Ui(e) {
  const t = Nt([]), n = U(!1), s = Nt(null);
  let a = 0;
  const l = (i, u, d, _, w) => ({
    entity: i,
    rows: u.rows.map(
      (k, b) => ha(k, b, i, e.isPinned(k.id))
    ),
    total: u.total,
    count: d ? i.count : String(u.total),
    pinned: Hi(_, u, w)
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
        ({ entity: $, outcome: L }) => l($, L, b, d, C)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(g.map(({ outcome: $ }) => Promise.resolve($))).then(($) => {
      i === a && (t.value = $.map(
        (L, O) => l(g[O].entity, L, b, d, C)
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
  return ye(
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
function Hi(e, t, n) {
  const s = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !s)
    return !1;
  const a = n.trim();
  if (!a)
    return !1;
  const l = Kn(e, s);
  return !!l && ra(a, l) === a;
}
const ji = ["data-dc-pending"], Xi = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Gi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Yi = {
  key: 2,
  class: "dc-types__state"
}, Qi = ["data-dc-empty"], Zi = ["onClick"], Ji = { class: "dc-type__name" }, ec = { class: "dc-type__count dc-mono" }, tc = { class: "dc-type__sr" }, nc = {
  key: 0,
  class: "dc-type__empty"
}, sc = ["onClick"], ac = { class: "dc-type__identity" }, lc = { class: "dc-type__primary dc-truncate" }, rc = { class: "dc-type__secondary dc-mono dc-truncate" }, oc = { class: "dc-type__trailing dc-mono" }, ic = { class: "dc-type__metric-value" }, cc = { class: "dc-type__metric-label" }, uc = {
  key: 0,
  class: "dc-type__date"
}, dc = ["onClick"], fc = /* @__PURE__ */ de({
  __name: "TypeCardsView",
  setup(e) {
    const t = be(), { previews: n, pending: s, error: a } = Ui({
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
      "data-dc-pending": P(s) ? "true" : "false"
    }, [
      ge(o.$slots, "before", {}, void 0, !0),
      P(a) ? (f(), m("p", Xi, " Could not load results: " + z(P(a) instanceof Error ? P(a).message : "the data source failed."), 1)) : !r.value.length && P(s) ? (f(), m("p", Gi, " Running query… ")) : r.value.length ? T("", !0) : (f(), m("p", Yi, z(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), m(Y, null, oe(r.value, (u) => (f(), m("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.rows.length ? "false" : "true"
      }, [
        y("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => P(t).setEntity(u.entity.key)
        }, [
          y("span", Ji, z(u.entity.label), 1),
          y("span", ec, z(u.count), 1),
          i[0] || (i[0] = y("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          y("span", tc, "Show only " + z(u.entity.label.toLowerCase()), 1)
        ], 8, Zi),
        u.rows.length ? T("", !0) : (f(), m("p", nc, z(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), m(Y, null, oe(u.rows, (d) => (f(), m("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          y("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (_) => P(t).activate(d.row)
          }, [
            y("span", ac, [
              y("span", lc, z(d.parts.identity), 1),
              y("span", rc, z(d.parts.reference), 1)
            ])
          ], 8, sc),
          y("span", oc, [
            (f(!0), m(Y, null, oe(d.parts.metrics.slice(0, 1), (_) => (f(), ae(Wt, {
              key: _.column.key ?? _.label,
              class: "dc-type__metric",
              entry: d,
              column: _.column
            }, {
              default: De(() => [
                y("span", ic, z(_.text), 1),
                y("span", cc, z(_.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), m("span", uc, z(d.parts.updated), 1)) : T("", !0),
            he(Ut, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => P(t).create(u.entity)
        }, [
          i[1] || (i[1] = y("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ie(" " + z(u.entity.create), 1)
        ], 8, dc)) : T("", !0)
      ], 8, Qi))), 128)),
      ge(o.$slots, "after", {}, void 0, !0)
    ], 8, ji));
  }
}), ba = /* @__PURE__ */ fe(fc, [["__scopeId", "data-v-4e45be99"]]), pc = ["data-dc-pending"], vc = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, mc = { class: "dc-results__detail" }, hc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, _c = {
  key: 3,
  class: "dc-results__state"
}, gc = { class: "dc-results__detail" }, yc = /* @__PURE__ */ de({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), s = Bt(), a = {
      list: An,
      cards: _a,
      grid: ga,
      table: ka,
      links: ya,
      preview: wa
    }, l = v(() => On(n.query.value)), r = v(() => Hs(n.query.value.view, t.views)), o = v(() => a[r.value] ?? An), i = v(() => n.rows.value.length > 0), u = v(() => n.error.value !== null), d = U(null);
    return ye(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (_, w) => (f(), m("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": P(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), ae(ba, { key: 0 }, tn({ _: 2 }, [
        s["cards-before"] ? {
          name: "before",
          fn: De(() => [
            ge(_.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        s["cards-after"] ? {
          name: "after",
          fn: De(() => [
            ge(_.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), m("p", vc, [
        w[1] || (w[1] = y("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        y("span", mc, z(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && P(n).pending.value ? (f(), m("p", hc, [...w[2] || (w[2] = [
        y("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), ae(Bs(o.value), { key: 4 })) : (f(), m("div", _c, [
        w[3] || (w[3] = y("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        y("span", gc, z(P(n).summary.value), 1),
        P(n).isPristine.value ? T("", !0) : (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: w[0] || (w[0] = (k) => P(n).clearFilters())
        }, z(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, pc));
  }
}), $a = /* @__PURE__ */ fe(yc, [["__scopeId", "data-v-41f54508"]]), wc = ["data-dc-theme"], kc = ["data-dc-width", "data-dc-align"], bc = { class: "dc-shell__panel" }, $c = /* @__PURE__ */ de({
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
    const s = e, a = n, l = zt(e, "open"), r = zt(e, "pinned"), o = zt(e, "selected"), i = Bt(), u = wt(qs, null), d = s.route || u ? null : dl(), _ = s.route ?? u ?? d;
    je(() => d?.dispose?.());
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
    ye(b.query, (x) => a("query-change", x)), ye(
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
    const $ = Ks() ?? "dc-query-panel", L = U(null);
    function O() {
      l.value && (l.value = !1, Dt(() => {
        L.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const N = v(() => new Set(r.value));
    function I(x) {
      const B = new Set(N.value);
      B.has(x.id) ? B.delete(x.id) : B.add(x.id), r.value = [...B], a("toggle-pin", x);
    }
    const W = v(() => {
      if (s.selectable === !0) return !0;
      const x = b.entity.value;
      return !!(x?.duplicate || x?.delete);
    }), S = v(() => new Set(o.value));
    function R(x) {
      const B = new Set(S.value);
      B.has(x.id) ? B.delete(x.id) : B.add(x.id), o.value = [...B];
    }
    function ee(x) {
      const B = new Set(S.value);
      for (const E of g.rows.value)
        x ? B.add(E.id) : B.delete(E.id);
      o.value = [...B];
    }
    function ne() {
      o.value.length && (o.value = []);
    }
    const ie = v(() => ({
      ids: [...o.value],
      rows: g.rows.value.filter((x) => S.value.has(x.id)),
      entity: b.entity.value
    }));
    ye(() => b.query.value.entity, ne);
    function G(x, B) {
      b.narrow(
        Hl(s.schema, b.query.value, x),
        B?.key ?? null,
        B ? void 0 : "cards"
      ), a("drill", x, B);
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
      isPinned: (x) => N.value.has(x.id),
      isPinnedId: (x) => N.value.has(x),
      togglePin: I,
      selectable: W,
      selection: ie,
      isSelected: (x) => S.value.has(x.id),
      toggleSelect: R,
      selectPage: ee,
      clearSelection: ne,
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
      duplicate: () => a("duplicate", ie.value),
      delete: () => a("delete", ie.value),
      drill: G
    }), xe = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: b.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: O
    }), (x, B) => (f(), m("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Re(xe.value)
    }, [
      y("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        he(fa, {
          ref_key: "headerRef",
          ref: L,
          expanded: l.value,
          "panel-id": P($),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: B[0] || (B[0] = (E) => l.value = !l.value)
        }, tn({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: De(() => [
              ge(x.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), m(Y, { key: 0 }, [
          y("div", {
            class: "dc-shell__scrim",
            onClick: O
          }),
          y("div", bc, [
            he(va, {
              "panel-id": P($),
              onClose: O
            }, tn({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: De(() => [
                  ge(x.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : T("", !0)
      ], 8, kc),
      he(ma),
      ge(x.$slots, "results", {
        rows: P(ve).rows.value,
        total: P(ve).total.value,
        offset: P(ve).offset.value,
        pageCount: P(ve).pageCount.value,
        query: P(ve).query.value,
        pending: P(ve).pending.value
      }, () => [
        he($a, { views: e.views }, tn({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: De(() => [
              ge(x.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: De(() => [
              ge(x.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, wc));
  }
}), xc = /* @__PURE__ */ fe($c, [["__scopeId", "data-v-6beb9a87"]]), Cc = ["data-dc-muted"], Mc = {
  key: 0,
  class: "dc-shell-card__head"
}, Sc = { class: "dc-shell-card__title" }, Ec = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Pc = {
  key: 0,
  class: "dc-shell-card__aside"
}, Ac = ["data-dc-flush"], zc = {
  key: 2,
  class: "dc-shell-card__foot"
}, Rc = /* @__PURE__ */ de({
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
      return d.some((_) => _.type === rl ? !1 : _.type === ol ? String(_.children ?? "").trim().length > 0 : _.type === Y ? l(_.children ?? []) : !0);
    }
    const r = v(() => !!t.title || o.value || a(s.head)), o = v(() => a(s.aside)), i = v(() => a(s.default)), u = v(() => a(s.foot));
    return (d, _) => (f(), m("section", {
      class: "dc-shell-card",
      style: Re(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      r.value ? (f(), m("header", Mc, [
        ge(d.$slots, "head", {}, () => [
          y("h2", Sc, z(e.title), 1),
          e.count !== void 0 ? (f(), m("span", Ec, z(e.count), 1)) : T("", !0)
        ], !0),
        o.value ? (f(), m("span", Pc, [
          ge(d.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ])) : T("", !0),
      i.value ? (f(), m("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        ge(d.$slots, "default", {}, void 0, !0)
      ], 8, Ac)) : T("", !0),
      u.value ? (f(), m("footer", zc, [
        ge(d.$slots, "foot", {}, void 0, !0)
      ])) : T("", !0)
    ], 12, Cc));
  }
}), $d = /* @__PURE__ */ fe(Rc, [["__scopeId", "data-v-75f2ef0b"]]), Tc = ["aria-label"], Lc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Fc = /* @__PURE__ */ de({
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
      (f(!0), m(Y, null, oe(e.options, (i, u) => (f(), m("button", {
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
      }, z(i.label), 43, Lc))), 128))
    ], 8, Tc));
  }
}), Nc = /* @__PURE__ */ fe(Fc, [["__scopeId", "data-v-63fb5482"]]), Rt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Dc = ["aria-label"], Ic = ["role", "aria-label"], Oc = ["data-dc-item"], Bc = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Kc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Vc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, qc = { class: "dc-menu__label dc-truncate" }, Wc = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Uc = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Hc = /* @__PURE__ */ de({
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
      () => s.items.flatMap((S, R) => Rt(S) ? [R] : [])
    ), w = v(() => {
      const S = [{ entries: [] }];
      return s.items.forEach((R, ee) => {
        R.heading ? S.push({ heading: R, entries: [] }) : S[S.length - 1]?.entries.push({ item: R, index: ee });
      }), S.filter((R) => R.entries.length > 0);
    }), k = U({ x: s.at.x, y: s.at.y });
    async function b() {
      k.value = { x: s.at.x, y: s.at.y }, await Dt();
      const S = l.value?.getBoundingClientRect();
      if (!S) return;
      const R = 8;
      let ee = s.at.x, ne = s.at.y;
      if (ee + S.width > window.innerWidth - R) {
        const ie = s.at.mirrorX === void 0 ? null : s.at.mirrorX - S.width;
        ee = ie !== null && ie >= R ? ie : window.innerWidth - S.width - R;
      }
      ne + S.height > window.innerHeight - R && (ne = window.innerHeight - S.height - R), k.value = { x: Math.max(R, ee), y: Math.max(R, ne) };
    }
    const C = v(() => ({ left: `${k.value.x}px`, top: `${k.value.y}px` }));
    function g(S) {
      o.value = S, S !== null && Dt(() => r.value[S]?.focus());
    }
    function $(S, R) {
      const ee = _.value;
      if (ee.length === 0) return null;
      if (S === null) return R === 1 ? ee[0] ?? null : ee[ee.length - 1] ?? null;
      const ne = ee.indexOf(S);
      return ne === -1 ? ee[0] ?? null : ee[(ne + R + ee.length) % ee.length] ?? null;
    }
    function L(S, R) {
      if (!s.items[S]?.items?.length) return;
      const ne = r.value[S]?.getBoundingClientRect(), ie = l.value?.getBoundingClientRect();
      !ne || !ie || (u.value = { x: ie.right - 4, y: ne.top - 4, mirrorX: ie.left + 4 }, i.value = S, d.value = R);
    }
    function O(S) {
      const R = i.value;
      i.value = null, u.value = null, S && R !== null && g(R);
    }
    function N(S) {
      const R = s.items[S];
      if (!(!R || !Rt(R))) {
        if (R.items?.length) {
          L(S, !0);
          return;
        }
        a("choose", R);
      }
    }
    function I(S) {
      const R = S.key;
      if (R === "Escape") {
        S.preventDefault(), S.stopPropagation(), i.value !== null ? O(!0) : a("dismiss");
        return;
      }
      if (R === "ArrowDown" || R === "ArrowUp") {
        S.preventDefault(), S.stopPropagation(), O(!1), g($(o.value, R === "ArrowDown" ? 1 : -1));
        return;
      }
      if (R === "Home" || R === "End") {
        S.preventDefault(), S.stopPropagation(), O(!1), g($(null, R === "Home" ? 1 : -1));
        return;
      }
      if (R === "ArrowRight") {
        const ee = o.value;
        ee !== null && s.items[ee]?.items?.length && (S.preventDefault(), S.stopPropagation(), L(ee, !0));
        return;
      }
      if (R === "ArrowLeft") {
        i.value !== null && (S.preventDefault(), S.stopPropagation(), O(!0));
        return;
      }
      if (R === "Enter" || R === " ") {
        const ee = o.value;
        if (ee === null) return;
        S.preventDefault(), S.stopPropagation(), N(ee);
      }
    }
    function W(S) {
      const R = s.items[S];
      !R || !Rt(R) || (i.value !== null && i.value !== S && O(!1), g(S), R.items?.length && L(S, !1));
    }
    return il(() => {
      b(), s.autofocus && g($(null, 1));
    }), ye(() => s.at, b, { deep: !0 }), ye(() => s.items, () => void b(), { deep: !0 }), je(() => {
      i.value = null;
    }), t({ root: l }), (S, R) => {
      const ee = Vs("MenuList", !0);
      return f(), m("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Re(C.value),
        onKeydown: I
      }, [
        (f(!0), m(Y, null, oe(w.value, (ne, ie) => (f(), m("div", {
          key: `${ie}-${ne.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: ne.heading ? "group" : "none",
          "aria-label": ne.heading?.label
        }, [
          ne.heading ? (f(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": ne.heading.id
          }, z(ne.heading.label), 9, Oc)) : T("", !0),
          (f(!0), m(Y, null, oe(ne.entries, ({ item: G, index: ve }) => (f(), m(Y, {
            key: G.id ?? `${ve}-${G.label ?? ""}`
          }, [
            G.separator ? (f(), m("div", Bc)) : (f(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (xe) => {
                xe && (r.value[ve] = xe);
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
              onClick: (xe) => N(ve),
              onMouseenter: (xe) => W(ve)
            }, [
              y("span", Vc, z(G.checked ? "✓" : ""), 1),
              y("span", qc, z(G.label), 1),
              G.shortcut ? (f(), m("span", Wc, z(G.shortcut), 1)) : G.items?.length ? (f(), m("span", Uc, "›")) : T("", !0)
            ], 40, Kc))
          ], 64))), 128))
        ], 8, Ic))), 128)),
        i.value !== null && u.value ? (f(), ae(ee, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: u.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: R[0] || (R[0] = (ne) => a("choose", ne)),
          onDismiss: R[1] || (R[1] = (ne) => O(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
      ], 44, Dc);
    };
  }
}), xa = /* @__PURE__ */ fe(Hc, [["__scopeId", "data-v-9b1413fa"]]), jc = ["data-dc-theme", "aria-label"], Xc = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Gc = /* @__PURE__ */ de({
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
      () => n.menus.flatMap((N, I) => Rt(N) ? [I] : [])
    );
    function _(N, I) {
      const W = r.value[N]?.getBoundingClientRect(), S = n.menus[N];
      !W || !S || !Rt(S) || (i.value = { x: W.left, y: W.bottom + 2, mirrorX: W.right }, o.value = N, u.value = I);
    }
    function w(N) {
      const I = o.value;
      o.value = null, i.value = null, N && I !== null && r.value[I]?.focus();
    }
    function k(N) {
      o.value === N ? w(!0) : _(N, !1);
    }
    function b(N) {
      o.value === null || o.value === N || _(N, !1);
    }
    function C(N, I) {
      const W = d.value;
      if (W.length === 0) return null;
      if (N === null) return I === 1 ? W[0] ?? null : W[W.length - 1] ?? null;
      const S = W.indexOf(N);
      return S === -1 ? W[0] ?? null : W[(S + I + W.length) % W.length] ?? null;
    }
    function g(N) {
      const I = N.key;
      if (I === "Escape") {
        if (o.value === null) return;
        N.preventDefault(), w(!0);
        return;
      }
      if (I === "ArrowDown" && o.value === null) {
        const R = $();
        if (R === null) return;
        N.preventDefault(), _(R, !0);
        return;
      }
      if (I !== "ArrowLeft" && I !== "ArrowRight") return;
      const W = o.value ?? $(), S = C(W, I === "ArrowRight" ? 1 : -1);
      S !== null && (N.preventDefault(), o.value !== null ? _(S, !0) : r.value[S]?.focus());
    }
    function $() {
      const N = r.value.findIndex((I) => I === document.activeElement);
      return N === -1 ? d.value[0] ?? null : N;
    }
    function L(N) {
      const I = N.target;
      !I || l.value?.contains(I) || w(!1);
    }
    ye(o, (N) => {
      N !== null ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), je(() => window.removeEventListener("pointerdown", L, !0));
    function O(N) {
      w(!0), N.action?.(), a("choose", N);
    }
    return (N, I) => (f(), m("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Re(s.value),
      onKeydown: g
    }, [
      (f(!0), m(Y, null, oe(e.menus, (W, S) => (f(), m("button", {
        key: W.id ?? W.label ?? S,
        ref_for: !0,
        ref: (R) => {
          R && (r.value[S] = R);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === S,
        "aria-disabled": W.disabled ? "true" : void 0,
        disabled: W.disabled,
        "data-dc-menu": W.id ?? W.label,
        tabindex: S === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (R) => k(S),
        onMouseenter: (R) => b(S)
      }, z(W.label), 41, Xc))), 128)),
      o.value !== null && i.value ? (f(), ae(xa, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: u.value,
        onChoose: O,
        onDismiss: I[0] || (I[0] = (W) => w(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 44, jc));
  }
}), xd = /* @__PURE__ */ fe(Gc, [["__scopeId", "data-v-93dbd2e4"]]), Yc = ["aria-label", "aria-expanded", "disabled"], Qc = { "aria-hidden": "true" }, Zc = /* @__PURE__ */ de({
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
    ye(o, (b) => {
      b ? window.addEventListener("pointerdown", w, !0) : window.removeEventListener("pointerdown", w, !0);
    }), je(() => window.removeEventListener("pointerdown", w, !0));
    function k(b) {
      u(!0), b.action?.(), n("choose", b);
    }
    return (b, C) => (f(), m(Y, null, [
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
        y("span", Qc, z(e.glyph), 1)
      ], 40, Yc),
      l.value ? (f(), ae(xa, {
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
}), Zn = /* @__PURE__ */ fe(Zc, [["__scopeId", "data-v-48f5ada5"]]), xt = (e) => e.kind === "split", j = (e) => e.kind === "group", J = (e) => e.kind === "float", it = { x: 16, y: 16, w: 360, h: 260 }, fn = 28, Ca = 120, zn = 220, Ma = 38, vt = 6;
function Ht(e, t) {
  let n = !1;
  const s = e.frames.map((a, l) => {
    const r = t(a.node, l);
    return r === a.node ? a : (n = !0, { ...a, node: r });
  });
  return n ? { ...e, frames: s } : e;
}
function Oe(e) {
  return { kind: "group", panels: [e] };
}
function Cd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const pe = (e) => typeof e == "string", Jn = (e) => pe(e) ? Oe(e) : e, jt = (e) => pe(e) ? [e] : Xe(e), As = (e) => e.panels.filter(pe), Jc = (e) => e.panels.filter((t) => !pe(t)), Ae = (e, t) => e.panels.includes(t);
function Xt(e, t, n) {
  let s = !1;
  const a = e.panels.map((l) => {
    if (pe(l) || !le(l, t)) return l;
    const r = n(l);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, panels: a } : e;
}
function vn(e, t) {
  return { node: e, rect: { ...it, ...t } };
}
function es(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function ts(e, t) {
  const n = { ...it, ...t };
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
const ss = (e, t, n) => ns("row", e, t, n), Md = (e, t, n) => ns("column", e, t, n);
function _e(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const dt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Sd = (e) => ({ ...e, headless: !0 }), Ed = (e) => ({ ...e, fixedView: !0 }), eu = (e) => e === "left" || e === "right" ? "row" : "column";
function Xe(e) {
  return j(e) ? e.panels.flatMap(jt) : J(e) ? e.frames.flatMap((t) => Xe(t.node)) : e.children.flatMap(Xe);
}
function le(e, t) {
  return j(e) ? e.panels.some((n) => pe(n) ? n === t : le(n, t)) : J(e) ? e.frames.some((n) => le(n.node, t)) : e.children.some((n) => le(n, t));
}
const Sa = (e) => Xe(e).length === 0, Rn = (e) => !j(e) && dt(e), Tn = (e) => Sa(e) && !Rn(e);
function mn(e) {
  return xt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : J(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => pe(t) ? [] : [{ node: t, index: n }]);
}
const as = (e) => mn(e).map((t) => t.node);
function ft(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => pe(s) ? s === t : le(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Ea(e) {
  const t = e.panels[ft(e)];
  return t !== void 0 && pe(t) ? t : "";
}
function Se(e) {
  if (pe(e)) return e;
  if (j(e)) {
    const n = e.panels[ft(e)];
    return n === void 0 ? "" : Se(n);
  }
  if (J(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Se(n.node) : "";
  }
  const t = e.children[0];
  return t ? Se(t) : "";
}
function ht(e, t) {
  if (j(e) && Ae(e, t)) return e;
  for (const n of as(e)) {
    const s = ht(n, t);
    if (s) return s;
  }
  return null;
}
function tu(e) {
  const t = as(e).flatMap(tu);
  return j(e) ? [e, ...t] : t;
}
function $e(e, t) {
  if (j(e)) {
    for (const n of Jc(e)) {
      const s = $e(n, t);
      if (s) return s;
    }
    return null;
  }
  if (J(e)) {
    for (const n of e.frames)
      if (le(n.node, t))
        return $e(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = $e(n, t);
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
function _t(e, t, n) {
  if (j(e)) return Xt(e, t, (l) => _t(l, t, n));
  if (J(e)) {
    let l = !1;
    const r = e.frames.map((o) => {
      if (!le(o.node, t)) return o;
      if ($e(o.node, t)) {
        const u = _t(o.node, t, n);
        return u === o.node ? o : (l = !0, { ...o, node: u });
      }
      const i = n(o);
      return i === o ? o : (l = !0, i);
    });
    return l ? { ...e, frames: r } : e;
  }
  if (!le(e, t)) return e;
  let s = !1;
  const a = e.children.map((l) => {
    const r = _t(l, t, n);
    return r !== l && (s = !0), r;
  });
  return s ? { ...e, children: a } : e;
}
function nu(e, t, n) {
  return _t(e, t, (s) => Pa(s.rect, n) ? s : { ...s, rect: n });
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
function su(e, t, n = !0) {
  return _t(e, t, Aa(n));
}
function Pd(e, t) {
  const n = $e(e, t);
  return n ? su(e, t, !et(n)) : e;
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
function au(e, t, n = !0) {
  return _t(e, t, za(n));
}
function Ad(e, t) {
  const n = $e(e, t);
  return n ? au(e, t, !ot(n)) : e;
}
function rt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = nt(e, t.slice(0, -1));
  return !s || !J(s) ? null : s.frames[n] ?? null;
}
function Ln(e, t) {
  if (J(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!le(s.node, t)) continue;
      const a = Ln(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of mn(e)) {
    if (!le(n, t)) continue;
    const a = Ln(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function ls(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), l = nt(e, a);
  if (!l || !J(l)) return e;
  const r = l.frames[s];
  if (!r) return e;
  const o = n(r);
  if (o === r) return e;
  const i = [...l.frames];
  return i[s] = o, ut(e, a, { ...l, frames: i });
}
function Rs(e, t, n) {
  return ls(
    e,
    t,
    (s) => Pa(s.rect, n) ? s : { ...s, rect: n }
  );
}
function lu(e, t, n = !0) {
  return ls(e, t, Aa(n));
}
function ru(e, t, n = !0) {
  return ls(e, t, za(n));
}
function Tt(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (J(e)) {
    const r = e.frames[n];
    if (!r) return e;
    const o = Tt(r.node, s), i = o === r.node ? r : { ...r, node: o };
    if (n === e.frames.length - 1 && i === r) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(i), { ...e, frames: u };
  }
  const a = nt(e, [n]);
  if (!a) return e;
  const l = Tt(a, s);
  return l === a ? e : ut(e, [n], l);
}
function ou(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, l) => {
    s && (J(s) && (n[l] = s.frames.length - 1), s = nt(s, [a]));
  }), n;
}
function ln(e, t, n, s) {
  if (j(e)) return Xt(e, n, (r) => ln(r, t, n, s));
  if (J(e)) {
    const r = e.frames.findIndex((i) => le(i.node, n)), o = e.frames[r];
    if (!o) return e;
    if ($e(o.node, n)) {
      const i = ln(o.node, t, n, s);
      if (i === o.node) return e;
      const u = [...e.frames];
      return u[r] = { ...o, node: i }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, vn(Oe(t), s)] };
  }
  if (!le(e, n)) return e;
  let a = !1;
  const l = e.children.map((r) => {
    const o = ln(r, t, n, s);
    return o !== r && (a = !0), o;
  });
  return a ? { ...e, children: l } : e;
}
function Ts(e, t, n, s) {
  if (t === n || !le(e, t) || !le(e, n) || !$e(e, n)) return e;
  const a = ct(e, t);
  if (!a) return e;
  const l = ln(a, t, n, s);
  return l === a ? e : we(l);
}
function iu(e, t, n) {
  return J(e) ? { ...e, frames: [...e.frames, vn(Oe(t), n)] } : j(e) ? Ta(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Oe(t)],
    sizes: [...He(e), 1],
    ..._e(e)
  };
}
function Ra(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return iu(e, t, s);
  const l = n.slice(1), r = (d, _) => _ === a ? Ra(d, t, l, s) : ct(d, t);
  if (J(e)) {
    const d = e.frames.flatMap((_, w) => {
      const k = r(_.node, w);
      return k ? [k === _.node ? _ : { ..._, node: k }] : [];
    });
    return { ...e, frames: d };
  }
  if (j(e)) {
    const d = ft(e), _ = [];
    e.panels.forEach((b, C) => {
      if (pe(b)) {
        b !== t && _.push(b);
        return;
      }
      const g = r(b, C);
      g && _.push(g);
    });
    const k = e.active && _.some((b) => jt(b).includes(e.active)) ? e.active : Se(_[d] ?? _[_.length - 1]);
    return {
      kind: "group",
      panels: _,
      ...k ? { active: k } : {},
      ..._e(e)
    };
  }
  const o = He(e), i = [], u = [];
  return e.children.forEach((d, _) => {
    const w = r(d, _);
    w && (i.push(w), u.push(o[_] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: u, ..._e(e) };
}
function Ls(e, t, n, s) {
  const a = nt(e, n);
  return !a || !Sa(a) || !le(e, t) ? e : we(Ra(e, t, n, s));
}
function $n(e, t) {
  if (j(e)) return Xt(e, t, (a) => $n(a, t));
  if (J(e)) {
    const a = e.frames.findIndex((u) => le(u.node, t)), l = e.frames[a];
    if (!l) return e;
    const r = $n(l.node, t), o = r === l.node ? l : { ...l, node: r };
    if (a === e.frames.length - 1 && o === l) return e;
    const i = [...e.frames];
    return i.splice(a, 1), i.push(o), { ...e, frames: i };
  }
  if (!le(e, t)) return e;
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
const He = (e) => rs(e.children.length, e.sizes), Le = (e) => {
  const t = j(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function we(e) {
  if (j(e)) return cu(e);
  if (J(e)) {
    const o = e.frames.flatMap((i) => {
      const u = we(i.node);
      return Tn(u) ? [] : [u === i.node ? i : { ...i, node: u }];
    });
    return o.length === e.frames.length && o.every((i, u) => i === e.frames[u]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = He(e), n = Le(e), s = [], a = [], l = [];
  e.children.forEach((o, i) => {
    const u = we(o), d = t[i] ?? 0;
    if (Tn(u)) return;
    if (!n && xt(u) && u.direction === e.direction && !Le(u) && !dt(u)) {
      const w = He(u);
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
  return s.length === 1 && r && !dt(e) ? r : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: rs(s.length, a),
    ..._e(e),
    ...l.length === s.length && l.length > 0 ? { places: l } : {}
  };
}
function cu(e) {
  if (e.panels.every(pe)) return e;
  const t = Se(e), n = Le(e), s = [], a = [];
  e.panels.forEach((o, i) => {
    const u = n?.[i];
    if (pe(o)) {
      s.push(o), u && a.push(u);
      return;
    }
    const d = we(o);
    if (!Tn(d)) {
      if (j(d) && !dt(d) && !Le(d)) {
        s.push(...d.panels);
        return;
      }
      s.push(d), u && a.push(u);
    }
  });
  const l = s[0];
  if (s.length === 1 && l !== void 0 && !pe(l) && !dt(e))
    return l;
  if (s.length === e.panels.length && s.every((o, i) => o === e.panels[i]))
    return e;
  const r = t && s.some((o) => jt(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...r ? { active: r } : {},
    ..._e(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function ct(e, t) {
  if (J(e)) {
    const r = e.frames.flatMap((o) => {
      const i = ct(o.node, t);
      return i ? [i === o.node ? o : { ...o, node: i }] : [];
    });
    return r.length === 0 && !Rn(e) ? null : { ...e, frames: r };
  }
  if (j(e)) {
    if (!le(e, t)) return e;
    const r = ft(e), o = [];
    for (const d of e.panels) {
      if (pe(d)) {
        d !== t && o.push(d);
        continue;
      }
      const _ = ct(d, t);
      _ && o.push(_);
    }
    if (o.length === 0) return null;
    const u = e.active && o.some((d) => jt(d).includes(e.active)) ? e.active : Se(o[r] ?? o[o.length - 1]);
    return u ? { kind: "group", panels: o, active: u, ..._e(e) } : { kind: "group", panels: o, ..._e(e) };
  }
  const n = He(e), s = [], a = [];
  if (e.children.forEach((r, o) => {
    const i = ct(r, t);
    i && (s.push(i), a.push(n[o] ?? 0));
  }), s.length === 0)
    return Rn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ..._e(e) } : null;
  const l = s[0];
  return s.length === 1 && l && !dt(e) ? l : we({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ..._e(e)
  });
}
function Ta(e, t, n) {
  const s = e.panels.filter((l) => l !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ..._e(e) };
}
function Pt(e, t, n, s, a) {
  const l = (k) => Ht(
    k,
    (b) => le(b, n) ? Pt(b, t, n, s, a) : b
  );
  if (s === "float") return e;
  const r = (k) => Xt(k, n, (b) => Pt(b, t, n, s, a));
  if (s === "center")
    return j(e) ? Ae(e, n) ? Ta(e, t, a) : r(e) : J(e) ? l(e) : {
      ...e,
      children: e.children.map(
        (k) => le(k, n) ? Pt(k, t, n, s, a) : k
      )
    };
  const o = eu(s), i = s === "left" || s === "top", u = (k) => ({
    kind: "split",
    direction: o,
    children: i ? [Oe(t), k] : [k, Oe(t)],
    sizes: [0.5, 0.5]
  });
  if (j(e)) return Ae(e, n) ? u(e) : r(e);
  if (J(e)) return l(e);
  const d = He(e), _ = e.children.findIndex(
    (k) => j(k) && Ae(k, n)
  );
  if (_ >= 0 && e.direction === o) {
    const k = (d[_] ?? 0) / 2, b = [...e.children], C = [...d];
    return b.splice(i ? _ : _ + 1, 0, Oe(t)), C.splice(_, 1, k, k), {
      kind: "split",
      direction: o,
      children: b,
      sizes: C,
      ..._e(e)
    };
  }
  const w = e.children.map((k) => le(k, n) ? j(k) && Ae(k, n) ? u(k) : Pt(k, t, n, s) : k);
  return {
    kind: "split",
    direction: e.direction,
    children: w,
    sizes: d,
    ..._e(e)
  };
}
function gt(e, t) {
  if (j(e)) {
    if (Ae(e, t))
      return Ea(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((i) => !pe(i) && le(i, t)), l = e.panels[a];
    if (l === void 0 || pe(l)) return e;
    const r = gt(l, t);
    if (r === l && e.active === t) return e;
    const o = [...e.panels];
    return o[a] = r, { ...e, panels: o, active: t };
  }
  if (!le(e, t)) return e;
  if (J(e)) return Ht(e, (a) => gt(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const l = gt(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function Lt(e, t, n) {
  if (j(e)) {
    if (!Ae(e, t)) return Xt(e, t, (u) => Lt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const l = [...e.panels];
    l.splice(s, 1), l.splice(a, 0, t);
    const r = Le(e), o = r ? [...r] : void 0;
    o && o.splice(a, 0, ...o.splice(s, 1));
    const i = Se(e);
    return {
      kind: "group",
      panels: l,
      ...i ? { active: i } : {},
      ..._e(e),
      ...o ? { places: o } : {}
    };
  }
  return le(e, t) ? J(e) ? Ht(e, (s) => Lt(s, t, n)) : { ...e, children: e.children.map((s) => Lt(s, t, n)) } : e;
}
function rn(e, t, n) {
  if (t === n) return e;
  if (j(e)) {
    if (!le(e, t) && !le(e, n)) return e;
    const s = (l) => l === t ? n : l === n ? t : l, a = e.panels.map((l) => pe(l) ? s(l) : rn(l, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return J(e) ? Ht(e, (s) => rn(s, t, n)) : { ...e, children: e.children.map((s) => rn(s, t, n)) };
}
function Jt(e, t, n, s, a) {
  if (s === "float" || !le(e, t) || !le(e, n)) return e;
  const l = ht(e, t);
  if (s === "center" && l && Ae(l, n)) {
    if (a === void 0) return e;
    const o = l.panels.indexOf(t), i = a > o ? a - 1 : a;
    return i === o ? e : gt(Lt(e, t, i), t);
  }
  if (t === n) return e;
  const r = ct(e, t);
  return r ? we(Pt(r, t, n, s, a)) : e;
}
function La(e, t, n) {
  if (j(e)) {
    const a = e.panels[t];
    if (a === void 0 || pe(a)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (J(e)) {
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
  if (!j(e) && s.some(({ node: a }) => j(a) && Ae(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: l } of s) {
    if (!le(a, t)) continue;
    const r = Gt(a, t, n);
    return r ? La(e, l, r) : null;
  }
  return null;
}
function zd(e, t, n) {
  const s = Gt(
    e,
    t,
    (a) => xt(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? we(s) : e;
}
function Fa(e) {
  return J(e) ? [e] : Le(e) || dt(e) ? [e] : j(e) ? [...e.panels] : e.children.flatMap(Fa);
}
function Na(e, t) {
  if (j(e)) return e;
  const n = as(e).map(Fa), s = n.flat(), a = t && s.some((r) => jt(r).includes(t)) ? t : void 0, l = uu(e, n);
  return we({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ..._e(e),
    ...l ? { places: l } : {}
  });
}
function uu(e, t) {
  const n = J(e) ? e.frames.map(({ node: s, ...a }) => a) : Le(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function du(e, t) {
  const n = Gt(e, t, (s) => Na(s, t));
  return n ? we(n) : e;
}
function os(e, t, n) {
  if (j(e) && Ae(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of mn(e)) {
    if (!le(s, t)) continue;
    const l = os(s, t, n);
    return l ? La(e, a, l) : null;
  }
  return null;
}
function Fs(e, t, n) {
  const s = os(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const l = Le(a);
    return {
      ...ns(n, a.panels.map(Jn)),
      ..._e(a),
      ...l ? { places: l } : {}
    };
  });
  return s ? we(s) : e;
}
function Fn(e, t) {
  if (j(e)) return e;
  if (J(e)) {
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
    return Ht(e, (o) => Fn(o, t));
  }
  if (!le(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const l = Fn(a, t);
    return l !== a && (n = !0), l;
  });
  return n ? { ...e, children: s } : e;
}
function fu(e, t, n) {
  const s = ht(e, t);
  if (!s || s.panels.length < 2) return e;
  if ($e(e, t)?.node === s) {
    const r = Fn(e, t);
    return r === e ? e : we(r);
  }
  const l = os(e, t, (r) => ({
    ...es(Da(r.panels.map(Jn), Le(r), n)),
    ..._e(r)
  }));
  return l ? we(l) : e;
}
function Da(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : ts(e, n).frames;
}
function Ia(e, t) {
  return { ...es(Da(e.children, Le(e), t)), ..._e(e) };
}
function Rd(e, t, n) {
  const s = Gt(
    e,
    t,
    (a) => J(a) ? a : Ia(a, n)
  );
  return s ? we(s) : j(e) && Ae(e, t) ? ts([e], n) : e;
}
function pu(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, l) => n(a) - n(l) || s(a) - s(l));
}
function Oa(e, t) {
  const n = pu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ..._e(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Td(e, t, n = "row") {
  const s = Gt(
    e,
    t,
    (a) => J(a) ? Oa(a, n) : a
  );
  return s ? we(s) : e;
}
function Ba(e) {
  if (J(e)) return null;
  const t = j(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || pe(t) || j(t) && t.panels.length === 1 && pe(t.panels[0]) ? null : t;
}
const vu = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function mu(e, t) {
  const n = Ba(e);
  return n ? t === "inner" ? n : { ...vu(n), ..._e(e) } : e;
}
function kt(e) {
  return e.title ? e.title : j(e) ? "" : J(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Ft(e, t) {
  if (j(e)) {
    const s = e.panels[ft(e)];
    return s === void 0 ? "" : pe(s) ? t(s) ?? s : kt(s) || Ft(s, t);
  }
  if (e.title) return e.title;
  if (J(e)) {
    const s = e.frames[e.frames.length - 1];
    return s ? s.title ?? Ft(s.node, t) : "";
  }
  const n = e.children[0];
  return n ? Ft(n, t) : "";
}
function nt(e, t) {
  let n = e;
  for (const s of t) {
    if (!n) return null;
    if (xt(n)) n = n.children[s];
    else if (J(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || pe(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function ut(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (J(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const u = ut(i.node, a, n);
    if (u === i.node) return e;
    const d = [...e.frames];
    return d[s] = { ...i, node: u }, { ...e, frames: d };
  }
  if (j(e)) {
    const i = e.panels[s];
    if (i === void 0 || pe(i)) return e;
    const u = ut(i, a, n);
    if (u === i) return e;
    const d = [...e.panels];
    return d[s] = u, { ...e, panels: d };
  }
  const l = e.children[s];
  if (!l) return e;
  const r = ut(l, a, n);
  if (r === l) return e;
  const o = [...e.children];
  return o[s] = r, { ...e, children: o };
}
function on(e, t, n) {
  if (t.length === 0)
    return xt(e) ? { ...e, sizes: rs(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (J(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const i = on(o.node, a, n);
    if (i === o.node) return e;
    const u = [...e.frames];
    return u[s] = { ...o, node: i }, { ...e, frames: u };
  }
  if (j(e)) {
    const o = e.panels[s];
    if (o === void 0 || pe(o)) return e;
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
  return t !== void 0 && !pe(t) ? e : { ...ss([hu(e)]), ..._e(e) };
}
const hu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Ds(e) {
  return e.length === 0 ? null : ss(e.map(Oe));
}
function _u(e, t) {
  if (!e) return Ds(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const i of Xe(e))
    !n.has(i) || s.has(i) ? a.add(i) : s.add(i);
  let l = e;
  for (const i of a)
    l = l ? ct(l, i) : null;
  const r = new Set(l ? Xe(l) : []), o = t.filter((i) => !r.has(i));
  if (o.length === 0) return l ? pn(we(l)) : null;
  if (!l) return Ds(o);
  if (J(l)) {
    const i = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...o.map(
          (u, d) => vn(Oe(u), {
            x: it.x + (i + d) * fn,
            y: it.y + (i + d) * fn
          })
        )
      ]
    };
  }
  return pn(we(ss([l, ...o.map(Oe)])));
}
const is = Symbol("dc.windowContext");
function gu(e) {
  return Nn(is, e), e;
}
function cs() {
  const e = wt(is, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const yu = ["data-dc-glyph"], wu = { class: "dc-glyph__line" }, ku = ["d"], bu = {
  key: 0,
  class: "dc-glyph__aqua"
}, $u = ["d"], xu = /* @__PURE__ */ de({
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
      y("g", wu, [
        (f(!0), m(Y, null, oe(t[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, ku))), 128))
      ]),
      n[e.kind] ? (f(), m("g", bu, [
        (f(!0), m(Y, null, oe(n[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, $u))), 128))
      ])) : T("", !0)
    ], 8, yu));
  }
}), yt = /* @__PURE__ */ fe(xu, [["__scopeId", "data-v-4d2872c0"]]), Cu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Mu = ["data-dc-movable"], Su = { class: "dc-float__title dc-truncate" }, Eu = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Pu = ["aria-label", "aria-pressed", "data-dc-minimize"], Au = ["aria-label", "aria-pressed", "data-dc-maximize"], zu = ["aria-label", "data-dc-close"], Ru = { class: "dc-float__content" }, Tu = ["data-dc-handle", "onPointerdown"], Lu = /* @__PURE__ */ de({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = cs(), s = v(() => Se(t.frame.node)), a = v(() => n.panelFor(s.value)?.fixed === !0), l = v(() => et(t.frame)), r = v(() => ot(t.frame)), o = v(() => l.value || r.value), i = v(() => n.resizable.value && !a.value && !o.value), u = v(() => n.movable.value && !a.value && !o.value), d = v(() => {
      const I = Xe(t.frame.node);
      return I.length === 1 ? I[0] ?? null : null;
    }), _ = v(() => d.value !== null && n.closable(d.value)), w = v(() => t.frame.node.headless === !0), k = v(
      () => !w.value && (!j(t.frame.node) || r.value)
    ), b = v(
      () => t.frame.title || kt(t.frame.node) || Ft(t.frame.node, (I) => n.panelFor(I)?.title)
    ), C = v(() => n.spaceMenu(t.path));
    function g(I) {
      I.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, I, "move");
    }
    function $(I) {
      I.target?.closest("button, a, input, select, textarea, label") || (r.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const L = v(() => {
      const I = n.framing.value;
      return I !== null && le(t.frame.node, I);
    }), O = v(() => ({
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
    })), N = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (I, W) => (f(), m("div", {
      class: "dc-float",
      style: Re(O.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": r.value ? "true" : "false",
      "data-dc-dragging": L.value ? "true" : "false",
      onPointerdown: W[3] || (W[3] = (S) => P(n).raiseAt(e.path))
    }, [
      k.value ? (f(), m("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: g,
        onDblclick: $
      }, [
        y("span", Su, z(b.value), 1),
        C.value.length ? (f(), ae(Zn, {
          key: 0,
          items: C.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : T("", !0),
        !a.value || r.value && _.value && d.value ? (f(), m("div", Eu, [
          a.value ? T("", !0) : (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": s.value,
            onClick: W[0] || (W[0] = (S) => P(n).toggleMinimizeAt(e.path))
          }, [
            he(yt, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Pu)),
          a.value ? T("", !0) : (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": s.value,
            onClick: W[1] || (W[1] = (S) => P(n).toggleMaximizeAt(e.path))
          }, [
            he(yt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Au)),
          r.value && _.value && d.value ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${b.value}`,
            "data-dc-close": d.value,
            onClick: W[2] || (W[2] = (S) => P(n).close(d.value))
          }, [
            he(yt, { kind: "close" })
          ], 8, zu)) : T("", !0)
        ])) : T("", !0)
      ], 40, Mu)) : T("", !0),
      y("div", Ru, [
        ge(I.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), m(Y, null, oe(i.value ? N : [], (S) => (f(), m("span", {
        key: S,
        class: "dc-float__grip",
        "data-dc-handle": S,
        "aria-hidden": "true",
        onPointerdown: Ne((R) => P(n).beginFrameDragAt(e.path, R, S), ["stop"])
      }, null, 40, Tu))), 128))
    ], 44, Cu));
  }
}), Fu = /* @__PURE__ */ fe(Lu, [["__scopeId", "data-v-f035684c"]]), us = Symbol("dc.paneContext");
function Nu(e) {
  return Nn(us, e), e;
}
function Ld() {
  return wt(us, null);
}
function Fd(e) {
  const t = wt(is, null), n = wt(us, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => Et(e)
  );
  return cl() && Os(s), s;
}
const Du = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Iu = ["data-dc-movable"], Ou = ["aria-label", "aria-pressed"], Bu = ["data-dc-space-name"], Ku = { class: "dc-truncate" }, Vu = ["aria-label"], qu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Wu = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Uu = { class: "dc-tab__name dc-truncate" }, Hu = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, ju = ["aria-label", "data-dc-close", "onClick"], Xu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Gu = { class: "dc-pane__tools" }, Yu = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Qu = ["aria-label", "data-dc-minimize"], Zu = ["aria-label", "aria-pressed", "data-dc-maximize"], Ju = ["aria-label", "data-dc-close"], ed = ["id", "role", "aria-labelledby"], td = ["id", "role", "aria-labelledby"], nd = ["data-dc-edge"], sd = /* @__PURE__ */ de({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = cs(), s = Ks() ?? "dc-pane", a = v(
      () => t.group.panels.flatMap((K, H) => {
        if (!pe(K)) {
          const Ee = kt(K) || Ft(K, (Ce) => n.panelFor(Ce)?.title);
          return [{ kind: "space", index: H, id: `space-${H}`, title: Ee, node: K }];
        }
        const te = n.panelFor(K);
        return te ? [{ kind: "panel", index: H, id: K, title: te.title, panel: te }] : [];
      })
    ), l = v(() => a.value.length > 1), r = v(() => {
      const K = ft(t.group);
      return a.value.find((H) => H.index === K) ?? a.value[0] ?? null;
    }), o = v(() => r.value?.kind === "space" ? r.value.node : null), i = v(() => o.value ? "" : Ea(t.group)), u = v(() => o.value ? null : n.panelFor(i.value)), d = v(() => r.value?.title ?? ""), _ = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), w = v(() => [...t.path, r.value?.index ?? 0]), k = v(() => i.value || As(t.group)[0] || ""), b = v(() => n.viewFor(i.value)), C = v(() => t.group.headless === !0), g = v(() => n.focused.value === i.value), $ = v(() => n.dragging.value === i.value), L = v(() => n.moving.value === i.value), O = v(() => n.frameOf(k.value) !== null), N = v(() => n.panelFor(k.value)?.fixed === !0), I = v(
      () => !o.value && (n.canMove(i.value) || O.value && n.movable.value && !N.value)
    ), W = v(
      () => o.value ? n.spaceMenu(w.value) : n.menuFor(i.value)
    ), S = (K) => n.closable(K);
    Nu({ panel: i });
    const R = v(() => n.maximized(k.value)), ee = v(
      () => O.value && !N.value || !l.value && !!u.value && S(u.value.id)
    ), ne = (K) => `${s}-tab-${K}`, ie = v(() => `${s}-body`), G = v(() => {
      const K = n.dropTarget.value;
      return !K || !Ae(t.group, K.panel) || K.edge === "float" ? null : K;
    }), ve = v(() => G.value?.index === void 0 ? G.value?.edge ?? null : null), xe = v(() => G.value?.index ?? null), x = () => u.value ? n.renderContent(u.value, b.value, g.value) ?? null : null, B = () => u.value ? n.renderActions(u.value, b.value, g.value) ?? null : null;
    let E = null;
    function F(K) {
      const H = E !== null && Math.hypot(K.clientX - E.x, K.clientY - E.y) >= 4;
      return E = null, H;
    }
    const q = (K) => K.kind === "panel" ? K.id : Se(K.node);
    function ke(K, H) {
      H.kind !== "space" && (n.focus(H.id), E = { x: K.clientX, y: K.clientY }, n.beginDrag(H.id, K));
    }
    function Ge(K, H) {
      if (F(K)) return;
      const te = q(H);
      te && n.selectPanel(te);
    }
    function Ye(K) {
      i.value && n.focus(i.value), !K.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (O.value ? n.beginFrameDrag(k.value, K, "move") : n.beginDrag(i.value, K));
    }
    function Qe(K) {
      E = { x: K.clientX, y: K.clientY }, n.beginDrag(i.value, K);
    }
    function Ze(K) {
      F(K) || n.toggleMoveMode(i.value);
    }
    const Be = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Ke(K) {
      if (!L.value) return;
      if (K.key === "Escape") {
        K.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const H = Be[K.key];
      H && (K.preventDefault(), O.value ? n.nudgeFrame(i.value, H, K.shiftKey) : n.nudge(i.value, H, K.shiftKey));
    }
    function Ve(K) {
      !O.value || K.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(k.value);
    }
    function Ct(K, H) {
      K.stopPropagation(), E = null, n.close(H);
    }
    function Yt(K, H) {
      const te = a.value.length;
      let Ee = null;
      if (K.key === "ArrowRight" ? Ee = (H + 1) % te : K.key === "ArrowLeft" ? Ee = (H - 1 + te) % te : K.key === "Home" ? Ee = 0 : K.key === "End" && (Ee = te - 1), Ee === null) return;
      K.preventDefault();
      const Ce = a.value[Ee];
      if (!Ce) return;
      const Mt = q(Ce);
      Mt && n.selectPanel(Mt);
    }
    return (K, H) => r.value ? (f(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": P(As)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": O.value ? "true" : "false",
      "data-dc-maximized": R.value ? "true" : "false",
      "data-dc-headless": C.value ? "true" : "false",
      "data-dc-active": g.value ? "true" : "false",
      "data-dc-dragging": $.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: H[7] || (H[7] = (te) => i.value && P(n).focus(i.value))
    }, [
      C.value ? T("", !0) : (f(), m("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": I.value ? "true" : "false",
        onPointerdown: Ye,
        onDblclick: Ve
      }, [
        I.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": L.value,
          onPointerdown: Qe,
          onClick: Ze,
          onKeydown: Ke
        }, [...H[8] || (H[8] = [
          y("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Ou)) : T("", !0),
        _.value ? (f(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": _.value
        }, [
          y("span", Ku, z(_.value), 1)
        ], 8, Bu)) : T("", !0),
        y("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), m(Y, null, oe(a.value, (te, Ee) => (f(), m(Y, {
            key: te.id
          }, [
            xe.value === Ee ? (f(), m("span", qu)) : T("", !0),
            y("button", {
              id: ne(te.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": te.kind === "panel" ? te.id : void 0,
              "data-dc-space": te.kind === "space" ? te.title : void 0,
              "aria-selected": te.index === r.value.index,
              "aria-controls": ie.value,
              tabindex: te.index === r.value.index ? 0 : -1,
              onPointerdown: (Ce) => ke(Ce, te),
              onClick: (Ce) => Ge(Ce, te),
              onKeydown: (Ce) => Yt(Ce, Ee)
            }, [
              y("span", Uu, z(te.title), 1),
              te.kind === "panel" && te.panel.subtitle ? (f(), m("span", Hu, z(te.panel.subtitle), 1)) : T("", !0),
              l.value && te.kind === "panel" && S(te.id) ? (f(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${te.title}`,
                "data-dc-close": te.id,
                onPointerdown: H[0] || (H[0] = Ne(() => {
                }, ["stop"])),
                onClick: (Ce) => Ct(Ce, te.id)
              }, [...H[9] || (H[9] = [
                y("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, ju)) : T("", !0)
            ], 40, Wu)
          ], 64))), 128)),
          xe.value === a.value.length ? (f(), m("span", Xu)) : T("", !0)
        ], 8, Vu),
        y("div", Gu, [
          he(B),
          W.value.length ? (f(), ae(Zn, {
            key: 0,
            items: W.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ]),
        ee.value ? (f(), m("div", Yu, [
          O.value && !N.value ? (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": k.value,
            onPointerdown: H[1] || (H[1] = Ne(() => {
            }, ["stop"])),
            onClick: H[2] || (H[2] = (te) => P(n).toggleMinimize(k.value))
          }, [
            he(yt, { kind: "minimize" })
          ], 40, Qu)) : T("", !0),
          O.value && !N.value ? (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${R.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": R.value,
            "data-dc-maximize": k.value,
            onPointerdown: H[3] || (H[3] = Ne(() => {
            }, ["stop"])),
            onClick: H[4] || (H[4] = (te) => P(n).toggleMaximize(k.value))
          }, [
            he(yt, {
              kind: R.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Zu)) : T("", !0),
          !l.value && u.value && S(u.value.id) ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: H[5] || (H[5] = Ne(() => {
            }, ["stop"])),
            onClick: H[6] || (H[6] = (te) => P(n).close(u.value.id))
          }, [
            he(yt, { kind: "close" })
          ], 40, Ju)) : T("", !0)
        ])) : T("", !0)
      ], 40, Iu)),
      o.value ? (f(), m("div", {
        key: 1,
        id: ie.value,
        class: "dc-pane__space",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : ne(r.value.id)
      }, [
        ge(K.$slots, "space", {
          node: o.value,
          path: w.value
        }, void 0, !0)
      ], 8, ed)) : (f(), m("div", {
        key: 2,
        id: ie.value,
        class: "dc-pane__body",
        role: C.value ? void 0 : "tabpanel",
        "aria-labelledby": C.value ? void 0 : ne(i.value)
      }, [
        he(x)
      ], 8, td)),
      ve.value ? (f(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ve.value,
        "aria-hidden": "true"
      }, null, 8, nd)) : T("", !0)
    ], 40, Du)) : T("", !0);
  }
}), Ka = /* @__PURE__ */ fe(sd, [["__scopeId", "data-v-44fd2b2d"]]), ad = ["data-dc-space", "data-dc-path", "aria-label"], ld = {
  key: 0,
  class: "dc-space__head"
}, rd = { class: "dc-space__title dc-truncate" }, od = ["data-dc-direction"], id = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, cd = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], ud = /* @__PURE__ */ de({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = cs(), s = U(null), a = v(() => j(t.node) ? t.node : null), l = v(() => xt(t.node) ? t.node : null), r = v(() => J(t.node) ? t.node : null), o = v(
      () => l.value ? l.value.children : r.value?.frames.map((x) => x.node) ?? []
    ), i = v(() => l.value ? He(l.value) : []), u = v(
      () => (r.value?.frames ?? []).map((x, B) => ({
        held: x,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: B,
        key: S(x.node),
        path: [...t.path, B]
      })).sort((x, B) => x.key < B.key ? -1 : x.key > B.key ? 1 : 0)
    ), d = v(() => kt(t.node)), _ = v(() => n.spaceMenu(t.path)), w = v(() => t.node.headless === !0), k = v(() => r.value ? "desktop" : l.value?.direction ?? ""), b = U(null), C = U(0);
    let g = null;
    ye(
      b,
      (x) => {
        g?.disconnect(), g = null, !(!x || typeof ResizeObserver > "u") && (C.value = x.clientWidth, g = new ResizeObserver(([B]) => {
          C.value = B?.contentRect.width ?? 0;
        }), g.observe(x));
      },
      { immediate: !0 }
    ), je(() => g?.disconnect());
    const $ = v(() => {
      const x = Math.max(
        1,
        Math.floor((C.value + vt) / (zn + vt))
      ), B = /* @__PURE__ */ new Map();
      let E = 0;
      for (const F of u.value)
        F.held.minimized === !0 && (B.set(F.key, {
          x: vt + E % x * (zn + vt),
          bottom: vt + Math.floor(E / x) * (Ma + vt)
        }), E += 1);
      return B;
    }), L = (x) => !!x && x.join("/") === t.path.join("/"), O = v(() => {
      const x = n.dropTarget.value, B = r.value;
      if (!B || !x?.rect || x.edge !== "float") return null;
      if (x.space) return L(x.space) ? x.rect : null;
      const E = $e(B, x.panel);
      return E && B.frames.includes(E) ? x.rect : null;
    }), N = v(() => {
      const x = n.dropTarget.value;
      return !!x && !x.rect && L(x.space);
    }), I = v(() => l.value?.direction === "row"), W = v(() => o.value.map((x, B) => [...t.path, B])), S = (x) => [...Xe(x)].sort().join("/"), R = (x) => {
      const B = Xe(x)[0];
      return (B ? n.panelFor(B)?.title : null) ?? B ?? "panel";
    }, ee = (x) => {
      const B = o.value[x], E = o.value[x + 1];
      return !B || !E ? "Resize panels" : `Resize ${R(B)} and ${R(E)}`;
    }, ne = (x) => {
      const B = i.value[x] ?? 0, E = i.value[x + 1] ?? 0, F = B + E;
      return F > 0 ? Math.round(B / F * 100) : 50;
    };
    function ie() {
      const x = s.value, B = x ? I.value ? x.clientWidth : x.clientHeight : 0;
      return B <= 0 ? 0.05 : Math.min(n.minPanelSize.value / B, 0.4);
    }
    let G = null;
    function ve(x, B) {
      const E = l.value, F = s.value;
      if (!n.resizable.value || !E || !F || x.button !== 0) return;
      const q = I.value ? F.clientWidth : F.clientHeight;
      if (q <= 0) return;
      const ke = I.value ? x.clientX : x.clientY, Ge = He(E), Ye = Math.min(n.minPanelSize.value / q, 0.4);
      x.preventDefault();
      const Qe = (Ke) => {
        const Ve = ((I.value ? Ke.clientX : Ke.clientY) - ke) / q;
        n.setSizes(t.path, Ns(Ge, B, Ve, Ye));
      }, Ze = () => G?.(), Be = (Ke) => {
        Ke.key === "Escape" && (n.setSizes(t.path, Ge), G?.());
      };
      G = () => {
        window.removeEventListener("pointermove", Qe), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", Ze), window.removeEventListener("keydown", Be), G = null;
      }, window.addEventListener("pointermove", Qe), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", Ze), window.addEventListener("keydown", Be);
    }
    je(() => G?.());
    function xe(x, B) {
      const E = l.value;
      if (!n.resizable.value || !E) return;
      const F = I.value ? "ArrowRight" : "ArrowDown", q = I.value ? "ArrowLeft" : "ArrowUp", ke = x.shiftKey ? 0.1 : 0.02;
      if (x.key !== F && x.key !== q) return;
      const Ge = x.key === F ? ke : -ke;
      x.preventDefault(), n.setSizes(t.path, Ns(He(E), B, Ge, ie()));
    }
    return (x, B) => {
      const E = Vs("WindowNode", !0);
      return a.value ? (f(), ae(Ka, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: De(({ node: F, path: q }) => [
          he(E, {
            node: F,
            path: q,
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
        !e.framed && !w.value ? (f(), m("header", ld, [
          y("span", rd, z(d.value), 1),
          _.value.length ? (f(), ae(Zn, {
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
          O.value ? (f(), m("div", {
            key: 0,
            class: "dc-window__drop",
            style: Re({
              left: `${O.value.x}px`,
              top: `${O.value.y}px`,
              width: `${O.value.w}px`,
              height: `${O.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : T("", !0),
          (f(!0), m(Y, null, oe(u.value, (F) => (f(), ae(Fu, {
            key: F.key,
            frame: F.held,
            path: F.path,
            order: F.order,
            place: $.value.get(F.key) ?? null
          }, {
            default: De(() => [
              he(E, {
                node: F.held.node,
                path: F.path,
                framed: F.held.node.kind !== "group"
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
          N.value ? (f(), m("div", id)) : T("", !0),
          (f(!0), m(Y, null, oe(o.value, (F, q) => (f(), m(Y, {
            key: S(F)
          }, [
            y("div", {
              class: "dc-window__cell",
              style: Re({ flexGrow: i.value[q] ?? 1 })
            }, [
              he(E, {
                node: F,
                path: W.value[q] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            q < o.value.length - 1 ? (f(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": I.value ? "vertical" : "horizontal",
              "aria-label": ee(q),
              "aria-valuenow": ne(q),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (ke) => ve(ke, q),
              onKeydown: (ke) => xe(ke, q)
            }, null, 40, cd)) : T("", !0)
          ], 64))), 128))
        ], 8, od)) : T("", !0)
      ], 8, ad));
    };
  }
}), dd = /* @__PURE__ */ fe(ud, [["__scopeId", "data-v-fb5b403f"]]), fd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], pd = {
  key: 1,
  class: "dc-window__empty"
}, vd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, en = 16, md = /* @__PURE__ */ de({
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
    const s = e, a = n, l = zt(e, "layout"), r = zt(e, "views"), o = Bt(), i = v(() => new Map(s.panels.map((c) => [c.id, c]))), u = v(() => s.panels.map((c) => c.id)), d = v(() => _u(l.value, u.value)), _ = U(null), w = U(null), k = U(null), b = U(!0), C = U(null), g = U(null), $ = U(null), L = U(""), O = U(null);
    function N() {
      const c = O.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((h) => h.closest(".dc-window") === c).map((h) => ({ panels: (h.dataset.dcPanels ?? "").split(" "), element: h })) : [];
    }
    function I(c) {
      const p = [];
      let h = c.closest(".dc-float");
      for (; h; )
        p.unshift(Number(h.dataset.dcOrder ?? 0)), h = h.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function W() {
      return N().map((c) => ({ pane: c, order: I(c.element) })).sort((c, p) => {
        const h = Math.max(c.order.length, p.order.length);
        for (let M = 0; M < h; M += 1) {
          const A = (c.order[M] ?? -1) - (p.order[M] ?? -1);
          if (A !== 0) return A;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const S = (c) => N().find((p) => p.panels.includes(c)) ?? null;
    function R(c) {
      const p = i.value.get(c);
      if (!p) return "";
      const h = r.value[c];
      return h && p.views?.some((M) => M.key === h) ? h : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function ee(c, p) {
      r.value = { ...r.value, [c]: p }, a("view-change", { panel: c, view: p });
    }
    const ne = v(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function ie(c) {
      return !s.movable || ne.value < 1 || s.panels.length < 2 ? !1 : i.value.get(c)?.fixed !== !0;
    }
    function G(c, p) {
      const h = d.value;
      !c || !h || c === h || (l.value = c, p && a("panel-move", p));
    }
    function ve(c, p, h) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const M = (p - c.left) / c.width, A = (h - c.top) / c.height, D = 0.3;
      return M > D && M < 1 - D && A > D && A < 1 - D ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: A },
        { edge: "bottom", distance: 1 - A }
      ].reduce(
        (se, V) => V.distance < se.distance ? V : se
      ).edge;
    }
    function xe(c, p) {
      const h = [...c.querySelectorAll(".dc-tab")], M = h.findIndex((A) => {
        const D = A.getBoundingClientRect();
        return p < D.left + D.width / 2;
      });
      return M === -1 ? h.length : M;
    }
    function x(c, p, h) {
      for (const { panels: M, element: A } of W().reverse()) {
        const D = A.getBoundingClientRect();
        if (c < D.left || c > D.right || p < D.top || p > D.bottom) continue;
        const ce = M.find((Q) => Q !== h), se = A.querySelector(".dc-pane__tabs"), V = se?.getBoundingClientRect();
        if (se && V && p >= V.top && p <= V.bottom)
          return ce ? { panel: ce, edge: "center", index: xe(se, c) } : null;
        const X = A.querySelector(":scope > .dc-pane__space");
        if (X) {
          const Q = X.getBoundingClientRect();
          if (c >= Q.left && c <= Q.right && p >= Q.top && p <= Q.bottom) continue;
        }
        return ce ? { panel: ce, edge: ve(D, c, p) } : null;
      }
      return E(c, p, h) ?? ke(c, p);
    }
    function B() {
      const c = O.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function E(c, p, h) {
      const M = d.value;
      if (!M) return null;
      for (const A of B()) {
        const D = A.getBoundingClientRect();
        if (c < D.left || c > D.right || p < D.top || p > D.bottom) continue;
        const ce = Ge(A), se = ce.flatMap((re) => re.panels).find((re) => re !== h);
        if (!se && ce.length > 0) return null;
        const V = $e(M, h)?.rect, X = bn(
          {
            x: c - D.left - 24,
            y: p - D.top - 12,
            w: V?.w ?? it.w,
            h: V?.h ?? it.h
          },
          { w: A.clientWidth, h: A.clientHeight },
          s.minPanelSize
        );
        if (se) return { panel: se, edge: "float", rect: X };
        const Q = F(A);
        return Q ? { panel: "", space: Q, edge: "float", rect: X } : null;
      }
      return null;
    }
    function F(c) {
      const p = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function q() {
      const c = O.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === c).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const h = F(p);
        return h ? [{ element: p, path: h }] : [];
      }) : [];
    }
    function ke(c, p) {
      for (const { element: h, path: M } of q()) {
        if (h.dataset.dcSpace === "desktop") continue;
        const A = h.getBoundingClientRect();
        if (!(c < A.left || c > A.right || p < A.top || p > A.bottom))
          return { panel: "", space: M, edge: "center" };
      }
      return null;
    }
    function Ge(c) {
      return N().filter(
        (p) => p.element.closest(".dc-window__desktop") === c
      );
    }
    let Ye = null;
    const Qe = (c) => c.altKey;
    function Ze(c, p) {
      if (!ie(c) || w.value || g.value || p.button !== 0) return;
      const h = p.clientX, M = p.clientY;
      let A = !1, D = Qe(p);
      const ce = () => {
        const ue = $.value;
        ue && (k.value = D ? E(ue.x, ue.y, c) : x(ue.x, ue.y, c));
      }, se = (ue) => {
        if (!A) {
          if (Math.hypot(ue.clientX - h, ue.clientY - M) < 4) return;
          A = !0, w.value = c, C.value = null;
        }
        D = Qe(ue), b.value = !D, $.value = { x: ue.clientX, y: ue.clientY }, ce();
      }, V = (ue) => {
        Qe(ue) !== D && (D = !D, b.value = !D, A && ce());
      }, X = (ue) => {
        Ye?.();
        const Z = k.value, Me = d.value;
        if (ue && A && Z && Me) {
          const Je = Z.space ? Ls(Me, c, Z.space, Z.rect) : Z.edge === "float" && Z.rect ? Ts(Me, c, Z.panel, Z.rect) : Jt(Me, c, Z.panel, Z.edge, Z.index);
          G(Je, {
            panel: c,
            target: Z.panel,
            edge: Z.edge,
            ...Z.space === void 0 ? {} : { space: Z.space },
            ...Z.index === void 0 ? {} : { index: Z.index },
            ...Z.rect === void 0 ? {} : { rect: Z.rect }
          });
        }
        w.value = null, k.value = null, $.value = null, b.value = !0;
      }, Q = () => X(!0), re = () => X(!1), me = (ue) => {
        if (ue.key === "Escape") {
          X(!1);
          return;
        }
        V(ue);
      };
      Ye = () => {
        window.removeEventListener("pointermove", se), window.removeEventListener("pointerup", Q), window.removeEventListener("pointercancel", re), window.removeEventListener("keydown", me), window.removeEventListener("keyup", V), Ye = null;
      }, window.addEventListener("pointermove", se), window.addEventListener("pointerup", Q), window.addEventListener("pointercancel", re), window.addEventListener("keydown", me), window.addEventListener("keyup", V);
    }
    je(() => Ye?.());
    let Be = null;
    function Ke(c) {
      const p = O.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((A) => A.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function Ve(c) {
      const p = d.value;
      return p ? Ln(p, c) : null;
    }
    function Ct(c) {
      const p = d.value;
      if (!p) return;
      const h = Tt(p, c);
      h !== p && (l.value = h);
    }
    function Yt(c) {
      const p = Ve(c);
      p && Ct(p);
    }
    function K(c) {
      const p = d.value, h = p ? $e(p, c) : null;
      return h !== null && et(h);
    }
    function H(c) {
      const p = d.value, h = p ? $e(p, c) : null;
      return h !== null && ot(h);
    }
    function te(c) {
      const p = d.value, h = p ? rt(p, c) : null;
      return h ? Se(h.node) : "";
    }
    function Ee(c) {
      const p = d.value, h = p ? rt(p, c) : null;
      if (!p || !h) return;
      const M = Se(h.node);
      if (i.value.get(M)?.fixed === !0) return;
      const A = !ot(h);
      let D = ru(p, c, A);
      D !== p && (A || (D = Tt(D, c)), l.value = D, a("frame-minimize", { panel: M, minimized: A }));
    }
    function Ce(c) {
      const p = Ve(c);
      p && Ee(p);
    }
    function Mt(c) {
      const p = d.value, h = p ? rt(p, c) : null;
      if (!p || !h) return;
      const M = Se(h.node);
      if (i.value.get(M)?.fixed === !0) return;
      const A = !et(h);
      let D = lu(p, c, A);
      D !== p && (A && (D = Tt(D, c)), l.value = D, a("frame-maximize", { panel: M, maximized: A }));
    }
    function ds(c) {
      const p = Ve(c);
      p && Mt(p);
    }
    function fs(c, p, h) {
      const M = d.value, A = M ? rt(M, c) : null;
      if (!M || !A || p.button !== 0 || w.value || g.value) return;
      const D = Se(A.node);
      if (i.value.get(D)?.fixed === !0 || et(A) || ot(A) || (h === "move" ? !s.movable : !s.resizable)) return;
      const ce = Ke(c), se = ou(M, c);
      Ct(c);
      const V = { w: ce?.clientWidth ?? 0, h: ce?.clientHeight ?? 0 }, X = { ...A.rect }, Q = p.clientX, re = p.clientY, me = s.minPanelSize;
      g.value = D;
      const ue = (Pe) => {
        const qe = d.value;
        if (!qe) return;
        const St = Rs(qe, se, bn(Pe, V, me));
        St !== qe && (l.value = St);
      }, Z = (Pe) => {
        Pe.preventDefault();
        const qe = Pe.clientX - Q, St = Pe.clientY - re;
        ue(
          h === "move" ? { ...X, x: X.x + qe, y: X.y + St } : zs(X, h, qe, St, me)
        );
      }, Me = (Pe) => {
        if (Be?.(), g.value = null, !Pe) {
          ue(X);
          return;
        }
        const qe = d.value ? rt(d.value, se) : null;
        qe && a("frame-change", { panel: te(se), rect: qe.rect });
      }, Je = () => Me(!0), at = () => Me(!1), lt = (Pe) => {
        Pe.key === "Escape" && Me(!1);
      };
      Be = () => {
        window.removeEventListener("pointermove", Z), window.removeEventListener("pointerup", Je), window.removeEventListener("pointercancel", at), window.removeEventListener("keydown", lt), Be = null;
      }, window.addEventListener("pointermove", Z), window.addEventListener("pointerup", Je), window.addEventListener("pointercancel", at), window.addEventListener("keydown", lt);
    }
    function Va(c, p, h) {
      const M = Ve(c);
      M && fs(M, p, h);
    }
    function qa(c, p, h = !1) {
      const M = d.value, A = Ve(c), D = M && A ? rt(M, A) : null;
      if (!M || !A || !D || i.value.get(c)?.fixed === !0 || (h ? !s.resizable : !s.movable)) return;
      if (et(D) || ot(D)) {
        L.value = `${Fe(c)} is ${et(D) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ce = p === "left" ? -en : p === "right" ? en : 0, se = p === "up" ? -en : p === "down" ? en : 0, V = Ke(A), X = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, Q = h ? zs(D.rect, "se", ce, se, s.minPanelSize) : { ...D.rect, x: D.rect.x + ce, y: D.rect.y + se }, re = Rs(M, A, bn(Q, X, s.minPanelSize));
      if (re === M) {
        L.value = h ? `${Fe(c)} cannot be resized further.` : `${Fe(c)} cannot move ${p}.`;
        return;
      }
      l.value = re;
      const me = rt(re, A);
      me && (a("frame-change", { panel: c, rect: me.rect }), L.value = h ? `${Fe(c)} resized to ${me.rect.w} by ${me.rect.h}.` : `${Fe(c)} moved to ${me.rect.x}, ${me.rect.y}.`);
    }
    je(() => Be?.());
    function Wa(c, p) {
      const h = S(c), M = h?.element.getBoundingClientRect();
      if (!h || !M) return null;
      const A = p === "left" || p === "right", D = (V) => {
        if (!(A ? V.bottom > M.top + 1 && V.top < M.bottom - 1 : V.right > M.left + 1 && V.left < M.right - 1)) return null;
        const Q = p === "left" ? M.left - V.right : p === "right" ? V.left - M.right : p === "up" ? M.top - V.bottom : V.top - M.bottom;
        return Q < -1 ? null : Q;
      }, ce = [];
      for (const V of N()) {
        if (V === h || V.element === h.element) continue;
        const X = D(V.element.getBoundingClientRect());
        if (X === null) continue;
        const Q = V.panels.find((re) => re !== c);
        Q && ce.push({ to: { panel: Q }, distance: X });
      }
      for (const { element: V, path: X } of q()) {
        const Q = D(V.getBoundingClientRect());
        Q !== null && ce.push({ to: { space: X }, distance: Q });
      }
      return ce.reduce(
        (V, X) => V && V.distance <= X.distance ? V : X,
        null
      )?.to ?? null;
    }
    function Ua(c) {
      const p = d.value ? $e(d.value, c) !== null : !1;
      if (!p && !ie(c)) return;
      C.value = C.value === c ? null : c;
      const h = Fe(c);
      if (!C.value) {
        L.value = `${h}: move mode off.`;
        return;
      }
      L.value = p ? `${h}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${h}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Fe = (c) => i.value.get(c)?.title ?? c, Ha = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function ja(c, p, h = !1) {
      if (!ie(c)) return;
      const M = d.value;
      if (!M) return;
      const A = Fe(c), D = ht(M, c);
      if (!h && D && (p === "left" || p === "right") && D.panels.length > 1) {
        const re = D.panels.indexOf(c), me = p === "left" ? re - 1 : re + 1;
        if (me >= 0 && me < D.panels.length) {
          G(Lt(M, c, me), { panel: c, target: c, edge: "center", index: me }), L.value = `${A} moved ${p}, now tab ${me + 1} of ${D.panels.length}.`, hn(c);
          return;
        }
      }
      const se = Wa(c, p);
      if (!se || se.panel !== void 0 && !ie(se.panel)) {
        L.value = `${A} cannot move ${p}.`;
        return;
      }
      const V = Ha[p];
      if (se.space) {
        const re = se.space, me = nt(M, re), ue = $e(M, c)?.rect, Z = { ...it, ...ue ? { w: ue.w, h: ue.h } : {} };
        G(Ls(M, c, re, Z), { panel: c, target: "", space: re, edge: V }), L.value = `${A} moved ${p}, into ${me ? kt(me) : "the space"}.`, hn(c);
        return;
      }
      const X = se.panel, Q = D?.panels.length === 1 && ht(M, X)?.panels.length === 1;
      h ? (G(Jt(M, c, X, "center"), {
        panel: c,
        target: X,
        edge: "center"
      }), L.value = `${A} joined ${Fe(X)} as a tab.`) : Q ? (G(rn(M, c, X), { panel: c, target: X, edge: V }), L.value = `${A} moved ${p}, trading places with ${Fe(X)}.`) : (G(Jt(M, c, X, V), { panel: c, target: X, edge: V }), L.value = `${A} moved ${p}, beside ${Fe(X)}.`), hn(c);
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
      const h = gt(p, c);
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
      const h = p.id, M = ht(c, h), A = (M?.panels.length ?? 0) > 1, D = M?.fixedView === !0, ce = (Q) => ({
        action: () => {
          Q !== c && (l.value = Q);
        }
      }), se = [], V = [], X = p.views ?? [];
      if (X.length > 1 && !D) {
        const Q = R(h);
        se.push({
          id: "view",
          label: "View",
          items: X.map((re) => ({
            id: `view-${re.key}`,
            label: re.label,
            checked: re.key === Q,
            action: () => ee(h, re.key)
          }))
        });
      }
      return A && !D && V.push(
        { id: "show-row", label: "Row", checked: !1, ...ce(Fs(c, h, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ce(Fs(c, h, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ce(du(c, h))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ce(fu(c, h))
        }
      ), A && M && (V.length && V.push({ separator: !0 }), V.push(...hs(M, h))), { panel: se, tabs: V, tabsTitle: M ? ms(M) : "" };
    }
    function hs(c, p) {
      const h = ft(c), M = (A) => {
        const D = c.panels[(h + A + c.panels.length) % c.panels.length];
        return (D === void 0 ? "" : Se(D)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => _n(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => _n(M(-1)) }
      ];
    }
    function Qt(c) {
      return c.title ? c.title : j(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : kt(c);
    }
    function _s(c) {
      if (!c || J(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Le(c)) return null;
      const p = Ba(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function el(c) {
      const p = d.value;
      if (!s.menu || !p) return [];
      const h = nt(p, c);
      if (!h || j(h)) return [];
      if (h.fixedView) return [];
      const M = J(h) ? "desktop" : h.direction, A = (Z, Me, Je) => ({
        id: `show-${Z}`,
        label: Me,
        checked: M === Z,
        action: () => {
          const at = d.value, lt = Je();
          !at || lt === h || (l.value = pn(we(ut(at, c, lt))));
        }
      }), D = () => {
        const Z = Na(h, tl(h));
        if (j(Z) && Z.panels.length === 0) return h;
        const Me = j(Z) && Z.panels.length === 1 ? Z.panels[0] : void 0;
        return Me !== void 0 && pe(Me) ? h : Z;
      }, ce = (Z) => () => J(h) ? Oa(h, Z) : h.direction === Z ? h : { ...h, direction: Z }, se = c.slice(0, -1), V = c.length > 0 ? nt(p, se) : null, X = V && j(V) && V.panels.length > 1 ? V : null, Q = V && _s(V) === h ? V : null, re = _s(h), me = h.title || "this space", ue = (Z, Me, Je, at, lt) => ({
        id: Z,
        label: lt,
        action: () => {
          const Pe = d.value;
          Pe && (l.value = pn(we(ut(Pe, Me, mu(Je, at)))));
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
            A("row", "Row", ce("row")),
            A("column", "Column", ce("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            A("tabs", "Tabs", () => D()),
            A("desktop", "Desktop", () => J(h) ? h : Ia(h))
          ]
        },
        {
          id: "about-around",
          title: re ? `Around ${Qt(re)}` : "",
          items: re ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...re.title ? [] : [ue("merge-around-keep-this", c, h, "outer", `Keep ${me}`)],
            ...h.title ? [] : [ue("merge-around-keep-that", c, h, "inner", `Keep ${Qt(re)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Q ? `Inside ${Qt(Q)}` : "",
          items: Q ? [
            ...h.title ? [] : [ue("merge-inside-keep-that", se, Q, "outer", `Keep ${Qt(Q)}`)],
            ...Q.title ? [] : [ue("merge-inside-keep-this", se, Q, "inner", `Keep ${me}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: X ? ms(X) : "",
          items: X ? hs(X, Se(h)) : []
        }
      ]);
    }
    function tl(c) {
      const p = _.value;
      return p && le(c, p) ? p : void 0;
    }
    function nl(c) {
      const p = d.value, h = i.value.get(c);
      if (!p || !h) return [];
      const M = s.menu ? Ja(p, h) : null, A = Za(c);
      A.length && M?.panel.length && A.push({ separator: !0 }), M && A.push(...M.panel);
      const D = vs([
        { id: "about-panel", title: h.title, items: A },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(h, D) : D;
    }
    function sl(c, p) {
      return o[`${c}-${p}`] ?? o[c];
    }
    function gs(c, p, h, M) {
      return sl(c, p.id)?.({ panel: p, view: h, active: M });
    }
    gu({
      panelFor: (c) => i.value.get(c) ?? null,
      viewFor: R,
      setView: ee,
      movable: v(() => s.movable),
      resizable: v(() => s.resizable),
      minPanelSize: v(() => s.minPanelSize),
      spaceNames: v(() => s.spaceNames),
      focused: _,
      dragging: w,
      dropTarget: k,
      moving: C,
      framing: g,
      canMove: ie,
      focus(c) {
        _.value !== c && (_.value = c, a("panel-activate", c));
      },
      selectPanel: _n,
      beginDrag: Ze,
      toggleMoveMode: Ua,
      nudge: ja,
      setSizes: Xa,
      frameOf: (c) => d.value ? $e(d.value, c) : null,
      beginFrameDrag: Va,
      nudgeFrame: qa,
      raise: Yt,
      maximized: K,
      toggleMaximize: ds,
      minimized: H,
      toggleMinimize: Ce,
      beginFrameDragAt: fs,
      raiseAt: Ct,
      toggleMaximizeAt: Mt,
      toggleMinimizeAt: Ee,
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
        const A = d.value;
        A && G(Jt(A, c, p, h, M), {
          panel: c,
          target: p,
          edge: h,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (l.value = gt(p, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, p, h) {
        const M = d.value;
        M && G(Ts(M, c, p, h), {
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
        const M = nu(h, c, p);
        if (M === h) return;
        l.value = M;
        const A = $e(M, c);
        A && a("frame-change", { panel: c, rect: A.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: ee,
      /** Brings a floating frame to the front of its stack. */
      raise: Yt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ds,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Ce
    }), (c, p) => (f(), m("div", {
      ref_key: "root",
      ref: O,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": w.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Re(al.value)
    }, [
      d.value ? (f(), ae(dd, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), m("p", pd, " This window has no panels. ")),
      he(ll),
      y("p", vd, z(L.value), 1)
    ], 12, fd));
  }
}), hd = /* @__PURE__ */ fe(md, [["__scopeId", "data-v-711565af"]]);
function Nd(e = "", t = "/") {
  const n = U(Ue(e)), s = U(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(l) {
      n.value = Ue(l), a.push(`${s.value}${n.value}`);
    },
    replace(l) {
      n.value = Ue(l), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function Is(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Ue(s === -1 ? n : n.slice(0, s));
}
function Dd(e) {
  const t = U(Is(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), s = ye(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Is(a);
    }
  );
  return {
    search: t,
    path: n,
    push: (a) => e.push(`${n.value}${Ue(a)}`),
    replace: (a) => e.replace(`${n.value}${Ue(a)}`),
    dispose: s
  };
}
const _d = {
  DataShell: xc,
  ShellHeader: fa,
  QueryPanel: va,
  RecordActions: ma,
  ResultsArea: $a,
  FacetControl: pa,
  SegmentedControl: Nc,
  StatusPill: qt,
  WindowFrame: hd,
  WindowPane: Ka,
  ListView: An,
  CardsView: _a,
  GridView: ga,
  TableView: ka,
  LinksView: ya,
  PreviewView: wa,
  TypeCardsView: ba
}, Id = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(_d))
      e.component(`${n}${s}`, a);
    t.route && e.provide(qs, t.route);
  }
};
export {
  fn as CASCADE_STEP,
  kd as COLUMN_BREAKPOINTS,
  wd as COLUMN_ROLES,
  _a as CardsView,
  Ps as ColumnCell,
  it as DEFAULT_FRAME,
  Mn as DEFAULT_SORT,
  fl as DEFAULT_VIEW,
  xc as DataShell,
  Sn as EMPTY_CELL,
  ia as ENTITY_ALL,
  dn as ENTITY_TERM,
  Ot as EXPRESSION_TERM,
  Xn as FACET_PREFIX,
  pa as FacetControl,
  ga as GridView,
  Id as HeaderContentLayoutPlugin,
  ya as LinksView,
  An as ListView,
  vt as MINIMIZED_GAP,
  Ma as MINIMIZED_HEIGHT,
  zn as MINIMIZED_WIDTH,
  Ca as MIN_FRAME,
  Ms as MOCK_TINTS,
  xd as MenuBar,
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
  yd as SHELL_THEMES,
  Ut as ScopeMark,
  Nc as SegmentedControl,
  $t as SelectTick,
  $d as ShellCard,
  fa as ShellHeader,
  qt as StatusPill,
  ka as TableView,
  ba as TypeCardsView,
  Ws as VIEW_KINDS,
  pl as VIEW_LABELS,
  is as WINDOW_CONTEXT_KEY,
  hd as WindowFrame,
  Ka as WindowPane,
  Ea as activePanel,
  ft as activeTab,
  ra as addTerm,
  sa as andExpression,
  eu as axisOf,
  ts as cascade,
  ta as cellFull,
  Kt as cellText,
  sn as cellTextOf,
  ze as cellValue,
  ys as changesResults,
  bn as clampRect,
  Na as collapseSpace,
  du as collapseToTabs,
  Md as column,
  ks as columnAlign,
  bs as columnClass,
  ws as columnKey,
  En as columnTruncates,
  yl as columnsFor,
  ml as countPages,
  dl as createHistoryAdapter,
  Nd as createMemoryAdapter,
  Wl as createMockDataSource,
  Dd as createVueRouterAdapter,
  bl as defaultCellText,
  Ds as defaultLayout,
  Bn as defaultQuery,
  Hl as drillExpression,
  Ls as dropIntoSpace,
  It as emptyFacetState,
  Dn as emptyFacetValue,
  mt as findEntity,
  tt as findSort,
  Ed as fixedView,
  es as float,
  Ts as floatPanel,
  Ia as floatSplit,
  fu as floatTabs,
  nn as fnv1a,
  js as focusEntity,
  pt as formatCount,
  _l as formatDate,
  an as formatExpression,
  hl as formatMetric,
  gl as formatOrdinal,
  Vt as formatTerm,
  vn as frame,
  rt as frameAt,
  $e as frameOf,
  Ln as framePathOf,
  Se as frontPanel,
  Kl as generateRows,
  Cd as group,
  ht as groupOf,
  tu as groups,
  Qs as hasActiveFacets,
  le as hasPanel,
  Sd as headless,
  Pt as insertPanel,
  Rt as isChoosable,
  bd as isEntityScoped,
  Ys as isFacetActive,
  J as isFloat,
  j as isGroup,
  et as isMaximized,
  ot as isMinimized,
  pe as isPanelTab,
  In as isPristineQuery,
  xt as isSplit,
  Ae as isTabOf,
  On as isTypeCardsQuery,
  Us as isViewKind,
  xs as joinExpression,
  zl as matchesExpression,
  Vl as matchesFacets,
  su as maximizeFrame,
  lu as maximizeFrameAt,
  mu as mergeSpace,
  au as minimizeFrame,
  ru as minimizeFrameAt,
  Jt as movePanel,
  Lt as moveTab,
  nt as nodeAt,
  Ft as nodeTitle,
  we as normalizeLayout,
  Ue as normalizeSearch,
  rs as normalizeSizes,
  Ba as onlySpace,
  Xe as panelIds,
  Oe as panelNode,
  As as panelTabs,
  st as parseExpression,
  er as parseQuery,
  go as presentParts,
  ha as presentRow,
  Nu as providePaneContext,
  Xl as provideShellContext,
  gu as provideWindowContext,
  $n as raiseFrame,
  Tt as raiseFrameAt,
  ou as raisedPath,
  Js as reconcileFacets,
  _u as reconcileLayout,
  la as recordTerm,
  ct as removePanel,
  ut as replaceAt,
  zs as resizeRect,
  Ns as resizeSplit,
  Hs as resolveView,
  Te as roleColumn,
  ea as roleColumns,
  pn as rootSpace,
  ss as row,
  kl as rowKey,
  na as sameTerm,
  Ul as scopeTerm,
  Kn as scopeTermFor,
  jl as scopedEntity,
  Es as serializeQuery,
  gt as setActivePanel,
  nu as setFrameRect,
  Rs as setFrameRectAt,
  on as setSizesAt,
  zd as setSplitDirection,
  He as sizesOf,
  Gs as sortsFor,
  _e as spaceChrome,
  kt as spaceTitle,
  ns as split,
  Tl as splitExpression,
  Fs as spreadTabs,
  nr as summarizeQuery,
  Gn as summaryTerms,
  rn as swapPanels,
  Jn as tabNode,
  jt as tabPanels,
  Oa as tileFloat,
  Rd as toFloat,
  Td as toTiled,
  Pd as toggleMaximized,
  Ad as toggleMinimized,
  Ai as useColumns,
  Ui as useEntityPreviews,
  Ld as usePaneContext,
  Fd as usePaneMenu,
  bt as usePresentedRows,
  sr as useQueryState,
  or as useRecordNames,
  ar as useResults,
  be as useShellContext,
  cs as useWindowContext,
  Rl as withoutTerm
};
