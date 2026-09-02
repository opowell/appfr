import type { ColumnAlign, ColumnDef, DomainSchema, EntitySchema, ShellRow } from '../types';
/**
 * What the table shows, as data.
 *
 * The four {@link EntityLabels} name a shape the shell fixed: an identity
 * pair, two metrics, a date and a state. That is the right shape for a card
 * and a tile, which are an identity and a number or two by construction — and
 * the wrong one for a table, where the whole question is which columns and how
 * many.
 *
 * So a table is the {@link ColumnDef}s it was given and nothing besides. The
 * shell reads no table out of the labels: which columns a type has is the
 * schema's to say, the way what a drill means is the host's, and a set of
 * columns nobody asked for is the component deciding what the data is.
 * {@link defaultColumns} is here for the schema that wants the familiar eight
 * — as something to ask for, not something to be given.
 */
/** Shown when a column resolves to nothing — absent, rather than empty. */
export declare const EMPTY_CELL = "\u2014";
/**
 * The familiar eight, built from an entity's four labels — the ordinal, the
 * identity pair, the row's type, the two metrics, the date and the state.
 *
 * Nothing applies this: it is what a schema spreads into its own `columns`
 * when that set is the table it wanted, whole or as a starting point.
 *
 * ```ts
 * columns: [...defaultColumns(entity), { key: 'owner', label: 'Owner' }]
 * ```
 *
 * `entity` is null for the mixed result set, where the labels are generic and
 * the row's own type earns a column of its own.
 */
export declare function defaultColumns(entity: EntitySchema | null): ColumnDef[];
/**
 * The columns for the current scope: an entity's own where one is filtered to,
 * the schema's across every entity, and none at all where neither declared
 * any. Columns are then dropped by {@link ColumnDef.when}, which is how one
 * set can carry a column — the row's type — that only means anything in the
 * mixed result set.
 */
export declare function columnsFor(schema: DomainSchema | null, entity: EntitySchema | null): ColumnDef[];
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
/**
 * The raw value behind a cell.
 *
 * A column that computes its own beats everything; otherwise the field named,
 * or the column's key, is looked for on the row and then among its facets. The
 * facets are what makes a column of anything possible without a change to
 * {@link ShellRow}: a source already returns whatever it likes there, and this
 * is the lookup that puts it on screen.
 */
export declare function cellValue(column: ColumnDef, row: ShellRow): unknown;
/** How a value reads with nothing said about it — the kind's own formatting. */
export declare function defaultCellText(value: unknown, kind: ColumnDef['kind']): string;
/** What the cell says: the column's own formatting, or the kind's. */
export declare function cellText(column: ColumnDef, row: ShellRow): string;
/** Numbers line up on the right, and everything else reads from the left. */
export declare function columnAlign(column: ColumnDef): ColumnAlign;
export declare function columnClass(column: ColumnDef): string;
/**
 * Whether the cell is truncated to one line. On for the text kinds, which is
 * what keeps every row the same depth however long a value is; off for the
 * marks, which have a size of their own.
 */
export declare function columnTruncates(column: ColumnDef): boolean;
