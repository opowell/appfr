import { ref as K, computed as p, inject as St, provide as ln, getCurrentInstance as as, shallowRef as ft, toValue as ut, watch as $e, onScopeDispose as Dt, getCurrentScope as Vn, defineComponent as oe, useSlots as cn, onBeforeUnmount as Ne, openBlock as f, createElementBlock as h, createElementVNode as C, unref as T, renderSlot as we, toDisplayString as B, Fragment as ne, renderList as he, createCommentVNode as L, withModifiers as Je, normalizeClass as Ve, withDirectives as en, withKeys as bn, normalizeStyle as Me, vModelText as Wo, nextTick as yt, onMounted as un, resolveComponent as rs, createBlock as X, useId as Kn, Teleport as Wn, createVNode as fe, createTextVNode as Le, withCtx as Pe, reactive as Cr, resolveDynamicComponent as jn, createSlots as Ea, useModel as Ln, onBeforeUpdate as jo, normalizeProps as Uo, guardReactiveProps as Go, mergeModels as Tn, vShow as On, Comment as Yo, Text as Xo, readonly as Qo, mergeProps as Zo, h as Jo, watchEffect as el } from "vue";
const ss = Symbol("dc.routeAdapter");
function De(e) {
  if (!e) return "";
  const t = e.replace(/^[?]/, "");
  return t ? `?${t}` : "";
}
function tl() {
  const e = typeof window < "u", t = K(e ? De(window.location.search) : ""), n = K(e ? window.location.pathname : "/"), a = () => {
    t.value = De(window.location.search), n.value = window.location.pathname;
  };
  e && window.addEventListener("popstate", a);
  const r = (s, l, i) => {
    const o = De(s);
    if (!e) {
      t.value = o, i !== void 0 && (n.value = i);
      return;
    }
    const c = i === void 0 || i === window.location.pathname ? `${window.location.pathname}${o}${window.location.hash}` : `${i}${o}`;
    l === "push" ? window.history.pushState(window.history.state, "", c) : window.history.replaceState(window.history.state, "", c), t.value = o, n.value = window.location.pathname;
  };
  return {
    search: t,
    path: n,
    href(s, l) {
      return e ? l !== void 0 && l !== window.location.pathname ? `${l}${De(s)}` : `${window.location.pathname}${De(s)}${window.location.hash}` : `${l ?? n.value}${De(s)}`;
    },
    push: (s, l) => r(s, "push", l),
    replace: (s, l) => r(s, "replace", l),
    dispose: () => {
      e && window.removeEventListener("popstate", a);
    }
  };
}
function nl(e, t) {
  const n = p(t.detached), a = p(() => n.value ? "" : e.search.value), r = p(() => n.value ? t.path() : e.path.value);
  return {
    search: a,
    path: r,
    push(s, l) {
      n.value ? e.push(s, l ?? t.path()) : e.push(s, l);
    },
    replace(s, l) {
      n.value ? e.push(s, l ?? t.path()) : e.replace(s, l);
    },
    href(s, l) {
      const i = l ?? (n.value ? t.path() : void 0);
      return e.href ? e.href(s, i) : `${i ?? e.path.value}${De(s)}`;
    }
  };
}
const os = ["list", "cards", "grid", "images", "table", "links", "preview"], Lv = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], Ut = ["ok", "running", "queued", "review", "failed"], Tv = [...Ut, "neutral", "accent"], Ov = [
  "identity",
  "reference",
  "metric",
  "state",
  "updated",
  "image",
  "tint"
], Rv = [480, 620, 760, 900, 1100];
function Yt(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return Math.abs(t);
}
function al(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.abs(e);
  return t >= 1e6 ? `${(e / 1e6).toFixed(1)}m` : t >= 1e3 ? `${(e / 1e3).toFixed(1)}k` : String(Math.round(e));
}
function Rn(e) {
  if (!Number.isFinite(e)) return "—";
  const t = Math.round(e), n = Math.abs(t);
  return n < 1e3 ? String(t) : n < 9950 ? `${(t / 1e3).toFixed(1)}k` : n < 999500 ? `${Math.round(t / 1e3)}k` : `${(t / 1e6).toFixed(1)}m`;
}
function Wt(e) {
  return Number.isFinite(e) ? Math.round(e).toLocaleString("en-US") : "—";
}
function rl(e) {
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "—";
  const n = String(t.getUTCDate()).padStart(2, "0"), a = String(t.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${a}.${t.getUTCFullYear()}`;
}
function sl(e, t = !1) {
  const n = String(e + 1);
  return t ? n : n.padStart(2, "0");
}
function zv(e, t) {
  if (!e) return "—";
  const n = new Date(e);
  return Number.isNaN(n.getTime()) ? "—" : n.toLocaleString(t, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function ol(e) {
  if (e == null || !Number.isFinite(e) || e < 0) return "—";
  if (e < 1e3) return `${e} B`;
  const t = ["kB", "MB", "GB", "TB"];
  let n = e, a = -1;
  for (; n >= 1e3 && a < t.length - 1; )
    n /= 1e3, a += 1;
  return `${n < 100 ? n.toFixed(1) : Math.round(n)} ${t[a]}`;
}
function ll(e) {
  if (!e || !Number.isFinite(e)) return "—";
  if (e < 1e3) return `${Math.round(e)}ms`;
  const t = e / 1e3;
  return t < 60 ? `${t.toFixed(1)}s` : `${Math.floor(t / 60)}m ${Math.round(t % 60)}s`;
}
function il(e) {
  if (e == null || !Number.isFinite(e) || e <= 0)
    return "—";
  const t = Math.floor(e / 60);
  return t ? `${t}:${String(e % 60).padStart(2, "0")}` : `${e}s`;
}
function cl(e) {
  return e == null || !Number.isFinite(e) ? "—" : `${Math.round(e * 100)}%`;
}
function ul(e) {
  return e.replace(/\x1b\[[0-9;?]*[ -/]*[@-~]/g, "");
}
const dl = "cards", fl = "table";
function tn(e, t = {}) {
  const n = (r) => r && ls(r) ? r : void 0;
  if (e === null) return n(t.view) ?? dl;
  const a = t.landing === "entity" ? n(t.view) : void 0;
  return n(t.entityView) ?? a ?? fl;
}
function Er(e, t, n, a = {}) {
  return e === tn(t, a) ? tn(n, a) : e;
}
const Pa = "updated";
function ls(e) {
  return typeof e == "string" && os.includes(e);
}
const pl = {
  list: "List",
  cards: "Cards",
  grid: "Grid",
  images: "Images",
  table: "Table",
  links: "Links",
  preview: "Preview"
};
function ja(e, t) {
  const [n] = t ?? [];
  return n === void 0 || t?.includes(e) ? e : n;
}
function Aa(e) {
  return typeof e.count == "number" ? Rn(e.count) : e.count;
}
function nn(e, t) {
  return t ? e.entities.find((n) => n.key === t) ?? null : null;
}
function is(e, t = {}) {
  const n = nn(e, t.entity), a = e.entities[0];
  if (!n && !a) throw new Error(`Schema "${e.key}" declares no entities`);
  return n ?? a;
}
function cs(e, t = null) {
  return e?.columns ?? t?.columns ?? [];
}
function Un(e, t = null) {
  if (e?.sorts?.length) return e.sorts;
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const r of cs(e, t))
    !r.sort || n.has(r.sort) || (n.add(r.sort), a.push({ key: r.sort, label: (r.label ?? r.sort).toLowerCase() }));
  return a;
}
const vl = { key: Pa, label: Pa };
function mt(e, t, n = null) {
  const a = Un(e, n);
  return (t ? a.find((s) => s.key === t) : void 0) ?? a.find((s) => s.key === Pa) ?? a[0] ?? vl;
}
function hl(e) {
  switch (e.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function ml(e) {
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
function Ua(e) {
  return e.entity === null && e.expr.trim() === "";
}
function Iv(e) {
  return e.entity !== null;
}
function Ga(e, t) {
  return e.entity === null && ja(e.view, t) === "cards";
}
function gl(e, t) {
  return t <= 0 ? 1 : Math.max(1, Math.ceil(e / t));
}
function Ya(e, t = {}) {
  const a = t.landing === "entity" ? is(e, t) : null;
  return {
    entity: a?.key ?? null,
    view: tn(a?.key ?? null, t),
    sort: mt(a, t.sort).key,
    dir: t.dir === "asc" ? "asc" : "desc",
    expr: "",
    page: 1
  };
}
const Xa = ["entity", "sort", "dir", "expr"];
function va(e) {
  return Xa.some((t) => t in e);
}
const it = "—";
function Ze(e, t) {
  return e.find((n) => n.role === t);
}
function us(e, t) {
  return e.filter((n) => n.role === t);
}
function yl(e, t) {
  const n = (t ? t.columns : e?.columns) ?? [], a = t ? "scoped" : "everything";
  return n.filter(
    (r) => r.role !== "tint" && ((r.when ?? "always") === "always" || r.when === a)
  );
}
const _l = ["id", "entityKey", "entityLabel"];
function He(e, t) {
  if (e.value) return e.value(t);
  const n = e.field ?? e.key;
  if (n !== void 0) {
    if (t.fields && n in t.fields) return t.fields[n];
    if (_l.includes(n))
      return t[n];
  }
}
function Pr(e, t) {
  const n = e.key ?? e.field ?? e.label;
  return n?.trim() ? n.trim() : `column-${t}`;
}
function wl(e, t) {
  return e.id?.trim() ? e.id : `${e.entityKey || "row"}-${t}`;
}
function kl(e, t) {
  if (e == null || e === "") return it;
  if (t === "number") {
    const n = typeof e == "number" ? e : Number(e);
    return Number.isFinite(n) ? al(n) : String(e);
  }
  return t === "date" ? rl(String(e)) : Array.isArray(e) ? e.length ? e.join(", ") : it : String(e);
}
function Bt(e, t) {
  const n = He(e, t);
  return e.format ? e.format(n, t) : kl(n, e.kind);
}
function bl(e) {
  return typeof e == "number" ? Number.isFinite(e) ? String(e) : "" : typeof e == "string" ? e : Array.isArray(e) ? e.join(", ") : "";
}
function ds(e, t) {
  const n = Bt(e, t), a = bl(He(e, t));
  return a && a !== n ? a : n;
}
function Sn(e, t) {
  return e ? Bt(e, t) : "";
}
function Ar(e) {
  return e.align ? e.align : e.kind === "number" || e.kind === "ordinal" ? "right" : "left";
}
const $l = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function Lr(e) {
  return [$l[e.kind ?? "text"], e.class].filter(Boolean).join(" ");
}
function La(e) {
  if (e.truncate !== void 0) return e.truncate;
  const t = e.kind ?? "text";
  return t === "text" || t === "number" || t === "date";
}
const xl = /^([A-Za-z_][\w.-]*)\s*(>=|<=|:|=|>|<)\s*(.*)$/, Tr = "-?(?:\\d+\\.?\\d*|\\.\\d+)", Ml = new RegExp(`^(${Tr})?\\.\\.(${Tr})?$`);
function Gn(e) {
  const t = Ml.exec(e.trim());
  if (!t || t[1] === void 0 && t[2] === void 0) return null;
  const n = t[1] === void 0 ? null : Number(t[1]), a = t[2] === void 0 ? null : Number(t[2]);
  return n !== null && a !== null && n > a ? { min: a, max: n } : { min: n, max: a };
}
function Sl(e) {
  return `${e.min ?? ""}..${e.max ?? ""}`;
}
function an(e) {
  return e.kind === "field" && (e.comparator === ":" || e.comparator === "=") && Gn(e.value) !== null;
}
function Cl(e) {
  const t = [];
  let n = "", a = null;
  const r = () => {
    n && t.push(n), n = "";
  };
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (a) {
      l === a ? a = null : n += l;
      continue;
    }
    if (l === '"' || l === "'") {
      a = l;
      continue;
    }
    if (/\s/.test(l)) {
      if (/(?:>=|<=|[:=><])$/.test(n) || e.slice(s + 1).match(/^\s*(>=|<=|[:=><])/) && n) continue;
      r();
      continue;
    }
    n += l;
  }
  return r(), t;
}
function Te(e) {
  const t = e.trim();
  if (!t) return [];
  const n = [];
  let a = [];
  for (const r of Cl(t)) {
    const s = r.toUpperCase();
    if (s === "AND" || s === "&&") continue;
    if (s === "OR" || s === "||") {
      a.length && n.push(a), a = [];
      continue;
    }
    const l = r.length > 1 && r.startsWith("-"), i = l ? r.slice(1) : r, o = l ? { negated: !0 } : {}, c = xl.exec(i);
    c && c[3] !== "" ? a.push({
      kind: "field",
      field: c[1].toLowerCase(),
      comparator: c[2],
      value: c[3],
      ...o
    }) : a.push({ kind: "text", value: i, ...o });
  }
  return a.length && n.push(a), n;
}
const gt = (e) => e.toLowerCase().replace(/\s+/g, ""), fs = [
  ["status", "state"],
  ["state", "state"],
  ["updated", "updated"],
  ["date", "updated"],
  ["name", "identity"],
  ["ref", "reference"]
];
function El(e, t, n) {
  const a = gt(e), r = n.columns ?? [];
  if (a === "entity") return t.entityKey;
  if (e in t.fields) return t.fields[e];
  const s = r.find(
    (c) => c.key?.toLowerCase() === e.toLowerCase() || c.field?.toLowerCase() === e.toLowerCase() || c.label !== void 0 && gt(c.label) === a
  );
  if (s) return He(s, t);
  const l = n.facets.find(
    (c) => c.key.toLowerCase() === a || gt(c.label) === a
  );
  if (l && l.key in t.fields) return t.fields[l.key];
  const i = fs.find(([c]) => c === a)?.[1];
  if (i) {
    const c = Ze(r, i);
    if (c) return He(c, t);
  }
  const o = /^metric(\d+)$/.exec(a);
  if (o) {
    const c = us(r, "metric")[Number(o[1]) - 1];
    if (c) return He(c, t);
  }
}
function dn(e) {
  return (e.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).map((t) => t.charAt(0)).join("");
}
const Or = /^[a-z_][\w.-]*$/;
function Yn(e) {
  const t = (e.key ?? e.field)?.toLowerCase();
  if (t !== void 0) return Or.test(t) ? t : void 0;
  const n = e.label === void 0 ? void 0 : gt(e.label);
  return n !== void 0 && Or.test(n) ? n : void 0;
}
function Qa(e, t) {
  const n = gt(e);
  return !!t?.entities.some((a) => a.scope && gt(a.scope) === n);
}
function Pl(e, t, n) {
  const a = gt(e);
  if (a === "entity" || fs.some(([s]) => s === a) || /^metric\d+$/.test(a) || Qa(e, n)) return !0;
  const r = (s) => s !== void 0 && gt(s) === a;
  return (t.columns ?? []).some(
    (s) => r(s.key) || r(s.field) || r(s.label)
  ) || t.facets.some((s) => r(s.key) || r(s.label));
}
function rn(e, t, n) {
  return t ? vs(e, (a) => {
    const r = hs(a, t, n);
    return r && Yn(r);
  }) : e;
}
function ps(e, t, n) {
  return t ? vs(e, (a) => {
    if (Qa(a, n)) return;
    const r = (t.columns ?? []).find((s) => Yn(s) === a);
    return r && ms(r, t, n);
  }) : e;
}
function Al(e, t, n) {
  if (!t || Qa(e, n)) return;
  const a = t.facets.find((r) => r.key.toLowerCase() === e);
  return a ? a.label : (t.columns ?? []).find((r) => Yn(r) === e)?.label;
}
function vs(e, t) {
  let n = !1;
  const a = Te(e).map(
    (r) => r.map((s) => {
      if (s.kind !== "field") return s;
      const l = t(s.field);
      return !l || l === s.field ? s : (n = !0, { ...s, field: l });
    })
  );
  return n ? ot(a) : e;
}
function hs(e, t, n) {
  if (!(!e || Pl(e, t, n)))
    return (t.columns ?? []).find(
      (a) => a.label !== void 0 && dn(a.label) === e
    );
}
function ms(e, t, n) {
  if (!t || e.label === void 0 || !Yn(e)) return;
  const a = dn(e.label);
  return hs(a, t, n) === e ? a : void 0;
}
function ha(e, t) {
  const n = e.toLowerCase(), a = t.toLowerCase();
  if (!a.includes("*")) return n.includes(a);
  const r = a.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(r).test(n);
}
function Rr(e, t) {
  return e.toLowerCase() === t.toLowerCase();
}
function Ll(e, t, n, a) {
  if (e.kind === "text") {
    const o = n.columns ?? [];
    return ["identity", "reference"].some((c) => {
      const u = Ze(o, c), m = u ? He(u, t) : void 0;
      return typeof m == "string" && ha(m, e.value);
    });
  }
  const r = El(e.field, t, n);
  if (r === void 0) return a?.has(e.field) ? !1 : null;
  const s = an(e) ? Gn(e.value) : null;
  if (s) {
    if (Array.isArray(r) || typeof r == "boolean") return null;
    const o = typeof r == "number" ? r : Number(r);
    return Number.isFinite(o) ? (s.min === null || o >= s.min) && (s.max === null || o <= s.max) : null;
  }
  if (Array.isArray(r))
    return e.comparator === ":" || e.comparator === "=" ? r.some(
      (c) => e.comparator === "=" ? Rr(String(c), e.value) : ha(String(c), e.value)
    ) : null;
  if (e.comparator === ":" || e.comparator === "=") {
    if (typeof r == "boolean") {
      const o = e.value.toLowerCase();
      return o === "true" || o === "yes" ? r : o === "false" || o === "no" ? !r : null;
    }
    if (typeof r == "number") {
      const o = Number(e.value);
      return Number.isFinite(o) ? r === o : null;
    }
    return e.comparator === "=" ? Rr(String(r), e.value) : ha(String(r), e.value);
  }
  const l = Number(e.value), i = typeof r == "number" ? r : Number(r);
  return !Number.isFinite(l) || !Number.isFinite(i) ? null : Tl(e.comparator, i, l);
}
function zr(e, t, n, a) {
  const r = Ll(e, t, n, a);
  return r === null ? !0 : e.negated ? !r : r;
}
function Tl(e, t, n) {
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
function Ir(e) {
  return e.kind === "field" && !e.negated && (e.comparator === ":" || e.comparator === "=") && !an(e);
}
const Nr = /* @__PURE__ */ new WeakMap();
function Ol(e) {
  if (!e?.strictScopes) return null;
  let t = Nr.get(e);
  return t || (t = new Set(
    e.entities.flatMap((n) => n.scope ? [n.scope.toLowerCase()] : [])
  ), Nr.set(e, t)), t;
}
function Rl(e, t, n, a) {
  if (!e.length) return !0;
  const r = Ol(a);
  return e.some((s) => {
    const l = /* @__PURE__ */ new Map();
    for (const i of s)
      Ir(i) && l.set(
        i.field,
        (l.get(i.field) ?? !1) || zr(i, t, n, r)
      );
    return s.every(
      (i) => Ir(i) ? l.get(i.field) === !0 : zr(i, t, n, r)
    );
  });
}
function Br(e) {
  return /[\s"']/.test(e) ? `"${e.replace(/["']/g, "")}"` : e;
}
function $t(e) {
  const t = e.negated ? "-" : "";
  return e.kind === "text" ? t + Br(e.value) : `${t}${e.field}${e.comparator}${Br(e.value)}`;
}
function zl(e) {
  if (!e.negated) return { ...e, negated: !0 };
  const { negated: t, ...n } = e;
  return n;
}
function ot(e) {
  return e.filter((t) => t.length).map((t) => t.map($t).join(" ")).join(" OR ");
}
function Il(e, t, n) {
  return e.map((a, r) => r === t ? a.filter((s, l) => l !== n) : a).filter((a) => a.length);
}
function Nv(e) {
  const t = Te(e);
  if (t.length > 1) return { parts: [], text: e.trim() };
  const n = t[0] ?? [];
  return {
    parts: n.filter((a) => a.kind === "field"),
    text: n.filter((a) => a.kind === "text").map($t).join(" ")
  };
}
function Bv(e, t) {
  return [...e.map($t), t.trim()].filter(Boolean).join(" ");
}
const Fr = (e, t) => e.toLowerCase() === t.toLowerCase();
function Ta(e, t) {
  return !!e.negated == !!t.negated && gs(e, t);
}
function Nl(e, t) {
  return !!e.negated != !!t.negated && gs(e, t);
}
function gs(e, t) {
  return e.kind === "field" ? t.kind === "field" && e.field === t.field && e.comparator === t.comparator && Fr(e.value, t.value) : t.kind === "text" && Fr(e.value, t.value);
}
function Bl(e, t) {
  return t.filter((n) => !e.some((a) => Ta(a, n)));
}
function Za(e, t) {
  return ys(e, t, (n) => n);
}
function Oa(e, t) {
  return ys(
    e,
    t,
    (n, a) => n.filter((r) => !a.some((s) => Nl(r, s)))
  );
}
const Fl = /^[A-Za-z_][\w.-]*\s*(?:>=|<=|:|=|>|<)$/;
function Dl(e) {
  return ot(
    Te(e).map(
      (t) => t.filter(
        (n) => n.kind !== "text" || n.value !== "-" && !Fl.test(n.value)
      )
    ).filter((t) => t.length > 0)
  );
}
function ys(e, t, n) {
  const a = Te(e), r = Te(t);
  return a.length ? r.length ? ot(
    a.flatMap(
      (s) => r.map((l) => [...n(s, l), ...Bl(s, l)])
    )
  ) : ot(a) : ot(r);
}
const _s = (e) => e.kind === "date" || e.role === "updated";
function Hl(e) {
  if (!e) return () => 0;
  const n = (e.kind ?? "text") === "number" || e.role === "metric", a = _s(e);
  return (r, s) => {
    const l = He(e, r), i = He(e, s);
    return n ? Number(i ?? 0) - Number(l ?? 0) : a ? Date.parse(String(i ?? "")) - Date.parse(String(l ?? "")) : String(i ?? "").localeCompare(String(l ?? ""));
  };
}
function Dr(e, t) {
  return !t || !_s(t) ? !1 : !Number.isFinite(Date.parse(String(He(t, e) ?? "")));
}
function ws({ query: e, schema: t, entity: n, limit: a, offset: r }, s, l) {
  const i = Te(e.expr), o = n ? [n] : t.entities;
  let c = 0;
  const u = [];
  for (const M of o)
    for (const y of s(M))
      c += 1, Rl(i, y, M, t) && u.push(y);
  const m = mt(n, e.sort, t), $ = cs(n, t).find((M) => M.sort === m.key), w = l.undatedLast ? u.filter((M) => !Dr(M, $)) : u, k = l.undatedLast ? u.filter((M) => Dr(M, $)) : [];
  w.sort(Hl($)), e.dir === "asc" && w.reverse();
  const g = k.length ? [...w, ...k] : w;
  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows: l.zeroIsAll && a <= 0 ? g.slice(r) : g.slice(r, r + a),
    total: u.length,
    unfiltered: u.length === c
  };
}
const zn = [
  "oklch(0.36 0.06 240)",
  "oklch(0.34 0.07 290)",
  "oklch(0.36 0.06 160)",
  "oklch(0.38 0.06 80)",
  "oklch(0.35 0.07 30)",
  "oklch(0.34 0.05 200)"
];
function Fv(e) {
  return zn[Yt(e) % zn.length];
}
function ks(e, t) {
  return `${e}_${1e4 + t * 7}`;
}
const ql = 7, Vl = 3;
function Kl(e, t, n, a) {
  const r = (t * ql + Yt(n)) % a, s = [];
  for (let l = 0; l < Math.min(Vl, a); l++)
    s.push(ks(e, (r + l) % a));
  return s;
}
function Wl(e, t) {
  switch (e.kind) {
    case "chips":
      return e.multiple ? jl(e.options, t) : e.options[t % e.options.length] ?? "";
    case "range": {
      const n = Math.max(0, e.max - e.min);
      return e.min + (n === 0 ? 0 : t % (n + 1));
    }
    case "toggle":
      return t % 3 === 0;
  }
}
function jl(e, t) {
  if (!e.length) return [];
  const n = 1 + (t >> 5) % Math.min(3, e.length), a = t % e.length, r = /* @__PURE__ */ new Set();
  for (let s = 0; s < n; s++) r.add((a + s) % e.length);
  return [...r].sort((s, l) => s - l).map((s) => e[s]);
}
function Ul(e, t) {
  const { hash: n, sample: a, revision: r, updatedAt: s } = t, l = r ? ` · rev ${r + 1}` : "";
  switch (e.role) {
    case "identity":
      return `${a[0]}${l}`;
    case "reference":
      return r ? `${a[1]}-${r + 1}` : a[1];
    case "state":
      return Ut[n % Ut.length];
    case "updated":
      return s;
    case "tint":
      return zn[n % zn.length];
    case "metric":
      return 1 + n % 940;
  }
  switch (e.kind) {
    case "number":
      return 1 + n % 940;
    case "status":
      return Ut[n % Ut.length];
    case "date":
      return s;
    default:
      return;
  }
}
function Gl(e, t = {}) {
  const n = t.population ?? 48, a = t.seed ?? "", r = t.now ?? /* @__PURE__ */ new Date("2026-08-25T00:00:00Z"), s = e.samples, l = t.scopes ?? [];
  if (!s.length) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const c = s[o % s.length], u = Math.floor(o / s.length), m = Yt(`${a}:${e.key}:${c[0]}:${o}`), $ = ks(e.key, o), w = new Date(r.getTime() - m % 900 * 36e5).toISOString(), k = {};
    for (const g of e.columns ?? []) {
      const M = g.field ?? g.key;
      if (!M || g.value) continue;
      const y = Ul(g, {
        hash: Yt(`${m}:${M}`),
        sample: c,
        revision: u,
        updatedAt: w
      });
      y !== void 0 && (k[M] = y);
    }
    for (const g of e.facets)
      k[g.key] = Wl(g, Yt(`${m}:${g.key}`));
    for (const [g, M] of l)
      k[g] = M === e.key ? $ : Kl(M, o, g, n);
    i.push({ id: $, entityKey: e.key, entityLabel: e.label, fields: k });
  }
  return i;
}
function Yl(e = {}) {
  const t = /* @__PURE__ */ new Map(), n = (a, r) => {
    const s = t.get(a.key);
    if (s) return s;
    const l = e.scopes ?? r.entities.flatMap(
      (o) => o.scope ? [[o.scope, o.key]] : []
    ), i = Gl(a, { ...e, scopes: l });
    return t.set(a.key, i), i;
  };
  return {
    query(a) {
      return ws(a, (r) => n(r, a.schema), {
        undatedLast: !1,
        zeroIsAll: !1
      });
    }
  };
}
const Ht = "e", Xn = "v", Ja = "s", er = "d", Ct = "q", Qn = "p", bs = "*", Xl = [
  Ht,
  Xn,
  Ja,
  er,
  Ct,
  Qn
], Ql = [
  [/%3D/g, "="],
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
function In(e) {
  let t = encodeURIComponent(e);
  for (const [n, a] of Ql) t = t.replace(n, a);
  return t;
}
function st(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e.replace(/\+/g, " ");
  }
}
function tr(e) {
  const t = e.replace(/^[?]/, "");
  if (!t) return [];
  const n = [];
  for (const a of t.split("&")) {
    if (!a) continue;
    const r = a.indexOf("="), s = r === -1 ? a : a.slice(0, r), l = r === -1 ? "" : a.slice(r + 1);
    n.push([st(s), l]);
  }
  return n;
}
function Zl(e) {
  return Xl.includes(e);
}
function Zn(e, t) {
  if (!(!t || e.some((n) => n.key === t)))
    return e.find((n) => dn(n.label) === t);
}
function Jl(e, t) {
  const n = dn(e.label);
  return Zn(t.entities, n)?.key === e.key ? n : e.key;
}
function $s(e, t) {
  return t ? nn(e, t) ?? Zn(e.entities, t) ?? null : null;
}
function ei(e, t) {
  const n = dn(e.label);
  return Zn(t, n)?.key === e.key ? n : e.key;
}
function ti(e, t) {
  return t.some((n) => n.key === e) ? e : Zn(t, e)?.key ?? e;
}
function ni(e, t, n = {}) {
  const a = Ya(t, n), r = new Map(tr(e)), s = r.get(Ht), l = s === void 0 ? a.entity : st(s), i = l === bs ? null : $s(t, l), o = r.get(Xn), c = o && ls(st(o)) ? st(o) : tn(i?.key ?? null, n), u = r.get(Ja), m = mt(
    i,
    u ? ti(st(u), Un(i, t)) : n.sort,
    t
  ), $ = r.get(er), w = $ ? st($) === "asc" ? "asc" : "desc" : a.dir, k = r.get(Ct), g = r.get(Qn), M = g === void 0 ? 1 : Number(st(g)), y = Number.isFinite(M) ? Math.max(1, Math.floor(M)) : 1;
  return {
    entity: i?.key ?? null,
    view: c,
    sort: m.key,
    dir: w,
    expr: k === void 0 ? "" : rn(st(k), i, t),
    page: y
  };
}
function ma(e, t, n = {}, a = "") {
  const r = Ya(t, n), s = nn(t, e.entity), l = tr(a).filter(([m]) => !Zl(m)), i = [], o = (m, $) => i.push([m, In($)]), c = s?.key ?? null;
  if (c !== r.entity && o(Ht, s ? Jl(s, t) : bs), e.view !== tn(c, n) && o(Xn, e.view), e.sort !== r.sort) {
    const m = Un(s, t), $ = m.find((w) => w.key === e.sort);
    o(Ja, $ ? ei($, m) : e.sort);
  }
  e.dir !== r.dir && o(er, e.dir), e.expr.trim() !== "" && o(Ct, ps(e.expr, s, t)), e.page > 1 && o(Qn, String(e.page));
  const u = [
    ...l.map(([m, $]) => [In(m), $]),
    ...i
  ];
  return u.length ? `?${u.map(([m, $]) => $ === "" ? m : `${m}=${$}`).join("&")}` : "";
}
function Dv(e) {
  const t = [];
  for (const [n, a] of Object.entries(e))
    for (const r of Array.isArray(a) ? a : [a]) {
      if (typeof r != "string") continue;
      const s = In(n);
      t.push(r === "" ? s : `${s}=${In(r)}`);
    }
  return t.length ? `?${t.join("&")}` : "";
}
function Hv(e, t) {
  const n = new Map(tr(e)), a = n.get(Ct), r = a === void 0 ? "" : st(a);
  if (!t) return r;
  const s = n.get(Ht);
  return rn(
    r,
    s === void 0 ? null : $s(t, st(s)),
    t
  );
}
function Jn(e, t) {
  return xs(e, t.id);
}
function xs(e, t) {
  const n = e?.scope;
  return n ? Ms(n, t) : null;
}
function Ms(e, t) {
  return `${e}="${t.replace(/"/g, "")}"`;
}
function qv(e, t) {
  const n = typeof e == "string" ? e : e?.scope;
  if (!n) return null;
  const a = t.filter((r) => r.replace(/"/g, "") !== "").map((r) => Ms(n, r));
  return a.length ? a.join(" ") : null;
}
function ea(e, t) {
  if (e.kind !== "field" || t.kind !== "field") return Ta(e, t);
  const n = (a) => a.comparator === ":" || a.comparator === "=";
  return Ta(e, { ...t, comparator: n(e) && n(t) ? e.comparator : t.comparator });
}
function Nn(e, t) {
  return ea(e, zl(t));
}
function Bn(e, t) {
  return Jn(
    e.entities.find((n) => n.key === t.entityKey),
    t
  );
}
function fn(e, t) {
  if (!t) return e;
  const n = e.trim();
  if (!n) return t;
  const [a] = Te(t).flat();
  if (!a) return n;
  const r = Te(n);
  return r.some((i) => i.some((o) => ea(o, a))) ? n : r.some((i) => i.some((o) => Nn(o, a))) ? ot(
    r.map(
      (i) => i.map((o) => Nn(o, a) ? a : o)
    )
  ) : `${n} ${t}`;
}
function Ss(e) {
  if (!e) return null;
  const t = e.trim();
  return t ? t.startsWith("-") ? t.slice(1) : `-${t}` : null;
}
function nr(e, t) {
  if (!t || !e.trim()) return null;
  const [n] = Te(t).flat();
  if (!n) return null;
  const a = Te(e).flat();
  return a.some((r) => ea(r, n)) ? n.negated ? "out" : "in" : a.some((r) => Nn(r, n)) ? n.negated ? "in" : "out" : null;
}
function Cs(e, t) {
  if (!t || !e.trim()) return e;
  const [n] = Te(t).flat();
  if (!n) return e;
  const a = Te(e), r = a.map(
    (s) => s.filter((l) => !ea(l, n) && !Nn(l, n))
  );
  return r.every((s, l) => s.length === a[l]?.length) ? e : ot(r);
}
function Ra(e, t, n) {
  return t ? n === null ? Cs(e, t) : fn(e, n === "out" ? Ss(t) : t) : e;
}
function Es(e) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
}
function ta(e) {
  return e.altKey ? { exclude: !0 } : {};
}
function ga(e, t, n, a = {}) {
  const r = Bn(e, n);
  return fn(t.expr, a.exclude ? Ss(r) : r);
}
function Ps(e, t) {
  const n = e?.scope?.toLowerCase();
  if (!n || e?.keepsScope || !t.trim()) return t;
  const a = Te(t), r = a.map(
    (s) => s.filter((l) => l.kind !== "field" || l.field !== n)
  );
  return r.every((s, l) => s.length === a[l]?.length) ? t : ot(r);
}
function As(e, t) {
  const n = t.toLowerCase();
  return e.entities.find((a) => a.scope?.toLowerCase() === n) ?? null;
}
function Ls(e, t, n) {
  if (!t || !n) return null;
  const a = As(e, t);
  return a ? { entity: a, id: n } : null;
}
function ai(e, t) {
  const n = [], a = /* @__PURE__ */ new Set();
  for (const r of t)
    for (const s of Te(r).flat()) {
      if (s.kind !== "field" || s.negated) continue;
      const l = Ls(e, s.field, s.value);
      if (!l) continue;
      const i = `${l.entity.key}:${l.id.toLowerCase()}`;
      a.has(i) || (a.add(i), n.push({ entityKey: l.entity.key, id: l.id }));
    }
  return n;
}
function Vv(e, t, n = "cards") {
  return {
    // An expression with nothing in it is no parameter, as the shell writes it.
    [Ct]: fn(e, t) || void 0,
    [Ht]: void 0,
    [Xn]: n,
    [Qn]: void 0
  };
}
const Ts = Symbol("dc.shellContext");
function ri(e) {
  const t = e.liveQuery ? e : si(e);
  return ln(Ts, t), t;
}
function si(e) {
  const t = e.draft ?? K("");
  return {
    draft: t,
    liveQuery: e.query,
    drafting: p(() => !1),
    commitDraft() {
      const n = t.value.trim();
      n && (e.setExpression(
        Oa(e.query.value.expr, rn(n, e.entity.value, e.schema.value))
      ), t.value = "");
    },
    abandonDraft() {
      t.value = "";
    },
    ...e
  };
}
function Ee() {
  const e = St(Ts, null);
  if (!e)
    throw new Error(
      "[appfr] No shell context found. Render this component inside <DataShell>."
    );
  return e;
}
const Fn = Symbol("dc-shell-theme");
function za(e) {
  return {
    read: () => ({
      theme: ut(e.theme),
      accent: ut(e.accent),
      tokens: ut(e.tokens)
    })
  };
}
function oi(e, t) {
  t ? t.provide(Fn, za(e)) : ln(Fn, za(e));
}
function li(e) {
  const t = as();
  ln(Fn, {
    ...za(e),
    element: () => t?.proxy?.$el ?? null
  });
}
function ar(e) {
  const t = as(), n = St(Fn, null), a = ft(null);
  function r() {
    const o = t?.proxy?.$el, u = (o instanceof Element ? o : o?.parentElement)?.closest(".dc-shell");
    if (!u) {
      a.value = null;
      return;
    }
    const m = {};
    for (const $ of Array.from(u.style))
      $.startsWith("--") && (m[$] = u.style.getPropertyValue($));
    a.value = { shell: u, theme: u.dataset.dcTheme, tokens: m };
  }
  const s = p(() => {
    const o = a.value;
    if (!n) return o;
    const c = n.element?.();
    return o && c && o.shell !== c && c.contains(o.shell) ? o : n.read();
  }), l = p(() => e.theme ?? s.value?.theme ?? "minimal"), i = p(() => {
    const o = s.value, c = {
      ...o?.tokens,
      ...o?.accent ? { "--dc-accent": o.accent } : {},
      ...e.tokens,
      ...e.accent ? { "--dc-accent": e.accent } : {}
    };
    return Object.keys(c).length ? c : void 0;
  });
  return { theme: l, style: i, adopt: r };
}
function Os(e) {
  return e.key.toLowerCase();
}
const ii = /* @__PURE__ */ new Set([">", ">=", "<", "<="]);
function Rs(e, t) {
  if (e.kind !== "field" || e.negated || e.field !== Os(t)) return !1;
  const n = e.comparator === ":" || e.comparator === "=";
  switch (t.kind) {
    case "range":
      return an(e) || ii.has(e.comparator);
    case "chips":
      return n && !an(e) && zs(t.options, e.value) !== void 0;
    case "toggle":
      return n && ci(e.value);
  }
}
function zs(e, t) {
  const n = t.toLowerCase();
  return e.find((a) => a.toLowerCase() === n);
}
function ci(e) {
  const t = e.toLowerCase();
  return t === "true" || t === "yes";
}
function Is(e, t) {
  const n = (Te(e)[0] ?? []).filter((a) => Rs(a, t));
  switch (t.kind) {
    case "range": {
      let a = null, r = null;
      for (const s of n) {
        const l = Gn(s.value), i = Number(s.value);
        l ? (l.min !== null && (a = l.min), l.max !== null && (r = l.max)) : Number.isFinite(i) && (s.comparator.startsWith(">") ? a = i : r = i);
      }
      return { kind: "range", min: a, max: r };
    }
    case "chips": {
      const a = new Set(n.map((r) => zs(t.options, r.value)));
      return { kind: "chips", selected: t.options.filter((r) => a.has(r)) };
    }
    case "toggle":
      return { kind: "toggle", on: n.length > 0 };
  }
}
function ui(e, t) {
  const n = Os(e);
  switch (t.kind) {
    case "range":
      return t.min === null && t.max === null ? [] : [{ kind: "field", field: n, comparator: ":", value: Sl(t) }];
    case "chips":
      return t.selected.map((a) => ({ kind: "field", field: n, comparator: "=", value: a }));
    case "toggle":
      return t.on ? [{ kind: "field", field: n, comparator: ":", value: "true" }] : [];
  }
}
function Ns(e, t, n) {
  const a = ui(t, n), r = Te(e), s = (r.length ? r : [[]]).map((l) => [
    ...l.filter((i) => !Rs(i, t)),
    ...a
  ]);
  return ot(s);
}
function Kv(e, t) {
  return Ns(e, t, hl(t));
}
function di(e, t) {
  return (t?.facets ?? []).some((n) => ml(Is(e, n)));
}
const Dn = "entity", sn = "expr", fi = { ">=": "≥", "<=": "≤", ">": ">", "<": "<" };
function pi(e, t, n) {
  if (e.kind !== "field") return $t(e);
  const a = Al(e.field, t, n);
  if (a === void 0) return $t(e);
  const r = e.negated ? "-" : "", s = an(e) ? Gn(e.value) : null;
  if (s) {
    const i = s.min !== null && s.max !== null ? `${s.min} ≤ ${a} ≤ ${s.max}` : s.max !== null ? `${a} ≤ ${s.max}` : `${a} ≥ ${s.min}`;
    return r + i;
  }
  const l = fi[e.comparator];
  return l ? `${r}${a} ${l} ${e.value}` : $t({ ...e, field: a });
}
function rr(e, t, n = null) {
  const a = [];
  return t && a.push({
    id: Dn,
    label: `entity:${t.key}`,
    facetKey: Dn
  }), Te(e.expr).forEach((r, s) => {
    r.forEach((l, i) => {
      a.push({
        id: `${sn}:${s}:${i}`,
        label: pi(l, t, n),
        address: ps($t(l), t, n),
        facetKey: sn,
        group: s,
        index: i,
        ...l.kind === "field" ? { field: l.field, value: l.value } : {},
        ...l.negated ? { negated: !0 } : {}
      });
    });
  }), a;
}
function vi(e, t, n = null) {
  if (Ua(e)) {
    const s = mt(t, e.sort, n);
    return `everything · ${e.view} · ${s.label}`;
  }
  const a = rr(e, t).filter((s) => s.facetKey !== sn).map((s) => s.label), r = e.expr.trim();
  return r && a.push(`"${r}"`), a.join(" · ");
}
function hi(e) {
  const { adapter: t } = e, n = p(() => ut(e.schema)), a = p(() => ut(e.defaults) ?? {}), r = p(() => ni(t.search.value, n.value, a.value)), s = p(() => nn(n.value, r.value.entity)), l = p(() => s.value ?? is(n.value, a.value)), i = p(() => Un(s.value, n.value)), o = p(() => mt(s.value, r.value.sort, n.value)), c = (y, S) => {
    const b = ma(y, n.value, a.value, t.search.value);
    return b === t.search.value ? !1 : (S === "push" ? t.push(b) : t.replace(b), !0);
  }, u = () => ut(e.navigationMode) ?? "push", m = () => ut(e.facetNavigationMode) ?? "replace", $ = (y, S) => {
    const b = y.page ?? (va(y) ? 1 : r.value.page);
    return c({ ...r.value, ...y, page: b }, S);
  }, w = (y) => {
    const S = y.page ?? (va(y) ? 1 : r.value.page), b = ma({ ...r.value, ...y, page: S }, n.value, a.value, t.search.value);
    return t.href ? t.href(b) : `${t.path.value}${b}`;
  }, k = (y, S) => {
    const b = s.value?.facets.find((E) => E.key === y);
    if (!b) return;
    const x = Ns(r.value.expr, b, S(Is(r.value.expr, b)));
    $({ expr: x }, m());
  }, g = (y) => {
    const S = y === null ? null : nn(n.value, y);
    return (S?.key ?? null) === r.value.entity ? {} : {
      entity: S?.key ?? null,
      view: Er(r.value.view, r.value.entity, S?.key ?? null, a.value),
      sort: mt(S, r.value.sort, n.value).key
    };
  }, M = (y) => {
    const S = g(y);
    Object.keys(S).length && $(S, u());
  };
  return {
    query: r,
    entity: s,
    focus: l,
    sort: o,
    sorts: i,
    summary: p(() => vi(r.value, s.value, n.value)),
    terms: p(() => rr(r.value, s.value, n.value)),
    isPristine: p(() => Ua(r.value)),
    isEverything: p(() => r.value.entity === null),
    hasFacets: p(() => di(r.value.expr, s.value)),
    setEntity: M,
    entityHref: (y) => w(g(y)),
    clearEntity: () => M(null),
    setView(y) {
      $({ view: y }, u());
    },
    setSort(y) {
      $({ sort: mt(s.value, y, n.value).key }, u());
    },
    toggleDirection() {
      $({ dir: r.value.dir === "desc" ? "asc" : "desc" }, u());
    },
    setExpression(y) {
      return $({ expr: y }, u());
    },
    narrow(y, S, b) {
      return $({ expr: y, ...g(S), ...b ? { view: b } : {} }, u());
    },
    narrowHref(y, S, b) {
      return w({ expr: y, ...g(S), ...b ? { view: b } : {} });
    },
    setPage(y, S) {
      $({ page: Math.max(1, Math.floor(y)) }, S ?? u());
    },
    setFacet(y, S) {
      k(y, () => S);
    },
    toggleChip(y, S) {
      k(y, (b) => b.kind !== "chips" ? b : { kind: "chips", selected: b.selected.includes(S) ? b.selected.filter((E) => E !== S) : [...b.selected, S] });
    },
    setRange(y, S, b) {
      k(y, (x) => x.kind === "range" ? { kind: "range", min: S, max: b } : x);
    },
    toggleFlag(y) {
      k(
        y,
        (S) => S.kind === "toggle" ? { kind: "toggle", on: !S.on } : S
      );
    },
    removeTerm(y) {
      if (y.facetKey === Dn) {
        M(null);
        return;
      }
      if (y.facetKey === sn) {
        const S = Il(Te(r.value.expr), y.group ?? 0, y.index ?? 0);
        $({ expr: ot(S) }, u());
      }
    },
    clearFilters() {
      $({ ...g(null), expr: "" }, u());
    },
    reset() {
      c(Ya(n.value, a.value), u());
    },
    hrefFor(y) {
      const S = { ...r.value, ...y };
      return "entity" in y && !("view" in y) && (S.view = Er(r.value.view, r.value.entity, S.entity, a.value)), S.page = y.page ?? (va(y) ? 1 : r.value.page), `${t.path.value}${ma(S, n.value, a.value, t.search.value)}`;
    }
  };
}
function mi(e) {
  const t = ft([]), n = K(0), a = K(!1), r = K(!1), s = ft(null);
  let l = 0, i = null, o = null;
  const c = p(() => (e.query.value.page - 1) * e.limit.value), u = p(() => gl(n.value, e.limit.value)), m = () => {
    const x = e.query.value, E = e.within?.value.trim(), z = Ps(e.entity.value, x.expr);
    return E ? { ...x, expr: Za(E, z) } : z === x.expr ? x : { ...x, expr: z };
  }, $ = (x, E) => {
    t.value = x.rows, n.value = x.total, s.value = null, w(E);
  }, w = (x) => {
    i = { key: x, total: n.value }, r.value = !1;
  }, k = (x) => {
    s.value = x, t.value = [], n.value = 0, i = null, r.value = !1;
  }, g = (x, E, z, A) => {
    let P = !0;
    const W = () => x === l;
    let Z = 0, be = !1;
    const R = (H) => {
      Z = H, be = !0, A === void 0 && (n.value = H);
    }, G = () => {
      P && (P = !1, t.value = [], R(0)), s.value = null;
    };
    return {
      get open() {
        return W();
      },
      insert(H, me) {
        if (!W()) return;
        const V = Array.isArray(H) ? H : [H];
        if (!V.length) return;
        G();
        const Y = [...t.value];
        Y.splice(me ?? Y.length, 0, ...V), t.value = E > 0 ? Y.slice(0, E) : Y, R(Z + V.length);
      },
      set(H) {
        W() && (H.rows && (G(), t.value = E > 0 ? H.rows.slice(0, E) : H.rows, R(H.rows.length)), H.total !== void 0 && R(H.total));
      },
      close() {
        W() && (a.value = !1, be && (n.value = Z), w(z));
      },
      fail(H) {
        W() && (k(H), a.value = !1);
      }
    };
  }, M = () => {
    const x = o;
    o = null, x?.();
  }, y = () => {
    const x = ++l;
    M();
    const E = S.value, z = i?.key === E ? i.total : void 0;
    r.value = z === void 0;
    const A = {
      query: m(),
      schema: e.schema.value,
      entity: e.entity.value,
      limit: e.limit.value,
      offset: c.value
    }, P = e.source.value;
    if (P.stream) {
      a.value = !0;
      try {
        o = P.stream(A, g(x, A.limit, E, z)) ?? null;
      } catch (Z) {
        k(Z), a.value = !1;
      }
      return;
    }
    let W;
    try {
      W = P.query(A);
    } catch (Z) {
      k(Z);
      return;
    }
    if (!(W instanceof Promise)) {
      $(W, E), a.value = !1;
      return;
    }
    a.value = !0, W.then((Z) => {
      x === l && $(Z, E);
    }).catch((Z) => {
      x === l && k(Z);
    }).finally(() => {
      x === l && (a.value = !1);
    });
  }, S = p(() => {
    const x = m();
    return `${e.entity.value?.key ?? e.schema.value.entities[0]?.key ?? ""}|${JSON.stringify(Xa.map((z) => x[z]))}`;
  }), b = p(() => `${S.value}|${e.query.value.page}`);
  return $e([e.source, b, e.limit], y, {
    immediate: !0
  }), Dt(() => {
    l++, M();
  }, !0), { rows: t, total: n, offset: c, pageCount: u, pending: a, counting: r, error: s, refresh: y };
}
const gi = 150;
function yi(e) {
  const t = e.delay ?? gi, n = K(""), a = K("");
  let r = !1, s;
  const l = () => {
    clearTimeout(s), s = void 0;
  }, i = p(() => rn(Dl(a.value), e.entity.value, e.schema?.value)), o = p(() => i.value.trim() !== ""), c = p(
    () => JSON.stringify([i.value, ...Xa.map((w) => e.query.value[w])])
  ), u = ft(null), m = p(() => {
    const w = e.query.value;
    if (!o.value) return w;
    const k = u.value?.of === c.value ? u.value.page : 1;
    return { ...w, expr: Oa(w.expr, i.value), page: k };
  });
  $e(n, (w) => {
    if (l(), !w.trim()) {
      r || (a.value = "");
      return;
    }
    r = !1, s = setTimeout(() => {
      s = void 0, a.value = n.value;
    }, t);
  }), $e(
    e.query,
    () => {
      r && (r = !1, a.value = "");
    },
    { flush: "sync" }
  );
  const $ = (w) => {
    l(), r = !0, n.value = "", !w() && r && (r = !1, a.value = "");
  };
  return Vn() && Dt(l), {
    text: n,
    live: m,
    drafting: o,
    setPage(w) {
      u.value = { of: c.value, page: Math.max(1, Math.floor(w)) };
    },
    commit() {
      const w = n.value.trim();
      if (!w) return;
      const k = Oa(
        e.query.value.expr,
        rn(w, e.entity.value, e.schema?.value)
      );
      a.value = w, $(() => e.setExpression(k));
    },
    abandon() {
      l(), r = !1, n.value = "", a.value = "";
    },
    release: $
  };
}
const _i = 25, Bs = (e, t) => e.toLowerCase() === t.toLowerCase();
function wi(e, t) {
  return e.find((n) => Bs(n.id, t));
}
function ki(e) {
  const t = ft(/* @__PURE__ */ new Map()), n = /* @__PURE__ */ new Set(), a = (i) => {
    if (i.facetKey !== sn) return null;
    const o = Ls(e.schema.value, i.field, i.value);
    return o ? { ...o, key: `${o.entity.key}:${o.id}` } : null;
  }, r = (i) => {
    const { entity: o, id: c } = i, u = e.query.value;
    return e.source.value.query({
      query: {
        ...u,
        entity: o.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: xs(o, c) ?? "",
        sort: mt(o, u.sort, e.schema.value).key,
        page: 1
      },
      schema: e.schema.value,
      entity: o,
      limit: _i,
      offset: 0
    });
  }, s = (i, o) => {
    const c = Sn(Ze(i.columns ?? [], "identity"), o);
    return c === it || Bs(c, o.id) ? "" : c;
  }, l = () => {
    const i = /* @__PURE__ */ new Map();
    for (const u of e.terms.value) {
      const m = a(u);
      m && !t.value.has(m.key) && !n.has(m.key) && i.set(m.key, m);
    }
    if (!i.size) return;
    const o = [...i.values()].map((u) => ({
      reference: u,
      outcome: r(u)
    })), c = (u) => {
      const m = new Map(t.value);
      u.forEach(($, w) => {
        const { reference: k } = o[w], g = wi($.rows, k.id);
        m.set(k.key, g ? s(k.entity, g) : "");
      }), t.value = m;
    };
    if (o.every(({ outcome: u }) => !(u instanceof Promise))) {
      c(o.map(({ outcome: u }) => u));
      return;
    }
    for (const { reference: u } of o) n.add(u.key);
    Promise.all(o.map(({ outcome: u }) => Promise.resolve(u))).then(c).catch(() => {
    }).finally(() => {
      for (const { reference: u } of o) n.delete(u.key);
    });
  };
  return $e([e.source, e.schema, e.terms], () => {
    try {
      l();
    } catch {
    }
  }, { immediate: !0 }), {
    names: t,
    nameOf(i) {
      const o = a(i);
      return o && t.value.get(o.key) || null;
    }
  };
}
const bi = { class: "dc-header" }, $i = { class: "dc-header__main" }, xi = {
  class: "dc-header__brand",
  "aria-hidden": "true"
}, Mi = { class: "dc-header__sr" }, Si = {
  key: 2,
  class: "dc-header__within"
}, Ci = ["title"], Ei = { class: "dc-header__query" }, Pi = ["data-dc-more", "title"], Ai = { class: "dc-header__run" }, Li = {
  key: 0,
  class: "dc-header__or dc-mono",
  "aria-hidden": "true"
}, Ti = ["title", "aria-label", "onClick"], Oi = ["placeholder", "onKeydown"], Ri = {
  key: 0,
  class: "dc-header__pages",
  "aria-label": "Pages"
}, zi = ["disabled"], Ii = ["title"], Ni = ["value", "onKeydown"], Bi = {
  class: "dc-header__page-total",
  "aria-hidden": "true"
}, Fi = {
  class: "dc-header__sr",
  "aria-live": "polite"
}, Di = ["disabled"], Hi = {
  key: 1,
  class: "dc-header__actions"
}, qi = /* @__PURE__ */ oe({
  __name: "ShellHeader",
  props: {
    views: {},
    pagesNote: {},
    hidePages: { type: Boolean }
  },
  setup(e) {
    const t = e, n = cn(), a = Ee(), r = p(() => a.schema.value), s = p(() => {
      const F = a.within.value.trim();
      return F ? rr({ ...a.query.value, expr: F }, null) : [];
    }), l = p(() => {
      const F = a.entity.value, j = F?.keepsScope ? void 0 : F?.scope?.toLowerCase();
      return a.terms.value.filter((se) => se.facetKey !== Dn).map((se, N, Q) => {
        const te = Q[N - 1];
        return {
          term: se,
          or: te?.group !== void 0 && se.group !== void 0 && se.group !== te.group,
          idle: !!j && se.field?.toLowerCase() === j
        };
      });
    }), i = ki({
      source: a.source,
      schema: a.schema,
      query: a.query,
      // The scope's parts as well as the query's: it names a record more often
      // than a typed term does, being what a record's own page is built on.
      terms: p(() => [...s.value, ...a.terms.value])
    });
    function o(F) {
      const j = As(r.value, F)?.scopeLabel ?? F;
      return j.charAt(0).toUpperCase() + j.slice(1);
    }
    function c(F) {
      return F.replace(/\s*\([^()]*\)\s*$/, "");
    }
    function u(F) {
      const j = i.nameOf(F);
      return j ? `${F.negated ? "-" : ""}${o(F.field)}: ${c(j)}` : F.label;
    }
    function m(F) {
      const j = u(F.term), se = F.idle ? `Not applied to ${a.entity.value?.label} — remove ${j}` : `Remove ${j}`, N = F.term.address;
      return N && N !== j ? `${se}
Written ${N} in the address and the search box` : se;
    }
    const $ = K(null);
    function w(F) {
      $.value = F instanceof HTMLInputElement ? F : null;
    }
    function k() {
      a.abandonDraft(), $.value?.blur();
    }
    function g() {
      M.value = null, a.commitDraft();
    }
    const M = K(null), y = p(() => Math.min(M.value ?? 1 / 0, l.value.length)), S = p(() => [
      { key: "before", entries: l.value.slice(0, y.value) },
      { key: "after", entries: l.value.slice(y.value) }
    ]), b = p(() => y.value < l.value.length);
    $e(l, (F) => {
      M.value !== null && M.value >= F.length && (M.value = null);
    });
    function x(F, j) {
      M.value = F >= l.value.length ? null : Math.max(0, F), yt(() => {
        const se = $.value;
        if (!se) return;
        const N = j === "start" ? 0 : se.value.length;
        se.setSelectionRange(N, N), se.scrollIntoView({ block: "nearest", inline: "nearest" }), V();
      });
    }
    function E(F) {
      const j = $.value;
      return !j || j.selectionStart !== j.selectionEnd ? !1 : j.selectionStart === (F === "start" ? 0 : j.value.length);
    }
    function z(F) {
      y.value === 0 || !E("start") || (F.preventDefault(), x(F.key === "Home" ? 0 : y.value - 1, "start"));
    }
    function A(F) {
      !b.value || !E("end") || (F.preventDefault(), x(F.key === "End" ? l.value.length : y.value + 1, "end"));
    }
    function P(F) {
      y.value === 0 || !E("start") || (F.preventDefault(), be(l.value[y.value - 1].term, !0));
    }
    function W(F) {
      !b.value || !E("end") || (F.preventDefault(), be(l.value[y.value].term, !1));
    }
    function Z(F) {
      F.isComposing || F.altKey || F.ctrlKey || F.metaKey || F.shiftKey || (F.key === "ArrowLeft" || F.key === "Home" ? z(F) : F.key === "ArrowRight" || F.key === "End" ? A(F) : F.key === "Backspace" ? P(F) : F.key === "Delete" && W(F));
    }
    function be(F, j) {
      j && M.value !== null && (M.value = Math.max(0, M.value - 1)), a.removeTerm(F);
    }
    function R(F) {
      F.target?.closest("button, input") || (F.preventDefault(), $.value?.focus(), x(l.value.length, "end"));
    }
    function G() {
      a.draft.value || (M.value = null);
    }
    const H = K(null), me = K("");
    function V() {
      const F = H.value;
      if (!F) {
        me.value = "";
        return;
      }
      const j = F.scrollLeft > 1, se = F.scrollWidth - F.clientWidth - F.scrollLeft > 1;
      me.value = j && se ? "both" : j ? "start" : se ? "end" : "";
    }
    let Y = null;
    $e(
      H,
      (F) => {
        Y?.disconnect(), Y = null, V(), !(!F || typeof ResizeObserver > "u") && (Y = new ResizeObserver(V), Y.observe(F));
      },
      { flush: "post" }
    ), $e([l, y], V, { flush: "post" }), Ne(() => Y?.disconnect());
    const re = p(() => a.liveQuery.value.page), ce = p(
      () => !t.hidePages && (a.pageCount.value > 1 || !!t.pagesNote) && !Ga(a.query.value, t.views)
    ), I = p(
      () => `${a.counting.value ? "~" : ""}${Wt(a.pageCount.value)}`
    ), ee = p(() => {
      let F = `Page ${Wt(re.value)} of ${I.value}`;
      const j = a.rows.value.length;
      if (j) {
        const se = a.offset.value + 1, N = `${a.counting.value ? "~" : ""}${Wt(a.total.value)}`;
        F += ` — rows ${Wt(se)} to ${Wt(se + j - 1)} of ${N}`;
      }
      return t.pagesNote ? `${F}
${t.pagesNote}` : F;
    }), pe = K(null), qe = p(() => pe.value ?? String(re.value)), nt = p(
      () => `calc(${Math.max(2, String(a.pageCount.value).length)}ch + 10px)`
    );
    function at(F) {
      F.target.select();
    }
    function Xe(F) {
      const j = F.target, se = j.value.replace(/[^0-9]/g, "");
      j.value !== se && (j.value = se), pe.value = se;
    }
    function Ke(F) {
      const j = F.target, se = Number(pe.value);
      pe.value = null;
      const N = Number.isFinite(se) && se >= 1 ? Math.min(Math.trunc(se), Math.max(1, a.pageCount.value)) : re.value;
      j.value = String(N), N !== re.value && a.setPage(N);
    }
    function Qe(F) {
      const j = F.target;
      pe.value = null, j.value = String(re.value), j.blur();
    }
    return (F, j) => (f(), h("div", bi, [
      C("div", $i, [
        n.brand ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-header__domain",
          "data-dc-brand": "",
          title: "Home",
          onClick: j[0] || (j[0] = (se) => T(a).reset())
        }, [
          C("span", xi, [
            we(F.$slots, "brand", {
              label: r.value.label
            }, void 0, !0)
          ]),
          C("span", Mi, B(r.value.label), 1)
        ])) : (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-header__domain",
          title: "Home",
          onClick: j[1] || (j[1] = (se) => T(a).reset())
        }, B(r.value.label), 1)),
        s.value.length ? (f(), h("span", Si, [
          j[6] || (j[6] = C("span", { class: "dc-header__sr" }, "Within", -1)),
          (f(!0), h(ne, null, he(s.value, (se) => (f(), h("span", {
            key: `scope:${se.id}`,
            class: "dc-within dc-mono dc-truncate",
            title: u(se)
          }, B(u(se)), 9, Ci))), 128))
        ])) : L("", !0),
        C("div", Ei, [
          C("div", {
            class: "dc-header__field",
            onMousedown: R
          }, [
            C("div", {
              ref_key: "termBar",
              ref: H,
              class: "dc-header__terms",
              "data-dc-more": me.value,
              title: T(a).summary.value,
              onScroll: V
            }, [
              (f(!0), h(ne, null, he(S.value, (se) => (f(), h(ne, {
                key: se.key
              }, [
                C("span", Ai, [
                  (f(!0), h(ne, null, he(se.entries, (N) => (f(), h(ne, {
                    key: N.term.id
                  }, [
                    N.or ? (f(), h("span", Li, "or")) : L("", !0),
                    C("button", {
                      type: "button",
                      class: Ve(["dc-term dc-mono", { "dc-term--idle": N.idle }]),
                      title: m(N),
                      "aria-label": `Remove ${u(N.term)}`,
                      onMousedown: j[2] || (j[2] = Je(() => {
                      }, ["prevent"])),
                      onClick: (Q) => be(N.term, se.key === "before")
                    }, B(u(N.term)), 43, Ti)
                  ], 64))), 128))
                ]),
                se.key === "before" ? en((f(), h("input", {
                  key: 0,
                  ref_for: !0,
                  ref: w,
                  "onUpdate:modelValue": j[3] || (j[3] = (N) => T(a).draft.value = N),
                  class: Ve(["dc-header__search dc-mono", { "dc-header__search--between": b.value }]),
                  style: Me({ "--dc-typed": String(Math.max(1, T(a).draft.value.length)) }),
                  type: "text",
                  autocomplete: "off",
                  spellcheck: "false",
                  placeholder: b.value ? "" : "Search…",
                  "aria-label": "Search",
                  onKeydown: [
                    bn(Je(g, ["prevent"]), ["enter"]),
                    bn(Je(k, ["prevent"]), ["esc"]),
                    Z
                  ],
                  onBlur: G
                }, null, 46, Oi)), [
                  [Wo, T(a).draft.value]
                ]) : L("", !0)
              ], 64))), 128))
            ], 40, Pi)
          ], 32)
        ])
      ]),
      ce.value ? (f(), h("nav", Ri, [
        C("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Previous page",
          disabled: re.value <= 1,
          onClick: j[4] || (j[4] = (se) => T(a).setPage(re.value - 1))
        }, [...j[7] || (j[7] = [
          C("span", { "aria-hidden": "true" }, "‹", -1)
        ])], 8, zi),
        C("span", {
          class: "dc-header__page dc-mono",
          title: ee.value
        }, [
          C("input", {
            class: "dc-header__page-box dc-mono",
            type: "text",
            inputmode: "numeric",
            autocomplete: "off",
            "aria-label": "Page",
            style: Me({ width: nt.value }),
            value: qe.value,
            onFocus: at,
            onInput: Xe,
            onKeydown: [
              bn(Je(Ke, ["prevent"]), ["enter"]),
              bn(Je(Qe, ["prevent"]), ["esc"])
            ],
            onBlur: Ke
          }, null, 44, Ni),
          C("span", Bi, "/ " + B(I.value), 1)
        ], 8, Ii),
        C("span", Fi, B(ee.value), 1),
        C("button", {
          type: "button",
          class: "dc-header__step",
          "aria-label": "Next page",
          disabled: re.value >= T(a).pageCount.value,
          onClick: j[5] || (j[5] = (se) => T(a).setPage(re.value + 1))
        }, [...j[8] || (j[8] = [
          C("span", { "aria-hidden": "true" }, "›", -1)
        ])], 8, Di)
      ])) : L("", !0),
      n.actions ? (f(), h("div", Hi, [
        we(F.$slots, "actions", {}, void 0, !0)
      ])) : L("", !0)
    ]));
  }
}), le = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, r] of t)
    n[a] = r;
  return n;
}, Fs = /* @__PURE__ */ le(qi, [["__scopeId", "data-v-f5e5f2f1"]]);
function Vi(e) {
  const t = ft(/* @__PURE__ */ new Map()), n = K(!0);
  let a = 0, r;
  const s = () => {
    a++, r?.abort(), r = void 0;
  }, l = () => {
    s();
    const i = a, { signal: o } = r = new AbortController(), c = e.query.value, u = e.schema.value, m = e.entities.value, $ = e.within?.value.trim() ?? "";
    n.value = c.expr.trim() === "" && !$;
    const w = /* @__PURE__ */ new Map();
    let k = !0;
    for (const g of m) {
      const M = Ps(g, c.expr), y = $ ? Za($, M) : M;
      let S = !1;
      const b = (E) => {
        if (i !== a) return;
        if (k) {
          w.set(g.key, E);
          return;
        }
        const z = new Map(t.value);
        z.set(g.key, E), t.value = z;
      }, x = e.source.value.query({
        query: { ...c, entity: g.key, expr: y, page: 1 },
        schema: u,
        entity: g,
        limit: 0,
        offset: 0,
        signal: o,
        progress: (E) => {
          S || b({ total: E, pending: !0, counted: !0 });
        }
      });
      x instanceof Promise ? (w.has(g.key) || w.set(g.key, { total: 0, pending: !0, counted: !1 }), x.then((E) => {
        S = !0, b({ total: E.total, pending: !1, counted: !0 });
      })) : (S = !0, w.set(g.key, { total: x.total, pending: !1, counted: !0 }));
    }
    k = !1, t.value = w;
  };
  return Vn() && Dt(s), { counts: t, pristine: n, refresh: l, cancel: s };
}
const Ki = ["checked", "indeterminate"], Ds = /* @__PURE__ */ oe({
  __name: "PageTick",
  setup(e) {
    const t = Ee(), n = p(() => t.rows.value.filter((s) => t.isSelected(s)).length), a = p(
      () => t.rows.value.length > 0 && n.value === t.rows.value.length
    ), r = p(() => n.value > 0 && !a.value);
    return (s, l) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: a.value,
      indeterminate: r.value,
      "aria-label": "Select every row on this page",
      title: "Select every row on this page",
      onChange: l[0] || (l[0] = (i) => T(t).selectPage(!a.value))
    }, null, 40, Ki));
  }
}), Xt = (e) => e.separator !== !0 && e.heading !== !0 && e.disabled !== !0, Wi = ["aria-label"], ji = ["role", "aria-label"], Ui = ["data-dc-item"], Gi = {
  key: 0,
  class: "dc-menu__rule",
  role: "separator"
}, Yi = ["role", "aria-checked", "aria-haspopup", "aria-expanded", "aria-disabled", "disabled", "data-dc-item", "onClick", "onMouseenter"], Xi = {
  class: "dc-menu__mark",
  "aria-hidden": "true"
}, Qi = { class: "dc-menu__label dc-truncate" }, Zi = {
  key: 0,
  class: "dc-menu__key dc-mono"
}, Ji = {
  key: 1,
  class: "dc-menu__more",
  "aria-hidden": "true"
}, ec = /* @__PURE__ */ oe({
  __name: "MenuList",
  props: {
    items: {},
    at: {},
    label: {},
    autofocus: { type: Boolean }
  },
  emits: ["choose", "dismiss"],
  setup(e, { expose: t, emit: n }) {
    const a = e, r = n, s = K(null), l = K([]), i = K(null), o = K(null), c = K(null), u = K(!1), m = p(
      () => a.items.flatMap((A, P) => Xt(A) ? [P] : [])
    ), $ = p(() => {
      const A = [{ entries: [] }];
      return a.items.forEach((P, W) => {
        P.heading ? A.push({ heading: P, entries: [] }) : A[A.length - 1]?.entries.push({ item: P, index: W });
      }), A.filter((P) => P.entries.length > 0);
    }), w = K({ x: a.at.x, y: a.at.y });
    async function k() {
      w.value = { x: a.at.x, y: a.at.y }, await yt();
      const A = s.value?.getBoundingClientRect();
      if (!A) return;
      const P = 8;
      let W = a.at.x, Z = a.at.y;
      if (W + A.width > window.innerWidth - P) {
        const be = a.at.mirrorX === void 0 ? null : a.at.mirrorX - A.width;
        W = be !== null && be >= P ? be : window.innerWidth - A.width - P;
      }
      Z + A.height > window.innerHeight - P && (Z = window.innerHeight - A.height - P), w.value = { x: Math.max(P, W), y: Math.max(P, Z) };
    }
    const g = p(() => ({ left: `${w.value.x}px`, top: `${w.value.y}px` }));
    function M(A) {
      i.value = A, A !== null && yt(() => l.value[A]?.focus());
    }
    function y(A, P) {
      const W = m.value;
      if (W.length === 0) return null;
      if (A === null) return P === 1 ? W[0] ?? null : W[W.length - 1] ?? null;
      const Z = W.indexOf(A);
      return Z === -1 ? W[0] ?? null : W[(Z + P + W.length) % W.length] ?? null;
    }
    function S(A, P) {
      if (!a.items[A]?.items?.length) return;
      const Z = l.value[A]?.getBoundingClientRect(), be = s.value?.getBoundingClientRect();
      !Z || !be || (c.value = { x: be.right - 4, y: Z.top - 4, mirrorX: be.left + 4 }, o.value = A, u.value = P);
    }
    function b(A) {
      const P = o.value;
      o.value = null, c.value = null, A && P !== null && M(P);
    }
    function x(A) {
      const P = a.items[A];
      if (!(!P || !Xt(P))) {
        if (P.items?.length) {
          S(A, !0);
          return;
        }
        r("choose", P);
      }
    }
    function E(A) {
      const P = A.key;
      if (P === "Escape") {
        A.preventDefault(), A.stopPropagation(), o.value !== null ? b(!0) : r("dismiss");
        return;
      }
      if (P === "ArrowDown" || P === "ArrowUp") {
        A.preventDefault(), A.stopPropagation(), b(!1), M(y(i.value, P === "ArrowDown" ? 1 : -1));
        return;
      }
      if (P === "Home" || P === "End") {
        A.preventDefault(), A.stopPropagation(), b(!1), M(y(null, P === "Home" ? 1 : -1));
        return;
      }
      if (P === "ArrowRight") {
        const W = i.value;
        W !== null && a.items[W]?.items?.length && (A.preventDefault(), A.stopPropagation(), S(W, !0));
        return;
      }
      if (P === "ArrowLeft") {
        o.value !== null && (A.preventDefault(), A.stopPropagation(), b(!0));
        return;
      }
      if (P === "Enter" || P === " ") {
        const W = i.value;
        if (W === null) return;
        A.preventDefault(), A.stopPropagation(), x(W);
      }
    }
    function z(A) {
      const P = a.items[A];
      !P || !Xt(P) || (o.value !== null && o.value !== A && b(!1), M(A), P.items?.length && S(A, !1));
    }
    return un(() => {
      k(), a.autofocus && M(y(null, 1));
    }), $e(() => a.at, k, { deep: !0 }), $e(() => a.items, () => void k(), { deep: !0 }), Ne(() => {
      o.value = null;
    }), t({ root: s }), (A, P) => {
      const W = rs("MenuList", !0);
      return f(), h("div", {
        ref_key: "root",
        ref: s,
        class: "dc-menu",
        role: "menu",
        "aria-label": e.label,
        style: Me(g.value),
        onKeydown: E
      }, [
        (f(!0), h(ne, null, he($.value, (Z, be) => (f(), h("div", {
          key: `${be}-${Z.heading?.label ?? ""}`,
          class: "dc-menu__group",
          role: Z.heading ? "group" : "none",
          "aria-label": Z.heading?.label
        }, [
          Z.heading ? (f(), h("div", {
            key: 0,
            class: "dc-menu__heading dc-truncate",
            "aria-hidden": "true",
            "data-dc-item": Z.heading.id
          }, B(Z.heading.label), 9, Ui)) : L("", !0),
          (f(!0), h(ne, null, he(Z.entries, ({ item: R, index: G }) => (f(), h(ne, {
            key: R.id ?? `${G}-${R.label ?? ""}`
          }, [
            R.separator ? (f(), h("div", Gi)) : (f(), h("button", {
              key: 1,
              ref_for: !0,
              ref: (H) => {
                H && (l.value[G] = H);
              },
              type: "button",
              class: "dc-menu__item",
              role: R.checked === void 0 ? "menuitem" : "menuitemcheckbox",
              "aria-checked": R.checked === void 0 ? void 0 : R.checked,
              "aria-haspopup": R.items?.length ? "menu" : void 0,
              "aria-expanded": R.items?.length ? o.value === G : void 0,
              "aria-disabled": R.disabled ? "true" : void 0,
              disabled: R.disabled,
              "data-dc-item": R.id,
              tabindex: "-1",
              onClick: (H) => x(G),
              onMouseenter: (H) => z(G)
            }, [
              C("span", Xi, B(R.checked ? "✓" : ""), 1),
              C("span", Qi, B(R.label), 1),
              R.shortcut ? (f(), h("span", Zi, B(R.shortcut), 1)) : R.items?.length ? (f(), h("span", Ji, "›")) : L("", !0)
            ], 40, Yi))
          ], 64))), 128))
        ], 8, ji))), 128)),
        o.value !== null && c.value ? (f(), X(W, {
          key: o.value,
          items: e.items[o.value]?.items ?? [],
          at: c.value,
          label: e.items[o.value]?.label,
          autofocus: u.value,
          onChoose: P[0] || (P[0] = (Z) => r("choose", Z)),
          onDismiss: P[1] || (P[1] = (Z) => b(!0))
        }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
      ], 44, Wi);
    };
  }
}), sr = /* @__PURE__ */ le(ec, [["__scopeId", "data-v-9b1413fa"]]), tc = { class: "dc-pick" }, nc = ["id"], ac = ["id", "aria-expanded", "aria-labelledby", "data-dc-value"], rc = { class: "dc-pick__label" }, sc = /* @__PURE__ */ oe({
  __name: "PickControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue", "open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, r = Kn() ?? "dc-pick", s = K(null), l = K(null), i = K(null), o = K(!1), c = p(() => i.value !== null), u = K(null), m = p(
      () => n.options.find((x) => x.key === n.modelValue) ?? n.options[0]
    ), $ = p(
      () => n.options.map((x) => ({
        id: x.key,
        label: x.label,
        checked: x.key === n.modelValue
      }))
    ), w = p(
      () => i.value ? { maxHeight: `${window.innerHeight - i.value.y - 8}px` } : void 0
    );
    function k(x) {
      const E = s.value?.getBoundingClientRect();
      E && (u.value = s.value?.closest(".dc-shell") ?? document.body, i.value = { x: E.left, y: E.bottom + 4, mirrorX: E.right }, o.value = x, a("open"));
    }
    function g(x) {
      i.value && a("close"), i.value = null, x && s.value?.focus();
    }
    function M() {
      c.value ? g(!0) : k(!1);
    }
    function y(x) {
      x.key !== "ArrowDown" && x.key !== "ArrowUp" || c.value || (x.preventDefault(), k(!0));
    }
    function S(x) {
      const E = x.target;
      E && (s.value?.contains(E) || l.value?.root?.contains(E) || g(!1));
    }
    $e(c, (x) => {
      x ? window.addEventListener("pointerdown", S, !0) : window.removeEventListener("pointerdown", S, !0);
    }), Ne(() => window.removeEventListener("pointerdown", S, !0));
    function b(x) {
      g(!0), !(x.id === void 0 || x.id === n.modelValue) && a("update:modelValue", x.id);
    }
    return (x, E) => (f(), h("span", tc, [
      C("span", {
        id: `${T(r)}-name`,
        class: "dc-pick__name"
      }, B(e.label), 9, nc),
      C("button", {
        id: `${T(r)}-value`,
        ref_key: "trigger",
        ref: s,
        type: "button",
        class: Ve(["dc-pick__button", { "dc-mono": e.mono }]),
        "aria-haspopup": "menu",
        "aria-expanded": c.value,
        "aria-labelledby": `${T(r)}-name ${T(r)}-value`,
        "data-dc-value": e.modelValue,
        onClick: M,
        onKeydown: y
      }, [
        C("span", rc, B(m.value?.label), 1)
      ], 42, ac),
      E[1] || (E[1] = C("span", {
        class: "dc-pick__mark",
        "aria-hidden": "true"
      }, "▾", -1)),
      i.value && u.value ? (f(), X(Wn, {
        key: 0,
        to: u.value
      }, [
        fe(sr, {
          ref_key: "menu",
          ref: l,
          class: "dc-pick__list",
          style: Me(w.value),
          items: $.value,
          at: i.value,
          label: e.label,
          autofocus: o.value,
          onChoose: b,
          onDismiss: E[0] || (E[0] = (z) => g(!0))
        }, null, 8, ["style", "items", "at", "label", "autofocus"])
      ], 8, ["to"])) : L("", !0)
    ]));
  }
}), Hr = /* @__PURE__ */ le(sc, [["__scopeId", "data-v-d21ebf1b"]]), oc = {
  key: 2,
  class: "dc-actions__select"
}, lc = {
  key: 0,
  class: "dc-actions__all"
}, ic = {
  class: "dc-actions__count",
  "aria-live": "polite"
}, cc = {
  key: 1,
  class: "dc-actions__count dc-actions__all",
  "aria-live": "polite"
}, uc = { class: "dc-actions__ops" }, dc = ["disabled"], fc = ["data-dc-operation", "disabled", "onClick"], pc = ["disabled"], vc = "…", hc = /* @__PURE__ */ oe({
  __name: "RecordActions",
  props: {
    views: {},
    typeChooser: {},
    selectionPlacement: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(
      () => n.hasFacets.value || !!n.liveQuery.value.expr.trim() || !!n.within.value
    ), r = Vi({
      source: n.source,
      schema: n.schema,
      // What each type holds of what is on screen, the draft's results included:
      // a count of the committed query would disagree with the rows under it.
      query: n.liveQuery,
      entities: n.entities,
      within: n.within
    });
    function s(z) {
      if (z.key === n.query.value.entity && a.value) return Rn(n.total.value);
      if (r.pristine.value) return Aa(z);
      const P = r.counts.value.get(z.key);
      return P ? P.counted ? `${P.pending ? "~" : ""}${Rn(P.total)}` : vc : Aa(z);
    }
    const l = p(() => [
      { key: "", label: "Everything" },
      ...n.entities.value.map((z) => ({
        key: z.key,
        label: `${z.label} · ${s(z)}`
      }))
    ]), i = p(
      () => t.typeChooser === "always" || n.query.value.entity !== null
    );
    function o(z) {
      n.setEntity(z || null);
    }
    const c = p(
      () => (t.views ?? [...os]).map((z) => ({ key: z, label: pl[z] }))
    ), u = p(() => ja(n.query.value.view, t.views)), m = p(() => c.value.length > 1);
    function $(z) {
      n.setView(z);
    }
    const w = p(() => n.entity.value), k = p(() => !Ga(n.query.value, t.views)), g = p(() => n.selection.value.ids.length), M = p(
      () => k.value && n.selectable.value && (n.rows.value.length > 0 || g.value > 0)
    ), y = p(() => u.value === "table"), S = p(
      () => i.value || m.value || k.value && (M.value || !!(w.value?.create || w.value?.duplicate || w.value?.delete || w.value?.operations?.length))
    ), b = p(() => g.value ? `${g.value} selected` : y.value ? "" : "Select all"), x = p(() => t.selectionPlacement === "end");
    function E(z) {
      return g.value ? `${z} ${g.value}` : z;
    }
    return (z, A) => S.value ? (f(), h("div", {
      key: 0,
      class: Ve(["dc-actions", { "dc-actions--selection-end": x.value }])
    }, [
      i.value ? (f(), X(Hr, {
        key: 0,
        class: "dc-actions__pick dc-actions__type",
        label: "Type",
        "model-value": T(n).query.value.entity ?? "",
        options: l.value,
        onOpen: T(r).refresh,
        onClose: T(r).cancel,
        "onUpdate:modelValue": o
      }, null, 8, ["model-value", "options", "onOpen", "onClose"])) : L("", !0),
      m.value ? (f(), X(Hr, {
        key: 1,
        class: "dc-actions__pick dc-actions__view",
        label: "View",
        "model-value": u.value,
        options: c.value,
        "onUpdate:modelValue": $
      }, null, 8, ["model-value", "options"])) : L("", !0),
      M.value && b.value ? (f(), h("div", oc, [
        y.value ? (f(), h("span", cc, B(b.value), 1)) : (f(), h("label", lc, [
          fe(Ds),
          C("span", ic, B(b.value), 1)
        ])),
        g.value ? (f(), h("button", {
          key: 2,
          type: "button",
          class: Ve(["dc-actions__clear", { "dc-actions__clear--op": x.value }]),
          onClick: A[0] || (A[0] = (P) => T(n).clearSelection())
        }, " Clear ", 2)) : L("", !0)
      ])) : L("", !0),
      C("div", uc, [
        w.value?.create ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-actions__op dc-actions__new",
          onClick: A[1] || (A[1] = (P) => T(n).create(w.value))
        }, [
          A[4] || (A[4] = C("span", {
            class: "dc-actions__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Le(" " + B(w.value.create), 1)
        ])) : L("", !0),
        w.value?.duplicate ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-actions__op",
          disabled: !g.value,
          onClick: A[2] || (A[2] = (P) => T(n).duplicate())
        }, B(E(w.value.duplicate)), 9, dc)) : L("", !0),
        (f(!0), h(ne, null, he(w.value?.operations ?? [], (P) => (f(), h("button", {
          key: P.key,
          type: "button",
          class: "dc-actions__op",
          "data-dc-operation": P.key,
          disabled: !g.value,
          onClick: (W) => T(n).operate(P.key)
        }, B(E(P.label)), 9, fc))), 128)),
        w.value?.delete ? (f(), h("button", {
          key: 2,
          type: "button",
          class: "dc-actions__op dc-actions__danger",
          disabled: !g.value,
          onClick: A[3] || (A[3] = (P) => T(n).delete())
        }, B(E(w.value.delete)), 9, pc)) : L("", !0)
      ])
    ], 2)) : L("", !0);
  }
}), Hs = /* @__PURE__ */ le(hc, [["__scopeId", "data-v-a93a38b2"]]), mc = ["href"], gc = /* @__PURE__ */ oe({
  __name: "PressLink",
  props: {
    href: {}
  },
  emits: ["press"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    function r(s) {
      if (n.href && Es(s)) {
        s.stopPropagation();
        return;
      }
      s.preventDefault(), a("press", ta(s), s);
    }
    return (s, l) => e.href ? (f(), h("a", {
      key: 0,
      href: e.href,
      class: "dc-press",
      onClick: r
    }, [
      we(s.$slots, "default", {}, void 0, !0)
    ], 8, mc)) : (f(), h("button", {
      key: 1,
      type: "button",
      class: "dc-press",
      onClick: r
    }, [
      we(s.$slots, "default", {}, void 0, !0)
    ]));
  }
}), Ye = /* @__PURE__ */ le(gc, [["__scopeId", "data-v-a9383f64"]]);
function yc(e, t) {
  if (!e) return null;
  const n = He(e, t);
  return typeof n == "string" && n.trim() ? n : null;
}
const _c = (e) => e == null || typeof e == "string" && !e.trim();
function wc(e, t) {
  const n = Ze(t, "state"), a = Ze(t, "tint");
  return {
    identity: Sn(Ze(t, "identity"), e),
    reference: Sn(Ze(t, "reference"), e),
    metrics: us(t, "metric").map((r) => ({
      column: r,
      label: r.label ?? "",
      text: Bt(r, e)
    })),
    facts: t.filter((r) => r.cardLabel && !_c(He(r, e))).map((r) => ({
      column: r,
      label: r.cardLabel,
      title: [r.label, r.hint].filter(Boolean).join(" — "),
      text: Bt(r, e)
    })),
    state: n ? He(n, e) ?? null : null,
    updated: Sn(Ze(t, "updated"), e),
    image: yc(Ze(t, "image"), e),
    tint: a ? He(a, e) ?? null : null
  };
}
function qs(e, t, n, a, r = !1, s = !1) {
  const l = n?.columns ?? [];
  return {
    row: e,
    key: wl(e, t),
    entityLabel: e.entityLabel,
    entity: n,
    columns: l,
    ordinal: sl(t, s),
    parts: wc(e, l),
    pinned: a,
    selected: r
  };
}
function Pt() {
  const e = Ee(), t = p(
    () => new Map(e.entities.value.map((n) => [n.key, n]))
  );
  return p(
    () => e.rows.value.map(
      (n, a) => qs(
        n,
        e.offset.value + a,
        t.value.get(n.entityKey) ?? null,
        e.isPinned(n),
        e.isSelected(n),
        e.schema.value.plainOrdinals
      )
    )
  );
}
const kc = ["data-dc-status", "data-dc-tone"], bc = /* @__PURE__ */ oe({
  __name: "StatusPill",
  props: {
    status: {},
    tone: {},
    label: {}
  },
  setup(e) {
    const t = e, n = p(() => t.label ?? t.status ?? "");
    return (a, r) => (f(), h("span", {
      class: "dc-pill",
      "data-dc-status": e.status,
      "data-dc-tone": e.tone
    }, B(n.value), 9, kc));
  }
}), pn = /* @__PURE__ */ le(bc, [["__scopeId", "data-v-686eb9b6"]]), $c = { key: 1 }, xc = /* @__PURE__ */ oe({
  __name: "MetricDrill",
  props: {
    entry: {},
    column: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => !t.entry.entity?.scope || !t.column.drill ? null : n.entities.value.find((c) => c.key === t.column.drill) ?? null), r = p(() => t.column.label ?? ""), s = p(() => Bt(t.column, t.entry.row)), l = p(() => a.value ? n.drillHref(t.entry.row, a.value) : null);
    function i(o, c) {
      c.stopPropagation(), a.value && n.drill(t.entry.row, a.value, o);
    }
    return (o, c) => a.value ? (f(), X(Ye, {
      key: 0,
      class: "dc-drill",
      href: l.value,
      title: `${r.value} of ${e.entry.parts.identity} — show the ${a.value.label.toLowerCase()}`,
      onPress: i
    }, {
      default: Pe(() => [
        we(o.$slots, "default", {}, () => [
          Le(B(s.value), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["href", "title"])) : (f(), h("span", $c, [
      we(o.$slots, "default", {}, () => [
        Le(B(s.value), 1)
      ], !0)
    ]));
  }
}), vn = /* @__PURE__ */ le(xc, [["__scopeId", "data-v-d3e7f4e0"]]), Mc = ["data-dc-active", "aria-pressed", "aria-label"], Sc = /* @__PURE__ */ oe({
  __name: "PinStar",
  props: {
    row: {},
    pinned: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Ee();
    function a(r) {
      r.stopPropagation(), n.togglePin(t.row);
    }
    return (r, s) => (f(), h("button", {
      type: "button",
      class: "dc-star",
      "data-dc-active": e.pinned ? "true" : "false",
      "aria-pressed": e.pinned,
      "aria-label": e.pinned ? `Unpin ${e.name}` : `Pin ${e.name}`,
      onClick: a
    }, B(e.pinned ? "★" : "☆"), 9, Mc));
  }
}), or = /* @__PURE__ */ le(Sc, [["__scopeId", "data-v-ef63d763"]]), Cc = ["src"], Ec = /* @__PURE__ */ oe({
  __name: "RowPicture",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = K(!1);
    return $e(
      () => t.src,
      () => {
        n.value = !1;
      }
    ), (a, r) => e.src.trim() && !n.value ? (f(), h("img", {
      key: 0,
      class: "dc-picture",
      src: e.src,
      alt: "",
      loading: "lazy",
      decoding: "async",
      onError: r[0] || (r[0] = (s) => n.value = !0)
    }, null, 40, Cc)) : L("", !0);
  }
}), na = /* @__PURE__ */ le(Ec, [["__scopeId", "data-v-afaab300"]]), Pc = ["data-dc-standing", "title", "aria-label"], Ac = /* @__PURE__ */ oe({
  __name: "QueryMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => Jn(t.entry.entity, t.entry.row)), r = p(() => nr(n.query.value.expr, a.value)), s = p(
      () => r.value === "in" ? `The query narrows to ${t.entry.parts.identity} — press to lift that` : `The query leaves out ${t.entry.parts.identity} — press to lift that`
    );
    function l(i) {
      i.stopPropagation(), n.setExpression(Cs(n.query.value.expr, a.value));
    }
    return (i, o) => r.value ? (f(), h("button", {
      key: 0,
      type: "button",
      class: "dc-standing",
      "data-dc-standing": r.value,
      title: s.value,
      "aria-label": s.value,
      onClick: l
    }, B(r.value === "in" ? "+" : "−"), 9, Pc)) : L("", !0);
  }
}), lr = /* @__PURE__ */ le(Ac, [["__scopeId", "data-v-4b8d4166"]]), Lc = ["aria-label"], Tc = ["data-dc-standing", "data-dc-active", "aria-checked", "title", "aria-label", "onClick"], Oc = /* @__PURE__ */ oe({
  __name: "StandingControl",
  props: {
    standing: {},
    mixed: { type: Boolean },
    name: {}
  },
  emits: ["set"],
  setup(e, { emit: t }) {
    const n = e, a = t, r = p(() => [
      { standing: "in", sign: "+", hint: `Narrow the query to ${n.name}` },
      { standing: null, sign: "·", hint: `Let the query say nothing about ${n.name}` },
      { standing: "out", sign: "−", hint: `Leave ${n.name} out of the query` }
    ]), s = (i) => !n.mixed && n.standing === i;
    function l(i, o) {
      i.stopPropagation(), a("set", o);
    }
    return (i, o) => (f(), h("span", {
      class: "dc-standing-control",
      role: "radiogroup",
      "aria-label": `Where the query stands on ${e.name}`
    }, [
      (f(!0), h(ne, null, he(r.value, (c) => (f(), h("button", {
        key: c.sign,
        type: "button",
        role: "radio",
        class: "dc-standing-control__choice",
        "data-dc-standing": c.standing ?? "none",
        "data-dc-active": s(c.standing) ? "true" : "false",
        "aria-checked": s(c.standing),
        title: c.hint,
        "aria-label": c.hint,
        onClick: (u) => l(u, c.standing)
      }, B(c.sign), 9, Tc))), 128))
    ], 8, Lc));
  }
}), Ia = /* @__PURE__ */ le(Oc, [["__scopeId", "data-v-0a256fc1"]]), Vs = /* @__PURE__ */ oe({
  __name: "RowStanding",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => Jn(t.entry.entity, t.entry.row)), r = p(() => nr(n.query.value.expr, a.value));
    function s(l) {
      n.setExpression(Ra(n.query.value.expr, a.value, l));
    }
    return (l, i) => a.value !== null ? (f(), X(Ia, {
      key: 0,
      class: "dc-row-standing",
      standing: r.value,
      name: e.entry.parts.identity,
      onSet: s
    }, null, 8, ["standing", "name"])) : L("", !0);
  }
}), Rc = ["href", "title", "aria-label"], zc = /* @__PURE__ */ oe({
  __name: "OpenMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => {
      const r = t.entry.row, s = n.recordHref?.(r) ?? null;
      return s ? n.pressHref(r) === s ? null : s : null;
    });
    return (r, s) => a.value ? (f(), h("a", {
      key: 0,
      class: "dc-open",
      href: a.value,
      target: "_blank",
      rel: "noopener noreferrer",
      title: a.value,
      "aria-label": `Open ${e.entry.parts.identity} in a new tab`,
      onClick: s[0] || (s[0] = Je(() => {
      }, ["stop"]))
    }, "↗", 8, Rc)) : L("", !0);
  }
}), hn = /* @__PURE__ */ le(zc, [["__scopeId", "data-v-b00f390d"]]), Ic = /* @__PURE__ */ oe({
  __name: "ScopeMark",
  props: {
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(
      () => n.narrowsOnPress.value ? null : t.entry.entity?.scope ?? null
    ), r = K(null);
    function s(u) {
      r.value = ta(u).exclude ? "out" : "in";
    }
    function l(u) {
      s(u), window.addEventListener("keydown", s), window.addEventListener("keyup", s);
    }
    function i() {
      r.value = null, window.removeEventListener("keydown", s), window.removeEventListener("keyup", s);
    }
    Ne(i);
    const o = p(() => a.value ? n.drillHref(t.entry.row, null) : null);
    function c(u, m) {
      m.stopPropagation(), n.drill(t.entry.row, null, u);
    }
    return (u, m) => a.value ? (f(), X(Ye, {
      key: 0,
      class: "dc-scope",
      href: o.value,
      "data-dc-pending": r.value ?? void 0,
      title: `Narrow everything to ${a.value}: ${e.entry.row.id} — ⌥-click to leave it out`,
      "aria-label": `Narrow everything to ${e.entry.parts.identity}`,
      onPointerenter: l,
      onPointermove: s,
      onPointerleave: i,
      onPress: c
    }, {
      default: Pe(() => [...m[0] || (m[0] = [
        Le(" → ", -1)
      ])]),
      _: 1
    }, 8, ["href", "data-dc-pending", "title", "aria-label"])) : L("", !0);
  }
}), mn = /* @__PURE__ */ le(Ic, [["__scopeId", "data-v-05d2c233"]]), Nc = ["checked", "aria-label"], At = /* @__PURE__ */ oe({
  __name: "SelectTick",
  props: {
    row: {},
    selected: { type: Boolean },
    name: {}
  },
  setup(e) {
    const t = e, n = Ee();
    function a(r) {
      r.stopPropagation(), n.toggleSelect(t.row);
    }
    return (r, s) => (f(), h("input", {
      class: "dc-tick",
      type: "checkbox",
      checked: e.selected,
      "aria-label": `Select ${e.name}`,
      onClick: a
    }, null, 8, Nc));
  }
}), Bc = { class: "dc-card__top dc-mono" }, Fc = { class: "dc-card__lead" }, Dc = {
  key: 2,
  class: "dc-card__entity"
}, Hc = { class: "dc-card__top-right" }, qc = { class: "dc-card__names" }, Vc = { class: "dc-card__primary" }, Kc = {
  key: 0,
  class: "dc-card__secondary dc-mono"
}, Wc = {
  key: 1,
  class: "dc-card__facts dc-mono"
}, jc = ["title"], Uc = { class: "dc-card__fact-label" }, Gc = {
  key: 0,
  class: "dc-card__metrics dc-mono"
}, Yc = {
  key: 0,
  class: "dc-card__date"
}, Xc = /* @__PURE__ */ oe({
  __name: "CardsView",
  setup(e) {
    const t = Ee(), n = Pt(), a = p(() => t.isEverything.value), r = (l) => l.entity?.card === "picture", s = p(() => n.value.length > 0 && n.value.every(r));
    return (l, i) => (f(), h("div", {
      class: Ve(["dc-cards", { "dc-cards--pictures": s.value }])
    }, [
      (f(!0), h(ne, null, he(T(n), (o) => (f(), h("div", {
        key: o.key,
        class: Ve(["dc-card", { "dc-card--picture": r(o) }])
      }, [
        C("div", Bc, [
          C("span", Fc, [
            T(t).selectable.value ? (f(), X(At, {
              key: 0,
              row: o.row,
              selected: o.selected,
              name: o.parts.identity
            }, null, 8, ["row", "selected", "name"])) : L("", !0),
            r(o) ? L("", !0) : (f(), h(ne, { key: 1 }, [
              Le(B(o.ordinal), 1)
            ], 64)),
            a.value ? (f(), h("span", Dc, B(o.entityLabel), 1)) : L("", !0)
          ]),
          C("span", Hc, [
            o.parts.state && !r(o) ? (f(), X(pn, {
              key: 0,
              status: o.parts.state
            }, null, 8, ["status"])) : L("", !0),
            r(o) ? (f(), X(lr, {
              key: 1,
              entry: o
            }, null, 8, ["entry"])) : (f(), X(Vs, {
              key: 2,
              entry: o
            }, null, 8, ["entry"])),
            fe(mn, { entry: o }, null, 8, ["entry"]),
            fe(hn, { entry: o }, null, 8, ["entry"]),
            T(t).pinnable.value ? (f(), X(or, {
              key: 3,
              row: o.row,
              name: o.parts.identity,
              pinned: o.pinned
            }, null, 8, ["row", "name", "pinned"])) : L("", !0)
          ])
        ]),
        fe(Ye, {
          class: "dc-card__open",
          href: T(t).pressHref(o.row),
          onPress: (c) => T(t).activate(o.row, c)
        }, {
          default: Pe(() => [
            o.parts.image ? (f(), X(na, {
              key: 0,
              class: "dc-card__image",
              src: o.parts.image
            }, null, 8, ["src"])) : L("", !0),
            C("span", qc, [
              C("span", Vc, B(o.parts.identity), 1),
              r(o) ? L("", !0) : (f(), h("span", Kc, B(o.parts.reference), 1)),
              o.parts.facts.length ? (f(), h("span", Wc, [
                (f(!0), h(ne, null, he(o.parts.facts, (c) => (f(), h("span", {
                  key: c.column.key ?? c.label,
                  class: "dc-card__fact",
                  title: c.title || void 0
                }, [
                  C("span", Uc, B(c.label), 1),
                  Le(" " + B(c.text), 1)
                ], 8, jc))), 128))
              ])) : L("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        r(o) ? L("", !0) : (f(), h("div", Gc, [
          (f(!0), h(ne, null, he(o.parts.metrics.slice(0, 2), (c) => (f(), X(vn, {
            key: c.column.key ?? c.label,
            entry: o,
            column: c.column
          }, {
            default: Pe(() => [
              Le(B(c.label) + " " + B(c.text), 1)
            ]),
            _: 2
          }, 1032, ["entry", "column"]))), 128)),
          o.parts.updated ? (f(), h("span", Yc, B(o.parts.updated), 1)) : L("", !0)
        ]))
      ], 2))), 128))
    ], 2));
  }
}), Ks = /* @__PURE__ */ le(Xc, [["__scopeId", "data-v-fd252138"]]), Qc = { class: "dc-grid" }, Zc = { class: "dc-tile__scrim" }, Jc = { class: "dc-tile__top dc-mono" }, eu = { class: "dc-tile__chip" }, tu = { class: "dc-tile__caption" }, nu = { class: "dc-tile__secondary dc-truncate" }, au = { class: "dc-tile__primary" }, ru = /* @__PURE__ */ oe({
  __name: "GridView",
  setup(e) {
    const t = Ee(), n = Pt();
    return (a, r) => (f(), h("div", Qc, [
      (f(!0), h(ne, null, he(T(n), (s) => (f(), h("div", {
        key: s.key,
        class: "dc-grid__cell"
      }, [
        fe(Ye, {
          class: "dc-tile",
          style: Me({ "--dc-tile-tint": s.parts.tint ?? void 0 }),
          href: T(t).pressHref(s.row),
          onPress: (l) => T(t).activate(s.row, l)
        }, {
          default: Pe(() => [
            s.parts.image ? (f(), X(na, {
              key: 0,
              class: "dc-tile__image",
              src: s.parts.image
            }, null, 8, ["src"])) : L("", !0),
            C("span", Zc, [
              C("span", Jc, [
                C("span", eu, B(s.ordinal), 1)
              ]),
              C("span", tu, [
                C("span", nu, B(s.parts.reference), 1),
                C("span", au, B(s.parts.identity), 1)
              ])
            ])
          ]),
          _: 2
        }, 1032, ["style", "href", "onPress"]),
        T(t).selectable.value ? (f(), X(At, {
          key: 0,
          class: "dc-grid__tick",
          row: s.row,
          selected: s.selected,
          name: s.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0)
      ]))), 128))
    ]));
  }
}), Ws = /* @__PURE__ */ le(ru, [["__scopeId", "data-v-89c40a9e"]]);
function qr(e, t, n, a) {
  return (n - a * (t - 1)) / e;
}
function ya(e, t) {
  return e > 0 ? Math.min(t, e) : t;
}
function su(e) {
  return e > 0 ? e : 1 / 0;
}
function ou(e, t, n) {
  const { width: a, height: r, gap: s = 0 } = n;
  if (!e.length) return [];
  if (!(a > 0) || !(r > 0)) return [{ items: [...e], height: r, filled: !1 }];
  const l = [];
  let i = [], o = 0, c = 0;
  for (const u of e) {
    const m = t(u), $ = Math.max(m.ratio, Number.EPSILON), w = m.height && m.height > 0 ? Math.max(c, m.height) : c, k = ya(w, r), g = qr(o + $, i.length + 1, a, s);
    if (g > k) {
      i.push(u), o += $, c = w;
      continue;
    }
    const M = ya(c, r), y = i.length ? qr(o, i.length, a, s) : 1 / 0;
    y <= su(c) && y - M < k - g ? (l.push({ items: i, height: y, filled: !0 }), i = [u], o = $, c = m.height && m.height > 0 ? m.height : 0) : (l.push({ items: [...i, u], height: g, filled: !0 }), i = [], o = 0, c = 0);
  }
  return i.length && l.push({ items: i, height: ya(c, r), filled: !1 }), l;
}
const lu = { class: "dc-images" }, iu = {
  key: 1,
  class: "dc-images__blank",
  "aria-hidden": "true"
}, cu = 240, $n = 8, uu = 1, du = /* @__PURE__ */ oe({
  __name: "ImagesView",
  setup(e) {
    const t = Ee(), n = Pt(), a = Cr(/* @__PURE__ */ new Map()), r = Cr(/* @__PURE__ */ new Set());
    function s(k, g) {
      const M = g.target;
      M.naturalWidth > 0 && M.naturalHeight > 0 && a.set(k, { width: M.naturalWidth, height: M.naturalHeight });
    }
    function l(k) {
      const g = k.parts.image;
      return g && !r.has(g) ? g : null;
    }
    function i(k) {
      const g = l(k);
      return g ? a.get(g) : void 0;
    }
    function o(k) {
      const g = i(k);
      return g ? { ratio: g.width / g.height, height: g.height } : { ratio: uu };
    }
    const c = K(null), u = K(0);
    let m = null;
    function $() {
      u.value = c.value?.clientWidth ?? 0;
    }
    un(() => {
      $(), !(!c.value || typeof ResizeObserver > "u") && (m = new ResizeObserver($), m.observe(c.value));
    }), Ne(() => {
      m?.disconnect(), m = null;
    });
    const w = p(() => {
      const k = ou(n.value, o, {
        width: u.value,
        height: cu,
        gap: $n
      }), g = [];
      let M = 0;
      for (const y of k) {
        let S = 0;
        for (const b of y.items) {
          const x = o(b).ratio * y.height, E = i(b), z = E !== void 0 && E.height < y.height;
          g.push({
            entry: b,
            style: {
              top: `${M}px`,
              left: `${S}px`,
              width: `${x}px`,
              height: `${y.height}px`
            },
            picture: z ? { width: `${E.width}px`, height: `${E.height}px` } : { width: "100%", height: "100%" }
          }), S += x + $n;
        }
        M += y.height + $n;
      }
      return { boxes: g, height: k.length ? M - $n : 0 };
    });
    return (k, g) => (f(), h("div", lu, [
      C("div", {
        ref_key: "wall",
        ref: c,
        class: "dc-images__wall",
        style: Me({ height: `${w.value.height}px` })
      }, [
        (f(!0), h(ne, null, he(w.value.boxes, ({ entry: M, style: y, picture: S }) => (f(), h("div", {
          key: M.key,
          class: "dc-images__cell",
          style: Me(y)
        }, [
          fe(Ye, {
            class: "dc-images__open",
            title: M.parts.identity,
            "aria-label": M.parts.identity,
            href: T(t).pressHref(M.row),
            onPress: (b) => T(t).activate(M.row, b)
          }, {
            default: Pe(() => [
              l(M) ? (f(), X(na, {
                key: 0,
                class: "dc-images__picture",
                style: Me(S),
                src: l(M),
                onLoad: (b) => s(l(M), b),
                onError: (b) => r.add(l(M))
              }, null, 8, ["style", "src", "onLoad", "onError"])) : (f(), h("span", iu, B(M.parts.identity), 1))
            ]),
            _: 2
          }, 1032, ["title", "aria-label", "href", "onPress"]),
          T(t).selectable.value ? (f(), X(At, {
            key: 0,
            class: "dc-images__tick",
            row: M.row,
            selected: M.selected,
            name: M.parts.identity
          }, null, 8, ["row", "selected", "name"])) : L("", !0)
        ], 4))), 128))
      ], 4)
    ]));
  }
}), js = /* @__PURE__ */ le(du, [["__scopeId", "data-v-2d267370"]]), fu = { class: "dc-links" }, pu = { class: "dc-link__primary dc-truncate" }, vu = { class: "dc-link__secondary dc-mono dc-truncate" }, hu = /* @__PURE__ */ oe({
  __name: "LinksView",
  setup(e) {
    const t = Ee(), n = Pt();
    return (a, r) => (f(), h("div", fu, [
      (f(!0), h(ne, null, he(T(n), (s) => (f(), h("span", {
        key: s.key,
        class: "dc-links__item"
      }, [
        T(t).selectable.value ? (f(), X(At, {
          key: 0,
          row: s.row,
          selected: s.selected,
          name: s.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        fe(Ye, {
          class: "dc-link",
          href: T(t).pressHref(s.row),
          onPress: (l) => T(t).activate(s.row, l)
        }, {
          default: Pe(() => [
            C("span", pu, B(s.parts.identity), 1),
            C("span", vu, B(s.parts.reference), 1)
          ]),
          _: 2
        }, 1032, ["href", "onPress"])
      ]))), 128))
    ]));
  }
}), Us = /* @__PURE__ */ le(hu, [["__scopeId", "data-v-de6c9a0f"]]), mu = {
  class: "dc-list",
  role: "list"
}, gu = { class: "dc-list__ordinal dc-mono" }, yu = { class: "dc-list__identity" }, _u = { class: "dc-list__primary dc-truncate" }, wu = { class: "dc-list__secondary dc-mono dc-truncate" }, ku = {
  key: 1,
  class: "dc-list__entity dc-mono"
}, bu = { class: "dc-list__metrics dc-mono" }, $u = { class: "dc-list__trailing" }, xu = /* @__PURE__ */ oe({
  __name: "ListView",
  setup(e) {
    const t = Ee(), n = Pt(), a = p(() => t.isEverything.value);
    return (r, s) => (f(), h("div", mu, [
      (f(!0), h(ne, null, he(T(n), (l) => (f(), h("div", {
        key: l.key,
        class: "dc-list__row",
        role: "listitem"
      }, [
        T(t).selectable.value ? (f(), X(At, {
          key: 0,
          class: "dc-list__tick",
          row: l.row,
          selected: l.selected,
          name: l.parts.identity
        }, null, 8, ["row", "selected", "name"])) : L("", !0),
        fe(Vs, {
          class: "dc-list__standing",
          entry: l
        }, null, 8, ["entry"]),
        fe(Ye, {
          class: "dc-list__open",
          href: T(t).pressHref(l.row),
          onPress: (i) => T(t).activate(l.row, i)
        }, {
          default: Pe(() => [
            C("span", gu, B(l.ordinal), 1),
            C("span", yu, [
              C("span", _u, B(l.parts.identity), 1),
              C("span", wu, B(l.parts.reference), 1)
            ])
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        a.value ? (f(), h("span", ku, B(l.entityLabel), 1)) : L("", !0),
        C("span", bu, [
          (f(!0), h(ne, null, he(l.parts.metrics.slice(0, 2), (i) => (f(), X(vn, {
            key: i.column.key ?? i.label,
            entry: l,
            column: i.column
          }, null, 8, ["entry", "column"]))), 128))
        ]),
        C("span", $u, [
          l.parts.state ? (f(), X(pn, {
            key: 0,
            status: l.parts.state
          }, null, 8, ["status"])) : L("", !0),
          fe(mn, { entry: l }, null, 8, ["entry"]),
          fe(hn, { entry: l }, null, 8, ["entry"]),
          T(t).pinnable.value ? (f(), X(or, {
            key: 1,
            row: l.row,
            name: l.parts.identity,
            pinned: l.pinned
          }, null, 8, ["row", "name", "pinned"])) : L("", !0)
        ])
      ]))), 128))
    ]));
  }
}), Na = /* @__PURE__ */ le(xu, [["__scopeId", "data-v-3d349a10"]]), Mu = { class: "dc-preview" }, Su = { class: "dc-preview__pager dc-mono" }, Cu = ["disabled"], Eu = { "aria-live": "polite" }, Pu = ["disabled"], Au = {
  key: 0,
  class: "dc-preview__card"
}, Lu = ["src"], Tu = { class: "dc-preview__body" }, Ou = { class: "dc-preview__top" }, Ru = { class: "dc-preview__badges" }, zu = { class: "dc-preview__entity dc-mono" }, Iu = { class: "dc-preview__marks" }, Nu = { class: "dc-preview__primary" }, Bu = { class: "dc-preview__secondary dc-mono" }, Fu = { class: "dc-preview__fields" }, Du = { class: "dc-preview__key" }, Hu = { class: "dc-preview__value dc-mono" }, qu = /* @__PURE__ */ oe({
  __name: "PreviewView",
  setup(e) {
    const t = Ee(), n = Pt(), a = K(0);
    $e(n, (o) => {
      a.value > o.length - 1 && (a.value = Math.max(0, o.length - 1));
    });
    const r = p(() => n.value[a.value]), s = p(() => {
      const o = r.value;
      if (!o) return [];
      const c = Ze(o.columns, "reference"), u = Ze(o.columns, "updated");
      return [
        ...c ? [{ key: c.label ?? "Reference", value: o.parts.reference, column: null }] : [],
        ...o.parts.metrics.map((m) => ({
          key: m.label,
          value: m.text,
          column: m.column
        })),
        ...u ? [{ key: u.label ?? "Updated", value: o.parts.updated, column: null }] : []
      ];
    }), l = p(() => {
      if (!n.value.length) return "0 / 0";
      const o = t.total.value > n.value.length ? ` of ${t.total.value}` : "";
      return `${a.value + 1} / ${n.value.length}${o}`;
    }), i = (o) => {
      const c = n.value.length;
      c && (a.value = Math.min(c - 1, Math.max(0, a.value + o)));
    };
    return (o, c) => (f(), h("div", Mu, [
      C("div", Su, [
        C("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Previous result",
          disabled: a.value === 0,
          onClick: c[0] || (c[0] = (u) => i(-1))
        }, " ‹ ", 8, Cu),
        C("span", Eu, B(l.value), 1),
        C("button", {
          type: "button",
          class: "dc-preview__step",
          "aria-label": "Next result",
          disabled: a.value >= T(n).length - 1,
          onClick: c[1] || (c[1] = (u) => i(1))
        }, " › ", 8, Pu)
      ]),
      r.value ? (f(), h("div", Au, [
        C("div", {
          class: "dc-preview__media",
          style: Me({ background: r.value.parts.tint ?? void 0 }),
          "aria-hidden": "true"
        }, [
          r.value.parts.image ? (f(), h("img", {
            key: 0,
            class: "dc-preview__image",
            src: r.value.parts.image,
            alt: ""
          }, null, 8, Lu)) : (f(), h(ne, { key: 1 }, [
            Le(" preview ")
          ], 64))
        ], 4),
        C("div", Tu, [
          C("div", Ou, [
            C("span", Ru, [
              T(t).selectable.value ? (f(), X(At, {
                key: 0,
                row: r.value.row,
                selected: r.value.selected,
                name: r.value.parts.identity
              }, null, 8, ["row", "selected", "name"])) : L("", !0),
              r.value.parts.state ? (f(), X(pn, {
                key: 1,
                status: r.value.parts.state
              }, null, 8, ["status"])) : L("", !0),
              C("span", zu, B(r.value.entityLabel), 1)
            ]),
            C("span", Iu, [
              fe(lr, { entry: r.value }, null, 8, ["entry"]),
              fe(mn, { entry: r.value }, null, 8, ["entry"]),
              fe(hn, { entry: r.value }, null, 8, ["entry"]),
              T(t).pinnable.value ? (f(), X(or, {
                key: 0,
                row: r.value.row,
                name: r.value.parts.identity,
                pinned: r.value.pinned
              }, null, 8, ["row", "name", "pinned"])) : L("", !0)
            ])
          ]),
          C("div", null, [
            C("div", Nu, B(r.value.parts.identity), 1),
            C("div", Bu, B(r.value.parts.reference), 1)
          ]),
          C("dl", Fu, [
            (f(!0), h(ne, null, he(s.value, (u) => (f(), h("div", {
              key: u.key,
              class: "dc-preview__field"
            }, [
              C("dt", Du, B(u.key), 1),
              C("dd", Hu, [
                u.column && r.value ? (f(), X(vn, {
                  key: 0,
                  entry: r.value,
                  column: u.column
                }, null, 8, ["entry", "column"])) : (f(), h(ne, { key: 1 }, [
                  Le(B(u.value), 1)
                ], 64))
              ])
            ]))), 128))
          ]),
          fe(Ye, {
            class: "dc-preview__open",
            href: r.value ? T(t).pressHref(r.value.row) : null,
            onPress: c[2] || (c[2] = (u) => r.value && T(t).activate(r.value.row, u))
          }, {
            default: Pe(() => [...c[3] || (c[3] = [
              Le(" Open record → ", -1)
            ])]),
            _: 1
          }, 8, ["href"])
        ])
      ])) : L("", !0)
    ]));
  }
}), Gs = /* @__PURE__ */ le(qu, [["__scopeId", "data-v-59e0d33b"]]);
function Vu() {
  const e = Ee();
  return p(() => yl(e.schema.value, e.entity.value));
}
const Ku = {
  key: 5,
  class: "dc-cell__text"
}, Wu = /* @__PURE__ */ oe({
  __name: "ColumnCell",
  props: {
    column: {},
    entry: {}
  },
  setup(e) {
    const t = e, n = Ee(), a = p(() => t.column.kind ?? "text"), r = p(() => He(t.column, t.entry.row)), s = p(
      () => a.value === "ordinal" ? t.entry.ordinal : Bt(t.column, t.entry.row)
    ), l = p(() => r.value), i = p(() => t.column.activate === !0 || !!t.column.click), o = p(() => La(t.column)), c = p(() => ds(t.column, t.entry.row));
    function u(w) {
      i.value && (w.stopPropagation(), m(ta(w)));
    }
    function m(w) {
      t.column.click?.(t.entry.row, w), t.column.activate && n.activate(t.entry.row, w);
    }
    const $ = p(
      () => t.column.activate && !t.column.click ? n.pressHref(t.entry.row) : null
    );
    return (w, k) => a.value === "component" && e.column.component ? (f(), X(jn(e.column.component), {
      key: 0,
      row: e.entry.row,
      entry: e.entry,
      value: r.value,
      column: e.column
    }, null, 8, ["row", "entry", "value", "column"])) : a.value === "status" ? (f(), X(pn, {
      key: 1,
      status: l.value
    }, null, 8, ["status"])) : a.value === "image" ? (f(), X(na, {
      key: 2,
      class: "dc-cell__image",
      src: typeof r.value == "string" ? r.value : "",
      style: Me({ maxHeight: e.column.height }),
      onClick: u
    }, null, 8, ["src", "style"])) : e.column.drill ? (f(), X(vn, {
      key: 3,
      entry: e.entry,
      column: e.column
    }, null, 8, ["entry", "column"])) : i.value ? (f(), X(Ye, {
      key: 4,
      class: Ve(["dc-table__open", { "dc-truncate": o.value }]),
      href: $.value,
      title: c.value,
      onPress: k[0] || (k[0] = (g, M) => {
        M.stopPropagation(), m(g);
      })
    }, {
      default: Pe(() => [
        Le(B(s.value), 1)
      ]),
      _: 1
    }, 8, ["class", "href", "title"])) : (f(), h("span", Ku, B(s.value), 1));
  }
}), Vr = /* @__PURE__ */ le(Wu, [["__scopeId", "data-v-4dd1835e"]]), ju = {
  key: 0,
  class: "dc-table__none"
}, Uu = { class: "dc-table__detail" }, Gu = ["data-dc-wrap", "data-dc-row-links"], Yu = { "data-dc-stuck": "" }, Xu = {
  key: 0,
  class: "dc-table__pick",
  scope: "col"
}, Qu = {
  key: 1,
  class: "dc-table__standing",
  scope: "col"
}, Zu = ["data-dc-align", "data-dc-hide", "aria-sort", "title"], Ju = ["onClick"], ed = {
  key: 2,
  class: "dc-table__head"
}, td = ["onClick"], nd = {
  key: 0,
  class: "dc-table__pick"
}, ad = {
  key: 1,
  class: "dc-table__standing"
}, rd = ["data-dc-align", "data-dc-hide", "title"], sd = {
  key: 1,
  class: "dc-table__name"
}, od = /* @__PURE__ */ oe({
  __name: "TableView",
  setup(e) {
    const t = Ee(), n = Pt(), a = Vu();
    function r(R, G) {
      const H = t.pressHref(R);
      if (H && Es(G)) {
        const me = G.shiftKey ? `noopener,popup,width=${window.outerWidth},height=${window.outerHeight}` : "noopener";
        window.open(H, "_blank", me);
        return;
      }
      t.activate(R, ta(G));
    }
    const s = p(() => t.rowLinks?.value ? new Map(n.value.map((R) => [R.key, t.pressHref(R.row)])) : /* @__PURE__ */ new Map()), l = p(
      () => a.value.find((R) => R.role === "identity") ?? a.value[0]
    );
    function i(R, G, H) {
      H.stopPropagation(), t.activate(R, G);
    }
    function o(R) {
      const G = ms(R, t.entity.value, t.schema.value), H = G ? `Shortcut: ${G}` : void 0;
      return [R.hint, H].filter(Boolean).join(`
`) || void 0;
    }
    const c = p(() => {
      const R = a.value.find((H) => H.scope);
      return R || ((t.entity.value ? !!t.entity.value.href : t.entities.value.some((H) => H.href)) ? a.value.find((H) => H.activate) : void 0);
    }), u = p(
      () => t.entity.value ? !!t.entity.value.scope : t.entities.value.some((R) => R.scope)
    ), m = (R) => Jn(R.entity, R.row), $ = (R) => nr(t.query.value.expr, m(R));
    function w(R, G) {
      t.setExpression(Ra(t.query.value.expr, m(R), G));
    }
    const k = p(() => {
      const R = n.value.filter((H) => m(H) !== null), G = R.filter((H) => H.selected);
      return G.length ? G : R;
    }), g = p(() => k.value.some((R) => R.selected)), M = p(() => {
      const R = k.value[0];
      return R ? $(R) : null;
    }), y = p(
      () => k.value.some((R) => $(R) !== M.value)
    ), S = p(
      () => g.value ? "the ticked rows" : "every row on this page"
    );
    function b(R) {
      t.setExpression(
        k.value.reduce(
          (G, H) => Ra(G, m(H), R),
          t.query.value.expr
        )
      );
    }
    const x = p(
      () => a.value.some((R) => R.kind === "image" || R.height !== void 0)
    );
    function E(R) {
      R && (t.query.value.sort === R ? t.toggleDirection() : t.setSort(R));
    }
    const z = p(() => t.entity.value?.label ?? "The result set"), A = p(() => new Set(t.sorts.value.map((R) => R.key))), P = (R) => R.sort !== void 0 && A.value.has(R.sort), W = (R) => {
      if (P(R))
        return t.query.value.sort !== R.sort ? "none" : t.query.value.dir === "desc" ? "descending" : "ascending";
    };
    function Z(R) {
      return [
        Lr(R),
        R.muted ? "dc-table__muted" : "",
        R.mono ? "dc-mono" : "",
        La(R) ? "dc-truncate" : ""
      ].filter(Boolean).join(" ");
    }
    function be(R, G) {
      if (!(!La(R) || R.activate || R.click))
        return ds(R, G.row);
    }
    return (R, G) => T(a).length ? (f(), h("table", {
      key: 1,
      class: "dc-table",
      "data-dc-wrap": x.value ? "" : void 0,
      "data-dc-row-links": T(t).rowLinks?.value ? "" : void 0
    }, [
      C("thead", Yu, [
        C("tr", null, [
          T(t).selectable.value ? (f(), h("th", Xu, [
            fe(Ds)
          ])) : L("", !0),
          u.value ? (f(), h("th", Qu, [
            k.value.length ? (f(), X(Ia, {
              key: 0,
              standing: M.value,
              mixed: y.value,
              name: S.value,
              onSet: b
            }, null, 8, ["standing", "mixed", "name"])) : L("", !0)
          ])) : L("", !0),
          (f(!0), h(ne, null, he(T(a), (H, me) => (f(), h("th", {
            key: T(Pr)(H, me),
            scope: "col",
            class: Ve(T(Lr)(H)),
            style: Me({ width: H.width }),
            "data-dc-align": T(Ar)(H),
            "data-dc-hide": H.hideBelow,
            "aria-sort": W(H),
            title: o(H)
          }, [
            P(H) ? (f(), h("button", {
              key: 0,
              type: "button",
              class: "dc-table__sort",
              onClick: (V) => E(H.sort)
            }, B(H.label), 9, Ju)) : (f(), h(ne, { key: 1 }, [
              Le(B(H.label), 1)
            ], 64)),
            H.header ? (f(), h("span", ed, [
              (f(), X(jn(H.header), {
                column: H,
                entity: T(t).entity.value
              }, null, 8, ["column", "entity"]))
            ])) : L("", !0)
          ], 14, Zu))), 128))
        ])
      ]),
      C("tbody", null, [
        (f(!0), h(ne, null, he(T(n), (H) => (f(), h("tr", {
          key: H.key,
          class: "dc-table__row",
          onClick: (me) => r(H.row, me)
        }, [
          T(t).selectable.value ? (f(), h("td", nd, [
            fe(At, {
              row: H.row,
              selected: H.selected,
              name: H.parts.identity
            }, null, 8, ["row", "selected", "name"])
          ])) : L("", !0),
          u.value ? (f(), h("td", ad, [
            m(H) !== null ? (f(), X(Ia, {
              key: 0,
              standing: $(H),
              name: H.parts.identity,
              onSet: (me) => w(H, me)
            }, null, 8, ["standing", "name", "onSet"])) : L("", !0)
          ])) : L("", !0),
          (f(!0), h(ne, null, he(T(a), (me, V) => (f(), h("td", {
            key: T(Pr)(me, V),
            class: Ve(Z(me)),
            "data-dc-align": T(Ar)(me),
            "data-dc-hide": me.hideBelow,
            title: be(me, H)
          }, [
            s.value.get(H.key) ? (f(), X(Ye, {
              key: 0,
              class: "dc-table__cell-link",
              href: s.value.get(H.key),
              tabindex: me === l.value ? void 0 : -1,
              "aria-hidden": me === l.value ? void 0 : "true",
              "aria-label": me === l.value ? H.parts.identity : void 0,
              onPress: (Y, re) => i(H.row, Y, re)
            }, null, 8, ["href", "tabindex", "aria-hidden", "aria-label", "onPress"])) : L("", !0),
            me === c.value ? (f(), h("span", sd, [
              fe(Vr, {
                column: me,
                entry: H
              }, null, 8, ["column", "entry"]),
              fe(mn, { entry: H }, null, 8, ["entry"]),
              fe(hn, { entry: H }, null, 8, ["entry"])
            ])) : (f(), X(Vr, {
              key: 2,
              column: me,
              entry: H
            }, null, 8, ["column", "entry"]))
          ], 10, rd))), 128))
        ], 8, td))), 128))
      ])
    ], 8, Gu)) : (f(), h("p", ju, [
      G[2] || (G[2] = C("span", { class: "dc-table__headline" }, "No columns declared", -1)),
      C("span", Uu, [
        Le(B(z.value) + " has no ", 1),
        G[0] || (G[0] = C("code", null, "columns", -1)),
        G[1] || (G[1] = Le(" in the schema, so there is no table to draw. ", -1))
      ])
    ]));
  }
}), Ys = /* @__PURE__ */ le(od, [["__scopeId", "data-v-04d33c1b"]]);
function ld(e) {
  const t = ft([]), n = K(!1), a = ft(null);
  let r = 0;
  const s = (o, c, u, m, $) => ({
    entity: o,
    rows: e.limit.value > 0 ? c.rows.map((w, k) => qs(w, k, o, e.isPinned(w.id), !1, m.plainOrdinals)) : [],
    total: c.total,
    count: u ? Aa(o) : Rn(c.total),
    pinned: id(m, c, $)
  }), l = () => {
    const o = ++r, c = e.query.value, u = e.schema.value, m = e.entities.value, $ = e.limit.value, w = e.within?.value.trim() ?? "", k = Ua(c) && !w, g = w ? Za(w, c.expr) : c.expr, M = m.map((y) => ({
      entity: y,
      // Scope the query to this entity, keeping the expression and ordering.
      outcome: e.source.value.query({
        // Each card is the top few of its type, wherever the shell's own
        // result set has been paged to — so this asks for the first page.
        query: { ...c, entity: y.key, expr: g, page: 1 },
        schema: u,
        entity: y,
        /*
         * One row where none are shown, not none: to a source a limit of 0 is
         * no limit, which would fetch every record of every type to draw a
         * count. The one row is still read — it is what says whether the type
         * holds nothing but the record the query named.
         */
        limit: Math.max($, 1),
        offset: 0
      })
    }));
    if (M.every(({ outcome: y }) => !(y instanceof Promise))) {
      t.value = M.map(
        ({ entity: y, outcome: S }) => s(y, S, k, u, g)
      ), a.value = null, n.value = !1;
      return;
    }
    n.value = !0, Promise.all(M.map(({ outcome: y }) => Promise.resolve(y))).then((y) => {
      o === r && (t.value = y.map(
        (S, b) => s(M[b].entity, S, k, u, g)
      ), a.value = null);
    }).catch((y) => {
      o === r && (a.value = y, t.value = []);
    }).finally(() => {
      o === r && (n.value = !1);
    });
  }, i = () => {
    try {
      l();
    } catch (o) {
      a.value = o, t.value = [], n.value = !1;
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
    i,
    { immediate: !0 }
  ), { previews: t, pending: n, error: a, refresh: i };
}
function id(e, t, n) {
  const a = t.rows[0];
  if (t.total !== 1 || t.rows.length !== 1 || !a)
    return !1;
  const r = n.trim();
  if (!r)
    return !1;
  const s = Bn(e, a);
  return !!s && fn(r, s) === r;
}
const cd = ["data-dc-pending", "data-dc-heads-only"], ud = {
  key: 0,
  class: "dc-types__state",
  role: "alert"
}, dd = {
  key: 1,
  class: "dc-types__state",
  "aria-live": "polite"
}, fd = {
  key: 2,
  class: "dc-types__state"
}, pd = ["data-dc-empty"], vd = { class: "dc-type__name" }, hd = { class: "dc-type__count dc-mono" }, md = { class: "dc-type__sr" }, gd = {
  key: 0,
  class: "dc-type__description"
}, yd = {
  key: 0,
  class: "dc-type__empty"
}, _d = { class: "dc-type__identity" }, wd = { class: "dc-type__primary dc-truncate" }, kd = { class: "dc-type__secondary dc-mono dc-truncate" }, bd = { class: "dc-type__trailing dc-mono" }, $d = { class: "dc-type__metric-value" }, xd = { class: "dc-type__metric-label" }, Md = {
  key: 0,
  class: "dc-type__date"
}, Sd = ["onClick"], Cd = /* @__PURE__ */ oe({
  __name: "TypeCardsView",
  setup(e) {
    const t = Ee(), { previews: n, pending: a, error: r } = ld({
      source: t.source,
      schema: t.schema,
      // The query as the results are read under it, so a word being typed in the
      // header narrows the cards as it narrows any list — see `liveQuery`.
      query: t.liveQuery,
      entities: t.entities,
      limit: t.previewsPerType,
      within: t.within,
      isPinned: (o) => t.isPinnedId(o)
    }), s = p(
      () => !t.isPristine.value || !!t.within.value || t.drafting.value
    ), l = p(() => t.previewsPerType.value <= 0), i = p(
      () => n.value.filter(
        (o) => !o.pinned && (o.total > 0 || !l.value && o.entity.create)
      )
    );
    return (o, c) => (f(), h("div", {
      class: "dc-types",
      "data-dc-pending": T(a) ? "true" : "false",
      "data-dc-heads-only": l.value ? "true" : "false"
    }, [
      we(o.$slots, "before", {}, void 0, !0),
      T(r) ? (f(), h("p", ud, " Could not load results: " + B(T(r) instanceof Error ? T(r).message : "the data source failed."), 1)) : !i.value.length && T(a) ? (f(), h("p", dd, " Running query… ")) : i.value.length ? L("", !0) : (f(), h("p", fd, B(s.value ? "Nothing matches this query" : "Nothing here yet"), 1)),
      (f(!0), h(ne, null, he(i.value, (u) => (f(), h("section", {
        key: u.entity.key,
        class: "dc-type",
        "data-dc-empty": u.total ? "false" : "true"
      }, [
        fe(Ye, {
          class: "dc-type__head",
          href: T(t).entityHref(u.entity.key),
          onPress: (m) => T(t).setEntity(u.entity.key)
        }, {
          default: Pe(() => [
            C("span", vd, B(u.entity.label), 1),
            C("span", hd, B(u.count), 1),
            c[0] || (c[0] = C("span", {
              class: "dc-type__go",
              "aria-hidden": "true"
            }, "→", -1)),
            C("span", md, "Show only " + B(u.entity.label.toLowerCase()), 1),
            u.entity.description ? (f(), h("span", gd, B(u.entity.description), 1)) : L("", !0)
          ]),
          _: 2
        }, 1032, ["href", "onPress"]),
        u.total ? L("", !0) : (f(), h("p", yd, B(s.value ? "No matches" : "Nothing here yet"), 1)),
        (f(!0), h(ne, null, he(u.rows, (m) => (f(), h("div", {
          key: m.key,
          class: "dc-type__row"
        }, [
          fe(Ye, {
            class: "dc-type__open",
            href: T(t).pressHref(m.row),
            onPress: ($) => T(t).activate(m.row, $)
          }, {
            default: Pe(() => [
              C("span", _d, [
                C("span", wd, B(m.parts.identity), 1),
                C("span", kd, B(m.parts.reference), 1)
              ])
            ]),
            _: 2
          }, 1032, ["href", "onPress"]),
          C("span", bd, [
            (f(!0), h(ne, null, he(m.parts.metrics.slice(0, 1), ($) => (f(), X(vn, {
              key: $.column.key ?? $.label,
              class: "dc-type__metric",
              entry: m,
              column: $.column
            }, {
              default: Pe(() => [
                C("span", $d, B($.text), 1),
                C("span", xd, B($.label), 1)
              ]),
              _: 2
            }, 1032, ["entry", "column"]))), 128)),
            m.parts.updated ? (f(), h("span", Md, B(m.parts.updated), 1)) : L("", !0),
            fe(lr, { entry: m }, null, 8, ["entry"]),
            fe(mn, { entry: m }, null, 8, ["entry"]),
            fe(hn, { entry: m }, null, 8, ["entry"])
          ])
        ]))), 128)),
        u.entity.create && !l.value ? (f(), h("button", {
          key: 1,
          type: "button",
          class: "dc-type__new",
          onClick: (m) => T(t).create(u.entity)
        }, [
          c[1] || (c[1] = C("span", {
            class: "dc-type__plus",
            "aria-hidden": "true"
          }, "+", -1)),
          Le(" " + B(u.entity.create), 1)
        ], 8, Sd)) : L("", !0)
      ], 8, pd))), 128)),
      we(o.$slots, "after", {}, void 0, !0)
    ], 8, cd));
  }
}), Xs = /* @__PURE__ */ le(Cd, [["__scopeId", "data-v-9cb44b6c"]]), Ed = ["data-dc-pending", "data-dc-more"], Pd = {
  key: 0,
  class: "dc-results__state dc-results__state--loading",
  "aria-live": "polite"
}, Ad = {
  key: 2,
  class: "dc-results__state",
  role: "alert"
}, Ld = { class: "dc-results__detail" }, Td = {
  key: 3,
  class: "dc-results__state",
  "aria-live": "polite"
}, Od = {
  key: 4,
  class: "dc-results__state"
}, Rd = { class: "dc-results__detail" }, zd = /* @__PURE__ */ oe({
  __name: "ResultsArea",
  props: {
    views: {},
    loading: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Ee(), a = cn(), r = {
      list: Na,
      cards: Ks,
      grid: Ws,
      images: js,
      table: Ys,
      links: Us,
      preview: Gs
    }, s = p(() => Ga(n.query.value, t.views)), l = p(() => ja(n.query.value.view, t.views)), i = p(() => r[l.value] ?? Na), o = p(() => n.rows.value.length > 0), c = p(() => n.error.value !== null), u = K(null);
    $e(
      // The page on screen, which is the draft's own while one is being typed.
      () => n.liveQuery.value.page,
      () => {
        u.value && (u.value.scrollTop = 0);
      }
    );
    const m = K(""), $ = K({ x: 0, y: 0 }), w = K(0);
    function k() {
      const y = u.value;
      if (!y) {
        m.value = "";
        return;
      }
      const S = {
        top: y.scrollTop > 1,
        right: y.scrollWidth - y.clientWidth - y.scrollLeft > 1,
        bottom: y.scrollHeight - y.clientHeight - y.scrollTop > 1,
        left: y.scrollLeft > 1
      };
      m.value = Object.entries(S).filter(([, b]) => b).map(([b]) => b).join(" "), $.value = {
        x: y.offsetHeight - y.clientHeight,
        y: y.offsetWidth - y.clientWidth
      }, w.value = y.querySelector("[data-dc-stuck]")?.offsetHeight ?? 0;
    }
    let g = null, M = null;
    return $e(
      u,
      (y, S) => {
        if (S?.removeEventListener("scroll", k), g?.disconnect(), M?.disconnect(), g = null, M = null, k(), !y || (y.addEventListener("scroll", k, { passive: !0 }), typeof ResizeObserver > "u")) return;
        const b = new ResizeObserver(k), x = () => {
          b.disconnect(), b.observe(y);
          for (const E of y.children) b.observe(E);
        };
        x(), g = b, !(typeof MutationObserver > "u") && (M = new MutationObserver(() => {
          x(), k();
        }), M.observe(y, { childList: !0 }));
      },
      { flush: "post" }
    ), Ne(() => {
      u.value?.removeEventListener("scroll", k), g?.disconnect(), M?.disconnect();
    }), (y, S) => (f(), h("div", {
      ref_key: "scroller",
      ref: u,
      class: "dc-results",
      "data-dc-pending": T(n).pending.value ? "true" : "false",
      "data-dc-more": m.value,
      style: Me({
        "--dc-results-gutter-x": `${$.value.x}px`,
        "--dc-results-gutter-y": `${$.value.y}px`,
        "--dc-results-stuck": `${w.value}px`
      })
    }, [
      e.loading ? (f(), h("p", Pd, [...S[1] || (S[1] = [
        C("span", { class: "dc-results__detail" }, "Loading…", -1)
      ])])) : s.value ? (f(), X(Xs, { key: 1 }, Ea({ _: 2 }, [
        a["cards-before"] ? {
          name: "before",
          fn: Pe(() => [
            we(y.$slots, "cards-before", {}, void 0, !0)
          ]),
          key: "0"
        } : void 0,
        a["cards-after"] ? {
          name: "after",
          fn: Pe(() => [
            we(y.$slots, "cards-after", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1024)) : c.value ? (f(), h("p", Ad, [
        S[2] || (S[2] = C("span", { class: "dc-results__headline" }, "Could not load results", -1)),
        C("span", Ld, B(T(n).error.value instanceof Error ? T(n).error.value.message : "The data source failed."), 1)
      ])) : !o.value && T(n).pending.value ? (f(), h("p", Td, [...S[3] || (S[3] = [
        C("span", { class: "dc-results__detail" }, "Running query…", -1)
      ])])) : o.value ? (f(), X(jn(i.value), { key: 5 })) : (f(), h("div", Od, [
        S[4] || (S[4] = C("span", { class: "dc-results__headline" }, "Nothing matches this query", -1)),
        C("span", Rd, B(T(n).summary.value), 1),
        T(n).isPristine.value ? L("", !0) : (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-results__clear",
          onClick: S[0] || (S[0] = (b) => T(n).clearFilters())
        }, B(T(n).isEverything.value ? "Clear filters" : "Search everything instead"), 1))
      ]))
    ], 12, Ed));
  }
}), Qs = /* @__PURE__ */ le(zd, [["__scopeId", "data-v-71c5b73f"]]), Id = ["data-dc-theme"], Nd = { class: "dc-shell__head" }, Bd = {
  key: 0,
  class: "dc-shell__page"
}, Fd = /* @__PURE__ */ oe({
  __name: "DataShell",
  props: /* @__PURE__ */ Tn({
    schema: {},
    source: {},
    route: {},
    defaults: {},
    within: {},
    limit: { default: 50 },
    previewsPerType: { default: 3 },
    views: {},
    loading: { type: Boolean, default: !1 },
    pageQuery: { default: "shell" },
    listPath: { default: "/" },
    recordCards: {},
    typeChooser: { default: "scoped" },
    selectionPlacement: { default: "start" },
    accent: {},
    tokens: {},
    theme: { default: "minimal" },
    pinnable: { type: Boolean },
    selectable: { type: Boolean },
    rowPress: { default: "narrow" },
    rowLinks: { type: Boolean, default: !1 },
    pagesNote: {},
    navigationMode: { default: "push" },
    facetNavigationMode: { default: "replace" }
  }, {
    pinned: { default: () => [] },
    pinnedModifiers: {},
    selected: { default: () => [] },
    selectedModifiers: {}
  }),
  emits: /* @__PURE__ */ Tn(["activate", "create", "duplicate", "delete", "operate", "drill", "query-change", "toggle-pin"], ["update:pinned", "update:selected"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, r = n, s = Ln(e, "pinned"), l = Ln(e, "selected"), i = cn(), o = St(ss, null), c = a.route || o ? null : tl(), u = a.route ?? o ?? c;
    Ne(() => c?.dispose?.());
    const m = K(!!i.page);
    jo(() => {
      m.value = !!i.page;
    });
    const $ = nl(u, {
      detached: () => m.value && a.pageQuery === "detached",
      path: () => a.listPath
    }), w = p(() => Yl({ seed: a.schema.key })), k = p(() => a.source ?? w.value), g = hi({
      schema: () => a.schema,
      adapter: $,
      defaults: () => a.defaults,
      navigationMode: () => a.navigationMode,
      facetNavigationMode: () => a.facetNavigationMode
    }), M = p(() => a.within?.trim() ?? ""), y = yi({
      query: g.query,
      entity: g.entity,
      schema: p(() => a.schema),
      setExpression: g.setExpression
    }), S = mi({
      source: k,
      query: y.live,
      schema: p(() => a.schema),
      entity: g.entity,
      limit: p(() => a.limit),
      within: M
    });
    $e(g.query, (I) => r("query-change", I));
    const b = p(() => ai(a.schema, [g.query.value.expr])), x = p(
      () => b.value.flatMap((I) => {
        const ee = a.schema.entities.find((pe) => pe.key === I.entityKey);
        return ee ? [{ ...I, entity: ee }] : [];
      })
    );
    function E() {
      if (i.record) return x.value;
      const I = a.recordCards;
      return I ? x.value.filter((ee) => I[ee.entityKey]) : [];
    }
    const z = p(() => {
      const I = a.views;
      return typeof I != "function" ? I : I({ entity: g.entity.value, records: b.value });
    });
    $e(
      [S.pageCount, S.pending, g.query, y.drafting, () => a.loading, m],
      () => {
        if (S.pending.value || y.drafting.value || a.loading || m.value) return;
        const I = S.pageCount.value;
        g.query.value.page > I && g.setPage(I, "replace");
      },
      // Immediately, since a pasted URL is past the end before anything changes;
      // and after the render, so the correction is a navigation the mounted shell
      // makes rather than one it makes on the way up. An async source is still
      // pending here and corrects itself when its count lands.
      { immediate: !0, flush: "post" }
    );
    const A = p(() => new Set(s.value));
    function P(I) {
      const ee = new Set(A.value);
      ee.has(I.id) ? ee.delete(I.id) : ee.add(I.id), s.value = [...ee], r("toggle-pin", I);
    }
    const W = p(() => {
      if (a.selectable === !0) return !0;
      const I = g.entity.value;
      return !!(I?.duplicate || I?.delete || I?.operations?.length);
    }), Z = p(() => new Set(l.value));
    function be(I) {
      const ee = new Set(Z.value);
      ee.has(I.id) ? ee.delete(I.id) : ee.add(I.id), l.value = [...ee];
    }
    function R(I) {
      const ee = new Set(Z.value);
      for (const pe of S.rows.value)
        I ? ee.add(pe.id) : ee.delete(pe.id);
      l.value = [...ee];
    }
    function G() {
      l.value.length && (l.value = []);
    }
    const H = p(() => ({
      ids: [...l.value],
      rows: S.rows.value.filter((I) => Z.value.has(I.id)),
      entity: g.entity.value
    }));
    $e(() => g.query.value.entity, G);
    function me(I, ee, pe = {}) {
      const qe = ga(a.schema, g.query.value, I, pe);
      pe.exclude ? g.narrow(qe, ee?.key ?? g.query.value.entity) : y.release(() => g.narrow(qe, ee?.key ?? null, ee ? void 0 : "cards")), r("drill", I, ee, pe);
    }
    function V(I) {
      return a.rowPress === "narrow" && Bn(a.schema, I) !== null;
    }
    function Y(I) {
      return a.schema.entities.find((pe) => pe.key === I.entityKey)?.href?.(I) || null;
    }
    const re = ri({
      ...g,
      draft: y.text,
      liveQuery: y.live,
      drafting: y.drafting,
      commitDraft: y.commit,
      abandonDraft: y.abandon,
      /*
       * A page of what is on screen: the draft's, while one is live, which are
       * held beside it rather than in the URL — see `liveQuery`.
       */
      setPage: (I, ee) => {
        y.drafting.value ? y.setPage(I) : g.setPage(I, ee);
      },
      schema: p(() => a.schema),
      entities: p(() => a.schema.entities),
      rows: S.rows,
      total: S.total,
      limit: p(() => a.limit),
      offset: S.offset,
      pageCount: S.pageCount,
      pending: S.pending,
      counting: S.counting,
      error: S.error,
      source: k,
      previewsPerType: p(() => a.previewsPerType),
      within: M,
      pinnable: p(() => a.pinnable === !0),
      isPinned: (I) => A.value.has(I.id),
      isPinnedId: (I) => A.value.has(I),
      togglePin: P,
      selectable: W,
      selection: H,
      isSelected: (I) => Z.value.has(I.id),
      toggleSelect: be,
      selectPage: R,
      clearSelection: G,
      narrowsOnPress: p(() => a.rowPress === "narrow"),
      rowLinks: p(() => a.rowLinks),
      /*
       * The one place a press is read, so every view gets the same answer without
       * knowing which of the two it is: they all call this.
       */
      activate: (I, ee = {}) => {
        if (V(I)) {
          me(I, null, ee);
          return;
        }
        const pe = Y(I);
        if (pe) {
          window.open(pe, "_blank", "noopener");
          return;
        }
        r("activate", I);
      },
      pressHref: (I) => V(I) ? g.narrowHref(ga(a.schema, g.query.value, I), null, "cards") : Y(I),
      recordHref: Y,
      drillHref: (I, ee) => Bn(a.schema, I) ? g.narrowHref(
        ga(a.schema, g.query.value, I),
        ee?.key ?? null,
        ee ? void 0 : "cards"
      ) : null,
      create: (I) => r("create", I),
      duplicate: () => r("duplicate", H.value),
      delete: () => r("delete", H.value),
      operate: (I) => r("operate", I, H.value),
      drill: me
    });
    li({ theme: () => a.theme, accent: () => a.accent, tokens: () => a.tokens });
    const ce = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    });
    return t({
      query: g.query
    }), (I, ee) => (f(), h("div", {
      class: "dc-shell",
      "data-dc-theme": e.theme,
      style: Me(ce.value)
    }, [
      C("div", Nd, [
        fe(Fs, {
          views: z.value,
          "pages-note": e.pagesNote,
          "hide-pages": e.loading || m.value
        }, Ea({ _: 2 }, [
          i.brand ? {
            name: "brand",
            fn: Pe((pe) => [
              we(I.$slots, "brand", Uo(Go(pe)), void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i.actions ? {
            name: "actions",
            fn: Pe(() => [
              we(I.$slots, "actions", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "pages-note", "hide-pages"])
      ]),
      i.page ? (f(), h("div", Bd, [
        we(I.$slots, "page", {
          query: T(re).query.value
        }, void 0, !0)
      ])) : L("", !0),
      i.page ? L("", !0) : (f(), X(Hs, {
        key: 1,
        views: z.value,
        "type-chooser": e.typeChooser,
        "selection-placement": e.selectionPlacement
      }, null, 8, ["views", "type-chooser", "selection-placement"])),
      i.page ? L("", !0) : we(I.$slots, "results", {
        rows: T(re).rows.value,
        total: T(re).total.value,
        offset: T(re).offset.value,
        pageCount: T(re).pageCount.value,
        query: T(re).liveQuery.value,
        pending: T(re).pending.value,
        loading: e.loading
      }, () => [
        fe(Qs, {
          views: z.value,
          loading: e.loading
        }, Ea({ _: 2 }, [
          i["cards-before"] || E().length ? {
            name: "cards-before",
            fn: Pe(() => [
              (f(!0), h(ne, null, he(E(), (pe) => (f(), h(ne, {
                key: `${pe.entityKey}:${pe.id}`
              }, [
                i.record ? we(I.$slots, "record", {
                  id: pe.id,
                  entity: pe.entity
                }, void 0, !0, 0) : (f(), X(jn(e.recordCards?.[pe.entityKey]), {
                  key: 1,
                  id: pe.id
                }, null, 8, ["id"]))
              ], 64))), 128)),
              we(I.$slots, "cards-before", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          i["cards-after"] ? {
            name: "cards-after",
            fn: Pe(() => [
              we(I.$slots, "cards-after", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["views", "loading"])
      ], !0, 2)
    ], 12, Id));
  }
}), Dd = /* @__PURE__ */ le(Fd, [["__scopeId", "data-v-fd5dae2d"]]), Hd = ["data-dc-muted", "data-dc-collapsed"], qd = ["data-dc-collapsible"], Vd = ["aria-expanded", "aria-controls"], Kd = { class: "dc-shell-card__sr" }, Wd = {
  key: 0,
  class: "dc-shell-card__identity"
}, jd = { class: "dc-shell-card__title dc-shell-card__name" }, Ud = {
  key: 0,
  class: "dc-shell-card__ref dc-mono"
}, Gd = {
  key: 1,
  class: "dc-shell-card__title"
}, Yd = {
  key: 2,
  class: "dc-shell-card__count dc-mono"
}, Xd = {
  key: 1,
  class: "dc-shell-card__aside"
}, Qd = ["data-dc-flush"], Zd = /* @__PURE__ */ oe({
  __name: "ShellCard",
  props: {
    title: {},
    name: {},
    reference: {},
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
    const n = e, a = t, r = K(n.defaultCollapsed === !0), s = p(() => n.span === "all" ? { gridColumn: "1 / -1" } : void 0), l = cn();
    function i(P) {
      return o(P?.() ?? []);
    }
    function o(P) {
      return P.some((W) => W.type === Yo ? !1 : W.type === Xo ? String(W.children ?? "").trim().length > 0 : W.type === ne ? o(W.children ?? []) : !0);
    }
    const c = p(
      () => !!n.title || !!n.name || u.value || i(l.head)
    ), u = p(() => i(l.aside)), m = p(() => i(l.default)), $ = p(() => i(l.foot)), w = p(
      () => !!n.name && (!!n.reference || i(l.reference))
    ), k = p(() => n.collapsible === !0 && c.value), g = p(() => k.value && (n.collapsed ?? r.value));
    function M() {
      const P = !g.value;
      r.value = P, a("update:collapsed", P);
    }
    const y = Kn() ?? "dc-shell-card", S = `${y}-body`, b = `${y}-foot`, x = p(
      () => [m.value ? S : "", $.value ? b : ""].filter(Boolean).join(" ") || void 0
    ), E = [
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
    ].join(", "), z = K(null);
    function A(P) {
      if (!k.value) return;
      const W = P.target?.closest(E);
      W && z.value?.contains(W) || typeof window < "u" && window.getSelection()?.toString() || M();
    }
    return (P, W) => (f(), h("section", {
      class: "dc-shell-card",
      style: Me(s.value),
      "data-dc-muted": e.muted ? "true" : "false",
      "data-dc-collapsed": g.value ? "true" : "false"
    }, [
      c.value ? (f(), h("header", {
        key: 0,
        ref_key: "head",
        ref: z,
        class: "dc-shell-card__head",
        "data-dc-collapsible": k.value ? "true" : "false",
        onClick: A
      }, [
        k.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-shell-card__toggle",
          "aria-expanded": g.value ? "false" : "true",
          "aria-controls": x.value,
          onClick: M
        }, [
          W[0] || (W[0] = C("svg", {
            class: "dc-shell-card__chevron",
            viewBox: "0 0 10 10",
            "aria-hidden": "true"
          }, [
            C("path", { d: "M2 3.5 5 6.5 8 3.5" })
          ], -1)),
          C("span", Kd, B(e.name || e.title || "Card"), 1)
        ], 8, Vd)) : L("", !0),
        we(P.$slots, "head", {}, () => [
          e.name ? (f(), h("div", Wd, [
            C("h2", jd, B(e.name), 1),
            w.value ? (f(), h("span", Ud, [
              we(P.$slots, "reference", {}, () => [
                Le(B(e.reference), 1)
              ], !0)
            ])) : L("", !0)
          ])) : (f(), h("h2", Gd, B(e.title), 1)),
          e.count !== void 0 ? (f(), h("span", Yd, B(e.count), 1)) : L("", !0)
        ], !0),
        u.value ? (f(), h("span", Xd, [
          we(P.$slots, "aside", {}, void 0, !0)
        ])) : L("", !0)
      ], 8, qd)) : L("", !0),
      m.value ? en((f(), h("div", {
        key: 1,
        id: S,
        class: "dc-shell-card__body",
        "data-dc-flush": e.flush ? "true" : "false"
      }, [
        we(P.$slots, "default", {}, void 0, !0)
      ], 8, Qd)), [
        [On, !g.value]
      ]) : L("", !0),
      $.value ? en((f(), h("footer", {
        key: 2,
        id: b,
        class: "dc-shell-card__foot"
      }, [
        we(P.$slots, "foot", {}, void 0, !0)
      ], 512)), [
        [On, !g.value]
      ]) : L("", !0)
    ], 12, Hd));
  }
}), Wv = /* @__PURE__ */ le(Zd, [["__scopeId", "data-v-3a7425d2"]]), Jd = ["aria-label"], ef = ["aria-checked", "data-dc-active", "tabindex", "onClick", "onKeydown"], tf = /* @__PURE__ */ oe({
  __name: "SegmentedControl",
  props: {
    modelValue: {},
    options: {},
    label: {},
    mono: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, r = K([]);
    function s(l, i) {
      const o = n.options.length;
      let c = null;
      if (l.key === "ArrowRight" || l.key === "ArrowDown" ? c = (i + 1) % o : l.key === "ArrowLeft" || l.key === "ArrowUp" ? c = (i - 1 + o) % o : l.key === "Home" ? c = 0 : l.key === "End" && (c = o - 1), c === null) return;
      l.preventDefault();
      const u = n.options[c];
      u && (a("update:modelValue", u.key), r.value[c]?.focus());
    }
    return (l, i) => (f(), h("div", {
      class: "dc-segmented",
      role: "radiogroup",
      "aria-label": e.label
    }, [
      (f(!0), h(ne, null, he(e.options, (o, c) => (f(), h("button", {
        key: o.key,
        ref_for: !0,
        ref_key: "buttons",
        ref: r,
        type: "button",
        role: "radio",
        class: Ve(["dc-segmented__item", { "dc-segmented__item--mono": e.mono }]),
        "aria-checked": o.key === e.modelValue,
        "data-dc-active": o.key === e.modelValue ? "true" : "false",
        tabindex: o.key === e.modelValue ? 0 : -1,
        onClick: (u) => a("update:modelValue", o.key),
        onKeydown: (u) => s(u, c)
      }, B(o.label), 43, ef))), 128))
    ], 8, Jd));
  }
}), nf = /* @__PURE__ */ le(tf, [["__scopeId", "data-v-63fb5482"]]), af = ["data-dc-theme", "aria-label"], rf = ["aria-expanded", "aria-disabled", "disabled", "data-dc-menu", "tabindex", "onClick", "onMouseenter"], sf = /* @__PURE__ */ oe({
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
    }), r = t, s = K(null), l = K([]), i = K(null), o = K(null), c = K(!1), u = p(
      () => n.menus.flatMap((x, E) => Xt(x) ? [E] : [])
    );
    function m(x, E) {
      const z = l.value[x]?.getBoundingClientRect(), A = n.menus[x];
      !z || !A || !Xt(A) || (o.value = { x: z.left, y: z.bottom + 2, mirrorX: z.right }, i.value = x, c.value = E);
    }
    function $(x) {
      const E = i.value;
      i.value = null, o.value = null, x && E !== null && l.value[E]?.focus();
    }
    function w(x) {
      i.value === x ? $(!0) : m(x, !1);
    }
    function k(x) {
      i.value === null || i.value === x || m(x, !1);
    }
    function g(x, E) {
      const z = u.value;
      if (z.length === 0) return null;
      if (x === null) return E === 1 ? z[0] ?? null : z[z.length - 1] ?? null;
      const A = z.indexOf(x);
      return A === -1 ? z[0] ?? null : z[(A + E + z.length) % z.length] ?? null;
    }
    function M(x) {
      const E = x.key;
      if (E === "Escape") {
        if (i.value === null) return;
        x.preventDefault(), $(!0);
        return;
      }
      if (E === "ArrowDown" && i.value === null) {
        const P = y();
        if (P === null) return;
        x.preventDefault(), m(P, !0);
        return;
      }
      if (E !== "ArrowLeft" && E !== "ArrowRight") return;
      const z = i.value ?? y(), A = g(z, E === "ArrowRight" ? 1 : -1);
      A !== null && (x.preventDefault(), i.value !== null ? m(A, !0) : l.value[A]?.focus());
    }
    function y() {
      const x = l.value.findIndex((E) => E === document.activeElement);
      return x === -1 ? u.value[0] ?? null : x;
    }
    function S(x) {
      const E = x.target;
      !E || s.value?.contains(E) || $(!1);
    }
    $e(i, (x) => {
      x !== null ? window.addEventListener("pointerdown", S, !0) : window.removeEventListener("pointerdown", S, !0);
    }), Ne(() => window.removeEventListener("pointerdown", S, !0));
    function b(x) {
      $(!0), x.action?.(), r("choose", x);
    }
    return (x, E) => (f(), h("div", {
      ref_key: "bar",
      ref: s,
      class: "dc-shell dc-menubar",
      role: "menubar",
      "data-dc-theme": e.theme,
      "aria-label": e.label ?? "Main menu",
      style: Me(a.value),
      onKeydown: M
    }, [
      (f(!0), h(ne, null, he(e.menus, (z, A) => (f(), h("button", {
        key: z.id ?? z.label ?? A,
        ref_for: !0,
        ref: (P) => {
          P && (l.value[A] = P);
        },
        type: "button",
        class: "dc-menubar__item",
        role: "menuitem",
        "aria-haspopup": "menu",
        "aria-expanded": i.value === A,
        "aria-disabled": z.disabled ? "true" : void 0,
        disabled: z.disabled,
        "data-dc-menu": z.id ?? z.label,
        tabindex: A === (u.value[0] ?? 0) ? 0 : -1,
        onClick: (P) => w(A),
        onMouseenter: (P) => k(A)
      }, B(z.label), 41, rf))), 128)),
      i.value !== null && o.value ? (f(), X(sr, {
        key: i.value,
        items: e.menus[i.value]?.items ?? [],
        at: o.value,
        label: e.menus[i.value]?.label,
        autofocus: c.value,
        onChoose: b,
        onDismiss: E[0] || (E[0] = (z) => $(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
    ], 44, af));
  }
}), jv = /* @__PURE__ */ le(sf, [["__scopeId", "data-v-93dbd2e4"]]), of = ["aria-label", "aria-expanded", "disabled"], lf = { "aria-hidden": "true" }, cf = /* @__PURE__ */ oe({
  __name: "MenuButton",
  props: {
    items: {},
    label: {},
    glyph: { default: "⋯" }
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const n = t, a = K(null), r = K(null), s = K(null), l = K(!1), i = p(() => s.value !== null);
    function o(k) {
      const g = a.value?.getBoundingClientRect();
      g && (s.value = { x: g.left, y: g.bottom + 4, mirrorX: g.right }, l.value = k);
    }
    function c(k) {
      s.value = null, k && a.value?.focus();
    }
    function u() {
      i.value ? c(!0) : o(!1);
    }
    function m(k) {
      k.key !== "ArrowDown" || i.value || (k.preventDefault(), o(!0));
    }
    function $(k) {
      const g = k.target;
      g && (a.value?.contains(g) || r.value?.root?.contains(g) || c(!1));
    }
    $e(i, (k) => {
      k ? window.addEventListener("pointerdown", $, !0) : window.removeEventListener("pointerdown", $, !0);
    }), Ne(() => window.removeEventListener("pointerdown", $, !0));
    function w(k) {
      c(!0), k.action?.(), n("choose", k);
    }
    return (k, g) => (f(), h(ne, null, [
      C("button", {
        ref_key: "trigger",
        ref: a,
        type: "button",
        class: "dc-menu-button",
        "aria-label": e.label,
        "aria-haspopup": "menu",
        "aria-expanded": i.value,
        disabled: e.items.length === 0,
        onClick: u,
        onKeydown: m
      }, [
        C("span", lf, B(e.glyph), 1)
      ], 40, of),
      s.value ? (f(), X(sr, {
        key: 0,
        ref_key: "menu",
        ref: r,
        items: e.items,
        at: s.value,
        label: e.label,
        autofocus: l.value,
        onChoose: w,
        onDismiss: g[0] || (g[0] = (M) => c(!0))
      }, null, 8, ["items", "at", "label", "autofocus"])) : L("", !0)
    ], 64));
  }
}), ir = /* @__PURE__ */ le(cf, [["__scopeId", "data-v-48f5ada5"]]), uf = { class: "dc-fact__label" }, df = ["title"], ff = /* @__PURE__ */ oe({
  __name: "ShellFact",
  props: {
    label: {},
    value: {},
    title: {},
    wide: { type: Boolean }
  },
  setup(e) {
    const t = e, n = p(() => {
      const r = t.value;
      if (r == null || r === "") return [it];
      if (Array.isArray(r)) {
        const s = r.filter((l) => l != null && l !== "");
        return s.length ? s.map(String) : [it];
      }
      return [String(r)];
    }), a = p(() => t.wide ? { gridColumn: "1 / -1" } : void 0);
    return (r, s) => (f(), h("div", {
      class: "dc-fact",
      style: Me(a.value)
    }, [
      C("dt", uf, [
        we(r.$slots, "label", {}, () => [
          Le(B(e.label), 1)
        ], !0)
      ]),
      C("dd", {
        class: "dc-fact__value dc-mono",
        title: e.title
      }, [
        we(r.$slots, "default", {}, () => [
          n.value.length === 1 ? (f(), h(ne, { key: 0 }, [
            Le(B(n.value[0]), 1)
          ], 64)) : (f(!0), h(ne, { key: 1 }, he(n.value, (l, i) => (f(), h("span", {
            key: i,
            class: "dc-fact__line"
          }, B(l), 1))), 128))
        ], !0)
      ], 8, df)
    ], 4));
  }
}), pf = /* @__PURE__ */ le(ff, [["__scopeId", "data-v-1f6d25e6"]]), vf = /* @__PURE__ */ oe({
  __name: "ShellFacts",
  props: {
    items: { default: () => [] },
    min: { default: "200px" }
  },
  setup(e) {
    const t = e, n = p(() => ({ "--dc-facts-min": t.min }));
    return (a, r) => (f(), h("dl", {
      class: "dc-facts",
      style: Me(n.value)
    }, [
      (f(!0), h(ne, null, he(e.items, (s, l) => (f(), X(pf, {
        key: `${l}:${s.label}`,
        label: s.label,
        value: s.value,
        title: s.title,
        wide: s.wide
      }, null, 8, ["label", "value", "title", "wide"]))), 128)),
      we(a.$slots, "default", {}, void 0, !0)
    ], 4));
  }
}), Uv = /* @__PURE__ */ le(vf, [["__scopeId", "data-v-17455afa"]]), hf = { class: "dc-counts" }, mf = ["data-dc-tone"], gf = {
  key: 0,
  class: "dc-counts__empty"
}, yf = /* @__PURE__ */ oe({
  __name: "StatusCounts",
  props: {
    counts: {},
    empty: { default: it }
  },
  setup(e) {
    const t = e, n = p(() => t.counts.filter((a) => a.count > 0));
    return (a, r) => (f(), h("span", hf, [
      (f(!0), h(ne, null, he(n.value, (s) => (f(), h("span", {
        key: s.label,
        class: "dc-counts__count",
        "data-dc-tone": s.tone ?? "neutral"
      }, B(s.count) + " " + B(s.label), 9, mf))), 128)),
      n.value.length === 0 ? (f(), h("span", gf, B(e.empty), 1)) : L("", !0)
    ]));
  }
}), Gv = /* @__PURE__ */ le(yf, [["__scopeId", "data-v-5553a9e2"]]), _f = ["data-dc-copied", "title", "aria-label"], wf = {
  key: 0,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, kf = {
  key: 1,
  class: "dc-copy__mark",
  viewBox: "0 0 16 16",
  "aria-hidden": "true"
}, bf = 1500, $f = /* @__PURE__ */ oe({
  __name: "CopyButton",
  props: {
    text: {},
    label: { default: "Copy to clipboard" }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, r = K(!1);
    let s;
    async function l() {
      const i = typeof n.text == "function" ? n.text() : n.text;
      try {
        if (!navigator.clipboard) throw new Error("The clipboard is not available here");
        await navigator.clipboard.writeText(i);
      } catch (o) {
        a("error", o);
        return;
      }
      r.value = !0, clearTimeout(s), s = setTimeout(() => {
        r.value = !1;
      }, bf), a("copied", i);
    }
    return Ne(() => clearTimeout(s)), (i, o) => (f(), h("button", {
      type: "button",
      class: "dc-copy",
      "data-dc-copied": r.value ? "true" : "false",
      title: r.value ? "Copied" : e.label,
      "aria-label": e.label,
      onClick: l
    }, [
      r.value ? (f(), h("svg", kf, [...o[1] || (o[1] = [
        C("path", { d: "M3 8.5l3.2 3L13 4.5" }, null, -1)
      ])])) : (f(), h("svg", wf, [...o[0] || (o[0] = [
        C("rect", {
          x: "5.5",
          y: "5.5",
          width: "8",
          height: "9",
          rx: "1.5"
        }, null, -1),
        C("path", { d: "M10.5 3.5v-1a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1" }, null, -1)
      ])]))
    ], 8, _f));
  }
}), xf = /* @__PURE__ */ le($f, [["__scopeId", "data-v-f4249d7f"]]), Mf = ["data-dc-copy", "data-dc-wrap", "data-dc-tone"], Sf = /* @__PURE__ */ oe({
  __name: "ShellCode",
  props: {
    code: { default: void 0 },
    maxHeight: { default: void 0 },
    copy: { type: Boolean },
    copyLabel: { default: "Copy to clipboard" },
    wrap: { type: Boolean, default: !0 },
    tone: { default: void 0 }
  },
  emits: ["copied", "error"],
  setup(e, { emit: t }) {
    const n = e, a = t, r = K(null), s = p(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    function l() {
      return n.code ?? r.value?.textContent ?? "";
    }
    return (i, o) => (f(), h("div", {
      class: "dc-code",
      "data-dc-copy": e.copy ? "true" : "false",
      "data-dc-wrap": e.wrap ? "true" : "false",
      "data-dc-tone": e.tone
    }, [
      C("pre", {
        ref_key: "pre",
        ref: r,
        class: "dc-code__text dc-mono",
        style: Me(s.value)
      }, [
        we(i.$slots, "default", {}, () => [
          Le(B(e.code), 1)
        ], !0)
      ], 4),
      e.copy ? (f(), X(xf, {
        key: 0,
        class: "dc-code__copy",
        text: l,
        label: e.copyLabel,
        onCopied: o[0] || (o[0] = (c) => a("copied", c)),
        onError: o[1] || (o[1] = (c) => a("error", c))
      }, null, 8, ["label"])) : L("", !0)
    ], 8, Mf));
  }
}), Yv = /* @__PURE__ */ le(Sf, [["__scopeId", "data-v-67b371dd"]]), Cf = 24, Ef = /* @__PURE__ */ oe({
  __name: "ShellLog",
  props: {
    fetchChunk: {},
    stripAnsi: { type: Boolean },
    maxHeight: { default: "460px" }
  },
  setup(e, { expose: t }) {
    const n = e, a = K(""), r = p(() => n.stripAnsi ? ul(a.value) : a.value), s = K(null);
    let l = 0, i = null;
    function o() {
      return i ??= c().finally(() => {
        i = null;
      }), i;
    }
    async function c() {
      const { chunk: $, offset: w } = await n.fetchChunk(l);
      if (l = w, !$) return;
      const k = s.value, g = !k || k.scrollTop + k.clientHeight >= k.scrollHeight - Cf;
      a.value += $, g && (await yt(), s.value && (s.value.scrollTop = s.value.scrollHeight));
    }
    function u() {
      a.value = "", l = 0;
    }
    const m = p(() => n.maxHeight === void 0 ? void 0 : { maxHeight: typeof n.maxHeight == "number" ? `${n.maxHeight}px` : n.maxHeight });
    return t({ poll: o, reset: u }), ($, w) => (f(), h("pre", {
      ref_key: "pane",
      ref: s,
      class: "dc-log dc-mono",
      style: Me(m.value)
    }, B(r.value), 5));
  }
}), Xv = /* @__PURE__ */ le(Ef, [["__scopeId", "data-v-2c86947e"]]), Pf = ["data-dc-theme"], Af = ["aria-labelledby", "aria-label"], Lf = {
  key: 1,
  class: "dc-dialog__actions"
}, jt = [], Tf = /* @__PURE__ */ oe({
  __name: "ShellDialog",
  props: {
    open: { type: Boolean, default: !0 },
    title: { default: void 0 },
    label: { default: void 0 },
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 },
    panelClass: { default: void 0 },
    bodyClass: { default: void 0 }
  },
  emits: ["close", "update:open"],
  setup(e, { emit: t }) {
    const n = e, a = t, { theme: r, style: s, adopt: l } = ar(n), i = `${Kn() ?? "dc-dialog"}-title`, o = K(null);
    function c() {
      a("close"), a("update:open", !1);
    }
    const u = Symbol("dc-dialog");
    function m(b) {
      b.key !== "Escape" || b.defaultPrevented || jt[jt.length - 1] === u && (b.preventDefault(), c());
    }
    let $ = !1;
    function w(b) {
      $ = b.target === b.currentTarget;
    }
    function k(b) {
      b.target === b.currentTarget && $ && c(), $ = !1;
    }
    const g = [
      "[autofocus]",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])'
    ].join(", ");
    let M = null;
    async function y() {
      jt.push(u), document.addEventListener("keydown", m), M = document.activeElement instanceof HTMLElement ? document.activeElement : null, l(), await yt(), (o.value?.querySelector("[autofocus]") ?? o.value?.querySelector(g) ?? o.value)?.focus();
    }
    function S() {
      const b = jt.indexOf(u);
      b !== -1 && (jt.splice(b, 1), document.removeEventListener("keydown", m), M?.isConnected && M.focus(), M = null);
    }
    return un(() => {
      n.open && y();
    }), $e(
      () => n.open,
      (b) => {
        b ? y() : S();
      }
    ), Ne(S), (b, x) => e.open ? (f(), X(Wn, {
      key: 0,
      to: e.to
    }, [
      C("div", {
        class: "dc-shell dc-layer dc-dialog",
        "data-dc-theme": T(r),
        style: Me(T(s)),
        onPointerdown: w,
        onClick: k
      }, [
        C("div", {
          ref_key: "panel",
          ref: o,
          class: Ve(["dc-dialog__panel", e.panelClass]),
          role: "dialog",
          "aria-modal": "true",
          tabindex: "-1",
          "aria-labelledby": e.title ? i : void 0,
          "aria-label": e.title ? void 0 : e.label
        }, [
          e.title ? (f(), h("h2", {
            key: 0,
            id: i,
            class: "dc-dialog__title"
          }, B(e.title), 1)) : L("", !0),
          C("div", {
            class: Ve(["dc-dialog__body", e.bodyClass])
          }, [
            we(b.$slots, "default", {}, void 0, !0)
          ], 2),
          b.$slots.actions ? (f(), h("div", Lf, [
            we(b.$slots, "actions", {}, void 0, !0)
          ])) : L("", !0)
        ], 10, Af)
      ], 44, Pf)
    ], 8, ["to"])) : L("", !0);
  }
}), Qv = /* @__PURE__ */ le(Tf, [["__scopeId", "data-v-1e126064"]]), Of = 4500, Rf = 9e3, on = K([]);
let Kr = 0;
function Zs(e) {
  on.value = on.value.filter((t) => t.id !== e);
}
function Js(e, t = "ok") {
  Kr += 1;
  const n = Kr;
  on.value = [...on.value, { id: n, message: e, kind: t }], setTimeout(() => Zs(n), t === "err" ? Rf : Of);
}
function zf(e) {
  Js(e instanceof Error ? e.message : String(e), "err");
}
function If() {
  return { toasts: Qo(on), toast: Js, toastError: zf, dismiss: Zs };
}
const Nf = ["data-dc-theme"], Bf = ["data-dc-kind", "role"], Ff = /* @__PURE__ */ oe({
  __name: "ShellToasts",
  props: {
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  setup(e) {
    const t = e, { toasts: n } = If(), { theme: a, style: r, adopt: s } = ar(t);
    return un(s), (l, i) => (f(), X(Wn, { to: e.to }, [
      C("div", {
        class: "dc-shell dc-layer dc-toasts",
        "data-dc-theme": T(a),
        style: Me(T(r)),
        "aria-live": "polite"
      }, [
        (f(!0), h(ne, null, he(T(n), (o) => (f(), h("div", {
          key: o.id,
          class: "dc-toast",
          "data-dc-kind": o.kind,
          role: o.kind === "err" ? "alert" : void 0
        }, B(o.message), 9, Bf))), 128))
      ], 12, Nf)
    ], 8, ["to"]));
  }
}), Zv = /* @__PURE__ */ le(Ff, [["__scopeId", "data-v-6fb044ee"]]), Df = 4, Hf = 8, qf = 180;
function Vf(e, t, n, a = {}) {
  const r = a.gap ?? Df, s = a.margin ?? Hf, l = a.flipBelow ?? qf, i = a.side ?? "below", o = {
    below: n.height - e.bottom - r - s,
    above: e.top - r - s
  }, c = i === "below" ? "above" : "below", u = o[i] < l && o[c] > o[i] ? c : i, m = Math.min(a.maxHeight ?? 1 / 0, Math.max(0, o[u])), $ = Math.max(0, n.width - s * 2), w = Math.min(e.width, $), k = Math.min(Math.max(t, w), $), g = a.align === "end" ? e.right - k : e.left, M = Math.max(s, Math.min(g, n.width - k - s));
  return u === "below" ? { side: u, left: M, top: e.bottom + r, maxHeight: m, minWidth: w, maxWidth: $ } : { side: u, left: M, bottom: n.height - e.top + r, maxHeight: m, minWidth: w, maxWidth: $ };
}
const Kf = ["data-dc-theme", "data-dc-side"], vt = [], Wf = /* @__PURE__ */ oe({
  inheritAttrs: !1,
  __name: "ShellPopover",
  props: {
    open: { type: Boolean, default: !1 },
    anchor: { default: null },
    side: { default: "below" },
    align: { default: "start" },
    maxHeight: { default: void 0 },
    to: { default: "body" },
    theme: { default: void 0 },
    accent: { default: void 0 },
    tokens: { default: void 0 }
  },
  emits: ["update:open", "close"],
  setup(e, { emit: t }) {
    const n = e, a = t, { theme: r, style: s, adopt: l } = ar(n), i = K(null), o = K(null), c = { root: () => i.value };
    function u() {
      const b = n.anchor;
      b && (o.value = Vf(
        b.getBoundingClientRect(),
        i.value?.offsetWidth ?? 0,
        { width: window.innerWidth, height: window.innerHeight },
        { side: n.side, align: n.align, maxHeight: n.maxHeight }
      ));
    }
    const m = p(() => {
      const b = o.value, x = b ? {
        position: "fixed",
        left: `${b.left}px`,
        ...b.top !== void 0 ? { top: `${b.top}px` } : {},
        ...b.bottom !== void 0 ? { bottom: `${b.bottom}px` } : {},
        minWidth: `${b.minWidth}px`,
        maxWidth: `${b.maxWidth}px`,
        maxHeight: `${b.maxHeight}px`,
        overflowY: "auto"
      } : { position: "fixed", visibility: "hidden" };
      return { ...s.value, ...x };
    });
    function $() {
      a("update:open", !1), a("close");
    }
    function w(b) {
      return i.value?.contains(b) || n.anchor?.contains(b) ? !0 : vt.slice(vt.indexOf(c) + 1).some((E) => E.root()?.contains(b));
    }
    function k(b) {
      const x = b.target;
      x && !w(x) && $();
    }
    function g(b) {
      b.key !== "Escape" || b.defaultPrevented || vt[vt.length - 1] === c && (b.preventDefault(), i.value?.contains(document.activeElement) && n.anchor?.focus(), $());
    }
    let M = null;
    async function y() {
      vt.includes(c) || (vt.push(c), l(), o.value = null, await yt(), u(), window.addEventListener("pointerdown", k, !0), document.addEventListener("keydown", g, !0), window.addEventListener("resize", u), window.addEventListener("scroll", u, !0), typeof ResizeObserver < "u" && i.value && (M = new ResizeObserver(() => u()), M.observe(i.value)));
    }
    function S() {
      const b = vt.indexOf(c);
      b !== -1 && (vt.splice(b, 1), window.removeEventListener("pointerdown", k, !0), document.removeEventListener("keydown", g, !0), window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0), M?.disconnect(), M = null);
    }
    return un(() => {
      n.open && y();
    }), $e(
      () => n.open,
      (b) => {
        b ? y() : S();
      }
    ), $e(() => n.anchor, () => {
      n.open && u();
    }), Ne(S), (b, x) => e.open ? (f(), X(Wn, {
      key: 0,
      to: e.to
    }, [
      C("div", Zo({
        ref_key: "root",
        ref: i
      }, b.$attrs, {
        class: "dc-shell dc-layer dc-popover",
        "data-dc-theme": T(r),
        "data-dc-side": o.value?.side,
        style: m.value
      }), [
        we(b.$slots, "default", {}, void 0, !0)
      ], 16, Kf)
    ], 8, ["to"])) : L("", !0);
  }
}), Jv = /* @__PURE__ */ le(Wf, [["__scopeId", "data-v-65ca5cb0"]]), qt = (e) => e.kind === "split", J = (e) => e.kind === "group", ie = (e) => e.kind === "float", xt = { x: 16, y: 16, w: 360, h: 260 }, Hn = 28, eo = 120, Ba = 220, to = 38, Tt = 6;
function gn(e, t) {
  let n = !1;
  const a = e.frames.map((r, s) => {
    const l = t(r.node, s);
    return l === r.node ? r : (n = !0, { ...r, node: l });
  });
  return n ? { ...e, frames: a } : e;
}
function et(e) {
  return { kind: "group", panels: [e] };
}
function eh(e, t, n) {
  return {
    kind: "group",
    panels: e,
    ...t ? { active: t } : {},
    ...n ? { title: n } : {}
  };
}
const xe = (e) => typeof e == "string", aa = (e) => xe(e) ? et(e) : e, yn = (e) => xe(e) ? [e] : Ge(e), Wr = (e) => e.panels.filter(xe), jf = (e) => e.panels.filter((t) => !xe(t)), je = (e, t) => e.panels.includes(t);
function _n(e, t, n) {
  let a = !1;
  const r = e.panels.map((s) => {
    if (xe(s) || !ye(s, t)) return s;
    const l = n(s);
    return l !== s && (a = !0), l;
  });
  return a ? { ...e, panels: r } : e;
}
function ra(e, t) {
  return { node: e, rect: { ...xt, ...t } };
}
function cr(e, t) {
  return t ? { kind: "float", frames: e, title: t } : { kind: "float", frames: e };
}
function sa(e, t) {
  const n = { ...xt, ...t };
  return cr(
    e.map(
      (a, r) => ra(a, {
        ...n,
        x: n.x + r * Hn,
        y: n.y + r * Hn
      })
    )
  );
}
function ur(e, t, n, a) {
  return {
    kind: "split",
    direction: e,
    children: t,
    ...n ? { sizes: n } : {},
    ...a ? { title: a } : {}
  };
}
const dr = (e, t, n) => ur("row", e, t, n), th = (e, t, n) => ur("column", e, t, n);
function Ae(e) {
  return {
    ...e.title ? { title: e.title } : {},
    ...e.fixedView ? { fixedView: !0 } : {},
    ...e.headless ? { headless: !0 } : {}
  };
}
const Et = (e) => e.fixedView === !0 || e.headless === !0 || !!e.title, Uf = (e) => ({ ...e, headless: !0 }), nh = (e) => ({ ...e, fixedView: !0 }), Gf = (e) => e === "left" || e === "right" ? "row" : "column";
function Ge(e) {
  return J(e) ? e.panels.flatMap(yn) : ie(e) ? e.frames.flatMap((t) => Ge(t.node)) : e.children.flatMap(Ge);
}
function ye(e, t) {
  return J(e) ? e.panels.some((n) => xe(n) ? n === t : ye(n, t)) : ie(e) ? e.frames.some((n) => ye(n.node, t)) : e.children.some((n) => ye(n, t));
}
const no = (e) => Ge(e).length === 0, Fa = (e) => !J(e) && Et(e), Da = (e) => no(e) && !Fa(e);
function oa(e) {
  return qt(e) ? e.children.map((t, n) => ({ node: t, index: n })) : ie(e) ? e.frames.map((t, n) => ({ node: t.node, index: n })) : e.panels.flatMap((t, n) => xe(t) ? [] : [{ node: t, index: n }]);
}
const fr = (e) => oa(e).map((t) => t.node);
function Lt(e) {
  const t = e.active;
  if (t) {
    const n = e.panels.findIndex(
      (a) => xe(a) ? a === t : ye(a, t)
    );
    if (n >= 0) return n;
  }
  return 0;
}
function ao(e) {
  const t = e.panels[Lt(e)];
  return t !== void 0 && xe(t) ? t : "";
}
function Ie(e) {
  if (xe(e)) return e;
  if (J(e)) {
    const n = e.panels[Lt(e)];
    return n === void 0 ? "" : Ie(n);
  }
  if (ie(e)) {
    const n = e.frames[e.frames.length - 1];
    return n ? Ie(n.node) : "";
  }
  const t = e.children[0];
  return t ? Ie(t) : "";
}
function Rt(e, t) {
  if (J(e) && je(e, t)) return e;
  for (const n of fr(e)) {
    const a = Rt(n, t);
    if (a) return a;
  }
  return null;
}
function Yf(e) {
  const t = fr(e).flatMap(Yf);
  return J(e) ? [e, ...t] : t;
}
function Re(e, t) {
  if (J(e)) {
    for (const n of jf(e)) {
      const a = Re(n, t);
      if (a) return a;
    }
    return null;
  }
  if (ie(e)) {
    for (const n of e.frames)
      if (ye(n.node, t))
        return Re(n.node, t) ?? n;
    return null;
  }
  for (const n of e.children) {
    const a = Re(n, t);
    if (a) return a;
  }
  return null;
}
function _a(e, t, n = eo) {
  const a = (i, o) => o > 0 ? Math.max(Math.min(i, o), Math.min(n, o)) : Math.max(i, n), r = a(e.w, t.w), s = a(e.h, t.h), l = (i, o, c) => Math.min(Math.max(i, 0), Math.max(c - o, 0));
  return {
    x: Math.round(l(e.x, r, t.w)),
    y: Math.round(l(e.y, s, t.h)),
    w: Math.round(r),
    h: Math.round(s)
  };
}
function jr(e, t, n, a, r = eo) {
  let { x: s, y: l, w: i, h: o } = e;
  return t.includes("e") && (i = e.w + n), t.includes("w") && (i = e.w - n, s = e.x + n), t.includes("s") && (o = e.h + a), t.includes("n") && (o = e.h - a, l = e.y + a), i < r && (t.includes("w") && (s = e.x + e.w - r), i = r), o < r && (t.includes("n") && (l = e.y + e.h - r), o = r), { x: s, y: l, w: i, h: o };
}
const ro = (e, t) => e.x === t.x && e.y === t.y && e.w === t.w && e.h === t.h;
function zt(e, t, n) {
  if (J(e)) return _n(e, t, (s) => zt(s, t, n));
  if (ie(e)) {
    let s = !1;
    const l = e.frames.map((i) => {
      if (!ye(i.node, t)) return i;
      if (Re(i.node, t)) {
        const c = zt(i.node, t, n);
        return c === i.node ? i : (s = !0, { ...i, node: c });
      }
      const o = n(i);
      return o === i ? i : (s = !0, o);
    });
    return s ? { ...e, frames: l } : e;
  }
  if (!ye(e, t)) return e;
  let a = !1;
  const r = e.children.map((s) => {
    const l = zt(s, t, n);
    return l !== s && (a = !0), l;
  });
  return a ? { ...e, children: r } : e;
}
function Xf(e, t, n) {
  return zt(e, t, (a) => ro(a.rect, n) ? a : { ...a, rect: n });
}
const ht = (e) => e.maximized === !0, so = (e) => (t) => {
  if (ht(t) === e) return t;
  if (e) {
    const { minimized: r, ...s } = t;
    return { ...s, maximized: !0 };
  }
  const { maximized: n, ...a } = t;
  return a;
};
function Qf(e, t, n = !0) {
  return zt(e, t, so(n));
}
function ah(e, t) {
  const n = Re(e, t);
  return n ? Qf(e, t, !ht(n)) : e;
}
const bt = (e) => e.minimized === !0, oo = (e) => (t) => {
  if (bt(t) === e) return t;
  if (e) {
    const { maximized: r, ...s } = t;
    return { ...s, minimized: !0 };
  }
  const { minimized: n, ...a } = t;
  return a;
};
function Zf(e, t, n = !0) {
  return zt(e, t, oo(n));
}
function rh(e, t) {
  const n = Re(e, t);
  return n ? Zf(e, t, !bt(n)) : e;
}
function kt(e, t) {
  const n = t[t.length - 1];
  if (n === void 0) return null;
  const a = Ue(e, t.slice(0, -1));
  return !a || !ie(a) ? null : a.frames[n] ?? null;
}
function Ha(e, t) {
  if (ie(e)) {
    for (const [n, a] of e.frames.entries()) {
      if (!ye(a.node, t)) continue;
      const r = Ha(a.node, t);
      return r ? [n, ...r] : [n];
    }
    return null;
  }
  for (const { node: n, index: a } of oa(e)) {
    if (!ye(n, t)) continue;
    const r = Ha(n, t);
    return r ? [a, ...r] : null;
  }
  return null;
}
function pr(e, t, n) {
  const a = t[t.length - 1];
  if (a === void 0) return e;
  const r = t.slice(0, -1), s = Ue(e, r);
  if (!s || !ie(s)) return e;
  const l = s.frames[a];
  if (!l) return e;
  const i = n(l);
  if (i === l) return e;
  const o = [...s.frames];
  return o[a] = i, lt(e, r, { ...s, frames: o });
}
function Ur(e, t, n) {
  return pr(
    e,
    t,
    (a) => ro(a.rect, n) ? a : { ...a, rect: n }
  );
}
function Jf(e, t, n = !0) {
  return pr(e, t, so(n));
}
function ep(e, t, n = !0) {
  return pr(e, t, oo(n));
}
function Qt(e, t) {
  const [n, ...a] = t;
  if (n === void 0) return e;
  if (ie(e)) {
    const l = e.frames[n];
    if (!l) return e;
    const i = Qt(l.node, a), o = i === l.node ? l : { ...l, node: i };
    if (n === e.frames.length - 1 && o === l) return e;
    const c = [...e.frames];
    return c.splice(n, 1), c.push(o), { ...e, frames: c };
  }
  const r = Ue(e, [n]);
  if (!r) return e;
  const s = Qt(r, a);
  return s === r ? e : lt(e, [n], s);
}
function tp(e, t) {
  const n = [...t];
  let a = e;
  return t.forEach((r, s) => {
    a && (ie(a) && (n[s] = a.frames.length - 1), a = Ue(a, [r]));
  }), n;
}
function Cn(e, t, n, a) {
  if (J(e)) return _n(e, n, (l) => Cn(l, t, n, a));
  if (ie(e)) {
    const l = e.frames.findIndex((o) => ye(o.node, n)), i = e.frames[l];
    if (!i) return e;
    if (Re(i.node, n)) {
      const o = Cn(i.node, t, n, a);
      if (o === i.node) return e;
      const c = [...e.frames];
      return c[l] = { ...i, node: o }, { ...e, frames: c };
    }
    return { ...e, frames: [...e.frames, ra(et(t), a)] };
  }
  if (!ye(e, n)) return e;
  let r = !1;
  const s = e.children.map((l) => {
    const i = Cn(l, t, n, a);
    return i !== l && (r = !0), i;
  });
  return r ? { ...e, children: s } : e;
}
function Gr(e, t, n, a) {
  if (t === n || !ye(e, t) || !ye(e, n) || !Re(e, n)) return e;
  const r = Mt(e, t);
  if (!r) return e;
  const s = Cn(r, t, n, a);
  return s === r ? e : Ce(s);
}
function np(e, t, n) {
  return ie(e) ? { ...e, frames: [...e.frames, ra(et(t), n)] } : J(e) ? io(e, t) : {
    kind: "split",
    direction: e.direction,
    children: [...e.children, et(t)],
    sizes: [...dt(e), 1],
    ...Ae(e)
  };
}
function lo(e, t, n, a) {
  const r = n[0];
  if (r === void 0) return np(e, t, a);
  const s = n.slice(1), l = (u, m) => m === r ? lo(u, t, s, a) : Mt(u, t);
  if (ie(e)) {
    const u = e.frames.flatMap((m, $) => {
      const w = l(m.node, $);
      return w ? [w === m.node ? m : { ...m, node: w }] : [];
    });
    return { ...e, frames: u };
  }
  if (J(e)) {
    const u = Lt(e), m = [];
    e.panels.forEach((k, g) => {
      if (xe(k)) {
        k !== t && m.push(k);
        return;
      }
      const M = l(k, g);
      M && m.push(M);
    });
    const w = e.active && m.some((k) => yn(k).includes(e.active)) ? e.active : Ie(m[u] ?? m[m.length - 1]);
    return {
      kind: "group",
      panels: m,
      ...w ? { active: w } : {},
      ...Ae(e)
    };
  }
  const i = dt(e), o = [], c = [];
  return e.children.forEach((u, m) => {
    const $ = l(u, m);
    $ && (o.push($), c.push(i[m] ?? 0));
  }), { kind: "split", direction: e.direction, children: o, sizes: c, ...Ae(e) };
}
function Yr(e, t, n, a) {
  const r = Ue(e, n);
  return !r || !no(r) || !ye(e, t) ? e : Ce(lo(e, t, n, a));
}
function wa(e, t) {
  if (J(e)) return _n(e, t, (r) => wa(r, t));
  if (ie(e)) {
    const r = e.frames.findIndex((c) => ye(c.node, t)), s = e.frames[r];
    if (!s) return e;
    const l = wa(s.node, t), i = l === s.node ? s : { ...s, node: l };
    if (r === e.frames.length - 1 && i === s) return e;
    const o = [...e.frames];
    return o.splice(r, 1), o.push(i), { ...e, frames: o };
  }
  if (!ye(e, t)) return e;
  let n = !1;
  const a = e.children.map((r) => {
    const s = wa(r, t);
    return s !== r && (n = !0), s;
  });
  return n ? { ...e, children: a } : e;
}
function vr(e, t) {
  if (e <= 0) return [];
  const n = () => Array.from({ length: e }, () => 1 / e);
  if (!t || t.length !== e) return n();
  const a = t.map((s) => Number.isFinite(s) && s > 0 ? s : 0), r = a.reduce((s, l) => s + l, 0);
  return r <= 0 ? n() : a.map((s) => s / r);
}
const dt = (e) => vr(e.children.length, e.sizes), tt = (e) => {
  const t = J(e) ? e.panels.length : e.children.length;
  return e.places?.length === t ? e.places : void 0;
};
function Ce(e) {
  if (J(e)) return ap(e);
  if (ie(e)) {
    const i = e.frames.flatMap((o) => {
      const c = Ce(o.node);
      return Da(c) ? [] : [c === o.node ? o : { ...o, node: c }];
    });
    return i.length === e.frames.length && i.every((o, c) => o === e.frames[c]) ? e : { ...e, frames: i };
  }
  if (e.children.length === 0) return e;
  const t = dt(e), n = tt(e), a = [], r = [], s = [];
  e.children.forEach((i, o) => {
    const c = Ce(i), u = t[o] ?? 0;
    if (Da(c)) return;
    if (!n && qt(c) && c.direction === e.direction && !tt(c) && !Et(c)) {
      const $ = dt(c);
      c.children.forEach((w, k) => {
        a.push(w), r.push(u * ($[k] ?? 0));
      });
      return;
    }
    a.push(c), r.push(u);
    const m = n?.[o];
    m && s.push(m);
  });
  const l = a[0];
  return a.length === 1 && l && !Et(e) ? l : {
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: vr(a.length, r),
    ...Ae(e),
    ...s.length === a.length && s.length > 0 ? { places: s } : {}
  };
}
function ap(e) {
  if (e.panels.every(xe)) return e;
  const t = Ie(e), n = tt(e), a = [], r = [];
  e.panels.forEach((i, o) => {
    const c = n?.[o];
    if (xe(i)) {
      a.push(i), c && r.push(c);
      return;
    }
    const u = Ce(i);
    if (!Da(u)) {
      if (J(u) && !Et(u) && !tt(u) && !e.headless) {
        a.push(...u.panels);
        return;
      }
      a.push(u), c && r.push(c);
    }
  });
  const s = a[0];
  if (a.length === 1 && s !== void 0 && !xe(s) && !Et(e))
    return s;
  if (a.length === e.panels.length && a.every((i, o) => i === e.panels[o]))
    return e;
  const l = t && a.some((i) => yn(i).includes(t)) ? t : void 0;
  return {
    kind: "group",
    panels: a,
    ...l ? { active: l } : {},
    ...Ae(e),
    ...r.length === a.length && r.length > 0 ? { places: r } : {}
  };
}
function Mt(e, t) {
  if (ie(e)) {
    const l = e.frames.flatMap((i) => {
      const o = Mt(i.node, t);
      return o ? [o === i.node ? i : { ...i, node: o }] : [];
    });
    return l.length === 0 && !Fa(e) ? null : { ...e, frames: l };
  }
  if (J(e)) {
    if (!ye(e, t)) return e;
    const l = Lt(e), i = [];
    for (const u of e.panels) {
      if (xe(u)) {
        u !== t && i.push(u);
        continue;
      }
      const m = Mt(u, t);
      m && i.push(m);
    }
    if (i.length === 0) return null;
    const c = e.active && i.some((u) => yn(u).includes(e.active)) ? e.active : Ie(i[l] ?? i[i.length - 1]);
    return c ? { kind: "group", panels: i, active: c, ...Ae(e) } : { kind: "group", panels: i, ...Ae(e) };
  }
  const n = dt(e), a = [], r = [];
  if (e.children.forEach((l, i) => {
    const o = Mt(l, t);
    o && (a.push(o), r.push(n[i] ?? 0));
  }), a.length === 0)
    return Fa(e) ? { kind: "split", direction: e.direction, children: a, sizes: [], ...Ae(e) } : null;
  const s = a[0];
  return a.length === 1 && s && !Et(e) ? s : Ce({
    kind: "split",
    direction: e.direction,
    children: a,
    sizes: r,
    ...Ae(e)
  });
}
function io(e, t, n) {
  const a = e.panels.filter((s) => s !== t), r = n === void 0 ? a.length : Math.max(0, Math.min(n, a.length));
  return a.splice(r, 0, t), { kind: "group", panels: a, active: t, ...Ae(e) };
}
function Gt(e, t, n, a, r) {
  const s = (w) => gn(
    w,
    (k) => ye(k, n) ? Gt(k, t, n, a, r) : k
  );
  if (a === "float") return e;
  const l = (w) => _n(w, n, (k) => Gt(k, t, n, a, r));
  if (a === "center")
    return J(e) ? je(e, n) ? io(e, t, r) : l(e) : ie(e) ? s(e) : {
      ...e,
      children: e.children.map(
        (w) => ye(w, n) ? Gt(w, t, n, a, r) : w
      )
    };
  const i = Gf(a), o = a === "left" || a === "top", c = (w) => ({
    kind: "split",
    direction: i,
    children: o ? [et(t), w] : [w, et(t)],
    sizes: [0.5, 0.5]
  });
  if (J(e)) return je(e, n) ? c(e) : l(e);
  if (ie(e)) return s(e);
  const u = dt(e), m = e.children.findIndex(
    (w) => J(w) && je(w, n)
  );
  if (m >= 0 && e.direction === i) {
    const w = (u[m] ?? 0) / 2, k = [...e.children], g = [...u];
    return k.splice(o ? m : m + 1, 0, et(t)), g.splice(m, 1, w, w), {
      kind: "split",
      direction: i,
      children: k,
      sizes: g,
      ...Ae(e)
    };
  }
  const $ = e.children.map((w) => ye(w, n) ? J(w) && je(w, n) ? c(w) : Gt(w, t, n, a) : w);
  return {
    kind: "split",
    direction: e.direction,
    children: $,
    sizes: u,
    ...Ae(e)
  };
}
function It(e, t) {
  if (J(e)) {
    if (je(e, t))
      return ao(e) === t ? e : { ...e, active: t };
    const r = e.panels.findIndex((o) => !xe(o) && ye(o, t)), s = e.panels[r];
    if (s === void 0 || xe(s)) return e;
    const l = It(s, t);
    if (l === s && e.active === t) return e;
    const i = [...e.panels];
    return i[r] = l, { ...e, panels: i, active: t };
  }
  if (!ye(e, t)) return e;
  if (ie(e)) return gn(e, (r) => It(r, t));
  let n = !1;
  const a = e.children.map((r) => {
    const s = It(r, t);
    return s !== r && (n = !0), s;
  });
  return n ? { ...e, children: a } : e;
}
function Zt(e, t, n) {
  if (J(e)) {
    if (!je(e, t)) return _n(e, t, (c) => Zt(c, t, n));
    const a = e.panels.indexOf(t), r = Math.max(0, Math.min(n, e.panels.length - 1));
    if (a === r) return e;
    const s = [...e.panels];
    s.splice(a, 1), s.splice(r, 0, t);
    const l = tt(e), i = l ? [...l] : void 0;
    i && i.splice(r, 0, ...i.splice(a, 1));
    const o = Ie(e);
    return {
      kind: "group",
      panels: s,
      ...o ? { active: o } : {},
      ...Ae(e),
      ...i ? { places: i } : {}
    };
  }
  return ye(e, t) ? ie(e) ? gn(e, (a) => Zt(a, t, n)) : { ...e, children: e.children.map((a) => Zt(a, t, n)) } : e;
}
function En(e, t, n) {
  if (t === n) return e;
  if (J(e)) {
    if (!ye(e, t) && !ye(e, n)) return e;
    const a = (s) => s === t ? n : s === n ? t : s, r = e.panels.map((s) => xe(s) ? a(s) : En(s, t, n));
    return { ...e, panels: r, ...e.active ? { active: a(e.active) } : {} };
  }
  return ie(e) ? gn(e, (a) => En(a, t, n)) : { ...e, children: e.children.map((a) => En(a, t, n)) };
}
function xn(e, t, n, a, r) {
  if (a === "float" || !ye(e, t) || !ye(e, n)) return e;
  const s = Rt(e, t);
  if (a === "center" && s && je(s, n)) {
    if (r === void 0) return e;
    const i = s.panels.indexOf(t), o = r > i ? r - 1 : r;
    return o === i ? e : It(Zt(e, t, o), t);
  }
  if (t === n) return e;
  const l = Mt(e, t);
  return l ? Ce(Gt(l, t, n, a, r)) : e;
}
function co(e, t, n) {
  if (J(e)) {
    const r = e.panels[t];
    if (r === void 0 || xe(r)) return e;
    const s = [...e.panels];
    return s[t] = n, { ...e, panels: s };
  }
  if (ie(e)) {
    const r = e.frames[t];
    if (!r) return e;
    const s = [...e.frames];
    return s[t] = { ...r, node: n }, { ...e, frames: s };
  }
  const a = [...e.children];
  return a[t] = n, { ...e, children: a };
}
function wn(e, t, n) {
  const a = oa(e);
  if (!J(e) && a.some(({ node: r }) => J(r) && je(r, t))) {
    const r = n(e);
    return r === e ? null : r;
  }
  for (const { node: r, index: s } of a) {
    if (!ye(r, t)) continue;
    const l = wn(r, t, n);
    return l ? co(e, s, l) : null;
  }
  return null;
}
function sh(e, t, n) {
  const a = wn(
    e,
    t,
    (r) => qt(r) && r.direction !== n ? { ...r, direction: n } : r
  );
  return a ? Ce(a) : e;
}
function uo(e) {
  return ie(e) ? [e] : tt(e) || Et(e) ? [e] : J(e) ? [...e.panels] : e.children.flatMap(uo);
}
function fo(e, t) {
  if (J(e)) return e;
  const n = fr(e).map(uo), a = n.flat(), r = t && a.some((l) => yn(l).includes(t)) ? t : void 0, s = rp(e, n);
  return Ce({
    kind: "group",
    panels: a,
    ...r ? { active: r } : {},
    ...Ae(e),
    ...s ? { places: s } : {}
  });
}
function rp(e, t) {
  const n = ie(e) ? e.frames.map(({ node: a, ...r }) => r) : tt(e);
  if (n)
    return t.every((a) => a.length === 1) ? n : void 0;
}
function sp(e, t) {
  const n = wn(e, t, (a) => fo(a, t));
  return n ? Ce(n) : e;
}
function hr(e, t, n) {
  if (J(e) && je(e, t)) {
    const a = n(e);
    return a === e ? null : a;
  }
  for (const { node: a, index: r } of oa(e)) {
    if (!ye(a, t)) continue;
    const s = hr(a, t, n);
    return s ? co(e, r, s) : null;
  }
  return null;
}
function Xr(e, t, n) {
  const a = hr(e, t, (r) => po(r, n));
  return a ? Ce(a) : e;
}
function Qr(e, t, n) {
  const a = Ue(e, t);
  return !a || !J(a) || a.panels.length < 2 ? e : Ce(lt(e, t, po(a, n)));
}
function po(e, t) {
  if (e.panels.length < 2) return e;
  const n = tt(e);
  return {
    ...ur(t, e.panels.map(aa)),
    ...Ae(e),
    ...n ? { places: n } : {}
  };
}
function qa(e, t) {
  if (J(e)) return e;
  if (ie(e)) {
    const r = e.frames.findIndex(
      (i) => J(i.node) && i.node.panels.includes(t)
    ), s = e.frames[r], l = s && J(s.node) ? s.node : null;
    if (s && l && l.panels.length > 1) {
      const i = sa(l.panels.map(aa), s.rect).frames;
      return {
        ...e,
        frames: [...e.frames.slice(0, r), ...i, ...e.frames.slice(r + 1)]
      };
    }
    return gn(e, (i) => qa(i, t));
  }
  if (!ye(e, t)) return e;
  let n = !1;
  const a = e.children.map((r) => {
    const s = qa(r, t);
    return s !== r && (n = !0), s;
  });
  return n ? { ...e, children: a } : e;
}
function op(e, t, n) {
  const a = Rt(e, t);
  if (!a || a.panels.length < 2) return e;
  if (Re(e, t)?.node === a) {
    const l = qa(e, t);
    return l === e ? e : Ce(l);
  }
  const s = hr(e, t, (l) => vo(l, n));
  return s ? Ce(s) : e;
}
function lp(e, t, n) {
  const a = Ue(e, t);
  if (!a || !J(a) || a.panels.length < 2) return e;
  const r = t.slice(0, -1), s = t.length > 0 ? Ue(e, r) : null, l = t[t.length - 1], i = s && ie(s) && l !== void 0 ? s.frames[l] : void 0;
  if (s && ie(s) && i && l !== void 0) {
    const o = sa(a.panels.map(aa), i.rect).frames, c = [...s.frames.slice(0, l), ...o, ...s.frames.slice(l + 1)];
    return Ce(lt(e, r, { ...s, frames: c }));
  }
  return Ce(lt(e, t, vo(a, n)));
}
function vo(e, t) {
  return {
    ...cr(ho(e.panels.map(aa), tt(e), t)),
    ...Ae(e)
  };
}
function ho(e, t, n) {
  return t ? e.map((a, r) => ({ ...t[r], node: a })) : sa(e, n).frames;
}
function mo(e, t) {
  return { ...cr(ho(e.children, tt(e), t)), ...Ae(e) };
}
function oh(e, t, n) {
  const a = wn(
    e,
    t,
    (r) => ie(r) ? r : mo(r, n)
  );
  return a ? Ce(a) : J(e) && je(e, t) ? sa([e], n) : e;
}
function ip(e, t) {
  const n = (r) => t === "column" ? r.rect.y : r.rect.x, a = (r) => t === "column" ? r.rect.x : r.rect.y;
  return [...e].sort((r, s) => n(r) - n(s) || a(r) - a(s));
}
function go(e, t) {
  const n = ip(e.frames, t);
  return {
    kind: "split",
    direction: t,
    children: n.map((a) => a.node),
    ...Ae(e),
    places: n.map(({ node: a, ...r }) => r)
  };
}
function lh(e, t, n = "row") {
  const a = wn(
    e,
    t,
    (r) => ie(r) ? go(r, n) : r
  );
  return a ? Ce(a) : e;
}
function yo(e) {
  if (ie(e)) return null;
  const t = J(e) ? e.panels.length === 1 ? e.panels[0] : void 0 : e.children.length === 1 ? e.children[0] : void 0;
  return t === void 0 || xe(t) || J(t) && t.panels.length === 1 && xe(t.panels[0]) ? null : t;
}
const cp = (e) => {
  const { title: t, fixedView: n, headless: a, ...r } = e;
  return r;
};
function up(e, t) {
  const n = yo(e);
  return n ? t === "inner" ? n : { ...cp(n), ...Ae(e) } : e;
}
function Ft(e) {
  return e.title ? e.title : J(e) ? "" : ie(e) ? "Desktop" : e.direction === "row" ? "Row" : "Column";
}
function Jt(e, t) {
  if (J(e)) {
    const a = e.panels[Lt(e)];
    return a === void 0 ? "" : xe(a) ? t(a) ?? a : Ft(a) || Jt(a, t);
  }
  if (e.title) return e.title;
  if (ie(e)) {
    const a = e.frames[e.frames.length - 1];
    return a ? a.title ?? Jt(a.node, t) : "";
  }
  const n = e.children[0];
  return n ? Jt(n, t) : "";
}
function Ue(e, t) {
  let n = e;
  for (const a of t) {
    if (!n) return null;
    if (qt(n)) n = n.children[a];
    else if (ie(n)) n = n.frames[a]?.node;
    else {
      const r = n.panels[a];
      n = r === void 0 || xe(r) ? void 0 : r;
    }
  }
  return n ?? null;
}
function lt(e, t, n) {
  if (t.length === 0) return n;
  const [a, ...r] = t;
  if (a === void 0) return e;
  if (ie(e)) {
    const o = e.frames[a];
    if (!o) return e;
    const c = lt(o.node, r, n);
    if (c === o.node) return e;
    const u = [...e.frames];
    return u[a] = { ...o, node: c }, { ...e, frames: u };
  }
  if (J(e)) {
    const o = e.panels[a];
    if (o === void 0 || xe(o)) return e;
    const c = lt(o, r, n);
    if (c === o) return e;
    const u = [...e.panels];
    return u[a] = c, { ...e, panels: u };
  }
  const s = e.children[a];
  if (!s) return e;
  const l = lt(s, r, n);
  if (l === s) return e;
  const i = [...e.children];
  return i[a] = l, { ...e, children: i };
}
function Pn(e, t, n) {
  if (t.length === 0)
    return qt(e) ? { ...e, sizes: vr(e.children.length, n) } : e;
  const [a, ...r] = t;
  if (a === void 0) return e;
  if (ie(e)) {
    const i = e.frames[a];
    if (!i) return e;
    const o = Pn(i.node, r, n);
    if (o === i.node) return e;
    const c = [...e.frames];
    return c[a] = { ...i, node: o }, { ...e, frames: c };
  }
  if (J(e)) {
    const i = e.panels[a];
    if (i === void 0 || xe(i)) return e;
    const o = Pn(i, r, n);
    if (o === i) return e;
    const c = [...e.panels];
    return c[a] = o, { ...e, panels: c };
  }
  const s = e.children[a];
  if (!s) return e;
  const l = [...e.children];
  return l[a] = Pn(s, r, n), { ...e, children: l };
}
function Zr(e, t, n, a = 0.02) {
  const r = e[t], s = e[t + 1];
  if (r === void 0 || s === void 0) return e;
  const l = r + s;
  if (l < a * 2) return e;
  const i = [...e], o = Math.min(Math.max(r + n, a), l - a);
  return i[t] = o, i[t + 1] = l - o, i;
}
function qn(e) {
  if (!J(e) || e.panels.length >= 2) return e;
  const t = e.panels[0];
  return t !== void 0 && !xe(t) ? e : { ...dr([dp(e)]), ...Ae(e) };
}
const dp = (e) => {
  if (!e.title) return e;
  const { title: t, ...n } = e;
  return n;
};
function Jr(e) {
  return e.length === 0 ? null : dr(e.map(et));
}
function fp(e, t) {
  if (!e) return Jr(t);
  const n = new Set(t), a = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set();
  for (const o of Ge(e))
    !n.has(o) || a.has(o) ? r.add(o) : a.add(o);
  let s = e;
  for (const o of r)
    s = s ? Mt(s, o) : null;
  const l = new Set(s ? Ge(s) : []), i = t.filter((o) => !l.has(o));
  if (i.length === 0) return s ? qn(Ce(s)) : null;
  if (!s) return Jr(i);
  if (ie(s)) {
    const o = s.frames.length;
    return {
      ...s,
      frames: [
        ...s.frames,
        ...i.map(
          (c, u) => ra(et(c), {
            x: xt.x + (o + u) * Hn,
            y: xt.y + (o + u) * Hn
          })
        )
      ]
    };
  }
  return qn(Ce(dr([s, ...i.map(et)])));
}
const mr = Symbol("dc.windowContext");
function pp(e) {
  return ln(mr, e), e;
}
function la() {
  const e = St(mr, null);
  if (!e)
    throw new Error(
      "[appfr] No window context found. Render this component inside <WindowFrame>."
    );
  return e;
}
const vp = 320, hp = 240;
function mp(e) {
  if (!e || typeof window > "u") return;
  const t = e.getBoundingClientRect();
  if (t.width <= 0 || t.height <= 0) return;
  const n = Math.max(0, window.outerHeight - window.innerHeight);
  return {
    width: Math.round(t.width),
    height: Math.round(t.height),
    left: Math.round(window.screenX + t.left),
    top: Math.round(window.screenY + n + t.top)
  };
}
function gp(e, t) {
  if (typeof window > "u") return null;
  const n = Math.max(vp, Math.round(t?.width ?? window.innerWidth)), a = Math.max(hp, Math.round(t?.height ?? window.innerHeight)), r = ["popup", `width=${n}`, `height=${a}`];
  t?.left !== void 0 && r.push(`left=${t.left}`), t?.top !== void 0 && r.push(`top=${t.top}`);
  const s = window.open(e, "_blank", r.join(","));
  if (s)
    try {
      s.opener = null;
    } catch {
    }
  return s;
}
const yp = ["data-dc-glyph"], _p = { class: "dc-glyph__line" }, wp = ["d"], kp = {
  key: 0,
  class: "dc-glyph__aqua"
}, bp = ["d"], $p = /* @__PURE__ */ oe({
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
    return (a, r) => (f(), h("svg", {
      class: "dc-glyph",
      "data-dc-glyph": e.kind,
      viewBox: "0 0 10 10",
      "aria-hidden": "true",
      focusable: "false"
    }, [
      C("g", _p, [
        (f(!0), h(ne, null, he(t[e.kind], (s) => (f(), h("path", {
          key: s,
          d: s
        }, null, 8, wp))), 128))
      ]),
      n[e.kind] ? (f(), h("g", kp, [
        (f(!0), h(ne, null, he(n[e.kind], (s) => (f(), h("path", {
          key: s,
          d: s
        }, null, 8, bp))), 128))
      ])) : L("", !0)
    ], 8, yp));
  }
}), Nt = /* @__PURE__ */ le($p, [["__scopeId", "data-v-4d2872c0"]]), xp = ["data-dc-order", "data-dc-path", "data-dc-maximized", "data-dc-minimized", "data-dc-dragging"], Mp = ["data-dc-movable"], Sp = { class: "dc-float__title dc-truncate" }, Cp = {
  key: 1,
  class: "dc-float__controls dc-controls"
}, Ep = ["aria-label", "aria-pressed", "data-dc-minimize"], Pp = ["aria-label", "aria-pressed", "data-dc-maximize"], Ap = ["aria-label", "data-dc-close"], Lp = { class: "dc-float__content" }, Tp = ["data-dc-handle", "onPointerdown"], Op = /* @__PURE__ */ oe({
  __name: "WindowFloat",
  props: {
    frame: {},
    path: {},
    order: {},
    place: {}
  },
  setup(e) {
    const t = e, n = la(), a = p(() => Ie(t.frame.node)), r = p(() => n.panelFor(a.value)?.fixed === !0), s = p(() => ht(t.frame)), l = p(() => bt(t.frame)), i = p(() => s.value || l.value), o = p(() => n.resizable.value && !r.value && !i.value), c = p(() => !r.value && !i.value), u = p(() => {
      const E = Ge(t.frame.node);
      return E.length === 1 ? E[0] ?? null : null;
    }), m = p(() => u.value !== null && n.closable(u.value)), $ = p(() => t.frame.node.headless === !0), w = p(
      () => !$.value && (!J(t.frame.node) || l.value)
    ), k = p(
      () => t.frame.title || Ft(t.frame.node) || Jt(t.frame.node, (E) => n.panelFor(E)?.title)
    ), g = p(() => n.spaceMenu(t.path));
    function M(E) {
      E.target?.closest("button, a, input, select, textarea, label") || n.beginFrameDragAt(t.path, E, "move");
    }
    function y(E) {
      E.target?.closest("button, a, input, select, textarea, label") || (l.value ? n.toggleMinimizeAt(t.path) : n.toggleMaximizeAt(t.path));
    }
    const S = p(() => {
      const E = n.framing.value;
      return E !== null && ye(t.frame.node, E);
    }), b = p(() => ({
      // Neither maximizing nor rolling up overwrites the rect: it is where the
      // window goes back to, and both are a way of not being there for a while.
      ...s.value ? { inset: "0" } : l.value && t.place ? {
        left: `${t.place.x}px`,
        bottom: `${t.place.bottom}px`,
        width: `${Ba}px`,
        height: `${to}px`
      } : {
        left: `${t.frame.rect.x}px`,
        top: `${t.frame.rect.y}px`,
        width: `${t.frame.rect.w}px`,
        height: `${t.frame.rect.h}px`
      },
      // Back to front. The DOM order says the same thing, but a frame that paints
      // a shadow over its neighbour should not depend on that being noticed.
      zIndex: t.order + 1
    })), x = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];
    return (E, z) => (f(), h("div", {
      class: "dc-float",
      style: Me(b.value),
      "data-dc-order": e.order,
      "data-dc-path": e.path.join("/"),
      "data-dc-maximized": s.value ? "true" : "false",
      "data-dc-minimized": l.value ? "true" : "false",
      "data-dc-dragging": S.value ? "true" : "false",
      onPointerdown: z[3] || (z[3] = (A) => T(n).raiseAt(e.path))
    }, [
      w.value ? (f(), h("header", {
        key: 0,
        class: "dc-float__bar",
        "data-dc-movable": c.value ? "true" : "false",
        onPointerdown: M,
        onDblclick: y
      }, [
        C("span", Sp, B(k.value), 1),
        g.value.length ? (f(), X(ir, {
          key: 0,
          items: g.value,
          label: `${k.value} menu`
        }, null, 8, ["items", "label"])) : L("", !0),
        !r.value || l.value && m.value && u.value ? (f(), h("div", Cp, [
          r.value ? L("", !0) : (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${l.value ? "Unroll" : "Minimize"} ${k.value}`,
            "aria-pressed": l.value,
            "data-dc-minimize": a.value,
            onClick: z[0] || (z[0] = (A) => T(n).toggleMinimizeAt(e.path))
          }, [
            fe(Nt, {
              kind: l.value ? "unroll" : "minimize"
            }, null, 8, ["kind"])
          ], 8, Ep)),
          r.value ? L("", !0) : (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `${s.value ? "Restore" : "Maximize"} ${k.value}`,
            "aria-pressed": s.value,
            "data-dc-maximize": a.value,
            onClick: z[1] || (z[1] = (A) => T(n).toggleMaximizeAt(e.path))
          }, [
            fe(Nt, {
              kind: s.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 8, Pp)),
          l.value && m.value && u.value ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-float__button dc-control",
            "aria-label": `Close ${k.value}`,
            "data-dc-close": u.value,
            onClick: z[2] || (z[2] = (A) => T(n).close(u.value))
          }, [
            fe(Nt, { kind: "close" })
          ], 8, Ap)) : L("", !0)
        ])) : L("", !0)
      ], 40, Mp)) : L("", !0),
      C("div", Lp, [
        we(E.$slots, "default", {}, void 0, !0)
      ]),
      (f(!0), h(ne, null, he(o.value ? x : [], (A) => (f(), h("span", {
        key: A,
        class: "dc-float__grip",
        "data-dc-handle": A,
        "aria-hidden": "true",
        onPointerdown: Je((P) => T(n).beginFrameDragAt(e.path, P, A), ["stop"])
      }, null, 40, Tp))), 128))
    ], 44, xp));
  }
}), Rp = /* @__PURE__ */ le(Op, [["__scopeId", "data-v-b10f12c6"]]), gr = Symbol("dc.paneContext");
function _o(e) {
  return ln(gr, e), e;
}
function ih() {
  return St(gr, null);
}
function ch(e) {
  const t = St(mr, null), n = St(gr, null);
  if (!t || !n) return () => {
  };
  const a = t.registerMenu(
    () => n.panel.value,
    () => ut(e)
  );
  return Vn() && Dt(a), a;
}
const zp = ["data-dc-panel"], Ip = /* @__PURE__ */ oe({
  __name: "WindowPaneBody",
  props: {
    panel: {},
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, n = la();
    _o({ panel: p(() => t.panel) });
    const a = () => {
      const r = n.panelFor(t.panel);
      return r ? n.renderContent(r, n.viewFor(t.panel), t.active) ?? null : null;
    };
    return (r, s) => (f(), h("div", {
      class: "dc-pane__content",
      "data-dc-panel": t.panel
    }, [
      fe(a)
    ], 8, zp));
  }
}), Np = /* @__PURE__ */ le(Ip, [["__scopeId", "data-v-31c655fd"]]), Bp = ["data-dc-panel", "data-dc-panels", "data-dc-tabbed", "data-dc-floating", "data-dc-maximized", "data-dc-headless", "data-dc-active", "data-dc-dragging", "aria-label"], Fp = ["data-dc-movable"], Dp = ["aria-label", "aria-pressed"], Hp = ["data-dc-space-name"], qp = { class: "dc-truncate" }, Vp = ["aria-label"], Kp = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Wp = ["id", "data-dc-panel", "data-dc-space", "aria-selected", "aria-controls", "tabindex", "onPointerdown", "onClick", "onKeydown"], jp = { class: "dc-tab__name dc-truncate" }, Up = {
  key: 0,
  class: "dc-pane__sub dc-mono dc-truncate"
}, Gp = ["aria-label", "data-dc-close", "onClick"], Yp = {
  key: 0,
  class: "dc-pane__insert",
  "aria-hidden": "true"
}, Xp = { class: "dc-pane__tools" }, Qp = {
  key: 2,
  class: "dc-pane__controls dc-controls"
}, Zp = ["aria-label", "data-dc-minimize"], Jp = ["aria-label", "aria-pressed", "data-dc-maximize"], ev = ["aria-label", "data-dc-close"], tv = ["id", "role", "aria-labelledby"], nv = ["id", "role", "aria-labelledby"], av = ["data-dc-edge"], rv = /* @__PURE__ */ oe({
  __name: "WindowPane",
  props: {
    group: {},
    path: {}
  },
  setup(e) {
    const t = e, n = la(), a = Kn() ?? "dc-pane", r = p(
      () => t.group.panels.flatMap((N, Q) => {
        if (!xe(N)) {
          const ze = Ft(N) || Jt(N, (Be) => n.panelFor(Be)?.title);
          return [{ kind: "space", index: Q, id: `space-${Q}`, title: ze, node: N }];
        }
        const te = n.panelFor(N);
        return te ? [{ kind: "panel", index: Q, id: N, title: te.title, panel: te }] : [];
      })
    ), s = p(() => r.value.length > 1), l = p(() => {
      const N = Lt(t.group);
      return r.value.find((Q) => Q.index === N) ?? r.value[0] ?? null;
    }), i = p(() => l.value?.kind === "space" ? l.value.node : null), o = p(() => i.value ? "" : ao(t.group)), c = p(() => i.value ? null : n.panelFor(o.value)), u = p(() => l.value?.title ?? ""), m = p(() => n.spaceNames.value ? t.group.title ?? "" : ""), $ = p(() => [...t.path, l.value?.index ?? 0]), w = p(() => o.value || Wr(t.group)[0] || ""), k = p(() => n.viewFor(o.value)), g = p(() => t.group.headless === !0), M = p(() => n.focused.value === o.value), y = p(() => n.dragging.value === o.value), S = p(() => n.moving.value === o.value), b = p(() => n.frameOf(w.value) !== null), x = p(() => n.panelFor(w.value)?.fixed === !0), E = p(
      () => !i.value && (n.canMove(o.value) || b.value && !x.value)
    ), z = p(
      () => i.value ? n.spaceMenu($.value) : n.menuFor(o.value)
    ), A = (N) => n.closable(N);
    _o({ panel: o });
    const P = p(() => n.maximized(w.value)), W = p(
      () => b.value && !x.value || !s.value && !!c.value && A(c.value.id)
    ), Z = (N) => `${a}-tab-${N}`, be = p(() => `${a}-body`), R = p(() => {
      const N = n.dropTarget.value;
      return !N || !je(t.group, N.panel) || N.edge === "float" ? null : N;
    }), G = p(() => R.value?.index === void 0 ? R.value?.edge ?? null : null), H = p(() => R.value?.index ?? null), me = p(
      () => r.value.flatMap(
        (N) => N.kind === "panel" && (N.id === o.value || N.panel.keepAlive === !0) ? [N.id] : []
      )
    ), V = K(null), Y = /* @__PURE__ */ new Map();
    $e(
      o,
      (N, Q) => {
        const te = V.value;
        if (!te || (Q && Y.set(Q, te.scrollTop), !n.panelFor(N)?.keepAlive || !Y.has(N))) return;
        const ze = Y.get(N);
        yt(() => {
          V.value && (V.value.scrollTop = ze);
        });
      },
      { flush: "pre" }
    );
    const re = () => c.value ? n.renderActions(c.value, k.value, M.value) ?? null : null;
    let ce = null;
    function I(N) {
      const Q = ce !== null && Math.hypot(N.clientX - ce.x, N.clientY - ce.y) >= 4;
      return ce = null, Q;
    }
    const ee = (N) => N.kind === "panel" ? N.id : Ie(N.node);
    function pe(N, Q) {
      Q.kind !== "space" && (n.focus(Q.id), ce = { x: N.clientX, y: N.clientY }, n.beginDrag(Q.id, N));
    }
    function qe(N, Q) {
      if (I(N)) return;
      const te = ee(Q);
      te && n.selectPanel(te);
    }
    function nt(N) {
      o.value && n.focus(o.value), !N.target?.closest(".dc-tab, button, a, input, select, textarea, label") && (b.value ? n.beginFrameDrag(w.value, N, "move") : n.beginDrag(o.value, N));
    }
    function at(N) {
      ce = { x: N.clientX, y: N.clientY }, n.beginDrag(o.value, N);
    }
    function Xe(N) {
      I(N) || n.toggleMoveMode(o.value);
    }
    const Ke = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down"
    };
    function Qe(N) {
      if (!S.value) return;
      if (N.key === "Escape") {
        N.preventDefault(), n.toggleMoveMode(o.value);
        return;
      }
      const Q = Ke[N.key];
      Q && (N.preventDefault(), b.value ? n.nudgeFrame(o.value, Q, N.shiftKey) : n.nudge(o.value, Q, N.shiftKey));
    }
    function F(N) {
      !b.value || N.target?.closest(".dc-tab, button, a, input, select, textarea, label") || n.toggleMaximize(w.value);
    }
    function j(N, Q) {
      N.stopPropagation(), ce = null, n.close(Q);
    }
    function se(N, Q) {
      const te = r.value.length;
      let ze = null;
      if (N.key === "ArrowRight" ? ze = (Q + 1) % te : N.key === "ArrowLeft" ? ze = (Q - 1 + te) % te : N.key === "Home" ? ze = 0 : N.key === "End" && (ze = te - 1), ze === null) return;
      N.preventDefault();
      const Be = r.value[ze];
      if (!Be) return;
      const Vt = ee(Be);
      Vt && n.selectPanel(Vt);
    }
    return (N, Q) => l.value ? (f(), h("section", {
      key: 0,
      class: "dc-pane",
      "data-dc-panel": o.value || void 0,
      "data-dc-panels": T(Wr)(e.group).join(" ") || void 0,
      "data-dc-tabbed": s.value ? "true" : "false",
      "data-dc-floating": b.value ? "true" : "false",
      "data-dc-maximized": P.value ? "true" : "false",
      "data-dc-headless": g.value ? "true" : "false",
      "data-dc-active": M.value ? "true" : "false",
      "data-dc-dragging": y.value ? "true" : "false",
      "aria-label": u.value,
      onFocusin: Q[7] || (Q[7] = (te) => o.value && T(n).focus(o.value))
    }, [
      g.value ? L("", !0) : (f(), h("header", {
        key: 0,
        class: "dc-pane__head",
        "data-dc-movable": E.value ? "true" : "false",
        onPointerdown: nt,
        onDblclick: F
      }, [
        E.value ? (f(), h("button", {
          key: 0,
          type: "button",
          class: "dc-pane__grip",
          "aria-label": `Move ${u.value}`,
          "aria-pressed": S.value,
          onPointerdown: at,
          onClick: Xe,
          onKeydown: Qe
        }, [...Q[8] || (Q[8] = [
          C("span", { "aria-hidden": "true" }, "⠿", -1)
        ])], 40, Dp)) : L("", !0),
        m.value ? (f(), h("span", {
          key: 1,
          class: "dc-pane__name",
          "data-dc-space-name": m.value
        }, [
          C("span", qp, B(m.value), 1)
        ], 8, Hp)) : L("", !0),
        C("div", {
          class: "dc-pane__tabs",
          role: "tablist",
          "aria-label": `${u.value} panels`
        }, [
          (f(!0), h(ne, null, he(r.value, (te, ze) => (f(), h(ne, {
            key: te.id
          }, [
            H.value === ze ? (f(), h("span", Kp)) : L("", !0),
            C("button", {
              id: Z(te.id),
              type: "button",
              role: "tab",
              class: "dc-tab",
              "data-dc-panel": te.kind === "panel" ? te.id : void 0,
              "data-dc-space": te.kind === "space" ? te.title : void 0,
              "aria-selected": te.index === l.value.index,
              "aria-controls": be.value,
              tabindex: te.index === l.value.index ? 0 : -1,
              onPointerdown: (Be) => pe(Be, te),
              onClick: (Be) => qe(Be, te),
              onKeydown: (Be) => se(Be, ze)
            }, [
              C("span", jp, B(te.title), 1),
              te.kind === "panel" && te.panel.subtitle ? (f(), h("span", Up, B(te.panel.subtitle), 1)) : L("", !0),
              s.value && te.kind === "panel" && A(te.id) ? (f(), h("span", {
                key: 1,
                class: "dc-tab__close",
                role: "button",
                tabindex: "-1",
                "aria-label": `Close ${te.title}`,
                "data-dc-close": te.id,
                onPointerdown: Q[0] || (Q[0] = Je(() => {
                }, ["stop"])),
                onClick: (Be) => j(Be, te.id)
              }, [...Q[9] || (Q[9] = [
                C("span", { "aria-hidden": "true" }, "×", -1)
              ])], 40, Gp)) : L("", !0)
            ], 40, Wp)
          ], 64))), 128)),
          H.value === r.value.length ? (f(), h("span", Yp)) : L("", !0)
        ], 8, Vp),
        C("div", Xp, [
          fe(re),
          z.value.length ? (f(), X(ir, {
            key: 0,
            items: z.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : L("", !0)
        ]),
        W.value ? (f(), h("div", Qp, [
          b.value && !x.value ? (f(), h("button", {
            key: 0,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `Minimize ${u.value}`,
            "data-dc-minimize": w.value,
            onPointerdown: Q[1] || (Q[1] = Je(() => {
            }, ["stop"])),
            onClick: Q[2] || (Q[2] = (te) => T(n).toggleMinimize(w.value))
          }, [
            fe(Nt, { kind: "minimize" })
          ], 40, Zp)) : L("", !0),
          b.value && !x.value ? (f(), h("button", {
            key: 1,
            type: "button",
            class: "dc-pane__button dc-control",
            "aria-label": `${P.value ? "Restore" : "Maximize"} ${u.value}`,
            "aria-pressed": P.value,
            "data-dc-maximize": w.value,
            onPointerdown: Q[3] || (Q[3] = Je(() => {
            }, ["stop"])),
            onClick: Q[4] || (Q[4] = (te) => T(n).toggleMaximize(w.value))
          }, [
            fe(Nt, {
              kind: P.value ? "restore" : "maximize"
            }, null, 8, ["kind"])
          ], 40, Jp)) : L("", !0),
          !s.value && c.value && A(c.value.id) ? (f(), h("button", {
            key: 2,
            type: "button",
            class: "dc-pane__close dc-control",
            "aria-label": `Close ${u.value}`,
            "data-dc-close": c.value.id,
            onPointerdown: Q[5] || (Q[5] = Je(() => {
            }, ["stop"])),
            onClick: Q[6] || (Q[6] = (te) => T(n).close(c.value.id))
          }, [
            fe(Nt, { kind: "close" })
          ], 40, ev)) : L("", !0)
        ])) : L("", !0)
      ], 40, Fp)),
      i.value ? (f(), h("div", {
        key: 1,
        id: be.value,
        class: "dc-pane__space",
        role: g.value ? void 0 : "tabpanel",
        "aria-labelledby": g.value ? void 0 : Z(l.value.id)
      }, [
        we(N.$slots, "space", {
          node: i.value,
          path: $.value
        }, void 0, !0)
      ], 8, tv)) : L("", !0),
      !i.value || me.value.length ? en((f(), h("div", {
        key: 2,
        id: i.value ? void 0 : be.value,
        ref_key: "body",
        ref: V,
        class: "dc-pane__body",
        role: g.value || i.value ? void 0 : "tabpanel",
        "aria-labelledby": g.value || i.value ? void 0 : Z(o.value)
      }, [
        (f(!0), h(ne, null, he(me.value, (te) => en((f(), X(Np, {
          key: te,
          panel: te,
          active: te === o.value && M.value
        }, null, 8, ["panel", "active"])), [
          [On, te === o.value]
        ])), 128))
      ], 8, nv)), [
        [On, !i.value]
      ]) : L("", !0),
      G.value ? (f(), h("div", {
        key: 3,
        class: "dc-pane__drop",
        "data-dc-edge": G.value,
        "aria-hidden": "true"
      }, null, 8, av)) : L("", !0)
    ], 40, Bp)) : L("", !0);
  }
}), wo = /* @__PURE__ */ le(rv, [["__scopeId", "data-v-34fe9df7"]]), sv = ["data-dc-space", "data-dc-path", "data-dc-bare", "aria-label"], ov = {
  key: 0,
  class: "dc-space__head"
}, lv = { class: "dc-space__title dc-truncate" }, iv = ["data-dc-direction"], cv = {
  key: 0,
  class: "dc-space__drop",
  "aria-hidden": "true"
}, uv = ["aria-orientation", "aria-label", "aria-valuenow", "aria-disabled", "tabindex", "onPointerdown", "onKeydown"], dv = /* @__PURE__ */ oe({
  __name: "WindowNode",
  props: {
    node: {},
    path: {},
    framed: { type: Boolean }
  },
  setup(e) {
    const t = e, n = la(), a = K(null), r = p(() => J(t.node) ? t.node : null), s = p(() => qt(t.node) ? t.node : null), l = p(() => ie(t.node) ? t.node : null), i = p(
      () => s.value ? s.value.children : l.value?.frames.map((V) => V.node) ?? []
    ), o = p(() => s.value ? dt(s.value) : []), c = p(
      () => (l.value?.frames ?? []).map((V, Y) => ({
        held: V,
        /** Place in the stack, counted from the back — what `z-index` follows. */
        order: Y,
        key: P(V.node),
        path: [...t.path, Y]
      })).sort((V, Y) => V.key < Y.key ? -1 : V.key > Y.key ? 1 : 0)
    ), u = p(() => Ft(t.node)), m = p(() => n.spaceMenu(t.path)), $ = p(() => t.node.headless === !0), w = p(() => t.path.length === 0 && !n.rootBar.value), k = p(() => l.value ? "desktop" : s.value?.direction ?? ""), g = K(null), M = K(0);
    let y = null;
    $e(
      g,
      (V) => {
        y?.disconnect(), y = null, !(!V || typeof ResizeObserver > "u") && (M.value = V.clientWidth, y = new ResizeObserver(([Y]) => {
          M.value = Y?.contentRect.width ?? 0;
        }), y.observe(V));
      },
      { immediate: !0 }
    ), Ne(() => y?.disconnect());
    const S = p(() => {
      const V = Math.max(
        1,
        Math.floor((M.value + Tt) / (Ba + Tt))
      ), Y = /* @__PURE__ */ new Map();
      let re = 0;
      for (const ce of c.value)
        ce.held.minimized === !0 && (Y.set(ce.key, {
          x: Tt + re % V * (Ba + Tt),
          bottom: Tt + Math.floor(re / V) * (to + Tt)
        }), re += 1);
      return Y;
    }), b = (V) => !!V && V.join("/") === t.path.join("/"), x = p(() => {
      const V = n.dropTarget.value, Y = l.value;
      if (!Y || !V?.rect || V.edge !== "float") return null;
      if (V.space) return b(V.space) ? V.rect : null;
      const re = Re(Y, V.panel);
      return re && Y.frames.includes(re) ? V.rect : null;
    }), E = p(() => {
      const V = n.dropTarget.value;
      return !!V && !V.rect && b(V.space);
    }), z = p(() => s.value?.direction === "row"), A = p(() => i.value.map((V, Y) => [...t.path, Y])), P = (V) => [...Ge(V)].sort().join("/"), W = (V) => {
      const Y = Ge(V)[0];
      return (Y ? n.panelFor(Y)?.title : null) ?? Y ?? "panel";
    }, Z = (V) => {
      const Y = i.value[V], re = i.value[V + 1];
      return !Y || !re ? "Resize panels" : `Resize ${W(Y)} and ${W(re)}`;
    }, be = (V) => {
      const Y = o.value[V] ?? 0, re = o.value[V + 1] ?? 0, ce = Y + re;
      return ce > 0 ? Math.round(Y / ce * 100) : 50;
    };
    function R() {
      const V = a.value, Y = V ? z.value ? V.clientWidth : V.clientHeight : 0;
      return Y <= 0 ? 0.05 : Math.min(n.minPanelSize.value / Y, 0.4);
    }
    let G = null;
    function H(V, Y) {
      const re = s.value, ce = a.value;
      if (!n.resizable.value || !re || !ce || V.button !== 0) return;
      const I = z.value ? ce.clientWidth : ce.clientHeight;
      if (I <= 0) return;
      const ee = z.value ? V.clientX : V.clientY, pe = dt(re), qe = Math.min(n.minPanelSize.value / I, 0.4);
      V.preventDefault();
      const nt = (Ke) => {
        const Qe = ((z.value ? Ke.clientX : Ke.clientY) - ee) / I;
        n.setSizes(t.path, Zr(pe, Y, Qe, qe));
      }, at = () => G?.(), Xe = (Ke) => {
        Ke.key === "Escape" && (n.setSizes(t.path, pe), G?.());
      };
      G = () => {
        window.removeEventListener("pointermove", nt), window.removeEventListener("pointerup", at), window.removeEventListener("pointercancel", at), window.removeEventListener("keydown", Xe), G = null;
      }, window.addEventListener("pointermove", nt), window.addEventListener("pointerup", at), window.addEventListener("pointercancel", at), window.addEventListener("keydown", Xe);
    }
    Ne(() => G?.());
    function me(V, Y) {
      const re = s.value;
      if (!n.resizable.value || !re) return;
      const ce = z.value ? "ArrowRight" : "ArrowDown", I = z.value ? "ArrowLeft" : "ArrowUp", ee = V.shiftKey ? 0.1 : 0.02;
      if (V.key !== ce && V.key !== I) return;
      const pe = V.key === ce ? ee : -ee;
      V.preventDefault(), n.setSizes(t.path, Zr(dt(re), Y, pe, R()));
    }
    return (V, Y) => {
      const re = rs("WindowNode", !0);
      return r.value ? (f(), X(wo, {
        key: 0,
        group: r.value,
        path: e.path
      }, {
        space: Pe(({ node: ce, path: I }) => [
          fe(re, {
            node: ce,
            path: I,
            framed: !r.value.headless
          }, null, 8, ["node", "path", "framed"])
        ]),
        _: 1
      }, 8, ["group", "path"])) : (f(), h("section", {
        key: 1,
        class: "dc-space",
        "data-dc-space": k.value,
        "data-dc-path": e.path.join("/"),
        "data-dc-bare": w.value ? "true" : void 0,
        "aria-label": u.value
      }, [
        !e.framed && !$.value && !w.value ? (f(), h("header", ov, [
          C("span", lv, B(u.value), 1),
          m.value.length ? (f(), X(ir, {
            key: 0,
            items: m.value,
            label: `${u.value} menu`
          }, null, 8, ["items", "label"])) : L("", !0)
        ])) : L("", !0),
        l.value ? (f(), h("div", {
          key: 1,
          ref_key: "desktop",
          ref: g,
          class: "dc-window__desktop"
        }, [
          x.value ? (f(), h("div", {
            key: 0,
            class: "dc-window__drop",
            style: Me({
              left: `${x.value.x}px`,
              top: `${x.value.y}px`,
              width: `${x.value.w}px`,
              height: `${x.value.h}px`
            }),
            "aria-hidden": "true"
          }, null, 4)) : L("", !0),
          (f(!0), h(ne, null, he(c.value, (ce) => (f(), X(Rp, {
            key: ce.key,
            frame: ce.held,
            path: ce.path,
            order: ce.order,
            place: S.value.get(ce.key) ?? null
          }, {
            default: Pe(() => [
              fe(re, {
                node: ce.held.node,
                path: ce.path,
                framed: ce.held.node.kind !== "group"
              }, null, 8, ["node", "path", "framed"])
            ]),
            _: 2
          }, 1032, ["frame", "path", "order", "place"]))), 128))
        ], 512)) : s.value ? (f(), h("div", {
          key: 2,
          ref_key: "container",
          ref: a,
          class: "dc-window__split",
          "data-dc-direction": s.value.direction
        }, [
          E.value ? (f(), h("div", cv)) : L("", !0),
          (f(!0), h(ne, null, he(i.value, (ce, I) => (f(), h(ne, {
            key: P(ce)
          }, [
            C("div", {
              class: "dc-window__cell",
              style: Me({ flexGrow: o.value[I] ?? 1 })
            }, [
              fe(re, {
                node: ce,
                path: A.value[I] ?? []
              }, null, 8, ["node", "path"])
            ], 4),
            I < i.value.length - 1 ? (f(), h("div", {
              key: 0,
              class: "dc-window__gutter",
              role: "separator",
              "aria-orientation": z.value ? "vertical" : "horizontal",
              "aria-label": Z(I),
              "aria-valuenow": be(I),
              "aria-valuemin": "0",
              "aria-valuemax": "100",
              "aria-disabled": T(n).resizable.value ? void 0 : "true",
              tabindex: T(n).resizable.value ? 0 : -1,
              onPointerdown: (ee) => H(ee, I),
              onKeydown: (ee) => me(ee, I)
            }, null, 40, uv)) : L("", !0)
          ], 64))), 128))
        ], 8, iv)) : L("", !0)
      ], 8, sv));
    };
  }
}), fv = /* @__PURE__ */ le(dv, [["__scopeId", "data-v-b394f0e4"]]), pv = ["data-dc-theme", "data-dc-dragging", "data-dc-docking"], vv = {
  key: 1,
  class: "dc-window__empty"
}, hv = {
  class: "dc-window__live",
  "aria-live": "polite",
  role: "status"
}, Mn = 16, mv = /* @__PURE__ */ oe({
  __name: "WindowFrame",
  props: /* @__PURE__ */ Tn({
    panels: {},
    resizable: { type: Boolean, default: !0 },
    minPanelSize: { default: 120 },
    menu: { type: Boolean, default: !0 },
    spaceNames: { type: Boolean, default: !0 },
    rootBar: { type: Boolean, default: !0 },
    paneMenu: {},
    popOut: {},
    solo: { type: Boolean, default: !1 },
    accent: {},
    tokens: {},
    theme: { default: "minimal" }
  }, {
    layout: { default: null },
    layoutModifiers: {},
    views: { default: () => ({}) },
    viewsModifiers: {}
  }),
  emits: /* @__PURE__ */ Tn(["panel-move", "view-change", "panel-activate", "tab-select", "frame-change", "frame-maximize", "frame-minimize", "panel-close", "panel-pop-out"], ["update:layout", "update:views"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, r = n, s = Ln(e, "layout"), l = Ln(e, "views"), i = cn(), o = p(() => new Map(a.panels.map((d) => [d.id, d]))), c = p(() => a.panels.map((d) => d.id)), u = p(() => fp(s.value, m.value)), m = p(() => {
      if (!a.solo || !s.value) return c.value;
      const d = new Set(Ge(s.value)), v = c.value.filter((_) => d.has(_));
      return v.length ? v : c.value;
    }), $ = K(null), w = K(null), k = K(null), g = K(!0), M = K(null), y = K(null), S = K(null), b = K(""), x = K(null);
    function E() {
      const d = x.value;
      return d ? [...d.querySelectorAll(".dc-pane[data-dc-panels]")].filter((_) => _.closest(".dc-window") === d).map((_) => ({ panels: (_.dataset.dcPanels ?? "").split(" "), element: _ })) : [];
    }
    function z(d) {
      const v = [];
      let _ = d.closest(".dc-float");
      for (; _; )
        v.unshift(Number(_.dataset.dcOrder ?? 0)), _ = _.parentElement?.closest(".dc-float") ?? null;
      return v;
    }
    function A() {
      return E().map((d) => ({ pane: d, order: z(d.element) })).sort((d, v) => {
        const _ = Math.max(d.order.length, v.order.length);
        for (let O = 0; O < _; O += 1) {
          const D = (d.order[O] ?? -1) - (v.order[O] ?? -1);
          if (D !== 0) return D;
        }
        return 0;
      }).map((d) => d.pane);
    }
    const P = (d) => E().find((v) => v.panels.includes(d)) ?? null;
    function W(d) {
      const v = o.value.get(d);
      if (!v) return "";
      const _ = l.value[d];
      return _ && v.views?.some((O) => O.key === _) ? _ : v.defaultView ?? v.views?.[0]?.key ?? "";
    }
    function Z(d, v) {
      l.value = { ...l.value, [d]: v }, r("view-change", { panel: d, view: v });
    }
    const be = p(
      () => a.panels.filter((d) => d.fixed !== !0).length
    );
    function R(d) {
      return be.value < 1 || a.panels.length < 2 ? !1 : o.value.get(d)?.fixed !== !0;
    }
    function G(d, v) {
      const _ = u.value;
      !d || !_ || d === _ || (s.value = d, v && r("panel-move", v));
    }
    function H(d, v, _) {
      if (d.width <= 0 || d.height <= 0) return "center";
      const O = (v - d.left) / d.width, D = (_ - d.top) / d.height, q = 0.3;
      return O > q && O < 1 - q && D > q && D < 1 - q ? "center" : [
        { edge: "left", distance: O },
        { edge: "right", distance: 1 - O },
        { edge: "top", distance: D },
        { edge: "bottom", distance: 1 - D }
      ].reduce(
        (ve, U) => U.distance < ve.distance ? U : ve
      ).edge;
    }
    function me(d, v) {
      const _ = [...d.querySelectorAll(".dc-tab")], O = _.findIndex((D) => {
        const q = D.getBoundingClientRect();
        return v < q.left + q.width / 2;
      });
      return O === -1 ? _.length : O;
    }
    function V(d, v, _) {
      for (const { panels: O, element: D } of A().reverse()) {
        const q = D.getBoundingClientRect();
        if (d < q.left || d > q.right || v < q.top || v > q.bottom) continue;
        const ge = O.find((ue) => ue !== _), ve = D.querySelector(".dc-pane__tabs"), U = ve?.getBoundingClientRect();
        if (ve && U && v >= U.top && v <= U.bottom)
          return ge ? { panel: ge, edge: "center", index: me(ve, d) } : null;
        const ae = D.querySelector(":scope > .dc-pane__space");
        if (ae) {
          const ue = ae.getBoundingClientRect();
          if (d >= ue.left && d <= ue.right && v >= ue.top && v <= ue.bottom) continue;
        }
        return ge ? { panel: ge, edge: H(q, d, v) } : null;
      }
      return re(d, v, _) ?? ee(d, v);
    }
    function Y() {
      const d = x.value;
      return d ? [...d.querySelectorAll(".dc-window__desktop")].filter((v) => v.closest(".dc-window") === d).reverse() : [];
    }
    function re(d, v, _) {
      const O = u.value;
      if (!O) return null;
      for (const D of Y()) {
        const q = D.getBoundingClientRect();
        if (d < q.left || d > q.right || v < q.top || v > q.bottom) continue;
        const ge = pe(D), ve = ge.flatMap((_e) => _e.panels).find((_e) => _e !== _);
        if (!ve && ge.length > 0) return null;
        const U = Re(O, _)?.rect, ae = _a(
          {
            x: d - q.left - 24,
            y: v - q.top - 12,
            w: U?.w ?? xt.w,
            h: U?.h ?? xt.h
          },
          { w: D.clientWidth, h: D.clientHeight },
          a.minPanelSize
        );
        if (ve) return { panel: ve, edge: "float", rect: ae };
        const ue = ce(D);
        return ue ? { panel: "", space: ue, edge: "float", rect: ae } : null;
      }
      return null;
    }
    function ce(d) {
      const v = d.closest(".dc-space")?.getAttribute("data-dc-path");
      return v == null ? null : v === "" ? [] : v.split("/").map(Number);
    }
    function I() {
      const d = x.value;
      return d ? [...d.querySelectorAll(".dc-space")].filter((v) => v.closest(".dc-window") === d).filter((v) => !v.querySelector(".dc-pane")).reverse().flatMap((v) => {
        const _ = ce(v);
        return _ ? [{ element: v, path: _ }] : [];
      }) : [];
    }
    function ee(d, v) {
      for (const { element: _, path: O } of I()) {
        if (_.dataset.dcSpace === "desktop") continue;
        const D = _.getBoundingClientRect();
        if (!(d < D.left || d > D.right || v < D.top || v > D.bottom))
          return { panel: "", space: O, edge: "center" };
      }
      return null;
    }
    function pe(d) {
      return E().filter(
        (v) => v.element.closest(".dc-window__desktop") === d
      );
    }
    let qe = null;
    const nt = (d) => d.altKey;
    function at(d, v) {
      if (!R(d) || w.value || y.value || v.button !== 0) return;
      const _ = v.clientX, O = v.clientY;
      let D = !1, q = nt(v);
      const ge = () => {
        const ke = S.value;
        ke && (k.value = q ? re(ke.x, ke.y, d) : V(ke.x, ke.y, d));
      }, ve = (ke) => {
        if (!D) {
          if (Math.hypot(ke.clientX - _, ke.clientY - O) < 4) return;
          D = !0, w.value = d, M.value = null;
        }
        q = nt(ke), g.value = !q, S.value = { x: ke.clientX, y: ke.clientY }, ge();
      }, U = (ke) => {
        nt(ke) !== q && (q = !q, g.value = !q, D && ge());
      }, ae = (ke) => {
        qe?.();
        const de = k.value, Fe = u.value;
        if (ke && D && de && Fe) {
          const pt = de.space ? Yr(Fe, d, de.space, de.rect) : de.edge === "float" && de.rect ? Gr(Fe, d, de.panel, de.rect) : xn(Fe, d, de.panel, de.edge, de.index);
          G(pt, {
            panel: d,
            target: de.panel,
            edge: de.edge,
            ...de.space === void 0 ? {} : { space: de.space },
            ...de.index === void 0 ? {} : { index: de.index },
            ...de.rect === void 0 ? {} : { rect: de.rect }
          });
        }
        w.value = null, k.value = null, S.value = null, g.value = !0;
      }, ue = () => ae(!0), _e = () => ae(!1), Se = (ke) => {
        if (ke.key === "Escape") {
          ae(!1);
          return;
        }
        U(ke);
      };
      qe = () => {
        window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", ue), window.removeEventListener("pointercancel", _e), window.removeEventListener("keydown", Se), window.removeEventListener("keyup", U), qe = null;
      }, window.addEventListener("pointermove", ve), window.addEventListener("pointerup", ue), window.addEventListener("pointercancel", _e), window.addEventListener("keydown", Se), window.addEventListener("keyup", U);
    }
    Ne(() => qe?.());
    let Xe = null;
    function Ke(d) {
      const v = x.value;
      return v ? [...v.querySelectorAll(
        `.dc-float[data-dc-path="${d.join("/")}"]`
      )].find((D) => D.closest(".dc-window") === v)?.parentElement ?? null : null;
    }
    function Qe(d) {
      const v = u.value;
      return v ? Ha(v, d) : null;
    }
    function F(d) {
      const v = u.value;
      if (!v) return;
      const _ = Qt(v, d);
      _ !== v && (s.value = _);
    }
    function j(d) {
      const v = Qe(d);
      v && F(v);
    }
    function se(d) {
      const v = u.value, _ = v ? Re(v, d) : null;
      return _ !== null && ht(_);
    }
    function N(d) {
      const v = u.value, _ = v ? Re(v, d) : null;
      return _ !== null && bt(_);
    }
    function Q(d) {
      const v = u.value, _ = v ? kt(v, d) : null;
      return _ ? Ie(_.node) : "";
    }
    function te(d) {
      const v = u.value, _ = v ? kt(v, d) : null;
      if (!v || !_) return;
      const O = Ie(_.node);
      if (o.value.get(O)?.fixed === !0) return;
      const D = !bt(_);
      let q = ep(v, d, D);
      q !== v && (D || (q = Qt(q, d)), s.value = q, r("frame-minimize", { panel: O, minimized: D }));
    }
    function ze(d) {
      const v = Qe(d);
      v && te(v);
    }
    function Be(d) {
      const v = u.value, _ = v ? kt(v, d) : null;
      if (!v || !_) return;
      const O = Ie(_.node);
      if (o.value.get(O)?.fixed === !0) return;
      const D = !ht(_);
      let q = Jf(v, d, D);
      q !== v && (D && (q = Qt(q, d)), s.value = q, r("frame-maximize", { panel: O, maximized: D }));
    }
    function Vt(d) {
      const v = Qe(d);
      v && Be(v);
    }
    function wr(d, v, _) {
      const O = u.value, D = O ? kt(O, d) : null;
      if (!O || !D || v.button !== 0 || w.value || y.value) return;
      const q = Ie(D.node);
      if (o.value.get(q)?.fixed === !0 || ht(D) || bt(D) || _ !== "move" && !a.resizable) return;
      const ge = Ke(d), ve = tp(O, d);
      F(d);
      const U = { w: ge?.clientWidth ?? 0, h: ge?.clientHeight ?? 0 }, ae = { ...D.rect }, ue = v.clientX, _e = v.clientY, Se = a.minPanelSize;
      y.value = q;
      const ke = (We) => {
        const ct = u.value;
        if (!ct) return;
        const Kt = Ur(ct, ve, _a(We, U, Se));
        Kt !== ct && (s.value = Kt);
      }, de = (We) => {
        We.preventDefault();
        const ct = We.clientX - ue, Kt = We.clientY - _e;
        ke(
          _ === "move" ? { ...ae, x: ae.x + ct, y: ae.y + Kt } : jr(ae, _, ct, Kt, Se)
        );
      }, Fe = (We) => {
        if (Xe?.(), y.value = null, !We) {
          ke(ae);
          return;
        }
        const ct = u.value ? kt(u.value, ve) : null;
        ct && r("frame-change", { panel: Q(ve), rect: ct.rect });
      }, pt = () => Fe(!0), _t = () => Fe(!1), wt = (We) => {
        We.key === "Escape" && Fe(!1);
      };
      Xe = () => {
        window.removeEventListener("pointermove", de), window.removeEventListener("pointerup", pt), window.removeEventListener("pointercancel", _t), window.removeEventListener("keydown", wt), Xe = null;
      }, window.addEventListener("pointermove", de), window.addEventListener("pointerup", pt), window.addEventListener("pointercancel", _t), window.addEventListener("keydown", wt);
    }
    function Mo(d, v, _) {
      const O = Qe(d);
      O && wr(O, v, _);
    }
    function So(d, v, _ = !1) {
      const O = u.value, D = Qe(d), q = O && D ? kt(O, D) : null;
      if (!O || !D || !q || o.value.get(d)?.fixed === !0 || _ && !a.resizable) return;
      if (ht(q) || bt(q)) {
        b.value = `${rt(d)} is ${ht(q) ? "maximized" : "minimized"}, so it cannot be moved.`;
        return;
      }
      const ge = v === "left" ? -Mn : v === "right" ? Mn : 0, ve = v === "up" ? -Mn : v === "down" ? Mn : 0, U = Ke(D), ae = { w: U?.clientWidth ?? 0, h: U?.clientHeight ?? 0 }, ue = _ ? jr(q.rect, "se", ge, ve, a.minPanelSize) : { ...q.rect, x: q.rect.x + ge, y: q.rect.y + ve }, _e = Ur(O, D, _a(ue, ae, a.minPanelSize));
      if (_e === O) {
        b.value = _ ? `${rt(d)} cannot be resized further.` : `${rt(d)} cannot move ${v}.`;
        return;
      }
      s.value = _e;
      const Se = kt(_e, D);
      Se && (r("frame-change", { panel: d, rect: Se.rect }), b.value = _ ? `${rt(d)} resized to ${Se.rect.w} by ${Se.rect.h}.` : `${rt(d)} moved to ${Se.rect.x}, ${Se.rect.y}.`);
    }
    Ne(() => Xe?.());
    function Co(d, v) {
      const _ = P(d), O = _?.element.getBoundingClientRect();
      if (!_ || !O) return null;
      const D = v === "left" || v === "right", q = (U) => {
        if (!(D ? U.bottom > O.top + 1 && U.top < O.bottom - 1 : U.right > O.left + 1 && U.left < O.right - 1)) return null;
        const ue = v === "left" ? O.left - U.right : v === "right" ? U.left - O.right : v === "up" ? O.top - U.bottom : U.top - O.bottom;
        return ue < -1 ? null : ue;
      }, ge = [];
      for (const U of E()) {
        if (U === _ || U.element === _.element) continue;
        const ae = q(U.element.getBoundingClientRect());
        if (ae === null) continue;
        const ue = U.panels.find((_e) => _e !== d);
        ue && ge.push({ to: { panel: ue }, distance: ae });
      }
      for (const { element: U, path: ae } of I()) {
        const ue = q(U.getBoundingClientRect());
        ue !== null && ge.push({ to: { space: ae }, distance: ue });
      }
      return ge.reduce(
        (U, ae) => U && U.distance <= ae.distance ? U : ae,
        null
      )?.to ?? null;
    }
    function Eo(d) {
      const v = u.value ? Re(u.value, d) !== null : !1;
      if (!v && !R(d)) return;
      M.value = M.value === d ? null : d;
      const _ = rt(d);
      if (!M.value) {
        b.value = `${_}: move mode off.`;
        return;
      }
      b.value = v ? `${_}: move mode on. Arrow keys move the window, shift and an arrow resize it, Escape leaves move mode.` : `${_}: move mode on. Arrow keys move the panel, shift and an arrow make it a tab of the panel that way, Escape leaves move mode.`;
    }
    const rt = (d) => o.value.get(d)?.title ?? d, Po = {
      left: "left",
      right: "right",
      up: "top",
      down: "bottom"
    };
    function Ao(d, v, _ = !1) {
      if (!R(d)) return;
      const O = u.value;
      if (!O) return;
      const D = rt(d), q = Rt(O, d);
      if (!_ && q && (v === "left" || v === "right") && q.panels.length > 1) {
        const _e = q.panels.indexOf(d), Se = v === "left" ? _e - 1 : _e + 1;
        if (Se >= 0 && Se < q.panels.length) {
          G(Zt(O, d, Se), { panel: d, target: d, edge: "center", index: Se }), b.value = `${D} moved ${v}, now tab ${Se + 1} of ${q.panels.length}.`, ca(d);
          return;
        }
      }
      const ve = Co(d, v);
      if (!ve || ve.panel !== void 0 && !R(ve.panel)) {
        b.value = `${D} cannot move ${v}.`;
        return;
      }
      const U = Po[v];
      if (ve.space) {
        const _e = ve.space, Se = Ue(O, _e), ke = Re(O, d)?.rect, de = { ...xt, ...ke ? { w: ke.w, h: ke.h } : {} };
        G(Yr(O, d, _e, de), { panel: d, target: "", space: _e, edge: U }), b.value = `${D} moved ${v}, into ${Se ? Ft(Se) : "the space"}.`, ca(d);
        return;
      }
      const ae = ve.panel, ue = q?.panels.length === 1 && Rt(O, ae)?.panels.length === 1;
      _ ? (G(xn(O, d, ae, "center"), {
        panel: d,
        target: ae,
        edge: "center"
      }), b.value = `${D} joined ${rt(ae)} as a tab.`) : ue ? (G(En(O, d, ae), { panel: d, target: ae, edge: U }), b.value = `${D} moved ${v}, trading places with ${rt(ae)}.`) : (G(xn(O, d, ae, U), { panel: d, target: ae, edge: U }), b.value = `${D} moved ${v}, beside ${rt(ae)}.`), ca(d);
    }
    function ca(d) {
      yt(() => {
        P(d)?.element.querySelector(".dc-pane__grip")?.focus();
      });
    }
    function Lo(d, v) {
      const _ = u.value;
      _ && (s.value = Pn(_, d, v));
    }
    function ua(d) {
      const v = u.value;
      if (!v) return;
      const _ = It(v, d);
      _ !== v && (s.value = _, r("tab-select", { panel: d }));
    }
    function da(d) {
      return o.value.get(d)?.closable !== !1;
    }
    function kr(d) {
      da(d) && r("panel-close", d);
    }
    const fa = K(/* @__PURE__ */ new Map());
    let To = 0;
    function Oo(d, v) {
      const _ = To += 1;
      return fa.value.set(_, { panel: d, items: v }), () => {
        fa.value.delete(_);
      };
    }
    function Ro(d) {
      const v = [];
      for (const _ of fa.value.values())
        _.panel() === d && v.push(..._.items());
      return v;
    }
    function br(d) {
      const v = d.filter((_) => _.items.length > 0);
      return v.length < 2 ? v.flatMap((_) => _.items) : v.flatMap((_) => [
        { id: _.id, heading: !0, label: _.title },
        ..._.items
      ]);
    }
    const $r = (d) => d.title || "These tabs";
    function zo(d, v) {
      const _ = v.id, O = Rt(d, _), D = (O?.panels.length ?? 0) > 1, q = O?.fixedView === !0, ge = (ue) => ({
        action: () => {
          ue !== d && (s.value = ue);
        }
      }), ve = [], U = [], ae = v.views ?? [];
      if (ae.length > 1 && !q) {
        const ue = W(_);
        ve.push({
          id: "view",
          label: "View",
          items: ae.map((_e) => ({
            id: `view-${_e.key}`,
            label: _e.label,
            checked: _e.key === ue,
            action: () => Z(_, _e.key)
          }))
        });
      }
      return D && !q && U.push(
        { id: "show-row", label: "Row", checked: !1, ...ge(Xr(d, _, "row")) },
        {
          id: "show-column",
          label: "Column",
          checked: !1,
          ...ge(Xr(d, _, "column"))
        },
        // Already true, and nothing to collapse: these panes are tabs. Ticked
        // and choosable all the same — collapsing a strip into a strip hands
        // back the tree it was given, so it is the no-op it looks like.
        {
          id: "show-tabs",
          label: "Tabs",
          checked: !0,
          ...ge(sp(d, _))
        },
        {
          id: "show-desktop",
          label: "Desktop",
          checked: !1,
          ...ge(op(d, _))
        }
      ), D && O && (U.length && U.push({ separator: !0 }), U.push(...pa(O, _))), { panel: ve, tabs: U, tabsTitle: O ? $r(O) : "" };
    }
    function pa(d, v) {
      const _ = Lt(d), O = (D) => {
        const q = d.panels[(_ + D + d.panels.length) % d.panels.length];
        return (q === void 0 ? "" : Ie(q)) || v;
      };
      return [
        { id: "next-tab", label: "Next tab", action: () => ua(O(1)) },
        { id: "previous-tab", label: "Previous tab", action: () => ua(O(-1)) },
        ...Io(d)
      ];
    }
    function Io(d) {
      const v = Ge(d).filter(da);
      return v.length ? [
        { separator: !0 },
        { id: "close-all", label: "Close all", action: () => v.forEach(kr) }
      ] : [];
    }
    function kn(d) {
      return d.title ? d.title : J(d) ? d.panels.length > 1 ? "these tabs" : "the strip" : Ft(d);
    }
    function xr(d) {
      if (!d || ie(d) || d.fixedView === !0 || !d.title && d.headless !== !0 || tt(d)) return null;
      const v = yo(d);
      return v && v.fixedView !== !0 ? v : null;
    }
    function Mr(d) {
      const v = u.value;
      if (!a.menu || !v) return [];
      const _ = Ue(v, d);
      if (!_ || J(_)) return [];
      if (_.fixedView) return [];
      const O = ie(_) ? "desktop" : _.direction, D = (de, Fe, pt) => ({
        id: `show-${de}`,
        label: Fe,
        checked: O === de,
        action: () => {
          const _t = u.value, wt = pt();
          !_t || wt === _ || (s.value = qn(Ce(lt(_t, d, wt))));
        }
      }), q = () => {
        const de = fo(_, No(_));
        if (J(de) && de.panels.length === 0) return _;
        const Fe = J(de) && de.panels.length === 1 ? de.panels[0] : void 0;
        return Fe !== void 0 && xe(Fe) ? _ : de;
      }, ge = (de) => () => ie(_) ? go(_, de) : _.direction === de ? _ : { ..._, direction: de }, ve = d.slice(0, -1), U = d.length > 0 ? Ue(v, ve) : null, ae = U && J(U) && U.panels.length > 1 ? U : null, ue = U && xr(U) === _ ? U : null, _e = xr(_), Se = _.title || "this space", ke = (de, Fe, pt, _t, wt) => ({
        id: de,
        label: wt,
        action: () => {
          const We = u.value;
          We && (s.value = qn(Ce(lt(We, Fe, up(pt, _t)))));
        }
      });
      return br([
        {
          id: "about-space",
          /*
           * Its own name, or what it is rather than how it is shown: `spaceTitle`
           * would answer "Row" for an unnamed row, which is the item directly
           * under it and the one already ticked.
           */
          title: _.title || "This space",
          items: [
            D("row", "Row", ge("row")),
            D("column", "Column", ge("column")),
            // Everything in this space in one strip: the panes as tabs, and a
            // desktop among them as a tab of its own, keeping the windows on it.
            D("tabs", "Tabs", () => q()),
            D("desktop", "Desktop", () => ie(_) ? _ : mo(_))
          ]
        },
        {
          id: "about-around",
          title: _e ? `Around ${kn(_e)}` : "",
          items: _e ? [
            // Keeping this space's bar drops the one inside, so it is offered
            // only where the space inside has no name to be dropped with it.
            ..._e.title ? [] : [ke("merge-around-keep-this", d, _, "outer", `Keep ${Se}`)],
            ..._.title ? [] : [ke("merge-around-keep-that", d, _, "inner", `Keep ${kn(_e)}`)]
          ] : []
        },
        {
          id: "about-inside",
          title: ue ? `Inside ${kn(ue)}` : "",
          items: ue ? [
            ..._.title ? [] : [ke("merge-inside-keep-that", ve, ue, "outer", `Keep ${kn(ue)}`)],
            ...ue.title ? [] : [ke("merge-inside-keep-this", ve, ue, "inner", `Keep ${Se}`)]
          ] : []
        },
        {
          id: "about-tabs",
          title: ae ? $r(ae) : "",
          items: ae ? pa(ae, Ie(_)) : []
        }
      ]);
    }
    function No(d) {
      const v = $.value;
      return v && ye(d, v) ? v : void 0;
    }
    function Bo(d) {
      const v = u.value, _ = o.value.get(d);
      if (!v || !_) return [];
      const O = a.menu ? zo(v, _) : null, D = Ro(d);
      D.length && O?.panel.length && D.push({ separator: !0 }), O && D.push(...O.panel);
      const q = Ho(_);
      q && (D.length && D.push({ separator: !0 }), D.push(q));
      const ge = br([
        { id: "about-panel", title: _.title, items: D },
        { id: "about-tabs", title: O?.tabsTitle ?? "", items: O?.tabs ?? [] }
      ]);
      return a.paneMenu ? a.paneMenu(_, ge) : ge;
    }
    const Fo = p(() => {
      const d = u.value;
      return d ? J(d) ? Do([]) : Mr([]) : [];
    });
    function Do(d) {
      const v = u.value, _ = v ? Ue(v, d) : null;
      if (!a.menu || !_ || !J(_) || _.panels.length < 2) return [];
      const O = (q, ge, ve) => ({
        id: `show-${q}`,
        label: ge,
        checked: q === "tabs",
        action: () => {
          const U = u.value;
          if (!U) return;
          const ae = ve(U);
          ae !== U && (s.value = ae);
        }
      }), D = _.fixedView ? [] : [
        O("row", "Row", (q) => Qr(q, d, "row")),
        O("column", "Column", (q) => Qr(q, d, "column")),
        // Already true: these are tabs, and a strip collapsed is that strip.
        O("tabs", "Tabs", (q) => q),
        O("desktop", "Desktop", (q) => lp(q, d))
      ];
      return D.length && D.push({ separator: !0 }), D.push(...pa(_, Ie(_))), D;
    }
    function Ho(d) {
      const v = a.popOut?.(d);
      return !v || a.solo && u.value && Ge(u.value).length <= 1 ? null : {
        id: "pop-out",
        label: "Pop out to new window",
        action: () => {
          const _ = x.value?.querySelector(`.dc-pane[data-dc-panel="${CSS.escape(d.id)}"]`);
          gp(v, mp(_)) && r("panel-pop-out", { panel: d.id, href: v });
        }
      };
    }
    function qo(d, v) {
      return i[`${d}-${v}`] ?? i[d];
    }
    function Sr(d, v, _, O) {
      return qo(d, v.id)?.({ panel: v, view: _, active: O });
    }
    pp({
      panelFor: (d) => o.value.get(d) ?? null,
      viewFor: W,
      setView: Z,
      resizable: p(() => a.resizable),
      minPanelSize: p(() => a.minPanelSize),
      spaceNames: p(() => a.spaceNames),
      rootBar: p(() => a.rootBar),
      focused: $,
      dragging: w,
      dropTarget: k,
      moving: M,
      framing: y,
      canMove: R,
      focus(d) {
        $.value !== d && ($.value = d, r("panel-activate", d));
      },
      selectPanel: ua,
      beginDrag: at,
      toggleMoveMode: Eo,
      nudge: Ao,
      setSizes: Lo,
      frameOf: (d) => u.value ? Re(u.value, d) : null,
      beginFrameDrag: Mo,
      nudgeFrame: So,
      raise: j,
      maximized: se,
      toggleMaximize: Vt,
      minimized: N,
      toggleMinimize: ze,
      beginFrameDragAt: wr,
      raiseAt: F,
      toggleMaximizeAt: Be,
      toggleMinimizeAt: te,
      menuFor: Bo,
      spaceMenu: Mr,
      registerMenu: Oo,
      closable: da,
      close: kr,
      renderContent: (d, v, _) => Sr("panel", d, v, _),
      renderActions: (d, v, _) => Sr("actions", d, v, _),
      layout: u
    });
    const Vo = p(() => {
      if (!(!a.accent && !a.tokens))
        return { ...a.tokens, ...a.accent ? { "--dc-accent": a.accent } : {} };
    }), Ko = () => {
      const d = w.value, v = S.value;
      return !d || !v ? null : Jo(
        "div",
        {
          class: "dc-window__ghost",
          style: { left: `${v.x}px`, top: `${v.y}px` },
          "aria-hidden": "true"
        },
        o.value.get(d)?.title ?? d
      );
    };
    return t({
      /** The layout as rendered, reconciled against the current panels. */
      layout: u,
      /** Moves a panel programmatically — the same operation a drag performs. */
      move(d, v, _, O) {
        const D = u.value;
        D && G(xn(D, d, v, _, O), {
          panel: d,
          target: v,
          edge: _,
          ...O === void 0 ? {} : { index: O }
        });
      },
      /** Brings a panel's tab to the top of its group. */
      select(d) {
        const v = u.value;
        v && (s.value = It(v, d));
      },
      /** Lifts a panel onto the float holding `near`, as a window of its own. */
      float(d, v, _) {
        const O = u.value;
        O && G(Gr(O, d, v, _), {
          panel: d,
          target: v,
          edge: "float",
          rect: _
        });
      },
      /** Puts a floating frame somewhere else, or makes it another size. */
      setRect(d, v) {
        const _ = u.value;
        if (!_) return;
        const O = Xf(_, d, v);
        if (O === _) return;
        s.value = O;
        const D = Re(O, d);
        D && r("frame-change", { panel: d, rect: D.rect });
      },
      /**
       * Puts a panel on one of its views, the way its menu would — the way a pane
       * whose space fixed its view, or took its bar away, is switched at all.
       */
      setView: Z,
      /**
       * The menu of the space at the root: how the whole window is shown. For a
       * host's menu bar, when `rootBar` takes away the bar it was on.
       */
      rootMenu: Fo,
      /** Brings a floating frame to the front of its stack. */
      raise: j,
      /** Fills the float with a window, or puts it back where it was. */
      toggleMaximize: Vt,
      /** Rolls a window up to its title bar, or unrolls it. */
      toggleMinimize: ze
    }), (d, v) => (f(), h("div", {
      ref_key: "root",
      ref: x,
      class: "dc-shell dc-window",
      "data-dc-theme": e.theme,
      "data-dc-dragging": w.value ? "true" : "false",
      "data-dc-docking": g.value ? "true" : "false",
      style: Me(Vo.value)
    }, [
      u.value ? (f(), X(fv, {
        key: 0,
        node: u.value,
        path: []
      }, null, 8, ["node"])) : (f(), h("p", vv, " This window has no panels. ")),
      fe(Ko),
      C("p", hv, B(b.value), 1)
    ], 12, pv));
  }
}), gv = /* @__PURE__ */ le(mv, [["__scopeId", "data-v-7884164d"]]);
function uh(e, t) {
  const n = K(!1);
  let a = null, r = !1, s = 0;
  const l = () => {
    s++, n.value = !1, a !== null && (clearTimeout(a), a = null);
  };
  function i(u) {
    a = setTimeout(() => void o(u), t);
  }
  async function o(u) {
    if (r || u !== s) return;
    let m;
    try {
      m = await e();
    } catch {
      m = !1;
    }
    r || u !== s || (m ? i(u) : l());
  }
  const c = () => {
    n.value || (n.value = !0, o(++s));
  };
  return Dt(() => {
    r = !0, l();
  }, !0), { start: c, stop: l, polling: n };
}
function dh(e, t = {}) {
  const n = t.key ?? ((s) => JSON.stringify(s)), a = ft();
  let r = null;
  return el(() => {
    const s = e(), l = n(s);
    l !== r && (r = l, a.value = s);
  }), a;
}
const yv = (e) => Math.round(e * 1e3) / 1e3;
function ka(e, t) {
  return e.title && (t.t = e.title), e.headless && (t.h = !0), e.fixedView && (t.v = !0), t;
}
function _v(e) {
  return [Math.round(e.x), Math.round(e.y), Math.round(e.w), Math.round(e.h)];
}
function ba(e) {
  const t = { b: _v(e.rect) };
  return e.title && (t.t = e.title), e.maximized && (t.M = !0), e.minimized && (t.m = !0), t;
}
function wv(e) {
  if (e.kind !== "group" || e.panels.length !== 1) return null;
  const t = e.panels[0];
  return typeof t != "string" || e.title || e.headless || e.fixedView || e.places ? null : t;
}
function Va(e) {
  const t = wv(e);
  return t !== null ? t : ko(e);
}
function ko(e) {
  if (e.kind === "group") {
    const n = { g: e.panels.map((a) => typeof a == "string" ? a : ko(a)) };
    return e.active !== void 0 && e.active !== e.panels[0] && (n.a = e.active), e.places && (n.p = e.places.map(ba)), ka(e, n);
  }
  if (e.kind === "split") {
    const n = { [e.direction === "row" ? "r" : "c"]: e.children.map(Va) };
    return e.sizes && (n.z = e.sizes.map(yv)), e.places && (n.p = e.places.map(ba)), ka(e, n);
  }
  const t = {
    f: e.frames.map((n) => ({ n: Va(n.node), ...ba(n) }))
  };
  return ka(e, t);
}
class bo extends Error {
}
const Oe = () => {
  throw new bo();
}, Ka = (e) => typeof e == "object" && e !== null && !Array.isArray(e), Ot = (e) => Array.isArray(e) ? e : Oe(), yr = (e) => e === void 0 ? void 0 : typeof e == "string" ? e : Oe(), $o = (e) => Ot(e).map((t) => typeof t == "number" && Number.isFinite(t) ? t : Oe());
function kv(e) {
  const [t, n, a, r] = $o(e);
  return r === void 0 && Oe(), { x: t, y: n, w: a, h: r };
}
function $a(e) {
  if (!Ka(e)) return Oe();
  const t = { rect: kv(e.b) }, n = yr(e.t);
  return n && (t.title = n), e.M === !0 && (t.maximized = !0), e.m === !0 && (t.minimized = !0), t;
}
function xa(e, t) {
  const n = yr(e.t);
  return n && (t.title = n), e.h === !0 && (t.headless = !0), e.v === !0 && (t.fixedView = !0), t;
}
function An(e) {
  if (typeof e == "string") return { kind: "group", panels: [e] };
  if (!Ka(e)) return Oe();
  if (e.g !== void 0) {
    const n = Ot(e.g).map((s) => typeof s == "string" ? s : An(s));
    n.length === 0 && Oe();
    const a = { kind: "group", panels: n }, r = yr(e.a);
    return r !== void 0 && (a.active = r), e.p !== void 0 && (a.places = Ot(e.p).map($a)), xa(e, a);
  }
  const t = e.r !== void 0 ? "row" : e.c !== void 0 ? "column" : null;
  if (t) {
    const n = Ot(t === "row" ? e.r : e.c).map(An), a = { kind: "split", direction: t, children: n };
    return e.z !== void 0 && (a.sizes = $o(e.z)), e.p !== void 0 && (a.places = Ot(e.p).map($a)), xa(e, a);
  }
  if (e.f !== void 0) {
    const a = { kind: "float", frames: Ot(e.f).map((r) => !Ka(r) || r.n === void 0 ? Oe() : { node: An(r.n), ...$a(r) }) };
    return xa(e, a);
  }
  return Oe();
}
const xo = /[ '!:(),*@$]/, bv = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][-+]?\d+)?$/;
function es(e) {
  return e !== "" && !xo.test(e) && !/^[-\d]/.test(e) ? e : `'${e.replace(/[!']/g, (n) => `!${n}`)}'`;
}
function Wa(e) {
  return e === null ? "!n" : e === !0 ? "!t" : e === !1 ? "!f" : typeof e == "number" ? Number.isFinite(e) ? String(e) : "!n" : typeof e == "string" ? es(e) : Array.isArray(e) ? `!(${e.map(Wa).join(",")})` : `(${Object.entries(e).map(([t, n]) => `${es(t)}:${Wa(n)}`).join(",")})`;
}
function $v(e) {
  let t = 0;
  const n = () => e[t], a = (i) => e[t++] === i ? void 0 : Oe(), r = () => {
    if (n() === "'") {
      t++;
      let o = "";
      for (; ; ) {
        const c = e[t++];
        if (c === void 0) return Oe();
        if (c === "'") return o;
        if (c === "!") {
          const u = e[t++];
          u !== "!" && u !== "'" && Oe(), o += u;
        } else o += c;
      }
    }
    const i = t;
    for (; t < e.length && !xo.test(e[t]); ) t++;
    return t === i && Oe(), e.slice(i, t);
  }, s = () => {
    const i = n();
    if (i === "(") {
      t++;
      const c = {};
      if (n() === ")")
        return t++, c;
      for (; ; ) {
        const u = r();
        a(":"), c[u] = s();
        const m = e[t++];
        if (m === ")") return c;
        m !== "," && Oe();
      }
    }
    if (i === "!") {
      t++;
      const c = e[t++];
      if (c === "t") return !0;
      if (c === "f") return !1;
      if (c === "n") return null;
      if (c !== "(") return Oe();
      const u = [];
      if (n() === ")")
        return t++, u;
      for (; ; ) {
        u.push(s());
        const m = e[t++];
        if (m === ")") return u;
        m !== "," && Oe();
      }
    }
    if (i === "'") return r();
    const o = r();
    return bv.test(o) ? Number(o) : o;
  }, l = s();
  return t !== e.length && Oe(), l;
}
function Ma(e) {
  return Wa(Va(e));
}
function xv(e) {
  try {
    return An($v(e));
  } catch (t) {
    if (t instanceof bo) return null;
    throw t;
  }
}
function Sa(e, t) {
  for (const n of e.replace(/^[?]/, "").split("&")) {
    const a = n.indexOf("="), r = a === -1 ? n : n.slice(0, a);
    if (_r(r) === t) return a === -1 ? "" : n.slice(a + 1);
  }
  return null;
}
function Ca(e, t, n) {
  const a = e.replace(/^[?]/, "").split("&").filter(Boolean), r = a.findIndex((l) => {
    const i = l.indexOf("=");
    return _r(i === -1 ? l : l.slice(0, i)) === t;
  }), s = n === null ? null : `${encodeURIComponent(t)}=${n}`;
  return r === -1 ? s && a.push(s) : s ? a[r] = s : a.splice(r, 1), a.length ? `?${a.join("&")}` : "";
}
function _r(e) {
  try {
    return decodeURIComponent(e.replace(/\+/g, " "));
  } catch {
    return e;
  }
}
const Mv = [
  [/%2C/g, ","],
  [/%3A/g, ":"],
  [/%2F/g, "/"],
  [/%40/g, "@"],
  [/%24/g, "$"],
  [/%20/g, "+"]
], ts = (e) => {
  let t = encodeURIComponent(e);
  for (const [n, a] of Mv) t = t.replace(n, a);
  return t;
};
function fh(e, t) {
  const { adapter: n } = t, a = t.param ?? "w", r = t.soloParam ?? "solo", s = t.delay ?? 200, l = () => ut(t.home) ?? null;
  let i = Sa(n.search.value, a), o = null;
  const c = () => {
    o !== null && clearTimeout(o), o = null;
  }, u = (k) => k === null ? l() : xv(_r(k)) ?? l(), m = () => {
    c();
    const k = e.value, g = l(), M = k ? Ma(k) : null, y = M === null || g && M === Ma(g) ? null : ts(M);
    i = y;
    const S = Ca(n.search.value, a, y);
    S !== n.search.value && n.replace(S);
  }, $ = u(i);
  return $ && (e.value = $), $e(e, () => {
    c(), o = setTimeout(m, s);
  }), $e(n.search, (k) => {
    const g = Sa(k, a);
    if (g === i) return;
    c(), i = g;
    const M = u(g);
    M && (e.value = M);
  }), Vn() && Dt(() => o !== null ? m() : void 0), {
    flush: () => o !== null ? m() : void 0,
    popOutHref: (k) => {
      let g = Ca(n.search.value, a, ts(Ma(Uf(et(k)))));
      return g = Ca(g, r, "1"), n.href ? n.href(g) : `${n.path.value}${g}`;
    },
    solo: p(() => Sa(n.search.value, r) !== null)
  };
}
function ph(e = {}) {
  return { key: "ordinal", kind: "ordinal", label: "#", width: "52px", ...e };
}
function vh(e = {}) {
  return { key: "status", role: "state", kind: "status", label: "State", width: "104px", ...e };
}
function hh(e = {}) {
  return { key: "tint", role: "tint", ...e };
}
function mh(e = {}) {
  return { key: "picture", role: "image", kind: "image", width: "56px", height: "40px", ...e };
}
function gh(e, t = {}) {
  return {
    key: "primary",
    role: "identity",
    label: e,
    sort: "name",
    activate: !0,
    truncate: !0,
    ...t
  };
}
function yh(e, t = {}) {
  return {
    key: "secondary",
    role: "reference",
    label: e,
    mono: !0,
    muted: !0,
    truncate: !0,
    ...t
  };
}
function _h(e, t, n = {}) {
  return {
    key: e,
    role: "metric",
    kind: "number",
    label: t,
    sort: e,
    width: "92px",
    hideBelow: 760,
    ...n
  };
}
function wh(e, t, n = {}) {
  return { key: e, kind: "date", label: t, sort: e, width: "104px", mono: !0, muted: !0, ...n };
}
function kh(e = {}) {
  return {
    key: "entityLabel",
    label: "Entity",
    width: "130px",
    truncate: !0,
    class: "dc-table__entity",
    ...e
  };
}
function bh(e, t, n = {}) {
  return { key: e, label: t, truncate: !0, hideBelow: 900, ...n };
}
function $h(e, t, n, a = {}) {
  return {
    key: e,
    label: t,
    value: (r) => Object.entries(n).filter(([s]) => r.fields[s] === !0).map(([, s]) => s),
    muted: !0,
    truncate: !0,
    hideBelow: 1100,
    ...a
  };
}
function ia(e) {
  return typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : Number.NaN;
}
function xh(e) {
  const t = ia(e);
  return Number.isFinite(t) && t > 0 ? ol(t) : it;
}
function Mh(e) {
  const t = ia(e);
  return Number.isFinite(t) && t > 0 ? ll(t) : it;
}
function Sh(e) {
  const t = ia(e);
  return Number.isFinite(t) && t > 0 ? il(t) : it;
}
function Ch(e) {
  const t = ia(e);
  return Number.isFinite(t) ? cl(t) : it;
}
function Sv(e) {
  if (e <= 0) return 0;
  const t = 10 ** Math.floor(Math.log10(e));
  for (const n of [1, 2, 5])
    if (e <= n * t) return n * t;
  return 10 * t;
}
function Cv(e, t) {
  const n = /* @__PURE__ */ new Set();
  for (const a of e) {
    const r = a.fields[t];
    for (const s of Array.isArray(r) ? r : [r])
      typeof s == "string" && s && n.add(s);
  }
  return [...n].sort((a, r) => a.localeCompare(r));
}
function Ev(e, t) {
  let n = 0;
  for (const a of e) {
    const r = a.fields[t];
    typeof r == "number" && r > n && (n = r);
  }
  return n;
}
function Eh(e, t, n, a = {}) {
  return {
    kind: "chips",
    key: t,
    label: n,
    options: Cv(e, t),
    ...a.multiple ? { multiple: !0 } : {}
  };
}
function Ph(e, t, n) {
  return { kind: "range", key: t, label: n, min: 0, max: Sv(Ev(e, t)) };
}
function Ah(e, t, n) {
  return { kind: "toggle", key: e, label: t, text: n };
}
function Lh(e) {
  return e.filter((t) => t.kind === "chips" ? t.options.length > 1 : t.kind === "range" ? t.max > 0 : !0);
}
function Th(e = "", t = "/") {
  const n = K(De(e)), a = K(t), r = [`${a.value}${n.value}`];
  return {
    search: n,
    path: a,
    history: r,
    href(s, l) {
      return `${l ?? a.value}${De(s)}`;
    },
    push(s, l) {
      l !== void 0 && (a.value = l), n.value = De(s), r.push(`${a.value}${n.value}`);
    },
    replace(s, l) {
      l !== void 0 && (a.value = l), n.value = De(s), r[r.length - 1] = `${a.value}${n.value}`;
    }
  };
}
function ns(e) {
  const t = e.indexOf("?");
  if (t === -1) return "";
  const n = e.slice(t), a = n.indexOf("#");
  return De(a === -1 ? n : n.slice(0, a));
}
function Oh(e) {
  const t = K(ns(e.currentRoute.value.fullPath)), n = p(() => e.currentRoute.value.path), a = $e(
    () => e.currentRoute.value.fullPath,
    (r) => {
      t.value = ns(r);
    }
  );
  return {
    search: t,
    path: n,
    push: (r, s) => e.push(`${s ?? n.value}${De(r)}`),
    replace: (r, s) => e.replace(`${s ?? n.value}${De(r)}`),
    href: (r, s) => {
      const l = `${s ?? n.value}${De(r)}`;
      return e.resolve?.(l).href ?? l;
    },
    dispose: a
  };
}
function Rh(e, t, n = "/") {
  return (a) => {
    const r = a.params[t], s = Array.isArray(r) ? r.join("/") : r ?? "", l = a.query[Ct], i = typeof l == "string" ? l : "", o = `${e}="${s.replace(/"/g, "")}"`;
    return { path: n, query: { ...a.query, [Ct]: fn(i, o) } };
  };
}
function zh(e, t = "/") {
  return (n) => ({ path: t, query: { ...n.query, [Ht]: e } });
}
function Ih(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.entityKey);
    a ? a.push(n) : t.set(n.entityKey, [n]);
  }
  return {
    query(n) {
      return ws(n, (a) => t.get(a.key) ?? [], {
        undatedLast: !0,
        zeroIsAll: !0
      });
    }
  };
}
function Nh(e, t) {
  return e.query({ ...t, limit: Number.MAX_SAFE_INTEGER, offset: 0 }).rows;
}
const Pv = {
  DataShell: Dd,
  ShellHeader: Fs,
  RecordActions: Hs,
  ResultsArea: Qs,
  SegmentedControl: nf,
  StatusPill: pn,
  WindowFrame: gv,
  WindowPane: wo,
  ListView: Na,
  CardsView: Ks,
  GridView: Ws,
  ImagesView: js,
  TableView: Ys,
  LinksView: Us,
  PreviewView: Gs,
  TypeCardsView: Xs
}, Bh = {
  install(e, t = {}) {
    const n = t.prefix ?? "";
    for (const [a, r] of Object.entries(Pv))
      e.component(`${n}${a}`, r);
    t.route && e.provide(ss, t.route), (t.theme || t.accent || t.tokens) && oi({ theme: t.theme, accent: t.accent, tokens: t.tokens }, e);
  }
};
export {
  Hn as CASCADE_STEP,
  Rv as COLUMN_BREAKPOINTS,
  Ov as COLUMN_ROLES,
  Ks as CardsView,
  Vr as ColumnCell,
  xf as CopyButton,
  fl as DEFAULT_ENTITY_VIEW,
  xt as DEFAULT_FRAME,
  Pa as DEFAULT_SORT,
  dl as DEFAULT_VIEW,
  gi as DRAFT_DELAY,
  Dd as DataShell,
  it as EMPTY_CELL,
  bs as ENTITY_ALL,
  Dn as ENTITY_TERM,
  sn as EXPRESSION_TERM,
  Ws as GridView,
  Bh as HeaderContentLayoutPlugin,
  js as ImagesView,
  Us as LinksView,
  Na as ListView,
  Tt as MINIMIZED_GAP,
  to as MINIMIZED_HEIGHT,
  Ba as MINIMIZED_WIDTH,
  eo as MIN_FRAME,
  zn as MOCK_TINTS,
  jv as MenuBar,
  ir as MenuButton,
  sr as MenuList,
  vn as MetricDrill,
  hn as OpenMark,
  gr as PANE_CONTEXT_KEY,
  er as PARAM_DIR,
  Ht as PARAM_ENTITY,
  Ct as PARAM_EXPR,
  Qn as PARAM_PAGE,
  Ja as PARAM_SORT,
  Xn as PARAM_VIEW,
  Tv as PILL_TONES,
  qf as POPOVER_FLIP_BELOW,
  Df as POPOVER_GAP,
  Hf as POPOVER_MARGIN,
  or as PinStar,
  Gs as PreviewView,
  lr as QueryMark,
  Ut as RECORD_STATUSES,
  Xa as RESULT_FIELDS,
  ss as ROUTE_ADAPTER_KEY,
  Hs as RecordActions,
  Qs as ResultsArea,
  Ts as SHELL_CONTEXT_KEY,
  Lv as SHELL_THEMES,
  Fn as SHELL_THEME_KEY,
  mn as ScopeMark,
  nf as SegmentedControl,
  At as SelectTick,
  Wv as ShellCard,
  Yv as ShellCode,
  Qv as ShellDialog,
  pf as ShellFact,
  Uv as ShellFacts,
  Fs as ShellHeader,
  Xv as ShellLog,
  Jv as ShellPopover,
  Zv as ShellToasts,
  Ia as StandingControl,
  Gv as StatusCounts,
  pn as StatusPill,
  Rf as TOAST_ERROR_MS,
  Of as TOAST_MS,
  Ys as TableView,
  Xs as TypeCardsView,
  os as VIEW_KINDS,
  pl as VIEW_LABELS,
  mr as WINDOW_CONTEXT_KEY,
  gv as WindowFrame,
  wo as WindowPane,
  ao as activePanel,
  Lt as activeTab,
  fn as addTerm,
  Za as andExpression,
  Gf as axisOf,
  xh as bytesCell,
  sa as cascade,
  ds as cellFull,
  Bt as cellText,
  Sn as cellTextOf,
  He as cellValue,
  va as changesResults,
  Eh as chipsFrom,
  _a as clampRect,
  fo as collapseSpace,
  sp as collapseToTabs,
  th as column,
  Ar as columnAlign,
  Lr as columnClass,
  Pr as columnKey,
  dn as columnShortcut,
  ms as columnShortcutOf,
  La as columnTruncates,
  yl as columnsFor,
  ps as compactShortcuts,
  gl as countPages,
  tl as createHistoryAdapter,
  Th as createMemoryAdapter,
  Ih as createMemoryDataSource,
  Yl as createMockDataSource,
  Oh as createVueRouterAdapter,
  wh as dateColumn,
  xv as decodeLayout,
  kl as defaultCellText,
  Jr as defaultLayout,
  Ya as defaultQuery,
  tn as defaultViewFor,
  nl as detachableAdapter,
  ga as drillExpression,
  Yr as dropIntoSpace,
  Mh as durationCell,
  Sh as elapsedCell,
  hl as emptyFacetValue,
  Ma as encodeLayout,
  Jl as entityAddress,
  kh as entityColumn,
  Aa as entityCount,
  zh as entityRedirect,
  Ss as excludingTerm,
  rn as expandShortcuts,
  bh as facetColumn,
  Os as facetField,
  Is as facetValue,
  Al as fieldHeading,
  Ms as fieldTerm,
  nn as findEntity,
  $s as findEntityByAddress,
  mt as findSort,
  nh as fixedView,
  $h as flagColumn,
  cr as float,
  Gr as floatPanel,
  mo as floatSplit,
  op as floatTabs,
  lp as floatTabsAt,
  Yt as fnv1a,
  is as focusEntity,
  ol as formatBytes,
  Rn as formatCount,
  rl as formatDate,
  zv as formatDateTime,
  ll as formatDuration,
  il as formatElapsed,
  ot as formatExpression,
  Wt as formatInteger,
  al as formatMetric,
  sl as formatOrdinal,
  cl as formatPercent,
  Sl as formatRange,
  $t as formatTerm,
  ra as frame,
  kt as frameAt,
  Re as frameOf,
  Ha as framePathOf,
  Ie as frontPanel,
  Gl as generateRows,
  eh as group,
  Rt as groupOf,
  Yf as groups,
  di as hasActiveFacets,
  ye as hasPanel,
  Uf as headless,
  gh as identityColumn,
  qv as idsExpression,
  Gt as insertPanel,
  Xt as isChoosable,
  Iv as isEntityScoped,
  ml as isFacetActive,
  ie as isFloat,
  J as isGroup,
  ht as isMaximized,
  bt as isMinimized,
  xe as isPanelTab,
  Ua as isPristineQuery,
  an as isRangeTerm,
  qt as isSplit,
  je as isTabOf,
  Ga as isTypeCardsQuery,
  ls as isViewKind,
  Bv as joinExpression,
  Cs as liftTerm,
  Rl as matchesExpression,
  Qf as maximizeFrame,
  Jf as maximizeFrameAt,
  up as mergeSpace,
  _h as metricColumn,
  Zf as minimizeFrame,
  ep as minimizeFrameAt,
  xn as movePanel,
  Zt as moveTab,
  Vv as narrowPatch,
  zl as negateTerm,
  Sv as niceMax,
  Ue as nodeAt,
  Jt as nodeTitle,
  Ce as normalizeLayout,
  De as normalizeSearch,
  vr as normalizeSizes,
  yo as onlySpace,
  gp as openPopOut,
  Nl as oppositeTerm,
  ph as ordinalColumn,
  Ge as panelIds,
  et as panelNode,
  Wr as panelTabs,
  Te as parseExpression,
  ni as parseQuery,
  Ch as percentCell,
  mh as pictureColumn,
  Vf as placePopover,
  mp as popOutRect,
  wc as presentParts,
  qs as presentRow,
  ta as pressOptions,
  _o as providePaneContext,
  ri as provideShellContext,
  oi as provideShellTheme,
  pp as provideWindowContext,
  Nh as queryAll,
  wa as raiseFrame,
  Qt as raiseFrameAt,
  tp as raisedPath,
  Ph as rangeFrom,
  Gn as rangeOf,
  Dl as readDraft,
  Hv as readExpression,
  fp as reconcileLayout,
  Rh as recordRedirect,
  xs as recordTerm,
  ai as recordsIn,
  yh as referenceColumn,
  Oa as refineExpression,
  Mt as removePanel,
  lt as replaceAt,
  jr as resizeRect,
  Zr as resizeSplit,
  ja as resolveView,
  Ze as roleColumn,
  us as roleColumns,
  qn as rootSpace,
  dr as row,
  wl as rowKey,
  Ta as sameTerm,
  Jn as scopeTerm,
  Bn as scopeTermFor,
  As as scopedEntity,
  Dv as searchFromQuery,
  ma as serializeQuery,
  It as setActivePanel,
  Xf as setFrameRect,
  Ur as setFrameRectAt,
  Pn as setSizesAt,
  sh as setSplitDirection,
  dt as sizesOf,
  ei as sortAddress,
  Un as sortsFor,
  Ae as spaceChrome,
  Ft as spaceTitle,
  ur as split,
  Nv as splitExpression,
  Xr as spreadTabs,
  Qr as spreadTabsAt,
  vh as stateColumn,
  ul as stripAnsi,
  vi as summarizeQuery,
  rr as summaryTerms,
  En as swapPanels,
  aa as tabNode,
  yn as tabPanels,
  nr as termStanding,
  go as tileFloat,
  hh as tintColumn,
  Fv as tintFor,
  oh as toFloat,
  lh as toTiled,
  Ah as toggleFacet,
  ah as toggleMaximized,
  rh as toggleMinimized,
  Vu as useColumns,
  yi as useDraft,
  Vi as useEntityCounts,
  ld as useEntityPreviews,
  ar as useLayerTheme,
  fh as useLayoutRoute,
  ih as usePaneContext,
  ch as usePaneMenu,
  uh as usePoll,
  Pt as usePresentedRows,
  hi as useQueryState,
  ki as useRecordNames,
  mi as useResults,
  Ee as useShellContext,
  dh as useStableSchema,
  If as useToasts,
  la as useWindowContext,
  Lh as usefulFacets,
  Er as viewAcross,
  Ns as withFacetValue,
  Ra as withStanding,
  Kv as withoutFacet,
  Ps as withoutOwnScope,
  Il as withoutTerm
};
