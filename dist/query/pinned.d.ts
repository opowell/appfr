import type { ColumnDef, ShellRow } from '../types';
/**
 * The fields the query holds to one value on every row it keeps: each
 * `field=value` it ANDs on, unnegated and not a range. A query of several
 * `OR`ed parts pins nothing, as each part may keep another value.
 */
export declare function pinnedFields(expr: string): Set<string>;
/**
 * The columns less those the query has narrowed to one value — `category=Poetry`
 * leaves every row's Category the same, and a column saying so on every line
 * says nothing the bar does not. A column of lists stays: `tags=teacher` keeps
 * rows whose tags are each their own. So does the identity, which names each
 * row whatever the query asks of it.
 */
export declare function withoutPinned(columns: ColumnDef[], expr: string, rows: ShellRow[]): ColumnDef[];
