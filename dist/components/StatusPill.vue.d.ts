import type { PillTone, RecordStatus } from '../types';
declare const _default: import("vue").DefineComponent<{
    /** The status, which is both the pill's words and its colour. */
    status: RecordStatus;
    tone?: PillTone;
    label?: string;
} | {
    status?: RecordStatus;
    /**
     * The colour, chosen outright: a status's own, `neutral` for none, or
     * `accent` for the shell's. Wins over `status` where both are given.
     */
    tone: PillTone;
    label?: string;
} | {
    status?: RecordStatus;
    tone?: PillTone;
    /** The words, in place of the status's own. */
    label: string;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    /** The status, which is both the pill's words and its colour. */
    status: RecordStatus;
    tone?: PillTone;
    label?: string;
} | {
    status?: RecordStatus;
    /**
     * The colour, chosen outright: a status's own, `neutral` for none, or
     * `accent` for the shell's. Wins over `status` where both are given.
     */
    tone: PillTone;
    label?: string;
} | {
    status?: RecordStatus;
    tone?: PillTone;
    /** The words, in place of the status's own. */
    label: string;
}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
