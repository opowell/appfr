/**
 * FNV-1a over `seed`. Used to derive every mock value, which keeps generated
 * data stable across runs — stories and snapshots stay meaningful.
 */
export declare function fnv1a(seed: string): number;
/** Compact metric formatting: `940`, `1.2k`, `3.4m`. */
export declare function formatMetric(value: number): string;
/**
 * `dd.mm.yyyy` in UTC. Fixed rather than locale-derived so the same query
 * renders identically in a test, a story and a screenshot diff.
 */
export declare function formatDate(iso: string): string;
/** Two-digit ordinal for the leading column of the list and table views. */
export declare function formatOrdinal(index: number): string;
export declare function formatPercent(fraction: number): string;
