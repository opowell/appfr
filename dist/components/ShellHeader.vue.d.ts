type __VLS_Props = {
    expanded: boolean;
    /** Id of the panel this bar controls, for `aria-controls`. */
    panelId: string;
    /**
     * Leave the live match count off the type in force, e.g. while a detail view
     * is open: the list of types then says what each of them holds, rather than
     * what the query behind the detail matched.
     */
    hideCount?: boolean;
};
declare var __VLS_1: {};
type __VLS_Slots = {} & {
    actions?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    toggle: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onToggle?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
