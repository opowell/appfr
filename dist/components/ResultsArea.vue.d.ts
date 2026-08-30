import type { ViewKind } from '../types';
type __VLS_Props = {
    /**
     * The views on offer, when the host restricts them. A URL naming one that is
     * not on the list — a link kept from before it was taken off — renders the
     * first that is, rather than a view with no way back to it in the panel.
     */
    views?: ViewKind[];
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
