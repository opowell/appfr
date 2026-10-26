import type { ShallowRef } from 'vue';
import type { DomainSchema } from '../types';
export interface UseStableSchemaOptions {
    /**
     * What makes two schemas the same one. `JSON.stringify` unless said.
     *
     * Give one where the schema holds what JSON cannot say or says too much of:
     * a column `component` with a cycle in it, or one large enough that writing
     * it out on every rebuild costs more than the rebuild saves — or where a
     * change that matters lives in a function.
     */
    key?: (schema: DomainSchema) => string;
}
/**
 * A schema built from live data, handed over only when it comes out different.
 *
 * A schema whose facets are the data's values and whose counts are the data's
 * size has to be rebuilt as the data moves — and the data moves far more
 * often than what the schema says: a poll lands, a duration ticks, a case
 * flips, while the counts, the chips' options and the ranges' ceilings stand
 * still. Handing the shell a new object each time would re-derive the query
 * and rebuild the query panel for nothing, losing whatever was open in it.
 * So `build` re-runs whenever what it reads changes, as a `watchEffect`, and
 * the ref only takes the result when it differs *by value* from the one it
 * holds.
 *
 * By value means by `key`, `JSON.stringify` unless said, which leaves out
 * every function: a column's `format`, `value` and `click`, and a domain's
 * `formatCount`, are not compared. A rebuild that changed only one of those
 * keeps the old schema, and the old function with it — so a function that
 * reads changing data should read it when it is called rather than close
 * over a snapshot of it, or the `key` should say what it depends on.
 *
 * Use it in a component's `setup` (or any effect scope), which stops the
 * effect with it.
 */
export declare function useStableSchema(build: () => DomainSchema, options?: UseStableSchemaOptions): ShallowRef<DomainSchema>;
