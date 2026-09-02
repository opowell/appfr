import type { ComputedRef } from 'vue';
import type { ColumnDef, EntitySchema, RecordStatus, ShellRow } from '../types';
/**
 * One metric of a row, with the column that knows what it is: its heading, its
 * formatted value, and whether pressing it narrows to what it counts.
 */
export interface RowMetric {
    column: ColumnDef;
    label: string;
    text: string;
}
/**
 * The parts a view that is not a table is made of.
 *
 * A card, a tile, a link row and a preview pane are an identity, a reference,
 * a number or two and a mark — never a list of columns — so they read this
 * instead of the row. Every part comes from the column that declared the
 * matching {@link ColumnRole}, and is empty or null where the schema declared
 * no column for it.
 */
export interface RowParts {
    identity: string;
    reference: string;
    /** The metric columns, in the order the schema declared them. */
    metrics: RowMetric[];
    state: RecordStatus | null;
    /** 0–1, or null where no column plays the part. */
    score: number | null;
    percent: string;
    /** The date, formatted the way every view formats it. */
    updated: string;
    /** A colour for the grid view's tile, where a column names one. */
    tint: string | null;
}
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
     * is narrowable, and what its columns say its fields are.
     */
    entity: EntitySchema | null;
    /**
     * That entity's own columns. In a mixed result set this beats the scope's:
     * a log entry is read in its own vocabulary while a LEGO set beside it is
     * read in its.
     */
    columns: ColumnDef[];
    ordinal: string;
    parts: RowParts;
    pinned: boolean;
}
/** Resolves the roles a view reads, from the columns of the row's own type. */
export declare function presentParts(row: ShellRow, columns: ColumnDef[]): RowParts;
/**
 * Resolves one row's display strings. Pure, so the per-type cards on the home
 * screen format their rows exactly as the record views do.
 */
export declare function presentRow(row: ShellRow, index: number, entity: EntitySchema | null, pinned: boolean): PresentedRow;
export declare function usePresentedRows(): ComputedRef<PresentedRow[]>;
