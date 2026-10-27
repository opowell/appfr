import type { EntitySchema, FacetDef, FacetValue } from '../types'
import type { FieldTerm, Term } from '../data/expression'
import {
  formatExpression,
  formatRange,
  isRangeTerm,
  parseExpression,
  rangeOf,
} from '../data/expression'
import { emptyFacetValue, isFacetActive } from './schema'

/**
 * Facets, read off and written into the expression.
 *
 * A facet holds no state of its own: what it is set to is the terms on its
 * field — `quantity:100..` for a range, `color=Red color=Blue` for two chips,
 * `failed:true` for a toggle. So the controls in the query panel and the query
 * someone types are one query, in one parameter of the address, and a range
 * typed by hand is the range the control shows.
 *
 * A facet's field is its key, lowercased as the parse lowercases every field.
 * Where the expression has alternatives, a facet is read off the first of them
 * and written into each, as a term typed on to the query is.
 */

/** The field a facet's terms are written on. */
export function facetField(facet: FacetDef): string {
  return facet.key.toLowerCase()
}

const COMPARISONS = new Set(['>', '>=', '<', '<='])

/**
 * Whether a term is one this facet reads and writes. A turned term never is:
 * `-color=Red` says which rows are out, which no chip says.
 */
function ownedBy(term: Term, facet: FacetDef): term is FieldTerm {
  if (term.kind !== 'field' || term.negated || term.field !== facetField(facet)) return false
  const naming = term.comparator === ':' || term.comparator === '='
  switch (facet.kind) {
    case 'range':
      return isRangeTerm(term) || COMPARISONS.has(term.comparator)
    case 'chips':
      return naming && !isRangeTerm(term) && optionOf(facet.options, term.value) !== undefined
    case 'toggle':
      return naming && isTrue(term.value)
  }
}

function optionOf(options: readonly string[], value: string): string | undefined {
  const wanted = value.toLowerCase()
  return options.find((option) => option.toLowerCase() === wanted)
}

function isTrue(value: string): boolean {
  const wanted = value.toLowerCase()
  return wanted === 'true' || wanted === 'yes'
}

/** What the facet is set to, as the terms on its field in the first alternative say. */
export function facetValue(expr: string, facet: FacetDef): FacetValue {
  const terms = (parseExpression(expr)[0] ?? []).filter((term) => ownedBy(term, facet))
  switch (facet.kind) {
    case 'range': {
      let min: number | null = null
      let max: number | null = null
      for (const term of terms) {
        const range = rangeOf(term.value)
        const bound = Number(term.value)
        if (range) {
          if (range.min !== null) min = range.min
          if (range.max !== null) max = range.max
        } else if (Number.isFinite(bound)) {
          if (term.comparator.startsWith('>')) min = bound
          else max = bound
        }
      }
      return { kind: 'range', min, max }
    }
    case 'chips': {
      const named = new Set(terms.map((term) => optionOf(facet.options, term.value)))
      return { kind: 'chips', selected: facet.options.filter((option) => named.has(option)) }
    }
    case 'toggle':
      return { kind: 'toggle', on: terms.length > 0 }
  }
}

/** The terms that set a facet to `value`: none for a value that narrows nothing. */
function termsFor(facet: FacetDef, value: FacetValue): FieldTerm[] {
  const field = facetField(facet)
  switch (value.kind) {
    case 'range':
      return value.min === null && value.max === null
        ? []
        : [{ kind: 'field', field, comparator: ':', value: formatRange(value) }]
    case 'chips':
      // `=` rather than `:`: a chip is the whole value, and `color:Red` would
      // take in Dark Red as well.
      return value.selected.map((option) => ({ kind: 'field', field, comparator: '=', value: option }))
    case 'toggle':
      return value.on ? [{ kind: 'field', field, comparator: ':', value: 'true' }] : []
  }
}

/**
 * The expression with the facet set to `value`: every term the facet reads
 * taken out, and the terms for `value` put in at the end — of each
 * alternative, where there are several.
 */
export function withFacetValue(expr: string, facet: FacetDef, value: FacetValue): string {
  const added = termsFor(facet, value)
  const groups = parseExpression(expr)
  const kept = (groups.length ? groups : [[]]).map((group) => [
    ...group.filter((term) => !ownedBy(term, facet)),
    ...added,
  ])
  return formatExpression(kept)
}

/** The expression with the facet set to narrow nothing. */
export function withoutFacet(expr: string, facet: FacetDef): string {
  return withFacetValue(expr, facet, emptyFacetValue(facet))
}

/** Whether any of the entity's facets narrows the results under this expression. */
export function hasActiveFacets(expr: string, entity: EntitySchema | null): boolean {
  return (entity?.facets ?? []).some((facet) => isFacetActive(facetValue(expr, facet)))
}
