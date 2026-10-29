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
export type ViewKind = 'list' | 'cards' | 'grid' | 'images' | 'table' | 'links' | 'preview';
export declare const VIEW_KINDS: readonly ["list", "cards", "grid", "images", "table", "links", "preview"];
/** Lifecycle state of a record, rendered as a pill. */
export type RecordStatus = 'ok' | 'running' | 'queued' | 'review' | 'failed';
export declare const RECORD_STATUSES: readonly ["ok", "running", "queued", "review", "failed"];
/**
 * The colours a {@link RecordStatus} pill comes in, offered by name for words
 * that are not statuses — a spec's `crawler-generated`, a run's `passed`. The
 * five statuses keep their own colours (`queued` has none, as ever); `neutral`
 * is that same no-colour said on purpose, and `accent` is the shell's own,
 * the one a running record wears.
 */
export type PillTone = RecordStatus | 'neutral' | 'accent';
export declare const PILL_TONES: readonly ["ok", "running", "queued", "review", "failed", "neutral", "accent"];
/**
 * A value in a `<ShellFacts>` grid: text, a number, or a list drawn a line
 * per entry. Nothing, `''` or an empty list is drawn as the shell's dash.
 */
export type ShellFactValue = string | number | null | undefined | readonly (string | number)[];
/** One fact in a `<ShellFacts>` grid's `items`. */
export interface ShellFactItem {
    label: string;
    value?: ShellFactValue;
    /** The value's tooltip — the exact figure behind a rounded one, say. */
    title?: string;
    /** Takes a whole row of the grid, for a value a column would wrap. */
    wide?: boolean;
}
/**
 * What a `<ShellLog>`'s `fetchChunk(offset)` answers with: the text written
 * after `offset`, and the offset that text ends at — where the next read
 * starts.
 */
export interface LogChunk {
    chunk: string;
    offset: number;
}
/** One count in a `<StatusCounts>` row: `3 passed`, in the tone it is. */
export interface StatusCount {
    /** The word after the number. */
    label: string;
    count: number;
    /** Its colour, as a pill's — `neutral` where left out. */
    tone?: PillTone;
}
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
 * How a press was made, beyond where it landed.
 *
 * Every press the shell reads carries one of these, and so does every press
 * it reports — `click` on a column, `drill`, `activate` — so a host's own
 * cells can answer the modifier the same way the shell's rows do.
 */
export interface PressOptions {
    /**
     * The press was made with ⌥ (Alt) held: leave this record *out* of the
     * query rather than narrow to it. `pressOptions(event)` is the reading of
     * the event, exported so every press agrees about which key it is.
     */
    exclude?: boolean;
}
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
    /**
     * What the header says on hover — the sentence the label had no room for.
     *
     * A header is one or two words wide, and a column often turns on something
     * those words leave out: which currency the figures are in, what a count is
     * counting, whose feedback a score is. The reader who wonders can ask the
     * header itself rather than guessing from the rows, and the reader who does
     * not is never shown it.
     *
     * So: what the label leaves unsaid, and nothing that repeats it — a hint
     * that is the label again is a tooltip that costs a hover and says nothing.
     */
    hint?: string;
    /**
     * Puts the column on the record's card too, as this short label and the
     * cell's words after it — `cardLabel: 'A'` on an Attack column reads `A 4`
     * under the name. For the handful of figures that tell one record from the
     * next at a glance (a unit's attack, defense and move; a part's weight),
     * where a picture card would otherwise leave every number to the table.
     *
     * The card's line keeps the columns' order and shows the column's
     * {@link ColumnDef.label} and {@link ColumnDef.hint} on hover. A row with
     * nothing under the column has no fact there, rather than a label over a
     * dash. Left out, the column is the table's alone.
     */
    cardLabel?: string;
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
     * it does for {@link ColumnDef.activate}. How the press was made comes with
     * it — `exclude` for one made with ⌥ held — so a host narrowing on its own
     * can offer the same turn the shell's presses do.
     */
    click?: (row: ShellRow, options?: PressOptions) => void;
    /**
     * The component a `component` cell renders, given `{ row, entry, value,
     * column }`. Anything a host wants a cell to be — a sparkline, a thumbnail
     * stack, a set of buttons — without a string of HTML anywhere near it.
     */
    component?: Component;
    /**
     * The component the column's header renders, given `{ column, entity }`,
     * beside the label — for a control that is about the whole column rather
     * than any one cell: the button that clears every tick the column's cells
     * made, the one that fills every box in it, a picker of the unit a column of
     * figures is read in. The label and its sort button stay as they are; this
     * is what follows them, and it is drawn in every table the column is.
     */
    header?: Component;
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
     * What one of these *is*, in a sentence — `'A saved query and the items it
     * has found'`. Drawn under the type's name on its card on the home screen,
     * for the reader who has not met the type before; a label is a noun, and a
     * noun of this domain's is not always one the reader knows.
     *
     * Left out, the card is its name and count as before.
     */
    description?: string;
    /**
     * Total population. A number is written by the shell, in the same hand as
     * the live counts beside it — `formatCount`, so `9988` reads `10k`. A string
     * is shown as given, for what is not a number yet: an estimate (`~1.2k`),
     * a word while it is counted, or `''` for nothing at all.
     */
    count: number | string;
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
     * Anything else that is done to the ticked records — running them,
     * exporting them, sending them somewhere — named by the type the way
     * `duplicate` and `delete` are. Each is a button on the bar, between the
     * copy and the delete, and offers the ticks the same way.
     *
     * Reported as `operate(key, selection)`, and carried out by nobody but the
     * host: the shell knows these by name only.
     */
    operations?: SelectionOperation[];
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
     * What to call {@link scope}'s field in the header, where the field itself
     * reads poorly as one — `'item'` for a field named `id`. Most scopes need
     * nothing here: `'host'`, `'set'`, `'category'` already read as the noun a
     * reader wants, and the header falls back to the field name where this is
     * unset.
     */
    scopeLabel?: string;
    /**
     * Whether a term on {@link scope} narrows this type's own list as well.
     *
     * Unset, it does not: `condition:N` says which condition every *other*
     * type's rows belong to, and a list of conditions under it is every
     * condition, the one named among them — see `withoutOwnScope`. Set it where
     * the host reads the term as a list of this type in its own right: an item
     * named is the item and what it is made of, so the items under `id:979`
     * are the set and its parts rather than every item there is. The term then
     * reaches the source as written, and the header's pill stops saying it is
     * not applied.
     */
    keepsScope?: boolean;
    /**
     * Where a record of this type lives outside the shell — a page of the
     * host's, a site it points at — or null for a record that lives nowhere
     * else. `row => row.id` for a type whose records *are* URLs.
     *
     * What it does depends on what a press on the row already means, because a
     * press is one thing and a record that is somewhere is another:
     *
     * - Where the press is *reported* — `rowPress: 'open'`, or a type that
     *   declares no {@link EntitySchema.scope} — the record opens there instead
     *   of being reported: the row's name is a link to it, a plain press opens
     *   it in a new tab, and `activate` is not emitted for it. The host that
     *   would only have called `window.open` in its handler need not have one.
     * - Where the press *narrows* — the default, on a type with a scope — it
     *   goes on narrowing, and the record's way out is a `↗` beside the name
     *   instead: the same place the `→` stands when the roles are the other way
     *   round.
     *
     * On the entity rather than on a column because a press belongs to the
     * row: every view reads it through the same one place, cards and tiles and
     * previews included, and none of those is made of columns.
     */
    href?: (row: ShellRow) => string | null | undefined;
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
    /**
     * What a card of this type is made of.
     *
     * `record`, the default, is the record's row number and state over its
     * picture, name and reference, its first two numbers and its date.
     * `picture` is the picture, edge to edge, and the name under it, and
     * nothing else: for a type whose records are told apart by what they look
     * like, a game or a piece, where the numbers belong to the table and a
     * wall of cards is a wall of things to pick from. The table and every other
     * view still read the roles as they always do.
     */
    card?: CardKind;
}
/** What a card of a type is made of — see {@link EntitySchema.card}. */
export type CardKind = 'record' | 'picture';
/**
 * One record a query narrows to: which type, and which of them. Read off the
 * query's terms — a positive term on a field some type declares as its
 * {@link EntitySchema.scope} names a record of that type.
 */
export interface NarrowedRecord {
    /** {@link EntitySchema.key} of the type the record is one of. */
    entityKey: string;
    /** The id as the term wrote it. */
    id: string;
}
/** What a `views` function is asked with — see {@link ViewsOption}. */
export interface ViewsContext {
    /** The type being listed, or null across every type. */
    entity: EntitySchema | null;
    /** The records the committed query narrows to, in the order it names them. */
    records: NarrowedRecord[];
}
/**
 * The views a shell offers: a fixed list, or a list worked out per screen
 * from what the query is about — `['table']` inside a type, `['cards']` on a
 * record, both across everything.
 */
export type ViewsOption = ViewKind[] | ((context: ViewsContext) => ViewKind[]);
export interface DomainSchema {
    key: string;
    /**
     * The name at the left of the bar, which is a button home. Left out, the
     * bar has no name and starts with the query — and no `brand` mark, which
     * would be a button with nothing to say it is.
     */
    label?: string;
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
    /**
     * Whether a term on a join key — some entity's {@link EntitySchema.scope} —
     * leaves out a row that does not carry that field at all.
     *
     * Unset, it does not. An unresolvable field *matches* in the expression
     * language, which is what keeps a half-typed term from emptying the screen,
     * and a join key is a field like any other there: a row of a type that
     * never heard of `host` comes through `host="example.com"` unfiltered. The
     * cure has been for every row to carry every join key, an empty list where
     * the join does not apply — which a host has to remember for each type it
     * adds, and which a narrowed screen punishes silently when it forgets.
     *
     * Set, a row without the field is not one the term names, so it is out —
     * and kept by `-host="example.com"`, which is the same fact turned round.
     * Only the scope fields are held to it: everything else that does not
     * resolve still constrains nothing, half-typed or not. Read by
     * `matchesExpression` when the schema is handed to it, which the memory
     * and mock sources both do.
     */
    strictScopes?: boolean;
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
    /**
     * Free-text expression, in the schema's own query language. The facets are
     * in it too, as the terms they write — `quantity:100..`, `color=Red` — so
     * the query panel's controls and the typed query are one query, read one
     * way: see `facetValue`.
     */
    expr: string;
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
    /**
     * The view an empty URL opens in: the home screen's, cards unless set — or,
     * with `landing: 'entity'`, the landing type's too, unless
     * {@link ShellQueryDefaults.entityView} says otherwise.
     */
    view?: ViewKind;
    /**
     * The view one type's records open in when the URL names none. A table
     * unless set: one type's rows share their columns, which is what a table is
     * for, where a card per type is what the whole corpus is for.
     */
    entityView?: ViewKind;
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
/**
 * One of {@link EntitySchema.operations}: what the host calls it, and the
 * words on its button. The key is what comes back with the press, so a label
 * can change without the host's handler having to.
 */
export interface SelectionOperation {
    key: string;
    label: string;
}
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
    /**
     * Told how many rows match so far, while a `query` that takes a while is
     * still working it out — a count read off the part of a large table seen
     * yet, say. Each call replaces the last, and the answer `query` settles on
     * replaces them all; nothing is said after it.
     *
     * Offered where the shell can put a partial count to use, and absent
     * everywhere else — so a source calls it where it is there, and a source
     * that answers at once, or cannot say anything before it has finished,
     * never needs to.
     */
    progress?: (total: number) => void;
    /**
     * Aborted once nobody wants the answer any more — a count for a picker that
     * has closed, or been opened again and asked afresh. The shell throws away
     * whatever a request answers after this, so a source that is walking a
     * large table can stop where it is and settle however is convenient. A
     * source that answers at once can ignore it.
     *
     * Offered where the shell can tell the answer has stopped mattering, and
     * absent everywhere else.
     */
    signal?: AbortSignal;
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
