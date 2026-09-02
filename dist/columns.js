const c = ["list", "cards", "grid", "table", "links", "preview"], _ = [
  "minimal",
  "mono-size",
  "dark",
  "light",
  "auto",
  "macos",
  "windows",
  "inherit"
], T = ["ok", "running", "queued", "review", "failed"], C = [480, 620, 760, 900, 1100], o = "cards", F = "updated";
function u(t) {
  return typeof t == "string" && c.includes(t);
}
function l(t, e) {
  return e ? t.entities.find((n) => n.key === e) ?? null : null;
}
function d(t, e = {}) {
  const n = l(t, e.entity), r = t.entities[0];
  if (!n && !r) throw new Error(`Schema "${t.key}" declares no entities`);
  return n ?? r;
}
const f = {
  primary: "Item",
  secondary: "Reference",
  metric1: "Metric",
  metric2: "Metric 2"
};
function m(t) {
  return t?.sorts?.length ? t.sorts : [
    { key: "updated", label: "updated" },
    { key: "score", label: "score" },
    { key: "metric1", label: t ? t.labels.metric1.toLowerCase() : "value" },
    { key: "metric2", label: t ? t.labels.metric2.toLowerCase() : "second value" },
    { key: "name", label: "name" }
  ];
}
function y(t, e) {
  const n = m(t);
  return (e ? n.find((i) => i.key === e) : void 0) ?? n[0];
}
function s(t) {
  switch (t.kind) {
    case "chips":
      return { kind: "chips", selected: [] };
    case "range":
      return { kind: "range", min: null, max: null };
    case "toggle":
      return { kind: "toggle", on: !1 };
  }
}
function b(t) {
  const e = {};
  for (const n of t?.facets ?? []) e[n.key] = s(n);
  return e;
}
function h(t) {
  if (!t) return !1;
  switch (t.kind) {
    case "chips":
      return t.selected.length > 0;
    case "range":
      return t.min !== null || t.max !== null;
    case "toggle":
      return t.on;
  }
}
function k(t) {
  return Object.values(t).some(h);
}
function M(t) {
  return t.entity === null && t.expr.trim() === "" && !k(t.facets);
}
function L(t) {
  return t.entity !== null;
}
function A(t) {
  return t.entity === null && t.view === "cards";
}
function N(t, e) {
  return e <= 0 ? 1 : Math.max(1, Math.ceil(t / e));
}
function D(t, e = {}) {
  const r = e.landing === "entity" ? d(t, e) : null;
  return {
    entity: r?.key ?? null,
    view: e.view && u(e.view) ? e.view : o,
    sort: y(r, e.sort).key,
    dir: e.dir === "asc" ? "asc" : "desc",
    expr: "",
    facets: b(r),
    page: 1
  };
}
const g = ["entity", "sort", "dir", "expr", "facets"];
function $(t) {
  return g.some((e) => e in t);
}
function I(t, e) {
  const n = {};
  for (const r of t?.facets ?? []) {
    const i = e[r.key];
    n[r.key] = i && i.kind === r.kind ? i : s(r);
  }
  return n;
}
function R(t) {
  let e = 2166136261;
  for (let n = 0; n < t.length; n++)
    e ^= t.charCodeAt(n), e = Math.imul(e, 16777619);
  return Math.abs(e);
}
function p(t) {
  if (!Number.isFinite(t)) return "—";
  const e = Math.abs(t);
  return e >= 1e6 ? `${(t / 1e6).toFixed(1)}m` : e >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : String(Math.round(t));
}
function w(t) {
  const e = new Date(t);
  if (Number.isNaN(e.getTime())) return "—";
  const n = String(e.getUTCDate()).padStart(2, "0"), r = String(e.getUTCMonth() + 1).padStart(2, "0");
  return `${n}.${r}.${e.getUTCFullYear()}`;
}
function U(t) {
  return String(t + 1).padStart(2, "0");
}
function B(t) {
  return `${Math.round(Math.min(1, Math.max(0, t)) * 100)}%`;
}
const a = "—";
function K(t) {
  const e = t?.labels ?? f;
  return [
    { key: "ordinal", kind: "ordinal", label: "#", width: "52px" },
    {
      key: "primary",
      label: e.primary,
      sort: "name",
      activate: !0,
      scope: !0,
      truncate: !0,
      class: "dc-table__primary"
    },
    { key: "secondary", label: e.secondary, mono: !0, muted: !0, truncate: !0 },
    {
      key: "entityLabel",
      label: "Entity",
      when: "everything",
      width: "130px",
      mono: !0,
      truncate: !0,
      hideBelow: 900,
      class: "dc-table__entity"
    },
    {
      key: "metric1",
      kind: "number",
      label: e.metric1,
      sort: "metric1",
      width: "110px",
      hideBelow: 760,
      ...t?.drills?.metric1 ? { drill: t.drills.metric1 } : {}
    },
    {
      key: "metric2",
      kind: "number",
      label: e.metric2,
      sort: "metric2",
      width: "110px",
      hideBelow: 760,
      ...t?.drills?.metric2 ? { drill: t.drills.metric2 } : {}
    },
    {
      key: "updatedAt",
      kind: "date",
      label: "Updated",
      sort: "updated",
      width: "120px",
      mono: !0,
      muted: !0,
      hideBelow: 620
    },
    { key: "status", kind: "status", label: "State", width: "110px" }
  ];
}
function O(t, e) {
  const n = (e ? e.columns : t?.columns) ?? [], r = e ? "scoped" : "everything";
  return n.filter(
    (i) => (i.when ?? "always") === "always" || i.when === r
  );
}
function V(t, e) {
  const n = t.key ?? t.field ?? t.label;
  return n?.trim() ? n.trim() : `column-${e}`;
}
function P(t, e) {
  return t.id?.trim() ? t.id : `${t.entityKey || "row"}-${e}`;
}
function S(t, e) {
  if (t.value) return t.value(e);
  const n = t.field ?? t.key;
  if (n !== void 0)
    return n in e ? e[n] : e.facets?.[n];
}
function E(t, e) {
  if (t == null || t === "") return a;
  if (e === "number") {
    const n = typeof t == "number" ? t : Number(t);
    return Number.isFinite(n) ? p(n) : String(t);
  }
  return e === "date" ? w(String(t)) : Array.isArray(t) ? t.length ? t.join(", ") : a : String(t);
}
function j(t, e) {
  const n = S(t, e);
  return t.format ? t.format(n, e) : E(n, t.kind);
}
function v(t) {
  return t.align ? t.align : t.kind === "number" || t.kind === "ordinal" ? "right" : "left";
}
const x = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function H(t) {
  return [x[t.kind ?? "text"], t.class].filter(Boolean).join(" ");
}
function Q(t) {
  if (t.truncate !== void 0) return t.truncate;
  const e = t.kind ?? "text";
  return e === "text" || e === "number" || e === "date";
}
export {
  Q as A,
  v as B,
  H as C,
  V as D,
  C as E,
  F,
  f as G,
  o as H,
  a as I,
  E as J,
  L as K,
  T as R,
  _ as S,
  c as V,
  R as a,
  D as b,
  l as c,
  K as d,
  s as e,
  y as f,
  M as g,
  h,
  u as i,
  d as j,
  $ as k,
  b as l,
  k as m,
  N as n,
  g as o,
  A as p,
  B as q,
  I as r,
  m as s,
  w as t,
  p as u,
  U as v,
  P as w,
  O as x,
  S as y,
  j as z
};
