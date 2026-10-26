import type { LogChunk } from '../types';
type __VLS_Props = {
    /** Reads the log from `offset` on. */
    fetchChunk: (offset: number) => Promise<LogChunk>;
    /**
     * Takes out a terminal's colour codes. A tool writing for a terminal says
     * red with `\x1b[31m`, and in a page that is not red but `[31m` in the
     * middle of a line.
     */
    stripAnsi?: boolean;
    /**
     * The tallest the pane grows before it scrolls — a CSS length, or a number
     * of pixels. A log has to scroll inside something to have a tail to
     * follow, so this is bounded unless told otherwise.
     */
    maxHeight?: string | number;
};
/**
 * Reads what has been written since the last read, and keeps to the tail if
 * the reader was at it. A poll while one is in flight is that one — two reads
 * from the same offset would append the same text twice.
 */
declare function poll(): Promise<void>;
/** Forgets what was read, for a pane that is about to show another log. */
declare function reset(): void;
declare const _default: import("vue").DefineComponent<__VLS_Props, {
    poll: typeof poll;
    reset: typeof reset;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    maxHeight: string | number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
