import type { ColumnDef, EntitySchema, ShellRow } from '../types';
import type { FieldTerm } from '../data/expression';
/**
 * What pressing a cell's value narrows the list to.
 *
 * A table answers "which rows are like this one?" as often as "what is this
 * row?" — every host at 0% recorded, every deployed host, everything built
 * from `dO` — and the query can already say each of those. So the value says
 * it: a press adds the term that keeps the rows sharing it.
 *
 * - **A number** keeps its end of the range: `recorded<=0` for 0%, where the
 *   range runs from 0 to 1, and `recorded>=0.99` for 99%. The range is the
 *   column's facet's where it has one, and the rows on screen otherwise.
 * - **Any other value** keeps that value, whole: `container=dO`,
 *   `source=news.ycombinator.com`.
 * - **A flag** keeps the rows it is set on: `deployed:true`, one term per word
 *   of a {@link ColumnDef.flags} column, each word its own press.
 * - **The row's type** — a column on `entityKey` or `entityLabel`, like
 *   `entityColumn()`'s — keeps the rows of that type: `entity=results`.
 *   The label is no field a query can read; `entity` is the term for a type.
 *
 * The identity is not one of these: it says which row this is, not which rows
 * are like it, so a press on it goes to the record. Nor is a date, which is
 * rarely shared, or a picture, which has no term a press could mean. Pure, so
 * what each cell offers is tested without a browser.
 */
/** One press in a cell: what it is on, and the term it adds. */
export interface CellNarrowing {
    /** The word it is on, for a cell of several; null for the cell's text as a whole. */
    label: string | null;
    term: FieldTerm;
}
/** The lowest and highest a number column runs to. */
export interface NumberRange {
    min: number;
    max: number;
}
/**
 * Whether a column's cells are offered as presses at all. Not where the
 * column says not, nor where the cell names the row or is pressed for something
 * else already.
 */
export declare function columnNarrows(column: ColumnDef): boolean;
/**
 * The range a number column runs over `rows` — what {@link cellNarrowings}
 * measures a value against where the column has no facet. Null where no row
 * holds a number.
 */
export declare function numberRange(column: ColumnDef, rows: readonly ShellRow[]): NumberRange | null;
/**
 * The presses a cell offers: none, one for the whole of it, or one per word.
 * `range` is the column's over the rows on screen — see {@link numberRange} —
 * and only read for a number whose column has no range facet.
 */
export declare function cellNarrowings(column: ColumnDef, row: ShellRow, entity: EntitySchema | null, range?: NumberRange | null): CellNarrowing[];
