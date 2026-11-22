type __VLS_Slots = {
    /** Extra controls at the right end of the bar. */
    actions?: () => unknown;
    /** Controls before the query, after the domain's name. */
    lead?: () => unknown;
    /**
     * The domain's mark, drawn in place of its name — see `brand` on
     * `DataShell`. The name stays the bar's accessible text.
     */
    brand?: (props: {
        label: string;
    }) => unknown;
};
type __VLS_Props = {
    /**
     * Drawn at the head of a side panel rather than as the bar over the
     * results: no name (the host's own row over it is the way home), and the
     * query's parts wrapping onto as many lines as they take.
     */
    panel?: boolean;
    /**
     * Drawn over the records in a panel layout whose query is on top (see
     * `queryOnTop` on `DataShell`): no name, the host's way home being before
     * it, and the field a rounded box with a magnifier, its parts on one line
     * as on the bar, so that the records under it never move.
     */
    top?: boolean;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
