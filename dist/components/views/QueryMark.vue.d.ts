import type { PresentedRow } from '../../composables/usePresentedRows';
/**
 * Where the query stands on this record: a `+` where it narrows to it, a `−`
 * where it leaves it out, and nothing at all for the rows — nearly all of
 * them — the query says nothing about.
 *
 * A list of a type does not apply the term on its own scope to itself, so a
 * categories table narrowed to one category lists every category, and this
 * is what says which. Pressing it lifts the term, whichever way round it was
 * said: the record goes back to being one the query does not mention, and
 * the screen stays where it is. Adding the term is the row's own press, or
 * the `→` beside it, and is not repeated here.
 */
type __VLS_Props = {
    entry: PresentedRow;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
