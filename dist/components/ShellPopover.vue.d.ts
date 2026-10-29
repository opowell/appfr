import '../style/shell.css';
import type { ShellTheme } from 'themes';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    /** Whether it is up. Bind `v-model:open`. */
    open?: boolean;
    /** The element it opens against — the button that opened it, usually. */
    anchor?: HTMLElement | null;
    /** The side it opens on when that side has the room. */
    side?: "below" | "above";
    /** Lines its left edge up with the anchor's (`start`), or its right (`end`). */
    align?: "start" | "end";
    /** The tallest it grows, in pixels, before the room it has cuts it down. */
    maxHeight?: number;
    /** Where it is drawn. */
    to?: string | HTMLElement;
    /** The theme, where it is not the one {@link useLayerTheme} finds. */
    theme?: ShellTheme;
    /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
    accent?: string;
    /** Design tokens, over those it finds. */
    tokens?: Record<string, string>;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: () => any;
    "update:open": (open: boolean) => any;
}, string, import("vue").PublicProps, Readonly<{
    /** Whether it is up. Bind `v-model:open`. */
    open?: boolean;
    /** The element it opens against — the button that opened it, usually. */
    anchor?: HTMLElement | null;
    /** The side it opens on when that side has the room. */
    side?: "below" | "above";
    /** Lines its left edge up with the anchor's (`start`), or its right (`end`). */
    align?: "start" | "end";
    /** The tallest it grows, in pixels, before the room it has cuts it down. */
    maxHeight?: number;
    /** Where it is drawn. */
    to?: string | HTMLElement;
    /** The theme, where it is not the one {@link useLayerTheme} finds. */
    theme?: ShellTheme;
    /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
    accent?: string;
    /** Design tokens, over those it finds. */
    tokens?: Record<string, string>;
}> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:open"?: ((open: boolean) => any) | undefined;
}>, {
    accent: string;
    tokens: Record<string, string>;
    open: boolean;
    anchor: HTMLElement | null;
    to: string | HTMLElement;
    maxHeight: number;
    theme: ShellTheme;
    side: "below" | "above";
    align: "start" | "end";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>, {
    default?: () => unknown;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
