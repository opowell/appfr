# The expression field

A small query language, evaluated by the bundled mock and memory sources and
exported for your own (`parseExpression`, `matchesExpression`):

```
site:*.shop AND price < 40 AND seen:false
theme:space year>=1988 parts>300
cve OR advisory
"platform engineer"
```

| Syntax | Meaning |
| --- | --- |
| whitespace, `AND` | Both |
| `OR` | Alternatives. There are no brackets |
| bare word | Matches the identity and reference columns; `*` is a wildcard |
| `field:value` | Contains |
| `field=value` | Equals, whole value (or whole entry, in a list) |
| `field<op>number` | `<`, `<=`, `>`, `>=` |
| `field:min..max` | Range; either end may be empty |
| `-term` | Turns the term round |

- **Two positive `:` or `=` terms on one field are any-of**: `category:5
  category:7` is rows under either. Ranges (`year>=1988 year<=1990`) and
  negations (`-set:a -set:b`) stay separate constraints.
- **`-` turns only the match.** An unknown field, or a number compared against
  a word, constrains nothing with or without it.
- **Fields resolve in order**: `entity`, a field the row carries, a column by
  key or heading, a facet by heading, then the generic role names (`name`,
  `ref`, `status`, `updated`, `metric1`…). A declared field is never shadowed by
  a heading or a generic name.
- **An unknown field is ignored**, so a half-typed expression keeps showing
  results — except a join key under
  [`strictScopes`](records.md#narrowing-to-one-record), which a row must carry.
- **A multi-valued facet matches on any of its values**: `region:eu` keeps a
  row in `eu` and `us`. A numeric comparison against one constrains nothing.
- **`entity:`** filters by kind from the expression alone: `entity:logs` from
  home narrows to logs without leaving the whole-corpus view.

**Headings.** A heading of several words is written run together, in any case
(`priceratio<0.5` for **Price ratio**), or by its shortcut — the first letter of
each word (`pr<0.5`). Shortcuts are expanded to the column's key on commit, so
the URL, the pill and your source see `ratio<0.5` (`expandShortcuts`,
`columnShortcut`). Where two headings share a shortcut, the first declared
column gets it. A shortcut never shadows a key, heading, facet, `entity` or
generic name. Column keys match in any case. A table header's hover names its
column's shortcut (`columnShortcutOf`).

## The parts of a query

The header shows a query as its parts: the entity, the view, the sort, and each
term of the expression, facets included. Pressing a term's pill lifts it.

```
[Items · 412 ▾] [List ▾] [updated ▾] [↓] [year>=1988] [release] or [recall]
                                          ^ press: that constraint is gone
```

- **Entity** is the first choice. It lists every entity with `Everything` at
  the top, and stays on the bar even when nothing is filtered.
- **View** and **sort** are choices on the bar because they are part of the
  query and the URL. The sort lists the columns that offer an ordering, named
  as their headings; the arrow beside it flips the direction.
- **The sort waits for a type.** On `Everything` the sort chooser and its arrow
  are off the bar, since the schema-level columns hold different things per
  row. A mixed table's own headings still sort.
- **Counts.** Each type shows the population its schema publishes (`Items ·
  10k`); the type in force shows what matched once anything narrows it.
  `Everything` shows a count only while it is what is listed. A numeric `count`
  is abbreviated with `formatCount` (`9988` → `10k`); a string is shown as
  given (`~1.2k`, or `''` while unknown). `formatInteger` is the exact grouped
  form the pager uses.
- **`OR` groups** are separated by `or`; lifting the last term of one drops
  that alternative.

**A term on a join key names a record.** The header looks the record up and
shows its name, keeping the id:

```
set="sets_10007"                    as written by a drill, and as it stays in the URL
set:Yellow Castle (sets_10007)      as the header reads it back
```

- **A drill's term is `=`, not `:`**, because ids nest and `:` matches by
  containment (`test:"ticket-3.0/x.spec.ts"` also matches
  `pre-ticket-3.0/x.spec.ts`). An old `field:"id"` term is read as naming the
  same record by `addTerm`, `termStanding`, `liftTerm` and `withStanding`, but
  keeps its containment match until one of them rewrites it.
- **The lookup** runs the drill's term against the type it points at — one
  query, cached while the shell is up — so a source that answers
  `set="sets_10007"` needs nothing new. The record is the row that has the id,
  not the first row back. An id that is part of more ids than the lookup's
  window, or that no row carries, keeps showing as an id.
- **A name that equals the id** (a tenant keyed by its host) is not repeated;
  the part stays the plain term. So does a type with no `identity` column.

`useRecordNames` exposes the lookup, and `scopedEntity(schema, field)` says
which type a field points at.

**Rewriting.** Lifting a part rewrites the expression from its parse, so
`Theme:space AND price < 40` comes back as `theme:space price<40`.
`formatExpression`, `withoutTerm`, `summaryTerms(query, entity)` and the query
state's `removeTerm(term)` do the same for a host. `addTerm` compares terms, not
text, so `host="a.example"` and `host=a.example` are one constraint and a
repeat drill adds nothing.

**Overflow.** A query too long for the bar scrolls with a hidden scrollbar; the
edges with parts behind them fade, and the row lists them in `data-dc-more`
(`start`, `end`, `both`, or empty).

## The field it is edited in

The bar is the only place the query is edited. The parts stand in the field in
front of a box, where the next term is typed.

```
[Items ▾] [List ▾] [year ≥ 1988] | brick        |
                                   ^ Enter: [brick] joins the row
```

| Key | Does |
| --- | --- |
| Enter | ANDs the draft on to the query (`refineExpression`: added to each `OR` alternative; `-set:a` on `set:a` turns the term round) and empties the box. Lands at the end of the query wherever the box is |
| Escape | Gives up the draft |
| ← / → | Step the box past the parts |
| Backspace at the start | Lifts the part before the box |
| Delete at the end | Lifts the part after it |

**The results answer the draft as it is typed** — the query AND the draft, read
after `DRAFT_DELAY` (150ms) — including the rows, total, pager, type cards and
the counts in the type picker. Nothing reaches the URL until Enter, so history
holds committed queries only. Escape, or emptying the box by hand, returns to
the query's results at once.

- **The draft pages on its own**, from page one, and resets when it changes.
  Escape returns to the query's page.
- **An unfinished term reads as nothing** (`readDraft`): a field with an
  operator and no value (`status:`), or a lone `-`, is left out until it is a
  term. Enter still commits exactly what was typed. An unclosed quote runs to
  the end of the box.
- **Narrowing to a record found by the draft drops the draft.** Leaving a
  record out (⌥-press), and every other query change, keeps it.
- **No flash on commit.** The draft's results stay up until the committed
  query lands, so a router that writes the URL a tick later shows no
  intermediate state.

The shell context carries the draft for a view of your own: `draft`,
`liveQuery` (the query the results are read under; `query` when nothing is
typed), `drafting`, `commitDraft` and `abandonDraft`. A view running its own
query should read `liveQuery`. `useDraft` is the same as a composable, for a
host putting the header over results of its own.
