import type { PresentedRow } from './usePresentedRows';
import type { PressPreview, ShellContext } from './context';
/**
 * The listeners that put `preview` in the header while the pointer or the focus
 * is on a value, as `v-on` takes them.
 */
export declare function pressPreviewOn(shell: ShellContext, preview: PressPreview | null): {
    mouseenter: () => void;
    mouseleave: () => void;
    focus: () => void;
    blur: () => void;
};
/** What a press on a row's name adds, where that press narrows to its record. */
export declare function recordPressPreview(shell: ShellContext, entry: PresentedRow): PressPreview | null;
