import type { ColumnDef } from '../../types';
import type { PresentedRow } from '../../composables/usePresentedRows';
/**
 * A value, as a button when its column's `drill` says the number counts
 * something the schema also lists: clicking `12` under **Colors** means "show
 * me those twelve", which is the one thing a count is ever wanted for.
 *
 * A number that counts nothing listable renders as the plain text it was, so
 * a view can put every metric through here without deciding anything itself.
 * The root element carries the caller's scope id either way, so the view goes
 * on styling the cell as it always did.
 */
type __VLS_Props = {
    entry: PresentedRow;
    /** The column this value came from — what says where pressing it leads. */
    column: ColumnDef;
};
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
