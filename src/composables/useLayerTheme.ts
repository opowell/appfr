import { computed, getCurrentInstance, shallowRef } from 'vue'
import type { ComputedRef } from 'vue'
import type { ShellTheme } from '../types'

/** The three theming props every free-standing part takes. */
export interface LayerThemeProps {
  theme?: ShellTheme
  accent?: string
  tokens?: Record<string, string>
}

export interface LayerTheme {
  /** For the layer's `data-dc-theme`. */
  theme: ComputedRef<string>
  /** For the layer's `style`: the tokens it carries, or nothing. */
  style: ComputedRef<Record<string, string> | undefined>
  /**
   * Reads the shell the component sits in. Called once the component is in
   * the page, and again whenever the layer goes up — a shell's theme is a
   * prop, and may have changed since.
   */
  adopt(): void
}

/**
 * The palette for a layer drawn outside the shell it belongs to — a dialog, a
 * stack of toasts.
 *
 * Those are teleported to `body`, where no ancestor's `overflow` can clip them
 * and no stacking context can put them under something; and `body` is outside
 * every `.dc-shell`, which is where the tokens are declared. So the layer is a
 * `.dc-shell` of its own, as `<MenuBar>` is, and dresses itself the way the
 * shell it was opened from is dressed: the same theme, and the same tokens set
 * on that shell's element — which is where `DataShell`'s `tokens` and `accent`
 * props put them. A host's stylesheet rules on `.dc-shell` reach it for
 * nothing, being rules on a class it carries.
 *
 * Its own `theme`, `accent` and `tokens` props win over what it finds, and are
 * all there is for a layer that sits in no shell at all — a toast stack
 * mounted at the root of an app, say. With none of them and no shell, it is
 * the minimal theme, as anything of the shell's is by default.
 */
export function useLayerTheme(props: LayerThemeProps): LayerTheme {
  const instance = getCurrentInstance()
  const found = shallowRef<{ theme?: string; tokens: Record<string, string> } | null>(null)

  function adopt(): void {
    /*
     * The component's own place in the page. Its root is a teleport, or the
     * comment a closed `v-if` leaves, and either way the node Vue holds for it
     * sits where the component was written, not where the layer is drawn.
     */
    const node = instance?.proxy?.$el as Node | null | undefined
    const at = node instanceof Element ? node : node?.parentElement
    const shell = at?.closest<HTMLElement>('.dc-shell')
    if (!shell) {
      found.value = null
      return
    }
    const tokens: Record<string, string> = {}
    for (const name of Array.from(shell.style)) {
      if (name.startsWith('--')) tokens[name] = shell.style.getPropertyValue(name)
    }
    found.value = { theme: shell.dataset.dcTheme, tokens }
  }

  const theme = computed(() => props.theme ?? found.value?.theme ?? 'minimal')

  const style = computed(() => {
    const tokens = {
      ...found.value?.tokens,
      ...props.tokens,
      ...(props.accent ? { '--dc-accent': props.accent } : {}),
    }
    return Object.keys(tokens).length ? tokens : undefined
  })

  return { theme, style, adopt }
}
