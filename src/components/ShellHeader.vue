<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../composables/context'

const props = defineProps<{
  expanded: boolean
  /** Id of the panel this bar controls, for `aria-controls`. */
  panelId: string
  /** Hide the breadcrumb's record count, e.g. while a detail view is open. */
  hideCount?: boolean
}>()

const emit = defineEmits<{ toggle: [] }>()

const shell = useShellContext()

const domain = computed(() => shell.schema.value)

/**
 * What the results are scoped to. With no entity filter this is the whole
 * corpus — logs and settings included — so it says so rather than naming one
 * kind of record.
 */
const scope = computed(() => shell.entity.value?.label ?? 'Everything')

/**
 * The count beside the breadcrumb. A narrowed query reports how many rows
 * matched; an unfiltered entity reports the population the schema publishes,
 * which is the real total rather than a page size.
 */
const count = computed(() => {
  if (props.hideCount) return ''
  const entity = shell.entity.value
  if (entity && !shell.hasFacets.value && !shell.query.value.expr.trim()) return entity.count
  return String(shell.total.value)
})
</script>

<template>
  <div
    class="dc-header"
    :data-dc-expanded="expanded ? 'true' : 'false'"
  >
    <button
      type="button"
      class="dc-header__trigger"
      :aria-expanded="expanded"
      :aria-controls="panelId"
      @click="emit('toggle')"
    >
      <span
        class="dc-header__badge"
        aria-hidden="true"
      >◆</span>
      <span class="dc-header__domain">{{ domain.label }}</span>

      <span class="dc-header__crumb">
        <span class="dc-header__crumb-root">{{ scope }}</span>
        <span
          v-if="count"
          class="dc-header__count dc-mono"
        >{{ count }}</span>
      </span>

      <span class="dc-header__query">
        <span class="dc-header__query-label">Query</span>
        <span
          class="dc-header__summary dc-mono dc-truncate"
          :data-dc-active="shell.isPristine.value ? 'false' : 'true'"
          :title="shell.summary.value"
        >{{ shell.summary.value }}</span>
      </span>

      <span
        class="dc-header__chevron"
        aria-hidden="true"
      >{{ expanded ? '▲' : '▼' }}</span>
      <span class="dc-header__sr">{{ expanded ? 'Hide query panel' : 'Edit query' }}</span>
    </button>

    <div
      v-if="$slots.actions"
      class="dc-header__actions"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.dc-header {
  /* Above the query panel's scrim, so the trigger keeps working while the
     panel is open — `aria-expanded` promises it toggles. */
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 12px;
  height: var(--dc-header-height);
  padding: 0 14px;
  border-bottom: 1px solid var(--dc-line);
  background: var(--dc-bg-0);
}

.dc-header[data-dc-expanded='true'] {
  background: var(--dc-bg-1);
}

.dc-header__trigger {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
  margin-left: -8px;
  padding: 6px 8px;
  border: none;
  border-radius: var(--dc-radius);
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.dc-header__trigger:hover {
  background: var(--dc-bg-1);
}

.dc-header[data-dc-expanded='true'] .dc-header__trigger:hover {
  background: var(--dc-bg-2);
}

.dc-header__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border-radius: var(--dc-radius-sm);
  background: var(--dc-accent-bg);
  color: var(--dc-accent);
  font-size: var(--dc-text-meta);
}

.dc-header__domain {
  flex: 0 0 auto;
  font-size: var(--dc-text-body);
  font-weight: var(--dc-weight-semibold);
  color: var(--dc-fg-1);
}

.dc-header__crumb {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  padding-left: 12px;
  border-left: 1px solid var(--dc-line);
  font-size: var(--dc-text-body);
  white-space: nowrap;
}

.dc-header__crumb-root {
  color: var(--dc-fg-0);
  font-weight: var(--dc-weight-semibold);
}

.dc-header__count {
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
}

.dc-header__query {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
  padding-left: 12px;
  border-left: 1px solid var(--dc-line);
}

.dc-header__query-label {
  flex: 0 0 auto;
  font-size: var(--dc-text-eyebrow);
  font-weight: var(--dc-weight-semibold);
  color: var(--dc-fg-3);
  text-transform: var(--dc-caps);
  letter-spacing: var(--dc-tracking-caps-wide);
}

.dc-header__summary {
  font-size: var(--dc-text-code);
  color: var(--dc-fg-3);
}

.dc-header__summary[data-dc-active='true'] {
  color: var(--dc-accent);
}

.dc-header__chevron {
  flex: 0 0 auto;
  margin-left: auto;
  font-size: var(--dc-text-eyebrow);
  color: var(--dc-fg-3);
}

.dc-header__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.dc-header__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
  min-width: 0;
}

/*
 * Narrow: drop the domain name, keep the entity. The entity is what the reader
 * needs — a narrowed query's summary is its terms, so it no longer says what
 * is being listed.
 */
@container (max-width: 720px) {
  .dc-header__domain {
    display: none;
  }

  .dc-header__crumb {
    padding-left: 0;
    border-left: none;
  }
}
</style>
