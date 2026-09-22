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
 * And nothing is ever drawn larger than it is, which is the other half of how
 * a row's height is chosen: a row aims no higher than its *tallest* picture.
 * A row of thumbnails is a row of thumbnails — more of them, smaller, filling
 * the width at the size they actually are, rather than a few floating in the
 * middle of boxes nothing can fill. A small picture beside a large one is the
 * case the row cannot answer, and does not try to: the row keeps the height
 * its tallest can carry and the small one sits in its box, which is the
 * view's to draw.
 *
 * Pure, so a test can hang a wall without a browser: the caller measures the
 * width and the shapes, and lays out what comes back.
 */
export interface PictureShape {
    /** Width over height — the shape, whatever size it is drawn at. */
    ratio: number;
    /**
     * Its own height in pixels, once known. Left out for a picture not yet
     * loaded and for a record with no picture at all: neither says a row must
     * be smaller, so a row of them aims as high as it would anyway.
     */
    height?: number;
}
export interface JustifiedRow<T> {
    items: T[];
    /** How tall every box in the row is drawn, in the width's units. */
    height: number;
    /**
     * Whether the row reaches the far edge. The last row is the one that may
     * not: with too few pictures left to fill it at anything near the height
     * the others have, it keeps its aim and ends where it ends — never
     * stretched to the edge, a few huge boxes being no way to end a wall.
     */
    filled: boolean;
}
export interface JustifyOptions {
    /** The width every filled row measures. */
    width: number;
    /** The height a row aims for, and the most any row is drawn at. */
    height: number;
    /** Between boxes in a row, and so part of what a row's width is spent on. */
    gap?: number;
}
/**
 * Packs `items` into rows, `shapeOf(item)` being the shape each picture is
 * and, once it is known, how tall it is.
 *
 * Greedy, one pass: a picture joins the row until the row would be under its
 * aim with it in, and then it goes whichever side leaves the row's height
 * nearer that aim. A width of nothing — a wall not yet measured — is one
 * unfilled row of everything, which is what the caller can draw before it
 * knows better.
 */
export declare function justify<T>(items: readonly T[], shapeOf: (item: T) => PictureShape, options: JustifyOptions): JustifiedRow<T>[];
