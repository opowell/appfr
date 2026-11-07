import type { ColumnDef, ShellRow } from '../types'
import { isRangeTerm, parseExpression } from '../data/expression'
import { cellValue } from './columns'

/**
 * The fields the query holds to one value on every row it keeps: each
 * `field=value` it ANDs on, unnegated and not a range. A query of several
 * `OR`ed parts pins nothing, as each part may keep another value.
 */
export function pinnedFields(expr: string): Set<string> {
  const groups = parseExpression(expr)
  if (groups.length !== 1) return new Set()
  return new Set(
    groups[0]!.flatMap((term) =>
      term.kind === 'field' && term.comparator === '=' && !term.negated && !isRangeTerm(term)
        ? [term.field.toLowerCase()]
        : [],
    ),
  )
}

/**
 * The columns less those the query has narrowed to one value — `category=Poetry`
 * leaves every row's Category the same, and a column saying so on every line
 * says nothing the bar does not. A column of lists stays: `tags=teacher` keeps
 * rows whose tags are each their own. So does the identity, which names each
 * row whatever the query asks of it.
 */
export function withoutPinned(columns: ColumnDef[], expr: string, rows: ShellRow[]): ColumnDef[] {
  const pinned = pinnedFields(expr)
  if (!pinned.size) return columns
  return columns.filter((column) => {
    const field = (column.key ?? column.field)?.toLowerCase()
    if (field === undefined || !pinned.has(field) || column.role === 'identity') return true
    return rows.some((row) => Array.isArray(cellValue(column, row)))
  })
}
