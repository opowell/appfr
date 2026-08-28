<script setup lang="ts">
/*
 * The shell's tokens and shared utilities, all namespaced under `.dc-shell`.
 * Imported here rather than from `src/index.ts` so the emitted declaration
 * files stay free of a CSS module consumers cannot resolve; the built package
 * still collects every rule into a single `style.css`.
 */
import '../style/tokens.css'

import { computed, inject, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import type {
  DataSource,
  DomainSchema,
  ShellQuery,
  ShellQueryDefaults,
  ShellRow,
  ShellTheme,
  ViewKind,
} from '../types'
import type { RouteAdapter } from '../routing/adapter'
import { ROUTE_ADAPTER_KEY } from '../routing/adapter'
import { createHistoryAdapter } from '../routing/history'
import { createMockDataSource } from '../data/mock'
import { provideShellContext } from '../composables/context'
import { useQueryState } from '../composables/useQueryState'
import type { NavigationMode } from '../composables/useQueryState'
import { useResults } from '../composables/useResults'
import ShellHeader from './ShellHeader.vue'
import QueryPanel from './QueryPanel.vue'
import ResultsArea from './ResultsArea.vue'

const props = withDefaults(
  defineProps<{
    /** The vocabulary the shell renders: entities, facets, labels, samples. */
    schema: DomainSchema
    /**
     * Where rows come from. Defaults to a deterministic mock source over the
     * schema's own samples, so the shell is demonstrable — and testable — with
     * nothing behind it.
     */
    source?: DataSource
    /**
     * How the query reaches the URL. Defaults to an injected adapter, or a
     * History API adapter when nothing is provided.
     */
    route?: RouteAdapter
    /** Query fields to fall back to when the URL omits them. */
    defaults?: ShellQueryDefaults
    /** Maximum rows requested from the source. */
    limit?: number
    /**
     * Rows shown inside each type's card on the home screen — the most
     * recently updated few, under the current sort.
     */
    previewsPerType?: number
    /** Restricts the offered result views. */
    views?: ViewKind[]
    /** Overrides the `--dc-accent` token. Shorthand for `tokens`. */
    accent?: string
    /**
     * Design tokens set on the shell element — `{ '--dc-surface': '#101418' }`.
     * Setting a seed (`--dc-surface`, `--dc-ink`, `--dc-accent`) moves every
     * value derived from it; setting a derived token overrides just that one.
     */
    tokens?: Record<string, string>
    /**
     * `minimal`, the default, is paper, ink and hairlines with nothing else
     * on: no hue, no shadow, no rounded corner — the values the layout stops
     * working without and no more. `mono-size` is that theme with its type
     * scale collapsed too, so every word — headings, URLs, inputs, tags — is
     * set at one size and one weight, and colour and opacity are all that
     * separate them. `auto` follows the system setting. `macos` and `windows`
     * wear that system's typography, corners and accent, and follow its
     * scheme too.
     * `inherit` brings no palette at all: the shell takes the host's
     * background, text colour and font.
     */
    theme?: ShellTheme
    /** Offers the star affordance on rows. */
    pinnable?: boolean
    navigationMode?: NavigationMode
    facetNavigationMode?: NavigationMode
  }>(),
  {
    limit: 50,
    previewsPerType: 3,
    theme: 'minimal',
    navigationMode: 'push',
    facetNavigationMode: 'replace',
  },
)

const emit = defineEmits<{
  /** A row was opened. */
  activate: [row: ShellRow]
  /** The query changed. The URL has already been updated. */
  'query-change': [query: ShellQuery]
  'toggle-pin': [row: ShellRow]
}>()

/**
 * Both of these are optionally controlled: bind `v-model:open` or
 * `v-model:pinned` to own the state, or leave them alone and the shell keeps
 * it internally. `defineModel` distinguishes the two by whether the prop was
 * actually passed, which a plain boolean prop cannot do — Vue casts an absent
 * boolean to `false`.
 */
const panelOpen = defineModel<boolean>('open', { default: false })
const pinned = defineModel<string[]>('pinned', { default: () => [] })

const slots = defineSlots<{
  /** Extra controls at the right end of the header bar. */
  actions?: () => unknown
  /** Replaces the entire results area. */
  results?: (props: {
    rows: ShellRow[]
    total: number
    query: ShellQuery
    pending: boolean
  }) => unknown
}>()

/* ------------------------------------------------------------------- route */

/**
 * Resolved once: an adapter is infrastructure, not reactive state. When the
 * shell has to create its own it also owns tearing it down.
 */
const injectedAdapter = inject(ROUTE_ADAPTER_KEY, null)
const ownedAdapter = props.route || injectedAdapter ? null : createHistoryAdapter()
const adapter: RouteAdapter = props.route ?? injectedAdapter ?? (ownedAdapter as RouteAdapter)

onBeforeUnmount(() => ownedAdapter?.dispose?.())

/* ------------------------------------------------------------------- state */

const fallbackSource = computed<DataSource>(() => createMockDataSource({ seed: props.schema.key }))
const source = computed<DataSource>(() => props.source ?? fallbackSource.value)

const query = useQueryState({
  schema: () => props.schema,
  adapter,
  defaults: () => props.defaults,
  navigationMode: () => props.navigationMode,
  facetNavigationMode: () => props.facetNavigationMode,
})

const results = useResults({
  source,
  query: query.query,
  schema: computed(() => props.schema),
  entity: query.entity,
  limit: computed(() => props.limit),
})

watch(query.query, (value) => emit('query-change', value))

/* -------------------------------------------------------------- panel open */

const panelId = useId() ?? 'dc-query-panel'
const headerRef = ref<InstanceType<typeof ShellHeader> | null>(null)

function closePanel() {
  if (!panelOpen.value) return
  panelOpen.value = false
  // Return focus to the control that opened the panel rather than dropping
  // keyboard users at the top of the document.
  void nextTick(() => {
    const root = headerRef.value?.$el as HTMLElement | undefined
    root?.querySelector<HTMLElement>('.dc-header__trigger')?.focus()
  })
}

/* ----------------------------------------------------------------- pinning */

const pinnedIds = computed(() => new Set(pinned.value))

function togglePin(row: ShellRow) {
  const next = new Set(pinnedIds.value)
  if (next.has(row.id)) next.delete(row.id)
  else next.add(row.id)
  pinned.value = [...next]
  emit('toggle-pin', row)
}

/* ----------------------------------------------------------------- context */

const shell = provideShellContext({
  ...query,
  schema: computed(() => props.schema),
  entities: computed(() => props.schema.entities),
  rows: results.rows,
  total: results.total,
  pending: results.pending,
  error: results.error,
  source,
  previewsPerType: computed(() => props.previewsPerType),
  pinnable: computed(() => props.pinnable === true),
  isPinned: (row) => pinnedIds.value.has(row.id),
  isPinnedId: (id) => pinnedIds.value.has(id),
  togglePin,
  activate: (row) => emit('activate', row),
})

/*
 * Inline so it beats the stylesheet without the host needing a selector that
 * reaches the shell — the one place token overrides are guaranteed to win.
 */
const style = computed(() => {
  if (!props.accent && !props.tokens) return undefined
  return { ...props.tokens, ...(props.accent ? { '--dc-accent': props.accent } : {}) }
})

defineExpose({
  query: query.query,
  openPanel: () => {
    panelOpen.value = true
  },
  closePanel,
})
</script>

<template>
  <div
    class="dc-shell"
    :data-dc-theme="theme"
    :style="style"
  >
    <div class="dc-shell__head">
      <ShellHeader
        ref="headerRef"
        :expanded="panelOpen"
        :panel-id="panelId"
        @toggle="panelOpen = !panelOpen"
      >
        <template
          v-if="slots.actions"
          #actions
        >
          <slot name="actions" />
        </template>
      </ShellHeader>

      <template v-if="panelOpen">
        <!-- Full-bleed catcher: a click anywhere outside dismisses the panel
             without the results underneath also receiving it. -->
        <div
          class="dc-shell__scrim"
          @click="closePanel"
        />
        <div class="dc-shell__panel">
          <QueryPanel
            :panel-id="panelId"
            :views="views"
            @close="closePanel"
          />
        </div>
      </template>
    </div>

    <slot
      name="results"
      :rows="shell.rows.value"
      :total="shell.total.value"
      :query="shell.query.value"
      :pending="shell.pending.value"
    >
      <ResultsArea />
    </slot>
  </div>
</template>

<style scoped>
.dc-shell__head {
  position: relative;
  z-index: 30;
  flex: 0 0 auto;
}

/*
 * Layering inside the head, which is itself above the content area:
 * the scrim covers the results, the panel sits over the scrim, and the header
 * bar sits over both so its trigger stays clickable while the panel is open.
 */
.dc-shell__scrim {
  position: fixed;
  inset: 0;
  z-index: 1;
}

.dc-shell__panel {
  position: absolute;
  top: calc(100% + 6px);
  left: 12px;
  right: 12px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  max-width: 1220px;
  /* Constrains the panel so its own `overflow: auto` engages instead of the
     panel running off the bottom of a short container. */
  max-height: calc(100vh - var(--dc-header-height) - 24px);
}
</style>
