import type { PresentedRow } from '../../composables/usePresentedRows';
/**
 * "Narrow to this one" — offered on a row whose entity declares `scope`, which
 * is the entity saying that every other record names this one.
 *
 * The arrow is the same mark the home screen's card headers wear for narrowing
 * to a type, so the gesture reads the same at both scales: there it is "only
 * tenants", here it is "only this tenant". Opening the record is still the
 * name beside it — this is the other half of a row, not a second way in.
 */
type __VLS_Props = {
    entry: PresentedRow;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
