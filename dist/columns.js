function g(t) {
  let e = 2166136261;
  for (let r = 0; r < t.length; r++)
    e ^= t.charCodeAt(r), e = Math.imul(e, 16777619);
  return Math.abs(e);
}
function f(t) {
  if (!Number.isFinite(t)) return "—";
  const e = Math.abs(t);
  return e >= 1e6 ? `${(t / 1e6).toFixed(1)}m` : e >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : String(Math.round(t));
}
function y(t) {
  const e = new Date(t);
  if (Number.isNaN(e.getTime())) return "—";
  const r = String(e.getUTCDate()).padStart(2, "0"), n = String(e.getUTCMonth() + 1).padStart(2, "0");
  return `${r}.${n}.${e.getUTCFullYear()}`;
}
function k(t) {
  return String(t + 1).padStart(2, "0");
}
function x(t) {
  return `${Math.round(Math.min(1, Math.max(0, t)) * 100)}%`;
}
const d = "—", o = {
  identity: "Item",
  reference: "Reference",
  metrics: ["Metric", "Metric 2"]
};
function S(t = {}) {
  const e = t.identity ?? o.identity, r = t.reference ?? o.reference, n = t.metrics ?? [...o.metrics];
  return [
    { key: "ordinal", kind: "ordinal", label: "#", width: "52px" },
    {
      key: "primary",
      role: "identity",
      label: e,
      sort: "name",
      activate: !0,
      scope: !0,
      truncate: !0,
      class: "dc-table__primary"
    },
    {
      key: "secondary",
      role: "reference",
      label: r,
      mono: !0,
      muted: !0,
      truncate: !0
    },
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
    ...n.map((i, c) => {
      const a = typeof i == "string" ? { label: i } : i, s = a.field ?? `metric${c + 1}`;
      return {
        key: s,
        role: "metric",
        kind: "number",
        label: a.label,
        sort: s,
        width: "110px",
        hideBelow: 760,
        ...a.drill ? { drill: a.drill } : {}
      };
    }),
    {
      key: "updatedAt",
      role: "updated",
      kind: "date",
      label: "Updated",
      sort: "updated",
      width: "120px",
      mono: !0,
      muted: !0,
      hideBelow: 620
    },
    { key: "status", role: "state", kind: "status", label: "State", width: "110px" },
    {
      key: "score",
      role: "score",
      kind: "score",
      /* Named as the sort it offers is named, the two being one thing now: a
         heading a schema does not like is a heading it can change. */
      label: "Score",
      sort: "score",
      width: "72px",
      hideBelow: 900
    },
    /* A background is not a value, so the table leaves this one out. It is
       declared so that the schema names every field it has in one place. */
    { key: "tint", role: "tint" }
  ];
}
function _(t, e) {
  return t.find((r) => r.role === e);
}
function M(t, e) {
  return t.filter((r) => r.role === e);
}
function C(t, e) {
  const r = (e ? e.columns : t?.columns) ?? [], n = e ? "scoped" : "everything";
  return r.filter(
    (i) => i.role !== "tint" && ((i.when ?? "always") === "always" || i.when === n)
  );
}
const m = ["id", "entityKey", "entityLabel"];
function l(t, e) {
  if (t.value) return t.value(e);
  const r = t.field ?? t.key;
  if (r !== void 0) {
    if (e.fields && r in e.fields) return e.fields[r];
    if (m.includes(r))
      return e[r];
  }
}
function N(t, e) {
  const r = t.key ?? t.field ?? t.label;
  return r?.trim() ? r.trim() : `column-${e}`;
}
function w(t, e) {
  return t.id?.trim() ? t.id : `${t.entityKey || "row"}-${e}`;
}
function b(t, e) {
  if (t == null || t === "") return d;
  if (e === "number") {
    const r = typeof t == "number" ? t : Number(t);
    return Number.isFinite(r) ? f(r) : String(t);
  }
  return e === "date" ? y(String(t)) : Array.isArray(t) ? t.length ? t.join(", ") : d : String(t);
}
function u(t, e) {
  const r = l(t, e);
  return t.format ? t.format(r, e) : b(r, t.kind);
}
function h(t) {
  return typeof t == "number" ? Number.isFinite(t) ? String(t) : "" : typeof t == "string" ? t : Array.isArray(t) ? t.join(", ") : "";
}
function $(t, e) {
  const r = u(t, e), n = h(l(t, e));
  return n && n !== r ? n : r;
}
function A(t, e) {
  return t ? u(t, e) : "";
}
function F(t) {
  return t.align ? t.align : t.kind === "number" || t.kind === "ordinal" ? "right" : "left";
}
const p = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function T(t) {
  return [p[t.kind ?? "text"], t.class].filter(Boolean).join(" ");
}
function E(t) {
  if (t.truncate !== void 0) return t.truncate;
  const e = t.kind ?? "text";
  return e === "text" || e === "number" || e === "date";
}
export {
  d as E,
  o as G,
  M as a,
  A as b,
  l as c,
  S as d,
  x as e,
  g as f,
  u as g,
  k as h,
  w as i,
  C as j,
  E as k,
  $ as l,
  F as m,
  T as n,
  N as o,
  b as p,
  y as q,
  _ as r,
  f as s
};
