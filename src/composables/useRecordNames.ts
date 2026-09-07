import { shallowRef, watch } from 'vue'
import type { ComputedRef, ShallowRef } from 'vue'
import type { DataSource, DomainSchema, EntitySchema, QueryResult, ShellQuery, ShellRow } from '../types'
import { emptyFacetState, findSort } from '../query/schema'
import { cellTextOf, EMPTY_CELL, roleColumn } from '../query/columns'
import { recordTerm, scopedEntity } from '../query/drill'
import { EXPRESSION_TERM } from '../query/summary'
import type { SummaryTerm } from '../query/summary'

/** A term that names one record: which type, and which of them. */
interface Reference {
  entity: EntitySchema
  id: string
  /** What the name is cached under — an id is only unique within its type. */
  key: string
}

export interface UseRecordNamesOptions {
  source: ComputedRef<DataSource>
  schema: ComputedRef<DomainSchema>
  /** The query the names are for, for the sort a lookup asks in. */
  query: ComputedRef<ShellQuery>
  /** The terms to read: whichever of them name a record are looked up. */
  terms: ComputedRef<SummaryTerm[]>
}

export interface RecordNamesState {
  /** The names found so far, keyed by type and id. */
  names: ShallowRef<ReadonlyMap<string, string>>
  /**
   * What the record a term names is called, or null where the term names no
   * record — or where nothing has come back about it yet.
   */
  nameOf(term: SummaryTerm): string | null
}

/**
 * How many rows a lookup asks for.
 *
 * One would do if a term named exactly what it matches, and it does not: this
 * language matches on substrings, so `test:"ticket-3.0/x.spec.ts"` is also
 * true of `pre-ticket-3.0/x.spec.ts` — and the first row back under the
 * query's own sort is then a different record with a name of its own. So the
 * lookup takes a window and picks the record out of it. A window because an id
 * that is a substring of a great many others is not worth a scan of the type
 * to name: past this many the header keeps showing the id, which is what it
 * showed before.
 */
const LOOKUP_WINDOW = 25

/** Ids compare as they match: case is not a constraint in this language. */
const sameId = (one: string, other: string) => one.toLowerCase() === other.toLowerCase()

/**
 * The record a reference points at, out of what matched the term.
 *
 * By its id, and by nothing else. A term written by a drill holds the row's
 * own id — that is what {@link recordTerm} is — so the record is the row that
 * has it, and any other row the substring reached is a different record whose
 * name would be a lie about what the query narrowed to.
 */
function recordIn(rows: readonly ShellRow[], id: string): ShellRow | undefined {
  return rows.find((row) => sameId(row.id, id))
}

/**
 * Puts names to the ids a query narrows by.
 *
 * A drill writes `set:"sets_10007"`, which is exactly right as a query and
 * says nothing to a reader: an id is a join key, not a name, and the header is
 * where someone has to recognise what they are looking at. So each such term
 * is looked up — one record of one type — and what comes back is the identity
 * the schema gave that type.
 *
 * The lookup is the drill's own term run back against the type it points at,
 * which is the same fact from the other end: {@link recordTerm} declares that
 * every record of a type carries its own id in that field, so the term that
 * narrows *to* a record is also the term that finds it. It does not only find
 * it, though — the term matches on a substring like every other, so what comes
 * back is whatever the id is part of and the record is the row that *has* that
 * id. A source that does not hold to any of it returns nothing and the header
 * shows the id, which is what it showed before.
 *
 * Names are kept for as long as the shell is up. An id's name does not change
 * under a query, so a lookup that lands late is still the right answer, and one
 * already made is never made twice.
 */
export function useRecordNames(options: UseRecordNamesOptions): RecordNamesState {
  const names = shallowRef<ReadonlyMap<string, string>>(new Map())

  const referenceOf = (term: SummaryTerm): Reference | null => {
    if (term.facetKey !== EXPRESSION_TERM || !term.field || !term.value) return null
    const entity = scopedEntity(options.schema.value, term.field)
    return entity ? { entity, id: term.value, key: `${entity.key}:${term.value}` } : null
  }

  /** The rows of one type that a reference could be pointing at. */
  const lookup = (reference: Reference): QueryResult | Promise<QueryResult> => {
    const { entity, id } = reference
    const query = options.query.value
    return options.source.value.query({
      query: {
        ...query,
        entity: entity.key,
        // The reference on its own. The rest of the query is about the rows on
        // screen, which are of another type entirely.
        expr: recordTerm(entity, id) ?? '',
        facets: emptyFacetState(entity),
        sort: findSort(entity, query.sort, options.schema.value).key,
        page: 1,
      },
      schema: options.schema.value,
      entity,
      limit: LOOKUP_WINDOW,
      offset: 0,
    })
  }

  /** What a type calls its records: whichever column it gave that role. */
  const identityOf = (entity: EntitySchema, row: ShellRow): string => {
    const name = cellTextOf(roleColumn(entity.columns ?? [], 'identity'), row)
    // A type that gave the role to nobody, or a record whose name is missing:
    // the dash a cell would draw in its place is not a name, and the id the
    // header already shows says more than it does.
    if (name === EMPTY_CELL) return ''
    // Nor is the id a name. Plenty of types are called what they are keyed by
    // — a tenant by its host, a profile by its directory — and there the
    // lookup has nothing to add: `host:www.example.com (www.example.com)` is
    // one fact said twice, and the plain term says it once.
    return sameId(name, row.id) ? '' : name
  }

  const run = () => {
    const wanted = new Map<string, Reference>()
    for (const term of options.terms.value) {
      const reference = referenceOf(term)
      // Already answered — including answered with nothing, which is an answer
      // and not worth asking twice.
      if (reference && !names.value.has(reference.key)) wanted.set(reference.key, reference)
    }
    if (!wanted.size) return

    const asked = [...wanted.values()].map((reference) => ({
      reference,
      outcome: lookup(reference),
    }))

    const apply = (results: QueryResult[]) => {
      // Built from what is held when the answers land rather than from what was
      // held when they were asked for, so two lookups in flight at once do not
      // write over one another.
      const next = new Map(names.value)
      results.forEach((result, at) => {
        const { reference } = asked[at] as { reference: Reference }
        const row = recordIn(result.rows, reference.id)
        next.set(reference.key, row ? identityOf(reference.entity, row) : '')
      })
      names.value = next
    }

    // A synchronous source answers within this tick, which is what lets a
    // server-rendered header carry the name rather than the bare id.
    if (asked.every(({ outcome }) => !(outcome instanceof Promise))) {
      apply(asked.map(({ outcome }) => outcome as QueryResult))
      return
    }

    void Promise.all(asked.map(({ outcome }) => Promise.resolve(outcome)))
      .then(apply)
      // A name is a courtesy: the id is still on screen, and still says which
      // record the query narrowed to.
      .catch(() => {})
  }

  watch([options.source, options.schema, options.terms], () => {
    try {
      run()
    } catch {
      /* As above — the header goes on saying what the query says. */
    }
  }, { immediate: true })

  return {
    names,
    nameOf(term) {
      const reference = referenceOf(term)
      return (reference && names.value.get(reference.key)) || null
    },
  }
}
