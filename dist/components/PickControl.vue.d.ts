export interface PickOption {
    key: string;
    label: string;
}
type __VLS_Props = {
    modelValue: string;
    options: PickOption[];
    /** Names the list for a screen reader — what the choice is *of*. */
    label: string;
    /** Render in the monospace face. */
    mono?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string) => any;
    open: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onOpen?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
