import type { ComputedRef } from 'vue';
import type { EntityLabels, EntitySchema, ShellRow } from '../types';
import { GENERIC_LABELS } from '../query/schema';
export { GENERIC_LABELS };
/**
 * A row with its display strings resolved once. Views render these instead of
 * formatting inline, so the list, table, cards and grid can never disagree
 * about how a metric or a date looks.
 */
export interface PresentedRow {
    row: ShellRow;
    /**
     * What the views track this row by: its id, or its place in the result where
     * a source returned none. Rows keyed alike are rows a renderer reuses for
     * each other, so this is never empty and never repeats within a page.
     */
    key: string;
    /** The row's entity, worth showing only when the results span several. */
    entityLabel: string;
    /**
     * The schema of that entity, or null for a row of a type the schema no
     * longer declares. Views read what the type *offers* from here — whether it
     * is narrowable, and what its metrics count.
     */
    entity: EntitySchema | null;
    /**
     * Field names from the row's *own* entity. In a mixed result set this beats
     * a generic fallback: a log entry can be labelled "Trace id" while a LEGO
     * set beside it says "Set number".
     */
    labels: EntityLabels;
    ordinal: string;
    metric1: string;
    metric2: string;
    date: string;
    score: string;
    percent: string;
    pinned: boolean;
}
/** The column names for the current scope, generic across the whole corpus. */
export declare function useViewLabels(): ComputedRef<EntityLabels>;
/**
 * Resolves one row's display strings. Pure, so the per-type cards on the home
 * screen format their rows exactly as the record views do.
 */
export declare function presentRow(row: ShellRow, index: number, entity: EntitySchema | null, pinned: boolean): PresentedRow;
export declare function usePresentedRows(): ComputedRef<PresentedRow[]>;
