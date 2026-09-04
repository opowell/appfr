import type { DomainSchema, EntitySchema, FacetDef, FacetValue, ShellQuery } from '../types'
import { formatTerm, parseExpression } from '../data/expression'
import { findSort, isFacetActive, isPristineQuery } from './schema'

/** One removable term in the header's query summary. */
export interface SummaryTerm {
  /** Stable identity for list rendering and for the remove handler. */
  id: string
  label: string
  /** The facet this term came from, or `'entity'` for the entity filter. */
  facetKey: string
  /** For chips terms, the single option this term stands for. */
  option?: string
  /**
   * For expression terms, where in the expression the term sits: which `OR`
   * group, and where in that group. That pair is its address — the text of a
   * term is not unique, and two identical words in different alternatives are
   * two separate parts.
   */
  group?: number
  index?: number
}

/** The term id the entity filter uses, so it can be lifted like any other. */
export const ENTITY_TERM = 'entity'

/** The facet key the expression's own parts carry. */
export const EXPRESSION_TERM = 'expr'

function describeFacet(facet: FacetDef, value: FacetValue): SummaryTerm[] {
  const name = facet.label.toLowerCase()
  switch (value.kind) {
    case 'chips':
      return value.selected.map((option) => ({
        id: `${facet.key}:${option}`,
        label: `${name}:${option}`,
        facetKey: facet.key,
        option,
      }))
    case 'range': {
      if (value.min === null && value.max === null) return []
      const low = value.min ?? ''
      const high = value.max ?? ''
      return [{ id: facet.key, label: `${name}:${low}..${high}`, facetKey: facet.key }]
    }
    case 'toggle':
      return value.on ? [{ id: facet.key, label: `${name}:on`, facetKey: facet.key }] : []
  }
}

/**
 * The terms currently narrowing the corpus, in schema order.
 *
 * Choosing an entity is the first of them: logs and settings are records like
 * any other, so what excludes them is an ordinary, liftable filter rather than
 * a mode the shell is in.
 */
export function summaryTerms(query: ShellQuery, entity: EntitySchema | null): SummaryTerm[] {
  const terms: SummaryTerm[] = []
  if (entity) {
    terms.push({
      id: ENTITY_TERM,
      label: `entity:${entity.key}`,
      facetKey: ENTITY_TERM,
    })
  }
  for (const facet of entity?.facets ?? []) {
    const value = query.facets[facet.key]
    if (value && isFacetActive(value)) terms.push(...describeFacet(facet, value))
  }
  // The expression is not one term but as many as it was written with: each is
  // a constraint of its own, and each can be lifted on its own.
  parseExpression(query.expr).forEach((group, at) => {
    group.forEach((term, index) => {
      terms.push({
        id: `${EXPRESSION_TERM}:${at}:${index}`,
        label: formatTerm(term),
        facetKey: EXPRESSION_TERM,
        group: at,
        index,
      })
    })
  })
  return terms
}

/**
 * The one-line summary shown in the header bar. An untouched query states what
 * it is showing and how, so the header is never blank and never implies a
 * filter that is not there.
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
