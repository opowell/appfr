import type { ViewKind } from '../types';
type __VLS_Props = {
    /** Views to offer, when the host restricts them. Defaults to all six. */
    views?: ViewKind[];
    /**
     * What the count is short of, in the host's words — `first 1,200 of 30,200
     * lots`. Said where the count is, which is the pager's hover text, rather
     * than on the bar beside it.
     */
    pagesNote?: string;
    /**
     * Leave the pager off the bar — while the results are not yet the data
     * (`loading` on `DataShell`), or under a page of the host's, where there
     * is nothing to page.
     */
    hidePages?: boolean;
};
type __VLS_Slots = {
    /** Extra controls at the right end of the bar. */
    actions?: () => unknown;
    /**
     * The domain's mark, drawn in place of its name — see `brand` on
     * `DataShell`. The name stays the bar's accessible text.
     */
    brand?: (props: {
        label: string;
    }) => unknown;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
