import type { ViewKind } from '../types';
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
    /** Views to offer, when the host restricts them. Defaults to all six. */
    views?: ViewKind[];
    /** Where the list of types is a control on the bar — see `showTypes`. */
    typeChooser?: 'scoped' | 'always';
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
    /**
     * Leave the View chooser off the bar, under a page of the host's: how the
     * results are drawn means nothing where they are not.
     */
    hideViews?: boolean;
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
