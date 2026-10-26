import type { PresentedRow } from '../../composables/usePresentedRows';
/**
 * "Open where it lives" — offered on a row whose type says its records live
 * somewhere outside the shell ({@link EntitySchema.href}), where a press on
 * the row is not already the way there.
 *
 * Which is only where the press narrows: a type with a `scope`, under the
 * default `rowPress`. There the row's name is spent on narrowing to the
 * record, and the record's own page — a site, a page of the host's — needs a
 * press of its own. Everywhere else the name *is* the link (see `pressHref`),
 * and a second control for the same move would be the smaller one of two.
 *
 * A plain link, in a new tab: nothing of the shell's is done on the way, so
 * there is no press to intercept — the browser's own ways of opening a link
 * all work on it as they do anywhere — and a page elsewhere is a detour from
 * the query, not a step in it.
 */
type __VLS_Props = {
    entry: PresentedRow;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
