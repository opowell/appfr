import type { RouteAdapter } from './adapter';
/**
 * The slice of a vue-router `Router` this adapter needs. Typed structurally so
 * the package's public types never reference `vue-router`, which is an
 * optional peer — consumers without it still get a clean typecheck.
 */
export interface RouterLike {
    currentRoute: {
        value: {
            path: string;
            fullPath: string;
        };
    };
    push(to: string): unknown;
    replace(to: string): unknown;
    /**
     * Turns a location into the `href` the browser would load for it — under hash
     * history, `#/` and all. What a link needs, and present on every real
     * `Router`; without it a link is the path as it stands.
     */
    resolve?(to: string): {
        href: string;
    };
}
/**
 * Routes shell queries through vue-router, so a query change is an ordinary
 * navigation: guards run, back/forward work, and `<RouterLink>` targets stay
 * consistent with what the shell writes.
 */
export declare function createVueRouterAdapter(router: RouterLike): RouteAdapter;
/**
 * The slice of a vue-router location a redirect reads: the path's params and
 * the query it arrived with. Structural, as {@link RouterLike} is, so these
 * helpers type-check without the package's types naming `vue-router`.
 */
export interface RedirectFrom {
    params: Record<string, string | string[] | undefined>;
    query: Record<string, string | null | (string | null)[] | undefined>;
}
/** Where a redirect lands: a path, with the query it should carry. */
export interface RedirectTo {
    path: string;
    query: Record<string, string | null | (string | null)[] | undefined>;
}
/**
 * A record's permalink, as a vue-router `redirect`: `/tests/:id` landing on
 * the shell narrowed to that record —
 * `{ path: '/tests/:id', redirect: recordRedirect('test', 'id') }`.
 *
 * A record has no page of its own in a shell that narrows on a press: the
 * press puts the record's term in the query and the screen is about it from
 * then on. So its address is a way into the shell with that term already
 * there — the same term a press writes, `field="id"`, so a record reached by
 * its address reads, and lifts, exactly like one reached from a list. The
 * query the address arrived with is kept, and the term ANDed on to whatever
 * expression it held — once, however often the permalink is followed — so
 * `/tests/x?e=runs` lands on that record's runs.
 *
 * `scopeField` is the field the record's type declares as its
 * {@link EntitySchema.scope}; `param` the route param holding the id. `path`
 * is where the shell is mounted, `/` unless it says otherwise.
 */
export declare function recordRedirect(scopeField: string, param: string, path?: string): (to: RedirectFrom) => RedirectTo;
/**
 * A type's old list address, as a vue-router `redirect`: `/tests` landing on
 * the shell listing tests — `{ path: '/tests', redirect: entityRedirect('tests') }`.
 *
 * For a host that had a page per list before it had a shell, whose links and
 * bookmarks still name them. The query the address arrived with is kept, so
 * a `/tests?q=checkout` someone saved lands on the same search.
 */
export declare function entityRedirect(entityKey: string, path?: string): (to: RedirectFrom) => RedirectTo;
