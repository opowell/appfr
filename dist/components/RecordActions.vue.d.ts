import type { ViewKind } from '../types';
/**
 * The head of the results: what they are ordered by, and what can be done
 * with them — make one, tick some, and copy, delete or otherwise operate on
 * what is ticked. Which type they are and how they are drawn are chosen on the
 * bar, before the query — see `RecordChoosers`. The pages are here, stepping
 * through the results rather than narrowing the query.
 *
 * The bar over the results rather than a menu on each row, because three of
 * the four are about a *set* of records — and the fourth, making one, is what
 * you reach for from the same place, having found there is nothing here yet.
 *
 * Every one of them is named by the entity rather than assumed: a type that
 * says nothing about deleting is a type that is not deleted from here, and the
 * bar is one control shorter. A type that says nothing at all, with no order
 * or pages to offer either, has no bar.
 */
type __VLS_Props = {
    /** The views on offer, as `DataShell` was told them — see `ResultsArea`. */
    views?: ViewKind[];
    /** Which end of the bar the count and its Clear sit at — see `selectionAtEnd`. */
    selectionPlacement?: 'start' | 'end';
    /** What the count is short of, in the host's words — see `ShellPager`. */
    pagesNote?: string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
