import type { ColumnDef } from '../../types';
import type { PresentedRow } from '../../composables/usePresentedRows';
/**
 * One cell, drawn the way its {@link ColumnDef} says.
 *
 * The `<td>` around this belongs to the table — the width, the alignment and
 * whether the column is on screen at this size are the table's business. What
 * is *inside* it is the column's, and this is the whole of that: a value read
 * off the row, formatted by the column or by its kind, and made pressable when
 * the column says pressing it leads somewhere.
 */
type __VLS_Props = {
    column: ColumnDef;
    entry: PresentedRow;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
