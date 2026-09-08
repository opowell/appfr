/**
 * The picture a record's `image` column names, wherever a view draws one.
 *
 * Two things every view of a picture needs and none of them should repeat.
 * A source that does not load leaves nothing behind rather than the browser's
 * broken-image mark: a catalogue addresses pictures it does not host, so a
 * record whose picture has moved is a card without one, which is what a record
 * that never had one already is.
 *
 * And no alternative text. The name is beside it in every view that draws
 * this, so a screen reader that read the picture as well would read the record
 * twice — see {@link https://www.w3.org/WAI/tutorials/images/decorative/}.
 */
type __VLS_Props = {
    /** The `src`, which the view resolved from the row's `image` role. */
    src: string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
