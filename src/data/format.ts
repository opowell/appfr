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
