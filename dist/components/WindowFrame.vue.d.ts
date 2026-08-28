import '../style/tokens.css';
import type { ShellTheme } from '../types';
import type { MenuItemDef } from '../menu/types';
import type { DropEdge, FloatRect, FrameChange, PanelMove, WindowNode, WindowPanelDef } from '../window/types';
type __VLS_Props = {
    /** The panels this window can show, in the order a default layout uses. */
    panels: WindowPanelDef[];
    /** Lets panels be dragged by their header into a new part of the grid. */
    movable?: boolean;
    /** Lets the boundary between two panels be dragged. */
    resizable?: boolean;
    /** Smallest a panel may be resized to, in pixels. */
    minPanelSize?: number;
    /**
     * Gives every panel a close button. Closing is a request, not something
     * the window does itself: it emits `panel-close` and the host drops the
     * panel from `panels`, which is what removes it. A panel can say otherwise
     * with its own `closable`.
     */
    closable?: boolean;
    /**
     * Whether a pane offers the items the *window* contributes to its menu —
     * which view it is showing, how its space is shown, the way along its
     * tabs. Items the content inside it registered with `usePaneMenu` are not
     * the window's to withhold, and stay.
     *
     * A panel's `views` go with them: with no menu there is nowhere to offer
     * them, and switching stays the host's from `v-model:views`. `fixedView`
     * is how a space keeps its menu and drops that one choice.
     */
    menu?: boolean;
    /**
     * Whether a strip that *is* a named space says that name beside its tabs.
     *
     * A row, a column and a desktop each draw a header of their own to say it
     * on; a strip has only its tabs, so the name goes in front of them — which
     * is what keeps a named space named in all four of the shapes it is shown
     * in. Off, the name is kept in the layout and said again the moment the
     * space is shown any other way: what a strip spends on chrome is then its
     * tabs and nothing else.
     */
    spaceNames?: boolean;
    /**
     * Extends or replaces the menu a pane offers, given the items it would
     * have had: the content's own, then the window's. Return them with yours
     * appended, or something else entirely.
     */
    paneMenu?: (panel: WindowPanelDef, items: MenuItemDef[]) => MenuItemDef[];
    /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
    accent?: string;
    /** Design tokens set on the window element — `{ '--dc-surface': '#101418' }`. */
    tokens?: Record<string, string>;
    /**
     * `minimal`, the default, is paper, ink and hairlines with nothing else
     * on; `mono-size` is that theme with every word set at one size and one
     * weight; `auto` follows the system setting; `macos` and `windows` wear
     * that system's design language and follow its scheme; `inherit` brings
     * no palette at all.
     */
    theme?: ShellTheme;
};
declare function setView(id: string, view: string): void;
declare function raise(id: string): void;
declare function toggleMinimize(id: string): void;
declare function toggleMaximize(id: string): void;
type __VLS_PublicProps = __VLS_Props & {
    /**
     * Both optionally controlled, the way `DataShell` treats its panel and pins:
     * bind `v-model:layout` to own the arrangement — to persist it per user, say —
     * or leave it alone and the window keeps it. `update:layout` is emitted either
     * way, so a host can listen without also having to supply the value.
     *
     * `null` means "no layout given": every panel goes in a row, and the first
     * drag replaces that with a real tree.
     */
    'layout'?: WindowNode | null;
    /** Chosen view per panel id. Absent falls back to the panel's own default. */
    'views'?: Record<string, string>;
};
declare const _default: import("vue").DefineComponent<__VLS_PublicProps, {
    /** The layout as rendered, reconciled against the current panels. */
    layout: import("vue").ComputedRef<WindowNode | null>;
    /** Moves a panel programmatically — the same operation a drag performs. */
    move(panel: string, target: string, edge: DropEdge, index?: number): void;
    /** Brings a panel's tab to the top of its group. */
    select(panel: string): void;
    /** Lifts a panel onto the float holding `near`, as a window of its own. */
    float(panel: string, near: string, rect: FloatRect): void;
    /** Puts a floating frame somewhere else, or makes it another size. */
    setRect(panel: string, rect: FloatRect): void;
    /**
     * Puts a panel on one of its views, the way its menu would — the way a pane
     * whose space fixed its view, or took its bar away, is switched at all.
     */
    setView: typeof setView;
    /** Brings a floating frame to the front of its stack. */
    raise: typeof raise;
    /** Fills the float with a window, or puts it back where it was. */
    toggleMaximize: typeof toggleMaximize;
    /** Rolls a window up to its title bar, or unrolls it. */
    toggleMinimize: typeof toggleMinimize;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "panel-move": (move: PanelMove) => any;
    "view-change": (change: {
        panel: string;
        view: string;
    }) => any;
    "panel-activate": (panel: string) => any;
    "tab-select": (selection: {
        panel: string;
    }) => any;
    "frame-change": (change: FrameChange) => any;
    "frame-maximize": (change: {
        panel: string;
        maximized: boolean;
    }) => any;
    "frame-minimize": (change: {
        panel: string;
        minimized: boolean;
    }) => any;
    "panel-close": (panel: string) => any;
    "update:layout": (value: WindowNode | null) => any;
    "update:views": (value: Record<string, string>) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onPanel-move"?: ((move: PanelMove) => any) | undefined;
    "onView-change"?: ((change: {
        panel: string;
        view: string;
    }) => any) | undefined;
    "onPanel-activate"?: ((panel: string) => any) | undefined;
    "onTab-select"?: ((selection: {
        panel: string;
    }) => any) | undefined;
    "onFrame-change"?: ((change: FrameChange) => any) | undefined;
    "onFrame-maximize"?: ((change: {
        panel: string;
        maximized: boolean;
    }) => any) | undefined;
    "onFrame-minimize"?: ((change: {
        panel: string;
        minimized: boolean;
    }) => any) | undefined;
    "onPanel-close"?: ((panel: string) => any) | undefined;
    "onUpdate:layout"?: ((value: WindowNode | null) => any) | undefined;
    "onUpdate:views"?: ((value: Record<string, string>) => any) | undefined;
}>, {
    menu: boolean;
    theme: ShellTheme;
    resizable: boolean;
    movable: boolean;
    closable: boolean;
    minPanelSize: number;
    spaceNames: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
