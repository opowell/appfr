import type { FacetDef } from '../types';
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
    draft: string;
    /** What the option reads as: the term, or the field waiting for its value. */
    label: string;
    /** The facet's own words for it, where it has any. */
    hint?: string;
    /** Whether it is a whole term, rather than a field still wanting its value. */
    complete: boolean;
}
/**
 * The completions for `draft` against `facets`, in the schema's order. Empty
 * where the last word names no facet, or is already all a completion would
 * make it.
 */
export declare function completeDraft(draft: string, facets: readonly FacetDef[]): Completion[];
