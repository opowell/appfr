type __VLS_Props = {
    /** The card's heading. Left out where the `head` slot says it instead. */
    title?: string;
    /**
     * What the card is *about*, where that is a record rather than a section:
     * its name, set as a title is, over the {@link reference} that says which
     * one it is. The head a record's own card wears, which every host with a
     * page about one record was otherwise writing out by hand.
     *
     * Takes the place of {@link title} in the head when both are given — a
     * card is headed by one thing, and a name is the more particular of the
     * two — and names the fold toggle in its place too. {@link count} stays
     * beside it either way. The `head` slot still replaces the lot.
     */
    name?: string;
    /**
     * The line under the {@link name}: an id, a path, a URL — whatever tells
     * this record from another with the same name. Set in the mono face, muted,
     * and free to break anywhere, since a path has nowhere else to break and
     * must not push the head's aside off the card. Drawn only under a `name`;
     * the `reference` slot says it instead where it is a link.
     */
    reference?: string;
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
    /**
     * A press on the head folds the card to the head alone, and another opens
     * it again — for a page of cards the reader wants to put some of out of the
     * way without losing their place among the rest.
     *
     * Off unless asked for. A head is where a host puts its own controls, and a
     * card that started folding on every press of its head would be a card
     * whose head a host had to audit: off, nothing a host already has changes.
     */
    collapsible?: boolean;
    /**
     * Whether the card is folded, for a host that owns that: bind
     * `v-model:collapsed` to remember it, or to fold every card at once. Left
     * unbound, the card holds it itself, starting from {@link defaultCollapsed}.
     */
    collapsed?: boolean;
    /**
     * Whether a collapsible card starts folded, where nothing binds
     * `collapsed` — the card then holds the state itself, from here.
     */
    defaultCollapsed?: boolean;
};
type __VLS_Slots = {
    /** The whole head, replacing the title and count. */
    head?: () => unknown;
    /**
     * The line under the `name`, where it is more than text — a link to the
     * record's own home, say. Read only where `name` is set.
     */
    reference?: () => unknown;
    /** The right end of the head — a link, a badge, a button. */
    aside?: () => unknown;
    /** The card's content. */
    default?: () => unknown;
    /** A row under the content, drawn as the type card's own button is. */
    foot?: () => unknown;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:collapsed": (collapsed: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:collapsed"?: ((collapsed: boolean) => any) | undefined;
}>, {
    collapsed: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
