<script setup lang="ts">
import type { RecordStatus } from '../types'

defineProps<{ status: RecordStatus }>()
</script>

<template>
  <span
    class="dc-pill"
    :data-dc-status="status"
  >{{ status }}</span>
</template>

<style scoped>
.dc-pill {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: var(--dc-text-micro);
  font-weight: var(--dc-weight-semibold);
  white-space: nowrap;
  background: var(--dc-bg-2);
  color: var(--dc-fg-2);
}

.dc-pill[data-dc-status='ok'] {
  background: var(--dc-ok-bg);
  color: var(--dc-ok);
}

.dc-pill[data-dc-status='running'] {
  background: var(--dc-accent-bg);
  color: var(--dc-accent);
}

.dc-pill[data-dc-status='review'] {
  background: var(--dc-warn-bg);
  color: var(--dc-warn);
}

.dc-pill[data-dc-status='failed'] {
  background: var(--dc-danger-bg);
  color: var(--dc-danger);
}
</style>
