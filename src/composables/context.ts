import { inject, provide } from 'vue'
import type { ComputedRef, InjectionKey, Ref, ShallowRef } from 'vue'
import type { DataSource, DomainSchema, EntitySchema, Selection, ShellRow } from '../types'
import type { QueryState } from './useQueryState'

/**
 * Everything the header, the query panel and the result views need. Provided
 * once by `DataShell` so the parts stay independently testable without a chain
 * of props threading through every view.
 */
export interface ShellContext extends QueryState {
  schema: ComputedRef<DomainSchema>
  /** Every entity the schema declares — logs and settings among them. */
  entities: ComputedRef<EntitySchema[]>
  /** The rows of the current page, not of the whole result. */
  rows: ShallowRef<ShellRow[]>
  /** Rows matching the query, across every page of them. */
  total: Ref<number>
  /** Rows per page — what the shell asks its source for at a time. */
  limit: ComputedRef<number>
  /** Rows before the first on screen: `(page - 1) * limit`. */
  offset: ComputedRef<number>
  /** How many pages the total comes to. Never fewer than one. */
  pageCount: ComputedRef<number>
  pending: Ref<boolean>
  error: ShallowRef<unknown>
  /**
   * The data source, so a view can ask its own questions — the home screen's
   * per-type cards need one query per entity, not the shell's single one.
   */
  source: ComputedRef<DataSource>
  /** Rows shown inside each type's card on the home screen. */
  previewsPerType: ComputedRef<number>
  /** Whether the star affordance is offered on rows. */
  pinnable: ComputedRef<boolean>
  isPinned(row: ShellRow): boolean
  isPinnedId(id: string): boolean
  togglePin(row: ShellRow): void
  /**
   * Whether records may be ticked — the type in force naming an operation to
   * do to a selection, or the host asking for ticks outright.
   */
  selectable: ComputedRef<boolean>
  /** What is ticked: see {@link Selection}. */
  selection: ComputedRef<Selection>
  isSelected(row: ShellRow): boolean
  toggleSelect(row: ShellRow): void
  /**
   * Ticks or unticks every row on the page — the whole of it, since a page is
   * all the shell has in hand. Ticks made on other pages are left alone.
   */
  selectPage(on: boolean): void
  /** Unticks everything, on this page and every other. */
  clearSelection(): void
  /** Opening a row — the shell reports it, the host decides what it means. */
  activate(row: ShellRow): void
  /**
   * Asking for a new record of a type, from the button {@link EntitySchema.create}
   * puts on its card. Reported the same way, and for the same reason: making
   * one is the host's, not the shell's.
   */
  create(entity: EntitySchema): void
  /**
   * Copying the ticked records, and deleting them — the two operations
   * {@link EntitySchema.duplicate} and {@link EntitySchema.delete} name. Both
   * are reported with the {@link Selection} they are for and nothing else
   * happens, `create` being the pattern: the shell has no idea what a copy of
   * one of these is, and no way to unmake one.
   */
  duplicate(): void
  delete(): void
  /**
   * Narrowing to one record — from the affordance {@link EntitySchema.scope}
   * offers on its rows, or from a metric {@link EntitySchema.drills} named an
   * entity for. `entity` is what to list afterwards, and null when the press
   * was the row's own: narrow the whole corpus and pivot to nothing.
   *
   * Reported rather than applied. The shell holds a query, not a join — how
   * this record's id reaches the other records is the host's, which is the
   * only place that knows the term means anything.
   */
  drill(row: ShellRow, entity: EntitySchema | null): void
}

export const SHELL_CONTEXT_KEY: InjectionKey<ShellContext> = Symbol('dc.shellContext')

export function provideShellContext(context: ShellContext): ShellContext {
  provide(SHELL_CONTEXT_KEY, context)
  return context
}

/**
 * Reads the surrounding shell. Throws rather than returning a hollow default,
 * because a view rendered outside a shell is a wiring mistake worth surfacing
 * at the point of failure.
 */
export function useShellContext(): ShellContext {
  const context = inject(SHELL_CONTEXT_KEY, null)
  if (!context) {
    throw new Error(
      '[header-content-layout] No shell context found. Render this component inside <DataShell>.',
    )
  }
  return context
}
