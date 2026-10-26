import type {
  ColumnDef,
  EntitySchema,
  FacetState,
  QueryRequest,
  QueryResult,
  ShellRow,
} from '../types'
import { columnsForSort, findSort } from '../query/schema'
import { cellValue } from '../query/columns'
import { matchesExpression, parseExpression } from './expression'

/**
 * A query, applied to rows that are already in memory: the facets, the
 * expression, the sort and the page — the whole of what a source does, for a
 * source whose rows are an array.
 *
 * Two sources are made of it. The mock generates its rows and the memory
 * source is handed them, and the two differ in exactly the two places
 * {@link ApplyRules} names; everything else is this one loop, so the
 * expression language and the facet semantics behave in either exactly as
 * they do everywhere else.
 */

/** Applies the facet state to a row. Neutral facets never exclude anything. */
export function matchesFacets(row: ShellRow, facets: FacetState): boolean {
  for (const [key, value] of Object.entries(facets)) {
    const actual = row.fields[key]
    switch (value.kind) {
      case 'chips': {
        if (!value.selected.length) break
        // The chips of one facet are an OR, so a row holding several values is
        // in the set when any one of them is selected.
        if (Array.isArray(actual)) {
          if (!actual.some((entry) => value.selected.includes(String(entry)))) return false
          break
        }
        if (typeof actual !== 'string' || !value.selected.includes(actual)) return false
        break
      }
      case 'range': {
        if (value.min === null && value.max === null) break
        const numeric = typeof actual === 'number' ? actual : Number(actual)
        if (!Number.isFinite(numeric)) return false
        if (value.min !== null && numeric < value.min) return false
        if (value.max !== null && numeric > value.max) return false
        break
      }
      case 'toggle': {
        if (!value.on) break
        if (actual !== true) return false
        break
      }
    }
  }
  return true
}

/** Whether the column says it holds a date — by kind, or by being the recency one. */
const isDated = (column: ColumnDef): boolean =>
  column.kind === 'date' || column.role === 'updated'

/**
 * Orders rows by the column a sort key belongs to.
 *
 * How to compare comes from what the column *says* it holds rather than from
 * what its values look like: `Date.parse` will read "Firmware release notes ·
 * rev 2" as a date in February 2001, so a sniffing comparator sorts a corpus
 * of names into nonsense. Numbers descend, dates run newest first, and text
 * goes Z→A so that reversing the direction reads A→Z.
 */
function comparatorFor(column: ColumnDef | undefined): (a: ShellRow, b: ShellRow) => number {
  if (!column) return () => 0

  const kind = column.kind ?? 'text'
  const numeric = kind === 'number' || column.role === 'metric'
  const dated = isDated(column)

  return (a: ShellRow, b: ShellRow): number => {
    const left = cellValue(column, a)
    const right = cellValue(column, b)

    if (numeric) return Number(right ?? 0) - Number(left ?? 0)
    if (dated) return Date.parse(String(right ?? '')) - Date.parse(String(left ?? ''))
    return String(right ?? '').localeCompare(String(left ?? ''))
  }
}

/**
 * A row the sort says nothing about — a date column holding no date: never
 * crawled, never run, `''` where nothing says.
 *
 * Only dates have this. A blank name still compares, and a metric of `0` is a
 * real value that sorts first; but a date that does not parse is `NaN`, which
 * compares as neither before nor after anything and leaves the order of the
 * rows around it to chance.
 */
function isUndated(row: ShellRow, column: ColumnDef | undefined): boolean {
  if (!column || !isDated(column)) return false
  return !Number.isFinite(Date.parse(String(cellValue(column, row) ?? '')))
}

/** Where the two in-memory sources part ways. */
export interface ApplyRules {
  /**
   * Holds rows with no date under a date sort out of the sort and appends
   * them, so they stay at the bottom in *both* directions. Reversing for
   * `asc` would otherwise float every "never crawled" host to the top, where
   * it pushes the actual answers off the first screen.
   */
  undatedLast: boolean
  /** Reads a `limit` of 0 as no limit, the way the shell's own sink does. */
  zeroIsAll: boolean
}

/**
 * The one page of `rowsOf`'s rows the request asks for, with the count of
 * everything that matched.
 *
 * No entity selected means the whole corpus: every entity of the schema, in
 * the schema's order. Facets belong to an entity, so they only apply when one
 * is selected. The schema goes to {@link matchesExpression} as well, which
 * is what lets {@link DomainSchema.strictScopes} reach a source built on this
 * — and changes nothing for a schema that does not set it.
 */
export function applyQuery(
  { query, schema, entity, limit, offset }: QueryRequest,
  rowsOf: (entity: EntitySchema) => readonly ShellRow[],
  rules: ApplyRules,
): QueryResult {
  const expression = parseExpression(query.expr)

  // Logs and settings are entities like any other, so they are in the whole
  // corpus until a filter says not.
  const scope = entity ? [entity] : schema.entities
  let population = 0
  const matched: ShellRow[] = []

  for (const candidate of scope) {
    for (const row of rowsOf(candidate)) {
      population += 1
      const passesFacets = entity ? matchesFacets(row, query.facets) : true
      if (passesFacets && matchesExpression(expression, row, candidate, schema)) matched.push(row)
    }
  }

  /*
   * The columns of the current scope, which is where the sorts live: one per
   * column that names a `sort`. The set as declared rather than as the table
   * renders it — that is what `findSort` looked at, so a sort can never
   * resolve to a key whose column has been filtered out from under it.
   */
  const sort = findSort(entity, query.sort, schema)
  const column = columnsForSort(entity, schema).find((candidate) => candidate.sort === sort.key)

  const ranked = rules.undatedLast ? matched.filter((row) => !isUndated(row, column)) : matched
  const unranked = rules.undatedLast ? matched.filter((row) => isUndated(row, column)) : []
  ranked.sort(comparatorFor(column))
  if (query.dir === 'asc') ranked.reverse()
  const sorted = unranked.length ? [...ranked, ...unranked] : ranked

  return {
    // One page out of the middle. `total` stays the whole match, which is what
    // the shell counts pages with.
    rows:
      rules.zeroIsAll && limit <= 0 ? sorted.slice(offset) : sorted.slice(offset, offset + limit),
    total: matched.length,
    unfiltered: matched.length === population,
  }
}
