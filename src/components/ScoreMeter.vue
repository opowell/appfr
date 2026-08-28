<script setup lang="ts">
import { computed } from 'vue'
import { formatPercent } from '../data/format'

const props = defineProps<{ value: number; label?: string }>()

const percent = computed(() => formatPercent(props.value))
</script>

<template>
  <span
    class="dc-meter"
    role="meter"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="Math.round(value * 100)"
    :aria-label="label ?? 'Score'"
    :title="`${label ?? 'Score'} ${percent}`"
  >
    <span
      class="dc-meter__fill"
      :style="{ width: percent }"
    />
  </span>
</template>

<style scoped>
.dc-meter {
  display: block;
  height: 4px;
  width: 52px;
  flex: 0 0 auto;
  background: var(--dc-bg-2);
  border-radius: 2px;
  overflow: hidden;
}

.dc-meter__fill {
  display: block;
  height: 100%;
  background: var(--dc-accent);
  border-radius: 2px;
}
</style>
