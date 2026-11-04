import type { FacetDef } from '../types'
import { formatTerm } from '../data/expression'
import { facetField } from './facetTerms'

/**
 * What the search box offers to finish the word being typed: the listed type's
 * facets, and then the values of the one that is named.
 *
 * The bar is the one place the query is written, so a facet is set by typing
 * its term — and a term nobody knows is there is one nobody types. These are
 * the terms the schema already knows, offered as the draft is written: with
 * nothing typed, every facet; with part of a name, the facets it could be;
 * with `field:`, that facet's values.
 *
 * Only the last word is completed. Everything typed before it stays as it was,
 * and picking a completion puts it in the box rather than on the query: the
 * results already answer the draft, so what a value narrows to is on screen
 * before Enter commits it.
 *
 * Pure, so what is offered is tested without a browser.
 */

export interface Completion {
  /** The whole draft with the completion put in — what the box holds once it is picked. */
  draft: string
  /** What the option reads as: the term, or the field waiting for its value. */
  label: string
  /** The facet's own words for it, where it has any. */
  hint?: string
  /** Whether it is a whole term, rather than a field still wanting its value. */
  complete: boolean
}

/** How a field written by hand is compared with a facet's key or label. */
const written = (name: string) => name.toLowerCase().replace(/\s+/g, '')

/**
 * The word being typed: the run at the end of the draft with no space in it,
 * a quoted value counting as one word however many spaces it holds — closed or
 * still open.
 */
const LAST_WORD = /(?:[^\s"]|"[^"]*"?)*$/

/** `-field:value`, `field=value` — a field, the way the parse reads one. */
const FIELD_WORD = /^(-?)([^:=<>"\s-][^:=<>"\s]*)([:=])(.*)$/

/** The most values of a chips facet named in its hint before it says how many more. */
const HINTED_OPTIONS = 4

/** The facet a field written by hand names: by key, or by its label run together. */
function facetNamed(facets: readonly FacetDef[], field: string): FacetDef | undefined {
  const wanted = written(field)
  return facets.find((facet) => facetField(facet) === wanted || written(facet.label) === wanted)
}

/** What a facet takes, said in the line beside its name. */
function facetHint(facet: FacetDef): string {
  switch (facet.kind) {
    case 'toggle':
      return facet.text
    case 'range':
      return `${facet.min}..${facet.max}`
    case 'chips': {
      const shown = facet.options.slice(0, HINTED_OPTIONS).join(' · ')
      const rest = facet.options.length - HINTED_OPTIONS
      return rest > 0 ? `${shown} · +${rest}` : shown
    }
  }
}

/** The values a facet offers once it is named, and what each says. */
function facetValues(facet: FacetDef): { value: string; hint?: string }[] {
  switch (facet.kind) {
    case 'toggle':
      return [{ value: 'true', hint: facet.text }, { value: 'false' }]
    case 'chips':
      return facet.options.map((value) => ({ value }))
    case 'range':
      // A number is typed, not picked: nothing to list. The facet's own entry
      // already said how far it runs.
      return []
  }
}

/** Whether `name` could be what `typed` is the start of — or has in it, for a word typed from its middle. */
function couldBe(name: string, typed: string): boolean {
  return written(name).includes(written(typed))
}

/**
 * The completions for `draft` against `facets`, in the schema's order. Empty
 * where the last word names no facet, or is already all a completion would
 * make it.
 */
export function completeDraft(draft: string, facets: readonly FacetDef[]): Completion[] {
  const word = LAST_WORD.exec(draft)?.[0] ?? ''
  const before = draft.slice(0, draft.length - word.length)
  const offers: Completion[] = []

  const named = FIELD_WORD.exec(word)
  if (named) {
    const [, sign, field, comparator, typed] = named as unknown as [string, string, string, string, string]
    const facet = facetNamed(facets, field)
    if (!facet) return []
    const wanted = typed.replace(/"/g, '').toLowerCase()
    for (const { value, hint } of facetValues(facet)) {
      if (!value.toLowerCase().includes(wanted)) continue
      const term = formatTerm({
        kind: 'field',
        field: facetField(facet),
        comparator: comparator as ':' | '=',
        value,
        ...(sign ? { negated: true } : {}),
      })
      offers.push({ draft: before + term, label: term, ...(hint ? { hint } : {}), complete: true })
    }
  } else {
    // A word with an operator of another kind in it — `rank>5` — is a term
    // being written by someone who knows the field, not a name to finish.
    if (/[<>"]/.test(word)) return []
    const sign = word.startsWith('-') ? '-' : ''
    const typed = word.slice(sign.length)
    for (const facet of facets) {
      if (typed && !couldBe(facet.key, typed) && !couldBe(facet.label, typed)) continue
      const label = `${sign}${facetField(facet)}:`
      offers.push({ draft: before + label, label, hint: facetHint(facet), complete: false })
    }
  }

  return offers.filter((offer) => offer.draft !== draft)
}
