function p(t) {
  let e = 2166136261;
  for (let r = 0; r < t.length; r++)
    e ^= t.charCodeAt(r), e = Math.imul(e, 16777619);
  return Math.abs(e);
}
function u(t) {
  if (!Number.isFinite(t)) return "—";
  const e = Math.abs(t);
  return e >= 1e6 ? `${(t / 1e6).toFixed(1)}m` : e >= 1e3 ? `${(t / 1e3).toFixed(1)}k` : String(Math.round(t));
}
function c(t) {
  const e = new Date(t);
  if (Number.isNaN(e.getTime())) return "—";
  const r = String(e.getUTCDate()).padStart(2, "0"), i = String(e.getUTCMonth() + 1).padStart(2, "0");
  return `${r}.${i}.${e.getUTCFullYear()}`;
}
function k(t) {
  return String(t + 1).padStart(2, "0");
}
function g(t) {
  return `${Math.round(Math.min(1, Math.max(0, t)) * 100)}%`;
}
const d = "—", o = {
  identity: "Item",
  reference: "Reference",
  metrics: ["Metric", "Metric 2"]
};
function x(t = {}) {
  const e = t.identity ?? o.identity, r = t.reference ?? o.reference, i = t.metrics ?? [...o.metrics];
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
    ...i.map((n, l) => {
      const a = typeof n == "string" ? { label: n } : n, s = a.field ?? `metric${l + 1}`;
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
function S(t, e) {
  return t.find((r) => r.role === e);
}
function _(t, e) {
  return t.filter((r) => r.role === e);
}
function M(t, e) {
  const r = (e ? e.columns : t?.columns) ?? [], i = e ? "scoped" : "everything";
  return r.filter(
    (n) => n.role !== "tint" && ((n.when ?? "always") === "always" || n.when === i)
  );
}
const f = ["id", "entityKey", "entityLabel"];
function m(t, e) {
  if (t.value) return t.value(e);
  const r = t.field ?? t.key;
  if (r !== void 0) {
    if (e.fields && r in e.fields) return e.fields[r];
    if (f.includes(r))
      return e[r];
  }
}
function C(t, e) {
  const r = t.key ?? t.field ?? t.label;
  return r?.trim() ? r.trim() : `column-${e}`;
}
function w(t, e) {
  return t.id?.trim() ? t.id : `${t.entityKey || "row"}-${e}`;
}
function y(t, e) {
  if (t == null || t === "") return d;
  if (e === "number") {
    const r = typeof t == "number" ? t : Number(t);
    return Number.isFinite(r) ? u(r) : String(t);
  }
  return e === "date" ? c(String(t)) : Array.isArray(t) ? t.length ? t.join(", ") : d : String(t);
}
function b(t, e) {
  const r = m(t, e);
  return t.format ? t.format(r, e) : y(r, t.kind);
}
function N(t, e) {
  return t ? b(t, e) : "";
}
function $(t) {
  return t.align ? t.align : t.kind === "number" || t.kind === "ordinal" ? "right" : "left";
}
const h = {
  ordinal: "dc-table__num",
  number: "dc-table__number",
  date: "dc-table__date",
  status: "dc-table__state"
};
function T(t) {
  return [h[t.kind ?? "text"], t.class].filter(Boolean).join(" ");
}
function E(t) {
  if (t.truncate !== void 0) return t.truncate;
  const e = t.kind ?? "text";
  return e === "text" || e === "number" || e === "date";
}
export {
  d as E,
  o as G,
  _ as a,
  N as b,
  m as c,
  x as d,
  g as e,
  p as f,
  b as g,
  k as h,
  w as i,
  M as j,
  E as k,
  $ as l,
  T as m,
  C as n,
  y as o,
  c as p,
  u as q,
  S as r
};
