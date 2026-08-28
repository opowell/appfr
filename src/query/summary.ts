import type { EntitySchema, FacetDef, FacetValue, ShellQuery } from '../types'
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
}

/** The term id the entity filter uses, so it can be lifted like any other. */
export const ENTITY_TERM = 'entity'

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
  return terms
}

/**
 * The one-line summary shown in the header bar. An untouched query states what
 * it is showing and how, so the header is never blank and never implies a
 * filter that is not there.
 */
export function summarizeQuery(query: ShellQuery, entity: EntitySchema | null): string {
  if (isPristineQuery(query)) {
    const sort = findSort(entity, query.sort)
    return `everything · ${query.view} · ${sort.label}`
  }
  const parts = summaryTerms(query, entity).map((term) => term.label)
  const expr = query.expr.trim()
  if (expr) parts.push(`"${expr}"`)
  return parts.join(' · ')
}
