/**
 * Pictures of different shapes brought to rows of one width.
 *
 * A wall of pictures cannot wrap the way cards do: a card is a box the view
 * chose the size of, and a picture is the size it is. Tiles the same size
 * would have to crop or letterbox, and a part cropped to a square is the wrong
 * part. So instead every row is scaled to exactly the width on offer — the
 * boxes in it share a height, each as wide as its picture's shape says it is
 * at that height, and the row is packed until the next picture would take it
 * under the height it aims for. The reader's order is kept, left to right and
 * then down, which a masonry of columns would not.
 *
 * The boxes, not the pictures: a picture with fewer pixels than its box has
 * room for is the view's to draw at its own size inside it, rather than this
 * function's to shrink the row for. A row that took its height from its
 * smallest picture was, on a real catalogue, a row of thumbnails whenever one
 * old scan was in it.
 *
 * Pure, so a test can hang a wall without a browser: the caller measures the
 * width and the shapes, and lays out what comes back.
 */
export interface JustifiedRow<T> {
    items: T[];
    /** How tall every box in the row is drawn, in the width's units. */
    height: number;
    /**
     * Whether the row reaches the far edge. The last row is the one that may
     * not: with too few pictures left to fill it at anything near the height
     * the others have, it keeps the aim and ends where it ends — never
     * stretched to the edge, a few huge boxes being no way to end a wall.
     */
    filled: boolean;
}
export interface JustifyOptions {
    /** The width every filled row measures. */
    width: number;
    /** The height a row aims for; filled rows land as near it as packing allows. */
    height: number;
    /** Between boxes in a row, and so part of what a row's width is spent on. */
    gap?: number;
}
/**
 * Packs `items` into rows, each `ratioOf(item)` being its width over its
 * height — the shape the picture is, whatever size it is drawn at.
 *
 * Greedy, one pass: a picture joins the row until the row would be under its
 * aim with it in, and then it goes whichever side leaves the row's height
 * nearer that aim. A width of nothing — a wall not yet measured — is one
 * unfilled row of everything, which is what the caller can draw before it
 * knows better.
 */
export declare function justify<T>(items: readonly T[], ratioOf: (item: T) => number, options: JustifyOptions): JustifiedRow<T>[];
