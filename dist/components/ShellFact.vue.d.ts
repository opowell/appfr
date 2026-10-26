import type { ShellFactValue } from '../types';
type __VLS_Props = {
    /** What the value is. The `label` slot says it instead where given. */
    label?: string;
    /**
     * The value, where it is text. A list is a line per entry — the URLs a
     * spec recorded, the files a profile holds — and nothing at all, an empty
     * string or an empty list is the shell's dash, so a fact that is absent
     * still says so. The default slot replaces it.
     */
    value?: ShellFactValue;
    /** The value's tooltip — the exact figure behind a rounded one, say. */
    title?: string;
    /**
     * Takes a whole row of the grid — for a value a column would wrap into a
     * paragraph: a command line, a sentence.
     */
    wide?: boolean;
};
type __VLS_Slots = {
    /** The label, where it is more than words. */
    label?: () => unknown;
    /** The value, where it is more than text. */
    default?: () => unknown;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
