<script setup lang="ts">
import { useShellContext } from '../../composables/context'
import { usePresentedRows } from '../../composables/usePresentedRows'
import RowPicture from './RowPicture.vue'
import SelectTick from './SelectTick.vue'

const shell = useShellContext()
const rows = usePresentedRows()
</script>

<template>
  <div class="dc-grid">
    <!-- The tile is one button, so the tick cannot be inside it: it sits over
         the tile instead, in the corner the caption does not use. -->
    <div
      v-for="entry in rows"
      :key="entry.key"
      class="dc-grid__cell"
    >
      <button
        type="button"
        class="dc-tile"
        :style="{ '--dc-tile-tint': entry.parts.tint ?? undefined }"
        @click="shell.activate(entry.row)"
      >
        <!-- Under the scrim, which is what keeps the caption readable over a
             picture the shell knows nothing about. A tile with no picture is
             the tint it always was, showing through. -->
        <RowPicture
          v-if="entry.parts.image"
          class="dc-tile__image"
          :src="entry.parts.image"
        />
        <span class="dc-tile__scrim">
          <span class="dc-tile__top dc-mono">
            <span class="dc-tile__chip">{{ entry.ordinal }}</span>
          </span>
          <span class="dc-tile__caption">
            <span class="dc-tile__secondary dc-truncate">{{ entry.parts.reference }}</span>
            <span class="dc-tile__primary">{{ entry.parts.identity }}</span>
          </span>
        </span>
      </button>

      <SelectTick
        v-if="shell.selectable.value"
        class="dc-grid__tick"
        :row="entry.row"
        :selected="entry.selected"
        :name="entry.parts.identity"
      />
    </div>
  </div>
</template>

<style scoped>
.dc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  padding: 16px;
}

/* What the grid lays out, now that a tile may have something over it. */
.dc-grid__cell {
  position: relative;
  min-width: 0;
}

/* Opposite the ordinal, and over the scrim's own darkening so that a box in
   the shell's accent stays visible on a tile of any colour. */
.dc-grid__tick {
  position: absolute;
  top: 10px;
  right: 10px;
}

.dc-tile {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: 0;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
  overflow: hidden;
  background: var(--dc-tile-tint, var(--dc-bg-2));
  cursor: pointer;
}

.dc-tile:hover {
  border-color: var(--dc-line-2);
}

/*
 * The whole tile, whole: the caption is over the picture rather than beside
 * it, so the picture is the tile and the tint is what is left where its shape
 * does not fill one.
 */
.dc-tile__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.dc-tile__scrim {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  background: linear-gradient(
    180deg,
    var(--dc-scrim) 0%,
    transparent 34%,
    transparent 52%,
    var(--dc-scrim-strong) 100%
  );
  color: var(--dc-scrim-fg);
  text-align: left;
}

.dc-tile__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--dc-text-micro);
  font-weight: var(--dc-weight-semibold);
}

.dc-tile__chip {
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--dc-scrim);
}

.dc-tile__caption {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dc-tile__secondary {
  font-size: var(--dc-text-micro);
  opacity: 0.85;
}

.dc-tile__primary {
  font-size: var(--dc-text-heading);
  font-weight: var(--dc-weight-semibold);
  line-height: var(--dc-leading-tight);
  letter-spacing: var(--dc-tracking-tight);
}
</style>
