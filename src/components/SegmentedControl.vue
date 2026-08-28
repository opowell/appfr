<script setup lang="ts">
import { ref } from 'vue'

export interface SegmentOption {
  key: string
  label: string
}

const props = defineProps<{
  modelValue: string
  options: SegmentOption[]
  label: string
  /** Render labels in the monospace face, matching the sort switch. */
  mono?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const buttons = ref<HTMLButtonElement[]>([])

/**
 * Radio-group keyboard behaviour: arrows move between segments and select as
 * they go, Home/End jump to the ends. Only the selected segment is tabbable,
 * so the control is one tab stop rather than one per option.
 */
function onKeydown(event: KeyboardEvent, index: number) {
  const count = props.options.length
  let next: number | null = null
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % count
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + count) % count
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = count - 1
  if (next === null) return

  event.preventDefault()
  const option = props.options[next]
  if (!option) return
  emit('update:modelValue', option.key)
  buttons.value[next]?.focus()
}
</script>

<template>
  <div
    class="dc-segmented"
    role="radiogroup"
    :aria-label="label"
  >
    <button
      v-for="(option, index) in options"
      :key="option.key"
      ref="buttons"
      type="button"
      role="radio"
      class="dc-segmented__item"
      :class="{ 'dc-segmented__item--mono': mono }"
      :aria-checked="option.key === modelValue"
      :data-dc-active="option.key === modelValue ? 'true' : 'false'"
      :tabindex="option.key === modelValue ? 0 : -1"
      @click="emit('update:modelValue', option.key)"
      @keydown="onKeydown($event, index)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.dc-segmented {
  display: inline-flex;
  padding: 2px;
  background: var(--dc-bg-0);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
}

.dc-segmented__item {
  padding: 5px 11px;
  border: none;
  border-radius: var(--dc-radius-sm);
  background: transparent;
  color: var(--dc-fg-2);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.dc-segmented__item--mono {
  font-family: var(--dc-mono);
}

.dc-segmented__item:hover {
  color: var(--dc-fg-1);
}

.dc-segmented__item[data-dc-active='true'] {
  background: var(--dc-bg-3);
  color: var(--dc-fg-0);
  font-weight: 600;
}
</style>
