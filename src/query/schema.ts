import type {
  ColumnDef,
  DomainSchema,
  EntitySchema,
  FacetDef,
  FacetValue,
  ShellQuery,
  ShellQueryDefaults,
  SortDef,
  ViewKind,
} from '../types'
import { VIEW_KINDS } from '../types'
import { formatCount } from '../data/format'

/**
 * Cards. On the home screen — where no entity is filtered to — that means a
 * card per item type rather than per record: what each type is, how many of it
 * there are, and its most recently updated few.
 */
export const DEFAULT_VIEW: ViewKind = 'cards'

/** Table: what one type's records, every row of them the same columns, are drawn as. */
export const DEFAULT_ENTITY_VIEW: ViewKind = 'table'

/**
 * The view a query leaves unsaid — so the one its URL omits — which depends on
 * whether it names a type: {@link DEFAULT_VIEW} across them, and
 * {@link DEFAULT_ENTITY_VIEW} within one.
 */
export function defaultViewFor(entity: string | null, defaults: ShellQueryDefaults = {}): ViewKind {
  const asked = (view: ViewKind | undefined) => (view && isViewKind(view) ? view : undefined)
  if (entity === null) return asked(defaults.view) ?? DEFAULT_VIEW
  // A host landing on a type has always named the view it lands in as `view`.
  const landing = defaults.landing === 'entity' ? asked(defaults.view) : undefined
  return asked(defaults.entityView) ?? landing ?? DEFAULT_ENTITY_VIEW
}

/**
 * The view a change of type lands in. A view left at its default was nobody's
 * choice, so it becomes the default of where the query is going; one somebody
 * chose is theirs, and goes with them — unless the host says a change of type
 * always lands on its default (`viewAcrossTypes: 'default'`).
 */
export function viewAcross(
  view: ViewKind,
  from: string | null,
  to: string | null,
  defaults: ShellQueryDefaults = {},
): ViewKind {
  const carried = defaults.viewAcrossTypes !== 'default' && view !== defaultViewFor(from, defaults)
  return carried ? view : defaultViewFor(to, defaults)
}
export const DEFAULT_SORT = 'updated'

export function isViewKind(value: unknown): value is ViewKind {
  return typeof value === 'string' && (value === 'record' || (VIEW_KINDS as readonly string[]).includes(value))
}

/**
 * What each view is called wherever one is offered as a choice — the header's
 * chooser and the query panel's row of them are naming the same seven things,
 * and a view called `Cards` in one place and `cards` in the other would read
 * as two settings rather than one.
 */
export const VIEW_LABELS: Record<ViewKind, string> = {
  list: 'List',
  cards: 'Cards',
  grid: 'Grid',
  images: 'Images',
  table: 'Table',
  links: 'Links',
  preview: 'Preview',
  record: 'Record',
}

/**
 * What each view looks like wherever one is offered as a choice, beside its
 * {@link VIEW_LABELS} name: the `d` of an SVG path in a 16×16 box, stroked and
 * never filled — a menu item's `icon`. Each is a small drawing of the view
 * itself, so the seven read apart at a glance.
 */
export const VIEW_ICONS: Record<ViewKind, string> = {
  list: 'M6 4h7.5M6 8h7.5M6 12h7.5M2.5 4h.01M2.5 8h.01M2.5 12h.01',
  cards: 'M2.5 2.5h11v4.5h-11zM2.5 9h11v4.5h-11z',
  grid: 'M2.5 2.5h4.5v4.5h-4.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5h-4.5zM9 9h4.5v4.5H9z',
  images: 'M2.5 3h11v10h-11zM2.5 11l3.5-3.5 2.5 2.5 2-2 3 3M10.5 5.75h.01',
  table: 'M2.5 3h11v10h-11zM2.5 6.5h11M2.5 9.75h11M6.5 6.5V13',
  links:
    'M6.75 9.25a2.5 2.5 0 0 0 3.54 0l2.12-2.12a2.5 2.5 0 0 0-3.54-3.54l-.7.7' +
    'M9.25 6.75a2.5 2.5 0 0 0-3.54 0L3.59 8.87a2.5 2.5 0 0 0 3.54 3.54l.7-.7',
  preview: 'M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8zM6 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0',
  record: 'M4 2h5.5L12 4.5V14H4zM9.5 2v2.5H12M6 8h4M6 10.5h4',
}

/**
 * The view actually drawn, given what the query asks for and what the host
 * offers. A URL naming a view a host has withheld falls back to the first on
 * offer, so a link into a restricted shell still lands somewhere it can draw.
 */
export function resolveView(asked: ViewKind, offered: ViewKind[] | undefined): ViewKind {
  // A record's own view kept in a link to a screen it is not offered on —
  // another record, or none — is drawn as the shell's default rather than
  // as nothing, there being no host's view of that record to draw.
  if (asked === 'record' && !offered?.includes(asked)) return offered?.[0] ?? DEFAULT_VIEW
  const [fallback] = offered ?? []
  if (fallback === undefined) return asked
  return offered?.includes(asked) ? asked : fallback
}

/**
 * The population an entity publishes, as it is written: a number in the
 * shell's own hand, a string as the host gave it.
 */
export function entityCount(entity: EntitySchema): string {
  return typeof entity.count === 'number' ? formatCount(entity.count) : entity.count
}

/** The entity a key names, or `null` when it names none. */
export function findEntity(schema: DomainSchema, key: string | null | undefined): EntitySchema | null {
  if (!key) return null
  return schema.entities.find((entity) => entity.key === key) ?? null
}

/**
 * The entity the query panel configures. With no entity selected there is
 * still one in focus — the schema's first, or whichever the host nominated —
 * so the panel and the home screen's search box have somewhere to go.
 */
export function focusEntity(schema: DomainSchema, defaults: ShellQueryDefaults = {}): EntitySchema {
  const nominated = findEntity(schema, defaults.entity)
  const first = schema.entities[0]
  if (!nominated && !first) throw new Error(`Schema "${schema.key}" declares no entities`)
  return nominated ?? (first as EntitySchema)
}

/**
 * The columns an ordering can be read out of: the entity's own where one is
 * filtered to, and the schema's across every entity — where no one type's
 * columns describe the rows, exactly as the table finds its headings.
 */
export function columnsForSort(
  entity: EntitySchema | null,
  schema: DomainSchema | null = null,
): ColumnDef[] {
  return entity?.columns ?? schema?.columns ?? []
}

/**
 * The sorts on offer: one per column that names a {@link ColumnDef.sort},
 * labelled with that column's own heading, in the order the schema declared
 * them. A column is what knows both what it holds and what ordering it means,
 * so the bar and the table headings are offering one list rather than two.
 *
 * An entity may state its own set instead, for an ordering no column shows.
 */
export function sortsFor(
  entity: EntitySchema | null,
  schema: DomainSchema | null = null,
): SortDef[] {
  if (entity?.sorts?.length) return entity.sorts
  const seen = new Set<string>()
  const sorts: SortDef[] = []
  for (const column of columnsForSort(entity, schema)) {
    if (!column.sort || seen.has(column.sort)) continue
    seen.add(column.sort)
    sorts.push({ key: column.sort, label: (column.label ?? column.sort).toLowerCase() })
  }
  return sorts
}

/** The ordering a query falls back to, where the columns offer it. */
const FALLBACK_SORT: SortDef = { key: DEFAULT_SORT, label: DEFAULT_SORT }

/**
 * The sort a key names.
 *
 * Falling back to the recency sort rather than to the first declared, because
 * the first column of a set is the identity and landing on a corpus ordered
 * A-to-Z says less than landing on what changed last. Where nothing is
 * offered at all — a type with no columns — the key stands on its own, so a
 * URL and a request still say something a source can act on.
 */
export function findSort(
  entity: EntitySchema | null,
  key: string | undefined,
  schema: DomainSchema | null = null,
): SortDef {
  const sorts = sortsFor(entity, schema)
  const found = key ? sorts.find((sort) => sort.key === key) : undefined
  return (
    found ??
    sorts.find((sort) => sort.key === DEFAULT_SORT) ??
    sorts[0] ??
    FALLBACK_SORT
  )
}

/** The neutral value for a facet — the state in which it narrows nothing. */
export function emptyFacetValue(facet: FacetDef): FacetValue {
  switch (facet.kind) {
    case 'chips':
      return { kind: 'chips', selected: [] }
    case 'range':
      return { kind: 'range', min: null, max: null }
    case 'toggle':
      return { kind: 'toggle', on: false }
  }
}

export function isFacetActive(value: FacetValue | undefined): boolean {
  if (!value) return false
  switch (value.kind) {
    case 'chips':
      return value.selected.length > 0
    case 'range':
      return value.min !== null || value.max !== null
    case 'toggle':
      return value.on
  }
}

/**
 * True when nothing narrows the corpus: no entity chosen and no expression —
 * which holds the facets too. This is the home screen.
 */
export function isPristineQuery(query: ShellQuery): boolean {
  return query.entity === null && query.expr.trim() === ''
}

/** True when an entity has been picked out of the whole corpus. */
export function isEntityScoped(query: ShellQuery): boolean {
  return query.entity !== null
}

/**
 * True when the results are a card per *type* rather than per record — cards
 * with no entity filter, which is the home screen. Those cards run their own
 * per-entity queries, so the shell's single result set is not what is on
 * screen and nothing pages through it.
 *
 * `offered` is the host's `views`: the view read is the one drawn, so a link
 * naming a view the host withheld is the home screen wherever it draws cards.
 */
export function isTypeCardsQuery(query: ShellQuery, offered?: ViewKind[]): boolean {
  return query.entity === null && resolveView(query.view, offered) === 'cards'
}

/**
 * How many pages of `limit` rows `total` rows come to. Always at least one:
 * an empty result set is one empty page, not none.
 */
export function countPages(total: number, limit: number): number {
  if (limit <= 0) return 1
  return Math.max(1, Math.ceil(total / limit))
}

/**
 * The query an empty URL means. By default that is the home screen: every
 * entity, nothing filtered, in the preview view. A host can land on a single
 * entity's list instead with `landing: 'entity'`.
 */
export function defaultQuery(schema: DomainSchema, defaults: ShellQueryDefaults = {}): ShellQuery {
  const landsOnEntity = defaults.landing === 'entity'
  const entity = landsOnEntity ? focusEntity(schema, defaults) : null
  return {
    entity: entity?.key ?? null,
    view: defaultViewFor(entity?.key ?? null, defaults),
    sort: findSort(entity, defaults.sort).key,
    dir: defaults.dir === 'asc' ? 'asc' : 'desc',
    expr: '',
    page: 1,
  }
}

/**
 * The query fields that decide *which* rows matched and in what order. A
 * change to any of them makes the page someone was on a position in a result
 * set that no longer exists, so the shell returns to the first page. `view` is
 * deliberately not among them: the same rows drawn another way are still the
 * same rows, and page 3 of them is still page 3.
 */
export const RESULT_FIELDS = ['entity', 'sort', 'dir', 'expr'] as const

/** True when a patch touches any of {@link RESULT_FIELDS}. */
export function changesResults(patch: Partial<ShellQuery>): boolean {
  return RESULT_FIELDS.some((field) => field in patch)
}
