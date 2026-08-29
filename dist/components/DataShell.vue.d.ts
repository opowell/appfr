import '../style/tokens.css';
import type { DataSource, DomainSchema, EntitySchema, ShellAlign, ShellQuery, ShellQueryDefaults, ShellRow, ShellTheme, ShellWidthMatch, ViewKind } from '../types';
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
     * working without and no more. `mono-size` is that theme with its type
     * scale collapsed too, so every word — headings, URLs, inputs, tags — is
     * set at one size and one weight, and colour and opacity are all that
     * separate them. `auto` follows the system setting. `macos` and `windows`
     * wear that system's typography, corners and accent, and follow its
     * scheme too.
     * `inherit` brings no palette at all: the shell takes the host's
     * background, text colour and font.
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
     * Both of these are optionally controlled: bind `v-model:open` or
     * `v-model:pinned` to own the state, or leave them alone and the shell keeps
     * it internally. `defineModel` distinguishes the two by whether the prop was
     * actually passed, which a plain boolean prop cannot do — Vue casts an absent
     * boolean to `false`.
     */
    'open'?: boolean;
    'pinned'?: string[];
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_PublicProps, {
    query: import("vue").ComputedRef<ShellQuery>;
    openPanel: () => void;
    closePanel: typeof closePanel;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    activate: (row: ShellRow) => any;
    create: (entity: EntitySchema) => any;
    "query-change": (query: ShellQuery) => any;
    "toggle-pin": (row: ShellRow) => any;
    "update:open": (value: boolean) => any;
    "update:pinned": (value: string[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onActivate?: ((row: ShellRow) => any) | undefined;
    onCreate?: ((entity: EntitySchema) => any) | undefined;
    "onQuery-change"?: ((query: ShellQuery) => any) | undefined;
    "onToggle-pin"?: ((row: ShellRow) => any) | undefined;
    "onUpdate:open"?: ((value: boolean) => any) | undefined;
    "onUpdate:pinned"?: ((value: string[]) => any) | undefined;
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
