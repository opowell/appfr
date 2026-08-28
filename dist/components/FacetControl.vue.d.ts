import type { FacetDef, FacetValue } from '../types';
type __VLS_Props = {
    facet: FacetDef;
    value: FacetValue;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    update: (value: FacetValue) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onUpdate?: ((value: FacetValue) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
