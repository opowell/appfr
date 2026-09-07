import type { ShellRow } from '../../types';
/**
 * The tick that says a record is one of the ones an operation is for.
 *
 * A box rather than a mark of the shell's own, because this is the one
 * affordance every reader already knows: a ticked box is a chosen thing, and
 * nothing about a bulk operation is worth teaching.
 */
type __VLS_Props = {
    row: ShellRow;
    selected: boolean;
    /** What to call the record. Its identity column, resolved by the view. */
    name: string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
