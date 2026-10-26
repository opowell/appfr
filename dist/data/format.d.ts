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
/**
 * A date with its time, in the reader's own locale — `Oct 26, 2026, 09:14`.
 *
 * Not {@link formatDate}, which is fixed and in UTC so a test, a story and a
 * screenshot diff agree. This is for the other case: a tool read by the
 * person who ran it, where *when* means their clock and the minute matters —
 * a run that finished, a crawl that started. Being locale-derived it reads
 * differently on two machines, so keep it out of anything compared as text.
 * `locale` pins it where that matters. `—` for nothing, or for a date that
 * does not parse.
 */
export declare function formatDateTime(iso: string | null | undefined, locale?: string | string[]): string;
/**
 * `28.0 kB`, `1.2 MB`, `3.4 GB` — a size as a reader takes it in, rather than
 * a count of bytes whose order of magnitude has to be worked out from its
 * digits.
 *
 * Decimal units, as file managers and the browser's own download list show
 * them. One decimal place below 100 of a unit and none above, which keeps a
 * column the same few characters wide across five orders of magnitude. Under
 * a kilobyte it is the bytes themselves — `0 B` for nothing — and `—` for a
 * size that is missing or negative.
 */
export declare function formatBytes(bytes: number | null | undefined): string;
/**
 * How long something took, from milliseconds: `640ms`, `12.4s`, `3m 7s`.
 *
 * Precision where it is read — a test's milliseconds, a step's tenths of a
 * second — and none where it is not: past a minute the seconds are whole.
 * `—` for nothing, which includes `0`: a duration nobody measured is far
 * more common than one that took no time at all.
 */
export declare function formatDuration(ms: number | null | undefined): string;
/**
 * Elapsed time from whole seconds, as a clock reads it: `42s`, `1:42`,
 * `61:05`.
 *
 * Because a run that took a hundred seconds does not read as `100`. Minutes
 * never roll over into hours — a column of these lines up by the colon — and
 * `—` for nothing or less, a run that has not started having taken no time
 * worth printing.
 */
export declare function formatElapsed(seconds: number | null | undefined): string;
/**
 * A share as a whole percentage: `0.5` is `50%`.
 *
 * Printed rather than drawn, since a bar the same length down every row is a
 * column that says nothing. `—` for a share that does not exist — a ratio
 * over nothing, which is not the same answer as none of it.
 */
export declare function formatPercent(share: number | null | undefined): string;
/**
 * Text without the terminal's control sequences, colour codes among them. A tool that writes for a terminal
 * — a test runner's errors, a build's log — puts `\x1b[31m` in its messages,
 * and on a page that is not red but `[31m` in the middle of the text.
 */
export declare function stripAnsi(text: string): string;
