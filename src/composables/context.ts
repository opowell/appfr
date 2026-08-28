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
  rows: ShallowRef<ShellRow[]>
  total: Ref<number>
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
