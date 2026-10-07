import type { PresentedRow } from '../../composables/usePresentedRows';
/**
 * The table's `+ · −` on one row of a list or a card: where the query stands
 * on this record, as a thing to set.
 *
 * It is the way to leave a record out — or take it back — without knowing a
 * key for it: ⌥-click does the same from the row's name, but a modifier nobody
 * has been told about is a feature nobody finds. And it says where the query
 * stands as it does, the lit sign being the mark a row the query names wears.
 *
 * Nothing for a row of a type that declares no scope: no term can name it.
 */
type __VLS_Props = {
    entry: PresentedRow;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
