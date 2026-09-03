import type { ColumnAlign, ColumnDef, ColumnRole, DomainSchema, EntitySchema, ShellRow } from '../types';
/**
 * What a type *is*, as data.
 *
 * A table is the {@link ColumnDef}s its entity declares — exactly those, in
 * that order, however many. The shell reads none of a row's fields by a name
 * of its own: which fields a record has is the schema's to say, and a set of
 * columns nobody asked for would be the component deciding what the data is.
 *
 * The views that are not tables — a card, a tile, a link row, a preview pane —
 * are an identity, a reference, a number or two and a mark, so they read the
 * columns by {@link ColumnRole} rather than by position. {@link defaultColumns}
 * is here for the schema that wants the familiar set: something to ask for,
 * not something to be given.
 */
/** Shown when a column resolves to nothing — absent, rather than empty. */
export declare const EMPTY_CELL = "\u2014";
/** Headings for {@link defaultColumns} where the caller names none. */
export declare const GENERIC_NAMES: {
    readonly identity: "Item";
    readonly reference: "Reference";
    readonly metrics: readonly ["Metric", "Metric 2"];
};
/** One metric of the default set: what it is called, and what it counts. */
export interface DefaultMetric {
    label: string;
    /** The row field it reads. `metric1`, `metric2`, … in order when unsaid. */
    field?: string;
    /**
     * The {@link EntitySchema.key} this number counts, where the schema lists
     * it — what makes the number pressable.
     */
    drill?: string;
}
export interface DefaultColumnNames {
    identity: string;
    reference: string;
    metrics: Array<string | DefaultMetric>;
}
/**
 * The familiar set: an ordinal, the identity pair, the row's type, a metric or
 * two, the date, the state, the score and the tint — reading the fields the
 * shell used to fix on the row itself, so a source that already returns those
 * keeps working by moving them into {@link ShellRow.fields}.
 *
 * Nothing applies this. It is what a schema spreads into its own `columns`
 * when that set is what it wanted, whole or as a starting point:
 *
 * ```ts
 * columns: [
 *   ...defaultColumns({ identity: 'Piece', reference: 'Part no.', metrics: ['Colors'] }),
 *   { key: 'owner', label: 'Owner' },
 * ]
 * ```
 *
 * Called with nothing it is the generic set, for the mixed result where no one
 * type's vocabulary applies.
 */
export declare function defaultColumns(names?: Partial<DefaultColumnNames>): ColumnDef[];
/** The first column playing a part, or undefined where nothing plays it. */
export declare function roleColumn(columns: ColumnDef[], role: ColumnRole): ColumnDef | undefined;
/** Every column playing a part, in the order the schema declared them. */
export declare function roleColumns(columns: ColumnDef[], role: ColumnRole): ColumnDef[];
/**
 * The columns the table draws for the current scope: an entity's own where one
 * is filtered to, the schema's across every entity, and none at all where
 * neither declared any.
 *
 * Columns are then dropped by {@link ColumnDef.when} — which is how one set
 * can carry a column, the row's type, that only means anything in the mixed
 * result set — and a `tint` is dropped always, being a colour rather than a
 * cell.
 */
export declare function columnsFor(schema: DomainSchema | null, entity: EntitySchema | null): ColumnDef[];
/**
 * The raw value behind a cell.
 *
 * A column that computes its own beats everything; otherwise the field it
 * names — `field`, or its `key` — is read off {@link ShellRow.fields}, and
 * then off the row's own three. The bag comes first: those names are the
 * schema's, and a type that has a field called `id` of its own means that one.
 */
export declare function cellValue(column: ColumnDef, row: ShellRow): unknown;
/**
 * What identifies a column, for a schema that did not say.
 *
 * A key is what a rendered column is tracked by, so it has to be there and it
 * has to be distinct — two columns keyed the same are two columns the renderer
 * cannot tell apart, and a column keyed `undefined` is every column at once.
 * A schema naming its field or computing its value has already said enough for
 * one to be worked out, so the key is optional and this is the chain: the key,
 * then the field, then the label, and finally the position, which is always
 * there.
 */
export declare function columnKey(column: ColumnDef, index: number): string;
/**
 * What identifies a row, for a source that did not say.
 *
 * The same argument as {@link columnKey}, one level up: rows keyed alike are
 * rows the renderer reuses for each other — a checkbox ticked against the row
 * that replaces it, an open row that stays open under a different record. An
 * id is what a source should return, and where one is missing the row's place
 * in the result stands in, which is distinct for as long as the page is.
 */
export declare function rowKey(row: ShellRow, index: number): string;
/** How a value reads with nothing said about it — the kind's own formatting. */
export declare function defaultCellText(value: unknown, kind: ColumnDef['kind']): string;
/** What the cell says: the column's own formatting, or the kind's. */
export declare function cellText(column: ColumnDef, row: ShellRow): string;
/**
 * The whole of a cell, for the hover.
 *
 * A cell says as much as its column has room for, and there are two ways that
 * is less than the value: a formatter that rounds — `1.3k` where the row holds
 * 1300 — and a width that cuts a long name off. This answers both. The exact
 * value where the text is a shortened one, and the text itself where it is
 * not, which is the whole of the name the column truncated.
 *
 * Nothing is invented on the way: the number is every digit of it rather than
 * a grouped rendering, so a cell whose text is already the plain value — a
 * year, a part number — hovers as exactly what it shows.
 */
export declare function cellFull(column: ColumnDef, row: ShellRow): string;
/** The same for a column that may not be there at all — a role nothing plays. */
export declare function cellTextOf(column: ColumnDef | undefined, row: ShellRow): string;
/** Numbers line up on the right, and everything else reads from the left. */
export declare function columnAlign(column: ColumnDef): ColumnAlign;
export declare function columnClass(column: ColumnDef): string;
/**
 * Whether the cell is truncated to one line. On for the text kinds, which is
 * what keeps every row the same depth however long a value is; off for the
 * marks, which have a size of their own.
 */
export declare function columnTruncates(column: ColumnDef): boolean;
