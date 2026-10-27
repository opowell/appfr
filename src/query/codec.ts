import type { DomainSchema, EntitySchema, ShellQuery, ShellQueryDefaults, SortDef } from '../types'
import { columnShortcut, compactShortcuts, expandShortcuts } from '../data/expression'
import { defaultQuery, defaultViewFor, findEntity, findSort, isViewKind, sortsFor } from './schema'

/** Query-string keys the shell owns. Anything else in the URL is left alone. */
export const PARAM_ENTITY = 'e'
export const PARAM_VIEW = 'v'
export const PARAM_SORT = 's'
export const PARAM_DIR = 'd'
export const PARAM_EXPR = 'q'
export const PARAM_PAGE = 'p'

/**
 * Value of `e` meaning "every entity". Only needed when the host lands on an
 * entity by default, since then the absence of `e` already means that entity
 * and the whole corpus has to be spelled out.
 */
export const ENTITY_ALL = '*'

const SCALAR_PARAMS = [
  PARAM_ENTITY,
  PARAM_VIEW,
  PARAM_SORT,
  PARAM_DIR,
  PARAM_EXPR,
  PARAM_PAGE,
] as const

/**
 * Characters `encodeURIComponent` escapes that are safe to leave literal in a
 * query value. Keeping them readable matters here: the URL is the primary
 * record of a query and people paste it to each other. `=` among them, which
 * only the first of in a pair separates the name from the value — the rest
 * are the `color=Red` a chip writes.
 */
const READABLE: Array<[RegExp, string]> = [
  [/%3D/g, '='],
  [/%2C/g, ','],
  [/%3A/g, ':'],
  [/%2F/g, '/'],
  [/%40/g, '@'],
  [/%2A/g, '*'],
  [/%24/g, '$'],
  [/%28/g, '('],
  [/%29/g, ')'],
  [/%21/g, '!'],
  [/%27/g, "'"],
  [/%20/g, '+'],
]

function encodeValue(raw: string): string {
  let out = encodeURIComponent(raw)
  for (const [pattern, literal] of READABLE) out = out.replace(pattern, literal)
  return out
}

function decodeValue(raw: string): string {
  try {
    return decodeURIComponent(raw.replace(/\+/g, ' '))
  } catch {
    // A hand-mangled escape sequence should degrade to the literal text
    // rather than throw and blank the whole query.
    return raw.replace(/\+/g, ' ')
  }
}

/** Splits a search string into ordered `[key, value]` pairs. */
function parsePairs(search: string): Array<[string, string]> {
  const body = search.replace(/^[?]/, '')
  if (!body) return []
  const pairs: Array<[string, string]> = []
  for (const chunk of body.split('&')) {
    if (!chunk) continue
    const eq = chunk.indexOf('=')
    const key = eq === -1 ? chunk : chunk.slice(0, eq)
    const value = eq === -1 ? '' : chunk.slice(eq + 1)
    pairs.push([decodeValue(key), value])
  }
  return pairs
}

function isOwnedKey(key: string): boolean {
  return (SCALAR_PARAMS as readonly string[]).includes(key)
}

/* ------------------------------------------------------------ shortcuts */

/*
 * The address says a type, a sort and a column by its initials wherever those
 * are its own — `e=si&s=p&q=p:..5` rather than
 * `e=inventories&s=priceValue&q=pricevalue:..5` — so the URL reads as what was
 * typed, and is short enough to read at all. The query the shell holds is in
 * keys throughout; only the address is shortened, and reading one takes keys
 * and shortcuts alike, so a link written either way goes where it says.
 *
 * Initials are the first letter of each word of the label, the way a column's
 * shortcut is made (see `columnShortcut`). Where two share them, the first
 * declared has them and the other is written by its key; and initials that are
 * some other one's key are nobody's, so a key always means what it says.
 */

/** Of `items`, the first whose initials are `shortcut`, unless a key is that already. */
function initialsOwner<T extends { key: string; label: string }>(
  items: readonly T[],
  shortcut: string,
): T | undefined {
  if (!shortcut || items.some((item) => item.key === shortcut)) return undefined
  return items.find((item) => columnShortcut(item.label) === shortcut)
}

/** What the address calls an entity: its initials where they are its own, its key otherwise. */
export function entityAddress(entity: EntitySchema, schema: DomainSchema): string {
  const shortcut = columnShortcut(entity.label)
  return initialsOwner(schema.entities, shortcut)?.key === entity.key ? shortcut : entity.key
}

/** The entity an address names, by key or by {@link entityAddress}'s shortcut. */
export function findEntityByAddress(
  schema: DomainSchema,
  address: string | null | undefined,
): EntitySchema | null {
  if (!address) return null
  return findEntity(schema, address) ?? initialsOwner(schema.entities, address) ?? null
}

/** What the address calls a sort among the ones on offer, on the same rule. */
export function sortAddress(sort: SortDef, sorts: readonly SortDef[]): string {
  const shortcut = columnShortcut(sort.label)
  return initialsOwner(sorts, shortcut)?.key === sort.key ? shortcut : sort.key
}

/** The sort key an address names among the ones on offer, or what it said where none. */
function sortKeyOf(address: string, sorts: readonly SortDef[]): string {
  if (sorts.some((sort) => sort.key === address)) return address
  return initialsOwner(sorts, address)?.key ?? address
}

/**
 * Reads a {@link ShellQuery} out of a URL search string. Unknown entities,
 * views, sorts and facet values fall back to the schema's defaults, so an
 * arbitrary URL can never produce an unrenderable state.
 */
export function parseQuery(
  search: string,
  schema: DomainSchema,
  defaults: ShellQueryDefaults = {},
): ShellQuery {
  const base = defaultQuery(schema, defaults)
  const params = new Map(parsePairs(search))

  // No `e` means no entity filter: the whole corpus, which is the home screen.
  // An `e` naming an entity the schema does not have falls back the same way.
  const entityParam = params.get(PARAM_ENTITY)
  const entityKey = entityParam === undefined ? base.entity : decodeValue(entityParam)
  const entity = entityKey === ENTITY_ALL ? null : findEntityByAddress(schema, entityKey)

  const viewParam = params.get(PARAM_VIEW)
  const view =
    viewParam && isViewKind(decodeValue(viewParam))
      ? decodeValue(viewParam)
      : defaultViewFor(entity?.key ?? null, defaults)

  const sortParam = params.get(PARAM_SORT)
  const sort = findSort(
    entity,
    sortParam ? sortKeyOf(decodeValue(sortParam), sortsFor(entity, schema)) : defaults.sort,
    schema,
  )

  const dirParam = params.get(PARAM_DIR)
  const dir = dirParam ? (decodeValue(dirParam) === 'asc' ? 'asc' : 'desc') : base.dir

  const exprParam = params.get(PARAM_EXPR)

  // A page below the first, a fraction, or a word is a page nobody can be on,
  // so it reads as the first one. How far past the end a page is depends on a
  // count only the source knows, so that is the shell's to correct, not this.
  const pageParam = params.get(PARAM_PAGE)
  const pageRaw = pageParam === undefined ? 1 : Number(decodeValue(pageParam))
  const page = Number.isFinite(pageRaw) ? Math.max(1, Math.floor(pageRaw)) : 1

  return {
    entity: entity?.key ?? null,
    view: view as ShellQuery['view'],
    sort: sort.key,
    dir,
    expr: exprParam === undefined ? '' : expandShortcuts(decodeValue(exprParam), entity, schema),
    page,
  }
}

/**
 * Writes a query back into a search string, dropping anything at its default
 * and preserving every parameter the shell does not own — a host can keep its
 * own state in the same URL without the shell trampling it.
 */
export function serializeQuery(
  query: ShellQuery,
  schema: DomainSchema,
  defaults: ShellQueryDefaults = {},
  currentSearch = '',
): string {
  const base = defaultQuery(schema, defaults)
  const entity = findEntity(schema, query.entity)
  const foreign = parsePairs(currentSearch).filter(([key]) => !isOwnedKey(key))

  const owned: Array<[string, string]> = []
  const put = (key: string, value: string) => owned.push([key, encodeValue(value)])

  const entityKey = entity?.key ?? null
  if (entityKey !== base.entity) {
    // When home is the default, returning to the whole corpus is the absence
    // of the parameter — which is what keeps the home screen's URL empty.
    put(PARAM_ENTITY, entity ? entityAddress(entity, schema) : ENTITY_ALL)
  }
  if (query.view !== defaultViewFor(entityKey, defaults)) put(PARAM_VIEW, query.view)
  if (query.sort !== base.sort) {
    const sorts = sortsFor(entity, schema)
    const sort = sorts.find((candidate) => candidate.key === query.sort)
    put(PARAM_SORT, sort ? sortAddress(sort, sorts) : query.sort)
  }
  if (query.dir !== base.dir) put(PARAM_DIR, query.dir)
  if (query.expr.trim() !== '') put(PARAM_EXPR, compactShortcuts(query.expr, entity, schema))

  // Last, after the terms that decide what is being paged through — the page
  // is a position in that result, and reads as one at the end of the URL.
  if (query.page > 1) put(PARAM_PAGE, String(query.page))

  const all: Array<[string, string]> = [
    ...foreign.map(([key, value]): [string, string] => [encodeValue(key), value]),
    ...owned,
  ]
  if (!all.length) return ''
  return `?${all.map(([key, value]) => (value === '' ? key : `${key}=${value}`)).join('&')}`
}

/**
 * A route's query as the router hands it over: a repeated parameter is a
 * list, and a parameter written with no value — `?flag` — is `null`. The
 * shape of vue-router's `route.query`, without depending on it.
 */
export type RouteQuery = Record<string, string | null | (string | null)[] | undefined>

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
export function searchFromQuery(routeQuery: RouteQuery): string {
  const pairs: string[] = []
  for (const [key, value] of Object.entries(routeQuery)) {
    for (const entry of Array.isArray(value) ? value : [value]) {
      if (typeof entry !== 'string') continue
      const name = encodeValue(key)
      pairs.push(entry === '' ? name : `${name}=${encodeValue(entry)}`)
    }
  }
  return pairs.length ? `?${pairs.join('&')}` : ''
}

/**
 * The expression out of a search string — the `q` parameter, decoded, or `''`
 * where there is none.
 *
 * Given the schema, exactly the `expr` {@link parseQuery} reads out of the
 * same search: its shortcuts written out against the entity the search names.
 * Without one, the terms as the address writes them — for code that only needs
 * to know which records a URL names ({@link recordsIn}) and has no schema yet,
 * which is enough, since a join key is never shortened. Either way by the same
 * decoding, including the last of a repeated parameter winning, so the two
 * never disagree about what the query says.
 */
export function readExpression(search: string, schema?: DomainSchema): string {
  const params = new Map(parsePairs(search))
  const raw = params.get(PARAM_EXPR)
  const expr = raw === undefined ? '' : decodeValue(raw)
  if (!schema) return expr
  const entity = params.get(PARAM_ENTITY)
  return expandShortcuts(
    expr,
    entity === undefined ? null : findEntityByAddress(schema, decodeValue(entity)),
    schema,
  )
}
