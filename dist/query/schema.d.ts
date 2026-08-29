import type { DomainSchema, EntitySchema, FacetDef, FacetState, FacetValue, ShellQuery, ShellQueryDefaults, SortDef, ViewKind } from '../types';
/**
 * Cards. On the home screen — where no entity is filtered to — that means a
 * card per item type rather than per record: what each type is, how many of it
 * there are, and its most recently updated few.
 */
export declare const DEFAULT_VIEW: ViewKind;
export declare const DEFAULT_SORT = "updated";
export declare function isViewKind(value: unknown): value is ViewKind;
/** The entity a key names, or `null` when it names none. */
export declare function findEntity(schema: DomainSchema, key: string | null | undefined): EntitySchema | null;
/**
 * The entity the query panel configures. With no entity selected there is
 * still one in focus — the schema's first, or whichever the host nominated —
 * so the panel and the home screen's search box have somewhere to go.
 */
export declare function focusEntity(schema: DomainSchema, defaults?: ShellQueryDefaults): EntitySchema;
/**
 * Sort options. Across every entity the metric columns have no single name, so
 * the metric sorts are labelled generically; inside one entity each takes that
 * entity's own column name.
 */
export declare function sortsFor(entity: EntitySchema | null): SortDef[];
export declare function findSort(entity: EntitySchema | null, key: string | undefined): SortDef;
/** The neutral value for a facet — the state in which it narrows nothing. */
export declare function emptyFacetValue(facet: FacetDef): FacetValue;
export declare function emptyFacetState(entity: EntitySchema | null): FacetState;
export declare function isFacetActive(value: FacetValue | undefined): boolean;
export declare function hasActiveFacets(facets: FacetState): boolean;
/**
 * True when nothing narrows the corpus: no entity chosen, no facets, no
 * expression. This is the home screen.
 */
export declare function isPristineQuery(query: ShellQuery): boolean;
/** True when an entity has been picked out of the whole corpus. */
export declare function isEntityScoped(query: ShellQuery): boolean;
/**
 * The query an empty URL means. By default that is the home screen: every
 * entity, nothing filtered, in the preview view. A host can land on a single
 * entity's list instead with `landing: 'entity'`.
 */
export declare function defaultQuery(schema: DomainSchema, defaults?: ShellQueryDefaults): ShellQuery;
/**
 * Drops facet values the entity does not declare and fills in the ones it
 * does. Called after every parse and on every entity change, so a stale or
 * hand-edited URL can never put the shell into a state its schema disallows.
 * With no entity selected there are no per-entity facets to keep.
 */
export declare function reconcileFacets(entity: EntitySchema | null, facets: FacetState): FacetState;
