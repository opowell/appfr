/**
 * Core domain model for the data shell.
 *
 * Everything the shell renders is driven by a {@link DomainSchema}: the header
 * summary, the facet controls in the query panel, the columns each view shows,
 * and the sort options. Swapping the schema swaps the vocabulary; the shell
 * itself never changes.
 */
/** The result renderers the shell ships with. */
export type ViewKind = 'list' | 'cards' | 'grid' | 'table' | 'links' | 'preview';
export declare const VIEW_KINDS: readonly ["list", "cards", "grid", "table", "links", "preview"];
/**
 * The palettes the shell ships with, the default first. `minimal` is paper,
 * ink and hairlines with nothing else on — the values the layout stops working
 * without and no more; `mono-size` is that theme with its type scale collapsed
 * too, so every word is set at one size and one weight and only colour and
 * opacity separate them; `auto` follows the system setting; `macos` and
 * `windows` wear that operating system's typeface, corners, accent and shadow,
 * and follow its light and dark schemes the way `auto` does; `inherit` brings
 * no palette at all, taking its background, text colour and font from the host
 * so the shell blends into an app that has its own design.
 */
export type ShellTheme = 'minimal' | 'mono-size' | 'dark' | 'light' | 'auto' | 'macos' | 'windows' | 'inherit';
export declare const SHELL_THEMES: readonly ["minimal", "mono-size", "dark", "light", "auto", "macos", "windows", "inherit"];
/** Lifecycle state of a record, rendered as a pill. */
export type RecordStatus = 'ok' | 'running' | 'queued' | 'review' | 'failed';
export declare const RECORD_STATUSES: readonly ["ok", "running", "queued", "review", "failed"];
export type SortDirection = 'asc' | 'desc';
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
 * Labels for the four data columns every entity exposes. Views read these
 * instead of hard-coding column names, which is what lets one set of
 * renderers serve every schema.
 */
export interface EntityLabels {
    primary: string;
    secondary: string;
    metric1: string;
    metric2: string;
}
export interface SortDef {
    key: string;
    label: string;
}
export interface EntitySchema {
    key: string;
    label: string;
    /** Total population, pre-formatted for display (e.g. `'9,988'`). */
    count: string;
    labels: EntityLabels;
    facets: FacetDef[];
    /** Detail tabs offered when a record is opened. */
    tabs: string[];
    /** Seed pairs of `[primary, secondary]` the mock source expands into rows. */
    samples: Array<readonly [string, string]>;
    /** Overrides the default `updated / score / metric1 / name` sort set. */
    sorts?: SortDef[];
}
export interface DomainSchema {
    key: string;
    label: string;
    /** One-line description shown beside the domain name. */
    kicker: string;
    /** Example expression, used as the expression field's placeholder. */
    placeholder: string;
    entities: EntitySchema[];
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
 * A single result. Views render `primary`/`secondary` as identity and the two
 * metrics as data; `facets` holds the raw values a data source filters on.
 */
export interface ShellRow {
    id: string;
    /** {@link EntitySchema.key} this row belongs to. */
    entityKey: string;
    /** {@link EntitySchema.label}, so a cross-entity result set can say so. */
    entityLabel: string;
    primary: string;
    secondary: string;
    status: RecordStatus;
    /** Normalised 0–1 relevance, drawn as a meter and shown in the grid view. */
    score: number;
    metric1: number;
    metric2: number;
    /** ISO-8601 date of the last change. */
    updatedAt: string;
    /** Background colour for the grid view's tile. */
    tint: string;
    /**
     * Values behind this row, keyed by {@link FacetDef.key}. A chips facet may
     * hold a list rather than one string — see {@link ChipsFacet.multiple}.
     */
    facets: Record<string, string | number | boolean | string[]>;
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
    /** Maximum rows to return. */
    limit: number;
}
export interface QueryResult {
    rows: ShellRow[];
    /** Rows matching the query before `limit` was applied. */
    total: number;
    /** True when no facet or expression narrowed the population. */
    unfiltered: boolean;
}
/**
 * Where rows come from. The shell only ever calls {@link DataSource.query}, so
 * a host can back it with an API, a store, or the bundled mock source.
 */
export interface DataSource {
    query(request: QueryRequest): QueryResult | Promise<QueryResult>;
}
/**
 * A source that answers in the same tick. The shell applies these during the
 * current render, which is what lets SSR emit complete markup and component
 * tests assert without awaiting.
 */
export interface SyncDataSource extends DataSource {
    query(request: QueryRequest): QueryResult;
}
