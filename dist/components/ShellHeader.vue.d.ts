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
declare const __VLS_component: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
