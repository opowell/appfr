import '../style/tokens.css';
import type { ShellTheme } from '../types';
import type { MenuItemDef } from '../menu/types';
type __VLS_Props = {
    /** Top-level menus, each of which is an item with `items` of its own. */
    menus: MenuItemDef[];
    label?: string;
    /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
    accent?: string;
    /** Design tokens set on the bar — `{ '--dc-surface': '#101418' }`. */
    tokens?: Record<string, string>;
    /**
     * `minimal`, the default, is paper, ink and hairlines; `auto` follows the
     * system setting; `macos` and `windows` wear that system's design language
     * and follow its scheme; `inherit` brings no palette at all.
     */
    theme?: ShellTheme;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    choose: (item: MenuItemDef) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onChoose?: ((item: MenuItemDef) => any) | undefined;
}>, {
    theme: ShellTheme;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
