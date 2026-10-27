import type { DomainSchema, EntitySchema, ShellQuery } from '../types'
import type { Term } from '../data/expression'
import {
  compactShortcuts,
  fieldHeading,
  formatTerm,
  isRangeTerm,
  parseExpression,
  rangeOf,
} from '../data/expression'
import { findSort, isPristineQuery } from './schema'

/** One removable term in the header's query summary. */
export interface SummaryTerm {
  /** Stable identity for list rendering and for the remove handler. */
  id: string
  label: string
  /** {@link EXPRESSION_TERM} for a term of the expression, or {@link ENTITY_TERM} for the entity filter. */
  facetKey: string
  /**
   * For expression terms, where in the expression the term sits: which `OR`
   * group, and where in that group. That pair is its address — the text of a
   * term is not unique, and two identical words in different alternatives are
   * two separate parts.
   */
  group?: number
  index?: number
  /**
   * For an expression term written as `field:value`, the two halves of it.
   *
   * The label is what the term *says*; these are what it names, which is what
   * reading a term back needs — a value that is a record's id says nothing on
   * its own, and only the field it sits under says which type it belongs to.
   */
  field?: string
  value?: string
  /** The term was written with a leading `-`: it says which rows are *out*. */
  negated?: boolean
  /**
   * For an expression term, the term as the address and the search box write
   * it — `p:..5` where the label says `price ≤ 5`. What a reader types to say
   * it again, so it is what the pill says on hover.
   */
  address?: string
}

/** The term id the entity filter uses, so it can be lifted like any other. */
export const ENTITY_TERM = 'entity'

/** The facet key the expression's own parts carry. */
export const EXPRESSION_TERM = 'expr'

const SYMBOLS: Partial<Record<string, string>> = { '>=': '≥', '<=': '≤', '>': '>', '<': '<' }

/**
 * A term as a pill says it: the field under the name it has on screen, and a
 * range or a comparison in the signs it is read in — `price ≤ 5`,
 * `1 ≤ quantity ≤ 50`. A join key, a bare word and a field the entity does
 * not declare are said as they are written.
 */
function describeTerm(
  term: Term,
  entity: EntitySchema | null,
  schema: DomainSchema | null,
): string {
  if (term.kind !== 'field') return formatTerm(term)
  const heading = fieldHeading(term.field, entity, schema)
  if (heading === undefined) return formatTerm(term)
  const name = heading.toLowerCase()
  const sign = term.negated ? '-' : ''
  const range = isRangeTerm(term) ? rangeOf(term.value) : null
  if (range) {
    const said =
      range.min !== null && range.max !== null
        ? `${range.min} ≤ ${name} ≤ ${range.max}`
        : range.max !== null
          ? `${name} ≤ ${range.max}`
          : `${name} ≥ ${range.min}`
    return sign + said
  }
  const symbol = SYMBOLS[term.comparator]
  if (symbol) return `${sign}${name} ${symbol} ${term.value}`
  return formatTerm({ ...term, field: name })
}

/**
 * The terms currently narrowing the corpus, in schema order.
 *
 * Choosing an entity is the first of them: logs and settings are records like
 * any other, so what excludes them is an ordinary, liftable filter rather than
 * a mode the shell is in.
 */
export function summaryTerms(
  query: ShellQuery,
  entity: EntitySchema | null,
  /** For which fields are join keys, which keep their own names. */
  schema: DomainSchema | null = null,
): SummaryTerm[] {
  const terms: SummaryTerm[] = []
  if (entity) {
    terms.push({
      id: ENTITY_TERM,
      label: `entity:${entity.key}`,
      facetKey: ENTITY_TERM,
    })
  }
  // The expression is not one term but as many as it was written with: each is
  // a constraint of its own, and each can be lifted on its own. The facets are
  // among them, being terms of it.
  parseExpression(query.expr).forEach((group, at) => {
    group.forEach((term, index) => {
      terms.push({
        id: `${EXPRESSION_TERM}:${at}:${index}`,
        label: describeTerm(term, entity, schema),
        address: compactShortcuts(formatTerm(term), entity, schema),
        facetKey: EXPRESSION_TERM,
        group: at,
        index,
        ...(term.kind === 'field' ? { field: term.field, value: term.value } : {}),
        ...(term.negated ? { negated: true } : {}),
      })
    })
  })
  return terms
}

/**
 * The query as one line of prose. An untouched query still states what it is
 * showing and how, so nothing that says this is ever blank and none of it
 * implies a filter that is not there.
 *
 * The header says the scope with a control of its own now, so the bar shows
 * the tail of this beside it and keeps the whole sentence as its title. Said
 * in full where there is room for a sentence: under an empty result.
 */
export function summarizeQuery(
  query: ShellQuery,
  entity: EntitySchema | null,
  /** For the sort's own name, which on the home screen the schema's columns hold. */
  schema: DomainSchema | null = null,
): string {
  if (isPristineQuery(query)) {
    const sort = findSort(entity, query.sort, schema)
    return `everything · ${query.view} · ${sort.label}`
  }
  // The expression goes in whole, as written and quoted, rather than as the
  // parts `summaryTerms` breaks it into: this is one line of prose about the
  // query, and `release OR recall` said as two terms is a different query.
  const parts = summaryTerms(query, entity)
    .filter((term) => term.facetKey !== EXPRESSION_TERM)
    .map((term) => term.label)
  const expr = query.expr.trim()
  if (expr) parts.push(`"${expr}"`)
  return parts.join(' · ')
}
