import type { App, ComputedRef, InjectionKey, MaybeRefOrGetter } from 'vue';
import type { ShellTheme } from 'themes';
/** The three theming props every free-standing part takes. */
export interface LayerThemeProps {
    theme?: ShellTheme;
    accent?: string;
    tokens?: Record<string, string>;
}
/**
 * A theme for the layers drawn outside a shell — dialogs, toasts, popovers —
 * as {@link provideShellTheme} and the plugin's options take it. Each field
 * may be a plain value, a ref or a getter, so a theme the app switches at
 * run time reaches layers already on screen.
 */
export interface ShellThemeInput {
    theme?: MaybeRefOrGetter<ShellTheme | undefined>;
    accent?: MaybeRefOrGetter<string | undefined>;
    tokens?: MaybeRefOrGetter<Record<string, string> | undefined>;
}
/**
 * What is provided under {@link SHELL_THEME_KEY}: the theme as it stands, and
 * — for a `DataShell` — the shell's own element, which is how a layer inside
 * a nearer `.dc-shell` of the host's knows to dress as that one instead.
 */
export interface ShellThemeSource {
    read(): LayerThemeProps;
    element?(): Element | null;
}
/**
 * Where a layer looks for the theme it was not given: provided by every
 * `DataShell` to what it renders, and by {@link provideShellTheme} or the
 * plugin's `theme`, `accent` and `tokens` options to a whole app.
 */
export declare const SHELL_THEME_KEY: InjectionKey<ShellThemeSource>;
/**
 * Sets the theme the layers below fall back to — dialogs, toasts and
 * popovers that sit in no shell, or beside one rather than inside it.
 *
 * Called in a component's `setup`, it reaches that component's descendants:
 * the root component's `setup` is the whole app. Given the app, it is
 * `app.provide`, for a `main.ts` — which is also what the plugin's `theme`,
 * `accent` and `tokens` options do.
 *
 *     provideShellTheme({ theme: 'dark', tokens: { '--dc-accent': '#6aa9ff' } })
 */
export declare function provideShellTheme(input: ShellThemeInput, app?: App): void;
/**
 * What a `DataShell` provides: its own three props, and its element. Read off
 * the instance lazily, as the element does not exist until the shell is
 * mounted, and that keeps the shell's side of this to a single call.
 */
export declare function provideShellOwnTheme(input: ShellThemeInput): void;
export interface LayerTheme {
    /** For the layer's `data-dc-theme`. */
    theme: ComputedRef<string>;
    /** For the layer's `style`: the tokens it carries, or nothing. */
    style: ComputedRef<Record<string, string> | undefined>;
    /**
     * Reads the shell the component sits in, in the page. Called once the
     * component is in the page, and again whenever the layer goes up — a
     * shell's theme is a prop, and may have changed since.
     */
    adopt(): void;
}
/**
 * The palette for a layer drawn outside the shell it belongs to — a dialog, a
 * stack of toasts, a popover.
 *
 * Those are teleported to `body`, where no ancestor's `overflow` can clip them
 * and no stacking context can put them under something; and `body` is outside
 * every `.dc-shell`, which is where the tokens are declared. So the layer is a
 * `.dc-shell` of its own — a `.dc-layer`, which keeps the palette and none of
 * the layout — and dresses itself as the shell it belongs to. A host's
 * stylesheet rules on `.dc-shell` reach it for nothing, being rules on a class
 * it carries.
 *
 * Which shell that is, first match wins:
 *
 * 1. The layer's own `theme`, `accent` and `tokens` props, field by field —
 *    each one given wins over whatever the rest of this list finds.
 * 2. The nearest `DataShell` it is rendered inside, as a component.
 * 3. The app's default, from {@link provideShellTheme} or the plugin.
 * 4. The nearest `.dc-shell` element it is written inside, in the page — the
 *    shell's `data-dc-theme`, and the tokens set on that element's `style`.
 * 5. The minimal theme, as anything of the shell's is by default.
 *
 * One exception keeps 2 from overruling what 4 always did: where the nearest
 * `.dc-shell` in the page is one of the host's *inside* that `DataShell`, it
 * is the nearer of the two and it is what the layer wears.
 */
export declare function useLayerTheme(props: LayerThemeProps): LayerTheme;
