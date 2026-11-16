import type { ViewKind } from '../types';
/**
 * Which type the results are, and how they are drawn: the two choices about
 * the results as a whole rather than about which of them match, set before
 * the query on the bar. Renders nothing where there is nothing to choose.
 */
type __VLS_Props = {
    /** The views on offer, as `DataShell` was told them — see `ResultsArea`. */
    views?: ViewKind[];
    /** Where the list of types is a control on the bar — see `showTypes`. */
    typeChooser?: 'scoped' | 'always';
    /**
     * Drawn in a side panel rather than on a bar: one under the other, and the
     * views as a row of every one on offer rather than a list that opens.
     */
    stacked?: boolean;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
