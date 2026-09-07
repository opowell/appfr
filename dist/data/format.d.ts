/**
 * FNV-1a over `seed`. Used to derive every mock value, which keeps generated
 * data stable across runs — stories and snapshots stay meaningful.
 */
export declare function fnv1a(seed: string): number;
/** Compact metric formatting: `940`, `1.2k`, `3.4m`. */
export declare function formatMetric(value: number): string;
/**
 * A population, grouped: `240`, `3,214`.
 *
 * What {@link EntitySchema.count} is expected to hold, and what the shell
 * formats its own live counts with, so a control that carries both — the list
 * of types in the header, where the type in force says what matched and the
 * rest say what they hold — does not put `2,641` beside `3214`. Fixed rather
 * than locale-derived, for the same reason {@link formatDate} is.
 */
export declare function formatCount(value: number): string;
/**
 * `dd.mm.yyyy` in UTC. Fixed rather than locale-derived so the same query
 * renders identically in a test, a story and a screenshot diff.
 */
export declare function formatDate(iso: string): string;
/** Two-digit ordinal for the leading column of the list and table views. */
export declare function formatOrdinal(index: number): string;
