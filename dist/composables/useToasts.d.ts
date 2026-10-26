import type { DeepReadonly, Ref } from 'vue';
/** `ok` for news, `err` for a failure the reader should see. */
export type ToastKind = 'ok' | 'err';
export interface Toast {
    id: number;
    message: string;
    kind: ToastKind;
}
/** How long a toast stays up, in milliseconds. */
export declare const TOAST_MS = 4500;
/** How long an error stays up: it is usually a message worth reading twice. */
export declare const TOAST_ERROR_MS = 9000;
export interface ToastsState {
    /** The toasts up now, oldest first — what `<ShellToasts>` draws. */
    toasts: DeepReadonly<Ref<Toast[]>>;
    /** Puts a toast up, and takes it down again after its time. */
    toast(message: string, kind?: ToastKind): void;
    /**
     * For a `catch` block: an `Error`'s message, or the thing itself said as a
     * string, as an error toast. The message is whatever the layer that threw
     * already wrote, which is usually the most specific thing anyone can say.
     */
    toastError(error: unknown): void;
    /** Takes a toast down before its time. */
    dismiss(id: number): void;
}
/**
 * The app's toasts: short messages in a corner, that go away on their own.
 * Every call answers with the same stack; draw it once, with `<ShellToasts>`.
 */
export declare function useToasts(): ToastsState;
