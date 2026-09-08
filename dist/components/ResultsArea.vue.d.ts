import type { ViewKind } from '../types';
type __VLS_Props = {
    /**
     * The views on offer, when the host restricts them. A URL naming one that is
     * not on the list — a link kept from before it was taken off — renders the
     * first that is, rather than a view with no way back to it in the panel.
     */
    views?: ViewKind[];
};
/**
 * Passed straight through to the per-type cards, which is the one view they
 * mean anything in: a card of the host's own belongs in a grid of cards, and
 * the other five views are rows and tiles of records.
 */
type __VLS_Slots = {
    'cards-before'?: () => unknown;
    'cards-after'?: () => unknown;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
