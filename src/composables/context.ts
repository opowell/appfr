import { inject, provide } from 'vue'
import type { ComputedRef, InjectionKey, Ref, ShallowRef } from 'vue'
import type { DataSource, DomainSchema, EntitySchema, ShellRow } from '../types'
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
  /** Opening a row — the shell reports it, the host decides what it means. */
  activate(row: ShellRow): void
  /**
   * Asking for a new record of a type, from the button {@link EntitySchema.create}
   * puts on its card. Reported the same way, and for the same reason: making
   * one is the host's, not the shell's.
   */
  create(entity: EntitySchema): void
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
