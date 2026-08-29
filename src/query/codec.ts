import type {
  DomainSchema,
  FacetDef,
  FacetState,
  FacetValue,
  ShellQuery,
  ShellQueryDefaults,
} from '../types'
import { defaultQuery, emptyFacetValue, findEntity, findSort, isViewKind, reconcileFacets } from './schema'

/** Query-string keys the shell owns. Anything else in the URL is left alone. */
export const PARAM_ENTITY = 'e'
export const PARAM_VIEW = 'v'
export const PARAM_SORT = 's'
export const PARAM_DIR = 'd'
export const PARAM_EXPR = 'q'
export const PARAM_PAGE = 'p'
export const FACET_PREFIX = 'f_'

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

const RANGE_SEPARATOR = '..'
const CHIP_SEPARATOR = ','

/**
 * Characters `encodeURIComponent` escapes that are safe to leave literal in a
 * query value. Keeping them readable matters here: the URL is the primary
 * record of a query and people paste it to each other.
 */
const READABLE: Array<[RegExp, string]> = [
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
  return (SCALAR_PARAMS as readonly string[]).includes(key) || key.startsWith(FACET_PREFIX)
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function parseFacetValue(facet: FacetDef, raw: string): FacetValue {
  const text = decodeValue(raw)
  switch (facet.kind) {
    case 'chips': {
      const wanted = new Set(
        text
          .split(CHIP_SEPARATOR)
          .map((part) => part.trim())
          .filter(Boolean),
      )
      // Iterate the schema's options so selection order is always canonical
      // and values the schema no longer offers are dropped.
      const selected = facet.options.filter((option) => wanted.has(option))
      return { kind: 'chips', selected }
    }
    case 'range': {
      const cut = text.indexOf(RANGE_SEPARATOR)
      const lowText = (cut === -1 ? text : text.slice(0, cut)).trim()
      const highText = (cut === -1 ? '' : text.slice(cut + RANGE_SEPARATOR.length)).trim()
      const lowRaw = lowText === '' ? null : Number(lowText)
      const highRaw = highText === '' ? null : Number(highText)
      let min = lowRaw !== null && Number.isFinite(lowRaw) ? clamp(lowRaw, facet.min, facet.max) : null
      let max = highRaw !== null && Number.isFinite(highRaw) ? clamp(highRaw, facet.min, facet.max) : null
      if (min !== null && max !== null && min > max) [min, max] = [max, min]
      return { kind: 'range', min, max }
    }
    case 'toggle':
      return { kind: 'toggle', on: text === '1' || text === 'true' }
  }
}

function serializeFacetValue(value: FacetValue, facet: FacetDef): string | null {
  switch (value.kind) {
    case 'chips': {
      if (!value.selected.length) return null
      const ordered =
        facet.kind === 'chips'
          ? facet.options.filter((option) => value.selected.includes(option))
          : value.selected
      return ordered.join(CHIP_SEPARATOR)
    }
    case 'range': {
      if (value.min === null && value.max === null) return null
      return `${value.min ?? ''}${RANGE_SEPARATOR}${value.max ?? ''}`
    }
    case 'toggle':
      return value.on ? '1' : null
  }
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
  const entity = entityKey === ENTITY_ALL ? null : findEntity(schema, entityKey)

  const viewParam = params.get(PARAM_VIEW)
  const view = viewParam && isViewKind(decodeValue(viewParam)) ? decodeValue(viewParam) : base.view

  const sortParam = params.get(PARAM_SORT)
  const sort = findSort(entity, sortParam ? decodeValue(sortParam) : defaults.sort)

  const dirParam = params.get(PARAM_DIR)
  const dir = dirParam ? (decodeValue(dirParam) === 'asc' ? 'asc' : 'desc') : base.dir

  const exprParam = params.get(PARAM_EXPR)

  // A page below the first, a fraction, or a word is a page nobody can be on,
  // so it reads as the first one. How far past the end a page is depends on a
  // count only the source knows, so that is the shell's to correct, not this.
  const pageParam = params.get(PARAM_PAGE)
  const pageRaw = pageParam === undefined ? 1 : Number(decodeValue(pageParam))
  const page = Number.isFinite(pageRaw) ? Math.max(1, Math.floor(pageRaw)) : 1

  const facets: FacetState = {}
  for (const facet of entity?.facets ?? []) {
    const raw = params.get(`${FACET_PREFIX}${facet.key}`)
    facets[facet.key] = raw === undefined ? emptyFacetValue(facet) : parseFacetValue(facet, raw)
  }

  return {
    entity: entity?.key ?? null,
    view: view as ShellQuery['view'],
    sort: sort.key,
    dir,
    expr: exprParam === undefined ? '' : decodeValue(exprParam),
    facets: reconcileFacets(entity, facets),
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
    put(PARAM_ENTITY, entityKey ?? ENTITY_ALL)
  }
  if (query.view !== base.view) put(PARAM_VIEW, query.view)
  if (query.sort !== base.sort) put(PARAM_SORT, query.sort)
  if (query.dir !== base.dir) put(PARAM_DIR, query.dir)
  if (query.expr.trim() !== '') put(PARAM_EXPR, query.expr)

  for (const facet of entity?.facets ?? []) {
    const value = query.facets[facet.key]
    if (!value) continue
    const encoded = serializeFacetValue(value, facet)
    if (encoded !== null) owned.push([`${FACET_PREFIX}${facet.key}`, encodeValue(encoded)])
  }

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
