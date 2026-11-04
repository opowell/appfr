import type { ComputedRef, Ref, ShallowRef } from 'vue';
import type { ShellRow } from '../types';
export interface UseHeldRecordOptions {
    /** Whether the rows are being read a record at a time. */
    active: ComputedRef<boolean>;
    /** The rows of the page, which while reading is the one row. */
    rows: ShallowRef<ShellRow[]>;
    pending: Ref<boolean>;
    /** The page on screen, which while reading is the record's place. */
    page: ComputedRef<number>;
    /** Says which list the rows are of: a change here is another list. */
    list: ComputedRef<string>;
    /** Where a row now sits in the results, or null where it was not found. */
    locate(id: string, place: number): Promise<number | null>;
    /** Moves the page without a step: the place of the same record has changed. */
    moveTo(page: number): void;
}
export interface HeldRecordState {
    /** The record being read, or null while there is none to hold yet. */
    id: ComputedRef<string | null>;
    /** Whether that record has left the results and is only still being read. */
    gone: ComputedRef<boolean>;
    /** Whether a record is held at all, whatever has become of its row. */
    holding: ComputedRef<boolean>;
    /**
     * The page to go to for a step to `page`, as the reader counts — see below —
     * or null where the step has been taken without going anywhere.
     */
    step(page: number): number | null;
    /** Moves the place of a record that has gone, the results having shrunk past it. */
    moveTo(page: number): void;
}
/**
 * Holds on to the record being read while the rows under it change.
 *
 * Read is a page a record, so what it draws would otherwise be whatever row
 * has that place: a search still running moves its rows around, and a reader
 * would see the record swapped for another while reading it — and where
 * reading a record is what takes it out of the results, go on to read every
 * one after it. So a record once on screen stays until the reader moves: the
 * rows changing moves the *place* to the record, and only a change of page,
 * or of list, moves the record to the place.
 *
 * A record that leaves the results stays counted where it was until the reader
 * steps away, as though it were still there. That is what keeps a step honest:
 * what was the next record now has this one's place, and a page count that
 * had forgotten this one would step straight over it. {@link HeldRecordState.step}
 * is the translation, and the shell's `pageCount` adds the one back.
 */
export declare function useHeldRecord(options: UseHeldRecordOptions): HeldRecordState;
