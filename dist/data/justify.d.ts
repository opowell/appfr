/**
 * Pictures of different shapes brought to rows of one width.
 *
 * A wall of pictures cannot wrap the way cards do: a card is a box the view
 * chose the size of, and a picture is the size it is. Tiles the same size
 * would have to crop or letterbox, and a part cropped to a square is the wrong
 * part. So instead every row is scaled to exactly the width on offer — the
 * pictures in it share a height, each as wide as its shape says it is at that
 * height, and the row takes pictures until that height is one every picture
 * in it can be drawn at. The reader's order is kept, left to right and then
 * down, which a masonry of columns would not.
 *
 * And nothing is ever drawn larger than it is. A picture has only so many
 * pixels, and a row that reached the edge by blowing one up would be a row
 * with a blur in it; so a row's height is capped at the smallest picture in
 * it, and a row that cannot reach the edge under that cap — only ever the
 * last — stops where it stops rather than stretch.
 *
 * Pure, so a test can hang a wall without a browser: the caller measures the
 * width and the shapes, and lays out what comes back.
 */
export interface PictureShape {
    /** Width over height — the shape, whatever size it is drawn at. */
    ratio: number;
    /**
     * The tallest it may be drawn: its own height in pixels, once known. Left
     * out for a picture not yet loaded, which the aim alone caps.
     */
    height?: number;
}
export interface JustifiedRow<T> {
    items: T[];
    /** How tall every picture in the row is drawn, in the width's units. */
    height: number;
    /**
     * Whether the row reaches the far edge. The last row is the one that may
     * not: with too few pictures left to fill it without enlarging one, it is
     * drawn as tall as they allow and ends where it ends.
     */
    filled: boolean;
}
export interface JustifyOptions {
    /** The width every filled row measures. */
    width: number;
    /** The height a row aims for, and the most a row is ever drawn at. */
    height: number;
    /** Between pictures in a row, and so part of what a row's width is spent on. */
    gap?: number;
}
/**
 * Packs `items` into rows, `shapeOf(item)` being the shape each picture is
 * and, once it is known, how tall it may be drawn.
 *
 * Greedy, one pass: a picture joins the row, and the row closes the moment
 * the height that brings it to the edge is one no picture in it has to be
 * enlarged to reach. A width of nothing — a wall not yet measured — is one
 * unfilled row of everything, which is what the caller can draw before it
 * knows better.
 */
export declare function justify<T>(items: readonly T[], shapeOf: (item: T) => PictureShape, options: JustifyOptions): JustifiedRow<T>[];
