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
}
/**
 * Routes shell queries through vue-router, so a query change is an ordinary
 * navigation: guards run, back/forward work, and `<RouterLink>` targets stay
 * consistent with what the shell writes.
 */
export declare function createVueRouterAdapter(router: RouterLike): RouteAdapter;
