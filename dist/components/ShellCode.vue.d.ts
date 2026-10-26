type __VLS_Props = {
    /** The text. The default slot gives it instead. */
    code?: string;
    /**
     * The tallest the block grows before it scrolls in place — a CSS length,
     * or a number of pixels. Unbounded where left out.
     */
    maxHeight?: string | number;
    /** Puts a copy button at the block's top right corner. */
    copy?: boolean;
    /** What the copy button copies, for its tooltip and for a screen reader. */
    copyLabel?: string;
    /**
     * Long lines wrap rather than scroll sideways — on by default, since most
     * of what lands here is read rather than lined up. Off for text whose
     * columns mean something.
     */
    wrap?: boolean;
    /** `danger` for an error: a red rule down its side and a red tint. */
    tone?: 'danger';
};
type __VLS_Slots = {
    /** The text, where it is not the `code` prop. */
    default?: () => unknown;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (error: unknown) => any;
    copied: (text: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onError?: ((error: unknown) => any) | undefined;
    onCopied?: ((text: string) => any) | undefined;
}>, {
    code: string;
    maxHeight: string | number;
    tone: "danger";
    copyLabel: string;
    wrap: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
