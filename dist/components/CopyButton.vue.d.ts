type __VLS_Props = {
    /**
     * What is copied. A function where the text is only known at the moment of
     * the press — what a block of code holds in its slot, read off the page.
     */
    text: string | (() => string);
    /** What the button copies, for its tooltip and for a screen reader. */
    label?: string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (error: unknown) => any;
    copied: (text: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onError?: ((error: unknown) => any) | undefined;
    onCopied?: ((text: string) => any) | undefined;
}>, {
    label: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
