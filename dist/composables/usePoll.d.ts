import type { Ref } from 'vue';
/** What {@link usePoll} hands back: the switch, and whether it is on. */
export interface PollState {
    /** Starts polling, with a tick straight away. Nothing if it is already on. */
    start(): void;
    /** Stops polling. A tick already in flight finishes, and schedules nothing. */
    stop(): void;
    /** Whether a poll is running. */
    polling: Ref<boolean>;
}
/**
 * Polls until the callback says it is done, and stops when the scope it was
 * made in goes — a component unmounting, an effect scope stopped.
 *
 * `tick` resolves to whether to go on: `true` schedules the next one
 * `intervalMs` after this one settled, `false` stops. A tick that throws stops
 * too: the caller surfaces its own errors, and an endpoint that is failing is
 * not one to keep hitting. A host that wants to poll through failures catches
 * them in `tick` and returns `true`.
 *
 * Chained timeouts rather than an interval, so a slow response can never
 * queue up overlapping requests: the next tick is not even scheduled until
 * this one has answered. And tied to the scope rather than kept in a module,
 * so navigating away cannot leave a timer hitting an API for a screen nobody
 * is looking at.
 */
export declare function usePoll(tick: () => Promise<boolean>, intervalMs: number): PollState;
