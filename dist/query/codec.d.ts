import type { DomainSchema, ShellQuery, ShellQueryDefaults } from '../types';
/** Query-string keys the shell owns. Anything else in the URL is left alone. */
export declare const PARAM_ENTITY = "e";
export declare const PARAM_VIEW = "v";
export declare const PARAM_SORT = "s";
export declare const PARAM_DIR = "d";
export declare const PARAM_EXPR = "q";
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
