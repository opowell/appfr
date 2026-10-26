import type { DomainSchema, ShellQuery, ShellQueryDefaults } from '../types';
/** Query-string keys the shell owns. Anything else in the URL is left alone. */
export declare const PARAM_ENTITY = "e";
export declare const PARAM_VIEW = "v";
export declare const PARAM_SORT = "s";
export declare const PARAM_DIR = "d";
export declare const PARAM_EXPR = "q";
export declare const PARAM_PAGE = "p";
export declare const FACET_PREFIX = "f_";
/**
 * Value of `e` meaning "every entity". Only needed when the host lands on an
 * entity by default, since then the absence of `e` already means that entity
 * and the whole corpus has to be spelled out.
 */
export declare const ENTITY_ALL = "*";
/**
 * Reads a {@link ShellQuery} out of a URL search string. Unknown entities,
 * views, sorts and facet values fall back to the schema's defaults, so an
 * arbitrary URL can never produce an unrenderable state.
 */
export declare function parseQuery(search: string, schema: DomainSchema, defaults?: ShellQueryDefaults): ShellQuery;
/**
 * Writes a query back into a search string, dropping anything at its default
 * and preserving every parameter the shell does not own — a host can keep its
 * own state in the same URL without the shell trampling it.
 */
export declare function serializeQuery(query: ShellQuery, schema: DomainSchema, defaults?: ShellQueryDefaults, currentSearch?: string): string;
/**
 * A route's query as the router hands it over: a repeated parameter is a
 * list, and a parameter written with no value — `?flag` — is `null`. The
 * shape of vue-router's `route.query`, without depending on it.
 */
export type RouteQuery = Record<string, string | null | (string | null)[] | undefined>;
/**
 * A router's query object as the search string {@link parseQuery} reads.
 *
 * For code that has `route.query` in hand rather than the adapter's `search`
 * — a redirect, a guard, a page beside the shell that reads its query. Every
 * value of a repeated parameter is kept, in order; a `null` or `undefined` one
 * says nothing and is left out.
 *
 * Written the way {@link serializeQuery} writes, leading `?` and all — the
 * form a {@link RouteAdapter}'s `search` takes. The router may spell a value
 * differently, and that does not matter: any spelling reads back the same, so
 * a string from here, one from the adapter and one from `URLSearchParams` are
 * one query to the codec.
 */
export declare function searchFromQuery(routeQuery: RouteQuery): string;
/**
 * The expression out of a search string — the `q` parameter, decoded, or `''`
 * where there is none.
 *
 * Read without a schema, for code that only needs to know which records a
 * URL names ({@link recordsIn}) and has no schema yet, or none it wants to
 * parse the rest against. Exactly the `expr` {@link parseQuery} reads out of
 * the same search, by the same decoding — including the last of a repeated
 * parameter winning — so the two never disagree about what the query says.
 */
export declare function readExpression(search: string): string;
