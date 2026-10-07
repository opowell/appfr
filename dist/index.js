import { ref as W, inject as Ft, provide as ca, computed as p, toValue as Et, shallowRef as yt, watch as ye, onScopeDispose as Zt, getCurrentScope as Pn, defineComponent as ie, onMounted as As, onBeforeUnmount as Be, resolveComponent as Ts, openBlock as f, createElementBlock as h, normalizeStyle as Ee, Fragment as ae, renderList as me, toDisplayString as R, createCommentVNode as z, createElementVNode as C, createBlock as ne, nextTick as It, useId as An, unref as P, normalizeClass as ut, Teleport as ol, createVNode as ve, withDirectives as dt, withKeys as Ye, withModifiers as Fe, vModelText as bn, renderSlot as xe, useSlots as Jt, createTextVNode as Ue, withCtx as Ze, reactive as Ya, resolveDynamicComponent as ua, createSlots as mn, useModel as Wt, mergeModels as $n, vShow as xn, Comment as il, Text as cl, h as ul } from "vue";
const zs = Symbol("dc.routeAdapter");
function nt(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function dl() {
  const e = typeof window < "u", t = W(e ? nt(window.location.search) : ""), n = W(e ? window.location.pathname : "/"), a = () => {
    t.value = nt(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const s = (r, i) => {
    const o = nt(r);
    if (!e) {
      t.value = o;
      return;
    }
    const l = `${window.location.pathname}${o}${window.location.hash}`;
    i === "push" ? window.history.pushState(window.history.state, "", l) : window.history.replaceState(window.history.state, "", l), t.value = o, n.value = window.location.pathname;
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
const Ls = ["list", "cards", "grid", "images", "table", "links", "preview"], Yf = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], dn = ["ok", "running", "queued", "review", "failed"], Zf = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Jf = [480, 620, 760, 900, 1100], fl = "cards", pl = "table";
function Xt(e, t = {}) {
  const n = (s) => s && Rs(s) ? s : void 0;
  if (e === null) return n(t.view) ?? fl;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? pl;
}
function Za(e, t, n, a = {}) {
  return e === Xt(t, a) ? Xt(n, a) : e;
}
const Xn = "updated";
function Rs(e) {
  return typeof e == "string" && Ls.includes(e);
}
const vl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function da(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Pt(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function Fs(e, t = {}) {
  const n = Pt(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function Is(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Ns(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const s of Is(e, t))
    !s.sort || n.has(s.sort) || (n.add(s.sort), a.push({ key: s.sort, label: (s.label ?? s.sort).toLowerCase() }));
  return a;
}
const ml = { key: Xn, label: Xn };
function it(e, t, n = null) {
  const a = Ns(e, n);
  return (t ? a.find((r) => r.key === t) : void 0) ?? a.find((r) => r.key === Xn) ?? a[0] ?? ml;
}
function fa(e) {
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
  for (const n of e?.facets ?? []) t[n.key] = fa(n);
  return t;
}
function Ds(e) {
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
function Os(e) {
  return Object.values(e).some(Ds);
}
function pa(e) {
  return e.entity === null && e.expr.trim() === "" && !Os(e.facets);
}
function ep(e) {
  return e.entity !== null;
}
function va(e) {
  return e.entity === null && e.view === "cards";
}
function hl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function ma(e, t = {}) {
  const a = t.landing === "entity" ? Fs(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: Xt(a?.key ?? null, t),
    sort: it(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: Nt(a),
    page: 1
  };
}
const ha = ["entity", "sort", "dir", "expr", "facets"];
function Ja(e) {
  return ha.some((t) => t in e);
}
function Bs(e, t) {
  const n = {};
  for (const a of e?.facets ?? []) {
    const s = t[a.key];
    n[a.key] = s && s.kind === a.kind ? s : fa(a);
  }
  return n;
}
function hn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function gl(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Ct(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function _l(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function yl(e) {
  return String(e + 1).padStart(2, "0");
}
const Qn = "—";
function He(e, t) {
  return e.find((n) => n.role === t);
}
function qs(e, t) {
  return e.filter((n) => n.role === t);
}
function wl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (s) => s.role !== "tint" && ((s.when ?? "always") === "always" || s.when === a)
  );
}
const kl = ["id", "entityKey", "entityLabel"];
function Oe(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (kl.includes(n))
      return t[n];
  }
}
function es(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function bl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function $l(e, t) {
  if (e == null || e === "") return Qn;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? gl(n) : String(e);
  }
  return t === "date" ? _l(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : Qn : String(e);
}
function en(e, t) {
  const n = Oe(e, t);
  return e.format ? e.format(n, t) : $l(n, e.kind);
}
function xl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function Vs(e, t) {
  const n = en(e, t), a = xl(Oe(e, t));
  return a && a !== n ? a : n;
}
function gn(e, t) {
  return e ? en(e, t) : "";
}
function ts(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const Cl = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function ns(e) {
  return [Cl[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function Yn(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const Ml = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/;
function Sl(e) {
  const t = [];
  let n = "", a = null;
  const s = () => {
    n && t.push(n), n = "";
  };
  for (let r = 0; r < e.length; r++) {
    const i = e[r];
    if (a) {
      i === a ? a = null : n += i;
      continue;
    }
    if (i === '"' || i === "'") {
      a = i;
      continue;
    }
    if (/\s/.test(i)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(r + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      s();
      continue;
    }
    n += i;
  }
  return s(), t;
}
function Re(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const s of Sl(t)) {
    const r = s.toUpperCase();
    if (r === "AND" || r === "&&") continue;
    if (r === "OR" || r === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const i = s.length > 1 && s.startsWith("-"), o = i ? s.slice(1) : s, l = i ? { negated: !0 } : {}, c = Ml.exec(o);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...l
    }) : a.push({ kind: "text", value: o, ...l });
  }
  return a.length && n.push(a), n;
}
const At = (e) => e.toLowerCase().replace(/\s+/g, ""), Ks = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function El(e, t, n) {
  const a = At(e), s = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const r = s.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && At(c.label) === a
  );
  if (r) return Oe(r, t);
  const i = n.facets.find((c) => At(c.label) === a);
  if (i && i.key in t.fields) return t.fields[i.key];
  const o = Ks.find(([c]) => c === a)?.[1];
  if (o) {
    const c = He(s, o);
    if (c) return Oe(c, t);
  }
  const l = /^metric(\d+)$/.exec(a);
  if (l) {
    const c = qs(s, "metric")[Number(l[1]) - 1];
    if (c) return Oe(c, t);
  }
}
function Ws(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const as = /^[a-z_][\w.-]*$/;
function Hs(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return as.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : At(e.label);
  return n !== void 0 && as.test(n) ? n : void 0;
}
function Pl(e, t) {
  const n = At(e);
  if (n === "entity" || Ks.some(([s]) => s === n) || /^metric\d+$/.test(n)) return !0;
  const a = (s) => s !== void 0 && At(s) === n;
  return (t.columns ?? []).some(
    (s) => a(s.key) || a(s.field) || a(s.label)
  ) || t.facets.some((s) => a(s.key) || a(s.label));
}
function Cn(e, t) {
  if (!t) return e;
  let n = !1;
  const a = Re(e).map(
    (s) => s.map((r) => {
      if (r.kind !== "field") return r;
      const i = Us(r.field, t), o = i && Hs(i);
      return o ? (n = !0, { ...r, field: o }) : r;
    })
  );
  return n ? at(a) : e;
}
function Us(e, t) {
  if (!(!e || Pl(e, t)))
    return (t.columns ?? []).find(
      (n) => n.label !== void 0 && Ws(n.label) === e
    );
}
function Al(e, t) {
  if (!t || e.label === void 0 || !Hs(e)) return;
  const n = Ws(e.label);
  return Us(n, t) === e ? n : void 0;
}
function Bn(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const s = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(s).test(n);
}
function ss(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Tl(e, t, n) {
  if (e.kind === "text") {
    const i = n.columns ?? [];
    return ["identity", "reference"].some((o) => {
      const l = He(i, o), c = l ? Oe(l, t) : void 0;
      return typeof c == "string" && Bn(c, e.value);
    });
  }
  const a = El(e.field, t, n);
  if (a === void 0) return null;
  if (Array.isArray(a))
    return e.comparator === ":" || e.comparator === "=" ? a.some(
      (o) => e.comparator === "=" ? ss(String(o), e.value) : Bn(String(o), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof a == "boolean") {
      const i = e.value.toLowerCase();
      return i === "true" || i === "yes" ? a : i === "false" || i === "no" ? !a : null;
    }
    if (typeof a == "number") {
      const i = Number(e.value);
      return Number.isFinite(i) ? a === i : null;
    }
    return e.comparator === "=" ? ss(String(a), e.value) : Bn(String(a), e.value);
  }
  const s = Number(e.value), r = typeof a == "number" ? a : Number(a);
  return !Number.isFinite(s) || !Number.isFinite(r) ? null : zl(e.comparator, r, s);
}
function rs(e, t, n) {
  const a = Tl(e, t, n);
  return a === null ? !0 : e.negated ? !a : a;
}
function zl(e, t, n) {
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
function ls(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=");
}
function Ll(e, t, n) {
  return e.length ? e.some((a) => {
    const s = /* @__PURE__ */ new Map();
    for (const r of a)
      ls(r) && s.set(r.field, (s.get(r.field) ?? !1) || rs(r, t, n));
    return a.every(
      (r) => ls(r) ? s.get(r.field) === !0 : rs(r, t, n)
    );
  }) : !0;
}
function os(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function tn(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + os(e.value) : `${t}${e.field}${e.comparator}${os(e.value)}`;
}
function tp(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function at(e) {
  return e.filter((t) => t.length).map((t) => t.map(tn).join(" ")).join(" OR ");
}
function Rl(e, t, n) {
  return e.map((a, s) => s === t ? a.filter((r, i) => i !== n) : a).filter((a) => a.length);
}
function Fl(e) {
  const t = Re(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map(tn).join(" ")
  };
}
function is(e, t) {
  return [...e.map(tn), t.trim()].filter(Boolean).join(" ");
}
const cs = (e, t) => e.toLowerCase() === t.toLowerCase();
function Tn(e, t) {
  return !!e.negated == !!t.negated && js(e, t);
}
function Qt(e, t) {
  return !!e.negated != !!t.negated && js(e, t);
}
function js(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && cs(e.value, t.value) : t.kind === "text" && cs(e.value, t.value);
}
function Il(e, t) {
  return t.filter((n) => !e.some((a) => Tn(a, n)));
}
function ga(e, t) {
  return Gs(e, t, (n) => n);
}
function Zn(e, t) {
  return Gs(
    e,
    t,
    (n, a) => n.filter((s) => !a.some((r) => Qt(s, r)))
  );
}
const Nl = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Dl(e) {
  return at(
    Re(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Nl.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function Gs(e, t, n) {
  const a = Re(e), s = Re(t);
  return a.length ? s.length ? at(
    a.flatMap(
      (r) => s.map((i) => [...n(r, i), ...Il(r, i)])
    )
  ) : at(a) : at(s);
}
const us = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Xs(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const Ol = 7, Bl = 3;
function ql(e, t, n, a) {
  const s = (t * Ol + hn(n)) % a, r = [];
  for (let i = 0; i < Math.min(Bl, a); i++)
    r.push(Xs(e, (s + i) % a));
  return r;
}
function Vl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? Kl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function Kl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, s = /* @__PURE__ */ new Set();
  for (let r = 0; r < n; r++) s.add((a + r) % e.length);
  return [...s].sort((r, i) => r - i).map((r) => e[r]);
}
function Wl(e, t) {
  const { hash: n, sample: a, revision: s, updatedAt: r } = t, i = s ? ` · rev ${s + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${i}`;
    case "reference":
      return s ? `${a[1]}-${s + 1}` : a[1];
    case "state":
      return dn[n % dn.length];
    case "updated":
      return r;
    case "tint":
      return us[n % us.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return dn[n % dn.length];
    case "date":
      return r;
    default:
      return;
  }
}
function Hl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", s = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), r = e.samples, i = t.scopes ?? [];
  if (!r.length) return [];
  const o = [];
  for (let l = 0; l < n; l++) {
    const c = r[l % r.length], d = Math.floor(l / r.length), m = hn(`${a}:${e.key}:${c[0]}:${l}`), g = Xs(e.key, l), y = new Date(s.getTime() - m % 900 * 36e5).toISOString(), b = {};
    for (const x of e.columns ?? []) {
      const w = x.field ?? x.key;
      if (!w || x.value) continue;
      const $ = Wl(x, {
        hash: hn(`${m}:${w}`),
        sample: c,
        revision: d,
        updatedAt: y
      });
      $ !== void 0 && (b[w] = $);
    }
    for (const x of e.facets)
      b[x.key] = Vl(x, hn(`${m}:${x.key}`));
    for (const [x, w] of i)
      b[x] = w === e.key ? g : ql(w, l, x, n);
    o.push({ id: g, entityKey: e.key, entityLabel: e.label, fields: b });
  }
  return o;
}
function Ul(e, t) {
  for (const [n, a] of Object.entries(t)) {
    const s = e.fields[n];
    switch (a.kind) {
      case "chips": {
        if (!a.selected.length) break;
        if (Array.isArray(s)) {
          if (!s.some((r) => a.selected.includes(String(r)))) return !1;
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
function jl(e, t) {
  const n = e.find((i) => i.sort === t);
  if (!n) return () => 0;
  const a = n.kind ?? "text", s = a === "number" || n.role === "metric", r = a === "date" || n.role === "updated";
  return (i, o) => {
    const l = Oe(n, i), c = Oe(n, o);
    return s ? Number(c ?? 0) - Number(l ?? 0) : r ? Date.parse(String(c ?? "")) - Date.parse(String(l ?? "")) : String(c ?? "").localeCompare(String(l ?? ""));
  };
}
function Gl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, s) => {
    const r = t.get(a.key);
    if (r) return r;
    const i = e.scopes ?? s.entities.flatMap(
      (l) => l.scope ? [[l.scope, l.key]] : []
    ), o = Hl(a, { ...e, scopes: i });
    return t.set(a.key, o), o;
  };
  return {
    query({ query: a, schema: s, entity: r, limit: i, offset: o }) {
      const l = Re(a.expr), c = r ? [r] : s.entities, d = [], m = [];
      for (const b of c)
        for (const x of n(b, s))
          d.push(x), (r ? Ul(x, a.facets) : !0) && Ll(l, x, b) && m.push(x);
      const g = it(r, a.sort, s), y = m.sort(jl(Is(r, s), g.key));
      return a.dir === "asc" && y.reverse(), {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: y.slice(o, o + i),
        total: m.length,
        unfiltered: m.length === d.length
      };
    }
  };
}
function _a(e, t) {
  return Qs(e, t.id);
}
function Qs(e, t) {
  const n = e?.scope;
  return n ? `${n}:"${t.replace(/"/g, "")}"` : null;
}
function ya(e, t) {
  return _a(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function wa(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Re(t).flat();
  if (!a) return n;
  const s = Re(n);
  return s.some((o) => o.some((l) => Tn(l, a))) ? n : s.some((o) => o.some((l) => Qt(l, a))) ? at(
    s.map(
      (o) => o.map((l) => Qt(l, a) ? a : l)
    )
  ) : `${n} ${t}`;
}
function Ys(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function Zs(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Re(t).flat();
  if (!n) return null;
  const a = Re(e).flat();
  return a.some((s) => Tn(s, n)) ? n.negated ? "out" : "in" : a.some((s) => Qt(s, n)) ? n.negated ? "in" : "out" : null;
}
function Js(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Re(t).flat();
  if (!n) return e;
  const a = Re(e), s = a.map(
    (r) => r.filter((i) => !Tn(i, n) && !Qt(i, n))
  );
  return s.every((r, i) => r.length === a[i]?.length) ? e : at(s);
}
function ds(e, t, n) {
  return t ? n === null ? Js(e, t) : wa(e, n === "out" ? Ys(t) : t) : e;
}
function qe(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey ? { exclude: !0 } : {};
}
function Xl(e, t, n, a = {}) {
  const s = ya(e, n);
  return wa(t.expr, a.exclude ? Ys(s) : s);
}
function er(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Re(t), s = a.map(
    (r) => r.filter((i) => i.kind !== "field" || i.field !== n)
  );
  return s.every((r, i) => r.length === a[i]?.length) ? t : at(s);
}
function tr(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
const nr = Symbol("dc.shellContext");
function Ql(e) {
  const t = e.liveQuery ? e : Yl(e);
  return ca(nr, t), t;
}
function Yl(e) {
  const t = e.draft ?? W("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: p(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        Zn(e.query.value.expr, Cn(n, e.entity.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function be() {
  const e = Ft(nr, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const ka = "e", ba = "v", $a = "s", xa = "d", Ca = "q", Ma = "p", Sa = "f_", ar = "*", Zl = [
  ka,
  ba,
  $a,
  xa,
  Ca,
  Ma
], Jn = "..", sr = ",", Jl = [
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
function qn(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Jl) t = t.replace(n, a);
  return t;
}
function tt(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function rr(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const s = a.indexOf("="), r = s === -1 ? a : a.slice(0, s), i = s === -1 ? "" : a.slice(s + 1);
    n.push([tt(r), i]);
  }
  return n;
}
function eo(e) {
  return Zl.includes(e) || e.startsWith(Sa);
}
function fs(e, t, n) {
  return Math.min(n, Math.max(t, e));
}
function to(e, t) {
  const n = tt(t);
  switch (e.kind) {
    case "chips": {
      const a = new Set(
        n.split(sr).map((r) => r.trim()).filter(Boolean)
      );
      return { kind: "chips", selected: e.options.filter((r) => a.has(r)) };
    }
    case "range": {
      const a = n.indexOf(Jn), s = (a === -1 ? n : n.slice(0, a)).trim(), r = (a === -1 ? "" : n.slice(a + Jn.length)).trim(), i = s === "" ? null : Number(s), o = r === "" ? null : Number(r);
      let l = i !== null && Number.isFinite(i) ? fs(i, e.min, e.max) : null, c = o !== null && Number.isFinite(o) ? fs(o, e.min, e.max) : null;
      return l !== null && c !== null && l > c && ([l, c] = [c, l]), { kind: "range", min: l, max: c };
    }
    case "toggle":
      return { kind: "toggle", on: n === "1" || n === "true" };
  }
}
function no(e, t) {
  switch (e.kind) {
    case "chips":
      return e.selected.length ? (t.kind === "chips" ? t.options.filter((a) => e.selected.includes(a)) : e.selected).join(sr) : null;
    case "range":
      return e.min === null && e.max === null ? null : `${e.min ?? ""}${Jn}${e.max ?? ""}`;
    case "toggle":
      return e.on ? "1" : null;
  }
}
function ao(e, t, n = {}) {
  const a = ma(t, n), s = new Map(rr(e)), r = s.get(ka), i = r === void 0 ? a.entity : tt(r), o = i === ar ? null : Pt(t, i), l = s.get(ba), c = l && Rs(tt(l)) ? tt(l) : Xt(o?.key ?? null, n), d = s.get($a), m = it(o, d ? tt(d) : n.sort, t), g = s.get(xa), y = g ? tt(g) === "asc" ? "asc" : "desc" : a.dir, b = s.get(Ca), x = s.get(Ma), w = x === void 0 ? 1 : Number(tt(x)), $ = Number.isFinite(w) ? Math.max(1, Math.floor(w)) : 1, L = {};
  for (const D of o?.facets ?? []) {
    const M = s.get(`${Sa}${D.key}`);
    L[D.key] = M === void 0 ? fa(D) : to(D, M);
  }
  return {
    entity: o?.key ?? null,
    view: c,
    sort: m.key,
    dir: y,
    expr: b === void 0 ? "" : tt(b),
    facets: Bs(o, L),
    page: $
  };
}
function ps(e, t, n = {}, a = "") {
  const s = ma(t, n), r = Pt(t, e.entity), i = rr(a).filter(([m]) => !eo(m)), o = [], l = (m, g) => o.push([m, qn(g)]), c = r?.key ?? null;
  c !== s.entity && l(ka, c ?? ar), e.view !== Xt(c, n) && l(ba, e.view), e.sort !== s.sort && l($a, e.sort), e.dir !== s.dir && l(xa, e.dir), e.expr.trim() !== "" && l(Ca, e.expr);
  for (const m of r?.facets ?? []) {
    const g = e.facets[m.key];
    if (!g) continue;
    const y = no(g, m);
    y !== null && o.push([`${Sa}${m.key}`, qn(y)]);
  }
  e.page > 1 && l(Ma, String(e.page));
  const d = [
    ...i.map(([m, g]) => [qn(m), g]),
    ...o
  ];
  return d.length ? `?${d.map(([m, g]) => g === "" ? m : `${m}=${g}`).join("&")}` : "";
}
const Mn = "entity", Yt = "expr";
function so(e, t) {
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
function Ea(e, t) {
  const n = [];
  t && n.push({
    id: Mn,
    label: `entity:${t.key}`,
    facetKey: Mn
  });
  for (const a of t?.facets ?? []) {
    const s = e.facets[a.key];
    s && Ds(s) && n.push(...so(a, s));
  }
  return Re(e.expr).forEach((a, s) => {
    a.forEach((r, i) => {
      n.push({
        id: `${Yt}:${s}:${i}`,
        label: tn(r),
        facetKey: Yt,
        group: s,
        index: i,
        ...r.kind === "field" ? { field: r.field, value: r.value } : {},
        ...r.negated ? { negated: !0 } : {}
      });
    });
  }), n;
}
function ro(e, t, n = null) {
  if (pa(e)) {
    const r = it(t, e.sort, n);
    return `everything · ${e.view} · ${r.label}`;
  }
  const a = Ea(e, t).filter((r) => r.facetKey !== Yt).map((r) => r.label), s = e.expr.trim();
  return s && a.push(`"${s}"`), a.join(" · ");
}
function lo(e) {
  const { adapter: t } = e, n = p(() => Et(e.schema)), a = p(() => Et(e.defaults) ?? {}), s = p(() => ao(t.search.value, n.value, a.value)), r = p(() => Pt(n.value, s.value.entity)), i = p(() => r.value ?? Fs(n.value, a.value)), o = p(() => Ns(r.value, n.value)), l = p(() => it(r.value, s.value.sort, n.value)), c = (w, $) => {
    const L = ps(w, n.value, a.value, t.search.value);
    return L === t.search.value ? !1 : ($ === "push" ? t.push(L) : t.replace(L), !0);
  }, d = () => Et(e.navigationMode) ?? "push", m = () => Et(e.facetNavigationMode) ?? "replace", g = (w, $) => {
    const L = w.page ?? (Ja(w) ? 1 : s.value.page);
    return c({ ...s.value, ...w, page: L }, $);
  }, y = (w, $) => {
    const L = s.value.facets[w];
    if (!L) return;
    const D = { ...s.value.facets, [w]: $(L) };
    g({ facets: D }, m());
  }, b = (w) => {
    const $ = w === null ? null : Pt(n.value, w);
    return ($?.key ?? null) === s.value.entity ? {} : {
      entity: $?.key ?? null,
      view: Za(s.value.view, s.value.entity, $?.key ?? null, a.value),
      sort: it($, s.value.sort, n.value).key,
      facets: Nt($)
    };
  }, x = (w) => {
    const $ = b(w);
    Object.keys($).length && g($, d());
  };
  return {
    query: s,
    entity: r,
    focus: i,
    sort: l,
    sorts: o,
    summary: p(() => ro(s.value, r.value, n.value)),
    terms: p(() => Ea(s.value, r.value)),
    isPristine: p(() => pa(s.value)),
    isEverything: p(() => s.value.entity === null),
    hasFacets: p(() => Os(s.value.facets)),
    setEntity: x,
    clearEntity: () => x(null),
    setView(w) {
      g({ view: w }, d());
    },
    setSort(w) {
      g({ sort: it(r.value, w, n.value).key }, d());
    },
    toggleDirection() {
      g({ dir: s.value.dir === "desc" ? "asc" : "desc" }, d());
    },
    setExpression(w) {
      return g({ expr: w }, d());
    },
    narrow(w, $, L) {
      return g({ expr: w, ...b($), ...L ? { view: L } : {} }, d());
    },
    setPage(w, $) {
      g({ page: Math.max(1, Math.floor(w)) }, $ ?? d());
    },
    setFacet(w, $) {
      y(w, () => $);
    },
    toggleChip(w, $) {
      y(w, (L) => L.kind !== "chips" ? L : { kind: "chips", selected: L.selected.includes($) ? L.selected.filter((M) => M !== $) : [...L.selected, $] });
    },
    setRange(w, $, L) {
      y(w, (D) => D.kind === "range" ? { kind: "range", min: $, max: L } : D);
    },
    toggleFlag(w) {
      y(
        w,
        ($) => $.kind === "toggle" ? { kind: "toggle", on: !$.on } : $
      );
    },
    removeTerm(w) {
      if (w.facetKey === Mn) {
        x(null);
        return;
      }
      if (w.facetKey === Yt) {
        const $ = Rl(Re(s.value.expr), w.group ?? 0, w.index ?? 0);
        g({ expr: at($) }, d());
        return;
      }
      y(w.facetKey, ($) => $.kind === "chips" && w.option ? { kind: "chips", selected: $.selected.filter((L) => L !== w.option) } : $.kind === "range" ? { kind: "range", min: null, max: null } : $.kind === "toggle" ? { kind: "toggle", on: !1 } : $);
    },
    clearFilters() {
      g({ ...b(null), expr: "", facets: Nt(null) }, d());
    },
    reset() {
      c(ma(n.value, a.value), d());
    },
    hrefFor(w) {
      const $ = { ...s.value, ...w };
      return "entity" in w && !("view" in w) && ($.view = Za(s.value.view, s.value.entity, $.entity, a.value)), $.page = w.page ?? (Ja(w) ? 1 : s.value.page), $.facets = Bs(Pt(n.value, $.entity), $.facets), `${t.path.value}${ps($, n.value, a.value, t.search.value)}`;
    }
  };
}
function oo(e) {
  const t = yt([]), n = W(0), a = W(!1), s = W(!1), r = yt(null);
  let i = 0, o = null, l = null;
  const c = p(() => (e.query.value.page - 1) * e.limit.value), d = p(() => hl(n.value, e.limit.value)), m = () => {
    const M = e.query.value, S = e.within?.value.trim(), q = er(e.entity.value, M.expr);
    return S ? { ...M, expr: ga(S, q) } : q === M.expr ? M : { ...M, expr: q };
  }, g = (M, S) => {
    t.value = M.rows, n.value = M.total, r.value = null, y(S);
  }, y = (M) => {
    o = { key: M, total: n.value }, s.value = !1;
  }, b = (M) => {
    r.value = M, t.value = [], n.value = 0, o = null, s.value = !1;
  }, x = (M, S, q, E) => {
    let k = !0;
    const K = () => M === i;
    let I = 0, Z = !1;
    const X = (se) => {
      I = se, Z = !0, E === void 0 && (n.value = se);
    }, ke = () => {
      k && (k = !1, t.value = [], X(0)), r.value = null;
    };
    return {
      get open() {
        return K();
      },
      insert(se, N) {
        if (!K()) return;
        const T = Array.isArray(se) ? se : [se];
        if (!T.length) return;
        ke();
        const H = [...t.value];
        H.splice(N ?? H.length, 0, ...T), t.value = S > 0 ? H.slice(0, S) : H, X(I + T.length);
      },
      set(se) {
        K() && (se.rows && (ke(), t.value = S > 0 ? se.rows.slice(0, S) : se.rows, X(se.rows.length)), se.total !== void 0 && X(se.total));
      },
      close() {
        K() && (a.value = !1, Z && (n.value = I), y(q));
      },
      fail(se) {
        K() && (b(se), a.value = !1);
      }
    };
  }, w = () => {
    const M = l;
    l = null, M?.();
  }, $ = () => {
    const M = ++i;
    w();
    const S = L.value, q = o?.key === S ? o.total : void 0;
    s.value = q === void 0;
    const E = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, k = e.source.value;
    if (k.stream) {
      a.value = !0;
      try {
        l = k.stream(E, x(M, E.limit, S, q)) ?? null;
      } catch (I) {
        b(I), a.value = !1;
      }
      return;
    }
    let K;
    try {
      K = k.query(E);
    } catch (I) {
      b(I);
      return;
    }
    if (!(K instanceof Promise)) {
      g(K, S), a.value = !1;
      return;
    }
    a.value = !0, K.then((I) => {
      M === i && g(I, S);
    }).catch((I) => {
      M === i && b(I);
    }).finally(() => {
      M === i && (a.value = !1);
    });
  }, L = p(() => {
    const M = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(ha.map((q) => M[q]))}`;
  }), D = p(() => `${L.value}|${e.query.value.page}`);
  return ye([e.source, D, e.limit], $, {
    immediate: !0
  }), Zt(() => {
    i++, w();
  }, !0), { rows: t, total: n, offset: c, pageCount: d, pending: a, counting: s, error: r, refresh: $ };
}
const io = 150;
function co(e) {
  const t = e.delay ?? io, n = W(""), a = W("");
  let s = !1, r;
  const i = () => {
    clearTimeout(r), r = void 0;
  }, o = p(() => Cn(Dl(a.value), e.entity.value)), l = p(() => o.value.trim() !== ""), c = p(
    () => JSON.stringify([o.value, ...ha.map((y) => e.query.value[y])])
  ), d = yt(null), m = p(() => {
    const y = e.query.value;
    if (!l.value) return y;
    const b = d.value?.of === c.value ? d.value.page : 1;
    return { ...y, expr: Zn(y.expr, o.value), page: b };
  });
  ye(n, (y) => {
    if (i(), !y.trim()) {
      s || (a.value = "");
      return;
    }
    s = !1, r = setTimeout(() => {
      r = void 0, a.value = n.value;
    }, t);
  }), ye(
    e.query,
    () => {
      s && (s = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const g = (y) => {
    i(), s = !0, n.value = "", !y() && s && (s = !1, a.value = "");
  };
  return Pn() && Zt(i), {
    text: n,
    live: m,
    drafting: l,
    setPage(y) {
      d.value = { of: c.value, page: Math.max(1, Math.floor(y)) };
    },
    commit() {
      const y = n.value.trim();
      if (!y) return;
      const b = Zn(
        e.query.value.expr,
        Cn(y, e.entity.value)
      );
      a.value = y, g(() => e.setExpression(b));
    },
    abandon() {
      i(), s = !1, n.value = "", a.value = "";
    },
    release: g
  };
}
const Ht = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, uo = ["aria-label"], fo = ["role", "aria-label"], po = ["data-dc-item"], vo = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, mo = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], ho = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, go = { class: "dc-menu__label dc-truncate" }, _o = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, yo = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, wo = /* @__PURE__ */ ie({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = W(null), i = W([]), o = W(null), l = W(null), c = W(null), d = W(!1), m = p(
      () => a.items.flatMap((E, k) => Ht(E) ? [k] : [])
    ), g = p(() => {
      const E = [{ entries: [] }];
      return a.items.forEach((k, K) => {
        k.heading ? E.push({ heading: k, entries: [] }) : E[E.length - 1]?.entries.push({ item: k, index: K });
      }), E.filter((k) => k.entries.length > 0);
    }), y = W({ x: a.at.x, y: a.at.y });
    async function b() {
      y.value = { x: a.at.x, y: a.at.y }, await It();
      const E = r.value?.getBoundingClientRect();
      if (!E) return;
      const k = 8;
      let K = a.at.x, I = a.at.y;
      if (K + E.width > window.innerWidth - k) {
        const Z = a.at.mirrorX === void 0 ? null : a.at.mirrorX - E.width;
        K = Z !== null && Z >= k ? Z : window.innerWidth - E.width - k;
      }
      I + E.height > window.innerHeight - k && (I = window.innerHeight - E.height - k), y.value = { x: Math.max(k, K), y: Math.max(k, I) };
    }
    const x = p(() => ({ left: `${y.value.x}px`, top: `${y.value.y}px` }));
    function w(E) {
      o.value = E, E !== null && It(() => i.value[E]?.focus());
    }
    function $(E, k) {
      const K = m.value;
      if (K.length === 0) return null;
      if (E === null) return k === 1 ? K[0] ?? null : K[K.length - 1] ?? null;
      const I = K.indexOf(E);
      return I === -1 ? K[0] ?? null : K[(I + k + K.length) % K.length] ?? null;
    }
    function L(E, k) {
      if (!a.items[E]?.items?.length) return;
      const I = i.value[E]?.getBoundingClientRect(), Z = r.value?.getBoundingClientRect();
      !I || !Z || (c.value = { x: Z.right - 4, y: I.top - 4, mirrorX: Z.left + 4 }, l.value = E, d.value = k);
    }
    function D(E) {
      const k = l.value;
      l.value = null, c.value = null, E && k !== null && w(k);
    }
    function M(E) {
      const k = a.items[E];
      if (!(!k || !Ht(k))) {
        if (k.items?.length) {
          L(E, !0);
          return;
        }
        s("choose", k);
      }
    }
    function S(E) {
      const k = E.key;
      if (k === "Escape") {
        E.preventDefault(), E.stopPropagation(), l.value !== null ? D(!0) : s("dismiss");
        return;
      }
      if (k === "ArrowDown" || k === "ArrowUp") {
        E.preventDefault(), E.stopPropagation(), D(!1), w($(o.value, k === "ArrowDown" ? 1 : -1));
        return;
      }
      if (k === "Home" || k === "End") {
        E.preventDefault(), E.stopPropagation(), D(!1), w($(null, k === "Home" ? 1 : -1));
        return;
      }
      if (k === "ArrowRight") {
        const K = o.value;
        K !== null && a.items[K]?.items?.length && (E.preventDefault(), E.stopPropagation(), L(K, !0));
        return;
      }
      if (k === "ArrowLeft") {
        l.value !== null && (E.preventDefault(), E.stopPropagation(), D(!0));
        return;
      }
      if (k === "Enter" || k === " ") {
        const K = o.value;
        if (K === null) return;
        E.preventDefault(), E.stopPropagation(), M(K);
      }
    }
    function q(E) {
      const k = a.items[E];
      !k || !Ht(k) || (l.value !== null && l.value !== E && D(!1), w(E), k.items?.length && L(E, !1));
    }
    return As(() => {
      b(), a.autofocus && w($(null, 1));
    }), ye(() => a.at, b, { deep: !0 }), ye(() => a.items, () => void b(), { deep: !0 }), Be(() => {
      l.value = null;
    }), t({ root: r }), (E, k) => {
      const K = Ts("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: r,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Ee(x.value),
        onKeydown: S
      }, [
        (f(!0), h(ae, null, me(g.value, (I, Z) => (f(), h("div", {
          key: `${Z}-${I.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: I.heading ? "group" : "none",
          "aria-label": I.heading?.label
        }, [
          I.heading ? (f(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": I.heading.id
          }, R(I.heading.label), 9, po)) : z("", !0),
          (f(!0), h(ae, null, me(I.entries, ({ item: X, index: ke }) => (f(), h(ae, {
            key: X.id ?? `${ke}-${X.label ?? ""}`
          }, [
            X.separator ? (f(), h("div", vo)) : (f(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (se) => {
                se && (i.value[ke] = se);
              },
              type: "button",
              class: "dc-menu__item",
              role: X.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": X.checked === void 0 ? void 0 : X.checked,
              "aria-haspopup": X.items?.length ? "menu" : void 0,
              "aria-expanded": X.items?.length ? l.value === ke : void 0,
              "aria-disabled": X.disabled ? "true" : void 0,
              disabled: X.disabled,
              "data-dc-item": X.id,
              tabindex: "-1",
              onClick: (se) => M(ke),
              onMouseenter: (se) => q(ke)
            }, [
              C("span", ho, R(X.checked ? "✓" : ""), 1),
              C("span", go, R(X.label), 1),
              X.shortcut ? (f(), h("span", _o, R(X.shortcut), 1)) : X.items?.length ? (f(), h("span", yo, "›")) : z("", !0)
            ], 40, mo))
          ], 64))), 128))
        ], 8, fo))), 128)),
        l.value !== null && c.value ? (f(), ne(K, {
          key: l.value,
          items: e.items[l.value]?.items ?? [],
          at: c.value,
          label: e.items[l.value]?.label,
          autofocus: d.value,
          onChoose: k[0] || (k[0] = (I) => s("choose", I)),
          onDismiss: k[1] || (k[1] = (I) => D(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
      ], 44, uo);
    };
  }
}), de = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, s] of t)
    n[a] = s;
  return n;
}, Pa = /* @__PURE__ */ de(wo, [["__scopeId", "data-v-9b1413fa"]]), ko = { class: "dc-pick" }, bo = ["id"], $o = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], xo = { class: "dc-pick__label" }, Co = /* @__PURE__ */ ie({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = An() ?? "dc-pick", r = W(null), i = W(null), o = W(null), l = W(!1), c = p(() => o.value !== null), d = W(null), m = p(
      () => n.options.find((M) => M.key === n.modelValue) ?? n.options[0]
    ), g = p(
      () => n.options.map((M) => ({
        id: M.key,
        label: M.label,
        checked: M.key === n.modelValue
      }))
    ), y = p(
      () => o.value ? { maxHeight: `${window.innerHeight - o.value.y - 8}px` } : void 0
    );
    function b(M) {
      const S = r.value?.getBoundingClientRect();
      S && (d.value = r.value?.closest(".dc-shell") ?? document.body, o.value = { x: S.left, y: S.bottom + 4, mirrorX: S.right }, l.value = M, a("open"));
    }
    function x(M) {
      o.value && a("close"), o.value = null, M && r.value?.focus();
    }
    function w() {
      c.value ? x(!0) : b(!1);
    }
    function $(M) {
      M.key !== "ArrowDown" && M.key !== "ArrowUp" || c.value || (M.preventDefault(), b(!0));
    }
    function L(M) {
      const S = M.target;
      S && (r.value?.contains(S) || i.value?.root?.contains(S) || x(!1));
    }
    ye(c, (M) => {
      M ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), Be(() => window.removeEventListener("pointerdown", L, !0));
    function D(M) {
      x(!0), !(M.id === void 0 || M.id === n.modelValue) && a("update:modelValue", M.id);
    }
    return (M, S) => (f(), h("span", ko, [
      C("span", {
        id: `${P(s)}-name`,
        class: "dc-pick__name"
      }, R(e.label), 9, bo),
      C("button", {
        id: `${P(s)}-value`,
        ref_key: "trigger",
        ref: r,
        type: "button",
        class: ut(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${P(s)}-name ${P(s)}-value`,
        "data-dc-value": e.modelValue,
        onClick: w,
        onKeydown: $
      }, [
        C("span", xo, R(m.value?.label), 1)
      ], 42, $o),
      S[1] || (S[1] = C("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      o.value && d.value ? (f(), ne(ol, {
        key: 0,
        to: d.value
      }, [
        ve(Pa, {
          ref_key: "menu",
          ref: i,
          class: "dc-pick__list",
          style: Ee(y.value),
          items: g.value,
          at: o.value,
          label: e.label,
          autofocus: l.value,
          onChoose: D,
          onDismiss: S[0] || (S[0] = (q) => x(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : z("", !0)
    ]));
  }
}), vs = /* @__PURE__ */ de(Co, [["__scopeId", "data-v-d21ebf1b"]]);
function Mo(e) {
  const t = yt(/* @__PURE__ */ new Map()), n = W(!0);
  let a = 0, s;
  const r = () => {
    a++, s?.abort(), s = void 0;
  }, i = () => {
    r();
    const o = a, { signal: l } = s = new AbortController(), c = e.query.value, d = e.schema.value, m = e.entities.value, g = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !g;
    const y = /* @__PURE__ */ new Map();
    let b = !0;
    for (const x of m) {
      const w = er(x, c.expr), $ = g ? ga(g, w) : w;
      let L = !1;
      const D = (S) => {
        if (o !== a) return;
        if (b) {
          y.set(x.key, S);
          return;
        }
        const q = new Map(t.value);
        q.set(x.key, S), t.value = q;
      }, M = e.source.value.query({
        query: { ...c, entity: x.key, expr: $, facets: Nt(x), page: 1 },
        schema: d,
        entity: x,
        limit: 0,
        offset: 0,
        signal: l,
        progress: (S) => {
          L || D({ total: S, pending: !0, counted: !0 });
        }
      });
      M instanceof Promise ? (y.has(x.key) || y.set(x.key, { total: 0, pending: !0, counted: !1 }), M.then((S) => {
        L = !0, D({ total: S.total, pending: !1, counted: !0 });
      })) : (L = !0, y.set(x.key, { total: M.total, pending: !1, counted: !0 }));
    }
    b = !1, t.value = y;
  };
  return Pn() && Zt(r), { counts: t, pristine: n, refresh: i, cancel: r };
}
const So = 25, lr = (e, t) => e.toLowerCase() === t.toLowerCase();
function Eo(e, t) {
  return e.find((n) => lr(n.id, t));
}
function Po(e) {
  const t = yt(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (o) => {
    if (o.facetKey !== Yt || !o.field || !o.value) return null;
    const l = tr(e.schema.value, o.field);
    return l ? { entity: l, id: o.value, key: `${l.key}:${o.value}` } : null;
  }, s = (o) => {
    const { entity: l, id: c } = o, d = e.query.value;
    return e.source.value.query({
      query: {
        ...d,
        entity: l.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: Qs(l, c) ?? "",
        facets: Nt(l),
        sort: it(l, d.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: l,
      limit: So,
      offset: 0
    });
  }, r = (o, l) => {
    const c = gn(He(o.columns ?? [], "identity"), l);
    return c === Qn || lr(c, l.id) ? "" : c;
  }, i = () => {
    const o = /* @__PURE__ */ new Map();
    for (const d of e.terms.value) {
      const m = a(d);
      m && !t.value.has(m.key) && !n.has(m.key) && o.set(m.key, m);
    }
    if (!o.size) return;
    const l = [...o.values()].map((d) => ({
      reference: d,
      outcome: s(d)
    })), c = (d) => {
      const m = new Map(t.value);
      d.forEach((g, y) => {
        const { reference: b } = l[y], x = Eo(g.rows, b.id);
        m.set(b.key, x ? r(b.entity, x) : "");
      }), t.value = m;
    };
    if (l.every(({ outcome: d }) => !(d instanceof Promise))) {
      c(l.map(({ outcome: d }) => d));
      return;
    }
    for (const { reference: d } of l) n.add(d.key);
    Promise.all(l.map(({ outcome: d }) => Promise.resolve(d))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: d } of l) n.delete(d.key);
    });
  };
  return ye([e.source, e.schema, e.terms], () => {
    try {
      i();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(o) {
      const l = a(o);
      return l && t.value.get(l.key) || null;
    }
  };
}
const Ao = ["data-dc-expanded"], To = { class: "dc-header__domain" }, zo = {
  key: 0,
  class: "dc-header__within"
}, Lo = ["title"], Ro = ["data-dc-more", "title"], Fo = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Io = ["title", "aria-label", "onClick"], No = ["onKeydown"], Do = ["aria-expanded", "aria-controls"], Oo = {
  class: "dc-header__chevron",
  "aria-hidden": "true"
}, Bo = { class: "dc-header__sr" }, qo = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, Vo = ["disabled"], Ko = ["title"], Wo = ["value", "onKeydown"], Ho = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Uo = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, jo = ["disabled"], Go = {
  key: 1,
  class: "dc-header__actions"
}, Xo = "…", Qo = /* @__PURE__ */ ie({
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
    const n = e, a = t, s = be(), r = p(() => s.schema.value), i = p(
      () => s.hasFacets.value || !!s.liveQuery.value.expr.trim() || !!s.within.value
    ), o = p(() => r.value.formatCount ?? Ct), l = Mo({
      source: s.source,
      schema: s.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: s.liveQuery,
      entities: s.entities,
      within: s.within
    });
    function c(O) {
      if (n.hideCount) return O.count;
      if (O.key === s.query.value.entity && i.value) return o.value(s.total.value);
      if (l.pristine.value) return O.count;
      const j = l.counts.value.get(O.key);
      return j ? j.counted ? `${j.pending ? "~" : ""}${o.value(j.total)}` : Xo : O.count;
    }
    function d(O) {
      return `${O.label} · ${c(O)}`;
    }
    const m = p(() => [
      { key: "", label: "Everything" },
      ...s.entities.value.map((O) => ({ key: O.key, label: d(O) }))
    ]), g = p(() => {
      const O = s.within.value.trim();
      return O ? Ea({ ...s.query.value, expr: O, facets: {} }, null) : [];
    }), y = p(
      () => (n.views ?? [...Ls]).map((O) => ({ key: O, label: vl[O] }))
    ), b = p(() => da(s.query.value.view, n.views)), x = p(() => s.query.value.entity !== null);
    function w(O) {
      s.setView(O);
    }
    const $ = p(() => {
      const O = s.entity.value, G = O?.keepsScope ? void 0 : O?.scope?.toLowerCase();
      return s.terms.value.filter((j) => j.facetKey !== Mn).map((j, Ie, Bt) => {
        const xt = Bt[Ie - 1];
        return {
          term: j,
          or: xt?.group !== void 0 && j.group !== void 0 && j.group !== xt.group,
          idle: !!G && j.field?.toLowerCase() === G
        };
      });
    }), L = Po({
      source: s.source,
      schema: s.schema,
      query: s.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: p(() => [...g.value, ...s.terms.value])
    });
    function D(O) {
      return tr(r.value, O)?.scopeLabel ?? O;
    }
    function M(O) {
      return O.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function S(O) {
      const G = L.nameOf(O);
      return G ? `${O.negated ? "-" : ""}${D(O.field)}: ${M(G)}` : O.label;
    }
    function q(O) {
      s.setEntity(O || null);
    }
    const E = W(null);
    function k() {
      s.abandonDraft(), E.value?.blur();
    }
    function K(O) {
      if (s.draft.value) return;
      const G = $.value.at(-1);
      G && (O.preventDefault(), s.removeTerm(G.term));
    }
    function I(O) {
      O.target?.closest("button, select, label, input") || a("toggle");
    }
    const Z = W(null), X = W("");
    function ke() {
      const O = Z.value;
      if (!O) {
        X.value = "";
        return;
      }
      const G = O.scrollLeft > 1, j = O.scrollWidth - O.clientWidth - O.scrollLeft > 1;
      X.value = G && j ? "both" : G ? "start" : j ? "end" : "";
    }
    let se = null;
    ye(
      Z,
      (O) => {
        se?.disconnect(), se = null, ke(), !(!O || typeof ResizeObserver > "u") && (se = new ResizeObserver(ke), se.observe(O));
      },
      { flush: "post" }
    ), ye($, ke, { flush: "post" }), Be(() => se?.disconnect());
    const N = p(() => s.liveQuery.value.page), T = p(
      () => (s.pageCount.value > 1 || !!n.pagesNote) && !va(s.query.value)
    ), H = p(
      () => `${s.counting.value ? "~" : ""}${Ct(s.pageCount.value)}`
    ), te = p(() => {
      let O = `Page ${Ct(N.value)} of ${H.value}`;
      const G = s.rows.value.length;
      if (G) {
        const j = s.offset.value + 1, Ie = `${s.counting.value ? "~" : ""}${Ct(s.total.value)}`;
        O += ` — rows ${Ct(j)} to ${Ct(j + G - 1)} of ${Ie}`;
      }
      return n.pagesNote ? `${O}
${n.pagesNote}` : O;
    }), ce = W(null), Ae = p(() => ce.value ?? String(N.value)), Ve = p(
      () => `calc(${Math.max(2, String(s.pageCount.value).length)}ch + 10px)`
    );
    function Ge(O) {
      O.target.select();
    }
    function Xe(O) {
      const G = O.target, j = G.value.replace(/[^0-9]/g, "");
      G.value !== j && (G.value = j), ce.value = j;
    }
    function Ke(O) {
      const G = O.target, j = Number(ce.value);
      ce.value = null;
      const Ie = Number.isFinite(j) && j >= 1 ? Math.min(Math.trunc(j), Math.max(1, s.pageCount.value)) : N.value;
      G.value = String(Ie), Ie !== N.value && s.setPage(Ie);
    }
    function We(O) {
      const G = O.target;
      ce.value = null, G.value = String(N.value), G.blur();
    }
    return (O, G) => (f(), h("div", {
      class: "dc-header",
      "data-dc-expanded": e.expanded ? "true" : "false"
    }, [
      C("div", {
        class: "dc-header__trigger",
        onClick: I
      }, [
        C("span", To, R(r.value.label), 1),
        g.value.length ? (f(), h("span", zo, [
          G[5] || (G[5] = C("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(ae, null, me(g.value, (j) => (f(), h("span", {
            key: `scope:${j.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: S(j)
          }, R(S(j)), 9, Lo))), 128))
        ])) : z("", !0),
        C("div", {
          ref_key: "termBar",
          ref: Z,
          class: "dc-header__query dc-header__terms",
          "data-dc-more": X.value,
          title: P(s).summary.value,
          onScroll: ke
        }, [
          x.value ? (f(), ne(vs, {
            key: 0,
            class: "dc-header__pick dc-header__scope-select",
            label: "Type",
            "model-value": P(s).query.value.entity ?? "",
            options: m.value,
            onOpen: P(l).refresh,
            onClose: P(l).cancel,
            "onUpdate:modelValue": q
          }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : z("", !0),
          ve(vs, {
            class: "dc-header__pick dc-header__view-select",
            label: "View",
            "model-value": b.value,
            options: y.value,
            "onUpdate:modelValue": w
          }, null, 8, ["model-value", "options"]),
          (f(!0), h(ae, null, me($.value, (j) => (f(), h(ae, {
            key: j.term.id
          }, [
            j.or ? (f(), h("span", Fo, "or")) : z("", !0),
            C("button", {
              type: "button",
              class: ut(["dc-term dc-mono", { "dc-term--idle": j.idle }]),
              title: j.idle ? `Not applied to ${P(s).entity.value?.label} — remove ${S(j.term)}` : `Remove ${S(j.term)}`,
              "aria-label": `Remove ${S(j.term)}`,
              onClick: (Ie) => P(s).removeTerm(j.term)
            }, R(S(j.term)), 11, Io)
          ], 64))), 128)),
          dt(C("input", {
            ref_key: "searchBox",
            ref: E,
            "onUpdate:modelValue": G[0] || (G[0] = (j) => P(s).draft.value = j),
            class: "dc-header__search dc-mono",
            type: "text",
            autocomplete: "off",
            spellcheck: "false",
            placeholder: "Search…",
            "aria-label": "Search",
            onKeydown: [
              G[1] || (G[1] = Ye(Fe(
                //@ts-ignore
                (...j) => P(s).commitDraft && P(s).commitDraft(...j),
                ["prevent"]
              ), ["enter"])),
              Ye(Fe(k, ["prevent"]), ["esc"]),
              Ye(K, ["backspace"])
            ]
          }, null, 40, No), [
            [bn, P(s).draft.value]
          ])
        ], 40, Ro),
        C("button", {
          type: "button",
          class: "dc-header__toggle",
          "aria-expanded": e.expanded,
          "aria-controls": e.panelId,
          onClick: G[2] || (G[2] = (j) => a("toggle"))
        }, [
          C("span", Oo, R(e.expanded ? "▲" : "▼"), 1),
          C("span", Bo, R(e.expanded ? "Hide query panel" : "Edit query"), 1)
        ], 8, Do)
      ]),
      T.value ? (f(), h("nav", qo, [
        C("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: N.value <= 1,
          onClick: G[3] || (G[3] = (j) => P(s).setPage(N.value - 1))
        }, [...G[6] || (G[6] = [
          C("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, Vo),
        C("span", {
          class: "dc-header__page dc-mono",
          title: te.value
        }, [
          C("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Ee({ width: Ve.value }),
            value: Ae.value,
            onFocus: Ge,
            onInput: Xe,
            onKeydown: [
              Ye(Fe(Ke, ["prevent"]), ["enter"]),
              Ye(Fe(We, ["prevent"]), ["esc"])
            ],
            onBlur: Ke
          }, null, 44, Wo),
          C("span", Ho, "/ " + R(H.value), 1)
        ], 8, Ko),
        C("span", Uo, R(te.value), 1),
        C("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: N.value >= P(s).pageCount.value,
          onClick: G[4] || (G[4] = (j) => P(s).setPage(N.value + 1))
        }, [...G[7] || (G[7] = [
          C("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, jo)
      ])) : z("", !0),
      O.$slots.actions ? (f(), h("div", Go, [
        xe(O.$slots, "actions", {}, void 0, !0)
      ])) : z("", !0)
    ], 8, Ao));
  }
}), or = /* @__PURE__ */ de(Qo, [["__scopeId", "data-v-6e711ad8"]]), Yo = { class: "dc-facet" }, Zo = ["id"], Jo = { class: "dc-facet__body" }, ei = ["aria-labelledby"], ti = ["aria-pressed", "data-dc-active", "onClick"], ni = ["aria-labelledby"], ai = ["aria-label", "placeholder", "onKeydown"], si = ["aria-label", "placeholder", "onKeydown"], ri = ["aria-checked"], li = { class: "dc-switch__text" }, oi = ["data-dc-active"], ii = /* @__PURE__ */ ie({
  __name: "FacetControl",
  props: {
    facet: {},
    value: {}
  },
  emits: ["update"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = p(
      () => n.value.kind === "chips" ? new Set(n.value.selected) : /* @__PURE__ */ new Set()
    );
    function r(m) {
      if (n.value.kind !== "chips") return;
      const g = s.value.has(m) ? n.value.selected.filter((y) => y !== m) : [...n.value.selected, m];
      a("update", { kind: "chips", selected: g });
    }
    const i = W(""), o = W("");
    ye(
      () => n.value,
      (m) => {
        m.kind === "range" && (i.value = m.min === null ? "" : m.min, o.value = m.max === null ? "" : m.max);
      },
      { immediate: !0, deep: !0 }
    );
    function l(m) {
      if (typeof m == "number") return Number.isFinite(m) ? m : null;
      const g = m.trim();
      if (!g) return null;
      const y = Number(g);
      return Number.isFinite(y) ? y : null;
    }
    function c() {
      if (n.value.kind !== "range") return;
      const m = l(i.value), g = l(o.value);
      m === n.value.min && g === n.value.max || a("update", { kind: "range", min: m, max: g });
    }
    function d() {
      n.value.kind === "toggle" && a("update", { kind: "toggle", on: !n.value.on });
    }
    return (m, g) => (f(), h("div", Yo, [
      C("span", {
        id: `dc-facet-${e.facet.key}`,
        class: "dc-facet__label"
      }, R(e.facet.label), 9, Zo),
      C("div", Jo, [
        e.facet.kind === "chips" && e.value.kind === "chips" ? (f(), h("div", {
          key: 0,
          class: "dc-facet__chips",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          (f(!0), h(ae, null, me(e.facet.options, (y) => (f(), h("button", {
            key: y,
            type: "button",
            class: "dc-chip",
            "aria-pressed": s.value.has(y),
            "data-dc-active": s.value.has(y) ? "true" : "false",
            onClick: (b) => r(y)
          }, R(y), 9, ti))), 128))
        ], 8, ei)) : e.facet.kind === "range" && e.value.kind === "range" ? (f(), h("div", {
          key: 1,
          class: "dc-facet__range",
          role: "group",
          "aria-labelledby": `dc-facet-${e.facet.key}`
        }, [
          dt(C("input", {
            "onUpdate:modelValue": g[0] || (g[0] = (y) => i.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} minimum`,
            placeholder: String(e.facet.min),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(Fe(c, ["prevent"]), ["enter"])
          }, null, 40, ai), [
            [bn, i.value]
          ]),
          g[2] || (g[2] = C("span", {
            class: "dc-facet__dash",
            "aria-hidden": "true"
          }, "–", -1)),
          dt(C("input", {
            "onUpdate:modelValue": g[1] || (g[1] = (y) => o.value = y),
            class: "dc-input dc-mono",
            type: "number",
            inputmode: "numeric",
            "aria-label": `${e.facet.label} maximum`,
            placeholder: String(e.facet.max),
            onChange: c,
            onBlur: c,
            onKeydown: Ye(Fe(c, ["prevent"]), ["enter"])
          }, null, 40, si), [
            [bn, o.value]
          ])
        ], 8, ni)) : e.facet.kind === "toggle" && e.value.kind === "toggle" ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-switch",
          role: "switch",
          "aria-checked": e.value.on,
          onClick: d
        }, [
          C("span", li, R(e.facet.text), 1),
          C("span", {
            class: "dc-switch__track",
            "data-dc-active": e.value.on ? "true" : "false",
            "aria-hidden": "true"
          }, [...g[3] || (g[3] = [
            C("span", { class: "dc-switch__knob" }, null, -1)
          ])], 8, oi)
        ], 8, ri)) : z("", !0)
      ])
    ]));
  }
}), ir = /* @__PURE__ */ de(ii, [["__scopeId", "data-v-36d1334b"]]), ci = ["id"], ui = { class: "dc-panel__section dc-panel__rows" }, di = { class: "dc-panel__row" }, fi = ["for"], pi = ["title", "aria-label", "onClick"], vi = ["id", "placeholder", "onKeydown"], mi = { class: "dc-panel__actions" }, hi = ["disabled"], gi = {
  key: 0,
  class: "dc-panel__section"
}, _i = /* @__PURE__ */ ie({
  __name: "QueryPanel",
  props: {
    panelId: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = t, a = Jt(), s = be(), r = p(() => Fl(s.query.value.expr)), i = p(() => r.value.parts.map(tn)), o = W(r.value.text), l = W(null);
    ye(
      () => r.value.text,
      (x) => {
        o.value = x;
      }
    );
    const c = p(() => o.value !== r.value.text);
    function d() {
      if (c.value) {
        const x = Cn(o.value, s.entity.value);
        s.setExpression(is(r.value.parts, x));
      }
      n("close");
    }
    function m(x) {
      const { parts: w, text: $ } = r.value;
      s.setExpression(is(w.filter((L, D) => D !== x), $));
    }
    function g(x) {
      const { parts: w } = r.value;
      o.value || !w.length || (x.preventDefault(), m(w.length - 1));
    }
    function y() {
      o.value = "", s.clearFilters();
    }
    function b(x, w) {
      s.setFacet(x, w);
    }
    return It(() => l.value?.focus()), (x, w) => (f(), h("div", {
      id: e.panelId,
      class: "dc-panel",
      role: "dialog",
      "aria-label": "Query",
      onKeydown: w[2] || (w[2] = Ye(Fe(($) => n("close"), ["stop"]), ["esc"]))
    }, [
      C("section", ui, [
        C("div", di, [
          C("label", {
            class: "dc-panel__field-label",
            for: `${e.panelId}-expr`
          }, "Expression", 8, fi),
          C("div", {
            class: "dc-field",
            onMousedown: w[1] || (w[1] = Fe(($) => l.value?.focus(), ["self", "prevent"]))
          }, [
            (f(!0), h(ae, null, me(i.value, ($, L) => (f(), h("button", {
              key: `${L}:${$}`,
              type: "button",
              class: "dc-part dc-mono",
              title: `Remove ${$}`,
              "aria-label": `Remove ${$}`,
              onClick: (D) => m(L)
            }, R($), 9, pi))), 128)),
            dt(C("input", {
              id: `${e.panelId}-expr`,
              ref_key: "expressionField",
              ref: l,
              "onUpdate:modelValue": w[0] || (w[0] = ($) => o.value = $),
              class: "dc-expression dc-mono",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: i.value.length ? "" : P(s).schema.value.placeholder,
              onKeydown: [
                Ye(Fe(d, ["prevent"]), ["enter"]),
                Ye(g, ["backspace"])
              ]
            }, null, 40, vi), [
              [bn, o.value]
            ])
          ], 32)
        ]),
        P(s).entity.value ? (f(!0), h(ae, { key: 0 }, me(P(s).entity.value.facets, ($) => (f(), ne(ir, {
          key: $.key,
          facet: $,
          value: P(s).query.value.facets[$.key],
          onUpdate: (L) => b($.key, L)
        }, null, 8, ["facet", "value", "onUpdate"]))), 128)) : z("", !0),
        C("div", mi, [
          C("button", {
            type: "button",
            class: "dc-button dc-button--primary",
            onClick: d
          }, " Run query "),
          C("button", {
            type: "button",
            class: "dc-button",
            disabled: P(s).isPristine.value && !c.value,
            onClick: y
          }, " Reset ", 8, hi)
        ])
      ]),
      a["panel-section"] ? (f(), h("section", gi, [
        xe(x.$slots, "panel-section", {}, void 0, !0)
      ])) : z("", !0)
    ], 40, ci));
  }
}), cr = /* @__PURE__ */ de(_i, [["__scopeId", "data-v-640ae2f5"]]), yi = ["checked", "indeterminate"], ur = /* @__PURE__ */ ie({
  __name: "PageTick",
  setup(e) {
    const t = be(), n = p(() => t.rows.value.filter((r) => t.isSelected(r)).length), a = p(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), s = p(() => n.value > 0 && !a.value);
    return (r, i) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: s.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: i[0] || (i[0] = (o) => P(t).selectPage(!a.value))
    }, null, 40, yi));
  }
}), wi = {
  key: 0,
  class: "dc-actions"
}, ki = {
  key: 0,
  class: "dc-actions__select"
}, bi = {
  key: 0,
  class: "dc-actions__all"
}, $i = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, xi = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, Ci = { class: "dc-actions__ops" }, Mi = ["disabled"], Si = ["disabled"], Ei = /* @__PURE__ */ ie({
  __name: "RecordActions",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), a = p(() => n.entity.value), s = p(() => !va(n.query.value)), r = p(() => s.value && n.selectable.value), i = p(
      () => da(n.query.value.view, t.views) === "table"
    ), o = p(
      () => s.value && (r.value || !!(a.value?.create || a.value?.duplicate || a.value?.delete))
    ), l = p(() => n.selection.value.ids.length), c = p(() => l.value ? `${l.value} selected` : i.value ? "None selected" : "Select all");
    function d(m) {
      return l.value ? `${m} ${l.value}` : m;
    }
    return (m, g) => o.value ? (f(), h("div", wi, [
      r.value ? (f(), h("div", ki, [
        i.value ? (f(), h("span", xi, R(c.value), 1)) : (f(), h("label", bi, [
          ve(ur),
          C("span", $i, R(c.value), 1)
        ])),
        l.value ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__clear",
          onClick: g[0] || (g[0] = (y) => P(n).clearSelection())
        }, " Clear ")) : z("", !0)
      ])) : z("", !0),
      C("div", Ci, [
        a.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: g[1] || (g[1] = (y) => P(n).create(a.value))
        }, [
          g[4] || (g[4] = C("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ue(" " + R(a.value.create), 1)
        ])) : z("", !0),
        a.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !l.value,
          onClick: g[2] || (g[2] = (y) => P(n).duplicate())
        }, R(d(a.value.duplicate)), 9, Mi)) : z("", !0),
        a.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !l.value,
          onClick: g[3] || (g[3] = (y) => P(n).delete())
        }, R(d(a.value.delete)), 9, Si)) : z("", !0)
      ])
    ])) : z("", !0);
  }
}), dr = /* @__PURE__ */ de(Ei, [["__scopeId", "data-v-03ff2a91"]]);
function Pi(e, t) {
  if (!e) return null;
  const n = Oe(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
function Ai(e, t) {
  const n = He(t, "state"), a = He(t, "tint");
  return {
    identity: gn(He(t, "identity"), e),
    reference: gn(He(t, "reference"), e),
    metrics: qs(t, "metric").map((s) => ({
      column: s,
      label: s.label ?? "",
      text: en(s, e)
    })),
    state: n ? Oe(n, e) ?? null : null,
    updated: gn(He(t, "updated"), e),
    image: Pi(He(t, "image"), e),
    tint: a ? Oe(a, e) ?? null : null
  };
}
function fr(e, t, n, a, s = !1) {
  const r = n?.columns ?? [];
  return {
    row: e,
    key: bl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: r,
    ordinal: yl(t),
    parts: Ai(e, r),
    pinned: a,
    selected: s
  };
}
function kt() {
  const e = be(), t = p(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return p(
    () => e.rows.value.map(
      (n, a) => fr(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n)
      )
    )
  );
}
const Ti = ["data-dc-status"], zi = /* @__PURE__ */ ie({
  __name: "StatusPill",
  props: {
    status: {}
  },
  setup(e) {
    return (t, n) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status
    }, R(e.status), 9, Ti));
  }
}), nn = /* @__PURE__ */ de(zi, [["__scopeId", "data-v-23e59fbf"]]), Li = ["title"], Ri = { key: 1 }, Fi = /* @__PURE__ */ ie({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = be(), a = p(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((l) => l.key === t.column.drill) ?? null), s = p(() => t.column.label ?? ""), r = p(() => en(t.column, t.entry.row));
    function i(o) {
      o.stopPropagation(), a.value && n.drill(t.entry.row, a.value, qe(o));
    }
    return (o, l) => a.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-drill",
      title: `${s.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onClick: i
    }, [
      xe(o.$slots, "default", {}, () => [
        Ue(R(r.value), 1)
      ], !0)
    ], 8, Li)) : (f(), h("span", Ri, [
      xe(o.$slots, "default", {}, () => [
        Ue(R(r.value), 1)
      ], !0)
    ]));
  }
}), an = /* @__PURE__ */ de(Fi, [["__scopeId", "data-v-f2501b17"]]), Ii = ["data-dc-active", "aria-pressed", "aria-label"], Ni = /* @__PURE__ */ ie({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = be();
    function a(s) {
      s.stopPropagation(), n.togglePin(t.row);
    }
    return (s, r) => (f(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, R(e.pinned ? "★" : "☆"), 9, Ii));
  }
}), Aa = /* @__PURE__ */ de(Ni, [["__scopeId", "data-v-ef63d763"]]), Di = ["src"], Oi = /* @__PURE__ */ ie({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = W(!1);
    return ye(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, s) => e.src.trim() && !n.value ? (f(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: s[0] || (s[0] = (r) => n.value = !0)
    }, null, 40, Di)) : z("", !0);
  }
}), zn = /* @__PURE__ */ de(Oi, [["__scopeId", "data-v-afaab300"]]), Bi = ["data-dc-standing", "title", "aria-label"], qi = /* @__PURE__ */ ie({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = p(() => _a(t.entry.entity, t.entry.row)), s = p(() => Zs(n.query.value.expr, a.value)), r = p(
      () => s.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function i(o) {
      o.stopPropagation(), n.setExpression(Js(n.query.value.expr, a.value));
    }
    return (o, l) => s.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": s.value,
      title: r.value,
      "aria-label": r.value,
      onClick: i
    }, R(s.value === "in" ? "+" : "−"), 9, Bi)) : z("", !0);
  }
}), Ln = /* @__PURE__ */ de(qi, [["__scopeId", "data-v-4b8d4166"]]), Vi = ["data-dc-pending", "title", "aria-label"], Ki = /* @__PURE__ */ ie({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = p(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), s = W(null);
    function r(c) {
      s.value = qe(c).exclude ? "out" : "in";
    }
    function i(c) {
      r(c), window.addEventListener("keydown", r), window.addEventListener("keyup", r);
    }
    function o() {
      s.value = null, window.removeEventListener("keydown", r), window.removeEventListener("keyup", r);
    }
    Be(o);
    function l(c) {
      c.stopPropagation(), n.drill(t.entry.row, null, qe(c));
    }
    return (c, d) => a.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-scope",
      "data-dc-pending": s.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌘-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: i,
      onPointermove: r,
      onPointerleave: o,
      onClick: l
    }, " → ", 40, Vi)) : z("", !0);
  }
}), sn = /* @__PURE__ */ de(Ki, [["__scopeId", "data-v-9efd42ac"]]), Wi = ["checked", "aria-label"], bt = /* @__PURE__ */ ie({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = be();
    function a(s) {
      s.stopPropagation(), n.toggleSelect(t.row);
    }
    return (s, r) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Wi));
  }
}), Hi = { class: "dc-card__top dc-mono" }, Ui = { class: "dc-card__lead" }, ji = {
  key: 2,
  class: "dc-card__entity"
}, Gi = { class: "dc-card__top-right" }, Xi = ["onClick"], Qi = { class: "dc-card__names" }, Yi = { class: "dc-card__primary" }, Zi = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Ji = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, ec = {
  key: 0,
  class: "dc-card__date"
}, tc = /* @__PURE__ */ ie({
  __name: "CardsView",
  setup(e) {
    const t = be(), n = kt(), a = p(() => t.isEverything.value), s = (i) => i.entity?.card === "picture", r = p(() => n.value.length > 0 && n.value.every(s));
    return (i, o) => (f(), h("div", {
      class: ut(["dc-cards", { "dc-cards--pictures": r.value }])
    }, [
      (f(!0), h(ae, null, me(P(n), (l) => (f(), h("div", {
        key: l.key,
        class: ut(["dc-card", { "dc-card--picture": s(l) }])
      }, [
        C("div", Hi, [
          C("span", Ui, [
            P(t).selectable.value ? (f(), ne(bt, {
              key: 0,
              row: l.row,
              selected: l.selected,
              name: l.parts.identity
            }, null, 8, ["row", "selected", "name"])) : z("", !0),
            s(l) ? z("", !0) : (f(), h(ae, { key: 1 }, [
              Ue(R(l.ordinal), 1)
            ], 64)),
            a.value ? (f(), h("span", ji, R(l.entityLabel), 1)) : z("", !0)
          ]),
          C("span", Gi, [
            l.parts.state && !s(l) ? (f(), ne(nn, {
              key: 0,
              status: l.parts.state
            }, null, 8, ["status"])) : z("", !0),
            ve(Ln, { entry: l }, null, 8, ["entry"]),
            ve(sn, { entry: l }, null, 8, ["entry"]),
            P(t).pinnable.value ? (f(), ne(Aa, {
              key: 1,
              row: l.row,
              name: l.parts.identity,
              pinned: l.pinned
            }, null, 8, ["row", "name", "pinned"])) : z("", !0)
          ])
        ]),
        C("button", {
          type: "button",
          class: "dc-card__open",
          onClick: (c) => P(t).activate(l.row, P(qe)(c))
        }, [
          l.parts.image ? (f(), ne(zn, {
            key: 0,
            class: "dc-card__image",
            src: l.parts.image
          }, null, 8, ["src"])) : z("", !0),
          C("span", Qi, [
            C("span", Yi, R(l.parts.identity), 1),
            s(l) ? z("", !0) : (f(), h("span", Zi, R(l.parts.reference), 1))
          ])
        ], 8, Xi),
        s(l) ? z("", !0) : (f(), h("div", Ji, [
          (f(!0), h(ae, null, me(l.parts.metrics.slice(0, 2), (c) => (f(), ne(an, {
            key: c.column.key ?? c.label,
            entry: l,
            column: c.column
          }, {
            default: Ze(() => [
              Ue(R(c.label) + " " + R(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          l.parts.updated ? (f(), h("span", ec, R(l.parts.updated), 1)) : z("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), pr = /* @__PURE__ */ de(tc, [["__scopeId", "data-v-316cfa48"]]), nc = { class: "dc-grid" }, ac = ["onClick"], sc = { class: "dc-tile__scrim" }, rc = { class: "dc-tile__top dc-mono" }, lc = { class: "dc-tile__chip" }, oc = { class: "dc-tile__caption" }, ic = { class: "dc-tile__secondary dc-truncate" }, cc = { class: "dc-tile__primary" }, uc = /* @__PURE__ */ ie({
  __name: "GridView",
  setup(e) {
    const t = be(), n = kt();
    return (a, s) => (f(), h("div", nc, [
      (f(!0), h(ae, null, me(P(n), (r) => (f(), h("div", {
        key: r.key,
        class: "dc-grid__cell"
      }, [
        C("button", {
          type: "button",
          class: "dc-tile",
          style: Ee({ "--dc-tile-tint": r.parts.tint ?? void 0 }),
          onClick: (i) => P(t).activate(r.row, P(qe)(i))
        }, [
          r.parts.image ? (f(), ne(zn, {
            key: 0,
            class: "dc-tile__image",
            src: r.parts.image
          }, null, 8, ["src"])) : z("", !0),
          C("span", sc, [
            C("span", rc, [
              C("span", lc, R(r.ordinal), 1)
            ]),
            C("span", oc, [
              C("span", ic, R(r.parts.reference), 1),
              C("span", cc, R(r.parts.identity), 1)
            ])
          ])
        ], 12, ac),
        P(t).selectable.value ? (f(), ne(bt, {
          key: 0,
          class: "dc-grid__tick",
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0)
      ]))), 128))
    ]));
  }
}), vr = /* @__PURE__ */ de(uc, [["__scopeId", "data-v-7df25d40"]]);
function ms(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function Vn(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function dc(e) {
  return e > 0 ? e : 1 / 0;
}
function fc(e, t, n) {
  const { width: a, height: s, gap: r = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(s > 0)) return [{ items: [...e], height: s, filled: !1 }];
  const i = [];
  let o = [], l = 0, c = 0;
  for (const d of e) {
    const m = t(d), g = Math.max(m.ratio, Number.EPSILON), y = m.height && m.height > 0 ? Math.max(c, m.height) : c, b = Vn(y, s), x = ms(l + g, o.length + 1, a, r);
    if (x > b) {
      o.push(d), l += g, c = y;
      continue;
    }
    const w = Vn(c, s), $ = o.length ? ms(l, o.length, a, r) : 1 / 0;
    $ <= dc(c) && $ - w < b - x ? (i.push({ items: o, height: $, filled: !0 }), o = [d], l = g, c = m.height && m.height > 0 ? m.height : 0) : (i.push({ items: [...o, d], height: x, filled: !0 }), o = [], l = 0, c = 0);
  }
  return o.length && i.push({ items: o, height: Vn(c, s), filled: !1 }), i;
}
const pc = { class: "dc-images" }, vc = ["title", "aria-label", "onClick"], mc = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, hc = 240, fn = 8, gc = 1, _c = /* @__PURE__ */ ie({
  __name: "ImagesView",
  setup(e) {
    const t = be(), n = kt(), a = Ya(/* @__PURE__ */ new Map()), s = Ya(/* @__PURE__ */ new Set());
    function r(b, x) {
      const w = x.target;
      w.naturalWidth > 0 && w.naturalHeight > 0 && a.set(b, { width: w.naturalWidth, height: w.naturalHeight });
    }
    function i(b) {
      const x = b.parts.image;
      return x && !s.has(x) ? x : null;
    }
    function o(b) {
      const x = i(b);
      return x ? a.get(x) : void 0;
    }
    function l(b) {
      const x = o(b);
      return x ? { ratio: x.width / x.height, height: x.height } : { ratio: gc };
    }
    const c = W(null), d = W(0);
    let m = null;
    function g() {
      d.value = c.value?.clientWidth ?? 0;
    }
    As(() => {
      g(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver(g), m.observe(c.value));
    }), Be(() => {
      m?.disconnect(), m = null;
    });
    const y = p(() => {
      const b = fc(n.value, l, {
        width: d.value,
        height: hc,
        gap: fn
      }), x = [];
      let w = 0;
      for (const $ of b) {
        let L = 0;
        for (const D of $.items) {
          const M = l(D).ratio * $.height, S = o(D), q = S !== void 0 && S.height < $.height;
          x.push({
            entry: D,
            style: {
              top: `${w}px`,
              left: `${L}px`,
              width: `${M}px`,
              height: `${$.height}px`
            },
            picture: q ? { width: `${S.width}px`, height: `${S.height}px` } : { width: "100%", height: "100%" }
          }), L += M + fn;
        }
        w += $.height + fn;
      }
      return { boxes: x, height: b.length ? w - fn : 0 };
    });
    return (b, x) => (f(), h("div", pc, [
      C("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Ee({ height: `${y.value.height}px` })
      }, [
        (f(!0), h(ae, null, me(y.value.boxes, ({ entry: w, style: $, picture: L }) => (f(), h("div", {
          key: w.key,
          class: "dc-images__cell",
          style: Ee($)
        }, [
          C("button", {
            type: "button",
            class: "dc-images__open",
            title: w.parts.identity,
            "aria-label": w.parts.identity,
            onClick: (D) => P(t).activate(w.row, P(qe)(D))
          }, [
            i(w) ? (f(), ne(zn, {
              key: 0,
              class: "dc-images__picture",
              style: Ee(L),
              src: i(w),
              onLoad: (D) => r(i(w), D),
              onError: (D) => s.add(i(w))
            }, null, 8, ["style", "src", "onLoad", "onError"])) : (f(), h("span", mc, R(w.parts.identity), 1))
          ], 8, vc),
          P(t).selectable.value ? (f(), ne(bt, {
            key: 0,
            class: "dc-images__tick",
            row: w.row,
            selected: w.selected,
            name: w.parts.identity
          }, null, 8, ["row", "selected", "name"])) : z("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), mr = /* @__PURE__ */ de(_c, [["__scopeId", "data-v-f708d83f"]]), yc = { class: "dc-links" }, wc = ["onClick"], kc = { class: "dc-link__primary dc-truncate" }, bc = { class: "dc-link__secondary dc-mono dc-truncate" }, $c = /* @__PURE__ */ ie({
  __name: "LinksView",
  setup(e) {
    const t = be(), n = kt();
    return (a, s) => (f(), h("div", yc, [
      (f(!0), h(ae, null, me(P(n), (r) => (f(), h("span", {
        key: r.key,
        class: "dc-links__item"
      }, [
        P(t).selectable.value ? (f(), ne(bt, {
          key: 0,
          row: r.row,
          selected: r.selected,
          name: r.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0),
        C("button", {
          type: "button",
          class: "dc-link",
          onClick: (i) => P(t).activate(r.row, P(qe)(i))
        }, [
          C("span", kc, R(r.parts.identity), 1),
          C("span", bc, R(r.parts.reference), 1)
        ], 8, wc)
      ]))), 128))
    ]));
  }
}), hr = /* @__PURE__ */ de($c, [["__scopeId", "data-v-08d0266c"]]), xc = {
  class: "dc-list",
  role: "list"
}, Cc = ["onClick"], Mc = { class: "dc-list__ordinal dc-mono" }, Sc = { class: "dc-list__identity" }, Ec = { class: "dc-list__primary dc-truncate" }, Pc = { class: "dc-list__secondary dc-mono dc-truncate" }, Ac = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, Tc = { class: "dc-list__metrics dc-mono" }, zc = { class: "dc-list__trailing" }, Lc = /* @__PURE__ */ ie({
  __name: "ListView",
  setup(e) {
    const t = be(), n = kt(), a = p(() => t.isEverything.value);
    return (s, r) => (f(), h("div", xc, [
      (f(!0), h(ae, null, me(P(n), (i) => (f(), h("div", {
        key: i.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        P(t).selectable.value ? (f(), ne(bt, {
          key: 0,
          class: "dc-list__tick",
          row: i.row,
          selected: i.selected,
          name: i.parts.identity
        }, null, 8, ["row", "selected", "name"])) : z("", !0),
        C("button", {
          type: "button",
          class: "dc-list__open",
          onClick: (o) => P(t).activate(i.row, P(qe)(o))
        }, [
          C("span", Mc, R(i.ordinal), 1),
          C("span", Sc, [
            C("span", Ec, R(i.parts.identity), 1),
            C("span", Pc, R(i.parts.reference), 1)
          ])
        ], 8, Cc),
        a.value ? (f(), h("span", Ac, R(i.entityLabel), 1)) : z("", !0),
        C("span", Tc, [
          (f(!0), h(ae, null, me(i.parts.metrics.slice(0, 2), (o) => (f(), ne(an, {
            key: o.column.key ?? o.label,
            entry: i,
            column: o.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        C("span", zc, [
          i.parts.state ? (f(), ne(nn, {
            key: 0,
            status: i.parts.state
          }, null, 8, ["status"])) : z("", !0),
          ve(Ln, { entry: i }, null, 8, ["entry"]),
          ve(sn, { entry: i }, null, 8, ["entry"]),
          P(t).pinnable.value ? (f(), ne(Aa, {
            key: 1,
            row: i.row,
            name: i.parts.identity,
            pinned: i.pinned
          }, null, 8, ["row", "name", "pinned"])) : z("", !0)
        ])
      ]))), 128))
    ]));
  }
}), ea = /* @__PURE__ */ de(Lc, [["__scopeId", "data-v-11b9f46c"]]), Rc = { class: "dc-preview" }, Fc = { class: "dc-preview__pager dc-mono" }, Ic = ["disabled"], Nc = { "aria-live": "polite" }, Dc = ["disabled"], Oc = {
  key: 0,
  class: "dc-preview__card"
}, Bc = ["src"], qc = { class: "dc-preview__body" }, Vc = { class: "dc-preview__top" }, Kc = { class: "dc-preview__badges" }, Wc = { class: "dc-preview__entity dc-mono" }, Hc = { class: "dc-preview__marks" }, Uc = { class: "dc-preview__primary" }, jc = { class: "dc-preview__secondary dc-mono" }, Gc = { class: "dc-preview__fields" }, Xc = { class: "dc-preview__key" }, Qc = { class: "dc-preview__value dc-mono" }, Yc = /* @__PURE__ */ ie({
  __name: "PreviewView",
  setup(e) {
    const t = be(), n = kt(), a = W(0);
    ye(n, (l) => {
      a.value > l.length - 1 && (a.value = Math.max(0, l.length - 1));
    });
    const s = p(() => n.value[a.value]), r = p(() => {
      const l = s.value;
      if (!l) return [];
      const c = He(l.columns, "reference"), d = He(l.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: l.parts.reference, column: null }] : [],
        ...l.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...d ? [{ key: d.label ?? "Updated", value: l.parts.updated, column: null }] : []
      ];
    }), i = p(() => {
      if (!n.value.length) return "0 / 0";
      const l = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${l}`;
    }), o = (l) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + l)));
    };
    return (l, c) => (f(), h("div", Rc, [
      C("div", Fc, [
        C("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (d) => o(-1))
        }, " ‹ ", 8, Ic),
        C("span", Nc, R(i.value), 1),
        C("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= P(n).length - 1,
          onClick: c[1] || (c[1] = (d) => o(1))
        }, " › ", 8, Dc)
      ]),
      s.value ? (f(), h("div", Oc, [
        C("div", {
          class: "dc-preview__media",
          style: Ee({ background: s.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          s.value.parts.image ? (f(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: s.value.parts.image,
            alt: ""
          }, null, 8, Bc)) : (f(), h(ae, { key: 1 }, [
            Ue(" preview ")
          ], 64))
        ], 4),
        C("div", qc, [
          C("div", Vc, [
            C("span", Kc, [
              P(t).selectable.value ? (f(), ne(bt, {
                key: 0,
                row: s.value.row,
                selected: s.value.selected,
                name: s.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : z("", !0),
              s.value.parts.state ? (f(), ne(nn, {
                key: 1,
                status: s.value.parts.state
              }, null, 8, ["status"])) : z("", !0),
              C("span", Wc, R(s.value.entityLabel), 1)
            ]),
            C("span", Hc, [
              ve(Ln, { entry: s.value }, null, 8, ["entry"]),
              ve(sn, { entry: s.value }, null, 8, ["entry"]),
              P(t).pinnable.value ? (f(), ne(Aa, {
                key: 0,
                row: s.value.row,
                name: s.value.parts.identity,
                pinned: s.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : z("", !0)
            ])
          ]),
          C("div", null, [
            C("div", Uc, R(s.value.parts.identity), 1),
            C("div", jc, R(s.value.parts.reference), 1)
          ]),
          C("dl", Gc, [
            (f(!0), h(ae, null, me(r.value, (d) => (f(), h("div", {
              key: d.key,
              class: "dc-preview__field"
            }, [
              C("dt", Xc, R(d.key), 1),
              C("dd", Qc, [
                d.column && s.value ? (f(), ne(an, {
                  key: 0,
                  entry: s.value,
                  column: d.column
                }, null, 8, ["entry", "column"])) : (f(), h(ae, { key: 1 }, [
                  Ue(R(d.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          C("button", {
            type: "button",
            class: "dc-preview__open",
            onClick: c[2] || (c[2] = (d) => P(t).activate(s.value.row, P(qe)(d)))
          }, " Open record → ")
        ])
      ])) : z("", !0)
    ]));
  }
}), gr = /* @__PURE__ */ de(Yc, [["__scopeId", "data-v-6be41155"]]);
function Zc() {
  const e = be();
  return p(() => wl(e.schema.value, e.entity.value));
}
const Jc = ["title"], eu = {
  key: 5,
  class: "dc-cell__text"
}, tu = /* @__PURE__ */ ie({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = be(), a = p(() => t.column.kind ?? "text"), s = p(() => Oe(t.column, t.entry.row)), r = p(
      () => a.value === "ordinal" ? t.entry.ordinal : en(t.column, t.entry.row)
    ), i = p(() => s.value), o = p(() => t.column.activate === !0 || !!t.column.click), l = p(() => Yn(t.column)), c = p(() => Vs(t.column, t.entry.row));
    function d(m) {
      if (!o.value) return;
      m.stopPropagation();
      const g = qe(m);
      t.column.click?.(t.entry.row, g), t.column.activate && n.activate(t.entry.row, g);
    }
    return (m, g) => a.value === "component" && e.column.component ? (f(), ne(ua(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: s.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), ne(nn, {
      key: 1,
      status: i.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), ne(zn, {
      key: 2,
      class: "dc-cell__image",
      src: typeof s.value == "string" ? s.value : "",
      style: Ee({ maxHeight: e.column.height }),
      onClick: d
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), ne(an, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : o.value ? (f(), h("button", {
      key: 4,
      type: "button",
      class: ut(["dc-table__open", { "dc-truncate": l.value }]),
      title: c.value,
      onClick: d
    }, R(r.value), 11, Jc)) : (f(), h("span", eu, R(r.value), 1));
  }
}), hs = /* @__PURE__ */ de(tu, [["__scopeId", "data-v-70ba8aa2"]]), nu = ["aria-label"], au = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], su = /* @__PURE__ */ ie({
  __name: "StandingControl",
  props: {
    standing: {},
    mixed: { type: Boolean },
    name: {}
  },
  emits: ["set"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = p(() => [
      { standing: "in", sign: "+", hint: `Narrow the query to ${n.name}` },
      { standing: null, sign: "·", hint: `Let the query say nothing about ${n.name}` },
      { standing: "out", sign: "−", hint: `Leave ${n.name} out of the query` }
    ]), r = (o) => !n.mixed && n.standing === o;
    function i(o, l) {
      o.stopPropagation(), a("set", l);
    }
    return (o, l) => (f(), h("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (f(!0), h(ae, null, me(s.value, (c) => (f(), h("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": r(c.standing) ? "true" : "false",
        "aria-checked": r(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (d) => i(d, c.standing)
      }, R(c.sign), 9, au))), 128))
    ], 8, nu));
  }
}), gs = /* @__PURE__ */ de(su, [["__scopeId", "data-v-adaa8412"]]), ru = {
  key: 0,
  class: "dc-table__none"
}, lu = { class: "dc-table__detail" }, ou = ["data-dc-wrap"], iu = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, cu = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, uu = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], du = ["onClick"], fu = {
  key: 2,
  class: "dc-table__head"
}, pu = ["onClick"], vu = {
  key: 0,
  class: "dc-table__pick"
}, mu = {
  key: 1,
  class: "dc-table__standing"
}, hu = ["data-dc-align", "data-dc-hide", "title"], gu = {
  key: 0,
  class: "dc-table__name"
}, _u = /* @__PURE__ */ ie({
  __name: "TableView",
  setup(e) {
    const t = be(), n = kt(), a = Zc();
    function s(k) {
      const K = Al(k, t.entity.value), I = K ? `Shortcut: ${K}` : void 0;
      return [k.hint, I].filter(Boolean).join(`
`) || void 0;
    }
    const r = p(
      () => a.value.find((k) => k.scope)
    ), i = p(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((k) => k.scope)
    ), o = (k) => _a(k.entity, k.row), l = (k) => Zs(t.query.value.expr, o(k));
    function c(k, K) {
      t.setExpression(ds(t.query.value.expr, o(k), K));
    }
    const d = p(() => {
      const k = n.value.filter((I) => o(I) !== null), K = k.filter((I) => I.selected);
      return K.length ? K : k;
    }), m = p(() => d.value.some((k) => k.selected)), g = p(() => {
      const k = d.value[0];
      return k ? l(k) : null;
    }), y = p(
      () => d.value.some((k) => l(k) !== g.value)
    ), b = p(
      () => m.value ? "the ticked rows" : "every row on this page"
    );
    function x(k) {
      t.setExpression(
        d.value.reduce(
          (K, I) => ds(K, o(I), k),
          t.query.value.expr
        )
      );
    }
    const w = p(
      () => a.value.some((k) => k.kind === "image" || k.height !== void 0)
    );
    function $(k) {
      k && (t.query.value.sort === k ? t.toggleDirection() : t.setSort(k));
    }
    const L = p(() => t.entity.value?.label ?? "The result set"), D = p(() => new Set(t.sorts.value.map((k) => k.key))), M = (k) => k.sort !== void 0 && D.value.has(k.sort), S = (k) => {
      if (M(k))
        return t.query.value.sort !== k.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function q(k) {
      return [
        ns(k),
        k.muted ? "dc-table__muted" : "",
        k.mono ? "dc-mono" : "",
        Yn(k) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function E(k, K) {
      if (!(!Yn(k) || k.activate || k.click))
        return Vs(k, K.row);
    }
    return (k, K) => P(a).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": w.value ? "" : void 0
    }, [
      C("thead", null, [
        C("tr", null, [
          P(t).selectable.value ? (f(), h("th", iu, [
            ve(ur)
          ])) : z("", !0),
          i.value ? (f(), h("th", cu, [
            d.value.length ? (f(), ne(gs, {
              key: 0,
              standing: g.value,
              mixed: y.value,
              name: b.value,
              onSet: x
            }, null, 8, ["standing", "mixed", "name"])) : z("", !0)
          ])) : z("", !0),
          (f(!0), h(ae, null, me(P(a), (I, Z) => (f(), h("th", {
            key: P(es)(I, Z),
            scope: "col",
            class: ut(P(ns)(I)),
            style: Ee({ width: I.width }),
            "data-dc-align": P(ts)(I),
            "data-dc-hide": I.hideBelow,
            "aria-sort": S(I),
            title: s(I)
          }, [
            M(I) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (X) => $(I.sort)
            }, R(I.label), 9, du)) : (f(), h(ae, { key: 1 }, [
              Ue(R(I.label), 1)
            ], 64)),
            I.header ? (f(), h("span", fu, [
              (f(), ne(ua(I.header), {
                column: I,
                entity: P(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : z("", !0)
          ], 14, uu))), 128))
        ])
      ]),
      C("tbody", null, [
        (f(!0), h(ae, null, me(P(n), (I) => (f(), h("tr", {
          key: I.key,
          class: "dc-table__row",
          onClick: (Z) => P(t).activate(I.row, P(qe)(Z))
        }, [
          P(t).selectable.value ? (f(), h("td", vu, [
            ve(bt, {
              row: I.row,
              selected: I.selected,
              name: I.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : z("", !0),
          i.value ? (f(), h("td", mu, [
            o(I) !== null ? (f(), ne(gs, {
              key: 0,
              standing: l(I),
              name: I.parts.identity,
              onSet: (Z) => c(I, Z)
            }, null, 8, ["standing", "name", "onSet"])) : z("", !0)
          ])) : z("", !0),
          (f(!0), h(ae, null, me(P(a), (Z, X) => (f(), h("td", {
            key: P(es)(Z, X),
            class: ut(q(Z)),
            "data-dc-align": P(ts)(Z),
            "data-dc-hide": Z.hideBelow,
            title: E(Z, I)
          }, [
            Z === r.value ? (f(), h("span", gu, [
              ve(hs, {
                column: Z,
                entry: I
              }, null, 8, ["column", "entry"]),
              ve(sn, { entry: I }, null, 8, ["entry"])
            ])) : (f(), ne(hs, {
              key: 1,
              column: Z,
              entry: I
            }, null, 8, ["column", "entry"]))
          ], 10, hu))), 128))
        ], 8, pu))), 128))
      ])
    ], 8, ou)) : (f(), h("p", ru, [
      K[2] || (K[2] = C("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      C("span", lu, [
        Ue(R(L.value) + " has no ", 1),
        K[0] || (K[0] = C("code", null, "columns", -1)),
        K[1] || (K[1] = Ue(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), _r = /* @__PURE__ */ de(_u, [["__scopeId", "data-v-98495b60"]]);
function yu(e) {
  const t = yt([]), n = W(!1), a = yt(null);
  let s = 0;
  const r = (l, c, d, m, g) => ({
    entity: l,
    rows: e.limit.value > 0 ? c.rows.map((y, b) => fr(y, b, l, e.isPinned(y.id))) : [],
    total: c.total,
    count: d ? l.count : String(c.total),
    pinned: wu(m, c, g)
  }), i = () => {
    const l = ++s, c = e.query.value, d = e.schema.value, m = e.entities.value, g = e.limit.value, y = e.within?.value.trim() ?? "", b = pa(c) && !y, x = y ? ga(y, c.expr) : c.expr, w = m.map(($) => ({
      entity: $,
      // Scope the query to this entity, keeping the expression and ordering
      // but dropping facets, which belong to whichever entity is selected.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: $.key, expr: x, facets: Nt($), page: 1 },
        schema: d,
        entity: $,
        /*
         * One row where none are shown, not none: to a source a limit of 0 is
         * no limit, which would fetch every record of every type to draw a
         * count. The one row is still read — it is what says whether the type
         * holds nothing but the record the query named.
         */
        limit: Math.max(g, 1),
        offset: 0
      })
    }));
    if (w.every(({ outcome: $ }) => !($ instanceof Promise))) {
      t.value = w.map(
        ({ entity: $, outcome: L }) => r($, L, b, d, x)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(w.map(({ outcome: $ }) => Promise.resolve($))).then(($) => {
      l === s && (t.value = $.map(
        (L, D) => r(w[D].entity, L, b, d, x)
      ), a.value = null);
    }).catch(($) => {
      l === s && (a.value = $, t.value = []);
    }).finally(() => {
      l === s && (n.value = !1);
    });
  }, o = () => {
    try {
      i();
    } catch (l) {
      a.value = l, t.value = [], n.value = !1;
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
  ), { previews: t, pending: n, error: a, refresh: o };
}
function wu(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const s = n.trim();
  if (!s)
    return !1;
  const r = ya(e, a);
  return !!r && wa(s, r) === s;
}
const ku = ["data-dc-pending", "data-dc-heads-only"], bu = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, $u = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, xu = {
  key: 2,
  class: "dc-types__state"
}, Cu = ["data-dc-empty"], Mu = ["onClick"], Su = { class: "dc-type__name" }, Eu = { class: "dc-type__count dc-mono" }, Pu = { class: "dc-type__sr" }, Au = {
  key: 0,
  class: "dc-type__empty"
}, Tu = ["onClick"], zu = { class: "dc-type__identity" }, Lu = { class: "dc-type__primary dc-truncate" }, Ru = { class: "dc-type__secondary dc-mono dc-truncate" }, Fu = { class: "dc-type__trailing dc-mono" }, Iu = { class: "dc-type__metric-value" }, Nu = { class: "dc-type__metric-label" }, Du = {
  key: 0,
  class: "dc-type__date"
}, Ou = ["onClick"], Bu = /* @__PURE__ */ ie({
  __name: "TypeCardsView",
  setup(e) {
    const t = be(), { previews: n, pending: a, error: s } = yu({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (l) => t.isPinnedId(l)
    }), r = p(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), i = p(() => t.previewsPerType.value <= 0), o = p(
      () => n.value.filter(
        (l) => !l.pinned && (l.total > 0 || !i.value && l.entity.create)
      )
    );
    return (l, c) => (f(), h("div", {
      class: "dc-types",
      "data-dc-pending": P(a) ? "true" : "false",
      "data-dc-heads-only": i.value ? "true" : "false"
    }, [
      xe(l.$slots, "before", {}, void 0, !0),
      P(s) ? (f(), h("p", bu, " Could not load results: " + R(P(s) instanceof Error ? P(s).message : "the data source failed."), 1)) : !o.value.length && P(a) ? (f(), h("p", $u, " Running query… ")) : o.value.length ? z("", !0) : (f(), h("p", xu, R(r.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(ae, null, me(o.value, (d) => (f(), h("section", {
        key: d.entity.key,
        class: "dc-type",
        "data-dc-empty": d.total ? "false" : "true"
      }, [
        C("button", {
          type: "button",
          class: "dc-type__head",
          onClick: (m) => P(t).setEntity(d.entity.key)
        }, [
          C("span", Su, R(d.entity.label), 1),
          C("span", Eu, R(d.count), 1),
          c[0] || (c[0] = C("span", {
            class: "dc-type__go",
            "aria-hidden": "true"
          }, "→", -1)),
          C("span", Pu, "Show only " + R(d.entity.label.toLowerCase()), 1)
        ], 8, Mu),
        d.total ? z("", !0) : (f(), h("p", Au, R(r.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(ae, null, me(d.rows, (m) => (f(), h("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          C("button", {
            type: "button",
            class: "dc-type__open",
            onClick: (g) => P(t).activate(m.row, P(qe)(g))
          }, [
            C("span", zu, [
              C("span", Lu, R(m.parts.identity), 1),
              C("span", Ru, R(m.parts.reference), 1)
            ])
          ], 8, Tu),
          C("span", Fu, [
            (f(!0), h(ae, null, me(m.parts.metrics.slice(0, 1), (g) => (f(), ne(an, {
              key: g.column.key ?? g.label,
              class: "dc-type__metric",
              entry: m,
              column: g.column
            }, {
              default: Ze(() => [
                C("span", Iu, R(g.text), 1),
                C("span", Nu, R(g.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (f(), h("span", Du, R(m.parts.updated), 1)) : z("", !0),
            ve(Ln, { entry: m }, null, 8, ["entry"]),
            ve(sn, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        d.entity.create && !i.value ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (m) => P(t).create(d.entity)
        }, [
          c[1] || (c[1] = C("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Ue(" " + R(d.entity.create), 1)
        ], 8, Ou)) : z("", !0)
      ], 8, Cu))), 128)),
      xe(l.$slots, "after", {}, void 0, !0)
    ], 8, ku));
  }
}), yr = /* @__PURE__ */ de(Bu, [["__scopeId", "data-v-4477c9dc"]]), qu = ["data-dc-pending"], Vu = {
  key: 1,
  class: "dc-results__state",
  role: "alert"
}, Ku = { class: "dc-results__detail" }, Wu = {
  key: 2,
  class: "dc-results__state",
  "aria-live": "polite"
}, Hu = {
  key: 3,
  class: "dc-results__state"
}, Uu = { class: "dc-results__detail" }, ju = /* @__PURE__ */ ie({
  __name: "ResultsArea",
  props: {
    views: {}
  },
  setup(e) {
    const t = e, n = be(), a = Jt(), s = {
      list: ea,
      cards: pr,
      grid: vr,
      images: mr,
      table: _r,
      links: hr,
      preview: gr
    }, r = p(() => va(n.query.value)), i = p(() => da(n.query.value.view, t.views)), o = p(() => s[i.value] ?? ea), l = p(() => n.rows.value.length > 0), c = p(() => n.error.value !== null), d = W(null);
    return ye(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        d.value && (d.value.scrollTop = 0);
      }
    ), (m, g) => (f(), h("div", {
      ref_key: "scroller",
      ref: d,
      class: "dc-results",
      "data-dc-pending": P(n).pending.value ? "true" : "false"
    }, [
      r.value ? (f(), ne(yr, { key: 0 }, mn({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Ze(() => [
            xe(m.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Ze(() => [
            xe(m.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), h("p", Vu, [
        g[1] || (g[1] = C("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        C("span", Ku, R(P(n).error.value instanceof Error ? P(n).error.value.message : "The data source failed."), 1)
      ])) : !l.value && P(n).pending.value ? (f(), h("p", Wu, [...g[2] || (g[2] = [
        C("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : l.value ? (f(), ne(ua(o.value), { key: 4 })) : (f(), h("div", Hu, [
        g[3] || (g[3] = C("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        C("span", Uu, R(P(n).summary.value), 1),
        P(n).isPristine.value ? z("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: g[0] || (g[0] = (y) => P(n).clearFilters())
        }, R(P(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 8, qu));
  }
}), wr = /* @__PURE__ */ de(ju, [["__scopeId", "data-v-cb9aac50"]]), Gu = ["data-dc-theme"], Xu = ["data-dc-width", "data-dc-align"], Qu = { class: "dc-shell__panel" }, Yu = /* @__PURE__ */ ie({
  __name: "DataShell",
  props: /* @__PURE__ */ $n({
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
  emits: /* @__PURE__ */ $n(["activate", "create", "duplicate", "delete", "drill", "query-change", "toggle-pin"], ["update:open", "update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Wt(e, "open"), i = Wt(e, "pinned"), o = Wt(e, "selected"), l = Jt(), c = Ft(zs, null), d = a.route || c ? null : dl(), m = a.route ?? c ?? d;
    Be(() => d?.dispose?.());
    const g = p(() => Gl({ seed: a.schema.key })), y = p(() => a.source ?? g.value), b = lo({
      schema: () => a.schema,
      adapter: m,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), x = p(() => a.within?.trim() ?? ""), w = co({
      query: b.query,
      entity: b.entity,
      setExpression: b.setExpression
    }), $ = oo({
      source: y,
      query: w.live,
      schema: p(() => a.schema),
      entity: b.entity,
      limit: p(() => a.limit),
      within: x
    });
    ye(b.query, (T) => s("query-change", T)), ye(
      [$.pageCount, $.pending, b.query, w.drafting],
      () => {
        if ($.pending.value || w.drafting.value) return;
        const T = $.pageCount.value;
        b.query.value.page > T && b.setPage(T, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const L = An() ?? "dc-query-panel", D = W(null);
    function M() {
      r.value && (r.value = !1, It(() => {
        D.value?.$el?.querySelector(".dc-header__toggle")?.focus();
      }));
    }
    const S = p(() => new Set(i.value));
    function q(T) {
      const H = new Set(S.value);
      H.has(T.id) ? H.delete(T.id) : H.add(T.id), i.value = [...H], s("toggle-pin", T);
    }
    const E = p(() => {
      if (a.selectable === !0) return !0;
      const T = b.entity.value;
      return !!(T?.duplicate || T?.delete);
    }), k = p(() => new Set(o.value));
    function K(T) {
      const H = new Set(k.value);
      H.has(T.id) ? H.delete(T.id) : H.add(T.id), o.value = [...H];
    }
    function I(T) {
      const H = new Set(k.value);
      for (const te of $.rows.value)
        T ? H.add(te.id) : H.delete(te.id);
      o.value = [...H];
    }
    function Z() {
      o.value.length && (o.value = []);
    }
    const X = p(() => ({
      ids: [...o.value],
      rows: $.rows.value.filter((T) => k.value.has(T.id)),
      entity: b.entity.value
    }));
    ye(() => b.query.value.entity, Z);
    function ke(T, H, te = {}) {
      const ce = Xl(a.schema, b.query.value, T, te);
      te.exclude ? b.narrow(ce, H?.key ?? b.query.value.entity) : w.release(() => b.narrow(ce, H?.key ?? null, H ? void 0 : "cards")), s("drill", T, H, te);
    }
    const se = Ql({
      ...b,
      draft: w.text,
      liveQuery: w.live,
      drafting: w.drafting,
      commitDraft: w.commit,
      abandonDraft: w.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (T, H) => {
        w.drafting.value ? w.setPage(T) : b.setPage(T, H);
      },
      schema: p(() => a.schema),
      entities: p(() => a.schema.entities),
      rows: $.rows,
      total: $.total,
      limit: p(() => a.limit),
      offset: $.offset,
      pageCount: $.pageCount,
      pending: $.pending,
      counting: $.counting,
      error: $.error,
      source: y,
      previewsPerType: p(() => a.previewsPerType),
      within: x,
      pinnable: p(() => a.pinnable === !0),
      isPinned: (T) => S.value.has(T.id),
      isPinnedId: (T) => S.value.has(T),
      togglePin: q,
      selectable: E,
      selection: X,
      isSelected: (T) => k.value.has(T.id),
      toggleSelect: K,
      selectPage: I,
      clearSelection: Z,
      narrowsOnPress: p(() => a.rowPress === "narrow"),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (T, H = {}) => {
        if (a.rowPress === "narrow" && ya(a.schema, T)) {
          ke(T, null, H);
          return;
        }
        s("activate", T);
      },
      create: (T) => s("create", T),
      duplicate: () => s("duplicate", X.value),
      delete: () => s("delete", X.value),
      drill: ke
    }), N = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: b.query,
      openPanel: () => {
        r.value = !0;
      },
      closePanel: M
    }), (T, H) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Ee(N.value)
    }, [
      C("div", {
        class: "dc-shell__head",
        "data-dc-width": e.matchWidth,
        "data-dc-align": e.matchWidth === "shrink" ? e.headAlign : void 0
      }, [
        ve(or, {
          ref_key: "headerRef",
          ref: D,
          expanded: r.value,
          "panel-id": P(L),
          views: e.views,
          "pages-note": e.pagesNote,
          onToggle: H[0] || (H[0] = (te) => r.value = !r.value)
        }, mn({ _: 2 }, [
          l.actions ? {
            name: "actions",
            fn: Ze(() => [
              xe(T.$slots, "actions", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["expanded", "panel-id", "views", "pages-note"]),
        r.value ? (f(), h(ae, { key: 0 }, [
          C("div", {
            class: "dc-shell__scrim",
            onClick: M
          }),
          C("div", Qu, [
            ve(cr, {
              "panel-id": P(L),
              onClose: M
            }, mn({ _: 2 }, [
              l["panel-section"] ? {
                name: "panel-section",
                fn: Ze(() => [
                  xe(T.$slots, "panel-section", {}, void 0, !0)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["panel-id"])
          ])
        ], 64)) : z("", !0)
      ], 8, Xu),
      ve(dr, { views: e.views }, null, 8, ["views"]),
      xe(T.$slots, "results", {
        rows: P(se).rows.value,
        total: P(se).total.value,
        offset: P(se).offset.value,
        pageCount: P(se).pageCount.value,
        query: P(se).liveQuery.value,
        pending: P(se).pending.value
      }, () => [
        ve(wr, { views: e.views }, mn({ _: 2 }, [
          l["cards-before"] ? {
            name: "cards-before",
            fn: Ze(() => [
              xe(T.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          l["cards-after"] ? {
            name: "cards-after",
            fn: Ze(() => [
              xe(T.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views"])
      ], !0)
    ], 12, Gu));
  }
}), Zu = /* @__PURE__ */ de(Yu, [["__scopeId", "data-v-1fb1da57"]]), Ju = ["data-dc-muted", "data-dc-collapsed"], ed = ["data-dc-collapsible"], td = ["aria-expanded", "aria-controls"], nd = { class: "dc-shell-card__sr" }, ad = { class: "dc-shell-card__title" }, sd = {
  key: 0,
  class: "dc-shell-card__count dc-mono"
}, rd = {
  key: 1,
  class: "dc-shell-card__aside"
}, ld = ["data-dc-flush"], od = /* @__PURE__ */ ie({
  __name: "ShellCard",
  props: {
    title: {},
    count: {},
    span: {},
    flush: { type: Boolean },
    muted: { type: Boolean },
    collapsible: { type: Boolean },
    collapsed: { type: Boolean, default: void 0 },
    defaultCollapsed: { type: Boolean }
  },
  emits: ["update:collapsed"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = W(n.defaultCollapsed === !0), r = p(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), i = Jt();
    function o(E) {
      return l(E?.() ?? []);
    }
    function l(E) {
      return E.some((k) => k.type === il ? !1 : k.type === cl ? String(k.children ?? "").trim().length > 0 : k.type === ae ? l(k.children ?? []) : !0);
    }
    const c = p(() => !!n.title || d.value || o(i.head)), d = p(() => o(i.aside)), m = p(() => o(i.default)), g = p(() => o(i.foot)), y = p(() => n.collapsible === !0 && c.value), b = p(() => y.value && (n.collapsed ?? s.value));
    function x() {
      const E = !b.value;
      s.value = E, a("update:collapsed", E);
    }
    const w = An() ?? "dc-shell-card", $ = `${w}-body`, L = `${w}-foot`, D = p(
      () => [m.value ? $ : "", g.value ? L : ""].filter(Boolean).join(" ") || void 0
    ), M = [
      "a[href]",
      "button",
      "input",
      "select",
      "textarea",
      "label",
      "summary",
      '[contenteditable]:not([contenteditable="false"])',
      '[role="button"]',
      '[role="link"]',
      '[role="checkbox"]',
      '[role="switch"]',
      '[role="tab"]',
      '[role="menuitem"]'
    ].join(", "), S = W(null);
    function q(E) {
      if (!y.value) return;
      const k = E.target?.closest(M);
      k && S.value?.contains(k) || typeof window < "u" && window.getSelection()?.toString() || x();
    }
    return (E, k) => (f(), h("section", {
      class: "dc-shell-card",
      style: Ee(r.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": b.value ? "true" : "false"
    }, [
      c.value ? (f(), h("header", {
        key: 0,
        ref_key: "head",
        ref: S,
        class: "dc-shell-card__head",
        "data-dc-collapsible": y.value ? "true" : "false",
        onClick: q
      }, [
        y.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": b.value ? "false" : "true",
          "aria-controls": D.value,
          onClick: x
        }, [
          k[0] || (k[0] = C("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            C("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          C("span", nd, R(e.title || "Card"), 1)
        ], 8, td)) : z("", !0),
        xe(E.$slots, "head", {}, () => [
          C("h2", ad, R(e.title), 1),
          e.count !== void 0 ? (f(), h("span", sd, R(e.count), 1)) : z("", !0)
        ], !0),
        d.value ? (f(), h("span", rd, [
          xe(E.$slots, "aside", {}, void 0, !0)
        ])) : z("", !0)
      ], 8, ed)) : z("", !0),
      m.value ? dt((f(), h("div", {
        key: 1,
        id: $,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        xe(E.$slots, "default", {}, void 0, !0)
      ], 8, ld)), [
        [xn, !b.value]
      ]) : z("", !0),
      g.value ? dt((f(), h("footer", {
        key: 2,
        id: L,
        class: "dc-shell-card__foot"
      }, [
        xe(E.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [xn, !b.value]
      ]) : z("", !0)
    ], 12, Ju));
  }
}), np = /* @__PURE__ */ de(od, [["__scopeId", "data-v-1caf8572"]]), id = ["aria-label"], cd = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], ud = /* @__PURE__ */ ie({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = W([]);
    function r(i, o) {
      const l = n.options.length;
      let c = null;
      if (i.key === "ArrowRight" || i.key === "ArrowDown" ? c = (o + 1) % l : i.key === "ArrowLeft" || i.key === "ArrowUp" ? c = (o - 1 + l) % l : i.key === "Home" ? c = 0 : i.key === "End" && (c = l - 1), c === null) return;
      i.preventDefault();
      const d = n.options[c];
      d && (a("update:modelValue", d.key), s.value[c]?.focus());
    }
    return (i, o) => (f(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), h(ae, null, me(e.options, (l, c) => (f(), h("button", {
        key: l.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: s,
        type: "button",
        role: "radio",
        class: ut(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": l.key === e.modelValue,
        "data-dc-active": l.key === e.modelValue ? "true" : "false",
        tabindex: l.key === e.modelValue ? 0 : -1,
        onClick: (d) => a("update:modelValue", l.key),
        onKeydown: (d) => r(d, c)
      }, R(l.label), 43, cd))), 128))
    ], 8, id));
  }
}), dd = /* @__PURE__ */ de(ud, [["__scopeId", "data-v-63fb5482"]]), fd = ["data-dc-theme", "aria-label"], pd = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], vd = /* @__PURE__ */ ie({
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
    const n = e, a = p(() => {
      if (!(!n.accent && !n.tokens))
        return { ...n.tokens, ...n.accent ? { "--dc-accent": n.accent } : {} };
    }), s = t, r = W(null), i = W([]), o = W(null), l = W(null), c = W(!1), d = p(
      () => n.menus.flatMap((M, S) => Ht(M) ? [S] : [])
    );
    function m(M, S) {
      const q = i.value[M]?.getBoundingClientRect(), E = n.menus[M];
      !q || !E || !Ht(E) || (l.value = { x: q.left, y: q.bottom + 2, mirrorX: q.right }, o.value = M, c.value = S);
    }
    function g(M) {
      const S = o.value;
      o.value = null, l.value = null, M && S !== null && i.value[S]?.focus();
    }
    function y(M) {
      o.value === M ? g(!0) : m(M, !1);
    }
    function b(M) {
      o.value === null || o.value === M || m(M, !1);
    }
    function x(M, S) {
      const q = d.value;
      if (q.length === 0) return null;
      if (M === null) return S === 1 ? q[0] ?? null : q[q.length - 1] ?? null;
      const E = q.indexOf(M);
      return E === -1 ? q[0] ?? null : q[(E + S + q.length) % q.length] ?? null;
    }
    function w(M) {
      const S = M.key;
      if (S === "Escape") {
        if (o.value === null) return;
        M.preventDefault(), g(!0);
        return;
      }
      if (S === "ArrowDown" && o.value === null) {
        const k = $();
        if (k === null) return;
        M.preventDefault(), m(k, !0);
        return;
      }
      if (S !== "ArrowLeft" && S !== "ArrowRight") return;
      const q = o.value ?? $(), E = x(q, S === "ArrowRight" ? 1 : -1);
      E !== null && (M.preventDefault(), o.value !== null ? m(E, !0) : i.value[E]?.focus());
    }
    function $() {
      const M = i.value.findIndex((S) => S === document.activeElement);
      return M === -1 ? d.value[0] ?? null : M;
    }
    function L(M) {
      const S = M.target;
      !S || r.value?.contains(S) || g(!1);
    }
    ye(o, (M) => {
      M !== null ? window.addEventListener("pointerdown", L, !0) : window.removeEventListener("pointerdown", L, !0);
    }), Be(() => window.removeEventListener("pointerdown", L, !0));
    function D(M) {
      g(!0), M.action?.(), s("choose", M);
    }
    return (M, S) => (f(), h("div", {
      ref_key: "bar",
      ref: r,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Ee(a.value),
      onKeydown: w
    }, [
      (f(!0), h(ae, null, me(e.menus, (q, E) => (f(), h("button", {
        key: q.id ?? q.label ?? E,
        ref_for: !0,
        ref: (k) => {
          k && (i.value[E] = k);
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
        onClick: (k) => y(E),
        onMouseenter: (k) => b(E)
      }, R(q.label), 41, pd))), 128)),
      o.value !== null && l.value ? (f(), ne(Pa, {
        key: o.value,
        items: e.menus[o.value]?.items ?? [],
        at: l.value,
        label: e.menus[o.value]?.label,
        autofocus: c.value,
        onChoose: D,
        onDismiss: S[0] || (S[0] = (q) => g(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
    ], 44, fd));
  }
}), ap = /* @__PURE__ */ de(vd, [["__scopeId", "data-v-93dbd2e4"]]), md = ["aria-label", "aria-expanded", "disabled"], hd = { "aria-hidden": "true" }, gd = /* @__PURE__ */ ie({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = W(null), s = W(null), r = W(null), i = W(!1), o = p(() => r.value !== null);
    function l(b) {
      const x = a.value?.getBoundingClientRect();
      x && (r.value = { x: x.left, y: x.bottom + 4, mirrorX: x.right }, i.value = b);
    }
    function c(b) {
      r.value = null, b && a.value?.focus();
    }
    function d() {
      o.value ? c(!0) : l(!1);
    }
    function m(b) {
      b.key !== "ArrowDown" || o.value || (b.preventDefault(), l(!0));
    }
    function g(b) {
      const x = b.target;
      x && (a.value?.contains(x) || s.value?.root?.contains(x) || c(!1));
    }
    ye(o, (b) => {
      b ? window.addEventListener("pointerdown", g, !0) : window.removeEventListener("pointerdown", g, !0);
    }), Be(() => window.removeEventListener("pointerdown", g, !0));
    function y(b) {
      c(!0), b.action?.(), n("choose", b);
    }
    return (b, x) => (f(), h(ae, null, [
      C("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": o.value,
        disabled: e.items.length === 0,
        onClick: d,
        onKeydown: m
      }, [
        C("span", hd, R(e.glyph), 1)
      ], 40, md),
      r.value ? (f(), ne(Pa, {
        key: 0,
        ref_key: "menu",
        ref: s,
        items: e.items,
        at: r.value,
        label: e.label,
        autofocus: i.value,
        onChoose: y,
        onDismiss: x[0] || (x[0] = (w) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : z("", !0)
    ], 64));
  }
}), Ta = /* @__PURE__ */ de(gd, [["__scopeId", "data-v-48f5ada5"]]), Ot = (e) => e.kind === "split", Y = (e) => e.kind === "group", oe = (e) => e.kind === "float", ht = { x: 16, y: 16, w: 360, h: 260 }, Sn = 28, kr = 120, ta = 220, br = 38, Mt = 6;
function rn(e, t) {
  let n = !1;
  const a = e.frames.map((s, r) => {
    const i = t(s.node, r);
    return i === s.node ? s : (n = !0, { ...s, node: i });
  });
  return n ? { ...e, frames: a } : e;
}
function Je(e) {
  return { kind: "group", panels: [e] };
}
function sp(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const _e = (e) => typeof e == "string", za = (e) => _e(e) ? Je(e) : e, ln = (e) => _e(e) ? [e] : rt(e), _s = (e) => e.panels.filter(_e), _d = (e) => e.panels.filter((t) => !_e(t)), De = (e, t) => e.panels.includes(t);
function on(e, t, n) {
  let a = !1;
  const s = e.panels.map((r) => {
    if (_e(r) || !fe(r, t)) return r;
    const i = n(r);
    return i !== r && (a = !0), i;
  });
  return a ? { ...e, panels: s } : e;
}
function Rn(e, t) {
  return { node: e, rect: { ...ht, ...t } };
}
function La(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function Ra(e, t) {
  const n = { ...ht, ...t };
  return La(
    e.map(
      (a, s) => Rn(a, {
        ...n,
        x: n.x + s * Sn,
        y: n.y + s * Sn
      })
    )
  );
}
function Fa(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const Ia = (e, t, n) => Fa("row", e, t, n), rp = (e, t, n) => Fa("column", e, t, n);
function $e(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const wt = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, lp = (e) => ({ ...e, headless: !0 }), op = (e) => ({ ...e, fixedView: !0 }), yd = (e) => e === "left" || e === "right" ? "row" : "column";
function rt(e) {
  return Y(e) ? e.panels.flatMap(ln) : oe(e) ? e.frames.flatMap((t) => rt(t.node)) : e.children.flatMap(rt);
}
function fe(e, t) {
  return Y(e) ? e.panels.some((n) => _e(n) ? n === t : fe(n, t)) : oe(e) ? e.frames.some((n) => fe(n.node, t)) : e.children.some((n) => fe(n, t));
}
const $r = (e) => rt(e).length === 0, na = (e) => !Y(e) && wt(e), aa = (e) => $r(e) && !na(e);
function Fn(e) {
  return Ot(e) ? e.children.map((t, n) => ({ node: t, index: n })) : oe(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => _e(t) ? [] : [{ node: t, index: n }]);
}
const Na = (e) => Fn(e).map((t) => t.node);
function $t(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => _e(a) ? a === t : fe(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function xr(e) {
  const t = e.panels[$t(e)];
  return t !== void 0 && _e(t) ? t : "";
}
function Le(e) {
  if (_e(e)) return e;
  if (Y(e)) {
    const n = e.panels[$t(e)];
    return n === void 0 ? "" : Le(n);
  }
  if (oe(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Le(n.node) : "";
  }
  const t = e.children[0];
  return t ? Le(t) : "";
}
function Tt(e, t) {
  if (Y(e) && De(e, t)) return e;
  for (const n of Na(e)) {
    const a = Tt(n, t);
    if (a) return a;
  }
  return null;
}
function wd(e) {
  const t = Na(e).flatMap(wd);
  return Y(e) ? [e, ...t] : t;
}
function Se(e, t) {
  if (Y(e)) {
    for (const n of _d(e)) {
      const a = Se(n, t);
      if (a) return a;
    }
    return null;
  }
  if (oe(e)) {
    for (const n of e.frames)
      if (fe(n.node, t))
        return Se(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = Se(n, t);
    if (a) return a;
  }
  return null;
}
function Kn(e, t, n = kr) {
  const a = (o, l) => l > 0 ? Math.max(Math.min(o, l), Math.min(n, l)) : Math.max(o, n), s = a(e.w, t.w), r = a(e.h, t.h), i = (o, l, c) => Math.min(Math.max(o, 0), Math.max(c - l, 0));
  return {
    x: Math.round(i(e.x, s, t.w)),
    y: Math.round(i(e.y, r, t.h)),
    w: Math.round(s),
    h: Math.round(r)
  };
}
function ys(e, t, n, a, s = kr) {
  let { x: r, y: i, w: o, h: l } = e;
  return t.includes("e") && (o = e.w + n), t.includes("w") && (o = e.w - n, r = e.x + n), t.includes("s") && (l = e.h + a), t.includes("n") && (l = e.h - a, i = e.y + a), o < s && (t.includes("w") && (r = e.x + e.w - s), o = s), l < s && (t.includes("n") && (i = e.y + e.h - s), l = s), { x: r, y: i, w: o, h: l };
}
const Cr = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function zt(e, t, n) {
  if (Y(e)) return on(e, t, (r) => zt(r, t, n));
  if (oe(e)) {
    let r = !1;
    const i = e.frames.map((o) => {
      if (!fe(o.node, t)) return o;
      if (Se(o.node, t)) {
        const c = zt(o.node, t, n);
        return c === o.node ? o : (r = !0, { ...o, node: c });
      }
      const l = n(o);
      return l === o ? o : (r = !0, l);
    });
    return r ? { ...e, frames: i } : e;
  }
  if (!fe(e, t)) return e;
  let a = !1;
  const s = e.children.map((r) => {
    const i = zt(r, t, n);
    return i !== r && (a = !0), i;
  });
  return a ? { ...e, children: s } : e;
}
function kd(e, t, n) {
  return zt(e, t, (a) => Cr(a.rect, n) ? a : { ...a, rect: n });
}
const ot = (e) => e.maximized === !0, Mr = (e) => (t) => {
  if (ot(t) === e) return t;
  if (e) {
    const { minimized: s, ...r } = t;
    return { ...r, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function bd(e, t, n = !0) {
  return zt(e, t, Mr(n));
}
function ip(e, t) {
  const n = Se(e, t);
  return n ? bd(e, t, !ot(n)) : e;
}
const mt = (e) => e.minimized === !0, Sr = (e) => (t) => {
  if (mt(t) === e) return t;
  if (e) {
    const { maximized: s, ...r } = t;
    return { ...r, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function $d(e, t, n = !0) {
  return zt(e, t, Sr(n));
}
function cp(e, t) {
  const n = Se(e, t);
  return n ? $d(e, t, !mt(n)) : e;
}
function vt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = ct(e, t.slice(0, -1));
  return !a || !oe(a) ? null : a.frames[n] ?? null;
}
function sa(e, t) {
  if (oe(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!fe(a.node, t)) continue;
      const s = sa(a.node, t);
      return s ? [n, ...s] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of Fn(e)) {
    if (!fe(n, t)) continue;
    const s = sa(n, t);
    return s ? [a, ...s] : null;
  }
  return null;
}
function Da(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const s = t.slice(0, -1), r = ct(e, s);
  if (!r || !oe(r)) return e;
  const i = r.frames[a];
  if (!i) return e;
  const o = n(i);
  if (o === i) return e;
  const l = [...r.frames];
  return l[a] = o, _t(e, s, { ...r, frames: l });
}
function ws(e, t, n) {
  return Da(
    e,
    t,
    (a) => Cr(a.rect, n) ? a : { ...a, rect: n }
  );
}
function xd(e, t, n = !0) {
  return Da(e, t, Mr(n));
}
function Cd(e, t, n = !0) {
  return Da(e, t, Sr(n));
}
function Ut(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (oe(e)) {
    const i = e.frames[n];
    if (!i) return e;
    const o = Ut(i.node, a), l = o === i.node ? i : { ...i, node: o };
    if (n === e.frames.length - 1 && l === i) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(l), { ...e, frames: c };
  }
  const s = ct(e, [n]);
  if (!s) return e;
  const r = Ut(s, a);
  return r === s ? e : _t(e, [n], r);
}
function Md(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((s, r) => {
    a && (oe(a) && (n[r] = a.frames.length - 1), a = ct(a, [s]));
  }), n;
}
function _n(e, t, n, a) {
  if (Y(e)) return on(e, n, (i) => _n(i, t, n, a));
  if (oe(e)) {
    const i = e.frames.findIndex((l) => fe(l.node, n)), o = e.frames[i];
    if (!o) return e;
    if (Se(o.node, n)) {
      const l = _n(o.node, t, n, a);
      if (l === o.node) return e;
      const c = [...e.frames];
      return c[i] = { ...o, node: l }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, Rn(Je(t), a)] };
  }
  if (!fe(e, n)) return e;
  let s = !1;
  const r = e.children.map((i) => {
    const o = _n(i, t, n, a);
    return o !== i && (s = !0), o;
  });
  return s ? { ...e, children: r } : e;
}
function ks(e, t, n, a) {
  if (t === n || !fe(e, t) || !fe(e, n) || !Se(e, n)) return e;
  const s = gt(e, t);
  if (!s) return e;
  const r = _n(s, t, n, a);
  return r === s ? e : Ce(r);
}
function Sd(e, t, n) {
  return oe(e) ? { ...e, frames: [...e.frames, Rn(Je(t), n)] } : Y(e) ? Pr(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, Je(t)],
    sizes: [...st(e), 1],
    ...$e(e)
  };
}
function Er(e, t, n, a) {
  const s = n[0];
  if (s === void 0) return Sd(e, t, a);
  const r = n.slice(1), i = (d, m) => m === s ? Er(d, t, r, a) : gt(d, t);
  if (oe(e)) {
    const d = e.frames.flatMap((m, g) => {
      const y = i(m.node, g);
      return y ? [y === m.node ? m : { ...m, node: y }] : [];
    });
    return { ...e, frames: d };
  }
  if (Y(e)) {
    const d = $t(e), m = [];
    e.panels.forEach((b, x) => {
      if (_e(b)) {
        b !== t && m.push(b);
        return;
      }
      const w = i(b, x);
      w && m.push(w);
    });
    const y = e.active && m.some((b) => ln(b).includes(e.active)) ? e.active : Le(m[d] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...y ? { active: y } : {},
      ...$e(e)
    };
  }
  const o = st(e), l = [], c = [];
  return e.children.forEach((d, m) => {
    const g = i(d, m);
    g && (l.push(g), c.push(o[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: l, sizes: c, ...$e(e) };
}
function bs(e, t, n, a) {
  const s = ct(e, n);
  return !s || !$r(s) || !fe(e, t) ? e : Ce(Er(e, t, n, a));
}
function Wn(e, t) {
  if (Y(e)) return on(e, t, (s) => Wn(s, t));
  if (oe(e)) {
    const s = e.frames.findIndex((c) => fe(c.node, t)), r = e.frames[s];
    if (!r) return e;
    const i = Wn(r.node, t), o = i === r.node ? r : { ...r, node: i };
    if (s === e.frames.length - 1 && o === r) return e;
    const l = [...e.frames];
    return l.splice(s, 1), l.push(o), { ...e, frames: l };
  }
  if (!fe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = Wn(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function Oa(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((r) => Number.isFinite(r) && r > 0 ? r : 0), s = a.reduce((r, i) => r + i, 0);
  return s <= 0 ? n() : a.map((r) => r / s);
}
const st = (e) => Oa(e.children.length, e.sizes), je = (e) => {
  const t = Y(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function Ce(e) {
  if (Y(e)) return Ed(e);
  if (oe(e)) {
    const o = e.frames.flatMap((l) => {
      const c = Ce(l.node);
      return aa(c) ? [] : [c === l.node ? l : { ...l, node: c }];
    });
    return o.length === e.frames.length && o.every((l, c) => l === e.frames[c]) ? e : { ...e, frames: o };
  }
  if (e.children.length === 0) return e;
  const t = st(e), n = je(e), a = [], s = [], r = [];
  e.children.forEach((o, l) => {
    const c = Ce(o), d = t[l] ?? 0;
    if (aa(c)) return;
    if (!n && Ot(c) && c.direction === e.direction && !je(c) && !wt(c)) {
      const g = st(c);
      c.children.forEach((y, b) => {
        a.push(y), s.push(d * (g[b] ?? 0));
      });
      return;
    }
    a.push(c), s.push(d);
    const m = n?.[l];
    m && r.push(m);
  });
  const i = a[0];
  return a.length === 1 && i && !wt(e) ? i : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: Oa(a.length, s),
    ...$e(e),
    ...r.length === a.length && r.length > 0 ? { places: r } : {}
  };
}
function Ed(e) {
  if (e.panels.every(_e)) return e;
  const t = Le(e), n = je(e), a = [], s = [];
  e.panels.forEach((o, l) => {
    const c = n?.[l];
    if (_e(o)) {
      a.push(o), c && s.push(c);
      return;
    }
    const d = Ce(o);
    if (!aa(d)) {
      if (Y(d) && !wt(d) && !je(d)) {
        a.push(...d.panels);
        return;
      }
      a.push(d), c && s.push(c);
    }
  });
  const r = a[0];
  if (a.length === 1 && r !== void 0 && !_e(r) && !wt(e))
    return r;
  if (a.length === e.panels.length && a.every((o, l) => o === e.panels[l]))
    return e;
  const i = t && a.some((o) => ln(o).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...i ? { active: i } : {},
    ...$e(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function gt(e, t) {
  if (oe(e)) {
    const i = e.frames.flatMap((o) => {
      const l = gt(o.node, t);
      return l ? [l === o.node ? o : { ...o, node: l }] : [];
    });
    return i.length === 0 && !na(e) ? null : { ...e, frames: i };
  }
  if (Y(e)) {
    if (!fe(e, t)) return e;
    const i = $t(e), o = [];
    for (const d of e.panels) {
      if (_e(d)) {
        d !== t && o.push(d);
        continue;
      }
      const m = gt(d, t);
      m && o.push(m);
    }
    if (o.length === 0) return null;
    const c = e.active && o.some((d) => ln(d).includes(e.active)) ? e.active : Le(o[i] ?? o[o.length - 1]);
    return c ? { kind: "group", panels: o, active: c, ...$e(e) } : { kind: "group", panels: o, ...$e(e) };
  }
  const n = st(e), a = [], s = [];
  if (e.children.forEach((i, o) => {
    const l = gt(i, t);
    l && (a.push(l), s.push(n[o] ?? 0));
  }), a.length === 0)
    return na(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...$e(e) } : null;
  const r = a[0];
  return a.length === 1 && r && !wt(e) ? r : Ce({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: s,
    ...$e(e)
  });
}
function Pr(e, t, n) {
  const a = e.panels.filter((r) => r !== t), s = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(s, 0, t), { kind: "group", panels: a, active: t, ...$e(e) };
}
function Kt(e, t, n, a, s) {
  const r = (y) => rn(
    y,
    (b) => fe(b, n) ? Kt(b, t, n, a, s) : b
  );
  if (a === "float") return e;
  const i = (y) => on(y, n, (b) => Kt(b, t, n, a, s));
  if (a === "center")
    return Y(e) ? De(e, n) ? Pr(e, t, s) : i(e) : oe(e) ? r(e) : {
      ...e,
      children: e.children.map(
        (y) => fe(y, n) ? Kt(y, t, n, a, s) : y
      )
    };
  const o = yd(a), l = a === "left" || a === "top", c = (y) => ({
    kind: "split",
    direction: o,
    children: l ? [Je(t), y] : [y, Je(t)],
    sizes: [0.5, 0.5]
  });
  if (Y(e)) return De(e, n) ? c(e) : i(e);
  if (oe(e)) return r(e);
  const d = st(e), m = e.children.findIndex(
    (y) => Y(y) && De(y, n)
  );
  if (m >= 0 && e.direction === o) {
    const y = (d[m] ?? 0) / 2, b = [...e.children], x = [...d];
    return b.splice(l ? m : m + 1, 0, Je(t)), x.splice(m, 1, y, y), {
      kind: "split",
      direction: o,
      children: b,
      sizes: x,
      ...$e(e)
    };
  }
  const g = e.children.map((y) => fe(y, n) ? Y(y) && De(y, n) ? c(y) : Kt(y, t, n, a) : y);
  return {
    kind: "split",
    direction: e.direction,
    children: g,
    sizes: d,
    ...$e(e)
  };
}
function Lt(e, t) {
  if (Y(e)) {
    if (De(e, t))
      return xr(e) === t ? e : { ...e, active: t };
    const s = e.panels.findIndex((l) => !_e(l) && fe(l, t)), r = e.panels[s];
    if (r === void 0 || _e(r)) return e;
    const i = Lt(r, t);
    if (i === r && e.active === t) return e;
    const o = [...e.panels];
    return o[s] = i, { ...e, panels: o, active: t };
  }
  if (!fe(e, t)) return e;
  if (oe(e)) return rn(e, (s) => Lt(s, t));
  let n = !1;
  const a = e.children.map((s) => {
    const r = Lt(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function jt(e, t, n) {
  if (Y(e)) {
    if (!De(e, t)) return on(e, t, (c) => jt(c, t, n));
    const a = e.panels.indexOf(t), s = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === s) return e;
    const r = [...e.panels];
    r.splice(a, 1), r.splice(s, 0, t);
    const i = je(e), o = i ? [...i] : void 0;
    o && o.splice(s, 0, ...o.splice(a, 1));
    const l = Le(e);
    return {
      kind: "group",
      panels: r,
      ...l ? { active: l } : {},
      ...$e(e),
      ...o ? { places: o } : {}
    };
  }
  return fe(e, t) ? oe(e) ? rn(e, (a) => jt(a, t, n)) : { ...e, children: e.children.map((a) => jt(a, t, n)) } : e;
}
function yn(e, t, n) {
  if (t === n) return e;
  if (Y(e)) {
    if (!fe(e, t) && !fe(e, n)) return e;
    const a = (r) => r === t ? n : r === n ? t : r, s = e.panels.map((r) => _e(r) ? a(r) : yn(r, t, n));
    return { ...e, panels: s, ...e.active ? { active: a(e.active) } : {} };
  }
  return oe(e) ? rn(e, (a) => yn(a, t, n)) : { ...e, children: e.children.map((a) => yn(a, t, n)) };
}
function pn(e, t, n, a, s) {
  if (a === "float" || !fe(e, t) || !fe(e, n)) return e;
  const r = Tt(e, t);
  if (a === "center" && r && De(r, n)) {
    if (s === void 0) return e;
    const o = r.panels.indexOf(t), l = s > o ? s - 1 : s;
    return l === o ? e : Lt(jt(e, t, l), t);
  }
  if (t === n) return e;
  const i = gt(e, t);
  return i ? Ce(Kt(i, t, n, a, s)) : e;
}
function Ar(e, t, n) {
  if (Y(e)) {
    const s = e.panels[t];
    if (s === void 0 || _e(s)) return e;
    const r = [...e.panels];
    return r[t] = n, { ...e, panels: r };
  }
  if (oe(e)) {
    const s = e.frames[t];
    if (!s) return e;
    const r = [...e.frames];
    return r[t] = { ...s, node: n }, { ...e, frames: r };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function cn(e, t, n) {
  const a = Fn(e);
  if (!Y(e) && a.some(({ node: s }) => Y(s) && De(s, t))) {
    const s = n(e);
    return s === e ? null : s;
  }
  for (const { node: s, index: r } of a) {
    if (!fe(s, t)) continue;
    const i = cn(s, t, n);
    return i ? Ar(e, r, i) : null;
  }
  return null;
}
function up(e, t, n) {
  const a = cn(
    e,
    t,
    (s) => Ot(s) && s.direction !== n ? { ...s, direction: n } : s
  );
  return a ? Ce(a) : e;
}
function Tr(e) {
  return oe(e) ? [e] : je(e) || wt(e) ? [e] : Y(e) ? [...e.panels] : e.children.flatMap(Tr);
}
function zr(e, t) {
  if (Y(e)) return e;
  const n = Na(e).map(Tr), a = n.flat(), s = t && a.some((i) => ln(i).includes(t)) ? t : void 0, r = Pd(e, n);
  return Ce({
    kind: "group",
    panels: a,
    ...s ? { active: s } : {},
    ...$e(e),
    ...r ? { places: r } : {}
  });
}
function Pd(e, t) {
  const n = oe(e) ? e.frames.map(({ node: a, ...s }) => s) : je(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function Ad(e, t) {
  const n = cn(e, t, (a) => zr(a, t));
  return n ? Ce(n) : e;
}
function Ba(e, t, n) {
  if (Y(e) && De(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: s } of Fn(e)) {
    if (!fe(a, t)) continue;
    const r = Ba(a, t, n);
    return r ? Ar(e, s, r) : null;
  }
  return null;
}
function $s(e, t, n) {
  const a = Ba(e, t, (s) => {
    if (s.panels.length < 2) return s;
    const r = je(s);
    return {
      ...Fa(n, s.panels.map(za)),
      ...$e(s),
      ...r ? { places: r } : {}
    };
  });
  return a ? Ce(a) : e;
}
function ra(e, t) {
  if (Y(e)) return e;
  if (oe(e)) {
    const s = e.frames.findIndex(
      (o) => Y(o.node) && o.node.panels.includes(t)
    ), r = e.frames[s], i = r && Y(r.node) ? r.node : null;
    if (r && i && i.panels.length > 1) {
      const o = Ra(i.panels.map(za), r.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, s), ...o, ...e.frames.slice(s + 1)]
      };
    }
    return rn(e, (o) => ra(o, t));
  }
  if (!fe(e, t)) return e;
  let n = !1;
  const a = e.children.map((s) => {
    const r = ra(s, t);
    return r !== s && (n = !0), r;
  });
  return n ? { ...e, children: a } : e;
}
function Td(e, t, n) {
  const a = Tt(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Se(e, t)?.node === a) {
    const i = ra(e, t);
    return i === e ? e : Ce(i);
  }
  const r = Ba(e, t, (i) => ({
    ...La(Lr(i.panels.map(za), je(i), n)),
    ...$e(i)
  }));
  return r ? Ce(r) : e;
}
function Lr(e, t, n) {
  return t ? e.map((a, s) => ({ ...t[s], node: a })) : Ra(e, n).frames;
}
function Rr(e, t) {
  return { ...La(Lr(e.children, je(e), t)), ...$e(e) };
}
function dp(e, t, n) {
  const a = cn(
    e,
    t,
    (s) => oe(s) ? s : Rr(s, n)
  );
  return a ? Ce(a) : Y(e) && De(e, t) ? Ra([e], n) : e;
}
function zd(e, t) {
  const n = (s) => t === "column" ? s.rect.y : s.rect.x, a = (s) => t === "column" ? s.rect.x : s.rect.y;
  return [...e].sort((s, r) => n(s) - n(r) || a(s) - a(r));
}
function Fr(e, t) {
  const n = zd(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...$e(e),
    places: n.map(({ node: a, ...s }) => s)
  };
}
function fp(e, t, n = "row") {
  const a = cn(
    e,
    t,
    (s) => oe(s) ? Fr(s, n) : s
  );
  return a ? Ce(a) : e;
}
function Ir(e) {
  if (oe(e)) return null;
  const t = Y(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || _e(t) || Y(t) && t.panels.length === 1 && _e(t.panels[0]) ? null : t;
}
const Ld = (e) => {
  const { title: t, fixedView: n, headless: a, ...s } = e;
  return s;
};
function Rd(e, t) {
  const n = Ir(e);
  return n ? t === "inner" ? n : { ...Ld(n), ...$e(e) } : e;
}
function Dt(e) {
  return e.title ? e.title : Y(e) ? "" : oe(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Gt(e, t) {
  if (Y(e)) {
    const a = e.panels[$t(e)];
    return a === void 0 ? "" : _e(a) ? t(a) ?? a : Dt(a) || Gt(a, t);
  }
  if (e.title) return e.title;
  if (oe(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? Gt(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? Gt(n, t) : "";
}
function ct(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (Ot(n)) n = n.children[a];
    else if (oe(n)) n = n.frames[a]?.node;
    else {
      const s = n.panels[a];
      n = s === void 0 || _e(s) ? void 0 : s;
    }
  }
  return n ?? null;
}
function _t(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (oe(e)) {
    const l = e.frames[a];
    if (!l) return e;
    const c = _t(l.node, s, n);
    if (c === l.node) return e;
    const d = [...e.frames];
    return d[a] = { ...l, node: c }, { ...e, frames: d };
  }
  if (Y(e)) {
    const l = e.panels[a];
    if (l === void 0 || _e(l)) return e;
    const c = _t(l, s, n);
    if (c === l) return e;
    const d = [...e.panels];
    return d[a] = c, { ...e, panels: d };
  }
  const r = e.children[a];
  if (!r) return e;
  const i = _t(r, s, n);
  if (i === r) return e;
  const o = [...e.children];
  return o[a] = i, { ...e, children: o };
}
function wn(e, t, n) {
  if (t.length === 0)
    return Ot(e) ? { ...e, sizes: Oa(e.children.length, n) } : e;
  const [a, ...s] = t;
  if (a === void 0) return e;
  if (oe(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const l = wn(o.node, s, n);
    if (l === o.node) return e;
    const c = [...e.frames];
    return c[a] = { ...o, node: l }, { ...e, frames: c };
  }
  if (Y(e)) {
    const o = e.panels[a];
    if (o === void 0 || _e(o)) return e;
    const l = wn(o, s, n);
    if (l === o) return e;
    const c = [...e.panels];
    return c[a] = l, { ...e, panels: c };
  }
  const r = e.children[a];
  if (!r) return e;
  const i = [...e.children];
  return i[a] = wn(r, s, n), { ...e, children: i };
}
function xs(e, t, n, a = 0.02) {
  const s = e[t], r = e[t + 1];
  if (s === void 0 || r === void 0) return e;
  const i = s + r;
  if (i < a * 2) return e;
  const o = [...e], l = Math.min(Math.max(s + n, a), i - a);
  return o[t] = l, o[t + 1] = i - l, o;
}
function En(e) {
  if (!Y(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !_e(t) ? e : { ...Ia([Fd(e)]), ...$e(e) };
}
const Fd = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Cs(e) {
  return e.length === 0 ? null : Ia(e.map(Je));
}
function Id(e, t) {
  if (!e) return Cs(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  for (const l of rt(e))
    !n.has(l) || a.has(l) ? s.add(l) : a.add(l);
  let r = e;
  for (const l of s)
    r = r ? gt(r, l) : null;
  const i = new Set(r ? rt(r) : []), o = t.filter((l) => !i.has(l));
  if (o.length === 0) return r ? En(Ce(r)) : null;
  if (!r) return Cs(o);
  if (oe(r)) {
    const l = r.frames.length;
    return {
      ...r,
      frames: [
        ...r.frames,
        ...o.map(
          (c, d) => Rn(Je(c), {
            x: ht.x + (l + d) * Sn,
            y: ht.y + (l + d) * Sn
          })
        )
      ]
    };
  }
  return En(Ce(Ia([r, ...o.map(Je)])));
}
const qa = Symbol("dc.windowContext");
function Nd(e) {
  return ca(qa, e), e;
}
function In() {
  const e = Ft(qa, null);
  if (!e)
    throw new Error(
      "[header-content-layout] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const Dd = ["data-dc-glyph"], Od = { class: "dc-glyph__line" }, Bd = ["d"], qd = {
  key: 0,
  class: "dc-glyph__aqua"
}, Vd = ["d"], Kd = /* @__PURE__ */ ie({
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
    return (a, s) => (f(), h("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      C("g", Od, [
        (f(!0), h(ae, null, me(t[e.kind], (r) => (f(), h("path", {
          key: r,
          d: r
        }, null, 8, Bd))), 128))
      ]),
      n[e.kind] ? (f(), h("g", qd, [
        (f(!0), h(ae, null, me(n[e.kind], (r) => (f(), h("path", {
          key: r,
          d: r
        }, null, 8, Vd))), 128))
      ])) : z("", !0)
    ], 8, Dd));
  }
}), Rt = /* @__PURE__ */ de(Kd, [["__scopeId", "data-v-4d2872c0"]]), Wd = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Hd = ["data-dc-movable"], Ud = { class: "dc-float__title dc-truncate" }, jd = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Gd = ["aria-label", "aria-pressed", "data-dc-minimize"], Xd = ["aria-label", "aria-pressed", "data-dc-maximize"], Qd = ["aria-label", "data-dc-close"], Yd = { class: "dc-float__content" }, Zd = ["data-dc-handle", "onPointerdown"], Jd = /* @__PURE__ */ ie({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = In(), a = p(() => Le(t.frame.node)), s = p(() => n.panelFor(a.value)?.fixed === !0), r = p(() => ot(t.frame)), i = p(() => mt(t.frame)), o = p(() => r.value || i.value), l = p(() => n.resizable.value && !s.value && !o.value), c = p(() => n.movable.value && !s.value && !o.value), d = p(() => {
      const S = rt(t.frame.node);
      return S.length === 1 ? S[0] ?? null : null;
    }), m = p(() => d.value !== null && n.closable(d.value)), g = p(() => t.frame.node.headless === !0), y = p(
      () => !g.value && (!Y(t.frame.node) || i.value)
    ), b = p(
      () => t.frame.title || Dt(t.frame.node) || Gt(t.frame.node, (S) => n.panelFor(S)?.title)
    ), x = p(() => n.spaceMenu(t.path));
    function w(S) {
      S.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, S, "move");
    }
    function $(S) {
      S.target?.closest("button, a, input, select, textarea, label") || (i.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const L = p(() => {
      const S = n.framing.value;
      return S !== null && fe(t.frame.node, S);
    }), D = p(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...r.value ? { inset: "0" } : i.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${ta}px`,
        height: `${br}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), M = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (S, q) => (f(), h("div", {
      class: "dc-float",
      style: Ee(D.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": r.value ? "true" : "false",
      "data-dc-minimized": i.value ? "true" : "false",
      "data-dc-dragging": L.value ? "true" : "false",
      onPointerdown: q[3] || (q[3] = (E) => P(n).raiseAt(e.path))
    }, [
      y.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: w,
        onDblclick: $
      }, [
        C("span", Ud, R(b.value), 1),
        x.value.length ? (f(), ne(Ta, {
          key: 0,
          items: x.value,
          label: `${b.value} menu`
        }, null, 8, ["items", "label"])) : z("", !0),
        !s.value || i.value && m.value && d.value ? (f(), h("div", jd, [
          s.value ? z("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${i.value ? "Unroll" : "Minimize"} ${b.value}`,
            "aria-pressed": i.value,
            "data-dc-minimize": a.value,
            onClick: q[0] || (q[0] = (E) => P(n).toggleMinimizeAt(e.path))
          }, [
            ve(Rt, {
              kind: i.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Gd)),
          s.value ? z("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${r.value ? "Restore" : "Maximize"} ${b.value}`,
            "aria-pressed": r.value,
            "data-dc-maximize": a.value,
            onClick: q[1] || (q[1] = (E) => P(n).toggleMaximizeAt(e.path))
          }, [
            ve(Rt, {
              kind: r.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Xd)),
          i.value && m.value && d.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${b.value}`,
            "data-dc-close": d.value,
            onClick: q[2] || (q[2] = (E) => P(n).close(d.value))
          }, [
            ve(Rt, { kind: "close" })
          ], 8, Qd)) : z("", !0)
        ])) : z("", !0)
      ], 40, Hd)) : z("", !0),
      C("div", Yd, [
        xe(S.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(ae, null, me(l.value ? M : [], (E) => (f(), h("span", {
        key: E,
        class: "dc-float__grip",
        "data-dc-handle": E,
        "aria-hidden": "true",
        onPointerdown: Fe((k) => P(n).beginFrameDragAt(e.path, k, E), ["stop"])
      }, null, 40, Zd))), 128))
    ], 44, Wd));
  }
}), ef = /* @__PURE__ */ de(Jd, [["__scopeId", "data-v-f035684c"]]), Va = Symbol("dc.paneContext");
function Nr(e) {
  return ca(Va, e), e;
}
function pp() {
  return Ft(Va, null);
}
function vp(e) {
  const t = Ft(qa, null), n = Ft(Va, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => Et(e)
  );
  return Pn() && Zt(a), a;
}
const tf = ["data-dc-panel"], nf = /* @__PURE__ */ ie({
  __name: "WindowPaneBody",
  props: {
    panel: {},
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, n = In();
    Nr({ panel: p(() => t.panel) });
    const a = () => {
      const s = n.panelFor(t.panel);
      return s ? n.renderContent(s, n.viewFor(t.panel), t.active) ?? null : null;
    };
    return (s, r) => (f(), h("div", {
      class: "dc-pane__content",
      "data-dc-panel": t.panel
    }, [
      ve(a)
    ], 8, tf));
  }
}), af = /* @__PURE__ */ de(nf, [["__scopeId", "data-v-31c655fd"]]), sf = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], rf = ["data-dc-movable"], lf = ["aria-label", "aria-pressed"], of = ["data-dc-space-name"], cf = { class: "dc-truncate" }, uf = ["aria-label"], df = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, ff = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], pf = { class: "dc-tab__name dc-truncate" }, vf = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, mf = ["aria-label", "data-dc-close", "onClick"], hf = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, gf = { class: "dc-pane__tools" }, _f = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, yf = ["aria-label", "data-dc-minimize"], wf = ["aria-label", "aria-pressed", "data-dc-maximize"], kf = ["aria-label", "data-dc-close"], bf = ["id", "role", "aria-labelledby"], $f = ["id", "role", "aria-labelledby"], xf = ["data-dc-edge"], Cf = /* @__PURE__ */ ie({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = In(), a = An() ?? "dc-pane", s = p(
      () => t.group.panels.flatMap((V, Q) => {
        if (!_e(V)) {
          const Pe = Dt(V) || Gt(V, (Te) => n.panelFor(Te)?.title);
          return [{ kind: "space", index: Q, id: `space-${Q}`, title: Pe, node: V }];
        }
        const J = n.panelFor(V);
        return J ? [{ kind: "panel", index: Q, id: V, title: J.title, panel: J }] : [];
      })
    ), r = p(() => s.value.length > 1), i = p(() => {
      const V = $t(t.group);
      return s.value.find((Q) => Q.index === V) ?? s.value[0] ?? null;
    }), o = p(() => i.value?.kind === "space" ? i.value.node : null), l = p(() => o.value ? "" : xr(t.group)), c = p(() => o.value ? null : n.panelFor(l.value)), d = p(() => i.value?.title ?? ""), m = p(() => n.spaceNames.value ? t.group.title ?? "" : ""), g = p(() => [...t.path, i.value?.index ?? 0]), y = p(() => l.value || _s(t.group)[0] || ""), b = p(() => n.viewFor(l.value)), x = p(() => t.group.headless === !0), w = p(() => n.focused.value === l.value), $ = p(() => n.dragging.value === l.value), L = p(() => n.moving.value === l.value), D = p(() => n.frameOf(y.value) !== null), M = p(() => n.panelFor(y.value)?.fixed === !0), S = p(
      () => !o.value && (n.canMove(l.value) || D.value && n.movable.value && !M.value)
    ), q = p(
      () => o.value ? n.spaceMenu(g.value) : n.menuFor(l.value)
    ), E = (V) => n.closable(V);
    Nr({ panel: l });
    const k = p(() => n.maximized(y.value)), K = p(
      () => D.value && !M.value || !r.value && !!c.value && E(c.value.id)
    ), I = (V) => `${a}-tab-${V}`, Z = p(() => `${a}-body`), X = p(() => {
      const V = n.dropTarget.value;
      return !V || !De(t.group, V.panel) || V.edge === "float" ? null : V;
    }), ke = p(() => X.value?.index === void 0 ? X.value?.edge ?? null : null), se = p(() => X.value?.index ?? null), N = p(
      () => s.value.flatMap(
        (V) => V.kind === "panel" && (V.id === l.value || V.panel.keepAlive === !0) ? [V.id] : []
      )
    ), T = W(null), H = /* @__PURE__ */ new Map();
    ye(
      l,
      (V, Q) => {
        const J = T.value;
        if (!J || (Q && H.set(Q, J.scrollTop), !n.panelFor(V)?.keepAlive || !H.has(V))) return;
        const Pe = H.get(V);
        It(() => {
          T.value && (T.value.scrollTop = Pe);
        });
      },
      { flush: "pre" }
    );
    const te = () => c.value ? n.renderActions(c.value, b.value, w.value) ?? null : null;
    let ce = null;
    function Ae(V) {
      const Q = ce !== null && Math.hypot(V.clientX - ce.x, V.clientY - ce.y) >= 4;
      return ce = null, Q;
    }
    const Ve = (V) => V.kind === "panel" ? V.id : Le(V.node);
    function Ge(V, Q) {
      Q.kind !== "space" && (n.focus(Q.id), ce = { x: V.clientX, y: V.clientY }, n.beginDrag(Q.id, V));
    }
    function Xe(V, Q) {
      if (Ae(V)) return;
      const J = Ve(Q);
      J && n.selectPanel(J);
    }
    function Ke(V) {
      l.value && n.focus(l.value), !V.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (D.value ? n.beginFrameDrag(y.value, V, "move") : n.beginDrag(l.value, V));
    }
    function We(V) {
      ce = { x: V.clientX, y: V.clientY }, n.beginDrag(l.value, V);
    }
    function O(V) {
      Ae(V) || n.toggleMoveMode(l.value);
    }
    const G = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function j(V) {
      if (!L.value) return;
      if (V.key === "Escape") {
        V.preventDefault(), n.toggleMoveMode(l.value);
        return;
      }
      const Q = G[V.key];
      Q && (V.preventDefault(), D.value ? n.nudgeFrame(l.value, Q, V.shiftKey) : n.nudge(l.value, Q, V.shiftKey));
    }
    function Ie(V) {
      !D.value || V.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(y.value);
    }
    function Bt(V, Q) {
      V.stopPropagation(), ce = null, n.close(Q);
    }
    function xt(V, Q) {
      const J = s.value.length;
      let Pe = null;
      if (V.key === "ArrowRight" ? Pe = (Q + 1) % J : V.key === "ArrowLeft" ? Pe = (Q - 1 + J) % J : V.key === "Home" ? Pe = 0 : V.key === "End" && (Pe = J - 1), Pe === null) return;
      V.preventDefault();
      const Te = s.value[Pe];
      if (!Te) return;
      const qt = Ve(Te);
      qt && n.selectPanel(qt);
    }
    return (V, Q) => i.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": l.value || void 0,
      "data-dc-panels": P(_s)(e.group).join(" ") || void 0,
      "data-dc-tabbed": r.value ? "true" : "false",
      "data-dc-floating": D.value ? "true" : "false",
      "data-dc-maximized": k.value ? "true" : "false",
      "data-dc-headless": x.value ? "true" : "false",
      "data-dc-active": w.value ? "true" : "false",
      "data-dc-dragging": $.value ? "true" : "false",
      "aria-label": d.value,
      onFocusin: Q[7] || (Q[7] = (J) => l.value && P(n).focus(l.value))
    }, [
      x.value ? z("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": S.value ? "true" : "false",
        onPointerdown: Ke,
        onDblclick: Ie
      }, [
        S.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${d.value}`,
          "aria-pressed": L.value,
          onPointerdown: We,
          onClick: O,
          onKeydown: j
        }, [...Q[8] || (Q[8] = [
          C("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, lf)) : z("", !0),
        m.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          C("span", cf, R(m.value), 1)
        ], 8, of)) : z("", !0),
        C("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${d.value} panels`
        }, [
          (f(!0), h(ae, null, me(s.value, (J, Pe) => (f(), h(ae, {
            key: J.id
          }, [
            se.value === Pe ? (f(), h("span", df)) : z("", !0),
            C("button", {
              id: I(J.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": J.kind === "panel" ? J.id : void 0,
              "data-dc-space": J.kind === "space" ? J.title : void 0,
              "aria-selected": J.index === i.value.index,
              "aria-controls": Z.value,
              tabindex: J.index === i.value.index ? 0 : -1,
              onPointerdown: (Te) => Ge(Te, J),
              onClick: (Te) => Xe(Te, J),
              onKeydown: (Te) => xt(Te, Pe)
            }, [
              C("span", pf, R(J.title), 1),
              J.kind === "panel" && J.panel.subtitle ? (f(), h("span", vf, R(J.panel.subtitle), 1)) : z("", !0),
              r.value && J.kind === "panel" && E(J.id) ? (f(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${J.title}`,
                "data-dc-close": J.id,
                onPointerdown: Q[0] || (Q[0] = Fe(() => {
                }, ["stop"])),
                onClick: (Te) => Bt(Te, J.id)
              }, [...Q[9] || (Q[9] = [
                C("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, mf)) : z("", !0)
            ], 40, ff)
          ], 64))), 128)),
          se.value === s.value.length ? (f(), h("span", hf)) : z("", !0)
        ], 8, uf),
        C("div", gf, [
          ve(te),
          q.value.length ? (f(), ne(Ta, {
            key: 0,
            items: q.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : z("", !0)
        ]),
        K.value ? (f(), h("div", _f, [
          D.value && !M.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${d.value}`,
            "data-dc-minimize": y.value,
            onPointerdown: Q[1] || (Q[1] = Fe(() => {
            }, ["stop"])),
            onClick: Q[2] || (Q[2] = (J) => P(n).toggleMinimize(y.value))
          }, [
            ve(Rt, { kind: "minimize" })
          ], 40, yf)) : z("", !0),
          D.value && !M.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${k.value ? "Restore" : "Maximize"} ${d.value}`,
            "aria-pressed": k.value,
            "data-dc-maximize": y.value,
            onPointerdown: Q[3] || (Q[3] = Fe(() => {
            }, ["stop"])),
            onClick: Q[4] || (Q[4] = (J) => P(n).toggleMaximize(y.value))
          }, [
            ve(Rt, {
              kind: k.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, wf)) : z("", !0),
          !r.value && c.value && E(c.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${d.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: Q[5] || (Q[5] = Fe(() => {
            }, ["stop"])),
            onClick: Q[6] || (Q[6] = (J) => P(n).close(c.value.id))
          }, [
            ve(Rt, { kind: "close" })
          ], 40, kf)) : z("", !0)
        ])) : z("", !0)
      ], 40, rf)),
      o.value ? (f(), h("div", {
        key: 1,
        id: Z.value,
        class: "dc-pane__space",
        role: x.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value ? void 0 : I(i.value.id)
      }, [
        xe(V.$slots, "space", {
          node: o.value,
          path: g.value
        }, void 0, !0)
      ], 8, bf)) : z("", !0),
      !o.value || N.value.length ? dt((f(), h("div", {
        key: 2,
        id: o.value ? void 0 : Z.value,
        ref_key: "body",
        ref: T,
        class: "dc-pane__body",
        role: x.value || o.value ? void 0 : "tabpanel",
        "aria-labelledby": x.value || o.value ? void 0 : I(l.value)
      }, [
        (f(!0), h(ae, null, me(N.value, (J) => dt((f(), ne(af, {
          key: J,
          panel: J,
          active: J === l.value && w.value
        }, null, 8, ["panel", "active"])), [
          [xn, J === l.value]
        ])), 128))
      ], 8, $f)), [
        [xn, !o.value]
      ]) : z("", !0),
      ke.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": ke.value,
        "aria-hidden": "true"
      }, null, 8, xf)) : z("", !0)
    ], 40, sf)) : z("", !0);
  }
}), Dr = /* @__PURE__ */ de(Cf, [["__scopeId", "data-v-2c3c5ecf"]]), Mf = ["data-dc-space", "data-dc-path", "aria-label"], Sf = {
  key: 0,
  class: "dc-space__head"
}, Ef = { class: "dc-space__title dc-truncate" }, Pf = ["data-dc-direction"], Af = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, Tf = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], zf = /* @__PURE__ */ ie({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = In(), a = W(null), s = p(() => Y(t.node) ? t.node : null), r = p(() => Ot(t.node) ? t.node : null), i = p(() => oe(t.node) ? t.node : null), o = p(
      () => r.value ? r.value.children : i.value?.frames.map((N) => N.node) ?? []
    ), l = p(() => r.value ? st(r.value) : []), c = p(
      () => (i.value?.frames ?? []).map((N, T) => ({
        held: N,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: T,
        key: E(N.node),
        path: [...t.path, T]
      })).sort((N, T) => N.key < T.key ? -1 : N.key > T.key ? 1 : 0)
    ), d = p(() => Dt(t.node)), m = p(() => n.spaceMenu(t.path)), g = p(() => t.node.headless === !0), y = p(() => i.value ? "desktop" : r.value?.direction ?? ""), b = W(null), x = W(0);
    let w = null;
    ye(
      b,
      (N) => {
        w?.disconnect(), w = null, !(!N || typeof ResizeObserver > "u") && (x.value = N.clientWidth, w = new ResizeObserver(([T]) => {
          x.value = T?.contentRect.width ?? 0;
        }), w.observe(N));
      },
      { immediate: !0 }
    ), Be(() => w?.disconnect());
    const $ = p(() => {
      const N = Math.max(
        1,
        Math.floor((x.value + Mt) / (ta + Mt))
      ), T = /* @__PURE__ */ new Map();
      let H = 0;
      for (const te of c.value)
        te.held.minimized === !0 && (T.set(te.key, {
          x: Mt + H % N * (ta + Mt),
          bottom: Mt + Math.floor(H / N) * (br + Mt)
        }), H += 1);
      return T;
    }), L = (N) => !!N && N.join("/") === t.path.join("/"), D = p(() => {
      const N = n.dropTarget.value, T = i.value;
      if (!T || !N?.rect || N.edge !== "float") return null;
      if (N.space) return L(N.space) ? N.rect : null;
      const H = Se(T, N.panel);
      return H && T.frames.includes(H) ? N.rect : null;
    }), M = p(() => {
      const N = n.dropTarget.value;
      return !!N && !N.rect && L(N.space);
    }), S = p(() => r.value?.direction === "row"), q = p(() => o.value.map((N, T) => [...t.path, T])), E = (N) => [...rt(N)].sort().join("/"), k = (N) => {
      const T = rt(N)[0];
      return (T ? n.panelFor(T)?.title : null) ?? T ?? "panel";
    }, K = (N) => {
      const T = o.value[N], H = o.value[N + 1];
      return !T || !H ? "Resize panels" : `Resize ${k(T)} and ${k(H)}`;
    }, I = (N) => {
      const T = l.value[N] ?? 0, H = l.value[N + 1] ?? 0, te = T + H;
      return te > 0 ? Math.round(T / te * 100) : 50;
    };
    function Z() {
      const N = a.value, T = N ? S.value ? N.clientWidth : N.clientHeight : 0;
      return T <= 0 ? 0.05 : Math.min(n.minPanelSize.value / T, 0.4);
    }
    let X = null;
    function ke(N, T) {
      const H = r.value, te = a.value;
      if (!n.resizable.value || !H || !te || N.button !== 0) return;
      const ce = S.value ? te.clientWidth : te.clientHeight;
      if (ce <= 0) return;
      const Ae = S.value ? N.clientX : N.clientY, Ve = st(H), Ge = Math.min(n.minPanelSize.value / ce, 0.4);
      N.preventDefault();
      const Xe = (O) => {
        const G = ((S.value ? O.clientX : O.clientY) - Ae) / ce;
        n.setSizes(t.path, xs(Ve, T, G, Ge));
      }, Ke = () => X?.(), We = (O) => {
        O.key === "Escape" && (n.setSizes(t.path, Ve), X?.());
      };
      X = () => {
        window.removeEventListener("pointermove", Xe), window.removeEventListener("pointerup", Ke), window.removeEventListener("pointercancel", Ke), window.removeEventListener("keydown", We), X = null;
      }, window.addEventListener("pointermove", Xe), window.addEventListener("pointerup", Ke), window.addEventListener("pointercancel", Ke), window.addEventListener("keydown", We);
    }
    Be(() => X?.());
    function se(N, T) {
      const H = r.value;
      if (!n.resizable.value || !H) return;
      const te = S.value ? "ArrowRight" : "ArrowDown", ce = S.value ? "ArrowLeft" : "ArrowUp", Ae = N.shiftKey ? 0.1 : 0.02;
      if (N.key !== te && N.key !== ce) return;
      const Ve = N.key === te ? Ae : -Ae;
      N.preventDefault(), n.setSizes(t.path, xs(st(H), T, Ve, Z()));
    }
    return (N, T) => {
      const H = Ts("WindowNode", !0);
      return s.value ? (f(), ne(Dr, {
        key: 0,
        group: s.value,
        path: e.path
      }, {
        space: Ze(({ node: te, path: ce }) => [
          ve(H, {
            node: te,
            path: ce,
            framed: ""
          }, null, 8, ["node", "path"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": y.value,
        "data-dc-path": e.path.join("/"),
        "aria-label": d.value
      }, [
        !e.framed && !g.value ? (f(), h("header", Sf, [
          C("span", Ef, R(d.value), 1),
          m.value.length ? (f(), ne(Ta, {
            key: 0,
            items: m.value,
            label: `${d.value} menu`
          }, null, 8, ["items", "label"])) : z("", !0)
        ])) : z("", !0),
        i.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: b,
          class: "dc-window__desktop"
        }, [
          D.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Ee({
              left: `${D.value.x}px`,
              top: `${D.value.y}px`,
              width: `${D.value.w}px`,
              height: `${D.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : z("", !0),
          (f(!0), h(ae, null, me(c.value, (te) => (f(), ne(ef, {
            key: te.key,
            frame: te.held,
            path: te.path,
            order: te.order,
            place: $.value.get(te.key) ?? null
          }, {
            default: Ze(() => [
              ve(H, {
                node: te.held.node,
                path: te.path,
                framed: te.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : r.value ? (f(), h("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": r.value.direction
        }, [
          M.value ? (f(), h("div", Af)) : z("", !0),
          (f(!0), h(ae, null, me(o.value, (te, ce) => (f(), h(ae, {
            key: E(te)
          }, [
            C("div", {
              class: "dc-window__cell",
              style: Ee({ flexGrow: l.value[ce] ?? 1 })
            }, [
              ve(H, {
                node: te,
                path: q.value[ce] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            ce < o.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": S.value ? "vertical" : "horizontal",
              "aria-label": K(ce),
              "aria-valuenow": I(ce),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": P(n).resizable.value ? void 0 : "true",
              tabindex: P(n).resizable.value ? 0 : -1,
              onPointerdown: (Ae) => ke(Ae, ce),
              onKeydown: (Ae) => se(Ae, ce)
            }, null, 40, Tf)) : z("", !0)
          ], 64))), 128))
        ], 8, Pf)) : z("", !0)
      ], 8, Mf));
    };
  }
}), Lf = /* @__PURE__ */ de(zf, [["__scopeId", "data-v-fb5b403f"]]), Rf = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], Ff = {
  key: 1,
  class: "dc-window__empty"
}, If = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, vn = 16, Nf = /* @__PURE__ */ ie({
  __name: "WindowFrame",
  props: /* @__PURE__ */ $n({
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
  emits: /* @__PURE__ */ $n(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, s = n, r = Wt(e, "layout"), i = Wt(e, "views"), o = Jt(), l = p(() => new Map(a.panels.map((u) => [u.id, u]))), c = p(() => a.panels.map((u) => u.id)), d = p(() => Id(r.value, c.value)), m = W(null), g = W(null), y = W(null), b = W(!0), x = W(null), w = W(null), $ = W(null), L = W(""), D = W(null);
    function M() {
      const u = D.value;
      return u ? [...u.querySelectorAll(".dc-pane[data-dc-panels]")].filter((_) => _.closest(".dc-window") === u).map((_) => ({ panels: (_.dataset.dcPanels ?? "").split(" "), element: _ })) : [];
    }
    function S(u) {
      const v = [];
      let _ = u.closest(".dc-float");
      for (; _; )
        v.unshift(Number(_.dataset.dcOrder ?? 0)), _ = _.parentElement?.closest(".dc-float") ?? null;
      return v;
    }
    function q() {
      return M().map((u) => ({ pane: u, order: S(u.element) })).sort((u, v) => {
        const _ = Math.max(u.order.length, v.order.length);
        for (let A = 0; A < _; A += 1) {
          const F = (u.order[A] ?? -1) - (v.order[A] ?? -1);
          if (F !== 0) return F;
        }
        return 0;
      }).map((u) => u.pane);
    }
    const E = (u) => M().find((v) => v.panels.includes(u)) ?? null;
    function k(u) {
      const v = l.value.get(u);
      if (!v) return "";
      const _ = i.value[u];
      return _ && v.views?.some((A) => A.key === _) ? _ : v.defaultView ?? v.views?.[0]?.key ?? "";
    }
    function K(u, v) {
      i.value = { ...i.value, [u]: v }, s("view-change", { panel: u, view: v });
    }
    const I = p(
      () => a.panels.filter((u) => u.fixed !== !0).length
    );
    function Z(u) {
      return !a.movable || I.value < 1 || a.panels.length < 2 ? !1 : l.value.get(u)?.fixed !== !0;
    }
    function X(u, v) {
      const _ = d.value;
      !u || !_ || u === _ || (r.value = u, v && s("panel-move", v));
    }
    function ke(u, v, _) {
      if (u.width <= 0 || u.height <= 0) return "center";
      const A = (v - u.left) / u.width, F = (_ - u.top) / u.height, B = 0.3;
      return A > B && A < 1 - B && F > B && F < 1 - B ? "center" : [
        { edge: "left", distance: A },
        { edge: "right", distance: 1 - A },
        { edge: "top", distance: F },
        { edge: "bottom", distance: 1 - F }
      ].reduce(
        (ue, U) => U.distance < ue.distance ? U : ue
      ).edge;
    }
    function se(u, v) {
      const _ = [...u.querySelectorAll(".dc-tab")], A = _.findIndex((F) => {
        const B = F.getBoundingClientRect();
        return v < B.left + B.width / 2;
      });
      return A === -1 ? _.length : A;
    }
    function N(u, v, _) {
      for (const { panels: A, element: F } of q().reverse()) {
        const B = F.getBoundingClientRect();
        if (u < B.left || u > B.right || v < B.top || v > B.bottom) continue;
        const he = A.find((re) => re !== _), ue = F.querySelector(".dc-pane__tabs"), U = ue?.getBoundingClientRect();
        if (ue && U && v >= U.top && v <= U.bottom)
          return he ? { panel: he, edge: "center", index: se(ue, u) } : null;
        const ee = F.querySelector(":scope > .dc-pane__space");
        if (ee) {
          const re = ee.getBoundingClientRect();
          if (u >= re.left && u <= re.right && v >= re.top && v <= re.bottom) continue;
        }
        return he ? { panel: he, edge: ke(B, u, v) } : null;
      }
      return H(u, v, _) ?? Ae(u, v);
    }
    function T() {
      const u = D.value;
      return u ? [...u.querySelectorAll(".dc-window__desktop")].filter((v) => v.closest(".dc-window") === u).reverse() : [];
    }
    function H(u, v, _) {
      const A = d.value;
      if (!A) return null;
      for (const F of T()) {
        const B = F.getBoundingClientRect();
        if (u < B.left || u > B.right || v < B.top || v > B.bottom) continue;
        const he = Ve(F), ue = he.flatMap((pe) => pe.panels).find((pe) => pe !== _);
        if (!ue && he.length > 0) return null;
        const U = Se(A, _)?.rect, ee = Kn(
          {
            x: u - B.left - 24,
            y: v - B.top - 12,
            w: U?.w ?? ht.w,
            h: U?.h ?? ht.h
          },
          { w: F.clientWidth, h: F.clientHeight },
          a.minPanelSize
        );
        if (ue) return { panel: ue, edge: "float", rect: ee };
        const re = te(F);
        return re ? { panel: "", space: re, edge: "float", rect: ee } : null;
      }
      return null;
    }
    function te(u) {
      const v = u.closest(".dc-space")?.getAttribute("data-dc-path");
      return v == null ? null : v === "" ? [] : v.split("/").map(Number);
    }
    function ce() {
      const u = D.value;
      return u ? [...u.querySelectorAll(".dc-space")].filter((v) => v.closest(".dc-window") === u).filter((v) => !v.querySelector(".dc-pane")).reverse().flatMap((v) => {
        const _ = te(v);
        return _ ? [{ element: v, path: _ }] : [];
      }) : [];
    }
    function Ae(u, v) {
      for (const { element: _, path: A } of ce()) {
        if (_.dataset.dcSpace === "desktop") continue;
        const F = _.getBoundingClientRect();
        if (!(u < F.left || u > F.right || v < F.top || v > F.bottom))
          return { panel: "", space: A, edge: "center" };
      }
      return null;
    }
    function Ve(u) {
      return M().filter(
        (v) => v.element.closest(".dc-window__desktop") === u
      );
    }
    let Ge = null;
    const Xe = (u) => u.altKey;
    function Ke(u, v) {
      if (!Z(u) || g.value || w.value || v.button !== 0) return;
      const _ = v.clientX, A = v.clientY;
      let F = !1, B = Xe(v);
      const he = () => {
        const ge = $.value;
        ge && (y.value = B ? H(ge.x, ge.y, u) : N(ge.x, ge.y, u));
      }, ue = (ge) => {
        if (!F) {
          if (Math.hypot(ge.clientX - _, ge.clientY - A) < 4) return;
          F = !0, g.value = u, x.value = null;
        }
        B = Xe(ge), b.value = !B, $.value = { x: ge.clientX, y: ge.clientY }, he();
      }, U = (ge) => {
        Xe(ge) !== B && (B = !B, b.value = !B, F && he());
      }, ee = (ge) => {
        Ge?.();
        const le = y.value, ze = d.value;
        if (ge && F && le && ze) {
          const lt = le.space ? bs(ze, u, le.space, le.rect) : le.edge === "float" && le.rect ? ks(ze, u, le.panel, le.rect) : pn(ze, u, le.panel, le.edge, le.index);
          X(lt, {
            panel: u,
            target: le.panel,
            edge: le.edge,
            ...le.space === void 0 ? {} : { space: le.space },
            ...le.index === void 0 ? {} : { index: le.index },
            ...le.rect === void 0 ? {} : { rect: le.rect }
          });
        }
        g.value = null, y.value = null, $.value = null, b.value = !0;
      }, re = () => ee(!0), pe = () => ee(!1), we = (ge) => {
        if (ge.key === "Escape") {
          ee(!1);
          return;
        }
        U(ge);
      };
      Ge = () => {
        window.removeEventListener("pointermove", ue), window.removeEventListener("pointerup", re), window.removeEventListener("pointercancel", pe), window.removeEventListener("keydown", we), window.removeEventListener("keyup", U), Ge = null;
      }, window.addEventListener("pointermove", ue), window.addEventListener("pointerup", re), window.addEventListener("pointercancel", pe), window.addEventListener("keydown", we), window.addEventListener("keyup", U);
    }
    Be(() => Ge?.());
    let We = null;
    function O(u) {
      const v = D.value;
      return v ? [...v.querySelectorAll(
        `.dc-float[data-dc-path="${u.join("/")}"]`
      )].find((F) => F.closest(".dc-window") === v)?.parentElement ?? null : null;
    }
    function G(u) {
      const v = d.value;
      return v ? sa(v, u) : null;
    }
    function j(u) {
      const v = d.value;
      if (!v) return;
      const _ = Ut(v, u);
      _ !== v && (r.value = _);
    }
    function Ie(u) {
      const v = G(u);
      v && j(v);
    }
    function Bt(u) {
      const v = d.value, _ = v ? Se(v, u) : null;
      return _ !== null && ot(_);
    }
    function xt(u) {
      const v = d.value, _ = v ? Se(v, u) : null;
      return _ !== null && mt(_);
    }
    function V(u) {
      const v = d.value, _ = v ? vt(v, u) : null;
      return _ ? Le(_.node) : "";
    }
    function Q(u) {
      const v = d.value, _ = v ? vt(v, u) : null;
      if (!v || !_) return;
      const A = Le(_.node);
      if (l.value.get(A)?.fixed === !0) return;
      const F = !mt(_);
      let B = Cd(v, u, F);
      B !== v && (F || (B = Ut(B, u)), r.value = B, s("frame-minimize", { panel: A, minimized: F }));
    }
    function J(u) {
      const v = G(u);
      v && Q(v);
    }
    function Pe(u) {
      const v = d.value, _ = v ? vt(v, u) : null;
      if (!v || !_) return;
      const A = Le(_.node);
      if (l.value.get(A)?.fixed === !0) return;
      const F = !ot(_);
      let B = xd(v, u, F);
      B !== v && (F && (B = Ut(B, u)), r.value = B, s("frame-maximize", { panel: A, maximized: F }));
    }
    function Te(u) {
      const v = G(u);
      v && Pe(v);
    }
    function qt(u, v, _) {
      const A = d.value, F = A ? vt(A, u) : null;
      if (!A || !F || v.button !== 0 || g.value || w.value) return;
      const B = Le(F.node);
      if (l.value.get(B)?.fixed === !0 || ot(F) || mt(F) || (_ === "move" ? !a.movable : !a.resizable)) return;
      const he = O(u), ue = Md(A, u);
      j(u);
      const U = { w: he?.clientWidth ?? 0, h: he?.clientHeight ?? 0 }, ee = { ...F.rect }, re = v.clientX, pe = v.clientY, we = a.minPanelSize;
      w.value = B;
      const ge = (Ne) => {
        const et = d.value;
        if (!et) return;
        const Vt = ws(et, ue, Kn(Ne, U, we));
        Vt !== et && (r.value = Vt);
      }, le = (Ne) => {
        Ne.preventDefault();
        const et = Ne.clientX - re, Vt = Ne.clientY - pe;
        ge(
          _ === "move" ? { ...ee, x: ee.x + et, y: ee.y + Vt } : ys(ee, _, et, Vt, we)
        );
      }, ze = (Ne) => {
        if (We?.(), w.value = null, !Ne) {
          ge(ee);
          return;
        }
        const et = d.value ? vt(d.value, ue) : null;
        et && s("frame-change", { panel: V(ue), rect: et.rect });
      }, lt = () => ze(!0), ft = () => ze(!1), pt = (Ne) => {
        Ne.key === "Escape" && ze(!1);
      };
      We = () => {
        window.removeEventListener("pointermove", le), window.removeEventListener("pointerup", lt), window.removeEventListener("pointercancel", ft), window.removeEventListener("keydown", pt), We = null;
      }, window.addEventListener("pointermove", le), window.addEventListener("pointerup", lt), window.addEventListener("pointercancel", ft), window.addEventListener("keydown", pt);
    }
    function Kr(u, v, _) {
      const A = G(u);
      A && qt(A, v, _);
    }
    function Wr(u, v, _ = !1) {
      const A = d.value, F = G(u), B = A && F ? vt(A, F) : null;
      if (!A || !F || !B || l.value.get(u)?.fixed === !0 || (_ ? !a.resizable : !a.movable)) return;
      if (ot(B) || mt(B)) {
        L.value = `${Qe(u)} is ${ot(B) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const he = v === "left" ? -vn : v === "right" ? vn : 0, ue = v === "up" ? -vn : v === "down" ? vn : 0, U = O(F), ee = { w: U?.clientWidth ?? 0, h: U?.clientHeight ?? 0 }, re = _ ? ys(B.rect, "se", he, ue, a.minPanelSize) : { ...B.rect, x: B.rect.x + he, y: B.rect.y + ue }, pe = ws(A, F, Kn(re, ee, a.minPanelSize));
      if (pe === A) {
        L.value = _ ? `${Qe(u)} cannot be resized further.` : `${Qe(u)} cannot move ${v}.`;
        return;
      }
      r.value = pe;
      const we = vt(pe, F);
      we && (s("frame-change", { panel: u, rect: we.rect }), L.value = _ ? `${Qe(u)} resized to ${we.rect.w} by ${we.rect.h}.` : `${Qe(u)} moved to ${we.rect.x}, ${we.rect.y}.`);
    }
    Be(() => We?.());
    function Hr(u, v) {
      const _ = E(u), A = _?.element.getBoundingClientRect();
      if (!_ || !A) return null;
      const F = v === "left" || v === "right", B = (U) => {
        if (!(F ? U.bottom > A.top + 1 && U.top < A.bottom - 1 : U.right > A.left + 1 && U.left < A.right - 1)) return null;
        const re = v === "left" ? A.left - U.right : v === "right" ? U.left - A.right : v === "up" ? A.top - U.bottom : U.top - A.bottom;
        return re < -1 ? null : re;
      }, he = [];
      for (const U of M()) {
        if (U === _ || U.element === _.element) continue;
        const ee = B(U.element.getBoundingClientRect());
        if (ee === null) continue;
        const re = U.panels.find((pe) => pe !== u);
        re && he.push({ to: { panel: re }, distance: ee });
      }
      for (const { element: U, path: ee } of ce()) {
        const re = B(U.getBoundingClientRect());
        re !== null && he.push({ to: { space: ee }, distance: re });
      }
      return he.reduce(
        (U, ee) => U && U.distance <= ee.distance ? U : ee,
        null
      )?.to ?? null;
    }
    function Ur(u) {
      const v = d.value ? Se(d.value, u) !== null : !1;
      if (!v && !Z(u)) return;
      x.value = x.value === u ? null : u;
      const _ = Qe(u);
      if (!x.value) {
        L.value = `${_}: move mode off.`;
        return;
      }
      L.value = v ? `${_}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${_}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const Qe = (u) => l.value.get(u)?.title ?? u, jr = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Gr(u, v, _ = !1) {
      if (!Z(u)) return;
      const A = d.value;
      if (!A) return;
      const F = Qe(u), B = Tt(A, u);
      if (!_ && B && (v === "left" || v === "right") && B.panels.length > 1) {
        const pe = B.panels.indexOf(u), we = v === "left" ? pe - 1 : pe + 1;
        if (we >= 0 && we < B.panels.length) {
          X(jt(A, u, we), { panel: u, target: u, edge: "center", index: we }), L.value = `${F} moved ${v}, now tab ${we + 1} of ${B.panels.length}.`, Nn(u);
          return;
        }
      }
      const ue = Hr(u, v);
      if (!ue || ue.panel !== void 0 && !Z(ue.panel)) {
        L.value = `${F} cannot move ${v}.`;
        return;
      }
      const U = jr[v];
      if (ue.space) {
        const pe = ue.space, we = ct(A, pe), ge = Se(A, u)?.rect, le = { ...ht, ...ge ? { w: ge.w, h: ge.h } : {} };
        X(bs(A, u, pe, le), { panel: u, target: "", space: pe, edge: U }), L.value = `${F} moved ${v}, into ${we ? Dt(we) : "the space"}.`, Nn(u);
        return;
      }
      const ee = ue.panel, re = B?.panels.length === 1 && Tt(A, ee)?.panels.length === 1;
      _ ? (X(pn(A, u, ee, "center"), {
        panel: u,
        target: ee,
        edge: "center"
      }), L.value = `${F} joined ${Qe(ee)} as a tab.`) : re ? (X(yn(A, u, ee), { panel: u, target: ee, edge: U }), L.value = `${F} moved ${v}, trading places with ${Qe(ee)}.`) : (X(pn(A, u, ee, U), { panel: u, target: ee, edge: U }), L.value = `${F} moved ${v}, beside ${Qe(ee)}.`), Nn(u);
    }
    function Nn(u) {
      It(() => {
        E(u)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Xr(u, v) {
      const _ = d.value;
      _ && (r.value = wn(_, u, v));
    }
    function Dn(u) {
      const v = d.value;
      if (!v) return;
      const _ = Lt(v, u);
      _ !== v && (r.value = _, s("tab-select", { panel: u }));
    }
    function Ha(u) {
      return l.value.get(u)?.closable ?? a.closable;
    }
    function Qr(u) {
      Ha(u) && s("panel-close", u);
    }
    const On = W(/* @__PURE__ */ new Map());
    let Yr = 0;
    function Zr(u, v) {
      const _ = Yr += 1;
      return On.value.set(_, { panel: u, items: v }), () => {
        On.value.delete(_);
      };
    }
    function Jr(u) {
      const v = [];
      for (const _ of On.value.values())
        _.panel() === u && v.push(..._.items());
      return v;
    }
    function Ua(u) {
      const v = u.filter((_) => _.items.length > 0);
      return v.length < 2 ? v.flatMap((_) => _.items) : v.flatMap((_) => [
        { id: _.id, heading: !0, label: _.title },
        ..._.items
      ]);
    }
    const ja = (u) => u.title || "These tabs";
    function el(u, v) {
      const _ = v.id, A = Tt(u, _), F = (A?.panels.length ?? 0) > 1, B = A?.fixedView === !0, he = (re) => ({
        action: () => {
          re !== u && (r.value = re);
        }
      }), ue = [], U = [], ee = v.views ?? [];
      if (ee.length > 1 && !B) {
        const re = k(_);
        ue.push({
          id: "view",
          label: "View",
          items: ee.map((pe) => ({
            id: `view-${pe.key}`,
            label: pe.label,
            checked: pe.key === re,
            action: () => K(_, pe.key)
          }))
        });
      }
      return F && !B && U.push(
        { id: "show-row", label: "Row", checked: !1, ...he($s(u, _, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...he($s(u, _, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...he(Ad(u, _))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...he(Td(u, _))
        }
      ), F && A && (U.length && U.push({ separator: !0 }), U.push(...Ga(A, _))), { panel: ue, tabs: U, tabsTitle: A ? ja(A) : "" };
    }
    function Ga(u, v) {
      const _ = $t(u), A = (F) => {
        const B = u.panels[(_ + F + u.panels.length) % u.panels.length];
        return (B === void 0 ? "" : Le(B)) || v;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => Dn(A(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => Dn(A(-1)) }
      ];
    }
    function un(u) {
      return u.title ? u.title : Y(u) ? u.panels.length > 1 ? "these tabs" : "the strip" : Dt(u);
    }
    function Xa(u) {
      if (!u || oe(u) || u.fixedView === !0 || !u.title && u.headless !== !0 || je(u)) return null;
      const v = Ir(u);
      return v && v.fixedView !== !0 ? v : null;
    }
    function tl(u) {
      const v = d.value;
      if (!a.menu || !v) return [];
      const _ = ct(v, u);
      if (!_ || Y(_)) return [];
      if (_.fixedView) return [];
      const A = oe(_) ? "desktop" : _.direction, F = (le, ze, lt) => ({
        id: `show-${le}`,
        label: ze,
        checked: A === le,
        action: () => {
          const ft = d.value, pt = lt();
          !ft || pt === _ || (r.value = En(Ce(_t(ft, u, pt))));
        }
      }), B = () => {
        const le = zr(_, nl(_));
        if (Y(le) && le.panels.length === 0) return _;
        const ze = Y(le) && le.panels.length === 1 ? le.panels[0] : void 0;
        return ze !== void 0 && _e(ze) ? _ : le;
      }, he = (le) => () => oe(_) ? Fr(_, le) : _.direction === le ? _ : { ..._, direction: le }, ue = u.slice(0, -1), U = u.length > 0 ? ct(v, ue) : null, ee = U && Y(U) && U.panels.length > 1 ? U : null, re = U && Xa(U) === _ ? U : null, pe = Xa(_), we = _.title || "this space", ge = (le, ze, lt, ft, pt) => ({
        id: le,
        label: pt,
        action: () => {
          const Ne = d.value;
          Ne && (r.value = En(Ce(_t(Ne, ze, Rd(lt, ft)))));
        }
      });
      return Ua([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: _.title || "This space",
          items: [
            F("row", "Row", he("row")),
            F("column", "Column", he("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            F("tabs", "Tabs", () => B()),
            F("desktop", "Desktop", () => oe(_) ? _ : Rr(_))
          ]
        },
        {
          id: "about-around",
          title: pe ? `Around ${un(pe)}` : "",
          items: pe ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ...pe.title ? [] : [ge("merge-around-keep-this", u, _, "outer", `Keep ${we}`)],
            ..._.title ? [] : [ge("merge-around-keep-that", u, _, "inner", `Keep ${un(pe)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: re ? `Inside ${un(re)}` : "",
          items: re ? [
            ..._.title ? [] : [ge("merge-inside-keep-that", ue, re, "outer", `Keep ${un(re)}`)],
            ...re.title ? [] : [ge("merge-inside-keep-this", ue, re, "inner", `Keep ${we}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: ee ? ja(ee) : "",
          items: ee ? Ga(ee, Le(_)) : []
        }
      ]);
    }
    function nl(u) {
      const v = m.value;
      return v && fe(u, v) ? v : void 0;
    }
    function al(u) {
      const v = d.value, _ = l.value.get(u);
      if (!v || !_) return [];
      const A = a.menu ? el(v, _) : null, F = Jr(u);
      F.length && A?.panel.length && F.push({ separator: !0 }), A && F.push(...A.panel);
      const B = Ua([
        { id: "about-panel", title: _.title, items: F },
        { id: "about-tabs", title: A?.tabsTitle ?? "", items: A?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(_, B) : B;
    }
    function sl(u, v) {
      return o[`${u}-${v}`] ?? o[u];
    }
    function Qa(u, v, _, A) {
      return sl(u, v.id)?.({ panel: v, view: _, active: A });
    }
    Nd({
      panelFor: (u) => l.value.get(u) ?? null,
      viewFor: k,
      setView: K,
      movable: p(() => a.movable),
      resizable: p(() => a.resizable),
      minPanelSize: p(() => a.minPanelSize),
      spaceNames: p(() => a.spaceNames),
      focused: m,
      dragging: g,
      dropTarget: y,
      moving: x,
      framing: w,
      canMove: Z,
      focus(u) {
        m.value !== u && (m.value = u, s("panel-activate", u));
      },
      selectPanel: Dn,
      beginDrag: Ke,
      toggleMoveMode: Ur,
      nudge: Gr,
      setSizes: Xr,
      frameOf: (u) => d.value ? Se(d.value, u) : null,
      beginFrameDrag: Kr,
      nudgeFrame: Wr,
      raise: Ie,
      maximized: Bt,
      toggleMaximize: Te,
      minimized: xt,
      toggleMinimize: J,
      beginFrameDragAt: qt,
      raiseAt: j,
      toggleMaximizeAt: Pe,
      toggleMinimizeAt: Q,
      menuFor: al,
      spaceMenu: tl,
      registerMenu: Zr,
      closable: Ha,
      close: Qr,
      renderContent: (u, v, _) => Qa("panel", u, v, _),
      renderActions: (u, v, _) => Qa("actions", u, v, _),
      layout: d
    });
    const rl = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), ll = () => {
      const u = g.value, v = $.value;
      return !u || !v ? null : ul(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${v.x}px`, top: `${v.y}px` },
          "aria-hidden": "true"
        },
        l.value.get(u)?.title ?? u
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: d,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(u, v, _, A) {
        const F = d.value;
        F && X(pn(F, u, v, _, A), {
          panel: u,
          target: v,
          edge: _,
          ...A === void 0 ? {} : { index: A }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(u) {
        const v = d.value;
        v && (r.value = Lt(v, u));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(u, v, _) {
        const A = d.value;
        A && X(ks(A, u, v, _), {
          panel: u,
          target: v,
          edge: "float",
          rect: _
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(u, v) {
        const _ = d.value;
        if (!_) return;
        const A = kd(_, u, v);
        if (A === _) return;
        r.value = A;
        const F = Se(A, u);
        F && s("frame-change", { panel: u, rect: F.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: K,
      /** Brings a floating frame to the front of its stack. */
      raise: Ie,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: Te,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: J
    }), (u, v) => (f(), h("div", {
      ref_key: "root",
      ref: D,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": g.value ? "true" : "false",
      "data-dc-docking": b.value ? "true" : "false",
      style: Ee(rl.value)
    }, [
      d.value ? (f(), ne(Lf, {
        key: 0,
        node: d.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", Ff, " This window has no panels. ")),
      ve(ll),
      C("p", If, R(L.value), 1)
    ], 12, Rf));
  }
}), Df = /* @__PURE__ */ de(Nf, [["__scopeId", "data-v-711565af"]]), Of = (e) => Math.round(e * 1e3) / 1e3;
function Hn(e, t) {
  return e.title && (t.t = e.title), e.headless && (t.h = !0), e.fixedView && (t.v = !0), t;
}
function Bf(e) {
  return [Math.round(e.x), Math.round(e.y), Math.round(e.w), Math.round(e.h)];
}
function Un(e) {
  const t = { b: Bf(e.rect) };
  return e.title && (t.t = e.title), e.maximized && (t.M = !0), e.minimized && (t.m = !0), t;
}
function qf(e) {
  if (e.kind !== "group" || e.panels.length !== 1) return null;
  const t = e.panels[0];
  return typeof t != "string" || e.title || e.headless || e.fixedView || e.places ? null : t;
}
function la(e) {
  const t = qf(e);
  return t !== null ? t : Or(e);
}
function Or(e) {
  if (e.kind === "group") {
    const n = { g: e.panels.map((a) => typeof a == "string" ? a : Or(a)) };
    return e.active !== void 0 && e.active !== e.panels[0] && (n.a = e.active), e.places && (n.p = e.places.map(Un)), Hn(e, n);
  }
  if (e.kind === "split") {
    const n = { [e.direction === "row" ? "r" : "c"]: e.children.map(la) };
    return e.sizes && (n.z = e.sizes.map(Of)), e.places && (n.p = e.places.map(Un)), Hn(e, n);
  }
  const t = {
    f: e.frames.map((n) => ({ n: la(n.node), ...Un(n) }))
  };
  return Hn(e, t);
}
class Br extends Error {
}
const Me = () => {
  throw new Br();
}, oa = (e) => typeof e == "object" && e !== null && !Array.isArray(e), St = (e) => Array.isArray(e) ? e : Me(), Ka = (e) => e === void 0 ? void 0 : typeof e == "string" ? e : Me(), qr = (e) => St(e).map((t) => typeof t == "number" && Number.isFinite(t) ? t : Me());
function Vf(e) {
  const [t, n, a, s] = qr(e);
  return s === void 0 && Me(), { x: t, y: n, w: a, h: s };
}
function jn(e) {
  if (!oa(e)) return Me();
  const t = { rect: Vf(e.b) }, n = Ka(e.t);
  return n && (t.title = n), e.M === !0 && (t.maximized = !0), e.m === !0 && (t.minimized = !0), t;
}
function Gn(e, t) {
  const n = Ka(e.t);
  return n && (t.title = n), e.h === !0 && (t.headless = !0), e.v === !0 && (t.fixedView = !0), t;
}
function kn(e) {
  if (typeof e == "string") return { kind: "group", panels: [e] };
  if (!oa(e)) return Me();
  if (e.g !== void 0) {
    const n = St(e.g).map((r) => typeof r == "string" ? r : kn(r));
    n.length === 0 && Me();
    const a = { kind: "group", panels: n }, s = Ka(e.a);
    return s !== void 0 && (a.active = s), e.p !== void 0 && (a.places = St(e.p).map(jn)), Gn(e, a);
  }
  const t = e.r !== void 0 ? "row" : e.c !== void 0 ? "column" : null;
  if (t) {
    const n = St(t === "row" ? e.r : e.c).map(kn), a = { kind: "split", direction: t, children: n };
    return e.z !== void 0 && (a.sizes = qr(e.z)), e.p !== void 0 && (a.places = St(e.p).map(jn)), Gn(e, a);
  }
  if (e.f !== void 0) {
    const a = { kind: "float", frames: St(e.f).map((s) => !oa(s) || s.n === void 0 ? Me() : { node: kn(s.n), ...jn(s) }) };
    return Gn(e, a);
  }
  return Me();
}
const Vr = /[ '!:(),*@$]/, Kf = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
function Ms(e) {
  return e !== "" && !Vr.test(e) && !/^[-\d]/.test(e) ? e : `'${e.replace(/[!']/g, (n) => `!${n}`)}'`;
}
function ia(e) {
  return e === null ? "!n" : e === !0 ? "!t" : e === !1 ? "!f" : typeof e == "number" ? Number.isFinite(e) ? String(e) : "!n" : typeof e == "string" ? Ms(e) : Array.isArray(e) ? `!(${e.map(ia).join(",")})` : `(${Object.entries(e).map(([t, n]) => `${Ms(t)}:${ia(n)}`).join(",")})`;
}
function Wf(e) {
  let t = 0;
  const n = () => e[t], a = (o) => e[t++] === o ? void 0 : Me(), s = () => {
    if (n() === "'") {
      t++;
      let l = "";
      for (; ; ) {
        const c = e[t++];
        if (c === void 0) return Me();
        if (c === "'") return l;
        if (c === "!") {
          const d = e[t++];
          d !== "!" && d !== "'" && Me(), l += d;
        } else l += c;
      }
    }
    const o = t;
    for (; t < e.length && !Vr.test(e[t]); ) t++;
    return t === o && Me(), e.slice(o, t);
  }, r = () => {
    const o = n();
    if (o === "(") {
      t++;
      const c = {};
      if (n() === ")")
        return t++, c;
      for (; ; ) {
        const d = s();
        a(":"), c[d] = r();
        const m = e[t++];
        if (m === ")") return c;
        m !== "," && Me();
      }
    }
    if (o === "!") {
      t++;
      const c = e[t++];
      if (c === "t") return !0;
      if (c === "f") return !1;
      if (c === "n") return null;
      if (c !== "(") return Me();
      const d = [];
      if (n() === ")")
        return t++, d;
      for (; ; ) {
        d.push(r());
        const m = e[t++];
        if (m === ")") return d;
        m !== "," && Me();
      }
    }
    if (o === "'") return s();
    const l = s();
    return Kf.test(l) ? Number(l) : l;
  }, i = r();
  return t !== e.length && Me(), i;
}
function Ss(e) {
  return ia(la(e));
}
function Hf(e) {
  try {
    return kn(Wf(e));
  } catch (t) {
    if (t instanceof Br) return null;
    throw t;
  }
}
function Es(e, t) {
  for (const n of e.replace(/^[?]/, "").split("&")) {
    const a = n.indexOf("="), s = a === -1 ? n : n.slice(0, a);
    if (Wa(s) === t) return a === -1 ? "" : n.slice(a + 1);
  }
  return null;
}
function Uf(e, t, n) {
  const a = e.replace(/^[?]/, "").split("&").filter(Boolean), s = a.findIndex((i) => {
    const o = i.indexOf("=");
    return Wa(o === -1 ? i : i.slice(0, o)) === t;
  }), r = n === null ? null : `${encodeURIComponent(t)}=${n}`;
  return s === -1 ? r && a.push(r) : r ? a[s] = r : a.splice(s, 1), a.length ? `?${a.join("&")}` : "";
}
function Wa(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e;
  }
}
const jf = [
  [/%2C/g, ","],
  [/%3A/g, ":"],
  [/%2F/g, "/"],
  [/%40/g, "@"],
  [/%24/g, "$"],
  [/%20/g, "+"]
], Gf = (e) => {
  let t = encodeURIComponent(e);
  for (const [n, a] of jf) t = t.replace(n, a);
  return t;
};
function mp(e, t) {
  const { adapter: n } = t, a = t.param ?? "w", s = t.delay ?? 200, r = () => Et(t.home) ?? null;
  let i = Es(n.search.value, a), o = null;
  const l = () => {
    o !== null && clearTimeout(o), o = null;
  }, c = (g) => g === null ? r() : Hf(Wa(g)) ?? r(), d = () => {
    l();
    const g = e.value, y = r(), b = g ? Ss(g) : null, x = b === null || y && b === Ss(y) ? null : Gf(b);
    i = x;
    const w = Uf(n.search.value, a, x);
    w !== n.search.value && n.replace(w);
  }, m = c(i);
  return m && (e.value = m), ye(e, () => {
    l(), o = setTimeout(d, s);
  }), ye(n.search, (g) => {
    const y = Es(g, a);
    if (y === i) return;
    l(), i = y;
    const b = c(y);
    b && (e.value = b);
  }), Pn() && Zt(() => o !== null ? d() : void 0), { flush: () => o !== null ? d() : void 0 };
}
function hp(e = "", t = "/") {
  const n = W(nt(e)), a = W(t), s = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: s,
    push(r) {
      n.value = nt(r), s.push(`${a.value}${n.value}`);
    },
    replace(r) {
      n.value = nt(r), s[s.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function Ps(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return nt(a === -1 ? n : n.slice(0, a));
}
function gp(e) {
  const t = W(Ps(e.currentRoute.value.fullPath)), n = p(() => e.currentRoute.value.path), a = ye(
    () => e.currentRoute.value.fullPath,
    (s) => {
      t.value = Ps(s);
    }
  );
  return {
    search: t,
    path: n,
    push: (s) => e.push(`${n.value}${nt(s)}`),
    replace: (s) => e.replace(`${n.value}${nt(s)}`),
    dispose: a
  };
}
const Xf = {
  DataShell: Zu,
  ShellHeader: or,
  QueryPanel: cr,
  RecordActions: dr,
  ResultsArea: wr,
  FacetControl: ir,
  SegmentedControl: dd,
  StatusPill: nn,
  WindowFrame: Df,
  WindowPane: Dr,
  ListView: ea,
  CardsView: pr,
  GridView: vr,
  ImagesView: mr,
  TableView: _r,
  LinksView: hr,
  PreviewView: gr,
  TypeCardsView: yr
}, _p = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, s] of Object.entries(Xf))
      e.component(`${n}${a}`, s);
    t.route && e.provide(zs, t.route);
  }
};
export {
  Sn as CASCADE_STEP,
  Jf as COLUMN_BREAKPOINTS,
  Zf as COLUMN_ROLES,
  pr as CardsView,
  hs as ColumnCell,
  pl as DEFAULT_ENTITY_VIEW,
  ht as DEFAULT_FRAME,
  Xn as DEFAULT_SORT,
  fl as DEFAULT_VIEW,
  io as DRAFT_DELAY,
  Zu as DataShell,
  Qn as EMPTY_CELL,
  ar as ENTITY_ALL,
  Mn as ENTITY_TERM,
  Yt as EXPRESSION_TERM,
  Sa as FACET_PREFIX,
  ir as FacetControl,
  vr as GridView,
  _p as HeaderContentLayoutPlugin,
  mr as ImagesView,
  hr as LinksView,
  ea as ListView,
  Mt as MINIMIZED_GAP,
  br as MINIMIZED_HEIGHT,
  ta as MINIMIZED_WIDTH,
  kr as MIN_FRAME,
  us as MOCK_TINTS,
  ap as MenuBar,
  Ta as MenuButton,
  Pa as MenuList,
  an as MetricDrill,
  Va as PANE_CONTEXT_KEY,
  xa as PARAM_DIR,
  ka as PARAM_ENTITY,
  Ca as PARAM_EXPR,
  Ma as PARAM_PAGE,
  $a as PARAM_SORT,
  ba as PARAM_VIEW,
  Aa as PinStar,
  gr as PreviewView,
  Ln as QueryMark,
  cr as QueryPanel,
  dn as RECORD_STATUSES,
  ha as RESULT_FIELDS,
  zs as ROUTE_ADAPTER_KEY,
  dr as RecordActions,
  wr as ResultsArea,
  nr as SHELL_CONTEXT_KEY,
  Yf as SHELL_THEMES,
  sn as ScopeMark,
  dd as SegmentedControl,
  bt as SelectTick,
  np as ShellCard,
  or as ShellHeader,
  gs as StandingControl,
  nn as StatusPill,
  _r as TableView,
  yr as TypeCardsView,
  Ls as VIEW_KINDS,
  vl as VIEW_LABELS,
  qa as WINDOW_CONTEXT_KEY,
  Df as WindowFrame,
  Dr as WindowPane,
  xr as activePanel,
  $t as activeTab,
  wa as addTerm,
  ga as andExpression,
  yd as axisOf,
  Ra as cascade,
  Vs as cellFull,
  en as cellText,
  gn as cellTextOf,
  Oe as cellValue,
  Ja as changesResults,
  Kn as clampRect,
  zr as collapseSpace,
  Ad as collapseToTabs,
  rp as column,
  ts as columnAlign,
  ns as columnClass,
  es as columnKey,
  Ws as columnShortcut,
  Al as columnShortcutOf,
  Yn as columnTruncates,
  wl as columnsFor,
  hl as countPages,
  dl as createHistoryAdapter,
  hp as createMemoryAdapter,
  Gl as createMockDataSource,
  gp as createVueRouterAdapter,
  Hf as decodeLayout,
  $l as defaultCellText,
  Cs as defaultLayout,
  ma as defaultQuery,
  Xt as defaultViewFor,
  Xl as drillExpression,
  bs as dropIntoSpace,
  Nt as emptyFacetState,
  fa as emptyFacetValue,
  Ss as encodeLayout,
  Ys as excludingTerm,
  Cn as expandShortcuts,
  Pt as findEntity,
  it as findSort,
  op as fixedView,
  La as float,
  ks as floatPanel,
  Rr as floatSplit,
  Td as floatTabs,
  hn as fnv1a,
  Fs as focusEntity,
  Ct as formatCount,
  _l as formatDate,
  at as formatExpression,
  gl as formatMetric,
  yl as formatOrdinal,
  tn as formatTerm,
  Rn as frame,
  vt as frameAt,
  Se as frameOf,
  sa as framePathOf,
  Le as frontPanel,
  Hl as generateRows,
  sp as group,
  Tt as groupOf,
  wd as groups,
  Os as hasActiveFacets,
  fe as hasPanel,
  lp as headless,
  Kt as insertPanel,
  Ht as isChoosable,
  ep as isEntityScoped,
  Ds as isFacetActive,
  oe as isFloat,
  Y as isGroup,
  ot as isMaximized,
  mt as isMinimized,
  _e as isPanelTab,
  pa as isPristineQuery,
  Ot as isSplit,
  De as isTabOf,
  va as isTypeCardsQuery,
  Rs as isViewKind,
  is as joinExpression,
  Js as liftTerm,
  Ll as matchesExpression,
  Ul as matchesFacets,
  bd as maximizeFrame,
  xd as maximizeFrameAt,
  Rd as mergeSpace,
  $d as minimizeFrame,
  Cd as minimizeFrameAt,
  pn as movePanel,
  jt as moveTab,
  tp as negateTerm,
  ct as nodeAt,
  Gt as nodeTitle,
  Ce as normalizeLayout,
  nt as normalizeSearch,
  Oa as normalizeSizes,
  Ir as onlySpace,
  Qt as oppositeTerm,
  rt as panelIds,
  Je as panelNode,
  _s as panelTabs,
  Re as parseExpression,
  ao as parseQuery,
  Ai as presentParts,
  fr as presentRow,
  qe as pressOptions,
  Nr as providePaneContext,
  Ql as provideShellContext,
  Nd as provideWindowContext,
  Wn as raiseFrame,
  Ut as raiseFrameAt,
  Md as raisedPath,
  Dl as readDraft,
  Bs as reconcileFacets,
  Id as reconcileLayout,
  Qs as recordTerm,
  Zn as refineExpression,
  gt as removePanel,
  _t as replaceAt,
  ys as resizeRect,
  xs as resizeSplit,
  da as resolveView,
  He as roleColumn,
  qs as roleColumns,
  En as rootSpace,
  Ia as row,
  bl as rowKey,
  Tn as sameTerm,
  _a as scopeTerm,
  ya as scopeTermFor,
  tr as scopedEntity,
  ps as serializeQuery,
  Lt as setActivePanel,
  kd as setFrameRect,
  ws as setFrameRectAt,
  wn as setSizesAt,
  up as setSplitDirection,
  st as sizesOf,
  Ns as sortsFor,
  $e as spaceChrome,
  Dt as spaceTitle,
  Fa as split,
  Fl as splitExpression,
  $s as spreadTabs,
  ro as summarizeQuery,
  Ea as summaryTerms,
  yn as swapPanels,
  za as tabNode,
  ln as tabPanels,
  Zs as termStanding,
  Fr as tileFloat,
  dp as toFloat,
  fp as toTiled,
  ip as toggleMaximized,
  cp as toggleMinimized,
  Zc as useColumns,
  co as useDraft,
  Mo as useEntityCounts,
  yu as useEntityPreviews,
  mp as useLayoutRoute,
  pp as usePaneContext,
  vp as usePaneMenu,
  kt as usePresentedRows,
  lo as useQueryState,
  Po as useRecordNames,
  oo as useResults,
  be as useShellContext,
  In as useWindowContext,
  Za as viewAcross,
  ds as withStanding,
  er as withoutOwnScope,
  Rl as withoutTerm
};
