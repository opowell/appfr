type __VLS_Props = {
    /** The card's heading. Left out where the `head` slot says it instead. */
    title?: string;
    /**
     * The number beside the heading, as a type card carries its population.
     * A string, so it is formatted the way the host formats its own counts.
     */
    count?: string | number;
    /**
     * Takes the whole width of the card grid, however many columns that is —
     * for the cards a share of a row would cut short: a record's own heading,
     * a block of source, a wide table.
     *
     * `'all'` is the only value, and deliberately: a card asking for *two* of
     * however many columns there are forces a second column into existence
     * when the grid has room for one, so a phone got two tracks of which the
     * second was 56px wide. `1 / -1` spans whatever is there and can never
     * add to it.
     */
    span?: 'all';
    /**
     * Drops the body's padding, for content that draws its own edges — a
     * table, a `<pre>`, a log pane.
     */
    flush?: boolean;
    /**
     * Draws the card as the shell draws a type with nothing in it: present,
     * and quieter than the cards that hold something.
     */
    muted?: boolean;
};
type __VLS_Slots = {
    /** The whole head, replacing the title and count. */
    head?: () => unknown;
    /** The right end of the head — a link, a badge, a button. */
    aside?: () => unknown;
    /** The card's content. */
    default?: () => unknown;
    /** A row under the content, drawn as the type card's own button is. */
    foot?: () => unknown;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
