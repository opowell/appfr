import '../style/tokens.css';
import type { ShellTheme } from '../types';
type __VLS_Props = {
    /** Where the stack is drawn. */
    to?: string | HTMLElement;
    /** The theme, where it is not the shell's the stack is written in. */
    theme?: ShellTheme;
    /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
    accent?: string;
    /** Design tokens, over those of the shell the stack is written in. */
    tokens?: Record<string, string>;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    accent: string;
    tokens: Record<string, string>;
    to: string | HTMLElement;
    theme: ShellTheme;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
