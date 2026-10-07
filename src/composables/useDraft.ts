import { computed, getCurrentScope, onScopeDispose, ref, shallowRef, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { EntitySchema, ShellQuery } from '../types'
import { RESULT_FIELDS } from '../query/schema'
import { expandShortcuts, readDraft, refineExpression } from '../data/expression'

/** How long typing has to pause before what was typed is read. */
export const DRAFT_DELAY = 150

export interface UseDraftOptions {
  /** The committed query — the one the URL holds. */
  query: ComputedRef<ShellQuery>
  /** The entity it lists, whose column shortcuts a draft may be written in. */
  entity: ComputedRef<EntitySchema | null>
  /**
   * Commits an expression, returning whether that navigated anywhere — see
   * {@link QueryState.setExpression}, which is what this usually is.
   */
  setExpression(expr: string): boolean
  /** Milliseconds of quiet before a draft is read. {@link DRAFT_DELAY} by default. */
  delay?: number
}

export interface DraftState {
  /** What is in the box, keystroke by keystroke. */
  text: Ref<string>
  /**
   * The query as the results are read under it: the committed one, with the
   * draft ANDed on and its own page. The committed query itself wherever
   * there is no draft, so a reader of this is a reader of `query` until
   * someone types.
   */
  live: ComputedRef<ShellQuery>
  /** Whether a draft is narrowing {@link live} right now. */
  drafting: ComputedRef<boolean>
  /**
   * A page of the draft's results. Held here rather than in the URL, because
   * the draft is not in the URL either: a page of a query nobody can link to
   * is not a page anybody can link to.
   */
  setPage(page: number): void
  /** Enter: what was typed is ANDed on to the query, and the box empties. */
  commit(): void
  /** Escape: what was typed is given up, and the results are the query's again. */
  abandon(): void
  /**
   * Gives the draft up *in favour of* a navigation — a press on a record the
   * draft found, which is the answer to it rather than a refinement of it.
   * The box empties now; the results the draft drew stay up until `move`'s
   * query lands, so the screen goes from the draft's results to the new
   * query's without the committed query's in between.
   *
   * `move` returns whether it navigated, as {@link QueryState.narrow} does.
   */
  release(move: () => boolean): void
}

/**
 * The header's search box, read as you type.
 *
 * What is typed narrows the results at once — committed query AND draft —
 * without being part of the query: nothing reaches the URL until Enter makes
 * it a part, so the history holds the queries that were asked and not every
 * prefix of them on the way. Escape gives it up and the results are the
 * committed query's again.
 *
 * Read after a pause ({@link DRAFT_DELAY}) rather than on every keystroke: a
 * word is typed faster than a source answers, and each keystroke would start
 * a query the next one throws away. Emptied, it is read at once — there is
 * nothing to wait for in going back.
 *
 * What is read is {@link readDraft} of the box: the term on its way to being
 * one is left out until it is one, so `status:` does not empty the screen
 * before the value after it is typed.
 */
export function useDraft(options: UseDraftOptions): DraftState {
  const delay = options.delay ?? DRAFT_DELAY
  const text = ref('')
  /** The draft as last read: what the results are narrowed by. */
  const applied = ref('')
  /**
   * The box has been emptied by a navigation that has not landed yet — see
   * {@link DraftState.release} — and {@link applied} stands until it does.
   */
  let holding = false
  let timer: ReturnType<typeof setTimeout> | undefined

  const settle = () => {
    clearTimeout(timer)
    timer = undefined
  }

  /** What the draft adds to the query, written as the query would be. */
  const typed = computed(() => expandShortcuts(readDraft(applied.value), options.entity.value))

  const drafting = computed(() => typed.value.trim() !== '')

  /**
   * Everything the draft's results are a result *of*: the draft, and the
   * committed query's own fields that decide what matches. The draft's page is
   * a page of those, and goes back to the first when any of them changes —
   * the same rule the committed query keeps.
   */
  const matching = computed(() =>
    JSON.stringify([typed.value, ...RESULT_FIELDS.map((field) => options.query.value[field])]),
  )
  const paged = shallowRef<{ of: string; page: number } | null>(null)

  const live = computed<ShellQuery>(() => {
    const query = options.query.value
    if (!drafting.value) return query
    const page = paged.value?.of === matching.value ? paged.value.page : 1
    return { ...query, expr: refineExpression(query.expr, typed.value), page }
  })

  watch(text, (value) => {
    settle()
    if (!value.trim()) {
      // A box emptied for a navigation still on its way keeps its results up.
      if (!holding) applied.value = ''
      return
    }
    // Typing again is a new draft, whatever the last one was waiting on.
    holding = false
    timer = setTimeout(() => {
      timer = undefined
      applied.value = text.value
    }, delay)
  })

  /*
   * The navigation a release waited on has landed. Synchronously, so the
   * query that arrives is never read with the draft still on it — for a
   * router that writes the URL in the same tick, that is inside the call.
   */
  watch(
    options.query,
    () => {
      if (!holding) return
      holding = false
      applied.value = ''
    },
    { flush: 'sync' },
  )

  const release = (move: () => boolean) => {
    settle()
    holding = true
    text.value = ''
    if (!move() && holding) {
      // Nowhere to go — the query asked for is the one in force — so nothing
      // is coming to replace the draft's results, and they go now.
      holding = false
      applied.value = ''
    }
  }

  if (getCurrentScope()) onScopeDispose(settle)

  return {
    text,
    live,
    drafting,
    setPage(page) {
      paged.value = { of: matching.value, page: Math.max(1, Math.floor(page)) }
    },
    commit() {
      const written = text.value.trim()
      if (!written) return
      // What was typed rather than what was read of it: Enter is the reader
      // saying this is the term, half-finished or not.
      const expr = refineExpression(
        options.query.value.expr,
        expandShortcuts(written, options.entity.value),
      )
      // Until the part lands the draft's results are already the answer, so
      // they stay up rather than the query without it flashing between.
      applied.value = written
      release(() => options.setExpression(expr))
    },
    abandon() {
      settle()
      holding = false
      text.value = ''
      applied.value = ''
    },
    release,
  }
}
