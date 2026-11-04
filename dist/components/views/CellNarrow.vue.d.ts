import type { ColumnDef } from '../../types';
import type { PresentedRow } from '../../composables/usePresentedRows';
import type { CellNarrowing } from '../../query/narrowing';
/**
 * A value that narrows the list to the rows sharing it — see
 * `cellNarrowings`. One press for the whole cell, or one per word where the
 * cell is several (a flag column's `deployed, covered`), with the words
 * between them drawn as they were.
 *
 * The term is ANDed on to the query, as one typed in the box is: added to
 * each alternative, and turning a term the query holds the other way round.
 * The type and the view stay; it is a refinement of this list, not a move to
 * another.
 */
type __VLS_Props = {
    entry: PresentedRow;
    column: ColumnDef;
    narrowings: CellNarrowing[];
    /** Whether the cell cuts its text short, as {@link ColumnDef.truncate} asks. */
    truncates: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
