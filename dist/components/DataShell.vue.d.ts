import '../style/tokens.css';
import type { DataSource, DomainSchema, EntitySchema, Selection, ShellAlign, ShellQuery, ShellQueryDefaults, ShellRow, ShellTheme, ShellWidthMatch, ViewKind } from '../types';
import type { RouteAdapter } from '../routing/adapter';
import type { NavigationMode } from '../composables/useQueryState';
type __VLS_Props = {
    /** The vocabulary the shell renders: entities, facets, labels, samples. */
    schema: DomainSchema;
    /**
     * Where rows come from. Defaults to a deterministic mock source over the
     * schema's own samples, so the shell is demonstrable — and testable — with
     * nothing behind it.
     */
    source?: DataSource;
    /**
     * How the query reaches the URL. Defaults to an injected adapter, or a
     * History API adapter when nothing is provided.
     */
    route?: RouteAdapter;
    /** Query fields to fall back to when the URL omits them. */
    defaults?: ShellQueryDefaults;
    /**
     * An expression the whole shell is read *inside* — its scope, held here
     * rather than in the URL.
     *
     * It is ANDed on to every query the shell runs: the result set, the
     * per-type cards on the home screen, and the counts beside each type. So
     * the header says what matched *within* it, and no part of the bar lifts
     * it, because it is not something the reader asked for — it is what this
     * shell is about. A page for one record is the case it exists for:
     * `within="test:&quot;x.spec.ts&quot;"` and the home screen becomes a card
     * per type of everything that names that record.
     *
     * The query the reader does own goes on working as it always did, inside
     * this. Nothing here reaches the URL, so the same URL under a different
     * scope is a different set of rows — which is right for a scope that comes
     * from the route rather than from the query.
     */
    within?: string;
    /**
     * Rows per page: the most the source is asked for at once. The header
     * offers the pages this divides the results into, and the page itself is
     * in the URL.
     */
    limit?: number;
    /**
     * Rows shown inside each type's card on the home screen — the most
     * recently updated few, under the current sort.
     */
    previewsPerType?: number;
    /** Restricts the offered result views. */
    views?: ViewKind[];
    /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
    accent?: string;
    /**
     * Design tokens set on the shell element — `{ '--dc-surface': '#101418' }`.
     * Setting a seed (`--dc-surface`, `--dc-ink`, `--dc-accent`) moves every
     * value derived from it; setting a derived token overrides just that one.
     */
    tokens?: Record<string, string>;
    /**
     * `minimal`, the default, is paper, ink and hairlines with nothing else
     * on: no hue, no shadow, no rounded corner — the values the layout stops
     * working without and no more. `auto` follows the system setting. `macos`
     * and `windows` wear that system's typography, corners and accent, and
     * follow its scheme too.
     * `inherit` brings no palette at all: the shell takes the host's
     * background, text colour and font. `mono-size` is `inherit` with the
     * type scale given up as well — every word, headings and URLs and inputs
     * and tags alike, set at the host's one size and one weight — for a host
     * that has already decided how text looks.
     */
    theme?: ShellTheme;
    /**
     * How the header bar and the panel that drops from it are brought to one
     * width. `grow`, the default, widens the panel to the bar, so the query
     * opens over exactly what it summarizes however wide the shell is.
     * `shrink` brings the bar in to the panel instead — to `--dc-header-width`
     * — which keeps a query off the far edges of a very wide screen.
     */
    matchWidth?: ShellWidthMatch;
    /**
     * Where that narrowed pair sits across the shell. Only `shrink` leaves
     * anything to align: a panel grown to a full-width bar already spans it.
     */
    headAlign?: ShellAlign;
    /** Offers the star affordance on rows. */
    pinnable?: boolean;
    /**
     * Offers the tick on rows whether or not the type being listed names an
     * operation for a selection. A type that names `duplicate` or `delete`
     * offers ticks anyway — this is for a host whose bulk action is its own,
     * reading `v-model:selected` and doing the rest itself.
     */
    selectable?: boolean;
    navigationMode?: NavigationMode;
    facetNavigationMode?: NavigationMode;
};
type __VLS_Slots = {
    /** Extra controls at the right end of the header bar. */
    actions?: () => unknown;
    /**
     * A section of your own at the end of the query panel — for the controls
     * that belong to the application rather than to the query, which the header
     * bar would otherwise have to carry beside the summary it is there to show.
     */
    'panel-section'?: () => unknown;
    /**
     * Cards of the host's own, above and below the card-per-type screen — the
     * things a shell read inside one record has to say that no type of record
     * holds. They are grid cells of the same grid, so `<ShellCard>` is what
     * makes one look like the cards it sits among, and `span` is how one takes
     * more of the row than a type card does.
     *
     * Only the per-type screen has them, that being the only view made of cards
     * rather than of records: `Everything` chosen, `Cards` drawn.
     */
    'cards-before'?: () => unknown;
    'cards-after'?: () => unknown;
    /** Replaces the entire results area. */
    results?: (props: {
        /** The current page of rows, not the whole result. */
        rows: ShellRow[];
        /** Rows matching the query, across every page of them. */
        total: number;
        /** Rows before the first of `rows` — for numbering that keeps counting. */
        offset: number;
        pageCount: number;
        query: ShellQuery;
        pending: boolean;
    }) => unknown;
};
declare function closePanel(): void;
type __VLS_PublicProps = __VLS_Props & {
    /**
     * Each of these is optionally controlled: bind `v-model:open`,
     * `v-model:pinned` or `v-model:selected` to own the state, or leave them alone
     * and the shell keeps it internally. `defineModel` distinguishes the two by
     * whether the prop was actually passed, which a plain boolean prop cannot do —
     * Vue casts an absent boolean to `false`.
     */
    'open'?: boolean;
    'pinned'?: string[];
    /** Which records are ticked, by id — see the `Selection` an operation carries. */
    'selected'?: string[];
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_PublicProps, {
    query: import("vue").ComputedRef<ShellQuery>;
    openPanel: () => void;
    closePanel: typeof closePanel;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    create: (entity: EntitySchema) => any;
    duplicate: (selection: Selection) => any;
    delete: (selection: Selection) => any;
    drill: (row: ShellRow, entity: EntitySchema | null) => any;
    activate: (row: ShellRow) => any;
    "query-change": (query: ShellQuery) => any;
    "toggle-pin": (row: ShellRow) => any;
    "update:open": (value: boolean) => any;
    "update:pinned": (value: string[]) => any;
    "update:selected": (value: string[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onCreate?: ((entity: EntitySchema) => any) | undefined;
    onDuplicate?: ((selection: Selection) => any) | undefined;
    onDelete?: ((selection: Selection) => any) | undefined;
    onDrill?: ((row: ShellRow, entity: EntitySchema | null) => any) | undefined;
    onActivate?: ((row: ShellRow) => any) | undefined;
    "onQuery-change"?: ((query: ShellQuery) => any) | undefined;
    "onToggle-pin"?: ((row: ShellRow) => any) | undefined;
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
    "onUpdate:pinned"?: ((value: string[]) => any) | undefined;
    "onUpdate:selected"?: ((value: string[]) => any) | undefined;
}>, {
    limit: number;
    previewsPerType: number;
    theme: ShellTheme;
    matchWidth: ShellWidthMatch;
    headAlign: ShellAlign;
    navigationMode: NavigationMode;
    facetNavigationMode: NavigationMode;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
