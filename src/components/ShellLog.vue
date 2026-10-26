<script setup lang="ts">
/*
 * A log that is still being written: a run's output, a crawl's.
 *
 * It asks for what it has not read yet — `fetchChunk(offset)` answers with the
 * text after `offset` and where that text ends — and appends it, so a long
 * log costs one read of each byte rather than one of the whole thing per
 * poll. When it asks is the host's: `poll()` is exposed, and the host calls it
 * on whatever beat it already polls the record on, which is usually the same
 * beat that says the run has finished and the polling can stop.
 *
 * It follows the tail, the way a terminal does — and stops following the
 * moment the reader scrolls up, so reading back through a failure is not
 * yanked away by the next chunk. Scrolling back down to the end picks the
 * tail up again.
 */
import { computed, nextTick, ref } from 'vue'
import type { LogChunk } from '../types'

const props = withDefaults(defineProps<{
  /** Reads the log from `offset` on. */
  fetchChunk: (offset: number) => Promise<LogChunk>
  /**
   * Takes out a terminal's colour codes. A tool writing for a terminal says
   * red with `\x1b[31m`, and in a page that is not red but `[31m` in the
   * middle of a line.
   */
  stripAnsi?: boolean
  /**
   * The tallest the pane grows before it scrolls — a CSS length, or a number
   * of pixels. A log has to scroll inside something to have a tail to
   * follow, so this is bounded unless told otherwise.
   */
  maxHeight?: string | number
}>(), {
  maxHeight: '460px',
})

/** How near the end still counts as at it — a line's height, near enough. */
const AT_END = 24

/*
 * A terminal's control sequences — the CSI ones, colour among them. Written
 * here rather than shared because there was nothing to share it with; a
 * `stripAnsi` beside the other formatters would replace it.
 */
// eslint-disable-next-line no-control-regex
const ANSI = /\x1b\[[0-9;?]*[ -/]*[@-~]/g

/**
 * Everything read so far, as it arrived. Codes are taken out of the whole of
 * it on the way to the screen rather than from each chunk, because a chunk
 * can end half-way through one.
 */
const raw = ref('')
const shown = computed(() => (props.stripAnsi ? raw.value.replace(ANSI, '') : raw.value))

const pane = ref<HTMLElement | null>(null)
let offset = 0
let reading: Promise<void> | null = null

/**
 * Reads what has been written since the last read, and keeps to the tail if
 * the reader was at it. A poll while one is in flight is that one — two reads
 * from the same offset would append the same text twice.
 */
function poll(): Promise<void> {
  reading ??= read().finally(() => {
    reading = null
  })
  return reading
}

async function read(): Promise<void> {
  const { chunk, offset: next } = await props.fetchChunk(offset)
  offset = next
  if (!chunk) return

  const element = pane.value
  const pinned = !element || element.scrollTop + element.clientHeight >= element.scrollHeight - AT_END
  raw.value += chunk

  if (pinned) {
    await nextTick()
    if (pane.value) pane.value.scrollTop = pane.value.scrollHeight
  }
}

/** Forgets what was read, for a pane that is about to show another log. */
function reset(): void {
  raw.value = ''
  offset = 0
}

const style = computed(() => {
  if (props.maxHeight === undefined) return undefined
  const height = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  return { maxHeight: height }
})

defineExpose({ poll, reset })
</script>

<template>
  <pre
    ref="pane"
    class="dc-log dc-mono"
    :style="style"
  >{{ shown }}</pre>
</template>

<style scoped>
/* Drawn as `<ShellCode>` draws a block, edges and all, so a log and a source
   on the same page are recognisably the same kind of thing. */
.dc-log {
  margin: 0;
  padding: 14px 16px;
  min-width: 0;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  background: var(--dc-bg-0);
  font-size: var(--dc-text-code);
  line-height: var(--dc-leading-prose);
  color: var(--dc-fg-1);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  overflow: auto;
  overscroll-behavior: contain;
}

.dc-shell-card__body[data-dc-flush='true'] .dc-log {
  border: none;
  border-radius: 0;
}
</style>
