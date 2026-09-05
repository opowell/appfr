import type { ColumnAlign, ColumnDef, ColumnRole, DomainSchema, EntitySchema, ShellRow } from '../types';
/**
 * What a type *is*, as data.
 *
 * A table is the {@link ColumnDef}s its entity declares — exactly those, in
 * that order, however many. The shell reads none of a row's fields by a name
 * of its own, and offers no set of its own to fall back on: which fields a
 * record has is the schema's to say, and a set of columns nobody asked for
 * would be the component deciding what the data is.
 *
 * The views that are not tables — a card, a tile, a link row, a preview pane —
 * are an identity, a reference, a number or two and a mark, so they read the
 * columns by {@link ColumnRole} rather than by position.
 */
/** Shown when a column resolves to nothing — absent, rather than empty. */
export declare const EMPTY_CELL = "\u2014";
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
