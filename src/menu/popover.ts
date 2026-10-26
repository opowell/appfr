/**
 * Where a popover goes: against the element that opened it, on whichever side
 * has the room, and never past the window's edge.
 *
 * Not `MenuList`'s placement. A menu is a point — the corner it opens
 * from — measured and then pushed back on screen, which is right for a list
 * of a few items that always fits. A popover is the height of whatever a host
 * put in it, which is often more than the window has: so it chooses a side by
 * the room on each, takes the height that side actually offers, and scrolls
 * the rest. Pure, so the arithmetic is tested without a browser.
 */

/** The anchor's box, as `getBoundingClientRect()` gives it. */
export interface PopoverAnchorRect {
  top: number
  bottom: number
  left: number
  right: number
  width: number
}

export interface PopoverPlacementOptions {
  /** The side to open on when it has the room. `below` unless told otherwise. */
  side?: 'below' | 'above'
  /** Which edge of the anchor the popover lines up with. */
  align?: 'start' | 'end'
  /** Between the anchor and the popover. */
  gap?: number
  /** Kept clear at the window's edges. */
  margin?: number
  /** The tallest it may be, before the room on its side cuts it down. */
  maxHeight?: number
  /**
   * Less room than this on the chosen side, and it opens on the other side
   * instead — where that has more. A threshold for choosing a side only, and
   * never a floor on the height: a window shorter than it would otherwise
   * push the popover's top off screen and the start of it out of reach.
   */
  flipBelow?: number
}

export interface PopoverPlacement {
  side: 'below' | 'above'
  left: number
  /** Set when it opens below: its top edge. */
  top?: number
  /** Set when it opens above: its bottom edge's distance from the window's. */
  bottom?: number
  maxHeight: number
  /** The anchor's width — a popover is never narrower than what opened it. */
  minWidth: number
  maxWidth: number
}

export const POPOVER_GAP = 4
export const POPOVER_MARGIN = 8
export const POPOVER_FLIP_BELOW = 180

/**
 * @param anchor The opening element's box.
 * @param width The popover's own width as last measured, or `0` before it
 *   has been drawn — which only decides how far in from the right edge it is
 *   pushed.
 * @param viewport The window's size.
 */
export function placePopover(
  anchor: PopoverAnchorRect,
  width: number,
  viewport: { width: number; height: number },
  options: PopoverPlacementOptions = {},
): PopoverPlacement {
  const gap = options.gap ?? POPOVER_GAP
  const margin = options.margin ?? POPOVER_MARGIN
  const flip = options.flipBelow ?? POPOVER_FLIP_BELOW
  const prefer = options.side ?? 'below'

  const room = {
    below: viewport.height - anchor.bottom - gap - margin,
    above: anchor.top - gap - margin,
  }
  const other = prefer === 'below' ? 'above' : 'below'
  const side = room[prefer] < flip && room[other] > room[prefer] ? other : prefer
  const maxHeight = Math.min(options.maxHeight ?? Infinity, Math.max(0, room[side]))

  const maxWidth = Math.max(0, viewport.width - margin * 2)
  const minWidth = Math.min(anchor.width, maxWidth)
  const drawn = Math.min(Math.max(width, minWidth), maxWidth)
  const wanted = options.align === 'end' ? anchor.right - drawn : anchor.left
  const left = Math.max(margin, Math.min(wanted, viewport.width - drawn - margin))

  return side === 'below'
    ? { side, left, top: anchor.bottom + gap, maxHeight, minWidth, maxWidth }
    : { side, left, bottom: viewport.height - anchor.top + gap, maxHeight, minWidth, maxWidth }
}
