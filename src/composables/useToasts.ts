import { readonly, ref } from 'vue'
import type { DeepReadonly, Ref } from 'vue'

/** `ok` for news, `err` for a failure the reader should see. */
export type ToastKind = 'ok' | 'err'

export interface Toast {
  id: number
  message: string
  kind: ToastKind
}

/** How long a toast stays up, in milliseconds. */
export const TOAST_MS = 4500

/** How long an error stays up: it is usually a message worth reading twice. */
export const TOAST_ERROR_MS = 9000

export interface ToastsState {
  /** The toasts up now, oldest first — what `<ShellToasts>` draws. */
  toasts: DeepReadonly<Ref<Toast[]>>
  /** Puts a toast up, and takes it down again after its time. */
  toast(message: string, kind?: ToastKind): void
  /**
   * For a `catch` block: an `Error`'s message, or the thing itself said as a
   * string, as an error toast. The message is whatever the layer that threw
   * already wrote, which is usually the most specific thing anyone can say.
   */
  toastError(error: unknown): void
  /** Takes a toast down before its time. */
  dismiss(id: number): void
}

/*
 * One stack for the whole app, held here at module level rather than per
 * call: a toast raised inside a dialog has to survive that dialog closing,
 * and the component that draws the stack is not the one that raises them.
 * Module state is shared by everything in one JavaScript realm, which on a
 * server rendering several requests is all of them — toasts are raised in
 * answer to something the reader did, which is to say in the browser.
 */
const items = ref<Toast[]>([])
let nextId = 0

function dismiss(id: number): void {
  items.value = items.value.filter((toast) => toast.id !== id)
}

function toast(message: string, kind: ToastKind = 'ok'): void {
  nextId += 1
  const id = nextId
  items.value = [...items.value, { id, message, kind }]
  setTimeout(() => dismiss(id), kind === 'err' ? TOAST_ERROR_MS : TOAST_MS)
}

function toastError(error: unknown): void {
  toast(error instanceof Error ? error.message : String(error), 'err')
}

/**
 * The app's toasts: short messages in a corner, that go away on their own.
 * Every call answers with the same stack; draw it once, with `<ShellToasts>`.
 */
export function useToasts(): ToastsState {
  return { toasts: readonly(items), toast, toastError, dismiss }
}
