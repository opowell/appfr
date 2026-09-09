import { ref as U, inject as yt, provide as Fn, computed as v, toValue as St, shallowRef as Ft, watch as we, onScopeDispose as Ns, defineComponent as ue, onBeforeUnmount as je, openBlock as f, createElementBlock as h, createElementVNode as y, toDisplayString as z, Fragment as G, renderList as le, createCommentVNode as T, unref as P, renderSlot as ge, withDirectives as $n, withKeys as Pt, withModifiers as De, vModelText as xn, useSlots as Ot, nextTick as Dt, createBlock as se, createTextVNode as Ie, createVNode as me, withCtx as Ne, normalizeStyle as Re, resolveDynamicComponent as Is, normalizeClass as on, createSlots as en, useModel as At, useId as Os, mergeModels as cn, Comment as ar, Text as rr, onMounted as lr, resolveComponent as Bs, getCurrentScope as or, h as ir } from "vue";
const Ks = Symbol("dc.routeAdapter");
function Ue(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function cr() {
  const e = typeof window < "u", t = U(e ? Ue(window.location.search) : ""), n = U(e ? window.location.pathname : "/"), s = () => {
    t.value = Ue(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", s);
  const a = (r, l) => {
    const o = Ue(r);
    if (!e) {
      t.value = o;
      return;
    }
    const i = `${window.location.pathname}${o}${window.location.hash}`;
    l === "push" ? window.history.pushState(window.history.state, "", i) : window.history.replaceState(window.history.state, "", i), t.value = o, n.value = window.location.pathname;
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
const Vs = ["list", "cards", "grid", "table", "links", "preview"], gd = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Qt = ["ok", "running", "queued", "review", "failed"], yd = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], wd = [480, 620, 760, 900, 1100], ur = "cards", Cn = "updated";
function qs(e) {
  return typeof e == "string" && Vs.includes(e);
}
const dr = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Ws(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function vt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Us(e, t = {}) {
  const n = vt(e, t.entity), s = e.entities[0];
  if (!n && !s) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? s;
}
function Hs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function js(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const a of Hs(e, t))
    !a.sort || n.has(a.sort) || (n.add(a.sort), s.push({ key: a.sort, label: (a.label ?? a.sort).toLowerCase() }));
  return s;
}
const fr = { key: Cn, label: Cn };
function tt(e, t, n = null) {
  const s = js(e, n);
  return (t ? s.find((r) => r.key === t) : void 0) ?? s.find((r) => r.key === Cn) ?? s[0] ?? fr;
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
function Nt(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Dn(n);
  return t;
}
function Xs(e) {
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
function Gs(e) {
  return Object.values(e).some(Xs);
}
function Nn(e) {
  return e.entity === null && e.expr.trim() === "" && !Gs(e.facets);
}
function kd(e) {
  return e.entity !== null;
}
function In(e) {
  return e.entity === null && e.view === "cards";
}
function pr(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function On(e, t = {}) {
  const s = t.landing === "entity" ? Us(e, t) : null;
  return {
    entity: s?.key ?? null,
    view: t.view && qs(t.view) ? t.view : ur,
    sort: tt(s, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Nt(s),
    page: 1
  };
}
const Ys = ["entity", "sort", "dir", "expr", "facets"];
function _s(e) {
  return Ys.some((t) => t in e);
}
function Qs(e, t) {
  const n = {};
  for (const s of e?.facets ?? []) {
    const a = t[s.key];
    n[s.key] = a && a.kind === s.kind ? a : Dn(s);
  }
  return n;
}
function tn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function vr(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function hr(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function mr(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), s = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${s}.${t.getUTCFullYear()}`;
}
function _r(e) {
  return String(e + 1).padStart(2, "0");
}
const Mn = "—";
function Te(e, t) {
  return e.find((n) => n.role === t);
}
function Zs(e, t) {
  return e.filter((n) => n.role === t);
}
function gr(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], s = t ? "scoped" : "everything";
  return n.filter(
    (a) => a.role !== "tint" && ((a.when ?? "always") === "always" || a.when === s)
  );
}
const yr = ["id", "entityKey", "entityLabel"];
function ze(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (yr.includes(n))
      return t[n];
  }
}
function gs(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function wr(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function kr(e, t) {
  if (e == null || e === "") return Mn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? vr(n) : String(e);
  }
  return t === "date" ? mr(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Mn : String(e);
}
function Bt(e, t) {
  const n = ze(e, t);
  return e.format ? e.format(n, t) : kr(n, e.kind);
}
function br(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Js(e, t) {
  const n = Bt(e, t), s = br(ze(e, t));
  return s && s !== n ? s : n;
}
function nn(e, t) {
  return e ? Bt(e, t) : "";
}
function ys(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const $r = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function ws(e) {
  return [$r[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Sn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const xr = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Cr(e) {
  const t = [];
  let n = "", s = null;
  const a = () => {
    n && t.push(n), n = "";
  };
  for (let r = 0; r < e.length; r++) {
    const l = e[r];
    if (s) {
      l === s ? s = null : n += l;
      continue;
    }
    if (l === '"' || l === "'") {
      s = l;
      continue;
    }
    if (/\s/.test(l)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(r + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      a();
      continue;
    }
    n += l;
  }
  return a(), t;
}
function st(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let s = [];
  for (const a of Cr(t)) {
    const r = a.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      s.length && n.push(s), s = [];
      continue;
    }
    const l = xr.exec(a);
    l && l[3] !== "" ? s.push({
      kind: "field",
      field: l[1].toLowerCase(),
      comparator: l[2],
      value: l[3]
    }) : s.push({ kind: "text", value: a });
  }
  return s.length && n.push(s), n;
}
const gn = (e) => e.toLowerCase().replace(/\s+/g, ""), Mr = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Sr(e, t, n) {
  const s = gn(e), a = n.columns ?? [];
  if (s === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = a.find(
    (u) => u.key === e || u.field === e || u.label !== void 0 && gn(u.label) === s
  );
  if (r) return ze(r, t);
  const l = n.facets.find((u) => gn(u.label) === s);
  if (l && l.key in t.fields) return t.fields[l.key];
  const o = Mr.find(([u]) => u === s)?.[1];
  if (o) {
    const u = Te(a, o);
    if (u) return ze(u, t);
  }
  const i = /^metric(\d+)$/.exec(s);
  if (i) {
    const u = Zs(a, "metric")[Number(i[1]) - 1];
    if (u) return ze(u, t);
  }
}
function yn(e, t) {
  const n = e.toLowerCase(), s = t.toLowerCase();
  if (!s.includes("*")) return n.includes(s);
  const a = s.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(a).test(n);
}
function Er(e, t, n) {
  if (e.kind === "text") {
    const l = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const i = Te(l, o), u = i ? ze(i, t) : void 0;
      return typeof u == "string" && yn(u, e.value);
    });
  }
  const s = Sr(e.field, t, n);
  if (s === void 0) return !0;
  if (Array.isArray(s))
    return e.comparator === ":" || e.comparator === "=" ? s.some((o) => yn(String(o), e.value)) : !0;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof s == "boolean") {
      const l = e.value.toLowerCase();
      return l === "true" || l === "yes" ? s : l === "false" || l === "no" ? !s : !0;
    }
    if (typeof s == "number") {
      const l = Number(e.value);
      return Number.isFinite(l) ? s === l : !0;
    }
    return yn(String(s), e.value);
  }
  const a = Number(e.value), r = typeof s == "number" ? s : Number(s);
  return !Number.isFinite(a) || !Number.isFinite(r) ? !0 : Pr(e.comparator, r, a);
}
function Pr(e, t, n) {
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
function Ar(e, t, n) {
  return e.length ? e.some((s) => s.every((a) => Er(a, t, n))) : !0;
}
function ks(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function Kt(e) {
  return e.kind === "text" ? ks(e.value) : `${e.field}${e.comparator}${ks(e.value)}`;
}
function sn(e) {
  return e.filter((t) => t.length).map((t) => t.map(Kt).join(" ")).join(" OR ");
}
function zr(e, t, n) {
  return e.map((s, a) => a === t ? s.filter((r, l) => l !== n) : s).filter((s) => s.length);
}
function Rr(e) {
  const t = st(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((s) => s.kind === "field"),
    text: n.filter((s) => s.kind === "text").map(Kt).join(" ")
  };
}
function bs(e, t) {
  return [...e.map(Kt), t.trim()].filter(Boolean).join(" ");
}
const $s = (e, t) => e.toLowerCase() === t.toLowerCase();
function ea(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && $s(e.value, t.value) : t.kind === "text" && $s(e.value, t.value);
}
function Tr(e, t) {
  return t.filter((n) => !e.some((s) => ea(s, n)));
}
function ta(e, t) {
  const n = st(e), s = st(t);
  return n.length ? s.length ? sn(
    n.flatMap((a) => s.map((r) => [...a, ...Tr(a, r)]))
  ) : sn(n) : sn(s);
}
const xs = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function na(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Lr = 7, Fr = 3;
function Dr(e, t, n, s) {
  const a = (t * Lr + tn(n)) % s, r = [];
  for (let l = 0; l < Math.min(Fr, s); l++)
    r.push(na(e, (a + l) % s));
  return r;
}
function Nr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Ir(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Ir(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), s = t % e.length, a = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) a.add((s + r) % e.length);
  return [...a].sort((r, l) => r - l).map((r) => e[r]);
}
function Or(e, t) {
  const { hash: n, sample: s, revision: a, updatedAt: r } = t, l = a ? ` · rev ${a + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${s[0]}${l}`;
    case "reference":
      return a ? `${s[1]}-${a + 1}` : s[1];
    case "state":
      return Qt[n % Qt.length];
    case "updated":
      return r;
    case "tint":
      return xs[n % xs.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Qt[n % Qt.length];
    case "date":
      return r;
    default:
      return;
  }
}
function Br(e, t = {}) {
  const n = t.population ?? 48, s = t.seed ?? "", a = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, l = t.scopes ?? [];
  if (!r.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const u = r[i % r.length], d = Math.floor(i / r.length), _ = tn(`${s}:${e.key}:${u[0]}:${i}`), k = na(e.key, i), w = new Date(a.getTime() - _ % 900 * 36e5).toISOString(), b = {};
    for (const S of e.columns ?? []) {
      const g = S.field ?? S.key;
      if (!g || S.value) continue;
      const $ = Or(S, {
        hash: tn(`${_}:${g}`),
        sample: u,
        revision: d,
        updatedAt: w
      });
      $ !== void 0 && (b[g] = $);
    }
    for (const S of e.facets)
      b[S.key] = Nr(S, tn(`${_}:${S.key}`));
    for (const [S, g] of l)
      b[S] = g === e.key ? k : Dr(g, i, S, n);
    o.push({ id: k, entityKey: e.key, entityLabel: e.label, fields: b });
  }
  return o;
}
function Kr(e, t) {
  for (const [n, s] of Object.entries(t)) {
    const a = e.fields[n];
    switch (s.kind) {
      case "chips": {
        if (!s.selected.length) break;
        if (Array.isArray(a)) {
          if (!a.some((r) => s.selected.includes(String(r)))) return !1;
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
function Vr(e, t) {
  const n = e.find((l) => l.sort === t);
  if (!n) return () => 0;
  const s = n.kind ?? "text", a = s === "number" || n.role === "metric", r = s === "date" || n.role === "updated";
  return (l, o) => {
    const i = ze(n, l), u = ze(n, o);
    return a ? Number(u ?? 0) - Number(i ?? 0) : r ? Date.parse(String(u ?? "")) - Date.parse(String(i ?? "")) : String(u ?? "").localeCompare(String(i ?? ""));
  };
}
function qr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (s, a) => {
    const r = t.get(s.key);
    if (r) return r;
    const l = e.scopes ?? a.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), o = Br(s, { ...e, scopes: l });
    return t.set(s.key, o), o;
  };
  return {
    query({ query: s, schema: a, entity: r, limit: l, offset: o }) {
      const i = st(s.expr), u = r ? [r] : a.entities, d = [], _ = [];
      for (const b of u)
        for (const S of n(b, a))
          d.push(S), (r ? Kr(S, s.facets) : !0) && Ar(i, S, b) && _.push(S);
      const k = tt(r, s.sort, a), w = _.sort(Vr(Hs(r, a), k.key));
      return s.dir === "asc" && w.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: w.slice(o, o + l),
        total: _.length,
        unfiltered: _.length === d.length
      };
    }
  };
}
function Wr(e, t) {
  return sa(e, t.id);
}
function sa(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function aa(e, t) {
  return Wr(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Ur(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [s] = st(t).flat();
  return s ? st(n).some(
    (r) => r.some((l) => ea(l, s))
  ) ? n : `${n} ${t}` : n;
}
function Hr(e, t, n) {
  return Ur(t.expr, aa(e, n));
}
function jr(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((s) => s.scope?.toLowerCase() === n) ?? null;
}
const ra = Symbol("dc.shellContext");
function Xr(e) {
  return Fn(ra, e), e;
}
function ke() {
  const e = yt(ra, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Bn = "e", Kn = "v", Vn = "s", qn = "d", Wn = "q", Un = "p", Hn = "f_", la = "*", Gr = [
  Bn,
  Kn,
  Vn,
  qn,
  Wn,
  Un
], En = "..", oa = ",", Yr = [
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
function wn(e) {
  let t = encodeURIComponent(e);
  for (const [n, s] of Yr) t = t.replace(n, s);
  return t;
}
function We(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function ia(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const s of t.split("&")) {
    if (!s) continue;
    const a = s.indexOf("="), r = a === -1 ? s : s.slice(0, a), l = a === -1 ? "" : s.slice(a + 1);
    n.push([We(r), l]);
  }
  return n;
}
function Qr(e) {
  return Gr.includes(e) || e.startsWith(Hn);
}
function Cs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function Zr(e, t) {
  const n = We(t);
  switch (e.kind) {
    case "chips": {
      const s = new Set(
        n.split(oa).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => s.has(r)) };
    }
    case "range": {
      const s = n.indexOf(En), a = (s === -1 ? n : n.slice(0, s)).trim(), r = (s === -1 ? "" : n.slice(s + En.length)).trim(), l = a === "" ? null : Number(a), o = r === "" ? null : Number(r);
      let i = l !== null && Number.isFinite(l) ? Cs(l, e.min, e.max) : null, u = o !== null && Number.isFinite(o) ? Cs(o, e.min, e.max) : null;
      return i !== null && u !== null && i > u && ([i, u] = [u, i]), { kind: "range", min: i, max: u };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function Jr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((s) => e.selected.includes(s)) : e.selected).join(oa) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${En}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function el(e, t, n = {}) {
  const s = On(t, n), a = new Map(ia(e)), r = a.get(Bn), l = r === void 0 ? s.entity : We(r), o = l === la ? null : vt(t, l), i = a.get(Kn), u = i && qs(We(i)) ? We(i) : s.view, d = a.get(Vn), _ = tt(o, d ? We(d) : n.sort, t), k = a.get(qn), w = k ? We(k) === "asc" ? "asc" : "desc" : s.dir, b = a.get(Wn), S = a.get(Un), g = S === void 0 ? 1 : Number(We(S)), $ = Number.isFinite(g) ? Math.max(1, Math.floor(g)) : 1, F = {};
  for (const B of o?.facets ?? []) {
    const D = a.get(`${Hn}${B.key}`);
    F[B.key] = D === void 0 ? Dn(B) : Zr(B, D);
  }
  return {
    entity: o?.key ?? null,
    view: u,
    sort: _.key,
    dir: w,
    expr: b === void 0 ? "" : We(b),
    facets: Qs(o, F),
    page: $
  };
}
function Ms(e, t, n = {}, s = "") {
  const a = On(t, n), r = vt(t, e.entity), l = ia(s).filter(([_]) => !Qr(_)), o = [], i = (_, k) => o.push([_, wn(k)]), u = r?.key ?? null;
  u !== a.entity && i(Bn, u ?? la), e.view !== a.view && i(Kn, e.view), e.sort !== a.sort && i(Vn, e.sort), e.dir !== a.dir && i(qn, e.dir), e.expr.trim() !== "" && i(Wn, e.expr);
  for (const _ of r?.facets ?? []) {
    const k = e.facets[_.key];
    if (!k) continue;
    const w = Jr(k, _);
    w !== null && o.push([`${Hn}${_.key}`, wn(w)]);
  }
  e.page > 1 && i(Un, String(e.page));
  const d = [
    ...l.map(([_, k]) => [wn(_), k]),
    ...o
  ];
  return d.length ? `?${d.map(([_, k]) => k === "" ? _ : `${_}=${k}`).join("&")}` : "";
}
const un = "entity", It = "expr";
function tl(e, t) {
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
function jn(e, t) {
  const n = [];
  t && n.push({
    id: un,
    label: `entity:${t.key}`,
    facetKey: un
  });
  for (const s of t?.facets ?? []) {
    const a = e.facets[s.key];
    a && Xs(a) && n.push(...tl(s, a));
  }
  return st(e.expr).forEach((s, a) => {
    s.forEach((r, l) => {
      n.push({
        id: `${It}:${a}:${l}`,
        label: Kt(r),
        facetKey: It,
        group: a,
        index: l,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {}
      });
    });
  }), n;
}
function nl(e, t, n = null) {
  if (Nn(e)) {
    const r = tt(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const s = jn(e, t).filter((r) => r.facetKey !== It).map((r) => r.label), a = e.expr.trim();
  return a && s.push(`"${a}"`), s.join(" · ");
}
function sl(e) {
  const { adapter: t } = e, n = v(() => St(e.schema)), s = v(() => St(e.defaults) ?? {}), a = v(() => el(t.search.value, n.value, s.value)), r = v(() => vt(n.value, a.value.entity)), l = v(() => r.value ?? Us(n.value, s.value)), o = v(() => js(r.value, n.value)), i = v(() => tt(r.value, a.value.sort, n.value)), u = (g, $) => {
    const F = Ms(g, n.value, s.value, t.search.value);
    F !== t.search.value && ($ === "push" ? t.push(F) : t.replace(F));
  }, d = () => St(e.navigationMode) ?? "push", _ = () => St(e.facetNavigationMode) ?? "replace", k = (g, $) => {
    const F = g.page ?? (_s(g) ? 1 : a.value.page);
    u({ ...a.value, ...g, page: F }, $);
  }, w = (g, $) => {
    const F = a.value.facets[g];
    if (!F) return;
    const B = { ...a.value.facets, [g]: $(F) };
    k({ facets: B }, _());
  }, b = (g) => {
    const $ = g === null ? null : vt(n.value, g);
    return ($?.key ?? null) === a.value.entity ? {} : {
      entity: $?.key ?? null,
      sort: tt($, a.value.sort, n.value).key,
      facets: Nt($)
    };
  }, S = (g) => {
    const $ = b(g);
    Object.keys($).length && k($, d());
  };
  return {
    query: a,
    entity: r,
    focus: l,
    sort: i,
    sorts: o,
    summary: v(() => nl(a.value, r.value, n.value)),
    terms: v(() => jn(a.value, r.value)),
    isPristine: v(() => Nn(a.value)),
    isEverything: v(() => a.value.entity === null),
    hasFacets: v(() => Gs(a.value.facets)),
    setEntity: S,
    clearEntity: () => S(null),
    setView(g) {
      k({ view: g }, d());
    },
    setSort(g) {
      k({ sort: tt(r.value, g, n.value).key }, d());
    },
    toggleDirection() {
      k({ dir: a.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(g) {
      k({ expr: g }, d());
    },
    narrow(g, $, F) {
      k({ expr: g, ...b($), ...F ? { view: F } : {} }, d());
    },
    setPage(g, $) {
      k({ page: Math.max(1, Math.floor(g)) }, $ ?? d());
    },
    setFacet(g, $) {
      w(g, () => $);
    },
    toggleChip(g, $) {
      w(g, (F) => F.kind !== "chips" ? F : { kind: "chips", selected: F.selected.includes($) ? F.selected.filter((D) => D !== $) : [...F.selected, $] });
    },
    setRange(g, $, F) {
      w(g, (B) => B.kind === "range" ? { kind: "range", min: $, max: F } : B);
    },
    toggleFlag(g) {
      w(
        g,
        ($) => $.kind === "toggle" ? { kind: "toggle", on: !$.on } : $
      );
    },
    removeTerm(g) {
      if (g.facetKey === un) {
        S(null);
        return;
      }
      if (g.facetKey === It) {
        const $ = zr(st(a.value.expr), g.group ?? 0, g.index ?? 0);
        k({ expr: sn($) }, d());
        return;
      }
      w(g.facetKey, ($) => $.kind === "chips" && g.option ? { kind: "chips", selected: $.selected.filter((F) => F !== g.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      k({ entity: null, expr: "", facets: Nt(null) }, d());
    },
    reset() {
      u(On(n.value, s.value), d());
    },
    hrefFor(g) {
      const $ = { ...a.value, ...g };
      return $.page = g.page ?? (_s(g) ? 1 : a.value.page), $.facets = Qs(vt(n.value, $.entity), $.facets), `${t.path.value}${Ms($, n.value, s.value, t.search.value)}`;
    }
  };
}
function al(e) {
  const t = Ft([]), n = U(0), s = U(!1), a = Ft(null);
  let r = 0, l = null;
  const o = v(() => (e.query.value.page - 1) * e.limit.value), i = v(() => pr(n.value, e.limit.value)), u = () => {
    const g = e.query.value, $ = e.within?.value.trim();
    return $ ? { ...g, expr: ta($, g.expr) } : g;
  }, d = (g) => {
    t.value = g.rows, n.value = g.total, a.value = null;
  }, _ = (g) => {
    a.value = g, t.value = [], n.value = 0;
  }, k = (g, $) => {
    let F = !0;
    const B = () => g === r, D = () => {
      F && (F = !1, t.value = [], n.value = 0), a.value = null;
    };
    return {
      get open() {
        return B();
      },
      insert(I, q) {
        if (!B()) return;
        const E = Array.isArray(I) ? I : [I];
        if (!E.length) return;
        D();
        const R = [...t.value];
        R.splice(q ?? R.length, 0, ...E), t.value = $ > 0 ? R.slice(0, $) : R, n.value += E.length;
      },
      set(I) {
        B() && (I.rows && (D(), t.value = $ > 0 ? I.rows.slice(0, $) : I.rows, n.value = I.rows.length), I.total !== void 0 && (n.value = I.total));
      },
      close() {
        B() && (s.value = !1);
      },
      fail(I) {
        B() && (_(I), s.value = !1);
      }
    };
  }, w = () => {
    const g = l;
    l = null, g?.();
  }, b = () => {
    const g = ++r;
    w();
    const $ = {
      query: u(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    }, F = e.source.value;
    if (F.stream) {
      s.value = !0;
      try {
        l = F.stream($, k(g, $.limit)) ?? null;
      } catch (D) {
        _(D), s.value = !1;
      }
      return;
    }
    let B;
    try {
      B = F.query($);
    } catch (D) {
      _(D);
      return;
    }
    if (!(B instanceof Promise)) {
      d(B), s.value = !1;
      return;
    }
    s.value = !0, B.then((D) => {
      g === r && d(D);
    }).catch((D) => {
      g === r && _(D);
    }).finally(() => {
      g === r && (s.value = !1);
    });
  }, S = v(() => {
    const g = u();
    return `${JSON.stringify(Ys.map(($) => g[$]))}|${g.page}`;
  });
  return we([e.source, S, e.schema, e.entity, e.limit], b, {
    immediate: !0
  }), Ns(() => {
    r++, w();
  }, !0), { rows: t, total: n, offset: o, pageCount: i, pending: s, error: a, refresh: b };
}
const rl = 25, ca = (e, t) => e.toLowerCase() === t.toLowerCase();
function ll(e, t) {
  return e.find((n) => ca(n.id, t));
}
function ol(e) {
  const t = Ft(/* @__PURE__ */ new Map()), n = (l) => {
    if (l.facetKey !== It || !l.field || !l.value) return null;
    const o = jr(e.schema.value, l.field);
    return o ? { entity: o, id: l.value, key: `${o.key}:${l.value}` } : null;
  }, s = (l) => {
    const { entity: o, id: i } = l, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: sa(o, i) ?? "",
        facets: Nt(o),
        sort: tt(o, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: rl,
      offset: 0
    });
  }, a = (l, o) => {
    const i = nn(Te(l.columns ?? [], "identity"), o);
    return i === Mn || ca(i, o.id) ? "" : i;
  }, r = () => {
    const l = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const d = n(u);
      d && !t.value.has(d.key) && l.set(d.key, d);
    }
    if (!l.size) return;
    const o = [...l.values()].map((u) => ({
      reference: u,
      outcome: s(u)
    })), i = (u) => {
      const d = new Map(t.value);
      u.forEach((_, k) => {
        const { reference: w } = o[k], b = ll(_.rows, w.id);
        d.set(w.key, b ? a(w.entity, b) : "");
      }), t.value = d;
    };
    if (o.every(({ outcome: u }) => !(u instanceof Promise))) {
      i(o.map(({ outcome: u }) => u));
      return;
    }
    Promise.all(o.map(({ outcome: u }) => Promise.resolve(u))).then(i).catch(() => {
    });
  };
  return we([e.source, e.schema, e.terms], () => {
    try {
      r();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(l) {
      const o = n(l);
      return o && t.value.get(o.key) || null;
    }
  };
}
const il = ["data-dc-expanded"], cl = { class: "dc-header__domain" }, ul = {
  key: 0,
  class: "dc-header__within"
}, dl = ["title"], fl = ["data-dc-more", "title"], pl = {
  key: 0,
  class: "dc-header__pick"
}, vl = { class: "dc-header__pick-box" }, hl = ["value"], ml = { value: "" }, _l = ["value"], gl = { class: "dc-header__pick" }, yl = { class: "dc-header__pick-box" }, wl = ["value"], kl = ["value"], bl = { class: "dc-header__pick" }, $l = { class: "dc-header__pick-box" }, xl = ["value"], Cl = ["value"], Ml = ["title", "aria-label"], Sl = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, El = ["title", "aria-label", "onClick"], Pl = ["aria-expanded", "aria-controls"], Al = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, zl = { class: "dc-header__sr" }, Rl = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Tl = ["disabled"], Ll = ["title"], Fl = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Dl = ["disabled"], Nl = {
  key: 1,
  class: "dc-header__actions"
}, Il = /* @__PURE__ */ ue({
  __name: "ShellHeader",
  props: {
    expanded: { type: Boolean },
    panelId: {},
    hideCount: { type: Boolean },
    views: {}
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, s = t, a = ke(), r = v(() => a.schema.value), l = v(
      () => a.hasFacets.value || !!a.query.value.expr.trim() || !!a.within.value
    ), o = v(() => r.value.formatCount ?? hr);
    function i(x) {
      return x.key === a.query.value.entity && l.value && !n.hideCount ? o.value(a.total.value) : x.count;
    }
    function u(x) {
      return `${x.label} · ${i(x)}`;
    }
    const d = v(() => a.query.value.entity !== null || n.hideCount ? "Everything" : `Everything · ${o.value(a.total.value)}`), _ = v(() => {
      const x = a.within.value.trim();
      return x ? jn({ ...a.query.value, expr: x, facets: {} }, null) : [];
    }), k = v(
      () => (n.views ?? [...Vs]).map((x) => ({ key: x, label: dr[x] }))
    ), w = v(() => Ws(a.query.value.view, n.views)), b = v(
      () => !(a.within.value && a.query.value.entity === null && w.value === "cards")
    );
    function S(x) {
      a.setView(x.target.value);
    }
    const g = v(
      () => a.sorts.value.map((x) => ({ key: x.key, label: x.label }))
    ), $ = v(() => g.value.length > 0 && !a.within.value);
    function F(x) {
      a.setSort(x.target.value);
    }
    const B = v(() => a.query.value.dir === "desc"), D = v(
      () => a.terms.value.filter((x) => x.facetKey !== un).map((x, L, O) => {
        const ve = O[L - 1];
        return {
          term: x,
          or: ve?.group !== void 0 && x.group !== void 0 && x.group !== ve.group
        };
      })
    ), I = ol({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [..._.value, ...a.terms.value])
    });
    function q(x) {
      const L = I.nameOf(x);
      return L ? `${x.field}:${L} (${x.value})` : x.label;
    }
    function E(x) {
      const L = x.target.value;
      a.setEntity(L || null);
    }
    function R(x) {
      x.target?.closest("button, select, label") || s("toggle");
    }
    const J = U(null), te = U("");
    function oe() {
      const x = J.value;
      if (!x) {
        te.value = "";
        return;
      }
      const L = x.scrollLeft > 1, O = x.scrollWidth - x.clientWidth - x.scrollLeft > 1;
      te.value = L && O ? "both" : L ? "start" : O ? "end" : "";
    }
    let X = null;
    we(
      J,
      (x) => {
        X?.disconnect(), X = null, oe(), !(!x || typeof ResizeObserver > "u") && (X = new ResizeObserver(oe), X.observe(x));
      },
      { flush: "post" }
    ), we(D, oe, { flush: "post" }), je(() => X?.disconnect());
    const pe = v(() => a.query.value.page), $e = v(
      () => a.pageCount.value > 1 && !In(a.query.value)
    ), C = v(() => {
      const x = `Page ${pe.value} of ${a.pageCount.value}`, L = a.rows.value.length;
      if (!L) return x;
      const O = a.offset.value + 1;
      return `${x} — rows ${O} to ${O + L - 1} of ${a.total.value}`;
    });
    return (x, L) => (f(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      y("div", {
        class: "dc-header__trigger",
        onClick: R
      }, [
        y("span", cl, z(r.value.label), 1),
        _.value.length ? (f(), h("span", ul, [
          L[4] || (L[4] = y("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(G, null, le(_.value, (O) => (f(), h("span", {
            key: `scope:${O.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: q(O)
          }, z(q(O)), 9, dl))), 128))
        ])) : T("", !0),
        y("div", {
          ref_key: "termBar",
          ref: J,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": te.value,
          title: P(a).summary.value,
          onScroll: oe
        }, [
          b.value ? (f(), h("label", pl, [
            L[6] || (L[6] = y("span", { class: "dc-header__sr" }, "Type", -1)),
            y("span", vl, [
              y("select", {
                class: "dc-header__pick-select dc-header__scope-select",
                value: P(a).query.value.entity ?? "",
                onChange: E
              }, [
                y("option", ml, z(d.value), 1),
                (f(!0), h(G, null, le(P(a).entities.value, (O) => (f(), h("option", {
                  key: O.key,
                  value: O.key
                }, z(u(O)), 9, _l))), 128))
              ], 40, hl),
              L[5] || (L[5] = y("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ])) : T("", !0),
          y("label", gl, [
            L[8] || (L[8] = y("span", { class: "dc-header__sr" }, "View", -1)),
            y("span", yl, [
              y("select", {
                class: "dc-header__pick-select dc-header__view-select",
                value: w.value,
                onChange: S
              }, [
                (f(!0), h(G, null, le(k.value, (O) => (f(), h("option", {
                  key: O.key,
                  value: O.key
                }, z(O.label), 9, kl))), 128))
              ], 40, wl),
              L[7] || (L[7] = y("span", {
                class: "dc-header__pick-mark",
                "aria-hidden": "true"
              }, "▾", -1))
            ])
          ]),
          $.value ? (f(), h(G, { key: 1 }, [
            y("label", bl, [
              L[10] || (L[10] = y("span", { class: "dc-header__sr" }, "Sort", -1)),
              y("span", $l, [
                y("select", {
                  class: "dc-header__pick-select dc-header__sort-select dc-mono",
                  value: P(a).sort.value.key,
                  onChange: F
                }, [
                  (f(!0), h(G, null, le(g.value, (O) => (f(), h("option", {
                    key: O.key,
                    value: O.key
                  }, z(O.label), 9, Cl))), 128))
                ], 40, xl),
                L[9] || (L[9] = y("span", {
                  class: "dc-header__pick-mark",
                  "aria-hidden": "true"
                }, "▾", -1))
              ])
            ]),
            y("button", {
              type: "button",
              class: "dc-header__dir dc-mono",
              title: B.value ? "Descending — click to reverse" : "Ascending — click to reverse",
              "aria-label": `Sort direction: ${B.value ? "descending" : "ascending"}`,
              onClick: L[0] || (L[0] = (O) => P(a).toggleDirection())
            }, z(B.value ? "↓" : "↑"), 9, Ml)
          ], 64)) : T("", !0),
          (f(!0), h(G, null, le(D.value, (O) => (f(), h(G, {
            key: O.term.id
          }, [
            O.or ? (f(), h("span", Sl, "or")) : T("", !0),
            y("button", {
              type: "button",
              class: "dc-term dc-mono",
              title: `Remove ${q(O.term)}`,
              "aria-label": `Remove ${q(O.term)}`,
              onClick: (ve) => P(a).removeTerm(O.term)
            }, z(q(O.term)), 9, El)
          ], 64))), 128))
        ], 40, fl),
        y("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: L[1] || (L[1] = (O) => s("toggle"))
        }, [
          y("span", Al, z(e.expanded ? "▲" : "▼"), 1),
          y("span", zl, z(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Pl)
      ]),
      $e.value ? (f(), h("nav", Rl, [
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: pe.value <= 1,
          onClick: L[2] || (L[2] = (O) => P(a).setPage(pe.value - 1))
        }, [...L[11] || (L[11] = [
          y("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Tl),
        y("span", {
          class: "dc-header__page dc-mono",
          title: C.value,
          "aria-hidden": "true"
        }, z(pe.value) + " / " + z(P(a).pageCount.value), 9, Ll),
        y("span", Fl, z(C.value), 1),
        y("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: pe.value >= P(a).pageCount.value,
          onClick: L[3] || (L[3] = (O) => P(a).setPage(pe.value + 1))
        }, [...L[12] || (L[12] = [
          y("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Dl)
      ])) : T("", !0),
      x.$slots.actions ? (f(), h("div", Nl, [
        ge(x.$slots, "actions", {}, void 0, !0)
      ])) : T("", !0)
    ], 8, il));
  }
}), de = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, a] of t)
    n[s] = a;
  return n;
}, ua = /* @__PURE__ */ de(Il, [["__scopeId", "data-v-30ca3969"]]), Ol = { class: "dc-facet" }, Bl = ["id"], Kl = { class: "dc-facet__body" }, Vl = ["aria-labelledby"], ql = ["aria-pressed", "data-dc-active", "onClick"], Wl = ["aria-labelledby"], Ul = ["aria-label", "placeholder", "onKeydown"], Hl = ["aria-label", "placeholder", "onKeydown"], jl = ["aria-checked"], Xl = { class: "dc-switch__text" }, Gl = ["data-dc-active"], Yl = /* @__PURE__ */ ue({
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
    function r(_) {
      if (n.value.kind !== "chips") return;
      const k = a.value.has(_) ? n.value.selected.filter((w) => w !== _) : [...n.value.selected, _];
      s("update", { kind: "chips", selected: k });
    }
    const l = U(""), o = U("");
    we(
      () => n.value,
      (_) => {
        _.kind === "range" && (l.value = _.min === null ? "" : _.min, o.value = _.max === null ? "" : _.max);
      },
      { immediate: !0, deep: !0 }
    );
    function i(_) {
      if (typeof _ == "number") return Number.isFinite(_) ? _ : null;
      const k = _.trim();
      if (!k) return null;
      const w = Number(k);
      return Number.isFinite(w) ? w : null;
    }
    function u() {
      if (n.value.kind !== "range") return;
      const _ = i(l.value), k = i(o.value);
      _ === n.value.min && k === n.value.max || s("update", { kind: "range", min: _, max: k });
    }
    function d() {
      n.value.kind === "toggle" && s("update", { kind: "toggle", on: !n.value.on });
    }
    return (_, k) => (f(), h("div", Ol, [
      y("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, z(e.facet.label), 9, Bl),
      y("div", Kl, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), h(G, null, le(e.facet.options, (w) => (f(), h("button", {
            key: w,
            type: "button",
            class: "dc-chip",
            "aria-pressed": a.value.has(w),
            "data-dc-active": a.value.has(w) ? "true" : "false",
            onClick: (b) => r(w)
          }, z(w), 9, ql))), 128))
        ], 8, Vl)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          $n(y("input", {
            "onUpdate:modelValue": k[0] || (k[0] = (w) => l.value = w),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: u,
            onBlur: u,
            onKeydown: Pt(De(u, ["prevent"]), ["enter"])
          }, null, 40, Ul), [
            [xn, l.value]
          ]),
          k[2] || (k[2] = y("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          $n(y("input", {
            "onUpdate:modelValue": k[1] || (k[1] = (w) => o.value = w),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: u,
            onBlur: u,
            onKeydown: Pt(De(u, ["prevent"]), ["enter"])
          }, null, 40, Hl), [
            [xn, o.value]
          ])
        ], 8, Wl)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          y("span", Xl, z(e.facet.text), 1),
          y("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...k[3] || (k[3] = [
            y("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, Gl)
        ], 8, jl)) : T("", !0)
      ])
    ]));
  }
}), da = /* @__PURE__ */ de(Yl, [["__scopeId", "data-v-36d1334b"]]), Ql = ["id"], Zl = { class: "dc-panel__section dc-panel__rows" }, Jl = { class: "dc-panel__row" }, eo = ["for"], to = ["title", "aria-label", "onClick"], no = ["id", "placeholder", "onKeydown"], so = { class: "dc-panel__actions" }, ao = ["disabled"], ro = {
  key: 0,
  class: "dc-panel__section"
}, lo = /* @__PURE__ */ ue({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, s = Ot(), a = ke(), r = v(() => Rr(a.query.value.expr)), l = v(() => r.value.parts.map(Kt)), o = U(r.value.text), i = U(null);
    we(
      () => r.value.text,
      (S) => {
        o.value = S;
      }
    );
    const u = v(() => o.value !== r.value.text);
    function d() {
      u.value && a.setExpression(bs(r.value.parts, o.value)), n("close");
    }
    function _(S) {
      const { parts: g, text: $ } = r.value;
      a.setExpression(bs(g.filter((F, B) => B !== S), $));
    }
    function k(S) {
      const { parts: g } = r.value;
      o.value || !g.length || (S.preventDefault(), _(g.length - 1));
    }
    function w() {
      o.value = "", a.clearFilters();
    }
    function b(S, g) {
      a.setFacet(S, g);
    }
    return Dt(() => i.value?.focus()), (S, g) => (f(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: g[2] || (g[2] = Pt(De(($) => n("close"), ["stop"]), ["esc"]))
    }, [
      y("section", Zl, [
        y("div", Jl, [
          y("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, eo),
          y("div", {
            class: "dc-field",
            onMousedown: g[1] || (g[1] = De(($) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(G, null, le(l.value, ($, F) => (f(), h("button", {
              key: `${F}:${$}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${$}`,
              "aria-label": `Remove ${$}`,
              onClick: (B) => _(F)
            }, z($), 9, to))), 128)),
            $n(y("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": g[0] || (g[0] = ($) => o.value = $),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: l.value.length ? "" : P(a).schema.value.placeholder,
              onKeydown: [
                Pt(De(d, ["prevent"]), ["enter"]),
                Pt(k, ["backspace"])
              ]
            }, null, 40, no), [
              [xn, o.value]
            ])
          ], 32)
        ]),
        P(a).entity.value ? (f(!0), h(G, { key: 0 }, le(P(a).entity.value.facets, ($) => (f(), se(da, {
          key: $.key,
          facet: $,
          value: P(a).query.value.facets[$.key],
          onUpdate: (F) => b($.key, F)
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
            onClick: w
          }, " Reset ", 8, ao)
        ])
      ]),
      s["panel-section"] ? (f(), h("section", ro, [
        ge(S.$slots, "panel-section", {}, void 0, !0)
      ])) : T("", !0)
    ], 40, Ql));
  }
}), fa = /* @__PURE__ */ de(lo, [["__scopeId", "data-v-2642c02d"]]), oo = {
  key: 0,
  class: "dc-actions"
}, io = {
  key: 0,
  class: "dc-actions__select"
}, co = { class: "dc-actions__all" }, uo = ["checked", "indeterminate"], fo = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, po = { class: "dc-actions__ops" }, vo = ["disabled"], ho = ["disabled"], mo = /* @__PURE__ */ ue({
  __name: "RecordActions",
  setup(e) {
    const t = ke(), n = v(() => t.entity.value), s = v(() => !In(t.query.value)), a = v(() => s.value && t.selectable.value), r = v(
      () => s.value && (a.value || !!(n.value?.create || n.value?.duplicate || n.value?.delete))
    ), l = v(() => t.selection.value.ids.length), o = v(() => t.rows.value.filter((k) => t.isSelected(k)).length), i = v(
      () => t.rows.value.length > 0 && o.value === t.rows.value.length
    ), u = v(() => o.value > 0 && !i.value), d = v(() => l.value ? `${l.value} selected` : "Select all");
    function _(k) {
      return l.value ? `${k} ${l.value}` : k;
    }
    return (k, w) => r.value ? (f(), h("div", oo, [
      a.value ? (f(), h("div", io, [
        y("label", co, [
          y("input", {
            class: "dc-tick",
            type: "checkbox",
            checked: i.value,
            indeterminate: u.value,
            title: "Select every row on this page",
            onChange: w[0] || (w[0] = (b) => P(t).selectPage(!i.value))
          }, null, 40, uo),
          y("span", fo, z(d.value), 1)
        ]),
        l.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__clear",
          onClick: w[1] || (w[1] = (b) => P(t).clearSelection())
        }, " Clear ")) : T("", !0)
      ])) : T("", !0),
      y("div", po, [
        n.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: w[2] || (w[2] = (b) => P(t).create(n.value))
        }, [
          w[5] || (w[5] = y("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ie(" " + z(n.value.create), 1)
        ])) : T("", !0),
        n.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !l.value,
          onClick: w[3] || (w[3] = (b) => P(t).duplicate())
        }, z(_(n.value.duplicate)), 9, vo)) : T("", !0),
        n.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !l.value,
          onClick: w[4] || (w[4] = (b) => P(t).delete())
        }, z(_(n.value.delete)), 9, ho)) : T("", !0)
      ])
    ])) : T("", !0);
  }
}), pa = /* @__PURE__ */ de(mo, [["__scopeId", "data-v-ca4aca14"]]);
function _o(e, t) {
  if (!e) return null;
  const n = ze(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function go(e, t) {
  const n = Te(t, "state"), s = Te(t, "tint");
  return {
    identity: nn(Te(t, "identity"), e),
    reference: nn(Te(t, "reference"), e),
    metrics: Zs(t, "metric").map((a) => ({
      column: a,
      label: a.label ?? "",
      text: Bt(a, e)
    })),
    state: n ? ze(n, e) ?? null : null,
    updated: nn(Te(t, "updated"), e),
    image: _o(Te(t, "image"), e),
    tint: s ? ze(s, e) ?? null : null
  };
}
function va(e, t, n, s, a = !1) {
  const r = n?.columns ?? [];
  return {
    row: e,
    key: wr(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: r,
    ordinal: _r(t),
    parts: go(e, r),
    pinned: s,
    selected: a
  };
}
function kt() {
  const e = ke(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, s) => va(
        n,
        e.offset.value + s,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const yo = ["data-dc-status"], wo = /* @__PURE__ */ ue({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, z(e.status), 9, yo));
  }
}), Vt = /* @__PURE__ */ de(wo, [["__scopeId", "data-v-23e59fbf"]]), ko = ["title"], bo = { key: 1 }, $o = /* @__PURE__ */ ue({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ke(), s = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), a = v(() => t.column.label ?? ""), r = v(() => Bt(t.column, t.entry.row));
    function l(o) {
      o.stopPropagation(), s.value && n.drill(t.entry.row, s.value);
    }
    return (o, i) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${a.value} of ${e.entry.parts.identity} — show the ${s.value.label.toLowerCase()}`,
      onClick: l
    }, [
      ge(o.$slots, "default", {}, () => [
        Ie(z(r.value), 1)
      ], !0)
    ], 8, ko)) : (f(), h("span", bo, [
      ge(o.$slots, "default", {}, () => [
        Ie(z(r.value), 1)
      ], !0)
    ]));
  }
}), qt = /* @__PURE__ */ de($o, [["__scopeId", "data-v-3bd0cbdb"]]), xo = ["data-dc-active", "aria-pressed", "aria-label"], Co = /* @__PURE__ */ ue({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ke();
    function s(a) {
      a.stopPropagation(), n.togglePin(t.row);
    }
    return (a, r) => (f(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: s
    }, z(e.pinned ? "★" : "☆"), 9, xo));
  }
}), Xn = /* @__PURE__ */ de(Co, [["__scopeId", "data-v-ef63d763"]]), Mo = ["src"], So = /* @__PURE__ */ ue({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = U(!1);
    return we(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (s, a) => e.src.trim() && !n.value ? (f(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: a[0] || (a[0] = (r) => n.value = !0)
    }, null, 40, Mo)) : T("", !0);
  }
}), Gn = /* @__PURE__ */ de(So, [["__scopeId", "data-v-afaab300"]]), Eo = ["title", "aria-label"], Po = /* @__PURE__ */ ue({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ke(), s = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    );
    function a(r) {
      r.stopPropagation(), n.drill(t.entry.row, null);
    }
    return (r, l) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      title: `Narrow everything to ${s.value}: ${e.entry.row.id}`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onClick: a
    }, " → ", 8, Eo)) : T("", !0);
  }
}), Wt = /* @__PURE__ */ de(Po, [["__scopeId", "data-v-e481cf12"]]), Ao = ["checked", "aria-label"], bt = /* @__PURE__ */ ue({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ke();
    function s(a) {
      a.stopPropagation(), n.toggleSelect(t.row);
    }
    return (a, r) => (f(), h("input", {
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
}, Fo = { class: "dc-card__top-right" }, Do = ["onClick"], No = { class: "dc-card__names" }, Io = { class: "dc-card__primary" }, Oo = { class: "dc-card__secondary dc-mono" }, Bo = { class: "dc-card__metrics dc-mono" }, Ko = {
  key: 0,
  class: "dc-card__date"
}, Vo = /* @__PURE__ */ ue({
  __name: "CardsView",
  setup(e) {
    const t = ke(), n = kt(), s = v(() => t.isEverything.value);
    return (a, r) => (f(), h("div", zo, [
      (f(!0), h(G, null, le(P(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-card"
      }, [
        y("div", Ro, [
          y("span", To, [
            P(t).selectable.value ? (f(), se(bt, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : T("", !0),
            Ie(" " + z(l.ordinal) + " ", 1),
            s.value ? (f(), h("span", Lo, z(l.entityLabel), 1)) : T("", !0)
          ]),
          y("span", Fo, [
            l.parts.state ? (f(), se(Vt, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : T("", !0),
            me(Wt, { entry: l }, null, 8, ["entry"]),
            P(t).pinnable.value ? (f(), se(Xn, {
              key: 1,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : T("", !0)
          ])
        ]),
        y("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => P(t).activate(l.row)
        }, [
          l.parts.image ? (f(), se(Gn, {
            key: 0,
            class: "dc-card__image",
            src: l.parts.image
          }, null, 8, ["src"])) : T("", !0),
          y("span", No, [
            y("span", Io, z(l.parts.identity), 1),
            y("span", Oo, z(l.parts.reference), 1)
          ])
        ], 8, Do),
        y("div", Bo, [
          (f(!0), h(G, null, le(l.parts.metrics.slice(0, 2), (o) => (f(), se(qt, {
            key: o.column.key ?? o.label,
            entry: l,
            column: o.column
          }, {
            default: Ne(() => [
              Ie(z(o.label) + " " + z(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (f(), h("span", Ko, z(l.parts.updated), 1)) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ha = /* @__PURE__ */ de(Vo, [["__scopeId", "data-v-05d69cb4"]]), qo = { class: "dc-grid" }, Wo = ["onClick"], Uo = { class: "dc-tile__scrim" }, Ho = { class: "dc-tile__top dc-mono" }, jo = { class: "dc-tile__chip" }, Xo = { class: "dc-tile__caption" }, Go = { class: "dc-tile__secondary dc-truncate" }, Yo = { class: "dc-tile__primary" }, Qo = /* @__PURE__ */ ue({
  __name: "GridView",
  setup(e) {
    const t = ke(), n = kt();
    return (s, a) => (f(), h("div", qo, [
      (f(!0), h(G, null, le(P(n), (r) => (f(), h("div", {
        key: r.key,
        class: "dc-grid__cell"
      }, [
        y("button", {
          type: "button",
          class: "dc-tile",
          style: Re({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
          onClick: (l) => P(t).activate(r.row)
        }, [
          r.parts.image ? (f(), se(Gn, {
            key: 0,
            class: "dc-tile__image",
            src: r.parts.image
          }, null, 8, ["src"])) : T("", !0),
          y("span", Uo, [
            y("span", Ho, [
              y("span", jo, z(r.ordinal), 1)
            ]),
            y("span", Xo, [
              y("span", Go, z(r.parts.reference), 1),
              y("span", Yo, z(r.parts.identity), 1)
            ])
          ])
        ], 12, Wo),
        P(t).selectable.value ? (f(), se(bt, {
          key: 0,
          class: "dc-grid__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0)
      ]))), 128))
    ]));
  }
}), ma = /* @__PURE__ */ de(Qo, [["__scopeId", "data-v-c9789911"]]), Zo = { class: "dc-links" }, Jo = ["onClick"], ei = { class: "dc-link__primary dc-truncate" }, ti = { class: "dc-link__secondary dc-mono dc-truncate" }, ni = /* @__PURE__ */ ue({
  __name: "LinksView",
  setup(e) {
    const t = ke(), n = kt();
    return (s, a) => (f(), h("div", Zo, [
      (f(!0), h(G, null, le(P(n), (r) => (f(), h("span", {
        key: r.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (f(), se(bt, {
          key: 0,
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        y("button", {
          type: "button",
          class: "dc-link",
          onClick: (l) => P(t).activate(r.row)
        }, [
          y("span", ei, z(r.parts.identity), 1),
          y("span", ti, z(r.parts.reference), 1)
        ], 8, Jo)
      ]))), 128))
    ]));
  }
}), _a = /* @__PURE__ */ de(ni, [["__scopeId", "data-v-cc3a66fa"]]), si = {
  class: "dc-list",
  role: "list"
}, ai = ["onClick"], ri = { class: "dc-list__ordinal dc-mono" }, li = { class: "dc-list__identity" }, oi = { class: "dc-list__primary dc-truncate" }, ii = { class: "dc-list__secondary dc-mono dc-truncate" }, ci = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, ui = { class: "dc-list__metrics dc-mono" }, di = { class: "dc-list__trailing" }, fi = /* @__PURE__ */ ue({
  __name: "ListView",
  setup(e) {
    const t = ke(), n = kt(), s = v(() => t.isEverything.value);
    return (a, r) => (f(), h("div", si, [
      (f(!0), h(G, null, le(P(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (f(), se(bt, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : T("", !0),
        y("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => P(t).activate(l.row)
        }, [
          y("span", ri, z(l.ordinal), 1),
          y("span", li, [
            y("span", oi, z(l.parts.identity), 1),
            y("span", ii, z(l.parts.reference), 1)
          ])
        ], 8, ai),
        s.value ? (f(), h("span", ci, z(l.entityLabel), 1)) : T("", !0),
        y("span", ui, [
          (f(!0), h(G, null, le(l.parts.metrics.slice(0, 2), (o) => (f(), se(qt, {
            key: o.column.key ?? o.label,
            entry: l,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        y("span", di, [
          l.parts.state ? (f(), se(Vt, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : T("", !0),
          me(Wt, { entry: l }, null, 8, ["entry"]),
          P(t).pinnable.value ? (f(), se(Xn, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : T("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Pn = /* @__PURE__ */ de(fi, [["__scopeId", "data-v-6c92ff27"]]), pi = { class: "dc-preview" }, vi = { class: "dc-preview__pager dc-mono" }, hi = ["disabled"], mi = { "aria-live": "polite" }, _i = ["disabled"], gi = {
  key: 0,
  class: "dc-preview__card"
}, yi = { class: "dc-preview__body" }, wi = { class: "dc-preview__top" }, ki = { class: "dc-preview__badges" }, bi = { class: "dc-preview__entity dc-mono" }, $i = { class: "dc-preview__marks" }, xi = { class: "dc-preview__primary" }, Ci = { class: "dc-preview__secondary dc-mono" }, Mi = { class: "dc-preview__fields" }, Si = { class: "dc-preview__key" }, Ei = { class: "dc-preview__value dc-mono" }, Pi = /* @__PURE__ */ ue({
  __name: "PreviewView",
  setup(e) {
    const t = ke(), n = kt(), s = U(0);
    we(n, (i) => {
      s.value > i.length - 1 && (s.value = Math.max(0, i.length - 1));
    });
    const a = v(() => n.value[s.value]), r = v(() => {
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
    }), l = v(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${s.value + 1} / ${n.value.length}${i}`;
    }), o = (i) => {
      const u = n.value.length;
      u && (s.value = Math.min(u - 1, Math.max(0, s.value + i)));
    };
    return (i, u) => (f(), h("div", pi, [
      y("div", vi, [
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: s.value === 0,
          onClick: u[0] || (u[0] = (d) => o(-1))
        }, " ‹ ", 8, hi),
        y("span", mi, z(l.value), 1),
        y("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: s.value >= P(n).length - 1,
          onClick: u[1] || (u[1] = (d) => o(1))
        }, " › ", 8, _i)
      ]),
      a.value ? (f(), h("div", gi, [
        y("div", {
          class: "dc-preview__media",
          style: Re({ background: a.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, " preview ", 4),
        y("div", yi, [
          y("div", wi, [
            y("span", ki, [
              P(t).selectable.value ? (f(), se(bt, {
                key: 0,
                row: a.value.row,
                selected: a.value.selected,
                name: a.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : T("", !0),
              a.value.parts.state ? (f(), se(Vt, {
                key: 1,
                status: a.value.parts.state
              }, null, 8, ["status"])) : T("", !0),
              y("span", bi, z(a.value.entityLabel), 1)
            ]),
            y("span", $i, [
              me(Wt, { entry: a.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (f(), se(Xn, {
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
            (f(!0), h(G, null, le(r.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              y("dt", Si, z(d.key), 1),
              y("dd", Ei, [
                d.column && a.value ? (f(), se(qt, {
                  key: 0,
                  entry: a.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), h(G, { key: 1 }, [
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
}), ga = /* @__PURE__ */ de(Pi, [["__scopeId", "data-v-a236412c"]]);
function Ai() {
  const e = ke();
  return v(() => gr(e.schema.value, e.entity.value));
}
const zi = ["title"], Ri = {
  key: 5,
  class: "dc-cell__text"
}, Ti = /* @__PURE__ */ ue({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ke(), s = v(() => t.column.kind ?? "text"), a = v(() => ze(t.column, t.entry.row)), r = v(
      () => s.value === "ordinal" ? t.entry.ordinal : Bt(t.column, t.entry.row)
    ), l = v(() => a.value), o = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => Sn(t.column)), u = v(() => Js(t.column, t.entry.row));
    function d(_) {
      o.value && (_.stopPropagation(), t.column.click?.(t.entry.row), t.column.activate && n.activate(t.entry.row));
    }
    return (_, k) => s.value === "component" && e.column.component ? (f(), se(Is(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: a.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : s.value === "status" ? (f(), se(Vt, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : s.value === "image" ? (f(), se(Gn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof a.value == "string" ? a.value : "",
      style: Re({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), se(qt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), h("button", {
      key: 4,
      type: "button",
      class: on(["dc-table__open", { "dc-truncate": i.value }]),
      title: u.value,
      onClick: d
    }, z(r.value), 11, zi)) : (f(), h("span", Ri, z(r.value), 1));
  }
}), Ss = /* @__PURE__ */ de(Ti, [["__scopeId", "data-v-d746be44"]]), Li = {
  key: 0,
  class: "dc-table__none"
}, Fi = { class: "dc-table__detail" }, Di = ["data-dc-wrap"], Ni = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Ii = ["data-dc-align", "data-dc-hide", "aria-sort"], Oi = ["onClick"], Bi = ["onClick"], Ki = {
  key: 0,
  class: "dc-table__pick"
}, Vi = ["data-dc-align", "data-dc-hide", "title"], qi = {
  key: 0,
  class: "dc-table__name"
}, Wi = /* @__PURE__ */ ue({
  __name: "TableView",
  setup(e) {
    const t = ke(), n = kt(), s = Ai(), a = v(
      () => s.value.some((k) => k.kind === "image" || k.height !== void 0)
    );
    function r(k) {
      k && (t.query.value.sort === k ? t.toggleDirection() : t.setSort(k));
    }
    const l = v(() => t.entity.value?.label ?? "The result set"), o = v(() => new Set(t.sorts.value.map((k) => k.key))), i = (k) => k.sort !== void 0 && o.value.has(k.sort), u = (k) => {
      if (i(k))
        return t.query.value.sort !== k.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function d(k) {
      return [
        ws(k),
        k.muted ? "dc-table__muted" : "",
        k.mono ? "dc-mono" : "",
        Sn(k) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function _(k, w) {
      if (!(!Sn(k) || k.activate || k.click))
        return Js(k, w.row);
    }
    return (k, w) => P(s).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": a.value ? "" : void 0
    }, [
      y("thead", null, [
        y("tr", null, [
          P(t).selectable.value ? (f(), h("th", Ni, [...w[3] || (w[3] = [
            y("span", { class: "dc-table__sr" }, "Select", -1)
          ])])) : T("", !0),
          (f(!0), h(G, null, le(P(s), (b, S) => (f(), h("th", {
            key: P(gs)(b, S),
            scope: "col",
            class: on(P(ws)(b)),
            style: Re({ width: b.width }),
            "data-dc-align": P(ys)(b),
            "data-dc-hide": b.hideBelow,
            "aria-sort": u(b)
          }, [
            i(b) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (g) => r(b.sort)
            }, z(b.label), 9, Oi)) : (f(), h(G, { key: 1 }, [
              Ie(z(b.label), 1)
            ], 64))
          ], 14, Ii))), 128))
        ])
      ]),
      y("tbody", null, [
        (f(!0), h(G, null, le(P(n), (b) => (f(), h("tr", {
          key: b.key,
          class: "dc-table__row",
          onClick: (S) => P(t).activate(b.row)
        }, [
          P(t).selectable.value ? (f(), h("td", Ki, [
            me(bt, {
              row: b.row,
              selected: b.selected,
              name: b.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : T("", !0),
          (f(!0), h(G, null, le(P(s), (S, g) => (f(), h("td", {
            key: P(gs)(S, g),
            class: on(d(S)),
            "data-dc-align": P(ys)(S),
            "data-dc-hide": S.hideBelow,
            title: _(S, b)
          }, [
            S.scope ? (f(), h("span", qi, [
              me(Ss, {
                column: S,
                entry: b
              }, null, 8, ["column", "entry"]),
              me(Wt, { entry: b }, null, 8, ["entry"])
            ])) : (f(), se(Ss, {
              key: 1,
              column: S,
              entry: b
            }, null, 8, ["column", "entry"]))
          ], 10, Vi))), 128))
        ], 8, Bi))), 128))
      ])
    ], 8, Di)) : (f(), h("p", Li, [
      w[2] || (w[2] = y("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      y("span", Fi, [
        Ie(z(l.value) + " has no ", 1),
        w[0] || (w[0] = y("code", null, "columns", -1)),
        w[1] || (w[1] = Ie(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), ya = /* @__PURE__ */ de(Wi, [["__scopeId", "data-v-66b32c45"]]);
function Ui(e) {
  const t = Ft([]), n = U(!1), s = Ft(null);
  let a = 0;
  const r = (i, u, d) => ({
    entity: i,
    rows: u.rows.map(
      (_, k) => va(_, k, i, e.isPinned(_.id))
    ),
    total: u.total,
    count: d ? i.count : String(u.total)
  }), l = () => {
    const i = ++a, u = e.query.value, d = e.schema.value, _ = e.entities.value, k = e.limit.value, w = e.within?.value.trim() ?? "", b = Nn(u) && !w, S = w ? ta(w, u.expr) : u.expr, g = _.map(($) => ({
      entity: $,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...u, entity: $.key, expr: S, facets: Nt($), page: 1 },
        schema: d,
        entity: $,
        limit: k,
        offset: 0
      })
    }));
    if (g.every(({ outcome: $ }) => !($ instanceof Promise))) {
      t.value = g.map(
        ({ entity: $, outcome: F }) => r($, F, b)
      ), s.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(g.map(({ outcome: $ }) => Promise.resolve($))).then(($) => {
      i === a && (t.value = $.map(
        (F, B) => r(g[B].entity, F, b)
      ), s.value = null);
    }).catch(($) => {
      i === a && (s.value = $, t.value = []);
    }).finally(() => {
      i === a && (n.value = !1);
    });
  }, o = () => {
    try {
      l();
    } catch (i) {
      s.value = i, t.value = [], n.value = !1;
    }
  };
  return we(
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
const Hi = ["data-dc-pending"], ji = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Xi = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Gi = {
  key: 2,
  class: "dc-types__state"
}, Yi = ["data-dc-empty"], Qi = ["onClick"], Zi = { class: "dc-type__name" }, Ji = { class: "dc-type__count dc-mono" }, ec = { class: "dc-type__sr" }, tc = {
  key: 0,
  class: "dc-type__empty"
}, nc = ["onClick"], sc = { class: "dc-type__identity" }, ac = { class: "dc-type__primary dc-truncate" }, rc = { class: "dc-type__secondary dc-mono dc-truncate" }, lc = { class: "dc-type__trailing dc-mono" }, oc = { class: "dc-type__metric-value" }, ic = { class: "dc-type__metric-label" }, cc = {
  key: 0,
  class: "dc-type__date"
}, uc = ["onClick"], dc = /* @__PURE__ */ ue({
  __name: "TypeCardsView",
  setup(e) {
    const t = ke(), { previews: n, pending: s, error: a } = Ui({
      source: t.source,
      schema: t.schema,
      query: t.query,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (o) => t.isPinnedId(o)
    }), r = v(() => !t.isPristine.value || !!t.within.value), l = v(
      () => n.value.filter((o) => o.rows.length > 0 || o.entity.create)
    );
    return (o, i) => (f(), h("div", {
      class: "dc-types",
      "data-dc-pending": P(s) ? "true" : "false"
    }, [
      ge(o.$slots, "before", {}, void 0, !0),
      P(a) ? (f(), h("p", ji, " Could not load results: " + z(P(a) instanceof Error ? P(a).message : "the data source failed."), 1)) : !l.value.length && P(s) ? (f(), h("p", Xi, " Running query… ")) : l.value.length ? T("", !0) : (f(), h("p", Gi, z(r.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(G, null, le(l.value, (u) => (f(), h("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.rows.length ? "false" : "true"
      }, [
        y("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => P(t).setEntity(u.entity.key)
        }, [
          y("span", Zi, z(u.entity.label), 1),
          y("span", Ji, z(u.count), 1),
          i[0] || (i[0] = y("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          y("span", ec, "Show only " + z(u.entity.label.toLowerCase()), 1)
        ], 8, Qi),
        u.rows.length ? T("", !0) : (f(), h("p", tc, z(r.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(G, null, le(u.rows, (d) => (f(), h("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          y("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (_) => P(t).activate(d.row)
          }, [
            y("span", sc, [
              y("span", ac, z(d.parts.identity), 1),
              y("span", rc, z(d.parts.reference), 1)
            ])
          ], 8, nc),
          y("span", lc, [
            (f(!0), h(G, null, le(d.parts.metrics.slice(0, 1), (_) => (f(), se(qt, {
              key: _.column.key ?? _.label,
              class: "dc-type__metric",
              entry: d,
              column: _.column
            }, {
              default: Ne(() => [
                y("span", oc, z(_.text), 1),
                y("span", ic, z(_.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), h("span", cc, z(d.parts.updated), 1)) : T("", !0),
            me(Wt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create ? (f(), h("button", {
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
        ], 8, uc)) : T("", !0)
      ], 8, Yi))), 128)),
      ge(o.$slots, "after", {}, void 0, !0)
    ], 8, Hi));
  }
}), wa = /* @__PURE__ */ de(dc, [["__scopeId", "data-v-82abc070"]]), fc = ["data-dc-pending"], pc = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, vc = { class: "dc-results__detail" }, hc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, mc = {
  key: 3,
  class: "dc-results__state"
}, _c = { class: "dc-results__detail" }, gc = /* @__PURE__ */ ue({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ke(), s = Ot(), a = {
      list: Pn,
      cards: ha,
      grid: ma,
      table: ya,
      links: _a,
      preview: ga
    }, r = v(() => In(n.query.value)), l = v(() => Ws(n.query.value.view, t.views)), o = v(() => a[l.value] ?? Pn), i = v(() => n.rows.value.length > 0), u = v(() => n.error.value !== null);
    return (d, _) => (f(), h("div", {
      class: "dc-results",
      "data-dc-pending": P(n).pending.value ? "true" : "false"
    }, [
      r.value ? (f(), se(wa, { key: 0 }, en({ _: 2 }, [
        s["cards-before"] ? {
          name: "before",
          fn: Ne(() => [
            ge(d.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        s["cards-after"] ? {
          name: "after",
          fn: Ne(() => [
            ge(d.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : u.value ? (f(), h("p", pc, [
        _[1] || (_[1] = y("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        y("span", vc, z(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && P(n).pending.value ? (f(), h("p", hc, [..._[2] || (_[2] = [
        y("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), se(Is(o.value), { key: 4 })) : (f(), h("div", mc, [
        _[3] || (_[3] = y("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        y("span", _c, z(P(n).summary.value), 1),
        P(n).isPristine.value ? T("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: _[0] || (_[0] = (k) => P(n).clearFilters())
        }, z(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, fc));
  }
}), ka = /* @__PURE__ */ de(gc, [["__scopeId", "data-v-570beafc"]]), yc = ["data-dc-theme"], wc = ["data-dc-width", "data-dc-align"], kc = { class: "dc-shell__panel" }, bc = /* @__PURE__ */ ue({
  __name: "DataShell",
  props: /* @__PURE__ */ cn({
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
  emits: /* @__PURE__ */ cn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = At(e, "open"), l = At(e, "pinned"), o = At(e, "selected"), i = Ot(), u = yt(Ks, null), d = s.route || u ? null : cr(), _ = s.route ?? u ?? d;
    je(() => d?.dispose?.());
    const k = v(() => qr({ seed: s.schema.key })), w = v(() => s.source ?? k.value), b = sl({
      schema: () => s.schema,
      adapter: _,
      defaults: () => s.defaults,
      navigationMode: () => s.navigationMode,
      facetNavigationMode: () => s.facetNavigationMode
    }), S = v(() => s.within?.trim() ?? ""), g = al({
      source: w,
      query: b.query,
      schema: v(() => s.schema),
      entity: b.entity,
      limit: v(() => s.limit),
      within: S
    });
    we(b.query, (C) => a("query-change", C)), we(
      [g.pageCount, g.pending, b.query],
      () => {
        if (g.pending.value) return;
        const C = g.pageCount.value;
        b.query.value.page > C && b.setPage(C, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const $ = Os() ?? "dc-query-panel", F = U(null);
    function B() {
      r.value && (r.value = !1, Dt(() => {
        F.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const D = v(() => new Set(l.value));
    function I(C) {
      const x = new Set(D.value);
      x.has(C.id) ? x.delete(C.id) : x.add(C.id), l.value = [...x], a("toggle-pin", C);
    }
    const q = v(() => {
      if (s.selectable === !0) return !0;
      const C = b.entity.value;
      return !!(C?.duplicate || C?.delete);
    }), E = v(() => new Set(o.value));
    function R(C) {
      const x = new Set(E.value);
      x.has(C.id) ? x.delete(C.id) : x.add(C.id), o.value = [...x];
    }
    function J(C) {
      const x = new Set(E.value);
      for (const L of g.rows.value)
        C ? x.add(L.id) : x.delete(L.id);
      o.value = [...x];
    }
    function te() {
      o.value.length && (o.value = []);
    }
    const oe = v(() => ({
      ids: [...o.value],
      rows: g.rows.value.filter((C) => E.value.has(C.id)),
      entity: b.entity.value
    }));
    we(() => b.query.value.entity, te);
    function X(C, x) {
      b.narrow(
        Hr(s.schema, b.query.value, C),
        x?.key ?? null,
        x ? void 0 : "cards"
      ), a("drill", C, x);
    }
    const pe = Xr({
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
      source: w,
      previewsPerType: v(() => s.previewsPerType),
      within: S,
      pinnable: v(() => s.pinnable === !0),
      isPinned: (C) => D.value.has(C.id),
      isPinnedId: (C) => D.value.has(C),
      togglePin: I,
      selectable: q,
      selection: oe,
      isSelected: (C) => E.value.has(C.id),
      toggleSelect: R,
      selectPage: J,
      clearSelection: te,
      narrowsOnPress: v(() => s.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (C) => {
        if (s.rowPress === "narrow" && aa(s.schema, C)) {
          X(C, null);
          return;
        }
        a("activate", C);
      },
      create: (C) => a("create", C),
      duplicate: () => a("duplicate", oe.value),
      delete: () => a("delete", oe.value),
      drill: X
    }), $e = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    });
    return t({
      query: b.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: B
    }), (C, x) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Re($e.value)
    }, [
      y("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        me(ua, {
          ref_key: "headerRef",
          ref: F,
          expanded: r.value,
          "panel-id": P($),
          views: e.views,
          onToggle: x[0] || (x[0] = (L) => r.value = !r.value)
        }, en({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Ne(() => [
              ge(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views"]),
        r.value ? (f(), h(G, { key: 0 }, [
          y("div", {
            class: "dc-shell__scrim",
            onClick: B
          }),
          y("div", kc, [
            me(fa, {
              "panel-id": P($),
              onClose: B
            }, en({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: Ne(() => [
                  ge(C.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : T("", !0)
      ], 8, wc),
      me(pa),
      ge(C.$slots, "results", {
        rows: P(pe).rows.value,
        total: P(pe).total.value,
        offset: P(pe).offset.value,
        pageCount: P(pe).pageCount.value,
        query: P(pe).query.value,
        pending: P(pe).pending.value
      }, () => [
        me(ka, { views: e.views }, en({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: Ne(() => [
              ge(C.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Ne(() => [
              ge(C.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, yc));
  }
}), $c = /* @__PURE__ */ de(bc, [["__scopeId", "data-v-3a5bd8fe"]]), xc = ["data-dc-muted"], Cc = {
  key: 0,
  class: "dc-shell-card__head"
}, Mc = { class: "dc-shell-card__title" }, Sc = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, Ec = {
  key: 0,
  class: "dc-shell-card__aside"
}, Pc = ["data-dc-flush"], Ac = {
  key: 2,
  class: "dc-shell-card__foot"
}, zc = /* @__PURE__ */ ue({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), s = Ot();
    function a(d) {
      return r(d?.() ?? []);
    }
    function r(d) {
      return d.some((_) => _.type === ar ? !1 : _.type === rr ? String(_.children ?? "").trim().length > 0 : _.type === G ? r(_.children ?? []) : !0);
    }
    const l = v(() => !!t.title || o.value || a(s.head)), o = v(() => a(s.aside)), i = v(() => a(s.default)), u = v(() => a(s.foot));
    return (d, _) => (f(), h("section", {
      class: "dc-shell-card",
      style: Re(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      l.value ? (f(), h("header", Cc, [
        ge(d.$slots, "head", {}, () => [
          y("h2", Mc, z(e.title), 1),
          e.count !== void 0 ? (f(), h("span", Sc, z(e.count), 1)) : T("", !0)
        ], !0),
        o.value ? (f(), h("span", Ec, [
          ge(d.$slots, "aside", {}, void 0, !0)
        ])) : T("", !0)
      ])) : T("", !0),
      i.value ? (f(), h("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        ge(d.$slots, "default", {}, void 0, !0)
      ], 8, Pc)) : T("", !0),
      u.value ? (f(), h("footer", Ac, [
        ge(d.$slots, "foot", {}, void 0, !0)
      ])) : T("", !0)
    ], 12, xc));
  }
}), bd = /* @__PURE__ */ de(zc, [["__scopeId", "data-v-75f2ef0b"]]), Rc = ["aria-label"], Tc = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], Lc = /* @__PURE__ */ ue({
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
    function r(l, o) {
      const i = n.options.length;
      let u = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? u = (o + 1) % i : l.key === "ArrowLeft" || l.key === "ArrowUp" ? u = (o - 1 + i) % i : l.key === "Home" ? u = 0 : l.key === "End" && (u = i - 1), u === null) return;
      l.preventDefault();
      const d = n.options[u];
      d && (s("update:modelValue", d.key), a.value[u]?.focus());
    }
    return (l, o) => (f(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), h(G, null, le(e.options, (i, u) => (f(), h("button", {
        key: i.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: a,
        type: "button",
        role: "radio",
        class: on(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": i.key === e.modelValue,
        "data-dc-active": i.key === e.modelValue ? "true" : "false",
        tabindex: i.key === e.modelValue ? 0 : -1,
        onClick: (d) => s("update:modelValue", i.key),
        onKeydown: (d) => r(d, u)
      }, z(i.label), 43, Tc))), 128))
    ], 8, Rc));
  }
}), Fc = /* @__PURE__ */ de(Lc, [["__scopeId", "data-v-63fb5482"]]), zt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Dc = ["aria-label"], Nc = ["role", "aria-label"], Ic = ["data-dc-item"], Oc = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Bc = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Kc = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Vc = { class: "dc-menu__label dc-truncate" }, qc = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Wc = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Uc = /* @__PURE__ */ ue({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = U(null), l = U([]), o = U(null), i = U(null), u = U(null), d = U(!1), _ = v(
      () => s.items.flatMap((E, R) => zt(E) ? [R] : [])
    ), k = v(() => {
      const E = [{ entries: [] }];
      return s.items.forEach((R, J) => {
        R.heading ? E.push({ heading: R, entries: [] }) : E[E.length - 1]?.entries.push({ item: R, index: J });
      }), E.filter((R) => R.entries.length > 0);
    }), w = U({ x: s.at.x, y: s.at.y });
    async function b() {
      w.value = { x: s.at.x, y: s.at.y }, await Dt();
      const E = r.value?.getBoundingClientRect();
      if (!E) return;
      const R = 8;
      let J = s.at.x, te = s.at.y;
      if (J + E.width > window.innerWidth - R) {
        const oe = s.at.mirrorX === void 0 ? null : s.at.mirrorX - E.width;
        J = oe !== null && oe >= R ? oe : window.innerWidth - E.width - R;
      }
      te + E.height > window.innerHeight - R && (te = window.innerHeight - E.height - R), w.value = { x: Math.max(R, J), y: Math.max(R, te) };
    }
    const S = v(() => ({ left: `${w.value.x}px`, top: `${w.value.y}px` }));
    function g(E) {
      o.value = E, E !== null && Dt(() => l.value[E]?.focus());
    }
    function $(E, R) {
      const J = _.value;
      if (J.length === 0) return null;
      if (E === null) return R === 1 ? J[0] ?? null : J[J.length - 1] ?? null;
      const te = J.indexOf(E);
      return te === -1 ? J[0] ?? null : J[(te + R + J.length) % J.length] ?? null;
    }
    function F(E, R) {
      if (!s.items[E]?.items?.length) return;
      const te = l.value[E]?.getBoundingClientRect(), oe = r.value?.getBoundingClientRect();
      !te || !oe || (u.value = { x: oe.right - 4, y: te.top - 4, mirrorX: oe.left + 4 }, i.value = E, d.value = R);
    }
    function B(E) {
      const R = i.value;
      i.value = null, u.value = null, E && R !== null && g(R);
    }
    function D(E) {
      const R = s.items[E];
      if (!(!R || !zt(R))) {
        if (R.items?.length) {
          F(E, !0);
          return;
        }
        a("choose", R);
      }
    }
    function I(E) {
      const R = E.key;
      if (R === "Escape") {
        E.preventDefault(), E.stopPropagation(), i.value !== null ? B(!0) : a("dismiss");
        return;
      }
      if (R === "ArrowDown" || R === "ArrowUp") {
        E.preventDefault(), E.stopPropagation(), B(!1), g($(o.value, R === "ArrowDown" ? 1 : -1));
        return;
      }
      if (R === "Home" || R === "End") {
        E.preventDefault(), E.stopPropagation(), B(!1), g($(null, R === "Home" ? 1 : -1));
        return;
      }
      if (R === "ArrowRight") {
        const J = o.value;
        J !== null && s.items[J]?.items?.length && (E.preventDefault(), E.stopPropagation(), F(J, !0));
        return;
      }
      if (R === "ArrowLeft") {
        i.value !== null && (E.preventDefault(), E.stopPropagation(), B(!0));
        return;
      }
      if (R === "Enter" || R === " ") {
        const J = o.value;
        if (J === null) return;
        E.preventDefault(), E.stopPropagation(), D(J);
      }
    }
    function q(E) {
      const R = s.items[E];
      !R || !zt(R) || (i.value !== null && i.value !== E && B(!1), g(E), R.items?.length && F(E, !1));
    }
    return lr(() => {
      b(), s.autofocus && g($(null, 1));
    }), we(() => s.at, b, { deep: !0 }), we(() => s.items, () => void b(), { deep: !0 }), je(() => {
      i.value = null;
    }), t({ root: r }), (E, R) => {
      const J = Bs("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Re(S.value),
        onKeydown: I
      }, [
        (f(!0), h(G, null, le(k.value, (te, oe) => (f(), h("div", {
          key: `${oe}-${te.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: te.heading ? "group" : "none",
          "aria-label": te.heading?.label
        }, [
          te.heading ? (f(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": te.heading.id
          }, z(te.heading.label), 9, Ic)) : T("", !0),
          (f(!0), h(G, null, le(te.entries, ({ item: X, index: pe }) => (f(), h(G, {
            key: X.id ?? `${pe}-${X.label ?? ""}`
          }, [
            X.separator ? (f(), h("div", Oc)) : (f(), h("button", {
              key: 1,
              ref_for: !0,
              ref: ($e) => {
                $e && (l.value[pe] = $e);
              },
              type: "button",
              class: "dc-menu__item",
              role: X.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": X.checked === void 0 ? void 0 : X.checked,
              "aria-haspopup": X.items?.length ? "menu" : void 0,
              "aria-expanded": X.items?.length ? i.value === pe : void 0,
              "aria-disabled": X.disabled ? "true" : void 0,
              disabled: X.disabled,
              "data-dc-item": X.id,
              tabindex: "-1",
              onClick: ($e) => D(pe),
              onMouseenter: ($e) => q(pe)
            }, [
              y("span", Kc, z(X.checked ? "✓" : ""), 1),
              y("span", Vc, z(X.label), 1),
              X.shortcut ? (f(), h("span", qc, z(X.shortcut), 1)) : X.items?.length ? (f(), h("span", Wc, "›")) : T("", !0)
            ], 40, Bc))
          ], 64))), 128))
        ], 8, Nc))), 128)),
        i.value !== null && u.value ? (f(), se(J, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: u.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: R[0] || (R[0] = (te) => a("choose", te)),
          onDismiss: R[1] || (R[1] = (te) => B(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
      ], 44, Dc);
    };
  }
}), ba = /* @__PURE__ */ de(Uc, [["__scopeId", "data-v-9b1413fa"]]), Hc = ["data-dc-theme", "aria-label"], jc = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], Xc = /* @__PURE__ */ ue({
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
    }), a = t, r = U(null), l = U([]), o = U(null), i = U(null), u = U(!1), d = v(
      () => n.menus.flatMap((D, I) => zt(D) ? [I] : [])
    );
    function _(D, I) {
      const q = l.value[D]?.getBoundingClientRect(), E = n.menus[D];
      !q || !E || !zt(E) || (i.value = { x: q.left, y: q.bottom + 2, mirrorX: q.right }, o.value = D, u.value = I);
    }
    function k(D) {
      const I = o.value;
      o.value = null, i.value = null, D && I !== null && l.value[I]?.focus();
    }
    function w(D) {
      o.value === D ? k(!0) : _(D, !1);
    }
    function b(D) {
      o.value === null || o.value === D || _(D, !1);
    }
    function S(D, I) {
      const q = d.value;
      if (q.length === 0) return null;
      if (D === null) return I === 1 ? q[0] ?? null : q[q.length - 1] ?? null;
      const E = q.indexOf(D);
      return E === -1 ? q[0] ?? null : q[(E + I + q.length) % q.length] ?? null;
    }
    function g(D) {
      const I = D.key;
      if (I === "Escape") {
        if (o.value === null) return;
        D.preventDefault(), k(!0);
        return;
      }
      if (I === "ArrowDown" && o.value === null) {
        const R = $();
        if (R === null) return;
        D.preventDefault(), _(R, !0);
        return;
      }
      if (I !== "ArrowLeft" && I !== "ArrowRight") return;
      const q = o.value ?? $(), E = S(q, I === "ArrowRight" ? 1 : -1);
      E !== null && (D.preventDefault(), o.value !== null ? _(E, !0) : l.value[E]?.focus());
    }
    function $() {
      const D = l.value.findIndex((I) => I === document.activeElement);
      return D === -1 ? d.value[0] ?? null : D;
    }
    function F(D) {
      const I = D.target;
      !I || r.value?.contains(I) || k(!1);
    }
    we(o, (D) => {
      D !== null ? window.addEventListener("pointerdown", F, !0) : window.removeEventListener("pointerdown", F, !0);
    }), je(() => window.removeEventListener("pointerdown", F, !0));
    function B(D) {
      k(!0), D.action?.(), a("choose", D);
    }
    return (D, I) => (f(), h("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Re(s.value),
      onKeydown: g
    }, [
      (f(!0), h(G, null, le(e.menus, (q, E) => (f(), h("button", {
        key: q.id ?? q.label ?? E,
        ref_for: !0,
        ref: (R) => {
          R && (l.value[E] = R);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === E,
        "aria-disabled": q.disabled ? "true" : void 0,
        disabled: q.disabled,
        "data-dc-menu": q.id ?? q.label,
        tabindex: E === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (R) => w(E),
        onMouseenter: (R) => b(E)
      }, z(q.label), 41, jc))), 128)),
      o.value !== null && i.value ? (f(), se(ba, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: u.value,
        onChoose: B,
        onDismiss: I[0] || (I[0] = (q) => k(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 44, Hc));
  }
}), $d = /* @__PURE__ */ de(Xc, [["__scopeId", "data-v-93dbd2e4"]]), Gc = ["aria-label", "aria-expanded", "disabled"], Yc = { "aria-hidden": "true" }, Qc = /* @__PURE__ */ ue({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, s = U(null), a = U(null), r = U(null), l = U(!1), o = v(() => r.value !== null);
    function i(b) {
      const S = s.value?.getBoundingClientRect();
      S && (r.value = { x: S.left, y: S.bottom + 4, mirrorX: S.right }, l.value = b);
    }
    function u(b) {
      r.value = null, b && s.value?.focus();
    }
    function d() {
      o.value ? u(!0) : i(!1);
    }
    function _(b) {
      b.key !== "ArrowDown" || o.value || (b.preventDefault(), i(!0));
    }
    function k(b) {
      const S = b.target;
      S && (s.value?.contains(S) || a.value?.root?.contains(S) || u(!1));
    }
    we(o, (b) => {
      b ? window.addEventListener("pointerdown", k, !0) : window.removeEventListener("pointerdown", k, !0);
    }), je(() => window.removeEventListener("pointerdown", k, !0));
    function w(b) {
      u(!0), b.action?.(), n("choose", b);
    }
    return (b, S) => (f(), h(G, null, [
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
        y("span", Yc, z(e.glyph), 1)
      ], 40, Gc),
      r.value ? (f(), se(ba, {
        key: 0,
        ref_key: "menu",
        ref: a,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: l.value,
        onChoose: w,
        onDismiss: S[0] || (S[0] = (g) => u(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : T("", !0)
    ], 64));
  }
}), Yn = /* @__PURE__ */ de(Qc, [["__scopeId", "data-v-48f5ada5"]]), $t = (e) => e.kind === "split", H = (e) => e.kind === "group", Z = (e) => e.kind === "float", it = { x: 16, y: 16, w: 360, h: 260 }, dn = 28, $a = 120, An = 220, xa = 38, pt = 6;
function Ut(e, t) {
  let n = !1;
  const s = e.frames.map((a, r) => {
    const l = t(a.node, r);
    return l === a.node ? a : (n = !0, { ...a, node: l });
  });
  return n ? { ...e, frames: s } : e;
}
function Oe(e) {
  return { kind: "group", panels: [e] };
}
function xd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const fe = (e) => typeof e == "string", Qn = (e) => fe(e) ? Oe(e) : e, Ht = (e) => fe(e) ? [e] : Xe(e), Es = (e) => e.panels.filter(fe), Zc = (e) => e.panels.filter((t) => !fe(t)), Ae = (e, t) => e.panels.includes(t);
function jt(e, t, n) {
  let s = !1;
  const a = e.panels.map((r) => {
    if (fe(r) || !ae(r, t)) return r;
    const l = n(r);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, panels: a } : e;
}
function pn(e, t) {
  return { node: e, rect: { ...it, ...t } };
}
function Zn(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Jn(e, t) {
  const n = { ...it, ...t };
  return Zn(
    e.map(
      (s, a) => pn(s, {
        ...n,
        x: n.x + a * dn,
        y: n.y + a * dn
      })
    )
  );
}
function es(e, t, n, s) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...s ? { title: s } : {}
  };
}
const ts = (e, t, n) => es("row", e, t, n), Cd = (e, t, n) => es("column", e, t, n);
function _e(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const dt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Md = (e) => ({ ...e, headless: !0 }), Sd = (e) => ({ ...e, fixedView: !0 }), Jc = (e) => e === "left" || e === "right" ? "row" : "column";
function Xe(e) {
  return H(e) ? e.panels.flatMap(Ht) : Z(e) ? e.frames.flatMap((t) => Xe(t.node)) : e.children.flatMap(Xe);
}
function ae(e, t) {
  return H(e) ? e.panels.some((n) => fe(n) ? n === t : ae(n, t)) : Z(e) ? e.frames.some((n) => ae(n.node, t)) : e.children.some((n) => ae(n, t));
}
const Ca = (e) => Xe(e).length === 0, zn = (e) => !H(e) && dt(e), Rn = (e) => Ca(e) && !zn(e);
function vn(e) {
  return $t(e) ? e.children.map((t, n) => ({ node: t, index: n })) : Z(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => fe(t) ? [] : [{ node: t, index: n }]);
}
const ns = (e) => vn(e).map((t) => t.node);
function ft(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (s) => fe(s) ? s === t : ae(s, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Ma(e) {
  const t = e.panels[ft(e)];
  return t !== void 0 && fe(t) ? t : "";
}
function Me(e) {
  if (fe(e)) return e;
  if (H(e)) {
    const n = e.panels[ft(e)];
    return n === void 0 ? "" : Me(n);
  }
  if (Z(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Me(n.node) : "";
  }
  const t = e.children[0];
  return t ? Me(t) : "";
}
function ht(e, t) {
  if (H(e) && Ae(e, t)) return e;
  for (const n of ns(e)) {
    const s = ht(n, t);
    if (s) return s;
  }
  return null;
}
function eu(e) {
  const t = ns(e).flatMap(eu);
  return H(e) ? [e, ...t] : t;
}
function be(e, t) {
  if (H(e)) {
    for (const n of Zc(e)) {
      const s = be(n, t);
      if (s) return s;
    }
    return null;
  }
  if (Z(e)) {
    for (const n of e.frames)
      if (ae(n.node, t))
        return be(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const s = be(n, t);
    if (s) return s;
  }
  return null;
}
function kn(e, t, n = $a) {
  const s = (o, i) => i > 0 ? Math.max(Math.min(o, i), Math.min(n, i)) : Math.max(o, n), a = s(e.w, t.w), r = s(e.h, t.h), l = (o, i, u) => Math.min(Math.max(o, 0), Math.max(u - i, 0));
  return {
    x: Math.round(l(e.x, a, t.w)),
    y: Math.round(l(e.y, r, t.h)),
    w: Math.round(a),
    h: Math.round(r)
  };
}
function Ps(e, t, n, s, a = $a) {
  let { x: r, y: l, w: o, h: i } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, r = e.x + n), t.includes("s") && (i = e.h + s), t.includes("n") && (i = e.h - s, l = e.y + s), o < a && (t.includes("w") && (r = e.x + e.w - a), o = a), i < a && (t.includes("n") && (l = e.y + e.h - a), i = a), { x: r, y: l, w: o, h: i };
}
const Sa = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function mt(e, t, n) {
  if (H(e)) return jt(e, t, (r) => mt(r, t, n));
  if (Z(e)) {
    let r = !1;
    const l = e.frames.map((o) => {
      if (!ae(o.node, t)) return o;
      if (be(o.node, t)) {
        const u = mt(o.node, t, n);
        return u === o.node ? o : (r = !0, { ...o, node: u });
      }
      const i = n(o);
      return i === o ? o : (r = !0, i);
    });
    return r ? { ...e, frames: l } : e;
  }
  if (!ae(e, t)) return e;
  let s = !1;
  const a = e.children.map((r) => {
    const l = mt(r, t, n);
    return l !== r && (s = !0), l;
  });
  return s ? { ...e, children: a } : e;
}
function tu(e, t, n) {
  return mt(e, t, (s) => Sa(s.rect, n) ? s : { ...s, rect: n });
}
const et = (e) => e.maximized === !0, Ea = (e) => (t) => {
  if (et(t) === e) return t;
  if (e) {
    const { minimized: a, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...s } = t;
  return s;
};
function nu(e, t, n = !0) {
  return mt(e, t, Ea(n));
}
function Ed(e, t) {
  const n = be(e, t);
  return n ? nu(e, t, !et(n)) : e;
}
const ot = (e) => e.minimized === !0, Pa = (e) => (t) => {
  if (ot(t) === e) return t;
  if (e) {
    const { maximized: a, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...s } = t;
  return s;
};
function su(e, t, n = !0) {
  return mt(e, t, Pa(n));
}
function Pd(e, t) {
  const n = be(e, t);
  return n ? su(e, t, !ot(n)) : e;
}
function lt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const s = nt(e, t.slice(0, -1));
  return !s || !Z(s) ? null : s.frames[n] ?? null;
}
function Tn(e, t) {
  if (Z(e)) {
    for (const [n, s] of e.frames.entries()) {
      if (!ae(s.node, t)) continue;
      const a = Tn(s.node, t);
      return a ? [n, ...a] : [n];
    }
    return null;
  }
  for (const { node: n, index: s } of vn(e)) {
    if (!ae(n, t)) continue;
    const a = Tn(n, t);
    return a ? [s, ...a] : null;
  }
  return null;
}
function ss(e, t, n) {
  const s = t[t.length - 1];
  if (s === void 0) return e;
  const a = t.slice(0, -1), r = nt(e, a);
  if (!r || !Z(r)) return e;
  const l = r.frames[s];
  if (!l) return e;
  const o = n(l);
  if (o === l) return e;
  const i = [...r.frames];
  return i[s] = o, ut(e, a, { ...r, frames: i });
}
function As(e, t, n) {
  return ss(
    e,
    t,
    (s) => Sa(s.rect, n) ? s : { ...s, rect: n }
  );
}
function au(e, t, n = !0) {
  return ss(e, t, Ea(n));
}
function ru(e, t, n = !0) {
  return ss(e, t, Pa(n));
}
function Rt(e, t) {
  const [n, ...s] = t;
  if (n === void 0) return e;
  if (Z(e)) {
    const l = e.frames[n];
    if (!l) return e;
    const o = Rt(l.node, s), i = o === l.node ? l : { ...l, node: o };
    if (n === e.frames.length - 1 && i === l) return e;
    const u = [...e.frames];
    return u.splice(n, 1), u.push(i), { ...e, frames: u };
  }
  const a = nt(e, [n]);
  if (!a) return e;
  const r = Rt(a, s);
  return r === a ? e : ut(e, [n], r);
}
function lu(e, t) {
  const n = [...t];
  let s = e;
  return t.forEach((a, r) => {
    s && (Z(s) && (n[r] = s.frames.length - 1), s = nt(s, [a]));
  }), n;
}
function an(e, t, n, s) {
  if (H(e)) return jt(e, n, (l) => an(l, t, n, s));
  if (Z(e)) {
    const l = e.frames.findIndex((i) => ae(i.node, n)), o = e.frames[l];
    if (!o) return e;
    if (be(o.node, n)) {
      const i = an(o.node, t, n, s);
      if (i === o.node) return e;
      const u = [...e.frames];
      return u[l] = { ...o, node: i }, { ...e, frames: u };
    }
    return { ...e, frames: [...e.frames, pn(Oe(t), s)] };
  }
  if (!ae(e, n)) return e;
  let a = !1;
  const r = e.children.map((l) => {
    const o = an(l, t, n, s);
    return o !== l && (a = !0), o;
  });
  return a ? { ...e, children: r } : e;
}
function zs(e, t, n, s) {
  if (t === n || !ae(e, t) || !ae(e, n) || !be(e, n)) return e;
  const a = ct(e, t);
  if (!a) return e;
  const r = an(a, t, n, s);
  return r === a ? e : ye(r);
}
function ou(e, t, n) {
  return Z(e) ? { ...e, frames: [...e.frames, pn(Oe(t), n)] } : H(e) ? za(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Oe(t)],
    sizes: [...He(e), 1],
    ..._e(e)
  };
}
function Aa(e, t, n, s) {
  const a = n[0];
  if (a === void 0) return ou(e, t, s);
  const r = n.slice(1), l = (d, _) => _ === a ? Aa(d, t, r, s) : ct(d, t);
  if (Z(e)) {
    const d = e.frames.flatMap((_, k) => {
      const w = l(_.node, k);
      return w ? [w === _.node ? _ : { ..._, node: w }] : [];
    });
    return { ...e, frames: d };
  }
  if (H(e)) {
    const d = ft(e), _ = [];
    e.panels.forEach((b, S) => {
      if (fe(b)) {
        b !== t && _.push(b);
        return;
      }
      const g = l(b, S);
      g && _.push(g);
    });
    const w = e.active && _.some((b) => Ht(b).includes(e.active)) ? e.active : Me(_[d] ?? _[_.length - 1]);
    return {
      kind: "group",
      panels: _,
      ...w ? { active: w } : {},
      ..._e(e)
    };
  }
  const o = He(e), i = [], u = [];
  return e.children.forEach((d, _) => {
    const k = l(d, _);
    k && (i.push(k), u.push(o[_] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: u, ..._e(e) };
}
function Rs(e, t, n, s) {
  const a = nt(e, n);
  return !a || !Ca(a) || !ae(e, t) ? e : ye(Aa(e, t, n, s));
}
function bn(e, t) {
  if (H(e)) return jt(e, t, (a) => bn(a, t));
  if (Z(e)) {
    const a = e.frames.findIndex((u) => ae(u.node, t)), r = e.frames[a];
    if (!r) return e;
    const l = bn(r.node, t), o = l === r.node ? r : { ...r, node: l };
    if (a === e.frames.length - 1 && o === r) return e;
    const i = [...e.frames];
    return i.splice(a, 1), i.push(o), { ...e, frames: i };
  }
  if (!ae(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = bn(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function as(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const s = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), a = s.reduce((r, l) => r + l, 0);
  return a <= 0 ? n() : s.map((r) => r / a);
}
const He = (e) => as(e.children.length, e.sizes), Le = (e) => {
  const t = H(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function ye(e) {
  if (H(e)) return iu(e);
  if (Z(e)) {
    const o = e.frames.flatMap((i) => {
      const u = ye(i.node);
      return Rn(u) ? [] : [u === i.node ? i : { ...i, node: u }];
    });
    return o.length === e.frames.length && o.every((i, u) => i === e.frames[u]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = He(e), n = Le(e), s = [], a = [], r = [];
  e.children.forEach((o, i) => {
    const u = ye(o), d = t[i] ?? 0;
    if (Rn(u)) return;
    if (!n && $t(u) && u.direction === e.direction && !Le(u) && !dt(u)) {
      const k = He(u);
      u.children.forEach((w, b) => {
        s.push(w), a.push(d * (k[b] ?? 0));
      });
      return;
    }
    s.push(u), a.push(d);
    const _ = n?.[i];
    _ && r.push(_);
  });
  const l = s[0];
  return s.length === 1 && l && !dt(e) ? l : {
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: as(s.length, a),
    ..._e(e),
    ...r.length === s.length && r.length > 0 ? { places: r } : {}
  };
}
function iu(e) {
  if (e.panels.every(fe)) return e;
  const t = Me(e), n = Le(e), s = [], a = [];
  e.panels.forEach((o, i) => {
    const u = n?.[i];
    if (fe(o)) {
      s.push(o), u && a.push(u);
      return;
    }
    const d = ye(o);
    if (!Rn(d)) {
      if (H(d) && !dt(d) && !Le(d)) {
        s.push(...d.panels);
        return;
      }
      s.push(d), u && a.push(u);
    }
  });
  const r = s[0];
  if (s.length === 1 && r !== void 0 && !fe(r) && !dt(e))
    return r;
  if (s.length === e.panels.length && s.every((o, i) => o === e.panels[i]))
    return e;
  const l = t && s.some((o) => Ht(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: s,
    ...l ? { active: l } : {},
    ..._e(e),
    ...a.length === s.length && a.length > 0 ? { places: a } : {}
  };
}
function ct(e, t) {
  if (Z(e)) {
    const l = e.frames.flatMap((o) => {
      const i = ct(o.node, t);
      return i ? [i === o.node ? o : { ...o, node: i }] : [];
    });
    return l.length === 0 && !zn(e) ? null : { ...e, frames: l };
  }
  if (H(e)) {
    if (!ae(e, t)) return e;
    const l = ft(e), o = [];
    for (const d of e.panels) {
      if (fe(d)) {
        d !== t && o.push(d);
        continue;
      }
      const _ = ct(d, t);
      _ && o.push(_);
    }
    if (o.length === 0) return null;
    const u = e.active && o.some((d) => Ht(d).includes(e.active)) ? e.active : Me(o[l] ?? o[o.length - 1]);
    return u ? { kind: "group", panels: o, active: u, ..._e(e) } : { kind: "group", panels: o, ..._e(e) };
  }
  const n = He(e), s = [], a = [];
  if (e.children.forEach((l, o) => {
    const i = ct(l, t);
    i && (s.push(i), a.push(n[o] ?? 0));
  }), s.length === 0)
    return zn(e) ? { kind: "split", direction: e.direction, children: s, sizes: [], ..._e(e) } : null;
  const r = s[0];
  return s.length === 1 && r && !dt(e) ? r : ye({
    kind: "split",
    direction: e.direction,
    children: s,
    sizes: a,
    ..._e(e)
  });
}
function za(e, t, n) {
  const s = e.panels.filter((r) => r !== t), a = n === void 0 ? s.length : Math.max(0, Math.min(n, s.length));
  return s.splice(a, 0, t), { kind: "group", panels: s, active: t, ..._e(e) };
}
function Et(e, t, n, s, a) {
  const r = (w) => Ut(
    w,
    (b) => ae(b, n) ? Et(b, t, n, s, a) : b
  );
  if (s === "float") return e;
  const l = (w) => jt(w, n, (b) => Et(b, t, n, s, a));
  if (s === "center")
    return H(e) ? Ae(e, n) ? za(e, t, a) : l(e) : Z(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (w) => ae(w, n) ? Et(w, t, n, s, a) : w
      )
    };
  const o = Jc(s), i = s === "left" || s === "top", u = (w) => ({
    kind: "split",
    direction: o,
    children: i ? [Oe(t), w] : [w, Oe(t)],
    sizes: [0.5, 0.5]
  });
  if (H(e)) return Ae(e, n) ? u(e) : l(e);
  if (Z(e)) return r(e);
  const d = He(e), _ = e.children.findIndex(
    (w) => H(w) && Ae(w, n)
  );
  if (_ >= 0 && e.direction === o) {
    const w = (d[_] ?? 0) / 2, b = [...e.children], S = [...d];
    return b.splice(i ? _ : _ + 1, 0, Oe(t)), S.splice(_, 1, w, w), {
      kind: "split",
      direction: o,
      children: b,
      sizes: S,
      ..._e(e)
    };
  }
  const k = e.children.map((w) => ae(w, n) ? H(w) && Ae(w, n) ? u(w) : Et(w, t, n, s) : w);
  return {
    kind: "split",
    direction: e.direction,
    children: k,
    sizes: d,
    ..._e(e)
  };
}
function _t(e, t) {
  if (H(e)) {
    if (Ae(e, t))
      return Ma(e) === t ? e : { ...e, active: t };
    const a = e.panels.findIndex((i) => !fe(i) && ae(i, t)), r = e.panels[a];
    if (r === void 0 || fe(r)) return e;
    const l = _t(r, t);
    if (l === r && e.active === t) return e;
    const o = [...e.panels];
    return o[a] = l, { ...e, panels: o, active: t };
  }
  if (!ae(e, t)) return e;
  if (Z(e)) return Ut(e, (a) => _t(a, t));
  let n = !1;
  const s = e.children.map((a) => {
    const r = _t(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function Tt(e, t, n) {
  if (H(e)) {
    if (!Ae(e, t)) return jt(e, t, (u) => Tt(u, t, n));
    const s = e.panels.indexOf(t), a = Math.max(0, Math.min(n, e.panels.length - 1));
    if (s === a) return e;
    const r = [...e.panels];
    r.splice(s, 1), r.splice(a, 0, t);
    const l = Le(e), o = l ? [...l] : void 0;
    o && o.splice(a, 0, ...o.splice(s, 1));
    const i = Me(e);
    return {
      kind: "group",
      panels: r,
      ...i ? { active: i } : {},
      ..._e(e),
      ...o ? { places: o } : {}
    };
  }
  return ae(e, t) ? Z(e) ? Ut(e, (s) => Tt(s, t, n)) : { ...e, children: e.children.map((s) => Tt(s, t, n)) } : e;
}
function rn(e, t, n) {
  if (t === n) return e;
  if (H(e)) {
    if (!ae(e, t) && !ae(e, n)) return e;
    const s = (r) => r === t ? n : r === n ? t : r, a = e.panels.map((r) => fe(r) ? s(r) : rn(r, t, n));
    return { ...e, panels: a, ...e.active ? { active: s(e.active) } : {} };
  }
  return Z(e) ? Ut(e, (s) => rn(s, t, n)) : { ...e, children: e.children.map((s) => rn(s, t, n)) };
}
function Zt(e, t, n, s, a) {
  if (s === "float" || !ae(e, t) || !ae(e, n)) return e;
  const r = ht(e, t);
  if (s === "center" && r && Ae(r, n)) {
    if (a === void 0) return e;
    const o = r.panels.indexOf(t), i = a > o ? a - 1 : a;
    return i === o ? e : _t(Tt(e, t, i), t);
  }
  if (t === n) return e;
  const l = ct(e, t);
  return l ? ye(Et(l, t, n, s, a)) : e;
}
function Ra(e, t, n) {
  if (H(e)) {
    const a = e.panels[t];
    if (a === void 0 || fe(a)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (Z(e)) {
    const a = e.frames[t];
    if (!a) return e;
    const r = [...e.frames];
    return r[t] = { ...a, node: n }, { ...e, frames: r };
  }
  const s = [...e.children];
  return s[t] = n, { ...e, children: s };
}
function Xt(e, t, n) {
  const s = vn(e);
  if (!H(e) && s.some(({ node: a }) => H(a) && Ae(a, t))) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of s) {
    if (!ae(a, t)) continue;
    const l = Xt(a, t, n);
    return l ? Ra(e, r, l) : null;
  }
  return null;
}
function Ad(e, t, n) {
  const s = Xt(
    e,
    t,
    (a) => $t(a) && a.direction !== n ? { ...a, direction: n } : a
  );
  return s ? ye(s) : e;
}
function Ta(e) {
  return Z(e) ? [e] : Le(e) || dt(e) ? [e] : H(e) ? [...e.panels] : e.children.flatMap(Ta);
}
function La(e, t) {
  if (H(e)) return e;
  const n = ns(e).map(Ta), s = n.flat(), a = t && s.some((l) => Ht(l).includes(t)) ? t : void 0, r = cu(e, n);
  return ye({
    kind: "group",
    panels: s,
    ...a ? { active: a } : {},
    ..._e(e),
    ...r ? { places: r } : {}
  });
}
function cu(e, t) {
  const n = Z(e) ? e.frames.map(({ node: s, ...a }) => a) : Le(e);
  if (n)
    return t.every((s) => s.length === 1) ? n : void 0;
}
function uu(e, t) {
  const n = Xt(e, t, (s) => La(s, t));
  return n ? ye(n) : e;
}
function rs(e, t, n) {
  if (H(e) && Ae(e, t)) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: a } of vn(e)) {
    if (!ae(s, t)) continue;
    const r = rs(s, t, n);
    return r ? Ra(e, a, r) : null;
  }
  return null;
}
function Ts(e, t, n) {
  const s = rs(e, t, (a) => {
    if (a.panels.length < 2) return a;
    const r = Le(a);
    return {
      ...es(n, a.panels.map(Qn)),
      ..._e(a),
      ...r ? { places: r } : {}
    };
  });
  return s ? ye(s) : e;
}
function Ln(e, t) {
  if (H(e)) return e;
  if (Z(e)) {
    const a = e.frames.findIndex(
      (o) => H(o.node) && o.node.panels.includes(t)
    ), r = e.frames[a], l = r && H(r.node) ? r.node : null;
    if (r && l && l.panels.length > 1) {
      const o = Jn(l.panels.map(Qn), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, a), ...o, ...e.frames.slice(a + 1)]
      };
    }
    return Ut(e, (o) => Ln(o, t));
  }
  if (!ae(e, t)) return e;
  let n = !1;
  const s = e.children.map((a) => {
    const r = Ln(a, t);
    return r !== a && (n = !0), r;
  });
  return n ? { ...e, children: s } : e;
}
function du(e, t, n) {
  const s = ht(e, t);
  if (!s || s.panels.length < 2) return e;
  if (be(e, t)?.node === s) {
    const l = Ln(e, t);
    return l === e ? e : ye(l);
  }
  const r = rs(e, t, (l) => ({
    ...Zn(Fa(l.panels.map(Qn), Le(l), n)),
    ..._e(l)
  }));
  return r ? ye(r) : e;
}
function Fa(e, t, n) {
  return t ? e.map((s, a) => ({ ...t[a], node: s })) : Jn(e, n).frames;
}
function Da(e, t) {
  return { ...Zn(Fa(e.children, Le(e), t)), ..._e(e) };
}
function zd(e, t, n) {
  const s = Xt(
    e,
    t,
    (a) => Z(a) ? a : Da(a, n)
  );
  return s ? ye(s) : H(e) && Ae(e, t) ? Jn([e], n) : e;
}
function fu(e, t) {
  const n = (a) => t === "column" ? a.rect.y : a.rect.x, s = (a) => t === "column" ? a.rect.x : a.rect.y;
  return [...e].sort((a, r) => n(a) - n(r) || s(a) - s(r));
}
function Na(e, t) {
  const n = fu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((s) => s.node),
    ..._e(e),
    places: n.map(({ node: s, ...a }) => a)
  };
}
function Rd(e, t, n = "row") {
  const s = Xt(
    e,
    t,
    (a) => Z(a) ? Na(a, n) : a
  );
  return s ? ye(s) : e;
}
function Ia(e) {
  if (Z(e)) return null;
  const t = H(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || fe(t) || H(t) && t.panels.length === 1 && fe(t.panels[0]) ? null : t;
}
const pu = (e) => {
  const { title: t, fixedView: n, headless: s, ...a } = e;
  return a;
};
function vu(e, t) {
  const n = Ia(e);
  return n ? t === "inner" ? n : { ...pu(n), ..._e(e) } : e;
}
function wt(e) {
  return e.title ? e.title : H(e) ? "" : Z(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Lt(e, t) {
  if (H(e)) {
    const s = e.panels[ft(e)];
    return s === void 0 ? "" : fe(s) ? t(s) ?? s : wt(s) || Lt(s, t);
  }
  if (e.title) return e.title;
  if (Z(e)) {
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
    if ($t(n)) n = n.children[s];
    else if (Z(n)) n = n.frames[s]?.node;
    else {
      const a = n.panels[s];
      n = a === void 0 || fe(a) ? void 0 : a;
    }
  }
  return n ?? null;
}
function ut(e, t, n) {
  if (t.length === 0) return n;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (Z(e)) {
    const i = e.frames[s];
    if (!i) return e;
    const u = ut(i.node, a, n);
    if (u === i.node) return e;
    const d = [...e.frames];
    return d[s] = { ...i, node: u }, { ...e, frames: d };
  }
  if (H(e)) {
    const i = e.panels[s];
    if (i === void 0 || fe(i)) return e;
    const u = ut(i, a, n);
    if (u === i) return e;
    const d = [...e.panels];
    return d[s] = u, { ...e, panels: d };
  }
  const r = e.children[s];
  if (!r) return e;
  const l = ut(r, a, n);
  if (l === r) return e;
  const o = [...e.children];
  return o[s] = l, { ...e, children: o };
}
function ln(e, t, n) {
  if (t.length === 0)
    return $t(e) ? { ...e, sizes: as(e.children.length, n) } : e;
  const [s, ...a] = t;
  if (s === void 0) return e;
  if (Z(e)) {
    const o = e.frames[s];
    if (!o) return e;
    const i = ln(o.node, a, n);
    if (i === o.node) return e;
    const u = [...e.frames];
    return u[s] = { ...o, node: i }, { ...e, frames: u };
  }
  if (H(e)) {
    const o = e.panels[s];
    if (o === void 0 || fe(o)) return e;
    const i = ln(o, a, n);
    if (i === o) return e;
    const u = [...e.panels];
    return u[s] = i, { ...e, panels: u };
  }
  const r = e.children[s];
  if (!r) return e;
  const l = [...e.children];
  return l[s] = ln(r, a, n), { ...e, children: l };
}
function Ls(e, t, n, s = 0.02) {
  const a = e[t], r = e[t + 1];
  if (a === void 0 || r === void 0) return e;
  const l = a + r;
  if (l < s * 2) return e;
  const o = [...e], i = Math.min(Math.max(a + n, s), l - s);
  return o[t] = i, o[t + 1] = l - i, o;
}
function fn(e) {
  if (!H(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !fe(t) ? e : { ...ts([hu(e)]), ..._e(e) };
}
const hu = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Fs(e) {
  return e.length === 0 ? null : ts(e.map(Oe));
}
function mu(e, t) {
  if (!e) return Fs(t);
  const n = new Set(t), s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (const i of Xe(e))
    !n.has(i) || s.has(i) ? a.add(i) : s.add(i);
  let r = e;
  for (const i of a)
    r = r ? ct(r, i) : null;
  const l = new Set(r ? Xe(r) : []), o = t.filter((i) => !l.has(i));
  if (o.length === 0) return r ? fn(ye(r)) : null;
  if (!r) return Fs(o);
  if (Z(r)) {
    const i = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...o.map(
          (u, d) => pn(Oe(u), {
            x: it.x + (i + d) * dn,
            y: it.y + (i + d) * dn
          })
        )
      ]
    };
  }
  return fn(ye(ts([r, ...o.map(Oe)])));
}
const ls = Symbol("dc.windowContext");
function _u(e) {
  return Fn(ls, e), e;
}
function os() {
  const e = yt(ls, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const gu = ["data-dc-glyph"], yu = { class: "dc-glyph__line" }, wu = ["d"], ku = {
  key: 0,
  class: "dc-glyph__aqua"
}, bu = ["d"], $u = /* @__PURE__ */ ue({
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
    return (s, a) => (f(), h("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      y("g", yu, [
        (f(!0), h(G, null, le(t[e.kind], (r) => (f(), h("path", {
          key: r,
          d: r
        }, null, 8, wu))), 128))
      ]),
      n[e.kind] ? (f(), h("g", ku, [
        (f(!0), h(G, null, le(n[e.kind], (r) => (f(), h("path", {
          key: r,
          d: r
        }, null, 8, bu))), 128))
      ])) : T("", !0)
    ], 8, gu));
  }
}), gt = /* @__PURE__ */ de($u, [["__scopeId", "data-v-4d2872c0"]]), xu = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Cu = ["data-dc-movable"], Mu = { class: "dc-float__title dc-truncate" }, Su = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Eu = ["aria-label", "aria-pressed", "data-dc-minimize"], Pu = ["aria-label", "aria-pressed", "data-dc-maximize"], Au = ["aria-label", "data-dc-close"], zu = { class: "dc-float__content" }, Ru = ["data-dc-handle", "onPointerdown"], Tu = /* @__PURE__ */ ue({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = os(), s = v(() => Me(t.frame.node)), a = v(() => n.panelFor(s.value)?.fixed === !0), r = v(() => et(t.frame)), l = v(() => ot(t.frame)), o = v(() => r.value || l.value), i = v(() => n.resizable.value && !a.value && !o.value), u = v(() => n.movable.value && !a.value && !o.value), d = v(() => {
      const I = Xe(t.frame.node);
      return I.length === 1 ? I[0] ?? null : null;
    }), _ = v(() => d.value !== null && n.closable(d.value)), k = v(() => t.frame.node.headless === !0), w = v(
      () => !k.value && (!H(t.frame.node) || l.value)
    ), b = v(
      () => t.frame.title || wt(t.frame.node) || Lt(t.frame.node, (I) => n.panelFor(I)?.title)
    ), S = v(() => n.spaceMenu(t.path));
    function g(I) {
      I.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, I, "move");
    }
    function $(I) {
      I.target?.closest("button, a, input, select, textarea, label") || (l.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const F = v(() => {
      const I = n.framing.value;
      return I !== null && ae(t.frame.node, I);
    }), B = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : l.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${An}px`,
        height: `${xa}px`
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
    return (I, q) => (f(), h("div", {
      class: "dc-float",
      style: Re(B.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": l.value ? "true" : "false",
      "data-dc-dragging": F.value ? "true" : "false",
      onPointerdown: q[3] || (q[3] = (E) => P(n).raiseAt(e.path))
    }, [
      w.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": u.value ? "true" : "false",
        onPointerdown: g,
        onDblclick: $
      }, [
        y("span", Mu, z(b.value), 1),
        S.value.length ? (f(), se(Yn, {
          key: 0,
          items: S.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : T("", !0),
        !a.value || l.value && _.value && d.value ? (f(), h("div", Su, [
          a.value ? T("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": l.value,
            "data-dc-minimize": s.value,
            onClick: q[0] || (q[0] = (E) => P(n).toggleMinimizeAt(e.path))
          }, [
            me(gt, {
              kind: l.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Eu)),
          a.value ? T("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": s.value,
            onClick: q[1] || (q[1] = (E) => P(n).toggleMaximizeAt(e.path))
          }, [
            me(gt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Pu)),
          l.value && _.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${b.value}`,
            "data-dc-close": d.value,
            onClick: q[2] || (q[2] = (E) => P(n).close(d.value))
          }, [
            me(gt, { kind: "close" })
          ], 8, Au)) : T("", !0)
        ])) : T("", !0)
      ], 40, Cu)) : T("", !0),
      y("div", zu, [
        ge(I.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(G, null, le(i.value ? D : [], (E) => (f(), h("span", {
        key: E,
        class: "dc-float__grip",
        "data-dc-handle": E,
        "aria-hidden": "true",
        onPointerdown: De((R) => P(n).beginFrameDragAt(e.path, R, E), ["stop"])
      }, null, 40, Ru))), 128))
    ], 44, xu));
  }
}), Lu = /* @__PURE__ */ de(Tu, [["__scopeId", "data-v-f035684c"]]), is = Symbol("dc.paneContext");
function Fu(e) {
  return Fn(is, e), e;
}
function Td() {
  return yt(is, null);
}
function Ld(e) {
  const t = yt(ls, null), n = yt(is, null);
  if (!t || !n) return () => {
  };
  const s = t.registerMenu(
    () => n.panel.value,
    () => St(e)
  );
  return or() && Ns(s), s;
}
const Du = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Nu = ["data-dc-movable"], Iu = ["aria-label", "aria-pressed"], Ou = ["data-dc-space-name"], Bu = { class: "dc-truncate" }, Ku = ["aria-label"], Vu = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, qu = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], Wu = { class: "dc-tab__name dc-truncate" }, Uu = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Hu = ["aria-label", "data-dc-close", "onClick"], ju = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Xu = { class: "dc-pane__tools" }, Gu = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Yu = ["aria-label", "data-dc-minimize"], Qu = ["aria-label", "aria-pressed", "data-dc-maximize"], Zu = ["aria-label", "data-dc-close"], Ju = ["id", "role", "aria-labelledby"], ed = ["id", "role", "aria-labelledby"], td = ["data-dc-edge"], nd = /* @__PURE__ */ ue({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = os(), s = Os() ?? "dc-pane", a = v(
      () => t.group.panels.flatMap((K, W) => {
        if (!fe(K)) {
          const Se = wt(K) || Lt(K, (xe) => n.panelFor(xe)?.title);
          return [{ kind: "space", index: W, id: `space-${W}`, title: Se, node: K }];
        }
        const ee = n.panelFor(K);
        return ee ? [{ kind: "panel", index: W, id: K, title: ee.title, panel: ee }] : [];
      })
    ), r = v(() => a.value.length > 1), l = v(() => {
      const K = ft(t.group);
      return a.value.find((W) => W.index === K) ?? a.value[0] ?? null;
    }), o = v(() => l.value?.kind === "space" ? l.value.node : null), i = v(() => o.value ? "" : Ma(t.group)), u = v(() => o.value ? null : n.panelFor(i.value)), d = v(() => l.value?.title ?? ""), _ = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), k = v(() => [...t.path, l.value?.index ?? 0]), w = v(() => i.value || Es(t.group)[0] || ""), b = v(() => n.viewFor(i.value)), S = v(() => t.group.headless === !0), g = v(() => n.focused.value === i.value), $ = v(() => n.dragging.value === i.value), F = v(() => n.moving.value === i.value), B = v(() => n.frameOf(w.value) !== null), D = v(() => n.panelFor(w.value)?.fixed === !0), I = v(
      () => !o.value && (n.canMove(i.value) || B.value && n.movable.value && !D.value)
    ), q = v(
      () => o.value ? n.spaceMenu(k.value) : n.menuFor(i.value)
    ), E = (K) => n.closable(K);
    Fu({ panel: i });
    const R = v(() => n.maximized(w.value)), J = v(
      () => B.value && !D.value || !r.value && !!u.value && E(u.value.id)
    ), te = (K) => `${s}-tab-${K}`, oe = v(() => `${s}-body`), X = v(() => {
      const K = n.dropTarget.value;
      return !K || !Ae(t.group, K.panel) || K.edge === "float" ? null : K;
    }), pe = v(() => X.value?.index === void 0 ? X.value?.edge ?? null : null), $e = v(() => X.value?.index ?? null), C = () => u.value ? n.renderContent(u.value, b.value, g.value) ?? null : null, x = () => u.value ? n.renderActions(u.value, b.value, g.value) ?? null : null;
    let L = null;
    function O(K) {
      const W = L !== null && Math.hypot(K.clientX - L.x, K.clientY - L.y) >= 4;
      return L = null, W;
    }
    const ve = (K) => K.kind === "panel" ? K.id : Me(K.node);
    function Ee(K, W) {
      W.kind !== "space" && (n.focus(W.id), L = { x: K.clientX, y: K.clientY }, n.beginDrag(W.id, K));
    }
    function Ge(K, W) {
      if (O(K)) return;
      const ee = ve(W);
      ee && n.selectPanel(ee);
    }
    function Ye(K) {
      i.value && n.focus(i.value), !K.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (B.value ? n.beginFrameDrag(w.value, K, "move") : n.beginDrag(i.value, K));
    }
    function Qe(K) {
      L = { x: K.clientX, y: K.clientY }, n.beginDrag(i.value, K);
    }
    function Ze(K) {
      O(K) || n.toggleMoveMode(i.value);
    }
    const Be = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Ke(K) {
      if (!F.value) return;
      if (K.key === "Escape") {
        K.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const W = Be[K.key];
      W && (K.preventDefault(), B.value ? n.nudgeFrame(i.value, W, K.shiftKey) : n.nudge(i.value, W, K.shiftKey));
    }
    function Ve(K) {
      !B.value || K.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(w.value);
    }
    function xt(K, W) {
      K.stopPropagation(), L = null, n.close(W);
    }
    function Gt(K, W) {
      const ee = a.value.length;
      let Se = null;
      if (K.key === "ArrowRight" ? Se = (W + 1) % ee : K.key === "ArrowLeft" ? Se = (W - 1 + ee) % ee : K.key === "Home" ? Se = 0 : K.key === "End" && (Se = ee - 1), Se === null) return;
      K.preventDefault();
      const xe = a.value[Se];
      if (!xe) return;
      const Ct = ve(xe);
      Ct && n.selectPanel(Ct);
    }
    return (K, W) => l.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": P(Es)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": B.value ? "true" : "false",
      "data-dc-maximized": R.value ? "true" : "false",
      "data-dc-headless": S.value ? "true" : "false",
      "data-dc-active": g.value ? "true" : "false",
      "data-dc-dragging": $.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: W[7] || (W[7] = (ee) => i.value && P(n).focus(i.value))
    }, [
      S.value ? T("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": I.value ? "true" : "false",
        onPointerdown: Ye,
        onDblclick: Ve
      }, [
        I.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": F.value,
          onPointerdown: Qe,
          onClick: Ze,
          onKeydown: Ke
        }, [...W[8] || (W[8] = [
          y("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Iu)) : T("", !0),
        _.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": _.value
        }, [
          y("span", Bu, z(_.value), 1)
        ], 8, Ou)) : T("", !0),
        y("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(G, null, le(a.value, (ee, Se) => (f(), h(G, {
            key: ee.id
          }, [
            $e.value === Se ? (f(), h("span", Vu)) : T("", !0),
            y("button", {
              id: te(ee.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": ee.kind === "panel" ? ee.id : void 0,
              "data-dc-space": ee.kind === "space" ? ee.title : void 0,
              "aria-selected": ee.index === l.value.index,
              "aria-controls": oe.value,
              tabindex: ee.index === l.value.index ? 0 : -1,
              onPointerdown: (xe) => Ee(xe, ee),
              onClick: (xe) => Ge(xe, ee),
              onKeydown: (xe) => Gt(xe, Se)
            }, [
              y("span", Wu, z(ee.title), 1),
              ee.kind === "panel" && ee.panel.subtitle ? (f(), h("span", Uu, z(ee.panel.subtitle), 1)) : T("", !0),
              r.value && ee.kind === "panel" && E(ee.id) ? (f(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${ee.title}`,
                "data-dc-close": ee.id,
                onPointerdown: W[0] || (W[0] = De(() => {
                }, ["stop"])),
                onClick: (xe) => xt(xe, ee.id)
              }, [...W[9] || (W[9] = [
                y("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Hu)) : T("", !0)
            ], 40, qu)
          ], 64))), 128)),
          $e.value === a.value.length ? (f(), h("span", ju)) : T("", !0)
        ], 8, Ku),
        y("div", Xu, [
          me(x),
          q.value.length ? (f(), se(Yn, {
            key: 0,
            items: q.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ]),
        J.value ? (f(), h("div", Gu, [
          B.value && !D.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": w.value,
            onPointerdown: W[1] || (W[1] = De(() => {
            }, ["stop"])),
            onClick: W[2] || (W[2] = (ee) => P(n).toggleMinimize(w.value))
          }, [
            me(gt, { kind: "minimize" })
          ], 40, Yu)) : T("", !0),
          B.value && !D.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${R.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": R.value,
            "data-dc-maximize": w.value,
            onPointerdown: W[3] || (W[3] = De(() => {
            }, ["stop"])),
            onClick: W[4] || (W[4] = (ee) => P(n).toggleMaximize(w.value))
          }, [
            me(gt, {
              kind: R.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Qu)) : T("", !0),
          !r.value && u.value && E(u.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": u.value.id,
            onPointerdown: W[5] || (W[5] = De(() => {
            }, ["stop"])),
            onClick: W[6] || (W[6] = (ee) => P(n).close(u.value.id))
          }, [
            me(gt, { kind: "close" })
          ], 40, Zu)) : T("", !0)
        ])) : T("", !0)
      ], 40, Nu)),
      o.value ? (f(), h("div", {
        key: 1,
        id: oe.value,
        class: "dc-pane__space",
        role: S.value ? void 0 : "tabpanel",
        "aria-labelledby": S.value ? void 0 : te(l.value.id)
      }, [
        ge(K.$slots, "space", {
          node: o.value,
          path: k.value
        }, void 0, !0)
      ], 8, Ju)) : (f(), h("div", {
        key: 2,
        id: oe.value,
        class: "dc-pane__body",
        role: S.value ? void 0 : "tabpanel",
        "aria-labelledby": S.value ? void 0 : te(i.value)
      }, [
        me(C)
      ], 8, ed)),
      pe.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": pe.value,
        "aria-hidden": "true"
      }, null, 8, td)) : T("", !0)
    ], 40, Du)) : T("", !0);
  }
}), Oa = /* @__PURE__ */ de(nd, [["__scopeId", "data-v-44fd2b2d"]]), sd = ["data-dc-space", "data-dc-path", "aria-label"], ad = {
  key: 0,
  class: "dc-space__head"
}, rd = { class: "dc-space__title dc-truncate" }, ld = ["data-dc-direction"], od = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, id = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], cd = /* @__PURE__ */ ue({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = os(), s = U(null), a = v(() => H(t.node) ? t.node : null), r = v(() => $t(t.node) ? t.node : null), l = v(() => Z(t.node) ? t.node : null), o = v(
      () => r.value ? r.value.children : l.value?.frames.map((C) => C.node) ?? []
    ), i = v(() => r.value ? He(r.value) : []), u = v(
      () => (l.value?.frames ?? []).map((C, x) => ({
        held: C,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: x,
        key: E(C.node),
        path: [...t.path, x]
      })).sort((C, x) => C.key < x.key ? -1 : C.key > x.key ? 1 : 0)
    ), d = v(() => wt(t.node)), _ = v(() => n.spaceMenu(t.path)), k = v(() => t.node.headless === !0), w = v(() => l.value ? "desktop" : r.value?.direction ?? ""), b = U(null), S = U(0);
    let g = null;
    we(
      b,
      (C) => {
        g?.disconnect(), g = null, !(!C || typeof ResizeObserver > "u") && (S.value = C.clientWidth, g = new ResizeObserver(([x]) => {
          S.value = x?.contentRect.width ?? 0;
        }), g.observe(C));
      },
      { immediate: !0 }
    ), je(() => g?.disconnect());
    const $ = v(() => {
      const C = Math.max(
        1,
        Math.floor((S.value + pt) / (An + pt))
      ), x = /* @__PURE__ */ new Map();
      let L = 0;
      for (const O of u.value)
        O.held.minimized === !0 && (x.set(O.key, {
          x: pt + L % C * (An + pt),
          bottom: pt + Math.floor(L / C) * (xa + pt)
        }), L += 1);
      return x;
    }), F = (C) => !!C && C.join("/") === t.path.join("/"), B = v(() => {
      const C = n.dropTarget.value, x = l.value;
      if (!x || !C?.rect || C.edge !== "float") return null;
      if (C.space) return F(C.space) ? C.rect : null;
      const L = be(x, C.panel);
      return L && x.frames.includes(L) ? C.rect : null;
    }), D = v(() => {
      const C = n.dropTarget.value;
      return !!C && !C.rect && F(C.space);
    }), I = v(() => r.value?.direction === "row"), q = v(() => o.value.map((C, x) => [...t.path, x])), E = (C) => [...Xe(C)].sort().join("/"), R = (C) => {
      const x = Xe(C)[0];
      return (x ? n.panelFor(x)?.title : null) ?? x ?? "panel";
    }, J = (C) => {
      const x = o.value[C], L = o.value[C + 1];
      return !x || !L ? "Resize panels" : `Resize ${R(x)} and ${R(L)}`;
    }, te = (C) => {
      const x = i.value[C] ?? 0, L = i.value[C + 1] ?? 0, O = x + L;
      return O > 0 ? Math.round(x / O * 100) : 50;
    };
    function oe() {
      const C = s.value, x = C ? I.value ? C.clientWidth : C.clientHeight : 0;
      return x <= 0 ? 0.05 : Math.min(n.minPanelSize.value / x, 0.4);
    }
    let X = null;
    function pe(C, x) {
      const L = r.value, O = s.value;
      if (!n.resizable.value || !L || !O || C.button !== 0) return;
      const ve = I.value ? O.clientWidth : O.clientHeight;
      if (ve <= 0) return;
      const Ee = I.value ? C.clientX : C.clientY, Ge = He(L), Ye = Math.min(n.minPanelSize.value / ve, 0.4);
      C.preventDefault();
      const Qe = (Ke) => {
        const Ve = ((I.value ? Ke.clientX : Ke.clientY) - Ee) / ve;
        n.setSizes(t.path, Ls(Ge, x, Ve, Ye));
      }, Ze = () => X?.(), Be = (Ke) => {
        Ke.key === "Escape" && (n.setSizes(t.path, Ge), X?.());
      };
      X = () => {
        window.removeEventListener("pointermove", Qe), window.removeEventListener("pointerup", Ze), window.removeEventListener("pointercancel", Ze), window.removeEventListener("keydown", Be), X = null;
      }, window.addEventListener("pointermove", Qe), window.addEventListener("pointerup", Ze), window.addEventListener("pointercancel", Ze), window.addEventListener("keydown", Be);
    }
    je(() => X?.());
    function $e(C, x) {
      const L = r.value;
      if (!n.resizable.value || !L) return;
      const O = I.value ? "ArrowRight" : "ArrowDown", ve = I.value ? "ArrowLeft" : "ArrowUp", Ee = C.shiftKey ? 0.1 : 0.02;
      if (C.key !== O && C.key !== ve) return;
      const Ge = C.key === O ? Ee : -Ee;
      C.preventDefault(), n.setSizes(t.path, Ls(He(L), x, Ge, oe()));
    }
    return (C, x) => {
      const L = Bs("WindowNode", !0);
      return a.value ? (f(), se(Oa, {
        key: 0,
        group: a.value,
        path: e.path
      }, {
        space: Ne(({ node: O, path: ve }) => [
          me(L, {
            node: O,
            path: ve,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": w.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !k.value ? (f(), h("header", ad, [
          y("span", rd, z(d.value), 1),
          _.value.length ? (f(), se(Yn, {
            key: 0,
            items: _.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : T("", !0)
        ])) : T("", !0),
        l.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: b,
          class: "dc-window__desktop"
        }, [
          B.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Re({
              left: `${B.value.x}px`,
              top: `${B.value.y}px`,
              width: `${B.value.w}px`,
              height: `${B.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : T("", !0),
          (f(!0), h(G, null, le(u.value, (O) => (f(), se(Lu, {
            key: O.key,
            frame: O.held,
            path: O.path,
            order: O.order,
            place: $.value.get(O.key) ?? null
          }, {
            default: Ne(() => [
              me(L, {
                node: O.held.node,
                path: O.path,
                framed: O.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (f(), h("div", {
          key: 2,
          ref_key: "container",
          ref: s,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          D.value ? (f(), h("div", od)) : T("", !0),
          (f(!0), h(G, null, le(o.value, (O, ve) => (f(), h(G, {
            key: E(O)
          }, [
            y("div", {
              class: "dc-window__cell",
              style: Re({ flexGrow: i.value[ve] ?? 1 })
            }, [
              me(L, {
                node: O,
                path: q.value[ve] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            ve < o.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": I.value ? "vertical" : "horizontal",
              "aria-label": J(ve),
              "aria-valuenow": te(ve),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (Ee) => pe(Ee, ve),
              onKeydown: (Ee) => $e(Ee, ve)
            }, null, 40, id)) : T("", !0)
          ], 64))), 128))
        ], 8, ld)) : T("", !0)
      ], 8, sd));
    };
  }
}), ud = /* @__PURE__ */ de(cd, [["__scopeId", "data-v-fb5b403f"]]), dd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], fd = {
  key: 1,
  class: "dc-window__empty"
}, pd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Jt = 16, vd = /* @__PURE__ */ ue({
  __name: "WindowFrame",
  props: /* @__PURE__ */ cn({
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
  emits: /* @__PURE__ */ cn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const s = e, a = n, r = At(e, "layout"), l = At(e, "views"), o = Ot(), i = v(() => new Map(s.panels.map((c) => [c.id, c]))), u = v(() => s.panels.map((c) => c.id)), d = v(() => mu(r.value, u.value)), _ = U(null), k = U(null), w = U(null), b = U(!0), S = U(null), g = U(null), $ = U(null), F = U(""), B = U(null);
    function D() {
      const c = B.value;
      return c ? [...c.querySelectorAll(".dc-pane[data-dc-panels]")].filter((m) => m.closest(".dc-window") === c).map((m) => ({ panels: (m.dataset.dcPanels ?? "").split(" "), element: m })) : [];
    }
    function I(c) {
      const p = [];
      let m = c.closest(".dc-float");
      for (; m; )
        p.unshift(Number(m.dataset.dcOrder ?? 0)), m = m.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function q() {
      return D().map((c) => ({ pane: c, order: I(c.element) })).sort((c, p) => {
        const m = Math.max(c.order.length, p.order.length);
        for (let M = 0; M < m; M += 1) {
          const A = (c.order[M] ?? -1) - (p.order[M] ?? -1);
          if (A !== 0) return A;
        }
        return 0;
      }).map((c) => c.pane);
    }
    const E = (c) => D().find((p) => p.panels.includes(c)) ?? null;
    function R(c) {
      const p = i.value.get(c);
      if (!p) return "";
      const m = l.value[c];
      return m && p.views?.some((M) => M.key === m) ? m : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function J(c, p) {
      l.value = { ...l.value, [c]: p }, a("view-change", { panel: c, view: p });
    }
    const te = v(
      () => s.panels.filter((c) => c.fixed !== !0).length
    );
    function oe(c) {
      return !s.movable || te.value < 1 || s.panels.length < 2 ? !1 : i.value.get(c)?.fixed !== !0;
    }
    function X(c, p) {
      const m = d.value;
      !c || !m || c === m || (r.value = c, p && a("panel-move", p));
    }
    function pe(c, p, m) {
      if (c.width <= 0 || c.height <= 0) return "center";
      const M = (p - c.left) / c.width, A = (m - c.top) / c.height, N = 0.3;
      return M > N && M < 1 - N && A > N && A < 1 - N ? "center" : [
        { edge: "left", distance: M },
        { edge: "right", distance: 1 - M },
        { edge: "top", distance: A },
        { edge: "bottom", distance: 1 - A }
      ].reduce(
        (ne, V) => V.distance < ne.distance ? V : ne
      ).edge;
    }
    function $e(c, p) {
      const m = [...c.querySelectorAll(".dc-tab")], M = m.findIndex((A) => {
        const N = A.getBoundingClientRect();
        return p < N.left + N.width / 2;
      });
      return M === -1 ? m.length : M;
    }
    function C(c, p, m) {
      for (const { panels: M, element: A } of q().reverse()) {
        const N = A.getBoundingClientRect();
        if (c < N.left || c > N.right || p < N.top || p > N.bottom) continue;
        const ie = M.find((Y) => Y !== m), ne = A.querySelector(".dc-pane__tabs"), V = ne?.getBoundingClientRect();
        if (ne && V && p >= V.top && p <= V.bottom)
          return ie ? { panel: ie, edge: "center", index: $e(ne, c) } : null;
        const j = A.querySelector(":scope > .dc-pane__space");
        if (j) {
          const Y = j.getBoundingClientRect();
          if (c >= Y.left && c <= Y.right && p >= Y.top && p <= Y.bottom) continue;
        }
        return ie ? { panel: ie, edge: pe(N, c, p) } : null;
      }
      return L(c, p, m) ?? Ee(c, p);
    }
    function x() {
      const c = B.value;
      return c ? [...c.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === c).reverse() : [];
    }
    function L(c, p, m) {
      const M = d.value;
      if (!M) return null;
      for (const A of x()) {
        const N = A.getBoundingClientRect();
        if (c < N.left || c > N.right || p < N.top || p > N.bottom) continue;
        const ie = Ge(A), ne = ie.flatMap((re) => re.panels).find((re) => re !== m);
        if (!ne && ie.length > 0) return null;
        const V = be(M, m)?.rect, j = kn(
          {
            x: c - N.left - 24,
            y: p - N.top - 12,
            w: V?.w ?? it.w,
            h: V?.h ?? it.h
          },
          { w: A.clientWidth, h: A.clientHeight },
          s.minPanelSize
        );
        if (ne) return { panel: ne, edge: "float", rect: j };
        const Y = O(A);
        return Y ? { panel: "", space: Y, edge: "float", rect: j } : null;
      }
      return null;
    }
    function O(c) {
      const p = c.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function ve() {
      const c = B.value;
      return c ? [...c.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === c).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const m = O(p);
        return m ? [{ element: p, path: m }] : [];
      }) : [];
    }
    function Ee(c, p) {
      for (const { element: m, path: M } of ve()) {
        if (m.dataset.dcSpace === "desktop") continue;
        const A = m.getBoundingClientRect();
        if (!(c < A.left || c > A.right || p < A.top || p > A.bottom))
          return { panel: "", space: M, edge: "center" };
      }
      return null;
    }
    function Ge(c) {
      return D().filter(
        (p) => p.element.closest(".dc-window__desktop") === c
      );
    }
    let Ye = null;
    const Qe = (c) => c.altKey;
    function Ze(c, p) {
      if (!oe(c) || k.value || g.value || p.button !== 0) return;
      const m = p.clientX, M = p.clientY;
      let A = !1, N = Qe(p);
      const ie = () => {
        const ce = $.value;
        ce && (w.value = N ? L(ce.x, ce.y, c) : C(ce.x, ce.y, c));
      }, ne = (ce) => {
        if (!A) {
          if (Math.hypot(ce.clientX - m, ce.clientY - M) < 4) return;
          A = !0, k.value = c, S.value = null;
        }
        N = Qe(ce), b.value = !N, $.value = { x: ce.clientX, y: ce.clientY }, ie();
      }, V = (ce) => {
        Qe(ce) !== N && (N = !N, b.value = !N, A && ie());
      }, j = (ce) => {
        Ye?.();
        const Q = w.value, Ce = d.value;
        if (ce && A && Q && Ce) {
          const Je = Q.space ? Rs(Ce, c, Q.space, Q.rect) : Q.edge === "float" && Q.rect ? zs(Ce, c, Q.panel, Q.rect) : Zt(Ce, c, Q.panel, Q.edge, Q.index);
          X(Je, {
            panel: c,
            target: Q.panel,
            edge: Q.edge,
            ...Q.space === void 0 ? {} : { space: Q.space },
            ...Q.index === void 0 ? {} : { index: Q.index },
            ...Q.rect === void 0 ? {} : { rect: Q.rect }
          });
        }
        k.value = null, w.value = null, $.value = null, b.value = !0;
      }, Y = () => j(!0), re = () => j(!1), he = (ce) => {
        if (ce.key === "Escape") {
          j(!1);
          return;
        }
        V(ce);
      };
      Ye = () => {
        window.removeEventListener("pointermove", ne), window.removeEventListener("pointerup", Y), window.removeEventListener("pointercancel", re), window.removeEventListener("keydown", he), window.removeEventListener("keyup", V), Ye = null;
      }, window.addEventListener("pointermove", ne), window.addEventListener("pointerup", Y), window.addEventListener("pointercancel", re), window.addEventListener("keydown", he), window.addEventListener("keyup", V);
    }
    je(() => Ye?.());
    let Be = null;
    function Ke(c) {
      const p = B.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${c.join("/")}"]`
      )].find((A) => A.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function Ve(c) {
      const p = d.value;
      return p ? Tn(p, c) : null;
    }
    function xt(c) {
      const p = d.value;
      if (!p) return;
      const m = Rt(p, c);
      m !== p && (r.value = m);
    }
    function Gt(c) {
      const p = Ve(c);
      p && xt(p);
    }
    function K(c) {
      const p = d.value, m = p ? be(p, c) : null;
      return m !== null && et(m);
    }
    function W(c) {
      const p = d.value, m = p ? be(p, c) : null;
      return m !== null && ot(m);
    }
    function ee(c) {
      const p = d.value, m = p ? lt(p, c) : null;
      return m ? Me(m.node) : "";
    }
    function Se(c) {
      const p = d.value, m = p ? lt(p, c) : null;
      if (!p || !m) return;
      const M = Me(m.node);
      if (i.value.get(M)?.fixed === !0) return;
      const A = !ot(m);
      let N = ru(p, c, A);
      N !== p && (A || (N = Rt(N, c)), r.value = N, a("frame-minimize", { panel: M, minimized: A }));
    }
    function xe(c) {
      const p = Ve(c);
      p && Se(p);
    }
    function Ct(c) {
      const p = d.value, m = p ? lt(p, c) : null;
      if (!p || !m) return;
      const M = Me(m.node);
      if (i.value.get(M)?.fixed === !0) return;
      const A = !et(m);
      let N = au(p, c, A);
      N !== p && (A && (N = Rt(N, c)), r.value = N, a("frame-maximize", { panel: M, maximized: A }));
    }
    function cs(c) {
      const p = Ve(c);
      p && Ct(p);
    }
    function us(c, p, m) {
      const M = d.value, A = M ? lt(M, c) : null;
      if (!M || !A || p.button !== 0 || k.value || g.value) return;
      const N = Me(A.node);
      if (i.value.get(N)?.fixed === !0 || et(A) || ot(A) || (m === "move" ? !s.movable : !s.resizable)) return;
      const ie = Ke(c), ne = lu(M, c);
      xt(c);
      const V = { w: ie?.clientWidth ?? 0, h: ie?.clientHeight ?? 0 }, j = { ...A.rect }, Y = p.clientX, re = p.clientY, he = s.minPanelSize;
      g.value = N;
      const ce = (Pe) => {
        const qe = d.value;
        if (!qe) return;
        const Mt = As(qe, ne, kn(Pe, V, he));
        Mt !== qe && (r.value = Mt);
      }, Q = (Pe) => {
        Pe.preventDefault();
        const qe = Pe.clientX - Y, Mt = Pe.clientY - re;
        ce(
          m === "move" ? { ...j, x: j.x + qe, y: j.y + Mt } : Ps(j, m, qe, Mt, he)
        );
      }, Ce = (Pe) => {
        if (Be?.(), g.value = null, !Pe) {
          ce(j);
          return;
        }
        const qe = d.value ? lt(d.value, ne) : null;
        qe && a("frame-change", { panel: ee(ne), rect: qe.rect });
      }, Je = () => Ce(!0), at = () => Ce(!1), rt = (Pe) => {
        Pe.key === "Escape" && Ce(!1);
      };
      Be = () => {
        window.removeEventListener("pointermove", Q), window.removeEventListener("pointerup", Je), window.removeEventListener("pointercancel", at), window.removeEventListener("keydown", rt), Be = null;
      }, window.addEventListener("pointermove", Q), window.addEventListener("pointerup", Je), window.addEventListener("pointercancel", at), window.addEventListener("keydown", rt);
    }
    function Ba(c, p, m) {
      const M = Ve(c);
      M && us(M, p, m);
    }
    function Ka(c, p, m = !1) {
      const M = d.value, A = Ve(c), N = M && A ? lt(M, A) : null;
      if (!M || !A || !N || i.value.get(c)?.fixed === !0 || (m ? !s.resizable : !s.movable)) return;
      if (et(N) || ot(N)) {
        F.value = `${Fe(c)} is ${et(N) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ie = p === "left" ? -Jt : p === "right" ? Jt : 0, ne = p === "up" ? -Jt : p === "down" ? Jt : 0, V = Ke(A), j = { w: V?.clientWidth ?? 0, h: V?.clientHeight ?? 0 }, Y = m ? Ps(N.rect, "se", ie, ne, s.minPanelSize) : { ...N.rect, x: N.rect.x + ie, y: N.rect.y + ne }, re = As(M, A, kn(Y, j, s.minPanelSize));
      if (re === M) {
        F.value = m ? `${Fe(c)} cannot be resized further.` : `${Fe(c)} cannot move ${p}.`;
        return;
      }
      r.value = re;
      const he = lt(re, A);
      he && (a("frame-change", { panel: c, rect: he.rect }), F.value = m ? `${Fe(c)} resized to ${he.rect.w} by ${he.rect.h}.` : `${Fe(c)} moved to ${he.rect.x}, ${he.rect.y}.`);
    }
    je(() => Be?.());
    function Va(c, p) {
      const m = E(c), M = m?.element.getBoundingClientRect();
      if (!m || !M) return null;
      const A = p === "left" || p === "right", N = (V) => {
        if (!(A ? V.bottom > M.top + 1 && V.top < M.bottom - 1 : V.right > M.left + 1 && V.left < M.right - 1)) return null;
        const Y = p === "left" ? M.left - V.right : p === "right" ? V.left - M.right : p === "up" ? M.top - V.bottom : V.top - M.bottom;
        return Y < -1 ? null : Y;
      }, ie = [];
      for (const V of D()) {
        if (V === m || V.element === m.element) continue;
        const j = N(V.element.getBoundingClientRect());
        if (j === null) continue;
        const Y = V.panels.find((re) => re !== c);
        Y && ie.push({ to: { panel: Y }, distance: j });
      }
      for (const { element: V, path: j } of ve()) {
        const Y = N(V.getBoundingClientRect());
        Y !== null && ie.push({ to: { space: j }, distance: Y });
      }
      return ie.reduce(
        (V, j) => V && V.distance <= j.distance ? V : j,
        null
      )?.to ?? null;
    }
    function qa(c) {
      const p = d.value ? be(d.value, c) !== null : !1;
      if (!p && !oe(c)) return;
      S.value = S.value === c ? null : c;
      const m = Fe(c);
      if (!S.value) {
        F.value = `${m}: move mode off.`;
        return;
      }
      F.value = p ? `${m}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${m}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Fe = (c) => i.value.get(c)?.title ?? c, Wa = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Ua(c, p, m = !1) {
      if (!oe(c)) return;
      const M = d.value;
      if (!M) return;
      const A = Fe(c), N = ht(M, c);
      if (!m && N && (p === "left" || p === "right") && N.panels.length > 1) {
        const re = N.panels.indexOf(c), he = p === "left" ? re - 1 : re + 1;
        if (he >= 0 && he < N.panels.length) {
          X(Tt(M, c, he), { panel: c, target: c, edge: "center", index: he }), F.value = `${A} moved ${p}, now tab ${he + 1} of ${N.panels.length}.`, hn(c);
          return;
        }
      }
      const ne = Va(c, p);
      if (!ne || ne.panel !== void 0 && !oe(ne.panel)) {
        F.value = `${A} cannot move ${p}.`;
        return;
      }
      const V = Wa[p];
      if (ne.space) {
        const re = ne.space, he = nt(M, re), ce = be(M, c)?.rect, Q = { ...it, ...ce ? { w: ce.w, h: ce.h } : {} };
        X(Rs(M, c, re, Q), { panel: c, target: "", space: re, edge: V }), F.value = `${A} moved ${p}, into ${he ? wt(he) : "the space"}.`, hn(c);
        return;
      }
      const j = ne.panel, Y = N?.panels.length === 1 && ht(M, j)?.panels.length === 1;
      m ? (X(Zt(M, c, j, "center"), {
        panel: c,
        target: j,
        edge: "center"
      }), F.value = `${A} joined ${Fe(j)} as a tab.`) : Y ? (X(rn(M, c, j), { panel: c, target: j, edge: V }), F.value = `${A} moved ${p}, trading places with ${Fe(j)}.`) : (X(Zt(M, c, j, V), { panel: c, target: j, edge: V }), F.value = `${A} moved ${p}, beside ${Fe(j)}.`), hn(c);
    }
    function hn(c) {
      Dt(() => {
        E(c)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Ha(c, p) {
      const m = d.value;
      m && (r.value = ln(m, c, p));
    }
    function mn(c) {
      const p = d.value;
      if (!p) return;
      const m = _t(p, c);
      m !== p && (r.value = m, a("tab-select", { panel: c }));
    }
    function ds(c) {
      return i.value.get(c)?.closable ?? s.closable;
    }
    function ja(c) {
      ds(c) && a("panel-close", c);
    }
    const _n = U(/* @__PURE__ */ new Map());
    let Xa = 0;
    function Ga(c, p) {
      const m = Xa += 1;
      return _n.value.set(m, { panel: c, items: p }), () => {
        _n.value.delete(m);
      };
    }
    function Ya(c) {
      const p = [];
      for (const m of _n.value.values())
        m.panel() === c && p.push(...m.items());
      return p;
    }
    function fs(c) {
      const p = c.filter((m) => m.items.length > 0);
      return p.length < 2 ? p.flatMap((m) => m.items) : p.flatMap((m) => [
        { id: m.id, heading: !0, label: m.title },
        ...m.items
      ]);
    }
    const ps = (c) => c.title || "These tabs";
    function Qa(c, p) {
      const m = p.id, M = ht(c, m), A = (M?.panels.length ?? 0) > 1, N = M?.fixedView === !0, ie = (Y) => ({
        action: () => {
          Y !== c && (r.value = Y);
        }
      }), ne = [], V = [], j = p.views ?? [];
      if (j.length > 1 && !N) {
        const Y = R(m);
        ne.push({
          id: "view",
          label: "View",
          items: j.map((re) => ({
            id: `view-${re.key}`,
            label: re.label,
            checked: re.key === Y,
            action: () => J(m, re.key)
          }))
        });
      }
      return A && !N && V.push(
        { id: "show-row", label: "Row", checked: !1, ...ie(Ts(c, m, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ie(Ts(c, m, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ie(uu(c, m))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ie(du(c, m))
        }
      ), A && M && (V.length && V.push({ separator: !0 }), V.push(...vs(M, m))), { panel: ne, tabs: V, tabsTitle: M ? ps(M) : "" };
    }
    function vs(c, p) {
      const m = ft(c), M = (A) => {
        const N = c.panels[(m + A + c.panels.length) % c.panels.length];
        return (N === void 0 ? "" : Me(N)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => mn(M(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => mn(M(-1)) }
      ];
    }
    function Yt(c) {
      return c.title ? c.title : H(c) ? c.panels.length > 1 ? "these tabs" : "the strip" : wt(c);
    }
    function hs(c) {
      if (!c || Z(c) || c.fixedView === !0 || !c.title && c.headless !== !0 || Le(c)) return null;
      const p = Ia(c);
      return p && p.fixedView !== !0 ? p : null;
    }
    function Za(c) {
      const p = d.value;
      if (!s.menu || !p) return [];
      const m = nt(p, c);
      if (!m || H(m)) return [];
      if (m.fixedView) return [];
      const M = Z(m) ? "desktop" : m.direction, A = (Q, Ce, Je) => ({
        id: `show-${Q}`,
        label: Ce,
        checked: M === Q,
        action: () => {
          const at = d.value, rt = Je();
          !at || rt === m || (r.value = fn(ye(ut(at, c, rt))));
        }
      }), N = () => {
        const Q = La(m, Ja(m));
        if (H(Q) && Q.panels.length === 0) return m;
        const Ce = H(Q) && Q.panels.length === 1 ? Q.panels[0] : void 0;
        return Ce !== void 0 && fe(Ce) ? m : Q;
      }, ie = (Q) => () => Z(m) ? Na(m, Q) : m.direction === Q ? m : { ...m, direction: Q }, ne = c.slice(0, -1), V = c.length > 0 ? nt(p, ne) : null, j = V && H(V) && V.panels.length > 1 ? V : null, Y = V && hs(V) === m ? V : null, re = hs(m), he = m.title || "this space", ce = (Q, Ce, Je, at, rt) => ({
        id: Q,
        label: rt,
        action: () => {
          const Pe = d.value;
          Pe && (r.value = fn(ye(ut(Pe, Ce, vu(Je, at)))));
        }
      });
      return fs([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: m.title || "This space",
          items: [
            A("row", "Row", ie("row")),
            A("column", "Column", ie("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            A("tabs", "Tabs", () => N()),
            A("desktop", "Desktop", () => Z(m) ? m : Da(m))
          ]
        },
        {
          id: "about-around",
          title: re ? `Around ${Yt(re)}` : "",
          items: re ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...re.title ? [] : [ce("merge-around-keep-this", c, m, "outer", `Keep ${he}`)],
            ...m.title ? [] : [ce("merge-around-keep-that", c, m, "inner", `Keep ${Yt(re)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Y ? `Inside ${Yt(Y)}` : "",
          items: Y ? [
            ...m.title ? [] : [ce("merge-inside-keep-that", ne, Y, "outer", `Keep ${Yt(Y)}`)],
            ...Y.title ? [] : [ce("merge-inside-keep-this", ne, Y, "inner", `Keep ${he}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: j ? ps(j) : "",
          items: j ? vs(j, Me(m)) : []
        }
      ]);
    }
    function Ja(c) {
      const p = _.value;
      return p && ae(c, p) ? p : void 0;
    }
    function er(c) {
      const p = d.value, m = i.value.get(c);
      if (!p || !m) return [];
      const M = s.menu ? Qa(p, m) : null, A = Ya(c);
      A.length && M?.panel.length && A.push({ separator: !0 }), M && A.push(...M.panel);
      const N = fs([
        { id: "about-panel", title: m.title, items: A },
        { id: "about-tabs", title: M?.tabsTitle ?? "", items: M?.tabs ?? [] }
      ]);
      return s.paneMenu ? s.paneMenu(m, N) : N;
    }
    function tr(c, p) {
      return o[`${c}-${p}`] ?? o[c];
    }
    function ms(c, p, m, M) {
      return tr(c, p.id)?.({ panel: p, view: m, active: M });
    }
    _u({
      panelFor: (c) => i.value.get(c) ?? null,
      viewFor: R,
      setView: J,
      movable: v(() => s.movable),
      resizable: v(() => s.resizable),
      minPanelSize: v(() => s.minPanelSize),
      spaceNames: v(() => s.spaceNames),
      focused: _,
      dragging: k,
      dropTarget: w,
      moving: S,
      framing: g,
      canMove: oe,
      focus(c) {
        _.value !== c && (_.value = c, a("panel-activate", c));
      },
      selectPanel: mn,
      beginDrag: Ze,
      toggleMoveMode: qa,
      nudge: Ua,
      setSizes: Ha,
      frameOf: (c) => d.value ? be(d.value, c) : null,
      beginFrameDrag: Ba,
      nudgeFrame: Ka,
      raise: Gt,
      maximized: K,
      toggleMaximize: cs,
      minimized: W,
      toggleMinimize: xe,
      beginFrameDragAt: us,
      raiseAt: xt,
      toggleMaximizeAt: Ct,
      toggleMinimizeAt: Se,
      menuFor: er,
      spaceMenu: Za,
      registerMenu: Ga,
      closable: ds,
      close: ja,
      renderContent: (c, p, m) => ms("panel", c, p, m),
      renderActions: (c, p, m) => ms("actions", c, p, m),
      layout: d
    });
    const nr = v(() => {
      if (!(!s.accent && !s.tokens))
        return { ...s.tokens, ...s.accent ? { "--dc-accent": s.accent } : {} };
    }), sr = () => {
      const c = k.value, p = $.value;
      return !c || !p ? null : ir(
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
      move(c, p, m, M) {
        const A = d.value;
        A && X(Zt(A, c, p, m, M), {
          panel: c,
          target: p,
          edge: m,
          ...M === void 0 ? {} : { index: M }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(c) {
        const p = d.value;
        p && (r.value = _t(p, c));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(c, p, m) {
        const M = d.value;
        M && X(zs(M, c, p, m), {
          panel: c,
          target: p,
          edge: "float",
          rect: m
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(c, p) {
        const m = d.value;
        if (!m) return;
        const M = tu(m, c, p);
        if (M === m) return;
        r.value = M;
        const A = be(M, c);
        A && a("frame-change", { panel: c, rect: A.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: J,
      /** Brings a floating frame to the front of its stack. */
      raise: Gt,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: cs,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: xe
    }), (c, p) => (f(), h("div", {
      ref_key: "root",
      ref: B,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": k.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Re(nr.value)
    }, [
      d.value ? (f(), se(ud, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", fd, " This window has no panels. ")),
      me(sr),
      y("p", pd, z(F.value), 1)
    ], 12, dd));
  }
}), hd = /* @__PURE__ */ de(vd, [["__scopeId", "data-v-711565af"]]);
function Fd(e = "", t = "/") {
  const n = U(Ue(e)), s = U(t), a = [`${s.value}${n.value}`];
  return {
    search: n,
    path: s,
    history: a,
    push(r) {
      n.value = Ue(r), a.push(`${s.value}${n.value}`);
    },
    replace(r) {
      n.value = Ue(r), a[a.length - 1] = `${s.value}${n.value}`;
    }
  };
}
function Ds(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), s = n.indexOf("#");
  return Ue(s === -1 ? n : n.slice(0, s));
}
function Dd(e) {
  const t = U(Ds(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), s = we(
    () => e.currentRoute.value.fullPath,
    (a) => {
      t.value = Ds(a);
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
const md = {
  DataShell: $c,
  ShellHeader: ua,
  QueryPanel: fa,
  RecordActions: pa,
  ResultsArea: ka,
  FacetControl: da,
  SegmentedControl: Fc,
  StatusPill: Vt,
  WindowFrame: hd,
  WindowPane: Oa,
  ListView: Pn,
  CardsView: ha,
  GridView: ma,
  TableView: ya,
  LinksView: _a,
  PreviewView: ga,
  TypeCardsView: wa
}, Nd = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [s, a] of Object.entries(md))
      e.component(`${n}${s}`, a);
    t.route && e.provide(Ks, t.route);
  }
};
export {
  dn as CASCADE_STEP,
  wd as COLUMN_BREAKPOINTS,
  yd as COLUMN_ROLES,
  ha as CardsView,
  Ss as ColumnCell,
  it as DEFAULT_FRAME,
  Cn as DEFAULT_SORT,
  ur as DEFAULT_VIEW,
  $c as DataShell,
  Mn as EMPTY_CELL,
  la as ENTITY_ALL,
  un as ENTITY_TERM,
  It as EXPRESSION_TERM,
  Hn as FACET_PREFIX,
  da as FacetControl,
  ma as GridView,
  Nd as HeaderContentLayoutPlugin,
  _a as LinksView,
  Pn as ListView,
  pt as MINIMIZED_GAP,
  xa as MINIMIZED_HEIGHT,
  An as MINIMIZED_WIDTH,
  $a as MIN_FRAME,
  xs as MOCK_TINTS,
  $d as MenuBar,
  Yn as MenuButton,
  ba as MenuList,
  qt as MetricDrill,
  is as PANE_CONTEXT_KEY,
  qn as PARAM_DIR,
  Bn as PARAM_ENTITY,
  Wn as PARAM_EXPR,
  Un as PARAM_PAGE,
  Vn as PARAM_SORT,
  Kn as PARAM_VIEW,
  Xn as PinStar,
  ga as PreviewView,
  fa as QueryPanel,
  Qt as RECORD_STATUSES,
  Ys as RESULT_FIELDS,
  Ks as ROUTE_ADAPTER_KEY,
  pa as RecordActions,
  ka as ResultsArea,
  ra as SHELL_CONTEXT_KEY,
  gd as SHELL_THEMES,
  Wt as ScopeMark,
  Fc as SegmentedControl,
  bt as SelectTick,
  bd as ShellCard,
  ua as ShellHeader,
  Vt as StatusPill,
  ya as TableView,
  wa as TypeCardsView,
  Vs as VIEW_KINDS,
  dr as VIEW_LABELS,
  ls as WINDOW_CONTEXT_KEY,
  hd as WindowFrame,
  Oa as WindowPane,
  Ma as activePanel,
  ft as activeTab,
  Ur as addTerm,
  ta as andExpression,
  Jc as axisOf,
  Jn as cascade,
  Js as cellFull,
  Bt as cellText,
  nn as cellTextOf,
  ze as cellValue,
  _s as changesResults,
  kn as clampRect,
  La as collapseSpace,
  uu as collapseToTabs,
  Cd as column,
  ys as columnAlign,
  ws as columnClass,
  gs as columnKey,
  Sn as columnTruncates,
  gr as columnsFor,
  pr as countPages,
  cr as createHistoryAdapter,
  Fd as createMemoryAdapter,
  qr as createMockDataSource,
  Dd as createVueRouterAdapter,
  kr as defaultCellText,
  Fs as defaultLayout,
  On as defaultQuery,
  Hr as drillExpression,
  Rs as dropIntoSpace,
  Nt as emptyFacetState,
  Dn as emptyFacetValue,
  vt as findEntity,
  tt as findSort,
  Sd as fixedView,
  Zn as float,
  zs as floatPanel,
  Da as floatSplit,
  du as floatTabs,
  tn as fnv1a,
  Us as focusEntity,
  hr as formatCount,
  mr as formatDate,
  sn as formatExpression,
  vr as formatMetric,
  _r as formatOrdinal,
  Kt as formatTerm,
  pn as frame,
  lt as frameAt,
  be as frameOf,
  Tn as framePathOf,
  Me as frontPanel,
  Br as generateRows,
  xd as group,
  ht as groupOf,
  eu as groups,
  Gs as hasActiveFacets,
  ae as hasPanel,
  Md as headless,
  Et as insertPanel,
  zt as isChoosable,
  kd as isEntityScoped,
  Xs as isFacetActive,
  Z as isFloat,
  H as isGroup,
  et as isMaximized,
  ot as isMinimized,
  fe as isPanelTab,
  Nn as isPristineQuery,
  $t as isSplit,
  Ae as isTabOf,
  In as isTypeCardsQuery,
  qs as isViewKind,
  bs as joinExpression,
  Ar as matchesExpression,
  Kr as matchesFacets,
  nu as maximizeFrame,
  au as maximizeFrameAt,
  vu as mergeSpace,
  su as minimizeFrame,
  ru as minimizeFrameAt,
  Zt as movePanel,
  Tt as moveTab,
  nt as nodeAt,
  Lt as nodeTitle,
  ye as normalizeLayout,
  Ue as normalizeSearch,
  as as normalizeSizes,
  Ia as onlySpace,
  Xe as panelIds,
  Oe as panelNode,
  Es as panelTabs,
  st as parseExpression,
  el as parseQuery,
  go as presentParts,
  va as presentRow,
  Fu as providePaneContext,
  Xr as provideShellContext,
  _u as provideWindowContext,
  bn as raiseFrame,
  Rt as raiseFrameAt,
  lu as raisedPath,
  Qs as reconcileFacets,
  mu as reconcileLayout,
  sa as recordTerm,
  ct as removePanel,
  ut as replaceAt,
  Ps as resizeRect,
  Ls as resizeSplit,
  Ws as resolveView,
  Te as roleColumn,
  Zs as roleColumns,
  fn as rootSpace,
  ts as row,
  wr as rowKey,
  ea as sameTerm,
  Wr as scopeTerm,
  aa as scopeTermFor,
  jr as scopedEntity,
  Ms as serializeQuery,
  _t as setActivePanel,
  tu as setFrameRect,
  As as setFrameRectAt,
  ln as setSizesAt,
  Ad as setSplitDirection,
  He as sizesOf,
  js as sortsFor,
  _e as spaceChrome,
  wt as spaceTitle,
  es as split,
  Rr as splitExpression,
  Ts as spreadTabs,
  nl as summarizeQuery,
  jn as summaryTerms,
  rn as swapPanels,
  Qn as tabNode,
  Ht as tabPanels,
  Na as tileFloat,
  zd as toFloat,
  Rd as toTiled,
  Ed as toggleMaximized,
  Pd as toggleMinimized,
  Ai as useColumns,
  Ui as useEntityPreviews,
  Td as usePaneContext,
  Ld as usePaneMenu,
  kt as usePresentedRows,
  sl as useQueryState,
  ol as useRecordNames,
  al as useResults,
  ke as useShellContext,
  os as useWindowContext,
  zr as withoutTerm
};
