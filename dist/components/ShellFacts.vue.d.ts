import type { ShellFactItem } from '../types';
type __VLS_Props = {
    /** The facts that are text, in order. */
    items?: ShellFactItem[];
    /**
     * The narrowest a column may be before the grid drops one — any CSS
     * length. Wide enough for a date and time with its label above.
     */
    min?: string;
};
type __VLS_Slots = {
    /** `<ShellFact>` children, after the items. */
    default?: () => unknown;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    min: string;
    items: ShellFactItem[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
