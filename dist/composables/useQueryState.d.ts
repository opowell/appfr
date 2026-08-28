import type { ComputedRef, MaybeRefOrGetter } from 'vue';
import type { DomainSchema, EntitySchema, FacetValue, ShellQuery, ShellQueryDefaults, SortDef, ViewKind } from '../types';
import type { RouteAdapter } from '../routing/adapter';
import type { SummaryTerm } from '../query/summary';
export type NavigationMode = 'push' | 'replace';
export interface UseQueryStateOptions {
    schema: MaybeRefOrGetter<DomainSchema>;
    adapter: RouteAdapter;
    defaults?: MaybeRefOrGetter<ShellQueryDefaults | undefined>;
    /**
     * How a change to the entity, view, sort or committed expression navigates.
     * These are destinations someone may want to come back to, so they push by
     * default.
     */
    navigationMode?: MaybeRefOrGetter<NavigationMode>;
    /**
     * How an individual facet edit navigates. Adjusting facets is exploratory
     * and one history entry per chip makes the back button useless, so these
     * replace by default.
     */
    facetNavigationMode?: MaybeRefOrGetter<NavigationMode>;
}
export interface QueryState {
    /** The live query, derived from the URL. */
    query: ComputedRef<ShellQuery>;
    /** The entity the query is scoped to, or `null` for the whole corpus. */
    entity: ComputedRef<EntitySchema | null>;
    /**
     * The entity the panel configures. Equals {@link QueryState.entity} when one
     * is selected, and the host's nominated entity otherwise, so the home
     * screen's search box has somewhere to go.
     */
    focus: ComputedRef<EntitySchema>;
    sort: ComputedRef<SortDef>;
    sorts: ComputedRef<SortDef[]>;
    /** One-line description of the query, as shown in the header. */
    summary: ComputedRef<string>;
    /** The individually removable terms behind that summary. */
    terms: ComputedRef<SummaryTerm[]>;
    /** True on the home screen: no entity, no facets, no expression. */
    isPristine: ComputedRef<boolean>;
    /** True when no entity filter is applied — every entity is in the results. */
    isEverything: ComputedRef<boolean>;
    hasFacets: ComputedRef<boolean>;
    /** Filters to one entity, or back to the whole corpus with `null`. */
    setEntity(key: string | null): void;
    /** Clears the entity filter — back to everything. */
    clearEntity(): void;
    setView(view: ViewKind): void;
    setSort(key: string): void;
    toggleDirection(): void;
    setExpression(expr: string): void;
    setFacet(key: string, value: FacetValue): void;
    toggleChip(key: string, option: string): void;
    setRange(key: string, min: number | null, max: number | null): void;
    toggleFlag(key: string): void;
    removeTerm(term: SummaryTerm): void;
    /** Clears the entity filter, the expression and every facet. */
    clearFilters(): void;
    /** Returns everything to the schema's defaults — the home screen. */
    reset(): void;
    /** The `href` a given query change would navigate to. */
    hrefFor(patch: Partial<ShellQuery>): string;
}
/**
 * Holds the shell's query in the URL and nowhere else.
 *
 * The query is a `computed` over the route's search string, so the address bar
 * is the single source of truth: a mutation serialises and navigates, and the
 * new state arrives back through the same derivation. Back, forward, reload
 * and a pasted link all behave identically because they are the same path.
 */
export declare function useQueryState(options: UseQueryStateOptions): QueryState;
