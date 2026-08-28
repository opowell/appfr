import type { RouteAdapter } from './adapter';
/**
 * Drives the browser's address bar directly. This is the fallback the shell
 * installs when a host provides no adapter and vue-router is not present.
 *
 * Safe to construct during SSR: it reads nothing at module scope and starts
 * from empty values when `window` is absent.
 */
export declare function createHistoryAdapter(): RouteAdapter;
