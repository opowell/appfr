/**
 * FNV-1a over `seed`. Used to derive every mock value, which keeps generated
 * data stable across runs — stories and snapshots stay meaningful.
 */
export function fnv1a(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

/** Compact metric formatting: `940`, `1.2k`, `3.4m`. */
export function formatMetric(value: number): string {
  if (!Number.isFinite(value)) return '—'
  const abs = Math.abs(value)
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}k`
  return String(Math.round(value))
}

/**
 * A population, grouped: `240`, `3,214`.
 *
 * What {@link EntitySchema.count} is expected to hold, and what the shell
 * formats its own live counts with, so a control that carries both — the list
 * of types in the header, where the type in force says what matched and the
 * rest say what they hold — does not put `2,641` beside `3214`. Fixed rather
 * than locale-derived, for the same reason {@link formatDate} is.
 */
export function formatCount(value: number): string {
  if (!Number.isFinite(value)) return '—'
  return Math.round(value).toLocaleString('en-US')
}

/**
 * `dd.mm.yyyy` in UTC. Fixed rather than locale-derived so the same query
 * renders identically in a test, a story and a screenshot diff.
 */
export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  return `${day}.${month}.${date.getUTCFullYear()}`
}

/** Two-digit ordinal for the leading column of the list and table views. */
export function formatOrdinal(index: number): string {
  return String(index + 1).padStart(2, '0')
}

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
export function formatDateTime(
  iso: string | null | undefined,
  locale?: string | string[],
): string {
  if (!iso) return '—'
  const date = new Date(iso)
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleString(locale, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
}

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
export function formatBytes(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined || !Number.isFinite(bytes) || bytes < 0) return '—'
  if (bytes < 1000) return `${bytes} B`
  const units = ['kB', 'MB', 'GB', 'TB']
  let value = bytes
  let unit = -1
  while (value >= 1000 && unit < units.length - 1) {
    value /= 1000
    unit += 1
  }
  return `${value < 100 ? value.toFixed(1) : Math.round(value)} ${units[unit]}`
}

/**
 * How long something took, from milliseconds: `640ms`, `12.4s`, `3m 7s`.
 *
 * Precision where it is read — a test's milliseconds, a step's tenths of a
 * second — and none where it is not: past a minute the seconds are whole.
 * `—` for nothing, which includes `0`: a duration nobody measured is far
 * more common than one that took no time at all.
 */
export function formatDuration(ms: number | null | undefined): string {
  if (!ms || !Number.isFinite(ms)) return '—'
  if (ms < 1000) return `${Math.round(ms)}ms`
  const seconds = ms / 1000
  return seconds < 60
    ? `${seconds.toFixed(1)}s`
    : `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`
}

/**
 * Elapsed time from whole seconds, as a clock reads it: `42s`, `1:42`,
 * `61:05`.
 *
 * Because a run that took a hundred seconds does not read as `100`. Minutes
 * never roll over into hours — a column of these lines up by the colon — and
 * `—` for nothing or less, a run that has not started having taken no time
 * worth printing.
 */
export function formatElapsed(seconds: number | null | undefined): string {
  if (seconds === null || seconds === undefined || !Number.isFinite(seconds) || seconds <= 0) {
    return '—'
  }
  const minutes = Math.floor(seconds / 60)
  return minutes ? `${minutes}:${String(seconds % 60).padStart(2, '0')}` : `${seconds}s`
}

/**
 * A share as a whole percentage: `0.5` is `50%`.
 *
 * Printed rather than drawn, since a bar the same length down every row is a
 * column that says nothing. `—` for a share that does not exist — a ratio
 * over nothing, which is not the same answer as none of it.
 */
export function formatPercent(share: number | null | undefined): string {
  if (share === null || share === undefined || !Number.isFinite(share)) return '—'
  return `${Math.round(share * 100)}%`
}

/**
 * Text without the terminal's colour codes. A tool that writes for a terminal
 * — a test runner's errors, a build's log — puts `\x1b[31m` in its messages,
 * and on a page that is not red but `[31m` in the middle of the text.
 */
export function stripAnsi(text: string): string {
  // eslint-disable-next-line no-control-regex
  return text.replace(/\x1b\[[0-9;]*m/g, '')
}
