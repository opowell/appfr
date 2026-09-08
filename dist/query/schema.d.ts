import type { ColumnDef, DomainSchema, EntitySchema, FacetDef, FacetState, FacetValue, ShellQuery, ShellQueryDefaults, SortDef, ViewKind } from '../types';
/**
 * Cards. On the home screen — where no entity is filtered to — that means a
 * card per item type rather than per record: what each type is, how many of it
 * there are, and its most recently updated few.
 */
export declare const DEFAULT_VIEW: ViewKind;
export declare const DEFAULT_SORT = "updated";
export declare function isViewKind(value: unknown): value is ViewKind;
/**
 * What each view is called wherever one is offered as a choice — the header's
 * chooser and the query panel's row of them are naming the same six things,
 * and a view called `Cards` in one place and `cards` in the other would read
 * as two settings rather than one.
 */
export declare const VIEW_LABELS: Record<ViewKind, string>;
/**
 * The view actually drawn, given what the query asks for and what the host
 * offers. A URL naming a view a host has withheld falls back to the first on
 * offer, so a link into a restricted shell still lands somewhere it can draw.
 */
export declare function resolveView(asked: ViewKind, offered: ViewKind[] | undefined): ViewKind;
/** The entity a key names, or `null` when it names none. */
export declare function findEntity(schema: DomainSchema, key: string | null | undefined): EntitySchema | null;
/**
 * The entity the query panel configures. With no entity selected there is
 * still one in focus — the schema's first, or whichever the host nominated —
 * so the panel and the home screen's search box have somewhere to go.
 */
export declare function focusEntity(schema: DomainSchema, defaults?: ShellQueryDefaults): EntitySchema;
/**
 * The columns an ordering can be read out of: the entity's own where one is
 * filtered to, and the schema's across every entity — where no one type's
 * columns describe the rows, exactly as the table finds its headings.
 */
export declare function columnsForSort(entity: EntitySchema | null, schema?: DomainSchema | null): ColumnDef[];
/**
 * The sorts on offer: one per column that names a {@link ColumnDef.sort},
 * labelled with that column's own heading, in the order the schema declared
 * them. A column is what knows both what it holds and what ordering it means,
 * so the bar and the table headings are offering one list rather than two.
 *
 * An entity may state its own set instead, for an ordering no column shows.
 */
export declare function sortsFor(entity: EntitySchema | null, schema?: DomainSchema | null): SortDef[];
/**
 * The sort a key names.
 *
 * Falling back to the recency sort rather than to the first declared, because
 * the first column of a set is the identity and landing on a corpus ordered
 * A-to-Z says less than landing on what changed last. Where nothing is
 * offered at all — a type with no columns — the key stands on its own, so a
 * URL and a request still say something a source can act on.
 */
export declare function findSort(entity: EntitySchema | null, key: string | undefined, schema?: DomainSchema | null): SortDef;
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
 * True when the results are a card per *type* rather than per record — cards
 * with no entity filter, which is the home screen. Those cards run their own
 * per-entity queries, so the shell's single result set is not what is on
 * screen and nothing pages through it.
 */
export declare function isTypeCardsQuery(query: ShellQuery): boolean;
/**
 * How many pages of `limit` rows `total` rows come to. Always at least one:
 * an empty result set is one empty page, not none.
 */
export declare function countPages(total: number, limit: number): number;
/**
 * The query an empty URL means. By default that is the home screen: every
 * entity, nothing filtered, in the preview view. A host can land on a single
 * entity's list instead with `landing: 'entity'`.
 */
export declare function defaultQuery(schema: DomainSchema, defaults?: ShellQueryDefaults): ShellQuery;
/**
 * The query fields that decide *which* rows matched and in what order. A
 * change to any of them makes the page someone was on a position in a result
 * set that no longer exists, so the shell returns to the first page. `view` is
 * deliberately not among them: the same rows drawn another way are still the
 * same rows, and page 3 of them is still page 3.
 */
export declare const RESULT_FIELDS: readonly ["entity", "sort", "dir", "expr", "facets"];
/** True when a patch touches any of {@link RESULT_FIELDS}. */
export declare function changesResults(patch: Partial<ShellQuery>): boolean;
/**
 * Drops facet values the entity does not declare and fills in the ones it
 * does. Called after every parse and on every entity change, so a stale or
 * hand-edited URL can never put the shell into a state its schema disallows.
 * With no entity selected there are no per-entity facets to keep.
 */
export declare function reconcileFacets(entity: EntitySchema | null, facets: FacetState): FacetState;
