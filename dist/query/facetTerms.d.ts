import type { EntitySchema, FacetDef, FacetValue } from '../types';
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
export declare function facetField(facet: FacetDef): string;
/** What the facet is set to, as the terms on its field in the first alternative say. */
export declare function facetValue(expr: string, facet: FacetDef): FacetValue;
/**
 * The expression with the facet set to `value`: every term the facet reads
 * taken out, and the terms for `value` put in at the end — of each
 * alternative, where there are several.
 */
export declare function withFacetValue(expr: string, facet: FacetDef, value: FacetValue): string;
/** The expression with the facet set to narrow nothing. */
export declare function withoutFacet(expr: string, facet: FacetDef): string;
/** Whether any of the entity's facets narrows the results under this expression. */
export declare function hasActiveFacets(expr: string, entity: EntitySchema | null): boolean;
