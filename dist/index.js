import { ref as V, inject as Ct, provide as Bn, computed as v, toValue as Ft, shallowRef as St, watch as we, onScopeDispose as ns, defineComponent as re, onMounted as xl, onBeforeUnmount as Ve, resolveComponent as as, openBlock as f, createElementBlock as m, normalizeStyle as Le, Fragment as ae, renderList as ve, toDisplayString as N, createCommentVNode as R, createElementVNode as k, createBlock as ne, nextTick as Kt, useId as qn, unref as P, normalizeClass as Mt, createVNode as pe, withDirectives as fn, withKeys as Ye, withModifiers as ze, vModelText as pn, renderSlot as be, useSlots as Ut, createTextVNode as Ke, withCtx as Qe, resolveDynamicComponent as Kn, createSlots as ln, useModel as It, mergeModels as vn, Comment as Cl, Text as Sl, getCurrentScope as Ml, h as El } from "vue";
const ss = Symbol("dc.routeAdapter");
function tt(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function Pl() {
  const e = typeof window < "u", t = V(e ? tt(window.location.search) : ""), n = V(e ? window.location.pathname : "/"), a = () => {
    t.value = tt(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (l, r) => {
    const o = tt(l);
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
    push: (l) => s(l, "push"),
    replace: (l) => s(l, "replace"),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
const ls = ["list", "cards", "grid", "table", "links", "preview"], qd = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], nn = ["ok", "running", "queued", "review", "failed"], Kd = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Vd = [480, 620, 760, 900, 1100], Al = "cards", An = "updated";
function rs(e) {
  return typeof e == "string" && ls.includes(e);
}
const Tl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function Vn(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function wt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function os(e, t = {}) {
  const n = wt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function is(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function cs(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of is(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const zl = { key: An, label: An };
function rt(e, t, n = null) {
  const a = cs(e, n);
  return (t ? a.find((l) => l.key === t) : void 0) ?? a.find((l) => l.key === An) ?? a[0] ?? zl;
}
function Wn(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function Et(e) {
  const t = {};
  for (const n of e?.facets ?? []) t[n.key] = Wn(n);
  return t;
}
function us(e) {
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
function ds(e) {
  return Object.values(e).some(us);
}
function Un(e) {
  return e.entity === null && e.expr.trim() === "" && !ds(e.facets);
}
function Wd(e) {
  return e.entity !== null;
}
function Hn(e) {
  return e.entity === null && e.view === "cards";
}
function Ll(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function jn(e, t = {}) {
  const a = t.landing === "entity" ? os(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: t.view && rs(t.view) ? t.view : Al,
    sort: rt(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Et(a),
    page: 1
  };
}
const fs = ["entity", "sort", "dir", "expr", "facets"];
function Aa(e) {
  return fs.some((t) => t in e);
}
function ps(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : Wn(a);
  }
  return n;
}
function rn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function Rl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function _t(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function Fl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function Nl(e) {
  return String(e + 1).padStart(2, "0");
}
const Tn = "—";
function qe(e, t) {
  return e.find((n) => n.role === t);
}
function vs(e, t) {
  return e.filter((n) => n.role === t);
}
function Il(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const Dl = ["id", "entityKey", "entityLabel"];
function De(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (Dl.includes(n))
      return t[n];
  }
}
function Ta(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function Ol(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function Bl(e, t) {
  if (e == null || e === "") return Tn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? Rl(n) : String(e);
  }
  return t === "date" ? Fl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Tn : String(e);
}
function Ht(e, t) {
  const n = De(e, t);
  return e.format ? e.format(n, t) : Bl(n, e.kind);
}
function ql(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function ms(e, t) {
  const n = Ht(e, t), a = ql(De(e, t));
  return a && a !== n ? a : n;
}
function on(e, t) {
  return e ? Ht(e, t) : "";
}
function za(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Kl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function La(e) {
  return [Kl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function zn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Vl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Wl(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let l = 0; l < e.length; l++) {
    const r = e[l];
    if (a) {
      r === a ? a = null : n += r;
      continue;
    }
    if (r === '"' || r === "'") {
      a = r;
      continue;
    }
    if (/\s/.test(r)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(l + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += r;
  }
  return s(), t;
}
function Re(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Wl(t)) {
    const l = s.toUpperCase();
    if (l === "AND" || l === "&&") continue;
    if (l === "OR" || l === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const r = s.length > 1 && s.startsWith("-"), o = r ? s.slice(1) : s, i = r ? { negated: !0 } : {}, c = Vl.exec(o);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...i
    }) : a.push({ kind: "text", value: o, ...i });
  }
  return a.length && n.push(a), n;
}
const Cn = (e) => e.toLowerCase().replace(/\s+/g, ""), Ul = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function Hl(e, t, n) {
  const a = Cn(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const l = s.find(
    (c) => c.key === e || c.field === e || c.label !== void 0 && Cn(c.label) === a
  );
  if (l) return De(l, t);
  const r = n.facets.find((c) => Cn(c.label) === a);
  if (r && r.key in t.fields) return t.fields[r.key];
  const o = Ul.find(([c]) => c === a)?.[1];
  if (o) {
    const c = qe(s, o);
    if (c) return De(c, t);
  }
  const i = /^metric(\d+)$/.exec(a);
  if (i) {
    const c = vs(s, "metric")[Number(i[1]) - 1];
    if (c) return De(c, t);
  }
}
function Sn(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function Ra(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function jl(e, t, n) {
  if (e.kind === "text") {
    const r = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const i = qe(r, o), c = i ? De(i, t) : void 0;
      return typeof c == "string" && Sn(c, e.value);
    });
  }
  const a = Hl(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (o) => e.comparator === "=" ? Ra(String(o), e.value) : Sn(String(o), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof a == "boolean") {
      const r = e.value.toLowerCase();
      return r === "true" || r === "yes" ? a : r === "false" || r === "no" ? !a : null;
    }
    if (typeof a == "number") {
      const r = Number(e.value);
      return Number.isFinite(r) ? a === r : null;
    }
    return e.comparator === "=" ? Ra(String(a), e.value) : Sn(String(a), e.value);
  }
  const s = Number(e.value), l = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(l) ? null : Xl(e.comparator, l, s);
}
function Fa(e, t, n) {
  const a = jl(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function Xl(e, t, n) {
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
function Na(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
function Gl(e, t, n) {
  return e.length ? e.some((a) => {
    const s = /* @__PURE__ */ new Map();
    for (const l of a)
      Na(l) && s.set(l.field, (s.get(l.field) ?? !1) || Fa(l, t, n));
    return a.every(
      (l) => Na(l) ? s.get(l.field) === !0 : Fa(l, t, n)
    );
  }) : !0;
}
function Ia(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function jt(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Ia(e.value) : `${t}${e.field}${e.comparator}${Ia(e.value)}`;
}
function Ud(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ft(e) {
  return e.filter((t) => t.length).map((t) => t.map(jt).join(" ")).join(" OR ");
}
function Yl(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((l, r) => r !== n) : a).filter((a) => a.length);
}
function Ql(e) {
  const t = Re(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(jt).join(" ")
  };
}
function Da(e, t) {
  return [...e.map(jt), t.trim()].filter(Boolean).join(" ");
}
const Oa = (e, t) => e.toLowerCase() === t.toLowerCase();
function _n(e, t) {
  return !!e.negated == !!t.negated && hs(e, t);
}
function Vt(e, t) {
  return !!e.negated != !!t.negated && hs(e, t);
}
function hs(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Oa(e.value, t.value) : t.kind === "text" && Oa(e.value, t.value);
}
function Zl(e, t) {
  return t.filter((n) => !e.some((a) => _n(a, n)));
}
function Xn(e, t) {
  return gs(e, t, (n) => n);
}
function Jl(e, t) {
  return gs(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((l) => Vt(s, l)))
  );
}
function gs(e, t, n) {
  const a = Re(e), s = Re(t);
  return a.length ? s.length ? ft(
    a.flatMap(
      (l) => s.map((r) => [...n(l, r), ...Zl(l, r)])
    )
  ) : ft(a) : ft(s);
}
const Ba = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function _s(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const er = 7, tr = 3;
function nr(e, t, n, a) {
  const s = (t * er + rn(n)) % a, l = [];
  for (let r = 0; r < Math.min(tr, a); r++)
    l.push(_s(e, (s + r) % a));
  return l;
}
function ar(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? sr(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function sr(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let l = 0; l < n; l++) s.add((a + l) % e.length);
  return [...s].sort((l, r) => l - r).map((l) => e[l]);
}
function lr(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: l } = t, r = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${r}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return nn[n % nn.length];
    case "updated":
      return l;
    case "tint":
      return Ba[n % Ba.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return nn[n % nn.length];
    case "date":
      return l;
    default:
      return;
  }
}
function rr(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), l = e.samples, r = t.scopes ?? [];
  if (!l.length) return [];
  const o = [];
  for (let i = 0; i < n; i++) {
    const c = l[i % l.length], d = Math.floor(i / l.length), h = rn(`${a}:${e.key}:${c[0]}:${i}`), w = _s(e.key, i), $ = new Date(s.getTime() - h % 900 * 36e5).toISOString(), x = {};
    for (const A of e.columns ?? []) {
      const y = A.field ?? A.key;
      if (!y || A.value) continue;
      const b = lr(A, {
        hash: rn(`${h}:${y}`),
        sample: c,
        revision: d,
        updatedAt: $
      });
      b !== void 0 && (x[y] = b);
    }
    for (const A of e.facets)
      x[A.key] = ar(A, rn(`${h}:${A.key}`));
    for (const [A, y] of r)
      x[A] = y === e.key ? w : nr(y, i, A, n);
    o.push({ id: w, entityKey: e.key, entityLabel: e.label, fields: x });
  }
  return o;
}
function or(e, t) {
  for (const [n, a] of Object.entries(t)) {
    const s = e.fields[n];
    switch (a.kind) {
      case "chips": {
        if (!a.selected.length) break;
        if (Array.isArray(s)) {
          if (!s.some((l) => a.selected.includes(String(l)))) return !1;
          break;
        }
        if (typeof s != "string" || !a.selected.includes(s)) return !1;
        break;
      }
      case "range": {
        if (a.min === null && a.max === null) break;
        const l = typeof s == "number" ? s : Number(s);
        if (!Number.isFinite(l) || a.min !== null && l < a.min || a.max !== null && l > a.max) return !1;
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
function ir(e, t) {
  const n = e.find((r) => r.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", l = a === "date" || n.role === "updated";
  return (r, o) => {
    const i = De(n, r), c = De(n, o);
    return s ? Number(c ?? 0) - Number(i ?? 0) : l ? Date.parse(String(c ?? "")) - Date.parse(String(i ?? "")) : String(c ?? "").localeCompare(String(i ?? ""));
  };
}
function cr(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const l = t.get(a.key);
    if (l) return l;
    const r = e.scopes ?? s.entities.flatMap(
      (i) => i.scope ? [[i.scope, i.key]] : []
    ), o = rr(a, { ...e, scopes: r });
    return t.set(a.key, o), o;
  };
  return {
    query({ query: a, schema: s, entity: l, limit: r, offset: o }) {
      const i = Re(a.expr), c = l ? [l] : s.entities, d = [], h = [];
      for (const x of c)
        for (const A of n(x, s))
          d.push(A), (l ? or(A, a.facets) : !0) && Gl(i, A, x) && h.push(A);
      const w = rt(l, a.sort, s), $ = h.sort(ir(is(l, s), w.key));
      return a.dir === "asc" && $.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: $.slice(o, o + r),
        total: h.length,
        unfiltered: h.length === d.length
      };
    }
  };
}
function Gn(e, t) {
  return ys(e, t.id);
}
function ys(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function Yn(e, t) {
  return Gn(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function Qn(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Re(t).flat();
  if (!a) return n;
  const s = Re(n);
  return s.some((o) => o.some((i) => _n(i, a))) ? n : s.some((o) => o.some((i) => Vt(i, a))) ? ft(
    s.map(
      (o) => o.map((i) => Vt(i, a) ? a : i)
    )
  ) : `${n} ${t}`;
}
function ws(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function ks(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Re(t).flat();
  if (!n) return null;
  const a = Re(e).flat();
  return a.some((s) => _n(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Vt(s, n)) ? n.negated ? "in" : "out" : null;
}
function bs(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Re(t).flat();
  if (!n) return e;
  const a = Re(e), s = a.map(
    (l) => l.filter((r) => !_n(r, n) && !Vt(r, n))
  );
  return s.every((l, r) => l.length === a[r]?.length) ? e : ft(s);
}
function qa(e, t, n) {
  return t ? n === null ? bs(e, t) : Qn(e, n === "out" ? ws(t) : t) : e;
}
function We(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey ? { exclude: !0 } : {};
}
function ur(e, t, n, a = {}) {
  const s = Yn(e, n);
  return Qn(t.expr, a.exclude ? ws(s) : s);
}
function $s(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Re(t), s = a.map(
    (l) => l.filter((r) => r.kind !== "field" || r.field !== n)
  );
  return s.every((l, r) => l.length === a[r]?.length) ? t : ft(s);
}
function xs(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
const Cs = Symbol("dc.shellContext");
function dr(e) {
  return Bn(Cs, e), e;
}
function ke() {
  const e = Ct(Cs, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Zn = "e", Jn = "v", ea = "s", ta = "d", na = "q", aa = "p", sa = "f_", Ss = "*", fr = [
  Zn,
  Jn,
  ea,
  ta,
  na,
  aa
], Ln = "..", Ms = ",", pr = [
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
function Mn(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of pr) t = t.replace(n, a);
  return t;
}
function et(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function Es(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), l = s === -1 ? a : a.slice(0, s), r = s === -1 ? "" : a.slice(s + 1);
    n.push([et(l), r]);
  }
  return n;
}
function vr(e) {
  return fr.includes(e) || e.startsWith(sa);
}
function Ka(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function mr(e, t) {
  const n = et(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(Ms).map((l) => l.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((l) => a.has(l)) };
    }
    case "range": {
      const a = n.indexOf(Ln), s = (a === -1 ? n : n.slice(0, a)).trim(), l = (a === -1 ? "" : n.slice(a + Ln.length)).trim(), r = s === "" ? null : Number(s), o = l === "" ? null : Number(l);
      let i = r !== null && Number.isFinite(r) ? Ka(r, e.min, e.max) : null, c = o !== null && Number.isFinite(o) ? Ka(o, e.min, e.max) : null;
      return i !== null && c !== null && i > c && ([i, c] = [c, i]), { kind: "range", min: i, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function hr(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(Ms) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Ln}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function gr(e, t, n = {}) {
  const a = jn(t, n), s = new Map(Es(e)), l = s.get(Zn), r = l === void 0 ? a.entity : et(l), o = r === Ss ? null : wt(t, r), i = s.get(Jn), c = i && rs(et(i)) ? et(i) : a.view, d = s.get(ea), h = rt(o, d ? et(d) : n.sort, t), w = s.get(ta), $ = w ? et(w) === "asc" ? "asc" : "desc" : a.dir, x = s.get(na), A = s.get(aa), y = A === void 0 ? 1 : Number(et(A)), b = Number.isFinite(y) ? Math.max(1, Math.floor(y)) : 1, L = {};
  for (const T of o?.facets ?? []) {
    const z = s.get(`${sa}${T.key}`);
    L[T.key] = z === void 0 ? Wn(T) : mr(T, z);
  }
  return {
    entity: o?.key ?? null,
    view: c,
    sort: h.key,
    dir: $,
    expr: x === void 0 ? "" : et(x),
    facets: ps(o, L),
    page: b
  };
}
function Va(e, t, n = {}, a = "") {
  const s = jn(t, n), l = wt(t, e.entity), r = Es(a).filter(([h]) => !vr(h)), o = [], i = (h, w) => o.push([h, Mn(w)]), c = l?.key ?? null;
  c !== s.entity && i(Zn, c ?? Ss), e.view !== s.view && i(Jn, e.view), e.sort !== s.sort && i(ea, e.sort), e.dir !== s.dir && i(ta, e.dir), e.expr.trim() !== "" && i(na, e.expr);
  for (const h of l?.facets ?? []) {
    const w = e.facets[h.key];
    if (!w) continue;
    const $ = hr(w, h);
    $ !== null && o.push([`${sa}${h.key}`, Mn($)]);
  }
  e.page > 1 && i(aa, String(e.page));
  const d = [
    ...r.map(([h, w]) => [Mn(h), w]),
    ...o
  ];
  return d.length ? `?${d.map(([h, w]) => w === "" ? h : `${h}=${w}`).join("&")}` : "";
}
const mn = "entity", Wt = "expr";
function _r(e, t) {
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
      const a = t.min !== null && t.max !== null ? `${t.min} ≤ ${n} ≤ ${t.max}` : t.max !== null ? `${n} ≤ ${t.max}` : `${n} ≥ ${t.min}`;
      return [{ id: e.key, label: a, facetKey: e.key }];
    }
    case "toggle":
      return t.on ? [{ id: e.key, label: `${n}:on`, facetKey: e.key }] : [];
  }
}
function la(e, t) {
  const n = [];
  t && n.push({
    id: mn,
    label: `entity:${t.key}`,
    facetKey: mn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && us(s) && n.push(..._r(a, s));
  }
  return Re(e.expr).forEach((a, s) => {
    a.forEach((l, r) => {
      n.push({
        id: `${Wt}:${s}:${r}`,
        label: jt(l),
        facetKey: Wt,
        group: s,
        index: r,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function yr(e, t, n = null) {
  if (Un(e)) {
    const l = rt(t, e.sort, n);
    return `everything · ${e.view} · ${l.label}`;
  }
  const a = la(e, t).filter((l) => l.facetKey !== Wt).map((l) => l.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function wr(e) {
  const { adapter: t } = e, n = v(() => Ft(e.schema)), a = v(() => Ft(e.defaults) ?? {}), s = v(() => gr(t.search.value, n.value, a.value)), l = v(() => wt(n.value, s.value.entity)), r = v(() => l.value ?? os(n.value, a.value)), o = v(() => cs(l.value, n.value)), i = v(() => rt(l.value, s.value.sort, n.value)), c = (y, b) => {
    const L = Va(y, n.value, a.value, t.search.value);
    L !== t.search.value && (b === "push" ? t.push(L) : t.replace(L));
  }, d = () => Ft(e.navigationMode) ?? "push", h = () => Ft(e.facetNavigationMode) ?? "replace", w = (y, b) => {
    const L = y.page ?? (Aa(y) ? 1 : s.value.page);
    c({ ...s.value, ...y, page: L }, b);
  }, $ = (y, b) => {
    const L = s.value.facets[y];
    if (!L) return;
    const T = { ...s.value.facets, [y]: b(L) };
    w({ facets: T }, h());
  }, x = (y) => {
    const b = y === null ? null : wt(n.value, y);
    return (b?.key ?? null) === s.value.entity ? {} : {
      entity: b?.key ?? null,
      sort: rt(b, s.value.sort, n.value).key,
      facets: Et(b)
    };
  }, A = (y) => {
    const b = x(y);
    Object.keys(b).length && w(b, d());
  };
  return {
    query: s,
    entity: l,
    focus: r,
    sort: i,
    sorts: o,
    summary: v(() => yr(s.value, l.value, n.value)),
    terms: v(() => la(s.value, l.value)),
    isPristine: v(() => Un(s.value)),
    isEverything: v(() => s.value.entity === null),
    hasFacets: v(() => ds(s.value.facets)),
    setEntity: A,
    clearEntity: () => A(null),
    setView(y) {
      w({ view: y }, d());
    },
    setSort(y) {
      w({ sort: rt(l.value, y, n.value).key }, d());
    },
    toggleDirection() {
      w({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(y) {
      w({ expr: y }, d());
    },
    narrow(y, b, L) {
      w({ expr: y, ...x(b), ...L ? { view: L } : {} }, d());
    },
    setPage(y, b) {
      w({ page: Math.max(1, Math.floor(y)) }, b ?? d());
    },
    setFacet(y, b) {
      $(y, () => b);
    },
    toggleChip(y, b) {
      $(y, (L) => L.kind !== "chips" ? L : { kind: "chips", selected: L.selected.includes(b) ? L.selected.filter((z) => z !== b) : [...L.selected, b] });
    },
    setRange(y, b, L) {
      $(y, (T) => T.kind === "range" ? { kind: "range", min: b, max: L } : T);
    },
    toggleFlag(y) {
      $(
        y,
        (b) => b.kind === "toggle" ? { kind: "toggle", on: !b.on } : b
      );
    },
    removeTerm(y) {
      if (y.facetKey === mn) {
        A(null);
        return;
      }
      if (y.facetKey === Wt) {
        const b = Yl(Re(s.value.expr), y.group ?? 0, y.index ?? 0);
        w({ expr: ft(b) }, d());
        return;
      }
      $(y.facetKey, (b) => b.kind === "chips" && y.option ? { kind: "chips", selected: b.selected.filter((L) => L !== y.option) } : b.kind === "range" ? { kind: "range", min: null, max: null } : b.kind === "toggle" ? { kind: "toggle", on: !1 } : b);
    },
    clearFilters() {
      w({ entity: null, expr: "", facets: Et(null) }, d());
    },
    reset() {
      c(jn(n.value, a.value), d());
    },
    hrefFor(y) {
      const b = { ...s.value, ...y };
      return b.page = y.page ?? (Aa(y) ? 1 : s.value.page), b.facets = ps(wt(n.value, b.entity), b.facets), `${t.path.value}${Va(b, n.value, a.value, t.search.value)}`;
    }
  };
}
function kr(e) {
  const t = St([]), n = V(0), a = V(!1), s = St(null);
  let l = 0, r = null;
  const o = v(() => (e.query.value.page - 1) * e.limit.value), i = v(() => Ll(n.value, e.limit.value)), c = () => {
    const y = e.query.value, b = e.within?.value.trim(), L = $s(e.entity.value, y.expr);
    return b ? { ...y, expr: Xn(b, L) } : L === y.expr ? y : { ...y, expr: L };
  }, d = (y) => {
    t.value = y.rows, n.value = y.total, s.value = null;
  }, h = (y) => {
    s.value = y, t.value = [], n.value = 0;
  }, w = (y, b) => {
    let L = !0;
    const T = () => y === l, z = () => {
      L && (L = !1, t.value = [], n.value = 0), s.value = null;
    };
    return {
      get open() {
        return T();
      },
      insert(I, U) {
        if (!T()) return;
        const _ = Array.isArray(I) ? I : [I];
        if (!_.length) return;
        z();
        const M = [...t.value];
        M.splice(U ?? M.length, 0, ..._), t.value = b > 0 ? M.slice(0, b) : M, n.value += _.length;
      },
      set(I) {
        T() && (I.rows && (z(), t.value = b > 0 ? I.rows.slice(0, b) : I.rows, n.value = I.rows.length), I.total !== void 0 && (n.value = I.total));
      },
      close() {
        T() && (a.value = !1);
      },
      fail(I) {
        T() && (h(I), a.value = !1);
      }
    };
  }, $ = () => {
    const y = r;
    r = null, y?.();
  }, x = () => {
    const y = ++l;
    $();
    const b = {
      query: c(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: o.value
    }, L = e.source.value;
    if (L.stream) {
      a.value = !0;
      try {
        r = L.stream(b, w(y, b.limit)) ?? null;
      } catch (z) {
        h(z), a.value = !1;
      }
      return;
    }
    let T;
    try {
      T = L.query(b);
    } catch (z) {
      h(z);
      return;
    }
    if (!(T instanceof Promise)) {
      d(T), a.value = !1;
      return;
    }
    a.value = !0, T.then((z) => {
      y === l && d(z);
    }).catch((z) => {
      y === l && h(z);
    }).finally(() => {
      y === l && (a.value = !1);
    });
  }, A = v(() => {
    const y = c();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(fs.map((L) => y[L]))}|${y.page}`;
  });
  return we([e.source, A, e.limit], x, {
    immediate: !0
  }), ns(() => {
    l++, $();
  }, !0), { rows: t, total: n, offset: o, pageCount: i, pending: a, error: s, refresh: x };
}
const Dt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, br = ["aria-label"], $r = ["role", "aria-label"], xr = ["data-dc-item"], Cr = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Sr = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Mr = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Er = { class: "dc-menu__label dc-truncate" }, Pr = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Ar = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, Tr = /* @__PURE__ */ re({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = V(null), r = V([]), o = V(null), i = V(null), c = V(null), d = V(!1), h = v(
      () => a.items.flatMap((_, M) => Dt(_) ? [M] : [])
    ), w = v(() => {
      const _ = [{ entries: [] }];
      return a.items.forEach((M, D) => {
        M.heading ? _.push({ heading: M, entries: [] }) : _[_.length - 1]?.entries.push({ item: M, index: D });
      }), _.filter((M) => M.entries.length > 0);
    }), $ = V({ x: a.at.x, y: a.at.y });
    async function x() {
      $.value = { x: a.at.x, y: a.at.y }, await Kt();
      const _ = l.value?.getBoundingClientRect();
      if (!_) return;
      const M = 8;
      let D = a.at.x, j = a.at.y;
      if (D + _.width > window.innerWidth - M) {
        const ue = a.at.mirrorX === void 0 ? null : a.at.mirrorX - _.width;
        D = ue !== null && ue >= M ? ue : window.innerWidth - _.width - M;
      }
      j + _.height > window.innerHeight - M && (j = window.innerHeight - _.height - M), $.value = { x: Math.max(M, D), y: Math.max(M, j) };
    }
    const A = v(() => ({ left: `${$.value.x}px`, top: `${$.value.y}px` }));
    function y(_) {
      o.value = _, _ !== null && Kt(() => r.value[_]?.focus());
    }
    function b(_, M) {
      const D = h.value;
      if (D.length === 0) return null;
      if (_ === null) return M === 1 ? D[0] ?? null : D[D.length - 1] ?? null;
      const j = D.indexOf(_);
      return j === -1 ? D[0] ?? null : D[(j + M + D.length) % D.length] ?? null;
    }
    function L(_, M) {
      if (!a.items[_]?.items?.length) return;
      const j = r.value[_]?.getBoundingClientRect(), ue = l.value?.getBoundingClientRect();
      !j || !ue || (c.value = { x: ue.right - 4, y: j.top - 4, mirrorX: ue.left + 4 }, i.value = _, d.value = M);
    }
    function T(_) {
      const M = i.value;
      i.value = null, c.value = null, _ && M !== null && y(M);
    }
    function z(_) {
      const M = a.items[_];
      if (!(!M || !Dt(M))) {
        if (M.items?.length) {
          L(_, !0);
          return;
        }
        s("choose", M);
      }
    }
    function I(_) {
      const M = _.key;
      if (M === "Escape") {
        _.preventDefault(), _.stopPropagation(), i.value !== null ? T(!0) : s("dismiss");
        return;
      }
      if (M === "ArrowDown" || M === "ArrowUp") {
        _.preventDefault(), _.stopPropagation(), T(!1), y(b(o.value, M === "ArrowDown" ? 1 : -1));
        return;
      }
      if (M === "Home" || M === "End") {
        _.preventDefault(), _.stopPropagation(), T(!1), y(b(null, M === "Home" ? 1 : -1));
        return;
      }
      if (M === "ArrowRight") {
        const D = o.value;
        D !== null && a.items[D]?.items?.length && (_.preventDefault(), _.stopPropagation(), L(D, !0));
        return;
      }
      if (M === "ArrowLeft") {
        i.value !== null && (_.preventDefault(), _.stopPropagation(), T(!0));
        return;
      }
      if (M === "Enter" || M === " ") {
        const D = o.value;
        if (D === null) return;
        _.preventDefault(), _.stopPropagation(), z(D);
      }
    }
    function U(_) {
      const M = a.items[_];
      !M || !Dt(M) || (i.value !== null && i.value !== _ && T(!1), y(_), M.items?.length && L(_, !1));
    }
    return xl(() => {
      x(), a.autofocus && y(b(null, 1));
    }), we(() => a.at, x, { deep: !0 }), we(() => a.items, () => void x(), { deep: !0 }), Ve(() => {
      i.value = null;
    }), t({ root: l }), (_, M) => {
      const D = as("MenuList", !0);
      return f(), m("div", {
        ref_key: "root",
        ref: l,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Le(A.value),
        onKeydown: I
      }, [
        (f(!0), m(ae, null, ve(w.value, (j, ue) => (f(), m("div", {
          key: `${ue}-${j.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: j.heading ? "group" : "none",
          "aria-label": j.heading?.label
        }, [
          j.heading ? (f(), m("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": j.heading.id
          }, N(j.heading.label), 9, xr)) : R("", !0),
          (f(!0), m(ae, null, ve(j.entries, ({ item: Q, index: _e }) => (f(), m(ae, {
            key: Q.id ?? `${_e}-${Q.label ?? ""}`
          }, [
            Q.separator ? (f(), m("div", Cr)) : (f(), m("button", {
              key: 1,
              ref_for: !0,
              ref: (xe) => {
                xe && (r.value[_e] = xe);
              },
              type: "button",
              class: "dc-menu__item",
              role: Q.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": Q.checked === void 0 ? void 0 : Q.checked,
              "aria-haspopup": Q.items?.length ? "menu" : void 0,
              "aria-expanded": Q.items?.length ? i.value === _e : void 0,
              "aria-disabled": Q.disabled ? "true" : void 0,
              disabled: Q.disabled,
              "data-dc-item": Q.id,
              tabindex: "-1",
              onClick: (xe) => z(_e),
              onMouseenter: (xe) => U(_e)
            }, [
              k("span", Mr, N(Q.checked ? "✓" : ""), 1),
              k("span", Er, N(Q.label), 1),
              Q.shortcut ? (f(), m("span", Pr, N(Q.shortcut), 1)) : Q.items?.length ? (f(), m("span", Ar, "›")) : R("", !0)
            ], 40, Sr))
          ], 64))), 128))
        ], 8, $r))), 128)),
        i.value !== null && c.value ? (f(), ne(D, {
          key: i.value,
          items: e.items[i.value]?.items ?? [],
          at: c.value,
          label: e.items[i.value]?.label,
          autofocus: d.value,
          onChoose: M[0] || (M[0] = (j) => s("choose", j)),
          onDismiss: M[1] || (M[1] = (j) => T(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
      ], 44, br);
    };
  }
}), ce = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, ra = /* @__PURE__ */ ce(Tr, [["__scopeId", "data-v-9b1413fa"]]), zr = { class: "dc-pick" }, Lr = ["id"], Rr = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], Fr = { class: "dc-pick__label" }, Nr = /* @__PURE__ */ re({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = qn() ?? "dc-pick", l = V(null), r = V(null), o = V(null), i = V(!1), c = v(() => o.value !== null), d = v(
      () => n.options.find((T) => T.key === n.modelValue) ?? n.options[0]
    ), h = v(
      () => n.options.map((T) => ({
        id: T.key,
        label: T.label,
        checked: T.key === n.modelValue
      }))
    ), w = v(
      () => o.value ? { maxHeight: `${window.innerHeight - o.value.y - 8}px` } : void 0
    );
    function $(T) {
      const z = l.value?.getBoundingClientRect();
      z && (o.value = { x: z.left, y: z.bottom + 4, mirrorX: z.right }, i.value = T, a("open"));
    }
    function x(T) {
      o.value = null, T && l.value?.focus();
    }
    function A() {
      c.value ? x(!0) : $(!1);
    }
    function y(T) {
      T.key !== "ArrowDown" && T.key !== "ArrowUp" || c.value || (T.preventDefault(), $(!0));
    }
    function b(T) {
      const z = T.target;
      z && (l.value?.contains(z) || r.value?.root?.contains(z) || x(!1));
    }
    we(c, (T) => {
      T ? window.addEventListener("pointerdown", b, !0) : window.removeEventListener("pointerdown", b, !0);
    }), Ve(() => window.removeEventListener("pointerdown", b, !0));
    function L(T) {
      x(!0), !(T.id === void 0 || T.id === n.modelValue) && a("update:modelValue", T.id);
    }
    return (T, z) => (f(), m("span", zr, [
      k("span", {
        id: `${P(s)}-name`,
        class: "dc-pick__name"
      }, N(e.label), 9, Lr),
      k("button", {
        id: `${P(s)}-value`,
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: Mt(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${P(s)}-name ${P(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: A,
        onKeydown: y
      }, [
        k("span", Fr, N(d.value?.label), 1)
      ], 42, Rr),
      z[1] || (z[1] = k("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      o.value ? (f(), ne(ra, {
        key: 0,
        ref_key: "menu",
        ref: r,
        class: "dc-pick__list",
        style: Le(w.value),
        items: h.value,
        at: o.value,
        label: e.label,
        autofocus: i.value,
        onChoose: L,
        onDismiss: z[0] || (z[0] = (I) => x(!0))
      }, null, 8, ["style", "items", "at", "label", "autofocus"])) : R("", !0)
    ]));
  }
}), Wa = /* @__PURE__ */ ce(Nr, [["__scopeId", "data-v-b2ce0fd5"]]);
function Ir(e) {
  const t = St(/* @__PURE__ */ new Map()), n = V(!0);
  let a = 0;
  return { counts: t, pristine: n, refresh: () => {
    const l = ++a, r = e.query.value, o = e.schema.value, i = e.entities.value, c = e.within?.value.trim() ?? "";
    n.value = r.expr.trim() === "" && !c;
    const d = /* @__PURE__ */ new Map();
    for (const h of i) {
      const w = $s(h, r.expr), $ = c ? Xn(c, w) : w, x = e.source.value.query({
        query: { ...r, entity: h.key, expr: $, facets: Et(h), page: 1 },
        schema: o,
        entity: h,
        limit: 0,
        offset: 0
      });
      x instanceof Promise ? (d.set(h.key, { total: 0, pending: !0 }), x.then((A) => {
        if (l !== a) return;
        const y = new Map(t.value);
        y.set(h.key, { total: A.total, pending: !1 }), t.value = y;
      })) : d.set(h.key, { total: x.total, pending: !1 });
    }
    t.value = d;
  } };
}
const Dr = 25, Ps = (e, t) => e.toLowerCase() === t.toLowerCase();
function Or(e, t) {
  return e.find((n) => Ps(n.id, t));
}
function Br(e) {
  const t = St(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (o) => {
    if (o.facetKey !== Wt || !o.field || !o.value) return null;
    const i = xs(e.schema.value, o.field);
    return i ? { entity: i, id: o.value, key: `${i.key}:${o.value}` } : null;
  }, s = (o) => {
    const { entity: i, id: c } = o, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: i.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: ys(i, c) ?? "",
        facets: Et(i),
        sort: rt(i, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: i,
      limit: Dr,
      offset: 0
    });
  }, l = (o, i) => {
    const c = on(qe(o.columns ?? [], "identity"), i);
    return c === Tn || Ps(c, i.id) ? "" : c;
  }, r = () => {
    const o = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const h = a(d);
      h && !t.value.has(h.key) && !n.has(h.key) && o.set(h.key, h);
    }
    if (!o.size) return;
    const i = [...o.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const h = new Map(t.value);
      d.forEach((w, $) => {
        const { reference: x } = i[$], A = Or(w.rows, x.id);
        h.set(x.key, A ? l(x.entity, A) : "");
      }), t.value = h;
    };
    if (i.every(({ outcome: d }) => !(d instanceof Promise))) {
      c(i.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of i) n.add(d.key);
    Promise.all(i.map(({ outcome: d }) => Promise.resolve(d))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: d } of i) n.delete(d.key);
    });
  };
  return we([e.source, e.schema, e.terms], () => {
    try {
      r();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(o) {
      const i = a(o);
      return i && t.value.get(i.key) || null;
    }
  };
}
const qr = ["data-dc-expanded"], Kr = { class: "dc-header__domain" }, Vr = {
  key: 0,
  class: "dc-header__within"
}, Wr = ["title"], Ur = ["data-dc-more", "title"], Hr = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, jr = ["title", "aria-label", "onClick"], Xr = ["onKeydown"], Gr = ["aria-expanded", "aria-controls"], Yr = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Qr = { class: "dc-header__sr" }, Zr = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Jr = ["disabled"], eo = ["title"], to = ["value", "onKeydown"], no = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, ao = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, so = ["disabled"], lo = {
  key: 1,
  class: "dc-header__actions"
}, ro = /* @__PURE__ */ re({
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
    const n = e, a = t, s = ke(), l = v(() => s.schema.value), r = v(
      () => s.hasFacets.value || !!s.query.value.expr.trim() || !!s.within.value
    ), o = v(() => l.value.formatCount ?? _t), i = Ir({
      source: s.source,
      schema: s.schema,
      query: s.query,
      entities: s.entities,
      within: s.within
    });
    function c(O) {
      if (n.hideCount) return O.count;
      if (O.key === s.query.value.entity && r.value) return o.value(s.total.value);
      if (i.pristine.value) return O.count;
      const S = i.counts.value.get(O.key);
      return S ? `${S.pending ? "~" : ""}${o.value(S.total)}` : O.count;
    }
    function d(O) {
      return `${O.label} · ${c(O)}`;
    }
    const h = v(() => [
      { key: "", label: "Everything" },
      ...s.entities.value.map((O) => ({ key: O.key, label: d(O) }))
    ]), w = v(() => {
      const O = s.within.value.trim();
      return O ? la({ ...s.query.value, expr: O, facets: {} }, null) : [];
    }), $ = v(
      () => (n.views ?? [...ls]).map((O) => ({ key: O, label: Tl[O] }))
    ), x = v(() => Vn(s.query.value.view, n.views)), A = v(() => s.query.value.entity !== null);
    function y(O) {
      s.setView(O);
    }
    const b = v(() => {
      const O = s.entity.value, G = O?.keepsScope ? void 0 : O?.scope?.toLowerCase();
      return s.terms.value.filter((S) => S.facetKey !== mn).map((S, W, te) => {
        const Ce = te[W - 1];
        return {
          term: S,
          or: Ce?.group !== void 0 && S.group !== void 0 && S.group !== Ce.group,
          idle: !!G && S.field?.toLowerCase() === G
        };
      });
    }), L = Br({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: v(() => [...w.value, ...s.terms.value])
    });
    function T(O) {
      return xs(l.value, O)?.scopeLabel ?? O;
    }
    function z(O) {
      return O.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function I(O) {
      const G = L.nameOf(O);
      return G ? `${O.negated ? "-" : ""}${T(O.field)}: ${z(G)}` : O.label;
    }
    function U(O) {
      s.setEntity(O || null);
    }
    const _ = V(""), M = V(null);
    function D() {
      const O = _.value.trim();
      O && (s.setExpression(Jl(s.query.value.expr, O)), _.value = "");
    }
    function j() {
      _.value = "", M.value?.blur();
    }
    function ue(O) {
      if (_.value) return;
      const G = b.value.at(-1);
      G && (O.preventDefault(), s.removeTerm(G.term));
    }
    function Q(O) {
      O.target?.closest("button, select, label, input") || a("toggle");
    }
    const _e = V(null), xe = V("");
    function C() {
      const O = _e.value;
      if (!O) {
        xe.value = "";
        return;
      }
      const G = O.scrollLeft > 1, S = O.scrollWidth - O.clientWidth - O.scrollLeft > 1;
      xe.value = G && S ? "both" : G ? "start" : S ? "end" : "";
    }
    let q = null;
    we(
      _e,
      (O) => {
        q?.disconnect(), q = null, C(), !(!O || typeof ResizeObserver > "u") && (q = new ResizeObserver(C), q.observe(O));
      },
      { flush: "post" }
    ), we(b, C, { flush: "post" }), Ve(() => q?.disconnect());
    const H = v(() => s.query.value.page), se = v(
      () => (s.pageCount.value > 1 || !!n.pagesNote) && !Hn(s.query.value)
    ), he = v(
      () => `${s.pending.value ? "~" : ""}${_t(s.pageCount.value)}`
    ), Me = v(() => {
      let O = `Page ${_t(H.value)} of ${he.value}`;
      const G = s.rows.value.length;
      if (G) {
        const S = s.offset.value + 1, W = `${s.pending.value ? "~" : ""}${_t(s.total.value)}`;
        O += ` — rows ${_t(S)} to ${_t(S + G - 1)} of ${W}`;
      }
      return n.pagesNote ? `${O}
${n.pagesNote}` : O;
    }), Te = V(null), He = v(() => Te.value ?? String(H.value)), je = v(
      () => `calc(${Math.max(2, String(s.pageCount.value).length)}ch + 10px)`
    );
    function Xe(O) {
      O.target.select();
    }
    function Oe(O) {
      const G = O.target, S = G.value.replace(/[^0-9]/g, "");
      G.value !== S && (G.value = S), Te.value = S;
    }
    function Fe(O) {
      const G = O.target, S = Number(Te.value);
      Te.value = null;
      const W = Number.isFinite(S) && S >= 1 ? Math.min(Math.trunc(S), Math.max(1, s.pageCount.value)) : H.value;
      G.value = String(W), W !== H.value && s.setPage(W);
    }
    function Be(O) {
      const G = O.target;
      Te.value = null, G.value = String(H.value), G.blur();
    }
    return (O, G) => (f(), m("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      k("div", {
        class: "dc-header__trigger",
        onClick: Q
      }, [
        k("span", Kr, N(l.value.label), 1),
        w.value.length ? (f(), m("span", Vr, [
          G[4] || (G[4] = k("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), m(ae, null, ve(w.value, (S) => (f(), m("span", {
            key: `scope:${S.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: I(S)
          }, N(I(S)), 9, Wr))), 128))
        ])) : R("", !0),
        k("div", {
          ref_key: "termBar",
          ref: _e,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": xe.value,
          title: P(s).summary.value,
          onScroll: C
        }, [
          A.value ? (f(), ne(Wa, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": P(s).query.value.entity ?? "",
            options: h.value,
            onOpen: P(i).refresh,
            "onUpdate:modelValue": U
          }, null, 8, ["model-value", "options", "onOpen"])) : R("", !0),
          pe(Wa, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": x.value,
            options: $.value,
            "onUpdate:modelValue": y
          }, null, 8, ["model-value", "options"]),
          (f(!0), m(ae, null, ve(b.value, (S) => (f(), m(ae, {
            key: S.term.id
          }, [
            S.or ? (f(), m("span", Hr, "or")) : R("", !0),
            k("button", {
              type: "button",
              class: Mt(["dc-term dc-mono", { "dc-term--idle": S.idle }]),
              title: S.idle ? `Not applied to ${P(s).entity.value?.label} — remove ${I(S.term)}` : `Remove ${I(S.term)}`,
              "aria-label": `Remove ${I(S.term)}`,
              onClick: (W) => P(s).removeTerm(S.term)
            }, N(I(S.term)), 11, jr)
          ], 64))), 128)),
          fn(k("input", {
            ref_key: "searchBox",
            ref: M,
            "onUpdate:modelValue": G[0] || (G[0] = (S) => _.value = S),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              Ye(ze(D, ["prevent"]), ["enter"]),
              Ye(ze(j, ["prevent"]), ["esc"]),
              Ye(ue, ["backspace"])
            ]
          }, null, 40, Xr), [
            [pn, _.value]
          ])
        ], 40, Ur),
        k("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: G[1] || (G[1] = (S) => a("toggle"))
        }, [
          k("span", Yr, N(e.expanded ? "▲" : "▼"), 1),
          k("span", Qr, N(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Gr)
      ]),
      se.value ? (f(), m("nav", Zr, [
        k("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: H.value <= 1,
          onClick: G[2] || (G[2] = (S) => P(s).setPage(H.value - 1))
        }, [...G[5] || (G[5] = [
          k("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Jr),
        k("span", {
          class: "dc-header__page dc-mono",
          title: Me.value
        }, [
          k("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Le({ width: je.value }),
            value: He.value,
            onFocus: Xe,
            onInput: Oe,
            onKeydown: [
              Ye(ze(Fe, ["prevent"]), ["enter"]),
              Ye(ze(Be, ["prevent"]), ["esc"])
            ],
            onBlur: Fe
          }, null, 44, to),
          k("span", no, "/ " + N(he.value), 1)
        ], 8, eo),
        k("span", ao, N(Me.value), 1),
        k("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: H.value >= P(s).pageCount.value,
          onClick: G[3] || (G[3] = (S) => P(s).setPage(H.value + 1))
        }, [...G[6] || (G[6] = [
          k("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, so)
      ])) : R("", !0),
      O.$slots.actions ? (f(), m("div", lo, [
        be(O.$slots, "actions", {}, void 0, !0)
      ])) : R("", !0)
    ], 8, qr));
  }
}), As = /* @__PURE__ */ ce(ro, [["__scopeId", "data-v-270c68d0"]]), oo = { class: "dc-facet" }, io = ["id"], co = { class: "dc-facet__body" }, uo = ["aria-labelledby"], fo = ["aria-pressed", "data-dc-active", "onClick"], po = ["aria-labelledby"], vo = ["aria-label", "placeholder", "onKeydown"], mo = ["aria-label", "placeholder", "onKeydown"], ho = ["aria-checked"], go = { class: "dc-switch__text" }, _o = ["data-dc-active"], yo = /* @__PURE__ */ re({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = v(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function l(h) {
      if (n.value.kind !== "chips") return;
      const w = s.value.has(h) ? n.value.selected.filter(($) => $ !== h) : [...n.value.selected, h];
      a("update", { kind: "chips", selected: w });
    }
    const r = V(""), o = V("");
    we(
      () => n.value,
      (h) => {
        h.kind === "range" && (r.value = h.min === null ? "" : h.min, o.value = h.max === null ? "" : h.max);
      },
      { immediate: !0, deep: !0 }
    );
    function i(h) {
      if (typeof h == "number") return Number.isFinite(h) ? h : null;
      const w = h.trim();
      if (!w) return null;
      const $ = Number(w);
      return Number.isFinite($) ? $ : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const h = i(r.value), w = i(o.value);
      h === n.value.min && w === n.value.max || a("update", { kind: "range", min: h, max: w });
    }
    function d() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (h, w) => (f(), m("div", oo, [
      k("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, N(e.facet.label), 9, io),
      k("div", co, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), m("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), m(ae, null, ve(e.facet.options, ($) => (f(), m("button", {
            key: $,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has($),
            "data-dc-active": s.value.has($) ? "true" : "false",
            onClick: (x) => l($)
          }, N($), 9, fo))), 128))
        ], 8, uo)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), m("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          fn(k("input", {
            "onUpdate:modelValue": w[0] || (w[0] = ($) => r.value = $),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(ze(c, ["prevent"]), ["enter"])
          }, null, 40, vo), [
            [pn, r.value]
          ]),
          w[2] || (w[2] = k("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          fn(k("input", {
            "onUpdate:modelValue": w[1] || (w[1] = ($) => o.value = $),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(ze(c, ["prevent"]), ["enter"])
          }, null, 40, mo), [
            [pn, o.value]
          ])
        ], 8, po)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          k("span", go, N(e.facet.text), 1),
          k("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...w[3] || (w[3] = [
            k("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, _o)
        ], 8, ho)) : R("", !0)
      ])
    ]));
  }
}), Ts = /* @__PURE__ */ ce(yo, [["__scopeId", "data-v-36d1334b"]]), wo = ["id"], ko = { class: "dc-panel__section dc-panel__rows" }, bo = { class: "dc-panel__row" }, $o = ["for"], xo = ["title", "aria-label", "onClick"], Co = ["id", "placeholder", "onKeydown"], So = { class: "dc-panel__actions" }, Mo = ["disabled"], Eo = {
  key: 0,
  class: "dc-panel__section"
}, Po = /* @__PURE__ */ re({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Ut(), s = ke(), l = v(() => Ql(s.query.value.expr)), r = v(() => l.value.parts.map(jt)), o = V(l.value.text), i = V(null);
    we(
      () => l.value.text,
      (A) => {
        o.value = A;
      }
    );
    const c = v(() => o.value !== l.value.text);
    function d() {
      c.value && s.setExpression(Da(l.value.parts, o.value)), n("close");
    }
    function h(A) {
      const { parts: y, text: b } = l.value;
      s.setExpression(Da(y.filter((L, T) => T !== A), b));
    }
    function w(A) {
      const { parts: y } = l.value;
      o.value || !y.length || (A.preventDefault(), h(y.length - 1));
    }
    function $() {
      o.value = "", s.clearFilters();
    }
    function x(A, y) {
      s.setFacet(A, y);
    }
    return Kt(() => i.value?.focus()), (A, y) => (f(), m("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: y[2] || (y[2] = Ye(ze((b) => n("close"), ["stop"]), ["esc"]))
    }, [
      k("section", ko, [
        k("div", bo, [
          k("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, $o),
          k("div", {
            class: "dc-field",
            onMousedown: y[1] || (y[1] = ze((b) => i.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), m(ae, null, ve(r.value, (b, L) => (f(), m("button", {
              key: `${L}:${b}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${b}`,
              "aria-label": `Remove ${b}`,
              onClick: (T) => h(L)
            }, N(b), 9, xo))), 128)),
            fn(k("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: i,
              "onUpdate:modelValue": y[0] || (y[0] = (b) => o.value = b),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: r.value.length ? "" : P(s).schema.value.placeholder,
              onKeydown: [
                Ye(ze(d, ["prevent"]), ["enter"]),
                Ye(w, ["backspace"])
              ]
            }, null, 40, Co), [
              [pn, o.value]
            ])
          ], 32)
        ]),
        P(s).entity.value ? (f(!0), m(ae, { key: 0 }, ve(P(s).entity.value.facets, (b) => (f(), ne(Ts, {
          key: b.key,
          facet: b,
          value: P(s).query.value.facets[b.key],
          onUpdate: (L) => x(b.key, L)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : R("", !0),
        k("div", So, [
          k("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          k("button", {
            type: "button",
            class: "dc-button",
            disabled: P(s).isPristine.value && !c.value,
            onClick: $
          }, " Reset ", 8, Mo)
        ])
      ]),
      a["panel-section"] ? (f(), m("section", Eo, [
        be(A.$slots, "panel-section", {}, void 0, !0)
      ])) : R("", !0)
    ], 40, wo));
  }
}), zs = /* @__PURE__ */ ce(Po, [["__scopeId", "data-v-2642c02d"]]), Ao = ["checked", "indeterminate"], Ls = /* @__PURE__ */ re({
  __name: "PageTick",
  setup(e) {
    const t = ke(), n = v(() => t.rows.value.filter((l) => t.isSelected(l)).length), a = v(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = v(() => n.value > 0 && !a.value);
    return (l, r) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: r[0] || (r[0] = (o) => P(t).selectPage(!a.value))
    }, null, 40, Ao));
  }
}), To = {
  key: 0,
  class: "dc-actions"
}, zo = {
  key: 0,
  class: "dc-actions__select"
}, Lo = {
  key: 0,
  class: "dc-actions__all"
}, Ro = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, Fo = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, No = { class: "dc-actions__ops" }, Io = ["disabled"], Do = ["disabled"], Oo = /* @__PURE__ */ re({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ke(), a = v(() => n.entity.value), s = v(() => !Hn(n.query.value)), l = v(() => s.value && n.selectable.value), r = v(
      () => Vn(n.query.value.view, t.views) === "table"
    ), o = v(
      () => s.value && (l.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete))
    ), i = v(() => n.selection.value.ids.length), c = v(() => i.value ? `${i.value} selected` : r.value ? "None selected" : "Select all");
    function d(h) {
      return i.value ? `${h} ${i.value}` : h;
    }
    return (h, w) => o.value ? (f(), m("div", To, [
      l.value ? (f(), m("div", zo, [
        r.value ? (f(), m("span", Fo, N(c.value), 1)) : (f(), m("label", Lo, [
          pe(Ls),
          k("span", Ro, N(c.value), 1)
        ])),
        i.value ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: w[0] || (w[0] = ($) => P(n).clearSelection())
        }, " Clear ")) : R("", !0)
      ])) : R("", !0),
      k("div", No, [
        a.value?.create ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: w[1] || (w[1] = ($) => P(n).create(a.value))
        }, [
          w[4] || (w[4] = k("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ke(" " + N(a.value.create), 1)
        ])) : R("", !0),
        a.value?.duplicate ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !i.value,
          onClick: w[2] || (w[2] = ($) => P(n).duplicate())
        }, N(d(a.value.duplicate)), 9, Io)) : R("", !0),
        a.value?.delete ? (f(), m("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !i.value,
          onClick: w[3] || (w[3] = ($) => P(n).delete())
        }, N(d(a.value.delete)), 9, Do)) : R("", !0)
      ])
    ])) : R("", !0);
  }
}), Rs = /* @__PURE__ */ ce(Oo, [["__scopeId", "data-v-03ff2a91"]]);
function Bo(e, t) {
  if (!e) return null;
  const n = De(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function qo(e, t) {
  const n = qe(t, "state"), a = qe(t, "tint");
  return {
    identity: on(qe(t, "identity"), e),
    reference: on(qe(t, "reference"), e),
    metrics: vs(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: Ht(s, e)
    })),
    state: n ? De(n, e) ?? null : null,
    updated: on(qe(t, "updated"), e),
    image: Bo(qe(t, "image"), e),
    tint: a ? De(a, e) ?? null : null
  };
}
function Fs(e, t, n, a, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: Ol(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: Nl(t),
    parts: qo(e, l),
    pinned: a,
    selected: s
  };
}
function At() {
  const e = ke(), t = v(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return v(
    () => e.rows.value.map(
      (n, a) => Fs(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Ko = ["data-dc-status"], Vo = /* @__PURE__ */ re({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), m("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, N(e.status), 9, Ko));
  }
}), Xt = /* @__PURE__ */ ce(Vo, [["__scopeId", "data-v-23e59fbf"]]), Wo = ["title"], Uo = { key: 1 }, Ho = /* @__PURE__ */ re({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = ke(), a = v(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((i) => i.key === t.column.drill) ?? null), s = v(() => t.column.label ?? ""), l = v(() => Ht(t.column, t.entry.row));
    function r(o) {
      o.stopPropagation(), a.value && n.drill(t.entry.row, a.value, We(o));
    }
    return (o, i) => a.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onClick: r
    }, [
      be(o.$slots, "default", {}, () => [
        Ke(N(l.value), 1)
      ], !0)
    ], 8, Wo)) : (f(), m("span", Uo, [
      be(o.$slots, "default", {}, () => [
        Ke(N(l.value), 1)
      ], !0)
    ]));
  }
}), Gt = /* @__PURE__ */ ce(Ho, [["__scopeId", "data-v-f2501b17"]]), jo = ["data-dc-active", "aria-pressed", "aria-label"], Xo = /* @__PURE__ */ re({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ke();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, l) => (f(), m("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, N(e.pinned ? "★" : "☆"), 9, jo));
  }
}), oa = /* @__PURE__ */ ce(Xo, [["__scopeId", "data-v-ef63d763"]]), Go = ["src"], Yo = /* @__PURE__ */ re({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = V(!1);
    return we(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (f(), m("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (l) => n.value = !0)
    }, null, 40, Go)) : R("", !0);
  }
}), ia = /* @__PURE__ */ ce(Yo, [["__scopeId", "data-v-afaab300"]]), Qo = ["data-dc-standing", "title", "aria-label"], Zo = /* @__PURE__ */ re({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ke(), a = v(() => Gn(t.entry.entity, t.entry.row)), s = v(() => ks(n.query.value.expr, a.value)), l = v(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function r(o) {
      o.stopPropagation(), n.setExpression(bs(n.query.value.expr, a.value));
    }
    return (o, i) => s.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: l.value,
      "aria-label": l.value,
      onClick: r
    }, N(s.value === "in" ? "+" : "−"), 9, Qo)) : R("", !0);
  }
}), yn = /* @__PURE__ */ ce(Zo, [["__scopeId", "data-v-4b8d4166"]]), Jo = ["data-dc-pending", "title", "aria-label"], ei = /* @__PURE__ */ re({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = ke(), a = v(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = V(null);
    function l(c) {
      s.value = We(c).exclude ? "out" : "in";
    }
    function r(c) {
      l(c), window.addEventListener("keydown", l), window.addEventListener("keyup", l);
    }
    function o() {
      s.value = null, window.removeEventListener("keydown", l), window.removeEventListener("keyup", l);
    }
    Ve(o);
    function i(c) {
      c.stopPropagation(), n.drill(t.entry.row, null, We(c));
    }
    return (c, d) => a.value ? (f(), m("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: r,
      onPointermove: l,
      onPointerleave: o,
      onClick: i
    }, " → ", 40, Jo)) : R("", !0);
  }
}), Yt = /* @__PURE__ */ ce(ei, [["__scopeId", "data-v-9efd42ac"]]), ti = ["checked", "aria-label"], Tt = /* @__PURE__ */ re({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = ke();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, l) => (f(), m("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, ti));
  }
}), ni = { class: "dc-cards" }, ai = { class: "dc-card__top dc-mono" }, si = { class: "dc-card__lead" }, li = {
  key: 1,
  class: "dc-card__entity"
}, ri = { class: "dc-card__top-right" }, oi = ["onClick"], ii = { class: "dc-card__names" }, ci = { class: "dc-card__primary" }, ui = { class: "dc-card__secondary dc-mono" }, di = { class: "dc-card__metrics dc-mono" }, fi = {
  key: 0,
  class: "dc-card__date"
}, pi = /* @__PURE__ */ re({
  __name: "CardsView",
  setup(e) {
    const t = ke(), n = At(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), m("div", ni, [
      (f(!0), m(ae, null, ve(P(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-card"
      }, [
        k("div", ai, [
          k("span", si, [
            P(t).selectable.value ? (f(), ne(Tt, {
              key: 0,
              row: r.row,
              selected: r.selected,
              name: r.parts.identity
            }, null, 8, ["row", "selected", "name"])) : R("", !0),
            Ke(" " + N(r.ordinal) + " ", 1),
            a.value ? (f(), m("span", li, N(r.entityLabel), 1)) : R("", !0)
          ]),
          k("span", ri, [
            r.parts.state ? (f(), ne(Xt, {
              key: 0,
              status: r.parts.state
            }, null, 8, ["status"])) : R("", !0),
            pe(yn, { entry: r }, null, 8, ["entry"]),
            pe(Yt, { entry: r }, null, 8, ["entry"]),
            P(t).pinnable.value ? (f(), ne(oa, {
              key: 1,
              row: r.row,
              name: r.parts.identity,
              pinned: r.pinned
            }, null, 8, ["row", "name", "pinned"])) : R("", !0)
          ])
        ]),
        k("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (o) => P(t).activate(r.row, P(We)(o))
        }, [
          r.parts.image ? (f(), ne(ia, {
            key: 0,
            class: "dc-card__image",
            src: r.parts.image
          }, null, 8, ["src"])) : R("", !0),
          k("span", ii, [
            k("span", ci, N(r.parts.identity), 1),
            k("span", ui, N(r.parts.reference), 1)
          ])
        ], 8, oi),
        k("div", di, [
          (f(!0), m(ae, null, ve(r.parts.metrics.slice(0, 2), (o) => (f(), ne(Gt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, {
            default: Qe(() => [
              Ke(N(o.label) + " " + N(o.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          r.parts.updated ? (f(), m("span", fi, N(r.parts.updated), 1)) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Ns = /* @__PURE__ */ ce(pi, [["__scopeId", "data-v-28581543"]]), vi = { class: "dc-grid" }, mi = ["onClick"], hi = { class: "dc-tile__scrim" }, gi = { class: "dc-tile__top dc-mono" }, _i = { class: "dc-tile__chip" }, yi = { class: "dc-tile__caption" }, wi = { class: "dc-tile__secondary dc-truncate" }, ki = { class: "dc-tile__primary" }, bi = /* @__PURE__ */ re({
  __name: "GridView",
  setup(e) {
    const t = ke(), n = At();
    return (a, s) => (f(), m("div", vi, [
      (f(!0), m(ae, null, ve(P(n), (l) => (f(), m("div", {
        key: l.key,
        class: "dc-grid__cell"
      }, [
        k("button", {
          type: "button",
          class: "dc-tile",
          style: Le({ "--dc-tile-tint": l.parts.tint ?? void 0 }),
          onClick: (r) => P(t).activate(l.row, P(We)(r))
        }, [
          l.parts.image ? (f(), ne(ia, {
            key: 0,
            class: "dc-tile__image",
            src: l.parts.image
          }, null, 8, ["src"])) : R("", !0),
          k("span", hi, [
            k("span", gi, [
              k("span", _i, N(l.ordinal), 1)
            ]),
            k("span", yi, [
              k("span", wi, N(l.parts.reference), 1),
              k("span", ki, N(l.parts.identity), 1)
            ])
          ])
        ], 12, mi),
        P(t).selectable.value ? (f(), ne(Tt, {
          key: 0,
          class: "dc-grid__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0)
      ]))), 128))
    ]));
  }
}), Is = /* @__PURE__ */ ce(bi, [["__scopeId", "data-v-7df25d40"]]), $i = { class: "dc-links" }, xi = ["onClick"], Ci = { class: "dc-link__primary dc-truncate" }, Si = { class: "dc-link__secondary dc-mono dc-truncate" }, Mi = /* @__PURE__ */ re({
  __name: "LinksView",
  setup(e) {
    const t = ke(), n = At();
    return (a, s) => (f(), m("div", $i, [
      (f(!0), m(ae, null, ve(P(n), (l) => (f(), m("span", {
        key: l.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (f(), ne(Tt, {
          key: 0,
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        k("button", {
          type: "button",
          class: "dc-link",
          onClick: (r) => P(t).activate(l.row, P(We)(r))
        }, [
          k("span", Ci, N(l.parts.identity), 1),
          k("span", Si, N(l.parts.reference), 1)
        ], 8, xi)
      ]))), 128))
    ]));
  }
}), Ds = /* @__PURE__ */ ce(Mi, [["__scopeId", "data-v-08d0266c"]]), Ei = {
  class: "dc-list",
  role: "list"
}, Pi = ["onClick"], Ai = { class: "dc-list__ordinal dc-mono" }, Ti = { class: "dc-list__identity" }, zi = { class: "dc-list__primary dc-truncate" }, Li = { class: "dc-list__secondary dc-mono dc-truncate" }, Ri = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Fi = { class: "dc-list__metrics dc-mono" }, Ni = { class: "dc-list__trailing" }, Ii = /* @__PURE__ */ re({
  __name: "ListView",
  setup(e) {
    const t = ke(), n = At(), a = v(() => t.isEverything.value);
    return (s, l) => (f(), m("div", Ei, [
      (f(!0), m(ae, null, ve(P(n), (r) => (f(), m("div", {
        key: r.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (f(), ne(Tt, {
          key: 0,
          class: "dc-list__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : R("", !0),
        k("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => P(t).activate(r.row, P(We)(o))
        }, [
          k("span", Ai, N(r.ordinal), 1),
          k("span", Ti, [
            k("span", zi, N(r.parts.identity), 1),
            k("span", Li, N(r.parts.reference), 1)
          ])
        ], 8, Pi),
        a.value ? (f(), m("span", Ri, N(r.entityLabel), 1)) : R("", !0),
        k("span", Fi, [
          (f(!0), m(ae, null, ve(r.parts.metrics.slice(0, 2), (o) => (f(), ne(Gt, {
            key: o.column.key ?? o.label,
            entry: r,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        k("span", Ni, [
          r.parts.state ? (f(), ne(Xt, {
            key: 0,
            status: r.parts.state
          }, null, 8, ["status"])) : R("", !0),
          pe(yn, { entry: r }, null, 8, ["entry"]),
          pe(Yt, { entry: r }, null, 8, ["entry"]),
          P(t).pinnable.value ? (f(), ne(oa, {
            key: 1,
            row: r.row,
            name: r.parts.identity,
            pinned: r.pinned
          }, null, 8, ["row", "name", "pinned"])) : R("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Rn = /* @__PURE__ */ ce(Ii, [["__scopeId", "data-v-11b9f46c"]]), Di = { class: "dc-preview" }, Oi = { class: "dc-preview__pager dc-mono" }, Bi = ["disabled"], qi = { "aria-live": "polite" }, Ki = ["disabled"], Vi = {
  key: 0,
  class: "dc-preview__card"
}, Wi = ["src"], Ui = { class: "dc-preview__body" }, Hi = { class: "dc-preview__top" }, ji = { class: "dc-preview__badges" }, Xi = { class: "dc-preview__entity dc-mono" }, Gi = { class: "dc-preview__marks" }, Yi = { class: "dc-preview__primary" }, Qi = { class: "dc-preview__secondary dc-mono" }, Zi = { class: "dc-preview__fields" }, Ji = { class: "dc-preview__key" }, ec = { class: "dc-preview__value dc-mono" }, tc = /* @__PURE__ */ re({
  __name: "PreviewView",
  setup(e) {
    const t = ke(), n = At(), a = V(0);
    we(n, (i) => {
      a.value > i.length - 1 && (a.value = Math.max(0, i.length - 1));
    });
    const s = v(() => n.value[a.value]), l = v(() => {
      const i = s.value;
      if (!i) return [];
      const c = qe(i.columns, "reference"), d = qe(i.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: i.parts.reference, column: null }] : [],
        ...i.parts.metrics.map((h) => ({
          key: h.label,
          value: h.text,
          column: h.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: i.parts.updated, column: null }] : []
      ];
    }), r = v(() => {
      if (!n.value.length) return "0 / 0";
      const i = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${i}`;
    }), o = (i) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + i)));
    };
    return (i, c) => (f(), m("div", Di, [
      k("div", Oi, [
        k("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => o(-1))
        }, " ‹ ", 8, Bi),
        k("span", qi, N(r.value), 1),
        k("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= P(n).length - 1,
          onClick: c[1] || (c[1] = (d) => o(1))
        }, " › ", 8, Ki)
      ]),
      s.value ? (f(), m("div", Vi, [
        k("div", {
          class: "dc-preview__media",
          style: Le({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), m("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Wi)) : (f(), m(ae, { key: 1 }, [
            Ke(" preview ")
          ], 64))
        ], 4),
        k("div", Ui, [
          k("div", Hi, [
            k("span", ji, [
              P(t).selectable.value ? (f(), ne(Tt, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : R("", !0),
              s.value.parts.state ? (f(), ne(Xt, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : R("", !0),
              k("span", Xi, N(s.value.entityLabel), 1)
            ]),
            k("span", Gi, [
              pe(yn, { entry: s.value }, null, 8, ["entry"]),
              pe(Yt, { entry: s.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (f(), ne(oa, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : R("", !0)
            ])
          ]),
          k("div", null, [
            k("div", Yi, N(s.value.parts.identity), 1),
            k("div", Qi, N(s.value.parts.reference), 1)
          ]),
          k("dl", Zi, [
            (f(!0), m(ae, null, ve(l.value, (d) => (f(), m("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              k("dt", Ji, N(d.key), 1),
              k("dd", ec, [
                d.column && s.value ? (f(), ne(Gt, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), m(ae, { key: 1 }, [
                  Ke(N(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          k("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: c[2] || (c[2] = (d) => P(t).activate(s.value.row, P(We)(d)))
          }, " Open record → ")
        ])
      ])) : R("", !0)
    ]));
  }
}), Os = /* @__PURE__ */ ce(tc, [["__scopeId", "data-v-6be41155"]]);
function nc() {
  const e = ke();
  return v(() => Il(e.schema.value, e.entity.value));
}
const ac = ["title"], sc = {
  key: 5,
  class: "dc-cell__text"
}, lc = /* @__PURE__ */ re({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = ke(), a = v(() => t.column.kind ?? "text"), s = v(() => De(t.column, t.entry.row)), l = v(
      () => a.value === "ordinal" ? t.entry.ordinal : Ht(t.column, t.entry.row)
    ), r = v(() => s.value), o = v(() => t.column.activate === !0 || !!t.column.click), i = v(() => zn(t.column)), c = v(() => ms(t.column, t.entry.row));
    function d(h) {
      if (!o.value) return;
      h.stopPropagation();
      const w = We(h);
      t.column.click?.(t.entry.row, w), t.column.activate && n.activate(t.entry.row, w);
    }
    return (h, w) => a.value === "component" && e.column.component ? (f(), ne(Kn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), ne(Xt, {
      key: 1,
      status: r.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), ne(ia, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Le({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), ne(Gt, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), m("button", {
      key: 4,
      type: "button",
      class: Mt(["dc-table__open", { "dc-truncate": i.value }]),
      title: c.value,
      onClick: d
    }, N(l.value), 11, ac)) : (f(), m("span", sc, N(l.value), 1));
  }
}), Ua = /* @__PURE__ */ ce(lc, [["__scopeId", "data-v-70ba8aa2"]]), rc = ["aria-label"], oc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], ic = /* @__PURE__ */ re({
  __name: "StandingControl",
  props: {
    standing: {},
    mixed: { type: Boolean },
    name: {}
  },
  emits: ["set"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = v(() => [
      { standing: "in", sign: "+", hint: `Narrow the query to ${n.name}` },
      { standing: null, sign: "·", hint: `Let the query say nothing about ${n.name}` },
      { standing: "out", sign: "−", hint: `Leave ${n.name} out of the query` }
    ]), l = (o) => !n.mixed && n.standing === o;
    function r(o, i) {
      o.stopPropagation(), a("set", i);
    }
    return (o, i) => (f(), m("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (f(!0), m(ae, null, ve(s.value, (c) => (f(), m("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": l(c.standing) ? "true" : "false",
        "aria-checked": l(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (d) => r(d, c.standing)
      }, N(c.sign), 9, oc))), 128))
    ], 8, rc));
  }
}), Ha = /* @__PURE__ */ ce(ic, [["__scopeId", "data-v-adaa8412"]]), cc = {
  key: 0,
  class: "dc-table__none"
}, uc = { class: "dc-table__detail" }, dc = ["data-dc-wrap"], fc = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, pc = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, vc = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], mc = ["onClick"], hc = {
  key: 2,
  class: "dc-table__head"
}, gc = ["onClick"], _c = {
  key: 0,
  class: "dc-table__pick"
}, yc = {
  key: 1,
  class: "dc-table__standing"
}, wc = ["data-dc-align", "data-dc-hide", "title"], kc = {
  key: 0,
  class: "dc-table__name"
}, bc = /* @__PURE__ */ re({
  __name: "TableView",
  setup(e) {
    const t = ke(), n = At(), a = nc(), s = v(
      () => a.value.find((_) => _.scope)
    ), l = v(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((_) => _.scope)
    ), r = (_) => Gn(_.entity, _.row), o = (_) => ks(t.query.value.expr, r(_));
    function i(_, M) {
      t.setExpression(qa(t.query.value.expr, r(_), M));
    }
    const c = v(() => {
      const _ = n.value.filter((D) => r(D) !== null), M = _.filter((D) => D.selected);
      return M.length ? M : _;
    }), d = v(() => c.value.some((_) => _.selected)), h = v(() => {
      const _ = c.value[0];
      return _ ? o(_) : null;
    }), w = v(
      () => c.value.some((_) => o(_) !== h.value)
    ), $ = v(
      () => d.value ? "the ticked rows" : "every row on this page"
    );
    function x(_) {
      t.setExpression(
        c.value.reduce(
          (M, D) => qa(M, r(D), _),
          t.query.value.expr
        )
      );
    }
    const A = v(
      () => a.value.some((_) => _.kind === "image" || _.height !== void 0)
    );
    function y(_) {
      _ && (t.query.value.sort === _ ? t.toggleDirection() : t.setSort(_));
    }
    const b = v(() => t.entity.value?.label ?? "The result set"), L = v(() => new Set(t.sorts.value.map((_) => _.key))), T = (_) => _.sort !== void 0 && L.value.has(_.sort), z = (_) => {
      if (T(_))
        return t.query.value.sort !== _.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function I(_) {
      return [
        La(_),
        _.muted ? "dc-table__muted" : "",
        _.mono ? "dc-mono" : "",
        zn(_) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function U(_, M) {
      if (!(!zn(_) || _.activate || _.click))
        return ms(_, M.row);
    }
    return (_, M) => P(a).length ? (f(), m("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": A.value ? "" : void 0
    }, [
      k("thead", null, [
        k("tr", null, [
          P(t).selectable.value ? (f(), m("th", fc, [
            pe(Ls)
          ])) : R("", !0),
          l.value ? (f(), m("th", pc, [
            c.value.length ? (f(), ne(Ha, {
              key: 0,
              standing: h.value,
              mixed: w.value,
              name: $.value,
              onSet: x
            }, null, 8, ["standing", "mixed", "name"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), m(ae, null, ve(P(a), (D, j) => (f(), m("th", {
            key: P(Ta)(D, j),
            scope: "col",
            class: Mt(P(La)(D)),
            style: Le({ width: D.width }),
            "data-dc-align": P(za)(D),
            "data-dc-hide": D.hideBelow,
            "aria-sort": z(D),
            title: D.hint
          }, [
            T(D) ? (f(), m("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (ue) => y(D.sort)
            }, N(D.label), 9, mc)) : (f(), m(ae, { key: 1 }, [
              Ke(N(D.label), 1)
            ], 64)),
            D.header ? (f(), m("span", hc, [
              (f(), ne(Kn(D.header), {
                column: D,
                entity: P(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : R("", !0)
          ], 14, vc))), 128))
        ])
      ]),
      k("tbody", null, [
        (f(!0), m(ae, null, ve(P(n), (D) => (f(), m("tr", {
          key: D.key,
          class: "dc-table__row",
          onClick: (j) => P(t).activate(D.row, P(We)(j))
        }, [
          P(t).selectable.value ? (f(), m("td", _c, [
            pe(Tt, {
              row: D.row,
              selected: D.selected,
              name: D.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : R("", !0),
          l.value ? (f(), m("td", yc, [
            r(D) !== null ? (f(), ne(Ha, {
              key: 0,
              standing: o(D),
              name: D.parts.identity,
              onSet: (j) => i(D, j)
            }, null, 8, ["standing", "name", "onSet"])) : R("", !0)
          ])) : R("", !0),
          (f(!0), m(ae, null, ve(P(a), (j, ue) => (f(), m("td", {
            key: P(Ta)(j, ue),
            class: Mt(I(j)),
            "data-dc-align": P(za)(j),
            "data-dc-hide": j.hideBelow,
            title: U(j, D)
          }, [
            j === s.value ? (f(), m("span", kc, [
              pe(Ua, {
                column: j,
                entry: D
              }, null, 8, ["column", "entry"]),
              pe(Yt, { entry: D }, null, 8, ["entry"])
            ])) : (f(), ne(Ua, {
              key: 1,
              column: j,
              entry: D
            }, null, 8, ["column", "entry"]))
          ], 10, wc))), 128))
        ], 8, gc))), 128))
      ])
    ], 8, dc)) : (f(), m("p", cc, [
      M[2] || (M[2] = k("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      k("span", uc, [
        Ke(N(b.value) + " has no ", 1),
        M[0] || (M[0] = k("code", null, "columns", -1)),
        M[1] || (M[1] = Ke(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Bs = /* @__PURE__ */ ce(bc, [["__scopeId", "data-v-04724e4b"]]);
function $c(e) {
  const t = St([]), n = V(!1), a = St(null);
  let s = 0;
  const l = (i, c, d, h, w) => ({
    entity: i,
    rows: c.rows.map(
      ($, x) => Fs($, x, i, e.isPinned($.id))
    ),
    total: c.total,
    count: d ? i.count : String(c.total),
    pinned: xc(h, c, w)
  }), r = () => {
    const i = ++s, c = e.query.value, d = e.schema.value, h = e.entities.value, w = e.limit.value, $ = e.within?.value.trim() ?? "", x = Un(c) && !$, A = $ ? Xn($, c.expr) : c.expr, y = h.map((b) => ({
      entity: b,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: b.key, expr: A, facets: Et(b), page: 1 },
        schema: d,
        entity: b,
        limit: w,
        offset: 0
      })
    }));
    if (y.every(({ outcome: b }) => !(b instanceof Promise))) {
      t.value = y.map(
        ({ entity: b, outcome: L }) => l(b, L, x, d, A)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(y.map(({ outcome: b }) => Promise.resolve(b))).then((b) => {
      i === s && (t.value = b.map(
        (L, T) => l(y[T].entity, L, x, d, A)
      ), a.value = null);
    }).catch((b) => {
      i === s && (a.value = b, t.value = []);
    }).finally(() => {
      i === s && (n.value = !1);
    });
  }, o = () => {
    try {
      r();
    } catch (i) {
      a.value = i, t.value = [], n.value = !1;
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
  ), { previews: t, pending: n, error: a, refresh: o };
}
function xc(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const l = Yn(e, a);
  return !!l && Qn(s, l) === s;
}
const Cc = ["data-dc-pending"], Sc = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, Mc = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, Ec = {
  key: 2,
  class: "dc-types__state"
}, Pc = ["data-dc-empty"], Ac = ["onClick"], Tc = { class: "dc-type__name" }, zc = { class: "dc-type__count dc-mono" }, Lc = { class: "dc-type__sr" }, Rc = {
  key: 0,
  class: "dc-type__empty"
}, Fc = ["onClick"], Nc = { class: "dc-type__identity" }, Ic = { class: "dc-type__primary dc-truncate" }, Dc = { class: "dc-type__secondary dc-mono dc-truncate" }, Oc = { class: "dc-type__trailing dc-mono" }, Bc = { class: "dc-type__metric-value" }, qc = { class: "dc-type__metric-label" }, Kc = {
  key: 0,
  class: "dc-type__date"
}, Vc = ["onClick"], Wc = /* @__PURE__ */ re({
  __name: "TypeCardsView",
  setup(e) {
    const t = ke(), { previews: n, pending: a, error: s } = $c({
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
      "data-dc-pending": P(a) ? "true" : "false"
    }, [
      be(o.$slots, "before", {}, void 0, !0),
      P(s) ? (f(), m("p", Sc, " Could not load results: " + N(P(s) instanceof Error ? P(s).message : "the data source failed."), 1)) : !r.value.length && P(a) ? (f(), m("p", Mc, " Running query… ")) : r.value.length ? R("", !0) : (f(), m("p", Ec, N(l.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), m(ae, null, ve(r.value, (c) => (f(), m("section", {
        key: c.entity.key,
        class: "dc-type",
        "data-dc-empty": c.rows.length ? "false" : "true"
      }, [
        k("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (d) => P(t).setEntity(c.entity.key)
        }, [
          k("span", Tc, N(c.entity.label), 1),
          k("span", zc, N(c.count), 1),
          i[0] || (i[0] = k("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          k("span", Lc, "Show only " + N(c.entity.label.toLowerCase()), 1)
        ], 8, Ac),
        c.rows.length ? R("", !0) : (f(), m("p", Rc, N(l.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), m(ae, null, ve(c.rows, (d) => (f(), m("div", {
          key: d.key,
          class: "dc-type__row"
        }, [
          k("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (h) => P(t).activate(d.row, P(We)(h))
          }, [
            k("span", Nc, [
              k("span", Ic, N(d.parts.identity), 1),
              k("span", Dc, N(d.parts.reference), 1)
            ])
          ], 8, Fc),
          k("span", Oc, [
            (f(!0), m(ae, null, ve(d.parts.metrics.slice(0, 1), (h) => (f(), ne(Gt, {
              key: h.column.key ?? h.label,
              class: "dc-type__metric",
              entry: d,
              column: h.column
            }, {
              default: Qe(() => [
                k("span", Bc, N(h.text), 1),
                k("span", qc, N(h.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            d.parts.updated ? (f(), m("span", Kc, N(d.parts.updated), 1)) : R("", !0),
            pe(yn, { entry: d }, null, 8, ["entry"]),
            pe(Yt, { entry: d }, null, 8, ["entry"])
          ])
        ]))), 128)),
        c.entity.create ? (f(), m("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (d) => P(t).create(c.entity)
        }, [
          i[1] || (i[1] = k("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ke(" " + N(c.entity.create), 1)
        ], 8, Vc)) : R("", !0)
      ], 8, Pc))), 128)),
      be(o.$slots, "after", {}, void 0, !0)
    ], 8, Cc));
  }
}), qs = /* @__PURE__ */ ce(Wc, [["__scopeId", "data-v-c7b8f990"]]), Uc = ["data-dc-pending"], Hc = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, jc = { class: "dc-results__detail" }, Xc = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Gc = {
  key: 3,
  class: "dc-results__state"
}, Yc = { class: "dc-results__detail" }, Qc = /* @__PURE__ */ re({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = ke(), a = Ut(), s = {
      list: Rn,
      cards: Ns,
      grid: Is,
      table: Bs,
      links: Ds,
      preview: Os
    }, l = v(() => Hn(n.query.value)), r = v(() => Vn(n.query.value.view, t.views)), o = v(() => s[r.value] ?? Rn), i = v(() => n.rows.value.length > 0), c = v(() => n.error.value !== null), d = V(null);
    return we(
      () => n.query.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (h, w) => (f(), m("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": P(n).pending.value ? "true" : "false"
    }, [
      l.value ? (f(), ne(qs, { key: 0 }, ln({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Qe(() => [
            be(h.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Qe(() => [
            be(h.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), m("p", Hc, [
        w[1] || (w[1] = k("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        k("span", jc, N(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : !i.value && P(n).pending.value ? (f(), m("p", Xc, [...w[2] || (w[2] = [
        k("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : i.value ? (f(), ne(Kn(o.value), { key: 4 })) : (f(), m("div", Gc, [
        w[3] || (w[3] = k("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        k("span", Yc, N(P(n).summary.value), 1),
        P(n).isPristine.value ? R("", !0) : (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: w[0] || (w[0] = ($) => P(n).clearFilters())
        }, N(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, Uc));
  }
}), Ks = /* @__PURE__ */ ce(Qc, [["__scopeId", "data-v-41f54508"]]), Zc = ["data-dc-theme"], Jc = ["data-dc-width", "data-dc-align"], eu = { class: "dc-shell__panel" }, tu = /* @__PURE__ */ re({
  __name: "DataShell",
  props: /* @__PURE__ */ vn({
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
  emits: /* @__PURE__ */ vn(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = It(e, "open"), r = It(e, "pinned"), o = It(e, "selected"), i = Ut(), c = Ct(ss, null), d = a.route || c ? null : Pl(), h = a.route ?? c ?? d;
    Ve(() => d?.dispose?.());
    const w = v(() => cr({ seed: a.schema.key })), $ = v(() => a.source ?? w.value), x = wr({
      schema: () => a.schema,
      adapter: h,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), A = v(() => a.within?.trim() ?? ""), y = kr({
      source: $,
      query: x.query,
      schema: v(() => a.schema),
      entity: x.entity,
      limit: v(() => a.limit),
      within: A
    });
    we(x.query, (C) => s("query-change", C)), we(
      [y.pageCount, y.pending, x.query],
      () => {
        if (y.pending.value) return;
        const C = y.pageCount.value;
        x.query.value.page > C && x.setPage(C, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const b = qn() ?? "dc-query-panel", L = V(null);
    function T() {
      l.value && (l.value = !1, Kt(() => {
        L.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const z = v(() => new Set(r.value));
    function I(C) {
      const q = new Set(z.value);
      q.has(C.id) ? q.delete(C.id) : q.add(C.id), r.value = [...q], s("toggle-pin", C);
    }
    const U = v(() => {
      if (a.selectable === !0) return !0;
      const C = x.entity.value;
      return !!(C?.duplicate || C?.delete);
    }), _ = v(() => new Set(o.value));
    function M(C) {
      const q = new Set(_.value);
      q.has(C.id) ? q.delete(C.id) : q.add(C.id), o.value = [...q];
    }
    function D(C) {
      const q = new Set(_.value);
      for (const H of y.rows.value)
        C ? q.add(H.id) : q.delete(H.id);
      o.value = [...q];
    }
    function j() {
      o.value.length && (o.value = []);
    }
    const ue = v(() => ({
      ids: [...o.value],
      rows: y.rows.value.filter((C) => _.value.has(C.id)),
      entity: x.entity.value
    }));
    we(() => x.query.value.entity, j);
    function Q(C, q, H = {}) {
      const se = ur(a.schema, x.query.value, C, H);
      H.exclude ? x.narrow(se, q?.key ?? x.query.value.entity) : x.narrow(se, q?.key ?? null, q ? void 0 : "cards"), s("drill", C, q, H);
    }
    const _e = dr({
      ...x,
      schema: v(() => a.schema),
      entities: v(() => a.schema.entities),
      rows: y.rows,
      total: y.total,
      limit: v(() => a.limit),
      offset: y.offset,
      pageCount: y.pageCount,
      pending: y.pending,
      error: y.error,
      source: $,
      previewsPerType: v(() => a.previewsPerType),
      within: A,
      pinnable: v(() => a.pinnable === !0),
      isPinned: (C) => z.value.has(C.id),
      isPinnedId: (C) => z.value.has(C),
      togglePin: I,
      selectable: U,
      selection: ue,
      isSelected: (C) => _.value.has(C.id),
      toggleSelect: M,
      selectPage: D,
      clearSelection: j,
      narrowsOnPress: v(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (C, q = {}) => {
        if (a.rowPress === "narrow" && Yn(a.schema, C)) {
          Q(C, null, q);
          return;
        }
        s("activate", C);
      },
      create: (C) => s("create", C),
      duplicate: () => s("duplicate", ue.value),
      delete: () => s("delete", ue.value),
      drill: Q
    }), xe = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: x.query,
      openPanel: () => {
        l.value = !0;
      },
      closePanel: T
    }), (C, q) => (f(), m("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Le(xe.value)
    }, [
      k("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        pe(As, {
          ref_key: "headerRef",
          ref: L,
          expanded: l.value,
          "panel-id": P(b),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: q[0] || (q[0] = (H) => l.value = !l.value)
        }, ln({ _: 2 }, [
          i.actions ? {
            name: "actions",
            fn: Qe(() => [
              be(C.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        l.value ? (f(), m(ae, { key: 0 }, [
          k("div", {
            class: "dc-shell__scrim",
            onClick: T
          }),
          k("div", eu, [
            pe(zs, {
              "panel-id": P(b),
              onClose: T
            }, ln({ _: 2 }, [
              i["panel-section"] ? {
                name: "panel-section",
                fn: Qe(() => [
                  be(C.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : R("", !0)
      ], 8, Jc),
      pe(Rs, { views: e.views }, null, 8, ["views"]),
      be(C.$slots, "results", {
        rows: P(_e).rows.value,
        total: P(_e).total.value,
        offset: P(_e).offset.value,
        pageCount: P(_e).pageCount.value,
        query: P(_e).query.value,
        pending: P(_e).pending.value
      }, () => [
        pe(Ks, { views: e.views }, ln({ _: 2 }, [
          i["cards-before"] ? {
            name: "cards-before",
            fn: Qe(() => [
              be(C.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Qe(() => [
              be(C.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, Zc));
  }
}), nu = /* @__PURE__ */ ce(tu, [["__scopeId", "data-v-68ec86d9"]]), au = ["data-dc-muted"], su = {
  key: 0,
  class: "dc-shell-card__head"
}, lu = { class: "dc-shell-card__title" }, ru = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, ou = {
  key: 0,
  class: "dc-shell-card__aside"
}, iu = ["data-dc-flush"], cu = {
  key: 2,
  class: "dc-shell-card__foot"
}, uu = /* @__PURE__ */ re({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean }
  },
  setup(e) {
    const t = e, n = v(() => t.span === "all" ? { gridColumn: "1 / -1" } : void 0), a = Ut();
    function s(d) {
      return l(d?.() ?? []);
    }
    function l(d) {
      return d.some((h) => h.type === Cl ? !1 : h.type === Sl ? String(h.children ?? "").trim().length > 0 : h.type === ae ? l(h.children ?? []) : !0);
    }
    const r = v(() => !!t.title || o.value || s(a.head)), o = v(() => s(a.aside)), i = v(() => s(a.default)), c = v(() => s(a.foot));
    return (d, h) => (f(), m("section", {
      class: "dc-shell-card",
      style: Le(n.value),
      "data-dc-muted": e.muted ? "true" : "false"
    }, [
      r.value ? (f(), m("header", su, [
        be(d.$slots, "head", {}, () => [
          k("h2", lu, N(e.title), 1),
          e.count !== void 0 ? (f(), m("span", ru, N(e.count), 1)) : R("", !0)
        ], !0),
        o.value ? (f(), m("span", ou, [
          be(d.$slots, "aside", {}, void 0, !0)
        ])) : R("", !0)
      ])) : R("", !0),
      i.value ? (f(), m("div", {
        key: 1,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        be(d.$slots, "default", {}, void 0, !0)
      ], 8, iu)) : R("", !0),
      c.value ? (f(), m("footer", cu, [
        be(d.$slots, "foot", {}, void 0, !0)
      ])) : R("", !0)
    ], 12, au));
  }
}), Hd = /* @__PURE__ */ ce(uu, [["__scopeId", "data-v-75f2ef0b"]]), du = ["aria-label"], fu = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], pu = /* @__PURE__ */ re({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = V([]);
    function l(r, o) {
      const i = n.options.length;
      let c = null;
      if (r.key === "ArrowRight" || r.key === "ArrowDown" ? c = (o + 1) % i : r.key === "ArrowLeft" || r.key === "ArrowUp" ? c = (o - 1 + i) % i : r.key === "Home" ? c = 0 : r.key === "End" && (c = i - 1), c === null) return;
      r.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (r, o) => (f(), m("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), m(ae, null, ve(e.options, (i, c) => (f(), m("button", {
        key: i.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: Mt(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": i.key === e.modelValue,
        "data-dc-active": i.key === e.modelValue ? "true" : "false",
        tabindex: i.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", i.key),
        onKeydown: (d) => l(d, c)
      }, N(i.label), 43, fu))), 128))
    ], 8, du));
  }
}), vu = /* @__PURE__ */ ce(pu, [["__scopeId", "data-v-63fb5482"]]), mu = ["data-dc-theme", "aria-label"], hu = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], gu = /* @__PURE__ */ re({
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
    const n = e, a = v(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), s = t, l = V(null), r = V([]), o = V(null), i = V(null), c = V(!1), d = v(
      () => n.menus.flatMap((z, I) => Dt(z) ? [I] : [])
    );
    function h(z, I) {
      const U = r.value[z]?.getBoundingClientRect(), _ = n.menus[z];
      !U || !_ || !Dt(_) || (i.value = { x: U.left, y: U.bottom + 2, mirrorX: U.right }, o.value = z, c.value = I);
    }
    function w(z) {
      const I = o.value;
      o.value = null, i.value = null, z && I !== null && r.value[I]?.focus();
    }
    function $(z) {
      o.value === z ? w(!0) : h(z, !1);
    }
    function x(z) {
      o.value === null || o.value === z || h(z, !1);
    }
    function A(z, I) {
      const U = d.value;
      if (U.length === 0) return null;
      if (z === null) return I === 1 ? U[0] ?? null : U[U.length - 1] ?? null;
      const _ = U.indexOf(z);
      return _ === -1 ? U[0] ?? null : U[(_ + I + U.length) % U.length] ?? null;
    }
    function y(z) {
      const I = z.key;
      if (I === "Escape") {
        if (o.value === null) return;
        z.preventDefault(), w(!0);
        return;
      }
      if (I === "ArrowDown" && o.value === null) {
        const M = b();
        if (M === null) return;
        z.preventDefault(), h(M, !0);
        return;
      }
      if (I !== "ArrowLeft" && I !== "ArrowRight") return;
      const U = o.value ?? b(), _ = A(U, I === "ArrowRight" ? 1 : -1);
      _ !== null && (z.preventDefault(), o.value !== null ? h(_, !0) : r.value[_]?.focus());
    }
    function b() {
      const z = r.value.findIndex((I) => I === document.activeElement);
      return z === -1 ? d.value[0] ?? null : z;
    }
    function L(z) {
      const I = z.target;
      !I || l.value?.contains(I) || w(!1);
    }
    we(o, (z) => {
      z !== null ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), Ve(() => window.removeEventListener("pointerdown", L, !0));
    function T(z) {
      w(!0), z.action?.(), s("choose", z);
    }
    return (z, I) => (f(), m("div", {
      ref_key: "bar",
      ref: l,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Le(a.value),
      onKeydown: y
    }, [
      (f(!0), m(ae, null, ve(e.menus, (U, _) => (f(), m("button", {
        key: U.id ?? U.label ?? _,
        ref_for: !0,
        ref: (M) => {
          M && (r.value[_] = M);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": o.value === _,
        "aria-disabled": U.disabled ? "true" : void 0,
        disabled: U.disabled,
        "data-dc-menu": U.id ?? U.label,
        tabindex: _ === (d.value[0] ?? 0) ? 0 : -1,
        onClick: (M) => $(_),
        onMouseenter: (M) => x(_)
      }, N(U.label), 41, hu))), 128)),
      o.value !== null && i.value ? (f(), ne(ra, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: i.value,
        label: e.menus[o.value]?.label,
        autofocus: c.value,
        onChoose: T,
        onDismiss: I[0] || (I[0] = (U) => w(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 44, mu));
  }
}), jd = /* @__PURE__ */ ce(gu, [["__scopeId", "data-v-93dbd2e4"]]), _u = ["aria-label", "aria-expanded", "disabled"], yu = { "aria-hidden": "true" }, wu = /* @__PURE__ */ re({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = V(null), s = V(null), l = V(null), r = V(!1), o = v(() => l.value !== null);
    function i(x) {
      const A = a.value?.getBoundingClientRect();
      A && (l.value = { x: A.left, y: A.bottom + 4, mirrorX: A.right }, r.value = x);
    }
    function c(x) {
      l.value = null, x && a.value?.focus();
    }
    function d() {
      o.value ? c(!0) : i(!1);
    }
    function h(x) {
      x.key !== "ArrowDown" || o.value || (x.preventDefault(), i(!0));
    }
    function w(x) {
      const A = x.target;
      A && (a.value?.contains(A) || s.value?.root?.contains(A) || c(!1));
    }
    we(o, (x) => {
      x ? window.addEventListener("pointerdown", w, !0) : window.removeEventListener("pointerdown", w, !0);
    }), Ve(() => window.removeEventListener("pointerdown", w, !0));
    function $(x) {
      c(!0), x.action?.(), n("choose", x);
    }
    return (x, A) => (f(), m(ae, null, [
      k("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": o.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: h
      }, [
        k("span", yu, N(e.glyph), 1)
      ], 40, _u),
      l.value ? (f(), ne(ra, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: l.value,
        label: e.label,
        autofocus: r.value,
        onChoose: $,
        onDismiss: A[0] || (A[0] = (y) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : R("", !0)
    ], 64));
  }
}), ca = /* @__PURE__ */ ce(wu, [["__scopeId", "data-v-48f5ada5"]]), zt = (e) => e.kind === "split", X = (e) => e.kind === "group", ee = (e) => e.kind === "float", pt = { x: 16, y: 16, w: 360, h: 260 }, hn = 28, Vs = 120, Fn = 220, Ws = 38, yt = 6;
function Qt(e, t) {
  let n = !1;
  const a = e.frames.map((s, l) => {
    const r = t(s.node, l);
    return r === s.node ? s : (n = !0, { ...s, node: r });
  });
  return n ? { ...e, frames: a } : e;
}
function Ze(e) {
  return { kind: "group", panels: [e] };
}
function Xd(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const me = (e) => typeof e == "string", ua = (e) => me(e) ? Ze(e) : e, Zt = (e) => me(e) ? [e] : at(e), ja = (e) => e.panels.filter(me), ku = (e) => e.panels.filter((t) => !me(t)), Ie = (e, t) => e.panels.includes(t);
function Jt(e, t, n) {
  let a = !1;
  const s = e.panels.map((l) => {
    if (me(l) || !oe(l, t)) return l;
    const r = n(l);
    return r !== l && (a = !0), r;
  });
  return a ? { ...e, panels: s } : e;
}
function wn(e, t) {
  return { node: e, rect: { ...pt, ...t } };
}
function da(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function fa(e, t) {
  const n = { ...pt, ...t };
  return da(
    e.map(
      (a, s) => wn(a, {
        ...n,
        x: n.x + s * hn,
        y: n.y + s * hn
      })
    )
  );
}
function pa(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const va = (e, t, n) => pa("row", e, t, n), Gd = (e, t, n) => pa("column", e, t, n);
function ye(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const ht = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Yd = (e) => ({ ...e, headless: !0 }), Qd = (e) => ({ ...e, fixedView: !0 }), bu = (e) => e === "left" || e === "right" ? "row" : "column";
function at(e) {
  return X(e) ? e.panels.flatMap(Zt) : ee(e) ? e.frames.flatMap((t) => at(t.node)) : e.children.flatMap(at);
}
function oe(e, t) {
  return X(e) ? e.panels.some((n) => me(n) ? n === t : oe(n, t)) : ee(e) ? e.frames.some((n) => oe(n.node, t)) : e.children.some((n) => oe(n, t));
}
const Us = (e) => at(e).length === 0, Nn = (e) => !X(e) && ht(e), In = (e) => Us(e) && !Nn(e);
function kn(e) {
  return zt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : ee(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => me(t) ? [] : [{ node: t, index: n }]);
}
const ma = (e) => kn(e).map((t) => t.node);
function gt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => me(a) ? a === t : oe(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function Hs(e) {
  const t = e.panels[gt(e)];
  return t !== void 0 && me(t) ? t : "";
}
function Ae(e) {
  if (me(e)) return e;
  if (X(e)) {
    const n = e.panels[gt(e)];
    return n === void 0 ? "" : Ae(n);
  }
  if (ee(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Ae(n.node) : "";
  }
  const t = e.children[0];
  return t ? Ae(t) : "";
}
function kt(e, t) {
  if (X(e) && Ie(e, t)) return e;
  for (const n of ma(e)) {
    const a = kt(n, t);
    if (a) return a;
  }
  return null;
}
function $u(e) {
  const t = ma(e).flatMap($u);
  return X(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (X(e)) {
    for (const n of ku(e)) {
      const a = Se(n, t);
      if (a) return a;
    }
    return null;
  }
  if (ee(e)) {
    for (const n of e.frames)
      if (oe(n.node, t))
        return Se(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = Se(n, t);
    if (a) return a;
  }
  return null;
}
function En(e, t, n = Vs) {
  const a = (o, i) => i > 0 ? Math.max(Math.min(o, i), Math.min(n, i)) : Math.max(o, n), s = a(e.w, t.w), l = a(e.h, t.h), r = (o, i, c) => Math.min(Math.max(o, 0), Math.max(c - i, 0));
  return {
    x: Math.round(r(e.x, s, t.w)),
    y: Math.round(r(e.y, l, t.h)),
    w: Math.round(s),
    h: Math.round(l)
  };
}
function Xa(e, t, n, a, s = Vs) {
  let { x: l, y: r, w: o, h: i } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, l = e.x + n), t.includes("s") && (i = e.h + a), t.includes("n") && (i = e.h - a, r = e.y + a), o < s && (t.includes("w") && (l = e.x + e.w - s), o = s), i < s && (t.includes("n") && (r = e.y + e.h - s), i = s), { x: l, y: r, w: o, h: i };
}
const js = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function bt(e, t, n) {
  if (X(e)) return Jt(e, t, (l) => bt(l, t, n));
  if (ee(e)) {
    let l = !1;
    const r = e.frames.map((o) => {
      if (!oe(o.node, t)) return o;
      if (Se(o.node, t)) {
        const c = bt(o.node, t, n);
        return c === o.node ? o : (l = !0, { ...o, node: c });
      }
      const i = n(o);
      return i === o ? o : (l = !0, i);
    });
    return l ? { ...e, frames: r } : e;
  }
  if (!oe(e, t)) return e;
  let a = !1;
  const s = e.children.map((l) => {
    const r = bt(l, t, n);
    return r !== l && (a = !0), r;
  });
  return a ? { ...e, children: s } : e;
}
function xu(e, t, n) {
  return bt(e, t, (a) => js(a.rect, n) ? a : { ...a, rect: n });
}
const lt = (e) => e.maximized === !0, Xs = (e) => (t) => {
  if (lt(t) === e) return t;
  if (e) {
    const { minimized: s, ...l } = t;
    return { ...l, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function Cu(e, t, n = !0) {
  return bt(e, t, Xs(n));
}
function Zd(e, t) {
  const n = Se(e, t);
  return n ? Cu(e, t, !lt(n)) : e;
}
const dt = (e) => e.minimized === !0, Gs = (e) => (t) => {
  if (dt(t) === e) return t;
  if (e) {
    const { maximized: s, ...l } = t;
    return { ...l, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function Su(e, t, n = !0) {
  return bt(e, t, Gs(n));
}
function Jd(e, t) {
  const n = Se(e, t);
  return n ? Su(e, t, !dt(n)) : e;
}
function ut(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = ot(e, t.slice(0, -1));
  return !a || !ee(a) ? null : a.frames[n] ?? null;
}
function Dn(e, t) {
  if (ee(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!oe(a.node, t)) continue;
      const s = Dn(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of kn(e)) {
    if (!oe(n, t)) continue;
    const s = Dn(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function ha(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), l = ot(e, s);
  if (!l || !ee(l)) return e;
  const r = l.frames[a];
  if (!r) return e;
  const o = n(r);
  if (o === r) return e;
  const i = [...l.frames];
  return i[a] = o, mt(e, s, { ...l, frames: i });
}
function Ga(e, t, n) {
  return ha(
    e,
    t,
    (a) => js(a.rect, n) ? a : { ...a, rect: n }
  );
}
function Mu(e, t, n = !0) {
  return ha(e, t, Xs(n));
}
function Eu(e, t, n = !0) {
  return ha(e, t, Gs(n));
}
function Ot(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (ee(e)) {
    const r = e.frames[n];
    if (!r) return e;
    const o = Ot(r.node, a), i = o === r.node ? r : { ...r, node: o };
    if (n === e.frames.length - 1 && i === r) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(i), { ...e, frames: c };
  }
  const s = ot(e, [n]);
  if (!s) return e;
  const l = Ot(s, a);
  return l === s ? e : mt(e, [n], l);
}
function Pu(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, l) => {
    a && (ee(a) && (n[l] = a.frames.length - 1), a = ot(a, [s]));
  }), n;
}
function cn(e, t, n, a) {
  if (X(e)) return Jt(e, n, (r) => cn(r, t, n, a));
  if (ee(e)) {
    const r = e.frames.findIndex((i) => oe(i.node, n)), o = e.frames[r];
    if (!o) return e;
    if (Se(o.node, n)) {
      const i = cn(o.node, t, n, a);
      if (i === o.node) return e;
      const c = [...e.frames];
      return c[r] = { ...o, node: i }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, wn(Ze(t), a)] };
  }
  if (!oe(e, n)) return e;
  let s = !1;
  const l = e.children.map((r) => {
    const o = cn(r, t, n, a);
    return o !== r && (s = !0), o;
  });
  return s ? { ...e, children: l } : e;
}
function Ya(e, t, n, a) {
  if (t === n || !oe(e, t) || !oe(e, n) || !Se(e, n)) return e;
  const s = vt(e, t);
  if (!s) return e;
  const l = cn(s, t, n, a);
  return l === s ? e : $e(l);
}
function Au(e, t, n) {
  return ee(e) ? { ...e, frames: [...e.frames, wn(Ze(t), n)] } : X(e) ? Qs(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Ze(t)],
    sizes: [...nt(e), 1],
    ...ye(e)
  };
}
function Ys(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return Au(e, t, a);
  const l = n.slice(1), r = (d, h) => h === s ? Ys(d, t, l, a) : vt(d, t);
  if (ee(e)) {
    const d = e.frames.flatMap((h, w) => {
      const $ = r(h.node, w);
      return $ ? [$ === h.node ? h : { ...h, node: $ }] : [];
    });
    return { ...e, frames: d };
  }
  if (X(e)) {
    const d = gt(e), h = [];
    e.panels.forEach((x, A) => {
      if (me(x)) {
        x !== t && h.push(x);
        return;
      }
      const y = r(x, A);
      y && h.push(y);
    });
    const $ = e.active && h.some((x) => Zt(x).includes(e.active)) ? e.active : Ae(h[d] ?? h[h.length - 1]);
    return {
      kind: "group",
      panels: h,
      ...$ ? { active: $ } : {},
      ...ye(e)
    };
  }
  const o = nt(e), i = [], c = [];
  return e.children.forEach((d, h) => {
    const w = r(d, h);
    w && (i.push(w), c.push(o[h] ?? 0));
  }), { kind: "split", direction: e.direction, children: i, sizes: c, ...ye(e) };
}
function Qa(e, t, n, a) {
  const s = ot(e, n);
  return !s || !Us(s) || !oe(e, t) ? e : $e(Ys(e, t, n, a));
}
function Pn(e, t) {
  if (X(e)) return Jt(e, t, (s) => Pn(s, t));
  if (ee(e)) {
    const s = e.frames.findIndex((c) => oe(c.node, t)), l = e.frames[s];
    if (!l) return e;
    const r = Pn(l.node, t), o = r === l.node ? l : { ...l, node: r };
    if (s === e.frames.length - 1 && o === l) return e;
    const i = [...e.frames];
    return i.splice(s, 1), i.push(o), { ...e, frames: i };
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = Pn(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function ga(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((l) => Number.isFinite(l) && l > 0 ? l : 0), s = a.reduce((l, r) => l + r, 0);
  return s <= 0 ? n() : a.map((l) => l / s);
}
const nt = (e) => ga(e.children.length, e.sizes), Ue = (e) => {
  const t = X(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function $e(e) {
  if (X(e)) return Tu(e);
  if (ee(e)) {
    const o = e.frames.flatMap((i) => {
      const c = $e(i.node);
      return In(c) ? [] : [c === i.node ? i : { ...i, node: c }];
    });
    return o.length === e.frames.length && o.every((i, c) => i === e.frames[c]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = nt(e), n = Ue(e), a = [], s = [], l = [];
  e.children.forEach((o, i) => {
    const c = $e(o), d = t[i] ?? 0;
    if (In(c)) return;
    if (!n && zt(c) && c.direction === e.direction && !Ue(c) && !ht(c)) {
      const w = nt(c);
      c.children.forEach(($, x) => {
        a.push($), s.push(d * (w[x] ?? 0));
      });
      return;
    }
    a.push(c), s.push(d);
    const h = n?.[i];
    h && l.push(h);
  });
  const r = a[0];
  return a.length === 1 && r && !ht(e) ? r : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: ga(a.length, s),
    ...ye(e),
    ...l.length === a.length && l.length > 0 ? { places: l } : {}
  };
}
function Tu(e) {
  if (e.panels.every(me)) return e;
  const t = Ae(e), n = Ue(e), a = [], s = [];
  e.panels.forEach((o, i) => {
    const c = n?.[i];
    if (me(o)) {
      a.push(o), c && s.push(c);
      return;
    }
    const d = $e(o);
    if (!In(d)) {
      if (X(d) && !ht(d) && !Ue(d)) {
        a.push(...d.panels);
        return;
      }
      a.push(d), c && s.push(c);
    }
  });
  const l = a[0];
  if (a.length === 1 && l !== void 0 && !me(l) && !ht(e))
    return l;
  if (a.length === e.panels.length && a.every((o, i) => o === e.panels[i]))
    return e;
  const r = t && a.some((o) => Zt(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...r ? { active: r } : {},
    ...ye(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function vt(e, t) {
  if (ee(e)) {
    const r = e.frames.flatMap((o) => {
      const i = vt(o.node, t);
      return i ? [i === o.node ? o : { ...o, node: i }] : [];
    });
    return r.length === 0 && !Nn(e) ? null : { ...e, frames: r };
  }
  if (X(e)) {
    if (!oe(e, t)) return e;
    const r = gt(e), o = [];
    for (const d of e.panels) {
      if (me(d)) {
        d !== t && o.push(d);
        continue;
      }
      const h = vt(d, t);
      h && o.push(h);
    }
    if (o.length === 0) return null;
    const c = e.active && o.some((d) => Zt(d).includes(e.active)) ? e.active : Ae(o[r] ?? o[o.length - 1]);
    return c ? { kind: "group", panels: o, active: c, ...ye(e) } : { kind: "group", panels: o, ...ye(e) };
  }
  const n = nt(e), a = [], s = [];
  if (e.children.forEach((r, o) => {
    const i = vt(r, t);
    i && (a.push(i), s.push(n[o] ?? 0));
  }), a.length === 0)
    return Nn(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...ye(e) } : null;
  const l = a[0];
  return a.length === 1 && l && !ht(e) ? l : $e({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...ye(e)
  });
}
function Qs(e, t, n) {
  const a = e.panels.filter((l) => l !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...ye(e) };
}
function Nt(e, t, n, a, s) {
  const l = ($) => Qt(
    $,
    (x) => oe(x, n) ? Nt(x, t, n, a, s) : x
  );
  if (a === "float") return e;
  const r = ($) => Jt($, n, (x) => Nt(x, t, n, a, s));
  if (a === "center")
    return X(e) ? Ie(e, n) ? Qs(e, t, s) : r(e) : ee(e) ? l(e) : {
      ...e,
      children: e.children.map(
        ($) => oe($, n) ? Nt($, t, n, a, s) : $
      )
    };
  const o = bu(a), i = a === "left" || a === "top", c = ($) => ({
    kind: "split",
    direction: o,
    children: i ? [Ze(t), $] : [$, Ze(t)],
    sizes: [0.5, 0.5]
  });
  if (X(e)) return Ie(e, n) ? c(e) : r(e);
  if (ee(e)) return l(e);
  const d = nt(e), h = e.children.findIndex(
    ($) => X($) && Ie($, n)
  );
  if (h >= 0 && e.direction === o) {
    const $ = (d[h] ?? 0) / 2, x = [...e.children], A = [...d];
    return x.splice(i ? h : h + 1, 0, Ze(t)), A.splice(h, 1, $, $), {
      kind: "split",
      direction: o,
      children: x,
      sizes: A,
      ...ye(e)
    };
  }
  const w = e.children.map(($) => oe($, n) ? X($) && Ie($, n) ? c($) : Nt($, t, n, a) : $);
  return {
    kind: "split",
    direction: e.direction,
    children: w,
    sizes: d,
    ...ye(e)
  };
}
function $t(e, t) {
  if (X(e)) {
    if (Ie(e, t))
      return Hs(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((i) => !me(i) && oe(i, t)), l = e.panels[s];
    if (l === void 0 || me(l)) return e;
    const r = $t(l, t);
    if (r === l && e.active === t) return e;
    const o = [...e.panels];
    return o[s] = r, { ...e, panels: o, active: t };
  }
  if (!oe(e, t)) return e;
  if (ee(e)) return Qt(e, (s) => $t(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const l = $t(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Bt(e, t, n) {
  if (X(e)) {
    if (!Ie(e, t)) return Jt(e, t, (c) => Bt(c, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const l = [...e.panels];
    l.splice(a, 1), l.splice(s, 0, t);
    const r = Ue(e), o = r ? [...r] : void 0;
    o && o.splice(s, 0, ...o.splice(a, 1));
    const i = Ae(e);
    return {
      kind: "group",
      panels: l,
      ...i ? { active: i } : {},
      ...ye(e),
      ...o ? { places: o } : {}
    };
  }
  return oe(e, t) ? ee(e) ? Qt(e, (a) => Bt(a, t, n)) : { ...e, children: e.children.map((a) => Bt(a, t, n)) } : e;
}
function un(e, t, n) {
  if (t === n) return e;
  if (X(e)) {
    if (!oe(e, t) && !oe(e, n)) return e;
    const a = (l) => l === t ? n : l === n ? t : l, s = e.panels.map((l) => me(l) ? a(l) : un(l, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return ee(e) ? Qt(e, (a) => un(a, t, n)) : { ...e, children: e.children.map((a) => un(a, t, n)) };
}
function an(e, t, n, a, s) {
  if (a === "float" || !oe(e, t) || !oe(e, n)) return e;
  const l = kt(e, t);
  if (a === "center" && l && Ie(l, n)) {
    if (s === void 0) return e;
    const o = l.panels.indexOf(t), i = s > o ? s - 1 : s;
    return i === o ? e : $t(Bt(e, t, i), t);
  }
  if (t === n) return e;
  const r = vt(e, t);
  return r ? $e(Nt(r, t, n, a, s)) : e;
}
function Zs(e, t, n) {
  if (X(e)) {
    const s = e.panels[t];
    if (s === void 0 || me(s)) return e;
    const l = [...e.panels];
    return l[t] = n, { ...e, panels: l };
  }
  if (ee(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const l = [...e.frames];
    return l[t] = { ...s, node: n }, { ...e, frames: l };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function en(e, t, n) {
  const a = kn(e);
  if (!X(e) && a.some(({ node: s }) => X(s) && Ie(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: l } of a) {
    if (!oe(s, t)) continue;
    const r = en(s, t, n);
    return r ? Zs(e, l, r) : null;
  }
  return null;
}
function ef(e, t, n) {
  const a = en(
    e,
    t,
    (s) => zt(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? $e(a) : e;
}
function Js(e) {
  return ee(e) ? [e] : Ue(e) || ht(e) ? [e] : X(e) ? [...e.panels] : e.children.flatMap(Js);
}
function el(e, t) {
  if (X(e)) return e;
  const n = ma(e).map(Js), a = n.flat(), s = t && a.some((r) => Zt(r).includes(t)) ? t : void 0, l = zu(e, n);
  return $e({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...ye(e),
    ...l ? { places: l } : {}
  });
}
function zu(e, t) {
  const n = ee(e) ? e.frames.map(({ node: a, ...s }) => s) : Ue(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function Lu(e, t) {
  const n = en(e, t, (a) => el(a, t));
  return n ? $e(n) : e;
}
function _a(e, t, n) {
  if (X(e) && Ie(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of kn(e)) {
    if (!oe(a, t)) continue;
    const l = _a(a, t, n);
    return l ? Zs(e, s, l) : null;
  }
  return null;
}
function Za(e, t, n) {
  const a = _a(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const l = Ue(s);
    return {
      ...pa(n, s.panels.map(ua)),
      ...ye(s),
      ...l ? { places: l } : {}
    };
  });
  return a ? $e(a) : e;
}
function On(e, t) {
  if (X(e)) return e;
  if (ee(e)) {
    const s = e.frames.findIndex(
      (o) => X(o.node) && o.node.panels.includes(t)
    ), l = e.frames[s], r = l && X(l.node) ? l.node : null;
    if (l && r && r.panels.length > 1) {
      const o = fa(r.panels.map(ua), l.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...o, ...e.frames.slice(s + 1)]
      };
    }
    return Qt(e, (o) => On(o, t));
  }
  if (!oe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const l = On(s, t);
    return l !== s && (n = !0), l;
  });
  return n ? { ...e, children: a } : e;
}
function Ru(e, t, n) {
  const a = kt(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Se(e, t)?.node === a) {
    const r = On(e, t);
    return r === e ? e : $e(r);
  }
  const l = _a(e, t, (r) => ({
    ...da(tl(r.panels.map(ua), Ue(r), n)),
    ...ye(r)
  }));
  return l ? $e(l) : e;
}
function tl(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : fa(e, n).frames;
}
function nl(e, t) {
  return { ...da(tl(e.children, Ue(e), t)), ...ye(e) };
}
function tf(e, t, n) {
  const a = en(
    e,
    t,
    (s) => ee(s) ? s : nl(s, n)
  );
  return a ? $e(a) : X(e) && Ie(e, t) ? fa([e], n) : e;
}
function Fu(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, l) => n(s) - n(l) || a(s) - a(l));
}
function al(e, t) {
  const n = Fu(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...ye(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function nf(e, t, n = "row") {
  const a = en(
    e,
    t,
    (s) => ee(s) ? al(s, n) : s
  );
  return a ? $e(a) : e;
}
function sl(e) {
  if (ee(e)) return null;
  const t = X(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || me(t) || X(t) && t.panels.length === 1 && me(t.panels[0]) ? null : t;
}
const Nu = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function Iu(e, t) {
  const n = sl(e);
  return n ? t === "inner" ? n : { ...Nu(n), ...ye(e) } : e;
}
function Pt(e) {
  return e.title ? e.title : X(e) ? "" : ee(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function qt(e, t) {
  if (X(e)) {
    const a = e.panels[gt(e)];
    return a === void 0 ? "" : me(a) ? t(a) ?? a : Pt(a) || qt(a, t);
  }
  if (e.title) return e.title;
  if (ee(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? qt(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? qt(n, t) : "";
}
function ot(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (zt(n)) n = n.children[a];
    else if (ee(n)) n = n.frames[a]?.node;
    else {
      const s = n.panels[a];
      n = s === void 0 || me(s) ? void 0 : s;
    }
  }
  return n ?? null;
}
function mt(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (ee(e)) {
    const i = e.frames[a];
    if (!i) return e;
    const c = mt(i.node, s, n);
    if (c === i.node) return e;
    const d = [...e.frames];
    return d[a] = { ...i, node: c }, { ...e, frames: d };
  }
  if (X(e)) {
    const i = e.panels[a];
    if (i === void 0 || me(i)) return e;
    const c = mt(i, s, n);
    if (c === i) return e;
    const d = [...e.panels];
    return d[a] = c, { ...e, panels: d };
  }
  const l = e.children[a];
  if (!l) return e;
  const r = mt(l, s, n);
  if (r === l) return e;
  const o = [...e.children];
  return o[a] = r, { ...e, children: o };
}
function dn(e, t, n) {
  if (t.length === 0)
    return zt(e) ? { ...e, sizes: ga(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (ee(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const i = dn(o.node, s, n);
    if (i === o.node) return e;
    const c = [...e.frames];
    return c[a] = { ...o, node: i }, { ...e, frames: c };
  }
  if (X(e)) {
    const o = e.panels[a];
    if (o === void 0 || me(o)) return e;
    const i = dn(o, s, n);
    if (i === o) return e;
    const c = [...e.panels];
    return c[a] = i, { ...e, panels: c };
  }
  const l = e.children[a];
  if (!l) return e;
  const r = [...e.children];
  return r[a] = dn(l, s, n), { ...e, children: r };
}
function Ja(e, t, n, a = 0.02) {
  const s = e[t], l = e[t + 1];
  if (s === void 0 || l === void 0) return e;
  const r = s + l;
  if (r < a * 2) return e;
  const o = [...e], i = Math.min(Math.max(s + n, a), r - a);
  return o[t] = i, o[t + 1] = r - i, o;
}
function gn(e) {
  if (!X(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !me(t) ? e : { ...va([Du(e)]), ...ye(e) };
}
const Du = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function es(e) {
  return e.length === 0 ? null : va(e.map(Ze));
}
function Ou(e, t) {
  if (!e) return es(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const i of at(e))
    !n.has(i) || a.has(i) ? s.add(i) : a.add(i);
  let l = e;
  for (const i of s)
    l = l ? vt(l, i) : null;
  const r = new Set(l ? at(l) : []), o = t.filter((i) => !r.has(i));
  if (o.length === 0) return l ? gn($e(l)) : null;
  if (!l) return es(o);
  if (ee(l)) {
    const i = l.frames.length;
    return {
      ...l,
      frames: [
        ...l.frames,
        ...o.map(
          (c, d) => wn(Ze(c), {
            x: pt.x + (i + d) * hn,
            y: pt.y + (i + d) * hn
          })
        )
      ]
    };
  }
  return gn($e(va([l, ...o.map(Ze)])));
}
const ya = Symbol("dc.windowContext");
function Bu(e) {
  return Bn(ya, e), e;
}
function wa() {
  const e = Ct(ya, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const qu = ["data-dc-glyph"], Ku = { class: "dc-glyph__line" }, Vu = ["d"], Wu = {
  key: 0,
  class: "dc-glyph__aqua"
}, Uu = ["d"], Hu = /* @__PURE__ */ re({
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
    return (a, s) => (f(), m("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      k("g", Ku, [
        (f(!0), m(ae, null, ve(t[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, Vu))), 128))
      ]),
      n[e.kind] ? (f(), m("g", Wu, [
        (f(!0), m(ae, null, ve(n[e.kind], (l) => (f(), m("path", {
          key: l,
          d: l
        }, null, 8, Uu))), 128))
      ])) : R("", !0)
    ], 8, qu));
  }
}), xt = /* @__PURE__ */ ce(Hu, [["__scopeId", "data-v-4d2872c0"]]), ju = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Xu = ["data-dc-movable"], Gu = { class: "dc-float__title dc-truncate" }, Yu = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Qu = ["aria-label", "aria-pressed", "data-dc-minimize"], Zu = ["aria-label", "aria-pressed", "data-dc-maximize"], Ju = ["aria-label", "data-dc-close"], ed = { class: "dc-float__content" }, td = ["data-dc-handle", "onPointerdown"], nd = /* @__PURE__ */ re({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = wa(), a = v(() => Ae(t.frame.node)), s = v(() => n.panelFor(a.value)?.fixed === !0), l = v(() => lt(t.frame)), r = v(() => dt(t.frame)), o = v(() => l.value || r.value), i = v(() => n.resizable.value && !s.value && !o.value), c = v(() => n.movable.value && !s.value && !o.value), d = v(() => {
      const I = at(t.frame.node);
      return I.length === 1 ? I[0] ?? null : null;
    }), h = v(() => d.value !== null && n.closable(d.value)), w = v(() => t.frame.node.headless === !0), $ = v(
      () => !w.value && (!X(t.frame.node) || r.value)
    ), x = v(
      () => t.frame.title || Pt(t.frame.node) || qt(t.frame.node, (I) => n.panelFor(I)?.title)
    ), A = v(() => n.spaceMenu(t.path));
    function y(I) {
      I.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, I, "move");
    }
    function b(I) {
      I.target?.closest("button, a, input, select, textarea, label") || (r.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const L = v(() => {
      const I = n.framing.value;
      return I !== null && oe(t.frame.node, I);
    }), T = v(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...l.value ? { inset: "0" } : r.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Fn}px`,
        height: `${Ws}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), z = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (I, U) => (f(), m("div", {
      class: "dc-float",
      style: Le(T.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": l.value ? "true" : "false",
      "data-dc-minimized": r.value ? "true" : "false",
      "data-dc-dragging": L.value ? "true" : "false",
      onPointerdown: U[3] || (U[3] = (_) => P(n).raiseAt(e.path))
    }, [
      $.value ? (f(), m("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: y,
        onDblclick: b
      }, [
        k("span", Gu, N(x.value), 1),
        A.value.length ? (f(), ne(ca, {
          key: 0,
          items: A.value,
          label: `${x.value} menu`
        }, null, 8, ["items", "label"])) : R("", !0),
        !s.value || r.value && h.value && d.value ? (f(), m("div", Yu, [
          s.value ? R("", !0) : (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Unroll" : "Minimize"} ${x.value}`,
            "aria-pressed": r.value,
            "data-dc-minimize": a.value,
            onClick: U[0] || (U[0] = (_) => P(n).toggleMinimizeAt(e.path))
          }, [
            pe(xt, {
              kind: r.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Qu)),
          s.value ? R("", !0) : (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Restore" : "Maximize"} ${x.value}`,
            "aria-pressed": l.value,
            "data-dc-maximize": a.value,
            onClick: U[1] || (U[1] = (_) => P(n).toggleMaximizeAt(e.path))
          }, [
            pe(xt, {
              kind: l.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Zu)),
          r.value && h.value && d.value ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${x.value}`,
            "data-dc-close": d.value,
            onClick: U[2] || (U[2] = (_) => P(n).close(d.value))
          }, [
            pe(xt, { kind: "close" })
          ], 8, Ju)) : R("", !0)
        ])) : R("", !0)
      ], 40, Xu)) : R("", !0),
      k("div", ed, [
        be(I.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), m(ae, null, ve(i.value ? z : [], (_) => (f(), m("span", {
        key: _,
        class: "dc-float__grip",
        "data-dc-handle": _,
        "aria-hidden": "true",
        onPointerdown: ze((M) => P(n).beginFrameDragAt(e.path, M, _), ["stop"])
      }, null, 40, td))), 128))
    ], 44, ju));
  }
}), ad = /* @__PURE__ */ ce(nd, [["__scopeId", "data-v-f035684c"]]), ka = Symbol("dc.paneContext");
function sd(e) {
  return Bn(ka, e), e;
}
function af() {
  return Ct(ka, null);
}
function sf(e) {
  const t = Ct(ya, null), n = Ct(ka, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Ft(e)
  );
  return Ml() && ns(a), a;
}
const ld = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], rd = ["data-dc-movable"], od = ["aria-label", "aria-pressed"], id = ["data-dc-space-name"], cd = { class: "dc-truncate" }, ud = ["aria-label"], dd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, fd = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], pd = { class: "dc-tab__name dc-truncate" }, vd = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, md = ["aria-label", "data-dc-close", "onClick"], hd = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, gd = { class: "dc-pane__tools" }, _d = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, yd = ["aria-label", "data-dc-minimize"], wd = ["aria-label", "aria-pressed", "data-dc-maximize"], kd = ["aria-label", "data-dc-close"], bd = ["id", "role", "aria-labelledby"], $d = ["id", "role", "aria-labelledby"], xd = ["data-dc-edge"], Cd = /* @__PURE__ */ re({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = wa(), a = qn() ?? "dc-pane", s = v(
      () => t.group.panels.flatMap((S, W) => {
        if (!me(S)) {
          const Ce = Pt(S) || qt(S, (Ee) => n.panelFor(Ee)?.title);
          return [{ kind: "space", index: W, id: `space-${W}`, title: Ce, node: S }];
        }
        const te = n.panelFor(S);
        return te ? [{ kind: "panel", index: W, id: S, title: te.title, panel: te }] : [];
      })
    ), l = v(() => s.value.length > 1), r = v(() => {
      const S = gt(t.group);
      return s.value.find((W) => W.index === S) ?? s.value[0] ?? null;
    }), o = v(() => r.value?.kind === "space" ? r.value.node : null), i = v(() => o.value ? "" : Hs(t.group)), c = v(() => o.value ? null : n.panelFor(i.value)), d = v(() => r.value?.title ?? ""), h = v(() => n.spaceNames.value ? t.group.title ?? "" : ""), w = v(() => [...t.path, r.value?.index ?? 0]), $ = v(() => i.value || ja(t.group)[0] || ""), x = v(() => n.viewFor(i.value)), A = v(() => t.group.headless === !0), y = v(() => n.focused.value === i.value), b = v(() => n.dragging.value === i.value), L = v(() => n.moving.value === i.value), T = v(() => n.frameOf($.value) !== null), z = v(() => n.panelFor($.value)?.fixed === !0), I = v(
      () => !o.value && (n.canMove(i.value) || T.value && n.movable.value && !z.value)
    ), U = v(
      () => o.value ? n.spaceMenu(w.value) : n.menuFor(i.value)
    ), _ = (S) => n.closable(S);
    sd({ panel: i });
    const M = v(() => n.maximized($.value)), D = v(
      () => T.value && !z.value || !l.value && !!c.value && _(c.value.id)
    ), j = (S) => `${a}-tab-${S}`, ue = v(() => `${a}-body`), Q = v(() => {
      const S = n.dropTarget.value;
      return !S || !Ie(t.group, S.panel) || S.edge === "float" ? null : S;
    }), _e = v(() => Q.value?.index === void 0 ? Q.value?.edge ?? null : null), xe = v(() => Q.value?.index ?? null), C = () => c.value ? n.renderContent(c.value, x.value, y.value) ?? null : null, q = () => c.value ? n.renderActions(c.value, x.value, y.value) ?? null : null;
    let H = null;
    function se(S) {
      const W = H !== null && Math.hypot(S.clientX - H.x, S.clientY - H.y) >= 4;
      return H = null, W;
    }
    const he = (S) => S.kind === "panel" ? S.id : Ae(S.node);
    function Me(S, W) {
      W.kind !== "space" && (n.focus(W.id), H = { x: S.clientX, y: S.clientY }, n.beginDrag(W.id, S));
    }
    function Te(S, W) {
      if (se(S)) return;
      const te = he(W);
      te && n.selectPanel(te);
    }
    function He(S) {
      i.value && n.focus(i.value), !S.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (T.value ? n.beginFrameDrag($.value, S, "move") : n.beginDrag(i.value, S));
    }
    function je(S) {
      H = { x: S.clientX, y: S.clientY }, n.beginDrag(i.value, S);
    }
    function Xe(S) {
      se(S) || n.toggleMoveMode(i.value);
    }
    const Oe = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Fe(S) {
      if (!L.value) return;
      if (S.key === "Escape") {
        S.preventDefault(), n.toggleMoveMode(i.value);
        return;
      }
      const W = Oe[S.key];
      W && (S.preventDefault(), T.value ? n.nudgeFrame(i.value, W, S.shiftKey) : n.nudge(i.value, W, S.shiftKey));
    }
    function Be(S) {
      !T.value || S.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize($.value);
    }
    function O(S, W) {
      S.stopPropagation(), H = null, n.close(W);
    }
    function G(S, W) {
      const te = s.value.length;
      let Ce = null;
      if (S.key === "ArrowRight" ? Ce = (W + 1) % te : S.key === "ArrowLeft" ? Ce = (W - 1 + te) % te : S.key === "Home" ? Ce = 0 : S.key === "End" && (Ce = te - 1), Ce === null) return;
      S.preventDefault();
      const Ee = s.value[Ce];
      if (!Ee) return;
      const Lt = he(Ee);
      Lt && n.selectPanel(Lt);
    }
    return (S, W) => r.value ? (f(), m("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": i.value || void 0,
      "data-dc-panels": P(ja)(e.group).join(" ") || void 0,
      "data-dc-tabbed": l.value ? "true" : "false",
      "data-dc-floating": T.value ? "true" : "false",
      "data-dc-maximized": M.value ? "true" : "false",
      "data-dc-headless": A.value ? "true" : "false",
      "data-dc-active": y.value ? "true" : "false",
      "data-dc-dragging": b.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: W[7] || (W[7] = (te) => i.value && P(n).focus(i.value))
    }, [
      A.value ? R("", !0) : (f(), m("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": I.value ? "true" : "false",
        onPointerdown: He,
        onDblclick: Be
      }, [
        I.value ? (f(), m("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": L.value,
          onPointerdown: je,
          onClick: Xe,
          onKeydown: Fe
        }, [...W[8] || (W[8] = [
          k("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, od)) : R("", !0),
        h.value ? (f(), m("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": h.value
        }, [
          k("span", cd, N(h.value), 1)
        ], 8, id)) : R("", !0),
        k("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), m(ae, null, ve(s.value, (te, Ce) => (f(), m(ae, {
            key: te.id
          }, [
            xe.value === Ce ? (f(), m("span", dd)) : R("", !0),
            k("button", {
              id: j(te.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": te.kind === "panel" ? te.id : void 0,
              "data-dc-space": te.kind === "space" ? te.title : void 0,
              "aria-selected": te.index === r.value.index,
              "aria-controls": ue.value,
              tabindex: te.index === r.value.index ? 0 : -1,
              onPointerdown: (Ee) => Me(Ee, te),
              onClick: (Ee) => Te(Ee, te),
              onKeydown: (Ee) => G(Ee, Ce)
            }, [
              k("span", pd, N(te.title), 1),
              te.kind === "panel" && te.panel.subtitle ? (f(), m("span", vd, N(te.panel.subtitle), 1)) : R("", !0),
              l.value && te.kind === "panel" && _(te.id) ? (f(), m("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${te.title}`,
                "data-dc-close": te.id,
                onPointerdown: W[0] || (W[0] = ze(() => {
                }, ["stop"])),
                onClick: (Ee) => O(Ee, te.id)
              }, [...W[9] || (W[9] = [
                k("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, md)) : R("", !0)
            ], 40, fd)
          ], 64))), 128)),
          xe.value === s.value.length ? (f(), m("span", hd)) : R("", !0)
        ], 8, ud),
        k("div", gd, [
          pe(q),
          U.value.length ? (f(), ne(ca, {
            key: 0,
            items: U.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ]),
        D.value ? (f(), m("div", _d, [
          T.value && !z.value ? (f(), m("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": $.value,
            onPointerdown: W[1] || (W[1] = ze(() => {
            }, ["stop"])),
            onClick: W[2] || (W[2] = (te) => P(n).toggleMinimize($.value))
          }, [
            pe(xt, { kind: "minimize" })
          ], 40, yd)) : R("", !0),
          T.value && !z.value ? (f(), m("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${M.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": M.value,
            "data-dc-maximize": $.value,
            onPointerdown: W[3] || (W[3] = ze(() => {
            }, ["stop"])),
            onClick: W[4] || (W[4] = (te) => P(n).toggleMaximize($.value))
          }, [
            pe(xt, {
              kind: M.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, wd)) : R("", !0),
          !l.value && c.value && _(c.value.id) ? (f(), m("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: W[5] || (W[5] = ze(() => {
            }, ["stop"])),
            onClick: W[6] || (W[6] = (te) => P(n).close(c.value.id))
          }, [
            pe(xt, { kind: "close" })
          ], 40, kd)) : R("", !0)
        ])) : R("", !0)
      ], 40, rd)),
      o.value ? (f(), m("div", {
        key: 1,
        id: ue.value,
        class: "dc-pane__space",
        role: A.value ? void 0 : "tabpanel",
        "aria-labelledby": A.value ? void 0 : j(r.value.id)
      }, [
        be(S.$slots, "space", {
          node: o.value,
          path: w.value
        }, void 0, !0)
      ], 8, bd)) : (f(), m("div", {
        key: 2,
        id: ue.value,
        class: "dc-pane__body",
        role: A.value ? void 0 : "tabpanel",
        "aria-labelledby": A.value ? void 0 : j(i.value)
      }, [
        pe(C)
      ], 8, $d)),
      _e.value ? (f(), m("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": _e.value,
        "aria-hidden": "true"
      }, null, 8, xd)) : R("", !0)
    ], 40, ld)) : R("", !0);
  }
}), ll = /* @__PURE__ */ ce(Cd, [["__scopeId", "data-v-44fd2b2d"]]), Sd = ["data-dc-space", "data-dc-path", "aria-label"], Md = {
  key: 0,
  class: "dc-space__head"
}, Ed = { class: "dc-space__title dc-truncate" }, Pd = ["data-dc-direction"], Ad = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Td = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], zd = /* @__PURE__ */ re({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = wa(), a = V(null), s = v(() => X(t.node) ? t.node : null), l = v(() => zt(t.node) ? t.node : null), r = v(() => ee(t.node) ? t.node : null), o = v(
      () => l.value ? l.value.children : r.value?.frames.map((C) => C.node) ?? []
    ), i = v(() => l.value ? nt(l.value) : []), c = v(
      () => (r.value?.frames ?? []).map((C, q) => ({
        held: C,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: q,
        key: _(C.node),
        path: [...t.path, q]
      })).sort((C, q) => C.key < q.key ? -1 : C.key > q.key ? 1 : 0)
    ), d = v(() => Pt(t.node)), h = v(() => n.spaceMenu(t.path)), w = v(() => t.node.headless === !0), $ = v(() => r.value ? "desktop" : l.value?.direction ?? ""), x = V(null), A = V(0);
    let y = null;
    we(
      x,
      (C) => {
        y?.disconnect(), y = null, !(!C || typeof ResizeObserver > "u") && (A.value = C.clientWidth, y = new ResizeObserver(([q]) => {
          A.value = q?.contentRect.width ?? 0;
        }), y.observe(C));
      },
      { immediate: !0 }
    ), Ve(() => y?.disconnect());
    const b = v(() => {
      const C = Math.max(
        1,
        Math.floor((A.value + yt) / (Fn + yt))
      ), q = /* @__PURE__ */ new Map();
      let H = 0;
      for (const se of c.value)
        se.held.minimized === !0 && (q.set(se.key, {
          x: yt + H % C * (Fn + yt),
          bottom: yt + Math.floor(H / C) * (Ws + yt)
        }), H += 1);
      return q;
    }), L = (C) => !!C && C.join("/") === t.path.join("/"), T = v(() => {
      const C = n.dropTarget.value, q = r.value;
      if (!q || !C?.rect || C.edge !== "float") return null;
      if (C.space) return L(C.space) ? C.rect : null;
      const H = Se(q, C.panel);
      return H && q.frames.includes(H) ? C.rect : null;
    }), z = v(() => {
      const C = n.dropTarget.value;
      return !!C && !C.rect && L(C.space);
    }), I = v(() => l.value?.direction === "row"), U = v(() => o.value.map((C, q) => [...t.path, q])), _ = (C) => [...at(C)].sort().join("/"), M = (C) => {
      const q = at(C)[0];
      return (q ? n.panelFor(q)?.title : null) ?? q ?? "panel";
    }, D = (C) => {
      const q = o.value[C], H = o.value[C + 1];
      return !q || !H ? "Resize panels" : `Resize ${M(q)} and ${M(H)}`;
    }, j = (C) => {
      const q = i.value[C] ?? 0, H = i.value[C + 1] ?? 0, se = q + H;
      return se > 0 ? Math.round(q / se * 100) : 50;
    };
    function ue() {
      const C = a.value, q = C ? I.value ? C.clientWidth : C.clientHeight : 0;
      return q <= 0 ? 0.05 : Math.min(n.minPanelSize.value / q, 0.4);
    }
    let Q = null;
    function _e(C, q) {
      const H = l.value, se = a.value;
      if (!n.resizable.value || !H || !se || C.button !== 0) return;
      const he = I.value ? se.clientWidth : se.clientHeight;
      if (he <= 0) return;
      const Me = I.value ? C.clientX : C.clientY, Te = nt(H), He = Math.min(n.minPanelSize.value / he, 0.4);
      C.preventDefault();
      const je = (Fe) => {
        const Be = ((I.value ? Fe.clientX : Fe.clientY) - Me) / he;
        n.setSizes(t.path, Ja(Te, q, Be, He));
      }, Xe = () => Q?.(), Oe = (Fe) => {
        Fe.key === "Escape" && (n.setSizes(t.path, Te), Q?.());
      };
      Q = () => {
        window.removeEventListener("pointermove", je), window.removeEventListener("pointerup", Xe), window.removeEventListener("pointercancel", Xe), window.removeEventListener("keydown", Oe), Q = null;
      }, window.addEventListener("pointermove", je), window.addEventListener("pointerup", Xe), window.addEventListener("pointercancel", Xe), window.addEventListener("keydown", Oe);
    }
    Ve(() => Q?.());
    function xe(C, q) {
      const H = l.value;
      if (!n.resizable.value || !H) return;
      const se = I.value ? "ArrowRight" : "ArrowDown", he = I.value ? "ArrowLeft" : "ArrowUp", Me = C.shiftKey ? 0.1 : 0.02;
      if (C.key !== se && C.key !== he) return;
      const Te = C.key === se ? Me : -Me;
      C.preventDefault(), n.setSizes(t.path, Ja(nt(H), q, Te, ue()));
    }
    return (C, q) => {
      const H = as("WindowNode", !0);
      return s.value ? (f(), ne(ll, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Qe(({ node: se, path: he }) => [
          pe(H, {
            node: se,
            path: he,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), m("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": $.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !w.value ? (f(), m("header", Md, [
          k("span", Ed, N(d.value), 1),
          h.value.length ? (f(), ne(ca, {
            key: 0,
            items: h.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : R("", !0)
        ])) : R("", !0),
        r.value ? (f(), m("div", {
          key: 1,
          ref_key: "desktop",
          ref: x,
          class: "dc-window__desktop"
        }, [
          T.value ? (f(), m("div", {
            key: 0,
            class: "dc-window__drop",
            style: Le({
              left: `${T.value.x}px`,
              top: `${T.value.y}px`,
              width: `${T.value.w}px`,
              height: `${T.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : R("", !0),
          (f(!0), m(ae, null, ve(c.value, (se) => (f(), ne(ad, {
            key: se.key,
            frame: se.held,
            path: se.path,
            order: se.order,
            place: b.value.get(se.key) ?? null
          }, {
            default: Qe(() => [
              pe(H, {
                node: se.held.node,
                path: se.path,
                framed: se.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : l.value ? (f(), m("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": l.value.direction
        }, [
          z.value ? (f(), m("div", Ad)) : R("", !0),
          (f(!0), m(ae, null, ve(o.value, (se, he) => (f(), m(ae, {
            key: _(se)
          }, [
            k("div", {
              class: "dc-window__cell",
              style: Le({ flexGrow: i.value[he] ?? 1 })
            }, [
              pe(H, {
                node: se,
                path: U.value[he] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            he < o.value.length - 1 ? (f(), m("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": I.value ? "vertical" : "horizontal",
              "aria-label": D(he),
              "aria-valuenow": j(he),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (Me) => _e(Me, he),
              onKeydown: (Me) => xe(Me, he)
            }, null, 40, Td)) : R("", !0)
          ], 64))), 128))
        ], 8, Pd)) : R("", !0)
      ], 8, Sd));
    };
  }
}), Ld = /* @__PURE__ */ ce(zd, [["__scopeId", "data-v-fb5b403f"]]), Rd = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Fd = {
  key: 1,
  class: "dc-window__empty"
}, Nd = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, sn = 16, Id = /* @__PURE__ */ re({
  __name: "WindowFrame",
  props: /* @__PURE__ */ vn({
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
  emits: /* @__PURE__ */ vn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, l = It(e, "layout"), r = It(e, "views"), o = Ut(), i = v(() => new Map(a.panels.map((u) => [u.id, u]))), c = v(() => a.panels.map((u) => u.id)), d = v(() => Ou(l.value, c.value)), h = V(null), w = V(null), $ = V(null), x = V(!0), A = V(null), y = V(null), b = V(null), L = V(""), T = V(null);
    function z() {
      const u = T.value;
      return u ? [...u.querySelectorAll(".dc-pane[data-dc-panels]")].filter((g) => g.closest(".dc-window") === u).map((g) => ({ panels: (g.dataset.dcPanels ?? "").split(" "), element: g })) : [];
    }
    function I(u) {
      const p = [];
      let g = u.closest(".dc-float");
      for (; g; )
        p.unshift(Number(g.dataset.dcOrder ?? 0)), g = g.parentElement?.closest(".dc-float") ?? null;
      return p;
    }
    function U() {
      return z().map((u) => ({ pane: u, order: I(u.element) })).sort((u, p) => {
        const g = Math.max(u.order.length, p.order.length);
        for (let E = 0; E < g; E += 1) {
          const F = (u.order[E] ?? -1) - (p.order[E] ?? -1);
          if (F !== 0) return F;
        }
        return 0;
      }).map((u) => u.pane);
    }
    const _ = (u) => z().find((p) => p.panels.includes(u)) ?? null;
    function M(u) {
      const p = i.value.get(u);
      if (!p) return "";
      const g = r.value[u];
      return g && p.views?.some((E) => E.key === g) ? g : p.defaultView ?? p.views?.[0]?.key ?? "";
    }
    function D(u, p) {
      r.value = { ...r.value, [u]: p }, s("view-change", { panel: u, view: p });
    }
    const j = v(
      () => a.panels.filter((u) => u.fixed !== !0).length
    );
    function ue(u) {
      return !a.movable || j.value < 1 || a.panels.length < 2 ? !1 : i.value.get(u)?.fixed !== !0;
    }
    function Q(u, p) {
      const g = d.value;
      !u || !g || u === g || (l.value = u, p && s("panel-move", p));
    }
    function _e(u, p, g) {
      if (u.width <= 0 || u.height <= 0) return "center";
      const E = (p - u.left) / u.width, F = (g - u.top) / u.height, B = 0.3;
      return E > B && E < 1 - B && F > B && F < 1 - B ? "center" : [
        { edge: "left", distance: E },
        { edge: "right", distance: 1 - E },
        { edge: "top", distance: F },
        { edge: "bottom", distance: 1 - F }
      ].reduce(
        (le, K) => K.distance < le.distance ? K : le
      ).edge;
    }
    function xe(u, p) {
      const g = [...u.querySelectorAll(".dc-tab")], E = g.findIndex((F) => {
        const B = F.getBoundingClientRect();
        return p < B.left + B.width / 2;
      });
      return E === -1 ? g.length : E;
    }
    function C(u, p, g) {
      for (const { panels: E, element: F } of U().reverse()) {
        const B = F.getBoundingClientRect();
        if (u < B.left || u > B.right || p < B.top || p > B.bottom) continue;
        const de = E.find((Z) => Z !== g), le = F.querySelector(".dc-pane__tabs"), K = le?.getBoundingClientRect();
        if (le && K && p >= K.top && p <= K.bottom)
          return de ? { panel: de, edge: "center", index: xe(le, u) } : null;
        const Y = F.querySelector(":scope > .dc-pane__space");
        if (Y) {
          const Z = Y.getBoundingClientRect();
          if (u >= Z.left && u <= Z.right && p >= Z.top && p <= Z.bottom) continue;
        }
        return de ? { panel: de, edge: _e(B, u, p) } : null;
      }
      return H(u, p, g) ?? Me(u, p);
    }
    function q() {
      const u = T.value;
      return u ? [...u.querySelectorAll(".dc-window__desktop")].filter((p) => p.closest(".dc-window") === u).reverse() : [];
    }
    function H(u, p, g) {
      const E = d.value;
      if (!E) return null;
      for (const F of q()) {
        const B = F.getBoundingClientRect();
        if (u < B.left || u > B.right || p < B.top || p > B.bottom) continue;
        const de = Te(F), le = de.flatMap((ie) => ie.panels).find((ie) => ie !== g);
        if (!le && de.length > 0) return null;
        const K = Se(E, g)?.rect, Y = En(
          {
            x: u - B.left - 24,
            y: p - B.top - 12,
            w: K?.w ?? pt.w,
            h: K?.h ?? pt.h
          },
          { w: F.clientWidth, h: F.clientHeight },
          a.minPanelSize
        );
        if (le) return { panel: le, edge: "float", rect: Y };
        const Z = se(F);
        return Z ? { panel: "", space: Z, edge: "float", rect: Y } : null;
      }
      return null;
    }
    function se(u) {
      const p = u.closest(".dc-space")?.getAttribute("data-dc-path");
      return p == null ? null : p === "" ? [] : p.split("/").map(Number);
    }
    function he() {
      const u = T.value;
      return u ? [...u.querySelectorAll(".dc-space")].filter((p) => p.closest(".dc-window") === u).filter((p) => !p.querySelector(".dc-pane")).reverse().flatMap((p) => {
        const g = se(p);
        return g ? [{ element: p, path: g }] : [];
      }) : [];
    }
    function Me(u, p) {
      for (const { element: g, path: E } of he()) {
        if (g.dataset.dcSpace === "desktop") continue;
        const F = g.getBoundingClientRect();
        if (!(u < F.left || u > F.right || p < F.top || p > F.bottom))
          return { panel: "", space: E, edge: "center" };
      }
      return null;
    }
    function Te(u) {
      return z().filter(
        (p) => p.element.closest(".dc-window__desktop") === u
      );
    }
    let He = null;
    const je = (u) => u.altKey;
    function Xe(u, p) {
      if (!ue(u) || w.value || y.value || p.button !== 0) return;
      const g = p.clientX, E = p.clientY;
      let F = !1, B = je(p);
      const de = () => {
        const fe = b.value;
        fe && ($.value = B ? H(fe.x, fe.y, u) : C(fe.x, fe.y, u));
      }, le = (fe) => {
        if (!F) {
          if (Math.hypot(fe.clientX - g, fe.clientY - E) < 4) return;
          F = !0, w.value = u, A.value = null;
        }
        B = je(fe), x.value = !B, b.value = { x: fe.clientX, y: fe.clientY }, de();
      }, K = (fe) => {
        je(fe) !== B && (B = !B, x.value = !B, F && de());
      }, Y = (fe) => {
        He?.();
        const J = $.value, Pe = d.value;
        if (fe && F && J && Pe) {
          const st = J.space ? Qa(Pe, u, J.space, J.rect) : J.edge === "float" && J.rect ? Ya(Pe, u, J.panel, J.rect) : an(Pe, u, J.panel, J.edge, J.index);
          Q(st, {
            panel: u,
            target: J.panel,
            edge: J.edge,
            ...J.space === void 0 ? {} : { space: J.space },
            ...J.index === void 0 ? {} : { index: J.index },
            ...J.rect === void 0 ? {} : { rect: J.rect }
          });
        }
        w.value = null, $.value = null, b.value = null, x.value = !0;
      }, Z = () => Y(!0), ie = () => Y(!1), ge = (fe) => {
        if (fe.key === "Escape") {
          Y(!1);
          return;
        }
        K(fe);
      };
      He = () => {
        window.removeEventListener("pointermove", le), window.removeEventListener("pointerup", Z), window.removeEventListener("pointercancel", ie), window.removeEventListener("keydown", ge), window.removeEventListener("keyup", K), He = null;
      }, window.addEventListener("pointermove", le), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", ie), window.addEventListener("keydown", ge), window.addEventListener("keyup", K);
    }
    Ve(() => He?.());
    let Oe = null;
    function Fe(u) {
      const p = T.value;
      return p ? [...p.querySelectorAll(
        `.dc-float[data-dc-path="${u.join("/")}"]`
      )].find((F) => F.closest(".dc-window") === p)?.parentElement ?? null : null;
    }
    function Be(u) {
      const p = d.value;
      return p ? Dn(p, u) : null;
    }
    function O(u) {
      const p = d.value;
      if (!p) return;
      const g = Ot(p, u);
      g !== p && (l.value = g);
    }
    function G(u) {
      const p = Be(u);
      p && O(p);
    }
    function S(u) {
      const p = d.value, g = p ? Se(p, u) : null;
      return g !== null && lt(g);
    }
    function W(u) {
      const p = d.value, g = p ? Se(p, u) : null;
      return g !== null && dt(g);
    }
    function te(u) {
      const p = d.value, g = p ? ut(p, u) : null;
      return g ? Ae(g.node) : "";
    }
    function Ce(u) {
      const p = d.value, g = p ? ut(p, u) : null;
      if (!p || !g) return;
      const E = Ae(g.node);
      if (i.value.get(E)?.fixed === !0) return;
      const F = !dt(g);
      let B = Eu(p, u, F);
      B !== p && (F || (B = Ot(B, u)), l.value = B, s("frame-minimize", { panel: E, minimized: F }));
    }
    function Ee(u) {
      const p = Be(u);
      p && Ce(p);
    }
    function Lt(u) {
      const p = d.value, g = p ? ut(p, u) : null;
      if (!p || !g) return;
      const E = Ae(g.node);
      if (i.value.get(E)?.fixed === !0) return;
      const F = !lt(g);
      let B = Mu(p, u, F);
      B !== p && (F && (B = Ot(B, u)), l.value = B, s("frame-maximize", { panel: E, maximized: F }));
    }
    function ba(u) {
      const p = Be(u);
      p && Lt(p);
    }
    function $a(u, p, g) {
      const E = d.value, F = E ? ut(E, u) : null;
      if (!E || !F || p.button !== 0 || w.value || y.value) return;
      const B = Ae(F.node);
      if (i.value.get(B)?.fixed === !0 || lt(F) || dt(F) || (g === "move" ? !a.movable : !a.resizable)) return;
      const de = Fe(u), le = Pu(E, u);
      O(u);
      const K = { w: de?.clientWidth ?? 0, h: de?.clientHeight ?? 0 }, Y = { ...F.rect }, Z = p.clientX, ie = p.clientY, ge = a.minPanelSize;
      y.value = B;
      const fe = (Ne) => {
        const Je = d.value;
        if (!Je) return;
        const Rt = Ga(Je, le, En(Ne, K, ge));
        Rt !== Je && (l.value = Rt);
      }, J = (Ne) => {
        Ne.preventDefault();
        const Je = Ne.clientX - Z, Rt = Ne.clientY - ie;
        fe(
          g === "move" ? { ...Y, x: Y.x + Je, y: Y.y + Rt } : Xa(Y, g, Je, Rt, ge)
        );
      }, Pe = (Ne) => {
        if (Oe?.(), y.value = null, !Ne) {
          fe(Y);
          return;
        }
        const Je = d.value ? ut(d.value, le) : null;
        Je && s("frame-change", { panel: te(le), rect: Je.rect });
      }, st = () => Pe(!0), it = () => Pe(!1), ct = (Ne) => {
        Ne.key === "Escape" && Pe(!1);
      };
      Oe = () => {
        window.removeEventListener("pointermove", J), window.removeEventListener("pointerup", st), window.removeEventListener("pointercancel", it), window.removeEventListener("keydown", ct), Oe = null;
      }, window.addEventListener("pointermove", J), window.addEventListener("pointerup", st), window.addEventListener("pointercancel", it), window.addEventListener("keydown", ct);
    }
    function rl(u, p, g) {
      const E = Be(u);
      E && $a(E, p, g);
    }
    function ol(u, p, g = !1) {
      const E = d.value, F = Be(u), B = E && F ? ut(E, F) : null;
      if (!E || !F || !B || i.value.get(u)?.fixed === !0 || (g ? !a.resizable : !a.movable)) return;
      if (lt(B) || dt(B)) {
        L.value = `${Ge(u)} is ${lt(B) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const de = p === "left" ? -sn : p === "right" ? sn : 0, le = p === "up" ? -sn : p === "down" ? sn : 0, K = Fe(F), Y = { w: K?.clientWidth ?? 0, h: K?.clientHeight ?? 0 }, Z = g ? Xa(B.rect, "se", de, le, a.minPanelSize) : { ...B.rect, x: B.rect.x + de, y: B.rect.y + le }, ie = Ga(E, F, En(Z, Y, a.minPanelSize));
      if (ie === E) {
        L.value = g ? `${Ge(u)} cannot be resized further.` : `${Ge(u)} cannot move ${p}.`;
        return;
      }
      l.value = ie;
      const ge = ut(ie, F);
      ge && (s("frame-change", { panel: u, rect: ge.rect }), L.value = g ? `${Ge(u)} resized to ${ge.rect.w} by ${ge.rect.h}.` : `${Ge(u)} moved to ${ge.rect.x}, ${ge.rect.y}.`);
    }
    Ve(() => Oe?.());
    function il(u, p) {
      const g = _(u), E = g?.element.getBoundingClientRect();
      if (!g || !E) return null;
      const F = p === "left" || p === "right", B = (K) => {
        if (!(F ? K.bottom > E.top + 1 && K.top < E.bottom - 1 : K.right > E.left + 1 && K.left < E.right - 1)) return null;
        const Z = p === "left" ? E.left - K.right : p === "right" ? K.left - E.right : p === "up" ? E.top - K.bottom : K.top - E.bottom;
        return Z < -1 ? null : Z;
      }, de = [];
      for (const K of z()) {
        if (K === g || K.element === g.element) continue;
        const Y = B(K.element.getBoundingClientRect());
        if (Y === null) continue;
        const Z = K.panels.find((ie) => ie !== u);
        Z && de.push({ to: { panel: Z }, distance: Y });
      }
      for (const { element: K, path: Y } of he()) {
        const Z = B(K.getBoundingClientRect());
        Z !== null && de.push({ to: { space: Y }, distance: Z });
      }
      return de.reduce(
        (K, Y) => K && K.distance <= Y.distance ? K : Y,
        null
      )?.to ?? null;
    }
    function cl(u) {
      const p = d.value ? Se(d.value, u) !== null : !1;
      if (!p && !ue(u)) return;
      A.value = A.value === u ? null : u;
      const g = Ge(u);
      if (!A.value) {
        L.value = `${g}: move mode off.`;
        return;
      }
      L.value = p ? `${g}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${g}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Ge = (u) => i.value.get(u)?.title ?? u, ul = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function dl(u, p, g = !1) {
      if (!ue(u)) return;
      const E = d.value;
      if (!E) return;
      const F = Ge(u), B = kt(E, u);
      if (!g && B && (p === "left" || p === "right") && B.panels.length > 1) {
        const ie = B.panels.indexOf(u), ge = p === "left" ? ie - 1 : ie + 1;
        if (ge >= 0 && ge < B.panels.length) {
          Q(Bt(E, u, ge), { panel: u, target: u, edge: "center", index: ge }), L.value = `${F} moved ${p}, now tab ${ge + 1} of ${B.panels.length}.`, bn(u);
          return;
        }
      }
      const le = il(u, p);
      if (!le || le.panel !== void 0 && !ue(le.panel)) {
        L.value = `${F} cannot move ${p}.`;
        return;
      }
      const K = ul[p];
      if (le.space) {
        const ie = le.space, ge = ot(E, ie), fe = Se(E, u)?.rect, J = { ...pt, ...fe ? { w: fe.w, h: fe.h } : {} };
        Q(Qa(E, u, ie, J), { panel: u, target: "", space: ie, edge: K }), L.value = `${F} moved ${p}, into ${ge ? Pt(ge) : "the space"}.`, bn(u);
        return;
      }
      const Y = le.panel, Z = B?.panels.length === 1 && kt(E, Y)?.panels.length === 1;
      g ? (Q(an(E, u, Y, "center"), {
        panel: u,
        target: Y,
        edge: "center"
      }), L.value = `${F} joined ${Ge(Y)} as a tab.`) : Z ? (Q(un(E, u, Y), { panel: u, target: Y, edge: K }), L.value = `${F} moved ${p}, trading places with ${Ge(Y)}.`) : (Q(an(E, u, Y, K), { panel: u, target: Y, edge: K }), L.value = `${F} moved ${p}, beside ${Ge(Y)}.`), bn(u);
    }
    function bn(u) {
      Kt(() => {
        _(u)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function fl(u, p) {
      const g = d.value;
      g && (l.value = dn(g, u, p));
    }
    function $n(u) {
      const p = d.value;
      if (!p) return;
      const g = $t(p, u);
      g !== p && (l.value = g, s("tab-select", { panel: u }));
    }
    function xa(u) {
      return i.value.get(u)?.closable ?? a.closable;
    }
    function pl(u) {
      xa(u) && s("panel-close", u);
    }
    const xn = V(/* @__PURE__ */ new Map());
    let vl = 0;
    function ml(u, p) {
      const g = vl += 1;
      return xn.value.set(g, { panel: u, items: p }), () => {
        xn.value.delete(g);
      };
    }
    function hl(u) {
      const p = [];
      for (const g of xn.value.values())
        g.panel() === u && p.push(...g.items());
      return p;
    }
    function Ca(u) {
      const p = u.filter((g) => g.items.length > 0);
      return p.length < 2 ? p.flatMap((g) => g.items) : p.flatMap((g) => [
        { id: g.id, heading: !0, label: g.title },
        ...g.items
      ]);
    }
    const Sa = (u) => u.title || "These tabs";
    function gl(u, p) {
      const g = p.id, E = kt(u, g), F = (E?.panels.length ?? 0) > 1, B = E?.fixedView === !0, de = (Z) => ({
        action: () => {
          Z !== u && (l.value = Z);
        }
      }), le = [], K = [], Y = p.views ?? [];
      if (Y.length > 1 && !B) {
        const Z = M(g);
        le.push({
          id: "view",
          label: "View",
          items: Y.map((ie) => ({
            id: `view-${ie.key}`,
            label: ie.label,
            checked: ie.key === Z,
            action: () => D(g, ie.key)
          }))
        });
      }
      return F && !B && K.push(
        { id: "show-row", label: "Row", checked: !1, ...de(Za(u, g, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...de(Za(u, g, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...de(Lu(u, g))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...de(Ru(u, g))
        }
      ), F && E && (K.length && K.push({ separator: !0 }), K.push(...Ma(E, g))), { panel: le, tabs: K, tabsTitle: E ? Sa(E) : "" };
    }
    function Ma(u, p) {
      const g = gt(u), E = (F) => {
        const B = u.panels[(g + F + u.panels.length) % u.panels.length];
        return (B === void 0 ? "" : Ae(B)) || p;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => $n(E(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => $n(E(-1)) }
      ];
    }
    function tn(u) {
      return u.title ? u.title : X(u) ? u.panels.length > 1 ? "these tabs" : "the strip" : Pt(u);
    }
    function Ea(u) {
      if (!u || ee(u) || u.fixedView === !0 || !u.title && u.headless !== !0 || Ue(u)) return null;
      const p = sl(u);
      return p && p.fixedView !== !0 ? p : null;
    }
    function _l(u) {
      const p = d.value;
      if (!a.menu || !p) return [];
      const g = ot(p, u);
      if (!g || X(g)) return [];
      if (g.fixedView) return [];
      const E = ee(g) ? "desktop" : g.direction, F = (J, Pe, st) => ({
        id: `show-${J}`,
        label: Pe,
        checked: E === J,
        action: () => {
          const it = d.value, ct = st();
          !it || ct === g || (l.value = gn($e(mt(it, u, ct))));
        }
      }), B = () => {
        const J = el(g, yl(g));
        if (X(J) && J.panels.length === 0) return g;
        const Pe = X(J) && J.panels.length === 1 ? J.panels[0] : void 0;
        return Pe !== void 0 && me(Pe) ? g : J;
      }, de = (J) => () => ee(g) ? al(g, J) : g.direction === J ? g : { ...g, direction: J }, le = u.slice(0, -1), K = u.length > 0 ? ot(p, le) : null, Y = K && X(K) && K.panels.length > 1 ? K : null, Z = K && Ea(K) === g ? K : null, ie = Ea(g), ge = g.title || "this space", fe = (J, Pe, st, it, ct) => ({
        id: J,
        label: ct,
        action: () => {
          const Ne = d.value;
          Ne && (l.value = gn($e(mt(Ne, Pe, Iu(st, it)))));
        }
      });
      return Ca([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: g.title || "This space",
          items: [
            F("row", "Row", de("row")),
            F("column", "Column", de("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            F("tabs", "Tabs", () => B()),
            F("desktop", "Desktop", () => ee(g) ? g : nl(g))
          ]
        },
        {
          id: "about-around",
          title: ie ? `Around ${tn(ie)}` : "",
          items: ie ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...ie.title ? [] : [fe("merge-around-keep-this", u, g, "outer", `Keep ${ge}`)],
            ...g.title ? [] : [fe("merge-around-keep-that", u, g, "inner", `Keep ${tn(ie)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: Z ? `Inside ${tn(Z)}` : "",
          items: Z ? [
            ...g.title ? [] : [fe("merge-inside-keep-that", le, Z, "outer", `Keep ${tn(Z)}`)],
            ...Z.title ? [] : [fe("merge-inside-keep-this", le, Z, "inner", `Keep ${ge}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: Y ? Sa(Y) : "",
          items: Y ? Ma(Y, Ae(g)) : []
        }
      ]);
    }
    function yl(u) {
      const p = h.value;
      return p && oe(u, p) ? p : void 0;
    }
    function wl(u) {
      const p = d.value, g = i.value.get(u);
      if (!p || !g) return [];
      const E = a.menu ? gl(p, g) : null, F = hl(u);
      F.length && E?.panel.length && F.push({ separator: !0 }), E && F.push(...E.panel);
      const B = Ca([
        { id: "about-panel", title: g.title, items: F },
        { id: "about-tabs", title: E?.tabsTitle ?? "", items: E?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(g, B) : B;
    }
    function kl(u, p) {
      return o[`${u}-${p}`] ?? o[u];
    }
    function Pa(u, p, g, E) {
      return kl(u, p.id)?.({ panel: p, view: g, active: E });
    }
    Bu({
      panelFor: (u) => i.value.get(u) ?? null,
      viewFor: M,
      setView: D,
      movable: v(() => a.movable),
      resizable: v(() => a.resizable),
      minPanelSize: v(() => a.minPanelSize),
      spaceNames: v(() => a.spaceNames),
      focused: h,
      dragging: w,
      dropTarget: $,
      moving: A,
      framing: y,
      canMove: ue,
      focus(u) {
        h.value !== u && (h.value = u, s("panel-activate", u));
      },
      selectPanel: $n,
      beginDrag: Xe,
      toggleMoveMode: cl,
      nudge: dl,
      setSizes: fl,
      frameOf: (u) => d.value ? Se(d.value, u) : null,
      beginFrameDrag: rl,
      nudgeFrame: ol,
      raise: G,
      maximized: S,
      toggleMaximize: ba,
      minimized: W,
      toggleMinimize: Ee,
      beginFrameDragAt: $a,
      raiseAt: O,
      toggleMaximizeAt: Lt,
      toggleMinimizeAt: Ce,
      menuFor: wl,
      spaceMenu: _l,
      registerMenu: ml,
      closable: xa,
      close: pl,
      renderContent: (u, p, g) => Pa("panel", u, p, g),
      renderActions: (u, p, g) => Pa("actions", u, p, g),
      layout: d
    });
    const bl = v(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), $l = () => {
      const u = w.value, p = b.value;
      return !u || !p ? null : El(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${p.x}px`, top: `${p.y}px` },
          "aria-hidden": "true"
        },
        i.value.get(u)?.title ?? u
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(u, p, g, E) {
        const F = d.value;
        F && Q(an(F, u, p, g, E), {
          panel: u,
          target: p,
          edge: g,
          ...E === void 0 ? {} : { index: E }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(u) {
        const p = d.value;
        p && (l.value = $t(p, u));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(u, p, g) {
        const E = d.value;
        E && Q(Ya(E, u, p, g), {
          panel: u,
          target: p,
          edge: "float",
          rect: g
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(u, p) {
        const g = d.value;
        if (!g) return;
        const E = xu(g, u, p);
        if (E === g) return;
        l.value = E;
        const F = Se(E, u);
        F && s("frame-change", { panel: u, rect: F.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: D,
      /** Brings a floating frame to the front of its stack. */
      raise: G,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: ba,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: Ee
    }), (u, p) => (f(), m("div", {
      ref_key: "root",
      ref: T,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": w.value ? "true" : "false",
      "data-dc-docking": x.value ? "true" : "false",
      style: Le(bl.value)
    }, [
      d.value ? (f(), ne(Ld, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), m("p", Fd, " This window has no panels. ")),
      pe($l),
      k("p", Nd, N(L.value), 1)
    ], 12, Rd));
  }
}), Dd = /* @__PURE__ */ ce(Id, [["__scopeId", "data-v-711565af"]]);
function lf(e = "", t = "/") {
  const n = V(tt(e)), a = V(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    push(l) {
      n.value = tt(l), s.push(`${a.value}${n.value}`);
    },
    replace(l) {
      n.value = tt(l), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function ts(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return tt(a === -1 ? n : n.slice(0, a));
}
function rf(e) {
  const t = V(ts(e.currentRoute.value.fullPath)), n = v(() => e.currentRoute.value.path), a = we(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = ts(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s) => e.push(`${n.value}${tt(s)}`),
    replace: (s) => e.replace(`${n.value}${tt(s)}`),
    dispose: a
  };
}
const Od = {
  DataShell: nu,
  ShellHeader: As,
  QueryPanel: zs,
  RecordActions: Rs,
  ResultsArea: Ks,
  FacetControl: Ts,
  SegmentedControl: vu,
  StatusPill: Xt,
  WindowFrame: Dd,
  WindowPane: ll,
  ListView: Rn,
  CardsView: Ns,
  GridView: Is,
  TableView: Bs,
  LinksView: Ds,
  PreviewView: Os,
  TypeCardsView: qs
}, of = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Od))
      e.component(`${n}${a}`, s);
    t.route && e.provide(ss, t.route);
  }
};
export {
  hn as CASCADE_STEP,
  Vd as COLUMN_BREAKPOINTS,
  Kd as COLUMN_ROLES,
  Ns as CardsView,
  Ua as ColumnCell,
  pt as DEFAULT_FRAME,
  An as DEFAULT_SORT,
  Al as DEFAULT_VIEW,
  nu as DataShell,
  Tn as EMPTY_CELL,
  Ss as ENTITY_ALL,
  mn as ENTITY_TERM,
  Wt as EXPRESSION_TERM,
  sa as FACET_PREFIX,
  Ts as FacetControl,
  Is as GridView,
  of as HeaderContentLayoutPlugin,
  Ds as LinksView,
  Rn as ListView,
  yt as MINIMIZED_GAP,
  Ws as MINIMIZED_HEIGHT,
  Fn as MINIMIZED_WIDTH,
  Vs as MIN_FRAME,
  Ba as MOCK_TINTS,
  jd as MenuBar,
  ca as MenuButton,
  ra as MenuList,
  Gt as MetricDrill,
  ka as PANE_CONTEXT_KEY,
  ta as PARAM_DIR,
  Zn as PARAM_ENTITY,
  na as PARAM_EXPR,
  aa as PARAM_PAGE,
  ea as PARAM_SORT,
  Jn as PARAM_VIEW,
  oa as PinStar,
  Os as PreviewView,
  yn as QueryMark,
  zs as QueryPanel,
  nn as RECORD_STATUSES,
  fs as RESULT_FIELDS,
  ss as ROUTE_ADAPTER_KEY,
  Rs as RecordActions,
  Ks as ResultsArea,
  Cs as SHELL_CONTEXT_KEY,
  qd as SHELL_THEMES,
  Yt as ScopeMark,
  vu as SegmentedControl,
  Tt as SelectTick,
  Hd as ShellCard,
  As as ShellHeader,
  Ha as StandingControl,
  Xt as StatusPill,
  Bs as TableView,
  qs as TypeCardsView,
  ls as VIEW_KINDS,
  Tl as VIEW_LABELS,
  ya as WINDOW_CONTEXT_KEY,
  Dd as WindowFrame,
  ll as WindowPane,
  Hs as activePanel,
  gt as activeTab,
  Qn as addTerm,
  Xn as andExpression,
  bu as axisOf,
  fa as cascade,
  ms as cellFull,
  Ht as cellText,
  on as cellTextOf,
  De as cellValue,
  Aa as changesResults,
  En as clampRect,
  el as collapseSpace,
  Lu as collapseToTabs,
  Gd as column,
  za as columnAlign,
  La as columnClass,
  Ta as columnKey,
  zn as columnTruncates,
  Il as columnsFor,
  Ll as countPages,
  Pl as createHistoryAdapter,
  lf as createMemoryAdapter,
  cr as createMockDataSource,
  rf as createVueRouterAdapter,
  Bl as defaultCellText,
  es as defaultLayout,
  jn as defaultQuery,
  ur as drillExpression,
  Qa as dropIntoSpace,
  Et as emptyFacetState,
  Wn as emptyFacetValue,
  ws as excludingTerm,
  wt as findEntity,
  rt as findSort,
  Qd as fixedView,
  da as float,
  Ya as floatPanel,
  nl as floatSplit,
  Ru as floatTabs,
  rn as fnv1a,
  os as focusEntity,
  _t as formatCount,
  Fl as formatDate,
  ft as formatExpression,
  Rl as formatMetric,
  Nl as formatOrdinal,
  jt as formatTerm,
  wn as frame,
  ut as frameAt,
  Se as frameOf,
  Dn as framePathOf,
  Ae as frontPanel,
  rr as generateRows,
  Xd as group,
  kt as groupOf,
  $u as groups,
  ds as hasActiveFacets,
  oe as hasPanel,
  Yd as headless,
  Nt as insertPanel,
  Dt as isChoosable,
  Wd as isEntityScoped,
  us as isFacetActive,
  ee as isFloat,
  X as isGroup,
  lt as isMaximized,
  dt as isMinimized,
  me as isPanelTab,
  Un as isPristineQuery,
  zt as isSplit,
  Ie as isTabOf,
  Hn as isTypeCardsQuery,
  rs as isViewKind,
  Da as joinExpression,
  bs as liftTerm,
  Gl as matchesExpression,
  or as matchesFacets,
  Cu as maximizeFrame,
  Mu as maximizeFrameAt,
  Iu as mergeSpace,
  Su as minimizeFrame,
  Eu as minimizeFrameAt,
  an as movePanel,
  Bt as moveTab,
  Ud as negateTerm,
  ot as nodeAt,
  qt as nodeTitle,
  $e as normalizeLayout,
  tt as normalizeSearch,
  ga as normalizeSizes,
  sl as onlySpace,
  Vt as oppositeTerm,
  at as panelIds,
  Ze as panelNode,
  ja as panelTabs,
  Re as parseExpression,
  gr as parseQuery,
  qo as presentParts,
  Fs as presentRow,
  We as pressOptions,
  sd as providePaneContext,
  dr as provideShellContext,
  Bu as provideWindowContext,
  Pn as raiseFrame,
  Ot as raiseFrameAt,
  Pu as raisedPath,
  ps as reconcileFacets,
  Ou as reconcileLayout,
  ys as recordTerm,
  Jl as refineExpression,
  vt as removePanel,
  mt as replaceAt,
  Xa as resizeRect,
  Ja as resizeSplit,
  Vn as resolveView,
  qe as roleColumn,
  vs as roleColumns,
  gn as rootSpace,
  va as row,
  Ol as rowKey,
  _n as sameTerm,
  Gn as scopeTerm,
  Yn as scopeTermFor,
  xs as scopedEntity,
  Va as serializeQuery,
  $t as setActivePanel,
  xu as setFrameRect,
  Ga as setFrameRectAt,
  dn as setSizesAt,
  ef as setSplitDirection,
  nt as sizesOf,
  cs as sortsFor,
  ye as spaceChrome,
  Pt as spaceTitle,
  pa as split,
  Ql as splitExpression,
  Za as spreadTabs,
  yr as summarizeQuery,
  la as summaryTerms,
  un as swapPanels,
  ua as tabNode,
  Zt as tabPanels,
  ks as termStanding,
  al as tileFloat,
  tf as toFloat,
  nf as toTiled,
  Zd as toggleMaximized,
  Jd as toggleMinimized,
  nc as useColumns,
  Ir as useEntityCounts,
  $c as useEntityPreviews,
  af as usePaneContext,
  sf as usePaneMenu,
  At as usePresentedRows,
  wr as useQueryState,
  Br as useRecordNames,
  kr as useResults,
  ke as useShellContext,
  wa as useWindowContext,
  qa as withStanding,
  $s as withoutOwnScope,
  Yl as withoutTerm
};
