import type { ComputedRef, InjectionKey, Ref, ShallowRef } from 'vue';
import type { DataSource, DomainSchema, EntitySchema, PressOptions, Selection, ShellQuery, ShellRow } from '../types';
import type { QueryState } from './useQueryState';
/**
 * Everything the header, the query panel and the result views need. Provided
 * once by `DataShell` so the parts stay independently testable without a chain
 * of props threading through every view.
 */
export interface ShellContext extends QueryState {
    /**
     * What is typed in the header's search box and not yet committed — the
     * box's own model. Written as it is typed; see {@link ShellContext.liveQuery}
     * for what it does to the results meanwhile.
     */
    draft: Ref<string>;
    /**
     * The query the results are read under: {@link QueryState.query}, with the
     * draft in the search box ANDed on and a page of its own. It *is* `query`
     * whenever nothing is typed, so the two only part while a draft is live.
     *
     * Everything that says what matched reads this one — the rows, the total and
     * the pages, the per-type cards and the counts beside each type — and
     * everything that says what the query *is* reads `query`: the pills, the
     * panel, the URL. A view of your own that runs its own query against the
     * source reads this, or it goes on showing what the reader is typing their
     * way out of.
     *
     * `setPage` pages this one: while a draft is live a page is a page of the
     * draft's results, held beside the draft rather than written to the URL,
     * and back at the first whenever the draft changes.
     */
    liveQuery: ComputedRef<ShellQuery>;
    /** Whether a draft is narrowing {@link ShellContext.liveQuery} right now. */
    drafting: ComputedRef<boolean>;
    /** ANDs the draft on to the query, as a part of it, and empties the box. */
    commitDraft(): void;
    /** Gives the draft up: the box empties and the results are the query's again. */
    abandonDraft(): void;
    schema: ComputedRef<DomainSchema>;
    /** Every entity the schema declares — logs and settings among them. */
    entities: ComputedRef<EntitySchema[]>;
    /** The rows of the current page, not of the whole result. */
    rows: ShallowRef<ShellRow[]>;
    /** Rows matching the query, across every page of them. */
    total: Ref<number>;
    /** Rows per page — what the shell asks its source for at a time. */
    limit: ComputedRef<number>;
    /** Rows before the first on screen: `(page - 1) * limit`. */
    offset: ComputedRef<number>;
    /** How many pages the total comes to. Never fewer than one. */
    pageCount: ComputedRef<number>;
    pending: Ref<boolean>;
    /** Whether the total is still being counted — see `ResultsState.counting`. */
    counting: Ref<boolean>;
    error: ShallowRef<unknown>;
    /**
     * The data source, so a view can ask its own questions — the home screen's
     * per-type cards need one query per entity, not the shell's single one.
     */
    source: ComputedRef<DataSource>;
    /** Rows shown inside each type's card on the home screen. */
    previewsPerType: ComputedRef<number>;
    /**
     * The expression the whole shell is read inside, or `''` where it is read
     * inside nothing. It is not part of the query — the URL never carries it and
     * no term on the bar lifts it — so a view that says what narrowed the
     * results has to ask for it separately.
     */
    within: ComputedRef<string>;
    /** Whether the star affordance is offered on rows. */
    pinnable: ComputedRef<boolean>;
    isPinned(row: ShellRow): boolean;
    isPinnedId(id: string): boolean;
    togglePin(row: ShellRow): void;
    /**
     * Whether records may be ticked — the type in force naming an operation to
     * do to a selection, or the host asking for ticks outright.
     */
    selectable: ComputedRef<boolean>;
    /** What is ticked: see {@link Selection}. */
    selection: ComputedRef<Selection>;
    isSelected(row: ShellRow): boolean;
    toggleSelect(row: ShellRow): void;
    /**
     * Ticks or unticks every row on the page — the whole of it, since a page is
     * all the shell has in hand. Ticks made on other pages are left alone.
     */
    selectPage(on: boolean): void;
    /** Unticks everything, on this page and every other. */
    clearSelection(): void;
    /**
     * Whether pressing a row narrows the whole result set to that record rather
     * than reporting it as {@link ShellContext.activate}. True by default — see
     * `rowPress` on `DataShell`.
     *
     * A view reads it to leave the `→` off its rows: with the row itself doing
     * the narrowing, a second control for the same move is a second control for
     * the same move.
     */
    narrowsOnPress: ComputedRef<boolean>;
    /**
     * A row was pressed. Narrows to the record where that is what a press means
     * and the record's type can be narrowed to; reported to the host otherwise —
     * which is every row of a type that declares no `scope`, and every row at
     * all under `rowPress: 'open'`.
     *
     * With `exclude` — the press made with ⌥ held, read by {@link pressOptions}
     * — the same row is left *out* of the query instead, and the screen stays
     * where it is: taking one record out of a list is a refinement of that
     * list, not a move to another. Reported the same way where it would have
     * been anyway.
     */
    activate(row: ShellRow, options?: PressOptions): void;
    /**
     * Asking for a new record of a type, from the button {@link EntitySchema.create}
     * puts on its card. Reported the same way, and for the same reason: making
     * one is the host's, not the shell's.
     */
    create(entity: EntitySchema): void;
    /**
     * Copying the ticked records, and deleting them — the two operations
     * {@link EntitySchema.duplicate} and {@link EntitySchema.delete} name. Both
     * are reported with the {@link Selection} they are for and nothing else
     * happens, `create` being the pattern: the shell has no idea what a copy of
     * one of these is, and no way to unmake one.
     */
    duplicate(): void;
    delete(): void;
    /**
     * Narrowing to one record — from the affordance {@link EntitySchema.scope}
     * offers on its rows, or from a metric {@link EntitySchema.drills} named an
     * entity for. `entity` is what to list afterwards, and null when the press
     * was the row's own: narrow the whole corpus and pivot to nothing.
     *
     * Reported rather than applied. The shell holds a query, not a join — how
     * this record's id reaches the other records is the host's, which is the
     * only place that knows the term means anything.
     *
     * `exclude` as on {@link ShellContext.activate}: the record left out of what
     * is listed rather than narrowed to.
     */
    drill(row: ShellRow, entity: EntitySchema | null, options?: PressOptions): void;
    /**
     * Where pressing the row would go, as a browser `href` — null where the
     * press goes nowhere of the shell's (it is reported, or the type declares no
     * scope). A view puts it on the row's link, which is what makes ⌘-click,
     * ⇧-click and a middle click open it elsewhere as on any other link.
     */
    pressHref(row: ShellRow): string | null;
    /** The same for {@link ShellContext.drill}: a metric's, or the `→`'s. */
    drillHref(row: ShellRow, entity: EntitySchema | null): string | null;
}
export declare const SHELL_CONTEXT_KEY: InjectionKey<ShellContext>;
/** The parts of the context that are the header's search box — see {@link ShellContext.draft}. */
type DraftFields = 'draft' | 'liveQuery' | 'drafting' | 'commitDraft' | 'abandonDraft';
/**
 * A context as a host builds one: everything but the search box's draft,
 * which it may leave out.
 */
export type ShellContextInput = Omit<ShellContext, DraftFields> & Partial<Pick<ShellContext, DraftFields>>;
/**
 * Provides the context the parts read.
 *
 * A host that builds its own and leaves the draft out gets the box as it was
 * before the results were read under it: a draft that Enter commits and that
 * narrows nothing until then. Read live it would narrow only what reads
 * {@link ShellContext.liveQuery}, and that host's own results were wired to
 * `query` before there was any such thing — so the header's counts would say
 * one thing and the rows under them another. `DataShell` provides the whole
 * of it.
 */
export declare function provideShellContext(input: ShellContextInput): ShellContext;
/**
 * Reads the surrounding shell. Throws rather than returning a hollow default,
 * because a view rendered outside a shell is a wiring mistake worth surfacing
 * at the point of failure.
 */
export declare function useShellContext(): ShellContext;
export {};
