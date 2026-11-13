import type { PresentedRow } from './usePresentedRows'
import type { PressPreview, ShellContext } from './context'
import { scopeTerm } from '../query/drill'

/**
 * The listeners that put `preview` in the header while the pointer or the focus
 * is on a value, as `v-on` takes them.
 */
export function pressPreviewOn(shell: ShellContext, preview: PressPreview | null) {
  const set = (value: PressPreview | null) => {
    if (shell.pressPreview) shell.pressPreview.value = value
  }
  return {
    mouseenter: () => set(preview),
    mouseleave: () => set(null),
    focus: () => set(preview),
    blur: () => set(null),
  }
}

/** What a press on a row's name adds, where that press narrows to its record. */
export function recordPressPreview(shell: ShellContext, entry: PresentedRow): PressPreview | null {
  const term = shell.narrowsOnPress.value ? scopeTerm(entry.entity, entry.row) : null
  return term ? { term, name: entry.parts.identity, alone: entry.entity?.narrowsAlone === true } : null
}
