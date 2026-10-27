import type {
  ColumnDef,
  DomainSchema,
  EntitySchema,
  FacetDef,
  QueryRequest,
  QueryResult,
  RecordStatus,
  ShellRow,
  SyncDataSource,
} from '../types'
import { RECORD_STATUSES } from '../types'
import { applyQuery } from './apply'
import { fnv1a } from './format'

/*
 * Applying a query to rows in memory — the expression, the sort and the page —
 * is shared with `createMemoryDataSource`, and lives in `apply.ts`.
 */

/** Tile backgrounds for the grid view, cycled by row hash. */
export const MOCK_TINTS = [
  'oklch(0.36 0.06 240)',
  'oklch(0.34 0.07 290)',
  'oklch(0.36 0.06 160)',
  'oklch(0.38 0.06 80)',
  'oklch(0.35 0.07 30)',
  'oklch(0.34 0.05 200)',
] as const

/**
 * A tile colour for a record, the same one every time: one of
 * {@link MOCK_TINTS}, picked by a hash of the id.
 *
 * For a host whose records have no colour of their own but whose grid view
 * wants its tiles told apart — the palette the mock draws with, so a real
 * corpus and a generated one look like the same shell. Stable across runs
 * and across sorts, since it reads nothing but the id; nothing fills it in
 * for you, so a `tint` column holds it only where a source puts it there.
 */
export function tintFor(id: string): string {
  return MOCK_TINTS[fnv1a(id) % MOCK_TINTS.length] as string
}

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

function pickFacetValue(facet: FacetDef, hash: number): ShellRow['fields'][string] {
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
 * What the mock puts in a field, from what its column says the field is.
 *
 * The row shape is the schema's now, so the generator reads it off the columns
 * rather than filling in a set of names it knew in advance: a role for the
 * parts a card is made of, and the kind for the rest.
 */
function pickColumnValue(
  column: ColumnDef,
  context: { hash: number; sample: readonly [string, string]; revision: number; updatedAt: string },
): unknown {
  const { hash, sample, revision, updatedAt } = context
  const suffix = revision ? ` · rev ${revision + 1}` : ''

  switch (column.role) {
    case 'identity':
      return `${sample[0]}${suffix}`
    case 'reference':
      return revision ? `${sample[1]}-${revision + 1}` : sample[1]
    case 'state':
      return RECORD_STATUSES[hash % RECORD_STATUSES.length] as RecordStatus
    case 'updated':
      return updatedAt
    case 'tint':
      return MOCK_TINTS[hash % MOCK_TINTS.length] as string
    case 'metric':
      return 1 + (hash % 940)
  }

  switch (column.kind) {
    case 'number':
      return 1 + (hash % 940)
    case 'status':
      return RECORD_STATUSES[hash % RECORD_STATUSES.length] as RecordStatus
    case 'date':
      return updatedAt
    default:
      // Text with nothing else said about it. The generator has no vocabulary
      // for a field the schema only named, and inventing one would put lorem
      // ipsum in a column whose facet — if it has one — says what it holds.
      return undefined
  }
}

/**
 * Expands an entity's sample pairs into a stable population, filling each row
 * from what the entity's columns say it holds. Repeats beyond the sample
 * length are suffixed as revisions, which keeps every identity unique without
 * inventing vocabulary the schema did not supply.
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
    const updatedAt = new Date(now.getTime() - (hash % 900) * 3_600_000).toISOString()

    const fields: ShellRow['fields'] = {}

    /*
     * The columns first, each field hashed by its own name so two metrics of
     * one row are two different numbers rather than the same one twice.
     */
    for (const column of entity.columns ?? []) {
      const field = column.field ?? column.key
      // A column that computes its own value reads the other fields, so there
      // is nothing to generate for it.
      if (!field || column.value) continue
      const value = pickColumnValue(column, {
        hash: fnv1a(`${hash}:${field}`),
        sample,
        revision,
        updatedAt,
      })
      if (value !== undefined) fields[field] = value
    }

    /*
     * Then the facets, which know their own options, ranges and flags — and so
     * say more about a field than a column naming it ever could.
     */
    for (const facet of entity.facets) {
      fields[facet.key] = pickFacetValue(facet, fnv1a(`${hash}:${facet.key}`))
    }

    /*
     * Join keys last, so a scope field always holds an id — a schema that
     * happens to name a facet or a column the same thing would otherwise leave
     * the drill matching vocabulary instead of records.
     *
     * Every row gets every one of them, including rows of types that declare
     * no scope of their own. A row missing the field would not be excluded by
     * a term naming it: an unresolvable field matches, so the narrowed list
     * would quietly carry the whole of that type.
     */
    for (const [field, key] of scopes) {
      fields[field] = key === entity.key ? id : parentIds(key, i, field, population)
    }

    rows.push({ id, entityKey: entity.key, entityLabel: entity.label, fields })
  }
  return rows
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
    query(request: QueryRequest): QueryResult {
      // Generated rows always carry their dates, and a `limit` of 0 is a page
      // of nothing — both as this source has always read them.
      return applyQuery(request, (entity) => rowsFor(entity, request.schema), {
        undatedLast: false,
        zeroIsAll: false,
      })
    },
  }
}
