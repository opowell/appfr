import type { PressOptions } from '../../types';
/**
 * A press that leads somewhere, as a real link.
 *
 * With an `href` it is an `<a>`, so everything the browser does with a link
 * it does with this one: ⌘/Ctrl-click opens it in a new tab, ⇧-click in a new
 * window, a middle click in a background tab, and the context menu offers to
 * copy it. A plain click — and one with ⌥ held — is the shell's: the default
 * is stopped and `press` is emitted with the {@link pressOptions} it carried,
 * so the shell navigates in place as it always did.
 *
 * Without an `href` there is nowhere for a link to go — the press is reported
 * to the host rather than applied — so it is a button, as before.
 */
type __VLS_Props = {
    href?: string | null;
};
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    press: (options: PressOptions, event: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onPress?: ((options: PressOptions, event: MouseEvent) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
