import '../style/shell.css';
import type { Component } from 'vue';
import type { DataSource, DomainSchema, EntitySchema, PressOptions, Selection, ShellQuery, ShellQueryDefaults, ShellRow, ViewsOption } from '../types';
import type { ShellTheme } from 'themes';
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
     * recently updated few, under the current sort. `0` draws each card as its
     * heading alone, the type and its count, in narrower columns that wrap.
     */
    previewsPerType?: number;
    /**
     * Restricts the offered result views. One on offer leaves the bar without
     * a View chooser.
     *
     * Or a function of what the query is about, for a host whose screens each
     * want their own — asked again whenever the type in force or the records
     * the query narrows to change, with both: `({ entity, records }) =>
     * entity ? ['table'] : records.length ? ['cards'] : ['table', 'cards']`.
     * It saves the host reading the query back out of the URL to decide, and
     * the shell has already read it.
     */
    views?: ViewsOption;
    /**
     * Whether what the source answers is not yet the data: the host's
     * payloads are still on their way, and a synchronous source over none of
     * them says, truthfully, "no rows, nought of nought".
     *
     * The shell believes a count — it corrects a page past the end of the
     * results to the last page there is — so a link to `?p=7` opened before
     * the rows had landed would be rewritten to page 1, and the rows it named
     * never seen. While this is true the results area says it is loading
     * rather than what matched, and nothing is corrected from a count; when
     * it turns false the shell reads the URL against the results as if it had
     * only just been mounted, and corrects then if there is anything to.
     *
     * The header stays up the whole time, so the query can still be read and
     * edited — what it cannot yet say is how many matched, so the pager is off
     * the bar until it can.
     */
    loading?: boolean;
    /**
     * Whether a `page` is about the query. Read only while one is provided.
     *
     * `shell`, the default, is a page whose input the query is — a form that
     * runs every spec the query matches: the bar reads the URL the page is
     * on, and an edit to it stays on that page, narrowing what it acts on.
     *
     * `detached` is a page that is about something else — a form making a
     * new record, a report on one run — and only shares the bar. Its URL's
     * parameters are the page's own (`?crawl=…`), not a query, so the bar
     * reads the pristine one, `Everything`; and the first edit to it is a way
     * back to the list — it navigates to {@link listPath} with that edit
     * applied, pushing, so Back returns to the page.
     */
    pageQuery?: 'shell' | 'detached';
    /**
     * Where a detached page's first edit to the bar lands — the path the
     * list is at. `/` unless it says otherwise: the root of a vue-router app
     * (its `base` and hash are the router's to add) and of a memory adapter.
     * A shell mounted below the root under the History API says its own.
     */
    listPath?: string;
    /**
     * A card set of the host's own per record the query narrows to, by the
     * record's type — `{ tests: TestCards }` — rendered as `<component :is
     * :id>` where the `record` slot would be. The shorthand for a slot that
     * would only look the component up; a type with no entry here has no
     * cards of its own. The slot wins where both are given.
     */
    recordCards?: Record<string, Component>;
    /**
     * Where the bar offers the list of types. `scoped`, the default, only
     * while one is filtered to — on `Everything` the home screen's cards are
     * each headed by their type already. `always` keeps it on `Everything`
     * too, for a home screen that opens as records rather than as type cards.
     */
    typeChooser?: 'scoped' | 'always';
    /**
     * Where the strip over the results says how many are ticked, with its
     * Clear. `start`, the default, leads the strip after the choosers, the
     * Clear a quiet word. `end` sets both at the far end beside the operations
     * they are the count for, the Clear drawn as one of their buttons.
     */
    selectionPlacement?: 'start' | 'end';
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
    /** Offers the star affordance on rows. */
    pinnable?: boolean;
    /**
     * Offers the tick on rows whether or not the type being listed names an
     * operation for a selection. A type that names `duplicate` or `delete`
     * offers ticks anyway — this is for a host whose bulk action is its own,
     * reading `v-model:selected` and doing the rest itself.
     */
    selectable?: boolean;
    /**
     * What pressing a row means.
     *
     * `narrow`, the default, adds that record to the query: everything about
     * it, of every type, and the record's own name in the bar saying so. It is
     * the move the `→` used to be on its own — so where a press narrows, the
     * rows carry no `→`, the row being it.
     *
     * `open` reports the press as {@link activate} and applies nothing, for a
     * host that routes to a page of its own instead.
     *
     * A row whose type declares no {@link EntitySchema.scope} cannot be
     * narrowed to at all — nothing carries its id — so those are reported
     * either way, and a host that only handles those need do nothing else.
     */
    rowPress?: 'open' | 'narrow';
    /**
     * Makes every table row a real link to where pressing it goes, rather than
     * a row that only answers a click: each cell carries an `<a>` to the
     * row's {@link ShellContext.pressHref} under what it draws, so a middle
     * click, the context menu and the status bar's address work anywhere on
     * the row, as they do on the record's name. The ticks, the `+ · −`, the
     * counts and the marks stay controls of their own above it.
     *
     * Off by default, where only the name is a link; a host whose name column
     * is no link of its own (`activate: false`) turns this on to keep one.
     */
    rowLinks?: boolean;
    /**
     * What the count is short of, in the host's words — `first 1,200 of
     * 30,200 lots` for a seller whose pages are still being fetched, or were
     * given up on part way. The shell counts pages from the rows its source
     * has reported, so the pager reads as if that were all of them; this goes
     * under the pager's hover text, which is where that count is explained.
     * Empty says nothing.
     */
    pagesNote?: string;
    navigationMode?: NavigationMode;
    facetNavigationMode?: NavigationMode;
};
type __VLS_Slots = {
    /** Extra controls at the right end of the header bar. */
    actions?: () => unknown;
    /**
     * The domain's mark at the left end of the bar, drawn in place of its name
     * — a logo, an icon. The name stays the bar's accessible text, read out
     * where the mark is drawn, so the label is still the one place the name is
     * written; the mark itself is hidden from assistive technology.
     *
     * Pressed, the name or the mark drawn for it goes home — the schema's
     * defaults, as `reset` does — with or without a mark. A button and not a
     * link, so the press is its own and not the query panel's, as every other
     * control on the bar is.
     */
    brand?: (props: {
        /** {@link DomainSchema.label}, for a mark that wants to say it too. */
        label: string;
    }) => unknown;
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
    /**
     * Cards of the host's own about each record the query narrows to — once
     * per record, in the order the query names them, before `cards-before`.
     *
     * A record named in the query is what the screen is *about*: pressing a
     * row puts its term there, and lifting the term takes it away. The per-type
     * cards say what the corpus holds of it; what no type holds — the form that
     * acts on it, its metadata, its log — is the host's, and this is where it
     * goes, so a record's cards follow the query rather than a route. A record
     * is a positive term on a field some type declares as its `scope`;
     * repeated names count once, case aside.
     *
     * Only on the per-type screen, as `cards-before` is.
     */
    record?: (props: {
        entity: EntitySchema;
        id: string;
    }) => unknown;
    /**
     * A page of the host's own in place of the results, under the same header
     * — for the screens of an application that are not lists (a form, a
     * report) but are still about the query: the header shows it, and editing
     * it there edits it here.
     *
     * Unlike `results`, which is handed the rows to draw in its own way, a page
     * is not a drawing of the rows: the bar carries no pager and no View
     * chooser, there being nothing under it to page or to draw differently;
     * the type's operations are not offered over it; and nothing corrects the
     * URL's page from a count. Provide it conditionally — `<template v-if="…"
     * #page>` — and the shell is the list again the moment it is not.
     *
     * A page that is not about the query at all says so with `pageQuery`.
     */
    page?: (props: {
        /** The committed query, as the URL has it — pristine on a detached page. */
        query: ShellQuery;
    }) => unknown;
    /** Replaces the entire results area. */
    results?: (props: {
        /** The current page of rows, not the whole result. */
        rows: ShellRow[];
        /** Rows matching the query, across every page of them. */
        total: number;
        /** Rows before the first of `rows` — for numbering that keeps counting. */
        offset: number;
        pageCount: number;
        /**
         * The query these rows answer: the committed one, with whatever is being
         * typed in the header's box ANDed on — see `liveQuery` on the context.
         */
        query: ShellQuery;
        pending: boolean;
        /** The `loading` prop: what the source answers is not yet the data. */
        loading: boolean;
    }) => unknown;
};
type __VLS_PublicProps = __VLS_Props & {
    /**
     * Each of these is optionally controlled: bind `v-model:pinned` or
     * `v-model:selected` to own the state, or leave them alone and the shell
     * keeps it internally. `defineModel` distinguishes the two by whether the
     * prop was actually passed.
     */
    'pinned'?: string[];
    /** Which records are ticked, by id — see the `Selection` an operation carries. */
    'selected'?: string[];
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_PublicProps, {
    query: import("vue").ComputedRef<ShellQuery>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    activate: (row: ShellRow) => any;
    create: (entity: EntitySchema) => any;
    duplicate: (selection: Selection) => any;
    delete: (selection: Selection) => any;
    operate: (key: string, selection: Selection) => any;
    drill: (row: ShellRow, entity: EntitySchema | null, options: PressOptions) => any;
    "query-change": (query: ShellQuery) => any;
    "toggle-pin": (row: ShellRow) => any;
    "update:pinned": (value: string[]) => any;
    "update:selected": (value: string[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onActivate?: ((row: ShellRow) => any) | undefined;
    onCreate?: ((entity: EntitySchema) => any) | undefined;
    onDuplicate?: ((selection: Selection) => any) | undefined;
    onDelete?: ((selection: Selection) => any) | undefined;
    onOperate?: ((key: string, selection: Selection) => any) | undefined;
    onDrill?: ((row: ShellRow, entity: EntitySchema | null, options: PressOptions) => any) | undefined;
    "onQuery-change"?: ((query: ShellQuery) => any) | undefined;
    "onToggle-pin"?: ((row: ShellRow) => any) | undefined;
    "onUpdate:pinned"?: ((value: string[]) => any) | undefined;
    "onUpdate:selected"?: ((value: string[]) => any) | undefined;
}>, {
    limit: number;
    previewsPerType: number;
    rowLinks: boolean;
    typeChooser: "scoped" | "always";
    selectionPlacement: "start" | "end";
    loading: boolean;
    pageQuery: "shell" | "detached";
    listPath: string;
    theme: ShellTheme;
    rowPress: "open" | "narrow";
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
