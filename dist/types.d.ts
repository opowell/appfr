/**
 * Core domain model for the data shell.
 *
 * Everything the shell renders is driven by a {@link DomainSchema}: the header
 * summary, the facet controls in the query panel, the columns each view shows,
 * and the sort options. Swapping the schema swaps the vocabulary; the shell
 * itself never changes.
 */
import type { Component } from 'vue';
/** The result renderers the shell ships with. */
export type ViewKind = 'list' | 'cards' | 'grid' | 'table' | 'links' | 'preview';
export declare const VIEW_KINDS: readonly ["list", "cards", "grid", "table", "links", "preview"];
/**
 * The palettes the shell ships with, the default first. `minimal` is paper,
 * ink and hairlines with nothing else on — the values the layout stops working
 * without and no more; `auto` follows the system setting; `macos` and
 * `windows` wear that operating system's typeface, corners, accent and shadow,
 * and follow its light and dark schemes the way `auto` does; `inherit` brings
 * no palette at all, taking its background, text colour and font from the host
 * so the shell blends into an app that has its own design; `mono-size` is
 * `inherit` with the type scale given up as well, so every word is set at the
 * host's own size and weight and only colour and opacity separate them — and
 * dark mode is the host's, since the shell holds no colour to switch.
 */
export type ShellTheme = 'minimal' | 'mono-size' | 'dark' | 'light' | 'auto' | 'macos' | 'windows' | 'inherit';
export declare const SHELL_THEMES: readonly ["minimal", "mono-size", "dark", "light", "auto", "macos", "windows", "inherit"];
/** Lifecycle state of a record, rendered as a pill. */
export type RecordStatus = 'ok' | 'running' | 'queued' | 'review' | 'failed';
export declare const RECORD_STATUSES: readonly ["ok", "running", "queued", "review", "failed"];
export type SortDirection = 'asc' | 'desc';
/**
 * How the header bar and the query panel that drops from it are brought to one
 * width: `grow` widens the panel to the bar, `shrink` narrows the bar to the
 * panel — to `--dc-header-width` — so the two still measure the same.
 */
export type ShellWidthMatch = 'grow' | 'shrink';
/** Where a bar and panel narrowed by `shrink` sit across the shell. */
export type ShellAlign = 'left' | 'center' | 'right';
/** A multi-select set of mutually compatible values. */
export interface ChipsFacet {
    kind: 'chips';
    key: string;
    label: string;
    options: string[];
    /**
     * Whether a row may hold several of these values at once — a tenant that
     * runs in two regions, a host built from two containers. Such a row answers
     * to each of its values on its own, so it is in more than one chip's set.
     * Filtering follows the row's value either way; this says so in the schema,
     * and is what the mock source generates against.
     */
    multiple?: boolean;
}
/** A numeric window. Either bound may be left open. */
export interface RangeFacet {
    kind: 'range';
    key: string;
    label: string;
    min: number;
    max: number;
}
/** A single boolean predicate, described by {@link ToggleFacet.text}. */
export interface ToggleFacet {
    kind: 'toggle';
    key: string;
    label: string;
    text: string;
}
export type FacetDef = ChipsFacet | RangeFacet | ToggleFacet;
export type FacetValue = {
    kind: 'chips';
    selected: string[];
} | {
    kind: 'range';
    min: number | null;
    max: number | null;
} | {
    kind: 'toggle';
    on: boolean;
};
/** Facet values keyed by {@link FacetDef.key}. */
export type FacetState = Record<string, FacetValue>;
/**
 * What a cell draws. `text` when a column does not say.
 *
 * The first four are values formatted onto the page; `status` and `image` are
 * the shell's own marks; `ordinal` is the row's position in the result rather
 * than anything on the row; and `component` hands the cell to
 * something of yours — the escape hatch, and the reason there is no HTML
 * string here to inject into.
 */
export type ColumnKind = 'text' | 'number' | 'date' | 'status' | 'image' | 'ordinal' | 'component';
export type ColumnAlign = 'left' | 'center' | 'right';
/**
 * What part a column plays in the views that are not tables.
 *
 * A table renders columns; a card, a tile, a link row and a preview pane do
 * not — they are an identity, a reference, a number or two and a mark, and
 * they have to be told which column is which. That is what a role is: the
 * schema names its fields once, in `columns`, and every view reads the ones it
 * is made of.
 *
 * A column with no role is a column and nothing else: it appears in the table
 * and nowhere else, which is what most columns are.
 */
export type ColumnRole = 
/** The record's name — what a card heads, and what opening the row opens. */
'identity'
/** The reference under it: a URL, a path, a part number. */
 | 'reference'
/** A number worth showing beside the name. Views take the first one or two. */
 | 'metric'
/** Lifecycle, drawn as a pill. Its value should be a {@link RecordStatus}. */
 | 'state'
/** When the record last changed, as an ISO-8601 date. */
 | 'updated'
/**
 * The record's picture. Its value is the `src` — a URL or a data URI — and
 * a row holding none is a record those views draw without one rather than a
 * broken image.
 *
 * Unlike `tint` this is a value like any other, so a column that plays it is
 * still a column: an `image` cell in the table, and the picture on the card
 * and the tile both.
 */
 | 'image'
/**
 * A colour for the grid view's tile. Declared as a column so the schema
 * names its fields in one place, but never drawn as a cell — a background
 * is not a value — so the table leaves it out.
 */
 | 'tint';
export declare const COLUMN_ROLES: readonly ["identity", "reference", "metric", "state", "updated", "image", "tint"];
/**
 * The container widths a column may stand down at, narrowest first. A fixed
 * ladder rather than a free number because the rule is a container query in a
 * stylesheet, and a stylesheet cannot be handed an arbitrary breakpoint per
 * column. Pick the rung that says how expendable the column is.
 */
export declare const COLUMN_BREAKPOINTS: readonly [480, 620, 760, 900, 1100];
export type ColumnBreakpoint = (typeof COLUMN_BREAKPOINTS)[number];
/**
 * One column of the table view.
 *
 * A column says where its value comes from, how it is drawn, and what pressing
 * it means. Declaring any replaces the default set entirely — the ordinal, the
 * identity pair, the two metrics, the date and the state — so an entity with
 * eleven columns and no state among them is describable, which the four
 * {@link EntityLabels} on their own are not.
 */
export interface ColumnDef {
    /**
     * Identifies the column, and is the field read off the row when
     * {@link ColumnDef.field} and {@link ColumnDef.value} are both absent.
     *
     * Optional, because a column that names its field or computes its value has
     * already said what it is. What identifies it then falls back to the field,
     * then to its label, then to where it sits in the list — never to nothing,
     * which is a table whose rows cannot be told apart.
     */
    key?: string;
    /** The header. A column whose content says what it is can leave it out. */
    label?: string;
    kind?: ColumnKind;
    /**
     * What this column is to the views that are not tables — see
     * {@link ColumnRole}. A column that names none is a column only.
     */
    role?: ColumnRole;
    /**
     * The row field to read, when it is not the column's own key. Looked up on
     * {@link ShellRow} first and in {@link ShellRow.facets} after, so the values
     * a source already carries per row are columns without a change of shape.
     */
    field?: string;
    /**
     * Reads the cell's value off the row, for a column that is a computation
     * rather than a field — two fields joined, a unit converted, a name with its
     * id after it. Beats {@link ColumnDef.field} when both are given.
     */
    value?: (row: ShellRow) => unknown;
    /**
     * Turns that value into what the cell says. Beats the formatting the kind
     * would have done — which is where a metric in grams, a currency or a
     * duration goes, the shell knowing only how to count.
     */
    format?: (value: unknown, row: ShellRow) => string;
    /**
     * CSS width. Columns that name one keep it at every shell width; what is
     * left over is shared between the columns that do not, so at least one
     * column should go without.
     */
    width?: string;
    /** Caps the height of an `image` cell. */
    height?: string;
    align?: ColumnAlign;
    /** Sets the cell in the monospace face — for ids, paths and numbers. */
    mono?: boolean;
    /** Draws the cell in the secondary ink: present, but not what is scanned. */
    muted?: boolean;
    /**
     * Truncates rather than wraps, with the whole value on hover. On by default
     * for the text kinds, which is what keeps every row one line deep.
     */
    truncate?: boolean;
    /**
     * The {@link SortDef.key} this header sorts by. The header is a button only
     * when the key is one the entity actually offers, so a column can name a
     * sort the entity may or may not declare and the table stays honest.
     */
    sort?: string;
    /** Opens the record when pressed — what the identity column does. */
    activate?: boolean;
    /**
     * Puts the narrow-to-this-record affordance beside the value — the → an
     * entity's {@link EntitySchema.scope} earns. On the identity column by
     * default; a type declaring no scope offers it nowhere.
     */
    scope?: boolean;
    /**
     * Narrows to what this cell's value counts, as the {@link EntitySchema.key}
     * of the entity counted. Pressing `12` under **Tests** means "show me those
     * twelve", exactly as {@link EntitySchema.drills} does for the two metrics —
     * and, like it, needs the row's entity to declare a {@link EntitySchema.scope},
     * without which nothing on the far side says which record it belongs to.
     */
    drill?: string;
    /**
     * Called with the row when the cell is pressed, for a column that means
     * something only the host knows. The shell reports and applies nothing, as
     * it does for {@link ColumnDef.activate}.
     */
    click?: (row: ShellRow) => void;
    /**
     * The component a `component` cell renders, given `{ row, entry, value,
     * column }`. Anything a host wants a cell to be — a sparkline, a thumbnail
     * stack, a set of buttons — without a string of HTML anywhere near it.
     */
    component?: Component;
    /**
     * Which scope the column appears in. `everything` is the mixed result set,
     * where no single entity's vocabulary applies; `scoped` is one entity's own
     * list. `always` when unsaid.
     */
    when?: 'always' | 'everything' | 'scoped';
    /**
     * The container width below which the column stands down, so a narrow table
     * loses what it can do without rather than crowding what it cannot. Columns
     * that name nothing are always on screen.
     */
    hideBelow?: ColumnBreakpoint;
    /** Extra class on the header and every cell of the column. */
    class?: string;
}
export interface SortDef {
    key: string;
    label: string;
}
export interface EntitySchema {
    key: string;
    label: string;
    /**
     * Total population, pre-formatted for display (e.g. `'9,988'`) — the shell's
     * own `formatCount` is what it uses for the live counts beside these, so a
     * host with nothing else in mind should format with that.
     */
    count: string;
    facets: FacetDef[];
    /** Detail tabs offered when a record is opened. */
    tabs: string[];
    /**
     * What making a new one of these is called — `'Start new…'`. Naming it puts
     * that button at the foot of this type's card on the home screen; leaving
     * it out means this type is not made from here.
     *
     * The shell makes nothing itself. It reports the press as `create`, the way
     * it reports an opened row as `activate`, and the host decides what the
     * button leads to.
     */
    create?: string;
    /**
     * What copying the ticked records is called — `'Duplicate'`. Naming it puts
     * that button on the bar over this type's list, and with it the ticks that
     * say which records it is for: an operation on a selection is what makes a
     * selection worth having.
     *
     * Reported, not carried out — `duplicate(selection)`. The shell copies
     * nothing, for the same reason it makes nothing.
     */
    duplicate?: string;
    /**
     * And what deleting them is called — `'Delete'`. It offers the ticks the
     * same way, and is reported the same way: the rows go when the source stops
     * returning them, which is the host's doing rather than the shell's.
     */
    delete?: string;
    /**
     * The field every other record carries this one's id in — `'host'` for a
     * tenant whose specs, profiles and runs each name the host they belong to.
     *
     * Naming it makes a record *narrowable*: its rows offer the affordance, and
     * pressing it reports {@link ShellContext.drill}. The shell narrows nothing
     * itself — what the term does to the query is the host's, the same way
     * `create` names the button and leaves making one to the host.
     */
    scope?: string;
    /**
     * Seed pairs of `[identity, reference]` the mock source expands into rows,
     * filling the rest of each row from what the columns say it holds.
     */
    samples: Array<readonly [string, string]>;
    /**
     * Overrides the sorts derived from the columns — one per column that names a
     * {@link ColumnDef.sort}.
     */
    sorts?: SortDef[];
    /**
     * What this type *is*: every field the shell shows, in the order a table
     * shows them, with {@link ColumnDef.role} saying which of them a card, a
     * tile, a link row and a preview pane are made of.
     *
     * The shell invents none, and offers no familiar set to fall back on. A type
     * that declares nothing here has nothing to draw anywhere — no table, and no
     * identity for a card to head — because which fields a record has is the
     * schema's to say and a set of columns nobody asked for is the component
     * deciding what the data is.
     */
    columns?: ColumnDef[];
}
export interface DomainSchema {
    key: string;
    label: string;
    /** One-line description shown beside the domain name. */
    kicker: string;
    /** Example expression, used as the expression field's placeholder. */
    placeholder: string;
    entities: EntitySchema[];
    /**
     * Columns for the mixed result set — every entity at once, where no single
     * type's vocabulary applies and an entity's own {@link EntitySchema.columns}
     * would be describing the wrong rows. Declared here or nowhere: as with an
     * entity's, the shell invents none.
     */
    columns?: ColumnDef[];
}
/**
 * The complete, serialisable description of what the content area shows.
 * This is the value that lives in the URL.
 */
export interface ShellQuery {
    /**
     * {@link EntitySchema.key} of the entity being listed, or `null` for the home
     * screen — no entity chosen, every one of them previewed.
     */
    entity: string | null;
    view: ViewKind;
    /** {@link SortDef.key} to order by. */
    sort: string;
    dir: SortDirection;
    /** Free-text expression, in the schema's own query language. */
    expr: string;
    facets: FacetState;
    /**
     * Which page of the matching rows is on screen, 1-based and never lower. A
     * page is `limit` rows long. This is a position in a result set rather than
     * a filter, so it returns to the first page whenever the query changes what
     * matched or how it is ordered, and survives a change of view.
     */
    page: number;
}
/** Query fields the shell will fall back to when the URL omits them. */
export interface ShellQueryDefaults {
    /**
     * The entity to focus when the URL names none. This is what the query panel
     * configures and where the home screen's search box goes; it does not by
     * itself select an entity — see {@link ShellQueryDefaults.landing}.
     */
    entity?: string;
    view?: ViewKind;
    sort?: string;
    dir?: SortDirection;
    /**
     * What an empty URL shows. `'home'` (the default) previews every entity;
     * `'entity'` goes straight to the focused entity's list.
     */
    landing?: 'home' | 'entity';
}
/**
 * A single result.
 *
 * Three fields the shell owns and one bag it does not. `id` is what a row is
 * tracked and narrowed by, `entityKey` says which type it is — so a mixed
 * result set can read every row in its own type's vocabulary — and everything
 * else about the record is in `fields`, under whatever names the schema's
 * columns read.
 */
export interface ShellRow {
    id: string;
    /** {@link EntitySchema.key} this row belongs to. */
    entityKey: string;
    /** {@link EntitySchema.label}, so a cross-entity result set can say so. */
    entityLabel: string;
    /**
     * The record itself, keyed however the source likes: a name, a URL, two
     * counts, a state, a date, the values a facet filters on. Columns say which
     * of these are shown and what they are called, and roles say which of them a
     * card or a tile is made of — the shell reads nothing here by name of its
     * own.
     */
    fields: Record<string, unknown>;
}
/**
 * The records an operation on a selection is asked of.
 *
 * A tick is held as an id, so a selection outlives the page it was made on —
 * and outlives the sort, the view and the query that found the record. The ids
 * are therefore all of it, and `rows` is the part the shell still has in hand:
 * the ticked rows of the page on screen. A host that needs the rest reads them
 * back by id, being the only side that can.
 */
export interface Selection {
    /** Every ticked id, across every page a tick was made on. */
    ids: string[];
    /** The ticked rows the current page holds — never more of them than `ids`. */
    rows: ShellRow[];
    /**
     * The type being listed, whose own labels named the operation. Null only
     * where a host offered ticks across the whole corpus, which names none.
     */
    entity: EntitySchema | null;
}
export interface QueryRequest {
    query: ShellQuery;
    schema: DomainSchema;
    /**
     * The entity being listed, or `null` when the query spans every entity in
     * the schema — the home screen. Logs and settings are entities like any
     * other, so they are in that result set until an entity filter excludes them.
     */
    entity: EntitySchema | null;
    /** Maximum rows to return: one page's worth. */
    limit: number;
    /**
     * Rows to skip before that page — `(query.page - 1) * limit`, done here so a
     * source can hand it straight to an `OFFSET` without repeating the sum.
     */
    offset: number;
}
export interface QueryResult {
    rows: ShellRow[];
    /**
     * Rows matching the query, before `limit` and `offset` picked a page out of
     * them. This is what the shell counts pages with, so it has to be the whole
     * match rather than the length of the page returned.
     */
    total: number;
    /** True when no facet or expression narrowed the population. */
    unfiltered: boolean;
}
/** What a stream says it has learned since the last time it said anything. */
export interface QueryUpdate {
    /** The page, replacing whatever is held. */
    rows?: ShellRow[];
    /** Rows matching the query, across every page — see {@link QueryResult.total}. */
    total?: number;
}
/**
 * Where a streaming source puts rows as it finds them.
 *
 * A `query` answers once and is done, which is the wrong shape for a result
 * that arrives over seconds — a crawl, a scan, a scroll of pages fetched one
 * after another. A source with a {@link DataSource.stream} is handed one of
 * these instead and pushes into it for as long as it has anything to say, and
 * the shell renders each push.
 *
 * The sink belongs to one request. Change the query and it closes: `open` goes
 * false and every method becomes a no-op, so a source that is slow to notice
 * cannot write the old query's rows over the new query's.
 */
export interface QuerySink {
    /**
     * False once the shell has moved on — the query changed, or the shell went
     * away. A source doing real work should stop when this goes false, since
     * nothing it pushes afterwards is kept.
     */
    readonly open: boolean;
    /**
     * Rows found, put at `at` — the end of the page when it is left out, and 0
     * for a stream that finds the newest first.
     *
     * The page holds {@link QueryRequest.limit} rows and no more: what an insert
     * pushes past the end is dropped, the way it would never have been returned
     * by a `query` for this page. The total goes up by what was inserted
     * regardless, so the pager knows there is more even while this page is full.
     */
    insert(rows: ShellRow | ShellRow[], at?: number): void;
    /**
     * States what is known, rather than adding to it: the page as it now stands,
     * or the real total once the source has counted.
     */
    set(update: QueryUpdate): void;
    /** Nothing more is coming. The shell stops reporting the query as pending. */
    close(): void;
    /** The stream failed. Reported the way a rejected `query` is. */
    fail(error: unknown): void;
}
/**
 * Where rows come from. A host can back it with an API, a store, or the
 * bundled mock source.
 */
export interface DataSource {
    /**
     * The rows for one page of one query. Asked once per query — and once per
     * entity by the home screen, whose cards each run their own — so a source
     * has to answer this whether or not it also streams.
     */
    query(request: QueryRequest): QueryResult | Promise<QueryResult>;
    /**
     * The same rows, as they are found rather than all at once. Declaring it is
     * what makes the shell prefer it: the result list comes from here, and
     * `query` goes on serving the home screen's per-type cards.
     *
     * Return a teardown and the shell calls it when the query changes or the
     * shell unmounts — the place to abort the request or close the socket.
     * Whatever the source does about it, {@link QuerySink.open} has already gone
     * false by then.
     */
    stream?(request: QueryRequest, sink: QuerySink): (() => void) | void;
}
/**
 * A source that answers in the same tick. The shell applies these during the
 * current render, which is what lets SSR emit complete markup and component
 * tests assert without awaiting.
 */
export interface SyncDataSource extends DataSource {
    query(request: QueryRequest): QueryResult;
}
/** A source that pushes rows in as it finds them. */
export interface StreamingDataSource extends DataSource {
    stream(request: QueryRequest, sink: QuerySink): (() => void) | void;
}
