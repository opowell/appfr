import type {
  DomainSchema,
  EntitySchema,
  FacetDef,
  FacetState,
  QueryRequest,
  QueryResult,
  RecordStatus,
  ShellRow,
  SyncDataSource,
} from '../types'
import { RECORD_STATUSES } from '../types'
import { findSort } from '../query/schema'
import { matchesExpression, parseExpression } from './expression'
import { fnv1a } from './format'

/** Tile backgrounds for the grid view, cycled by row hash. */
export const MOCK_TINTS = [
  'oklch(0.36 0.06 240)',
  'oklch(0.34 0.07 290)',
  'oklch(0.36 0.06 160)',
  'oklch(0.38 0.06 80)',
  'oklch(0.35 0.07 30)',
  'oklch(0.34 0.05 200)',
] as const

export interface MockSourceOptions {
  /** Rows generated per entity. Defaults to 48. */
  population?: number
  /** Salt for the generator, so two sources can differ deterministically. */
  seed?: string
  /** Most recent `updatedAt` in the generated set. Defaults to 2026-08-25. */
  now?: Date
  /**
   * Entity keys whose records every generated row belongs to — the `scope`
   * fields the schema declares, as `[field, entityKey]`.
   *
   * Without these a drill would come back empty: nothing on the far side of
   * the number says which record it belongs to. `createMockDataSource` reads
   * them off the schema, so a caller only sets this when generating rows on
   * its own.
   */
  scopes?: Array<readonly [string, string]>
}

/**
 * The id {@link generateRows} gives the `index`-th record of an entity.
 *
 * A join key is a real id rather than a fresh string, so narrowing to a record
 * of one type finds rows of another and the demo means something.
 */
function mockId(entityKey: string, index: number): string {
  return `${entityKey}_${10_000 + index * 7}`
}

/** Records of another type this one belongs to. Coprime with any population. */
const MEMBERSHIP_STRIDE = 7

/** How many of them, so a drilled list is worth looking at. */
const MEMBERSHIPS = 3

/**
 * The records of `entityKey` that the `index`-th row belongs to.
 *
 * Strided rather than hashed, so *every* record of that type has rows on the
 * far side of it. Hashed, a third of them would come up empty, and pressing a
 * count that says `312` to be told there is nothing there reads as a broken
 * shell rather than as a thin fixture.
 *
 * Several of them, and offset per field, so the memberships of one row are not
 * the same record twice over and two fields do not move together.
 */
function parentIds(entityKey: string, index: number, field: string, population: number): string[] {
  const first = (index * MEMBERSHIP_STRIDE + fnv1a(field)) % population
  const ids: string[] = []
  for (let step = 0; step < Math.min(MEMBERSHIPS, population); step++) {
    ids.push(mockId(entityKey, (first + step) % population))
  }
  return ids
}

function pickFacetValue(facet: FacetDef, hash: number): ShellRow['facets'][string] {
  switch (facet.kind) {
    case 'chips':
      // A multi-valued facet takes one, two or three of its options, so the
      // generated population has rows that belong to more than one chip's set.
      return facet.multiple ? pickSeveral(facet.options, hash) : facet.options[hash % facet.options.length] ?? ''
    case 'range': {
      const span = Math.max(0, facet.max - facet.min)
      return facet.min + (span === 0 ? 0 : hash % (span + 1))
    }
    case 'toggle':
      // Roughly a third of rows carry the flag, so toggles visibly narrow.
      return hash % 3 === 0
  }
}

/** One to three of `options`, in schema order, chosen deterministically. */
function pickSeveral(options: string[], hash: number): string[] {
  if (!options.length) return []
  const count = 1 + ((hash >> 5) % Math.min(3, options.length))
  const first = hash % options.length
  const picked = new Set<number>()
  for (let step = 0; step < count; step++) picked.add((first + step) % options.length)
  return [...picked].sort((a, b) => a - b).map((index) => options[index] as string)
}

/**
 * Expands an entity's sample pairs into a stable population. Repeats beyond the
 * sample length are suffixed as revisions, which keeps every `primary` unique
 * without inventing vocabulary the schema did not supply.
 */
export function generateRows(
  entity: EntitySchema,
  options: MockSourceOptions = {},
): ShellRow[] {
  const population = options.population ?? 48
  const salt = options.seed ?? ''
  const now = options.now ?? new Date('2026-08-25T00:00:00Z')
  const samples = entity.samples
  const scopes = options.scopes ?? []
  if (!samples.length) return []

  const rows: ShellRow[] = []
  for (let i = 0; i < population; i++) {
    const sample = samples[i % samples.length] as readonly [string, string]
    const revision = Math.floor(i / samples.length)
    const hash = fnv1a(`${salt}:${entity.key}:${sample[0]}:${i}`)

    const id = mockId(entity.key, i)

    const facets: ShellRow['facets'] = {}
    for (const facet of entity.facets) {
      facets[facet.key] = pickFacetValue(facet, fnv1a(`${hash}:${facet.key}`))
    }

    /*
     * Join keys, written after the entity's own facets so a scope field always
     * holds an id — a schema that happens to name a facet the same thing would
     * otherwise leave the drill matching vocabulary instead of records.
     *
     * Every row gets every one of them, including rows of types that declare
     * no scope of their own. A row missing the field would not be excluded by
     * a term naming it: an unresolvable field matches, so the narrowed list
     * would quietly carry the whole of that type.
     */
    for (const [field, key] of scopes) {
      facets[field] = key === entity.key ? id : parentIds(key, i, field, population)
    }

    const updatedAt = new Date(now.getTime() - (hash % 900) * 3_600_000).toISOString()

    rows.push({
      id,
      entityKey: entity.key,
      entityLabel: entity.label,
      primary: revision ? `${sample[0]} · rev ${revision + 1}` : sample[0],
      secondary: revision ? `${sample[1]}-${revision + 1}` : sample[1],
      status: RECORD_STATUSES[hash % RECORD_STATUSES.length] as RecordStatus,
      score: Number((0.35 + (hash % 64) / 100).toFixed(3)),
      metric1: 1 + (hash % 940),
      metric2: 1 + ((hash >> 3) % 320),
      updatedAt,
      tint: MOCK_TINTS[hash % MOCK_TINTS.length] as string,
      facets,
    })
  }
  return rows
}

/** Applies the facet state to a row. Neutral facets never exclude anything. */
export function matchesFacets(row: ShellRow, facets: FacetState): boolean {
  for (const [key, value] of Object.entries(facets)) {
    const actual = row.facets[key]
    switch (value.kind) {
      case 'chips': {
        if (!value.selected.length) break
        // The chips of one facet are an OR, so a row holding several values is
        // in the set when any one of them is selected.
        if (Array.isArray(actual)) {
          if (!actual.some((entry) => value.selected.includes(entry))) return false
          break
        }
        if (typeof actual !== 'string' || !value.selected.includes(actual)) return false
        break
      }
      case 'range': {
        if (value.min === null && value.max === null) break
        const numeric = typeof actual === 'number' ? actual : Number(actual)
        if (!Number.isFinite(numeric)) return false
        if (value.min !== null && numeric < value.min) return false
        if (value.max !== null && numeric > value.max) return false
        break
      }
      case 'toggle': {
        if (!value.on) break
        if (actual !== true) return false
        break
      }
    }
  }
  return true
}

function comparatorFor(sortKey: string): (a: ShellRow, b: ShellRow) => number {
  switch (sortKey) {
    case 'score':
      return (a, b) => b.score - a.score
    case 'metric1':
      return (a, b) => b.metric1 - a.metric1
    case 'metric2':
      return (a, b) => b.metric2 - a.metric2
    case 'name':
      // Descending sort should reverse to A→Z, so order names Z→A here.
      return (a, b) => b.primary.localeCompare(a.primary)
    case 'updated':
    default:
      return (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
  }
}

/**
 * An in-memory {@link SyncDataSource} over generated rows. It filters, sorts and
 * pages for real, so stories and tests exercise the same code paths a live
 * backend would.
 */
export function createMockDataSource(options: MockSourceOptions = {}): SyncDataSource {
  const cache = new Map<string, ShellRow[]>()

  /*
   * The join keys, read off the schema on first use rather than configured:
   * an entity that declares `scope` is saying every other record names it, and
   * the generated rows have to say so too or a drill finds nothing.
   */
  const rowsFor = (entity: EntitySchema, schema: DomainSchema): ShellRow[] => {
    const cached = cache.get(entity.key)
    if (cached) return cached
    const scopes = options.scopes
      ?? schema.entities.flatMap((candidate) =>
        candidate.scope ? [[candidate.scope, candidate.key] as const] : [],
      )
    const generated = generateRows(entity, { ...options, scopes })
    cache.set(entity.key, generated)
    return generated
  }

  return {
    query({ query, schema, entity, limit, offset }: QueryRequest): QueryResult {
      const expression = parseExpression(query.expr)

      // No entity selected means the whole corpus. Logs and settings are
      // entities like any other, so they are in it until a filter says not.
      const scope = entity ? [entity] : schema.entities
      const population: ShellRow[] = []
      const matched: ShellRow[] = []

      for (const candidate of scope) {
        for (const row of rowsFor(candidate, schema)) {
          population.push(row)
          // Per-entity facets only apply when that entity is the one selected.
          const passesFacets = entity ? matchesFacets(row, query.facets) : true
          if (passesFacets && matchesExpression(expression, row, candidate)) matched.push(row)
        }
      }

      const sort = findSort(entity, query.sort)
      const sorted = matched.sort(comparatorFor(sort.key))
      if (query.dir === 'asc') sorted.reverse()

      return {
        // One page out of the middle. `total` stays the whole match, which is
        // what the shell counts pages with.
        rows: sorted.slice(offset, offset + limit),
        total: matched.length,
        unfiltered: matched.length === population.length,
      }
    },
  }
}
