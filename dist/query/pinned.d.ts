import type { ColumnDef, ShellRow } from '../types';
/**
 * The fields the query holds to one value on every row it keeps: each
 * `field=value` it ANDs on, unnegated and not a range. A query of several
 * `OR`ed parts pins nothing, as each part may keep another value; nor does a
 * field named twice, `search=1 search=2` being the rows of either.
 */
export declare function pinnedFields(expr: string): Set<string>;
/**
 * The columns less those the query has narrowed to one value — `category=Poetry`
 * leaves every row's Category the same, and a column saying so on every line
 * says nothing the bar does not. A column of lists stays: `tags=teacher` keeps
 * rows whose tags are each their own. So does the identity, which names each
 * row whatever the query asks of it.
 *
 * The field is the column's key, which a column reading another field says it
 * stands for: `{ key: 'item', field: 'from' }` is the item a row belongs to,
 * shown by its title. As that title is not the value narrowed to, and a row
 * may belong to several records, such a column stays while its rows on the
 * page say different things.
 */
export declare function withoutPinned(columns: ColumnDef[], expr: string, rows: ShellRow[]): ColumnDef[];
