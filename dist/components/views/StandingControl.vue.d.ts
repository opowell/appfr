import type { TermStanding } from '../../query/drill';
/**
 * Where the query stands on a record, as a thing to set: `+` narrows to it,
 * `−` leaves it out, and the dot between them says nothing about it — which
 * is where nearly every record of nearly every query stands.
 *
 * One control drawn in two places: on every row of a table whose type can be
 * named, and at the head of that column, where the same three presses reach
 * every row on the page at once — or the ticked ones, where any are. The
 * head's `standing` is then what those rows agree on, and `mixed` where they
 * do not, in which case none of the three is lit.
 */
type __VLS_Props = {
    standing: TermStanding | null;
    /** The rows this speaks for do not all stand the same way. */
    mixed?: boolean;
    /** What the record, or the rows, are called — for the three hints. */
    name: string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    set: (standing: TermStanding | null) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSet?: ((standing: TermStanding | null) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
