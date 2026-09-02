import type { ComputedRef } from 'vue';
import type { ColumnDef } from '../types';
/**
 * The columns for what is on screen: the entity's own set when it declares
 * one, the schema's when the results span every entity, and none at all when
 * neither does — the shell invents no table.
 *
 * Scoped to the *view* rather than to each row, the way {@link useViewLabels}
 * is. A mixed result set has no single entity's vocabulary in it, so one set
 * of headings has to serve every row under them, which is why that set is the
 * schema's rather than any entity's.
 */
export declare function useColumns(): ComputedRef<ColumnDef[]>;
