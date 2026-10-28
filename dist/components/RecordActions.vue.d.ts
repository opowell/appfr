import type { ViewKind } from '../types';
/**
 * The head of the results: which type they are and how they are drawn, and
 * what can be done with them — make one, tick some, and copy, delete or
 * otherwise operate on what is ticked.
 *
 * The type and the view are chosen here rather than on the bar above, which
 * is the query's to narrow: both are about the results as a whole, and here
 * they are over the results they change.
 *
 * The bar over the results rather than a menu on each row, because three of
 * the four are about a *set* of records — and the fourth, making one, is what
 * you reach for from the same place, having found there is nothing here yet.
 *
 * Every one of them is named by the entity rather than assumed: a type that
 * says nothing about deleting is a type that is not deleted from here, and the
 * bar is one control shorter. A type that says nothing at all, with no choice
 * of type or view to offer either, has no bar.
 */
type __VLS_Props = {
    /** The views on offer, as `DataShell` was told them — see `ResultsArea`. */
    views?: ViewKind[];
    /** Where the list of types is a control on the bar — see `showTypes`. */
    typeChooser?: 'scoped' | 'always';
    /** Which end of the bar the count and its Clear sit at — see `selectionAtEnd`. */
    selectionPlacement?: 'start' | 'end';
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
