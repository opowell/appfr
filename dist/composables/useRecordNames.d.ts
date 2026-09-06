import type { ComputedRef, ShallowRef } from 'vue';
import type { DataSource, DomainSchema, ShellQuery } from '../types';
import type { SummaryTerm } from '../query/summary';
export interface UseRecordNamesOptions {
    source: ComputedRef<DataSource>;
    schema: ComputedRef<DomainSchema>;
    /** The query the names are for, for the sort a lookup asks in. */
    query: ComputedRef<ShellQuery>;
    /** The terms to read: whichever of them name a record are looked up. */
    terms: ComputedRef<SummaryTerm[]>;
}
export interface RecordNamesState {
    /** The names found so far, keyed by type and id. */
    names: ShallowRef<ReadonlyMap<string, string>>;
    /**
     * What the record a term names is called, or null where the term names no
     * record — or where nothing has come back about it yet.
     */
    nameOf(term: SummaryTerm): string | null;
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
 * narrows *to* a record is also the term that finds it. A source that does not
 * hold to that returns nothing and the header shows the id, which is what it
 * showed before.
 *
 * Names are kept for as long as the shell is up. An id's name does not change
 * under a query, so a lookup that lands late is still the right answer, and one
 * already made is never made twice.
 */
export declare function useRecordNames(options: UseRecordNamesOptions): RecordNamesState;
