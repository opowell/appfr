import type {
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
}

function pickFacetValue(facet: FacetDef, hash: number): string | number | boolean {
  switch (facet.kind) {
    case 'chips':
      return facet.options[hash % facet.options.length] ?? ''
    case 'range': {
      const span = Math.max(0, facet.max - facet.min)
      return facet.min + (span === 0 ? 0 : hash % (span + 1))
    }
    case 'toggle':
      // Roughly a third of rows carry the flag, so toggles visibly narrow.
      return hash % 3 === 0
  }
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
  if (!samples.length) return []

  const rows: ShellRow[] = []
  for (let i = 0; i < population; i++) {
    const sample = samples[i % samples.length] as readonly [string, string]
    const revision = Math.floor(i / samples.length)
    const hash = fnv1a(`${salt}:${entity.key}:${sample[0]}:${i}`)

    const facets: Record<string, string | number | boolean> = {}
    for (const facet of entity.facets) {
      facets[facet.key] = pickFacetValue(facet, fnv1a(`${hash}:${facet.key}`))
    }

    const updatedAt = new Date(now.getTime() - (hash % 900) * 3_600_000).toISOString()

    rows.push({
      id: `${entity.key}_${10_000 + i * 7}`,
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
 * limits for real, so stories and tests exercise the same code paths a live
 * backend would.
 */
export function createMockDataSource(options: MockSourceOptions = {}): SyncDataSource {
  const cache = new Map<string, ShellRow[]>()

  const rowsFor = (entity: EntitySchema): ShellRow[] => {
    const cached = cache.get(entity.key)
    if (cached) return cached
    const generated = generateRows(entity, options)
    cache.set(entity.key, generated)
    return generated
  }

  return {
    query({ query, schema, entity, limit }: QueryRequest): QueryResult {
      const expression = parseExpression(query.expr)

      // No entity selected means the whole corpus. Logs and settings are
      // entities like any other, so they are in it until a filter says not.
      const scope = entity ? [entity] : schema.entities
      const population: ShellRow[] = []
      const matched: ShellRow[] = []

      for (const candidate of scope) {
        for (const row of rowsFor(candidate)) {
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
        rows: sorted.slice(0, limit),
        total: matched.length,
        unfiltered: matched.length === population.length,
      }
    },
  }
}
