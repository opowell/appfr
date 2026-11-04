import { computed, shallowRef, watch } from 'vue'
import type { ComputedRef, Ref, ShallowRef } from 'vue'
import type { ShellRow } from '../types'

export interface UseHeldRecordOptions {
  /** Whether the rows are being read a record at a time. */
  active: ComputedRef<boolean>
  /** The rows of the page, which while reading is the one row. */
  rows: ShallowRef<ShellRow[]>
  pending: Ref<boolean>
  /** The page on screen, which while reading is the record's place. */
  page: ComputedRef<number>
  /** Says which list the rows are of: a change here is another list. */
  list: ComputedRef<string>
  /** Where a row now sits in the results, or null where it was not found. */
  locate(id: string, place: number): Promise<number | null>
  /** Moves the page without a step: the place of the same record has changed. */
  moveTo(page: number): void
}

export interface HeldRecordState {
  /** The record being read, or null while there is none to hold yet. */
  id: ComputedRef<string | null>
  /** Whether that record has left the results and is only still being read. */
  gone: ComputedRef<boolean>
  /** Whether a record is held at all, whatever has become of its row. */
  holding: ComputedRef<boolean>
  /**
   * The page to go to for a step to `page`, as the reader counts — see below —
   * or null where the step has been taken without going anywhere.
   */
  step(page: number): number | null
  /** Moves the place of a record that has gone, the results having shrunk past it. */
  moveTo(page: number): void
}

/**
 * Holds on to the record being read while the rows under it change.
 *
 * Read is a page a record, so what it draws would otherwise be whatever row
 * has that place: a search still running moves its rows around, and a reader
 * would see the record swapped for another while reading it — and where
 * reading a record is what takes it out of the results, go on to read every
 * one after it. So a record once on screen stays until the reader moves: the
 * rows changing moves the *place* to the record, and only a change of page,
 * or of list, moves the record to the place.
 *
 * A record that leaves the results stays counted where it was until the reader
 * steps away, as though it were still there. That is what keeps a step honest:
 * what was the next record now has this one's place, and a page count that
 * had forgotten this one would step straight over it. {@link HeldRecordState.step}
 * is the translation, and the shell's `pageCount` adds the one back.
 */
export function useHeldRecord(options: UseHeldRecordOptions): HeldRecordState {
  /** `next`, once a record has gone, is the row that took its place. */
  const held = shallowRef<{ id: string; page: number; list: string; gone: boolean; next?: string } | null>(null)
  let lookup = 0

  /** Takes what is on screen to hold, once there is something settled to take. */
  const take = (): void => {
    const row = options.rows.value[0]
    held.value = row && !options.pending.value
      ? { id: row.id, page: options.page.value, list: options.list.value, gone: false }
      : null
  }

  const sync = (): void => {
    const now = held.value
    if (!options.active.value) {
      held.value = null
      return
    }
    // The reader moved, or the list is another: the place decides again.
    if (!now || now.page !== options.page.value || now.list !== options.list.value) {
      take()
      return
    }
    if (options.pending.value) return
    const row = options.rows.value[0]
    if (row?.id === now.id) {
      if (now.gone) held.value = { ...now, gone: false, next: undefined }
      return
    }
    if (!now.gone || row?.id !== now.next) void follow(now)
  }

  /** The rows no longer have the record at its place: finds where it went. */
  const follow = async (from: NonNullable<typeof held.value>): Promise<void> => {
    const asked = ++lookup
    const place = await options.locate(from.id, from.page)
    // A record that has gone has no place of its own, so it keeps to the row
    // after it: rows landing before that one must not make a step go back.
    const after = place === null && from.next ? await options.locate(from.next, from.page) : null
    if (asked !== lookup || held.value?.id !== from.id || held.value.page !== from.page) return
    const next = options.rows.value[0]?.id
    if (place !== null) moveTo(place, false)
    else if (after === null) held.value = { ...from, gone: true, next }
    else if (after !== from.page) moveTo(after)
  }

  const moveTo = (page: number, gone = held.value?.gone ?? false): void => {
    if (!held.value) return
    held.value = { ...held.value, page, gone }
    options.moveTo(page)
  }

  // After the flush, so the results have answered the page or say they are
  // pending: a row read before they had would be the last page's, held here.
  watch([options.active, options.rows, options.pending, options.page, options.list], sync, {
    immediate: true,
    flush: 'post',
  })

  return {
    id: computed(() => held.value?.id ?? null),
    gone: computed(() => held.value?.gone === true),
    holding: computed(() => held.value !== null),
    step(page) {
      const now = held.value
      if (!now?.gone) return page
      if (page < now.page) return page
      // Past a record that has gone, every place is one lower than it reads —
      // and the next one up is the page already on screen, whose row is the
      // one to read now.
      if (page - 1 > now.page) return page - 1
      take()
      return null
    },
    moveTo,
  }
}
