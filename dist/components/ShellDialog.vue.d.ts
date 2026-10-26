import '../style/tokens.css';
import type { ShellTheme } from '../types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    /**
     * Whether the dialog is up. On unless told otherwise, so a dialog can be
     * put up and taken down with a `v-if` on it as well as with this.
     */
    open?: boolean;
    /** The dialog's heading, which also names it for a screen reader. */
    title?: string;
    /** Names a dialog with no `title`, for a screen reader. */
    label?: string;
    /** Where the dialog is drawn. `body` unless the host has a layer of its own. */
    to?: string | HTMLElement;
    /**
     * The theme, where it is not the shell's the dialog was opened from — or
     * where it was opened from no shell at all. Minimal then, as ever.
     */
    theme?: ShellTheme;
    /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
    accent?: string;
    /** Design tokens, over those of the shell the dialog was opened from. */
    tokens?: Record<string, string>;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => any;
    "update:open": (open: boolean) => any;
}, string, import("vue").PublicProps, Readonly<{
    /**
     * Whether the dialog is up. On unless told otherwise, so a dialog can be
     * put up and taken down with a `v-if` on it as well as with this.
     */
    open?: boolean;
    /** The dialog's heading, which also names it for a screen reader. */
    title?: string;
    /** Names a dialog with no `title`, for a screen reader. */
    label?: string;
    /** Where the dialog is drawn. `body` unless the host has a layer of its own. */
    to?: string | HTMLElement;
    /**
     * The theme, where it is not the shell's the dialog was opened from — or
     * where it was opened from no shell at all. Minimal then, as ever.
     */
    theme?: ShellTheme;
    /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
    accent?: string;
    /** Design tokens, over those of the shell the dialog was opened from. */
    tokens?: Record<string, string>;
}> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:open"?: ((open: boolean) => any) | undefined;
}>, {
    accent: string;
    label: string;
    title: string;
    open: boolean;
    to: string | HTMLElement;
    tokens: Record<string, string>;
    theme: ShellTheme;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    /** What the dialog says and asks. */
    default?: () => unknown;
    /** Its buttons, at the bottom right. */
    actions?: () => unknown;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
