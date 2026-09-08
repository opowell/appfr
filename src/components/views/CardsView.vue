<script setup lang="ts">
import { computed } from 'vue'
import { useShellContext } from '../../composables/context'
import { usePresentedRows } from '../../composables/usePresentedRows'
import StatusPill from '../StatusPill.vue'
import MetricDrill from './MetricDrill.vue'
import PinStar from './PinStar.vue'
import RowPicture from './RowPicture.vue'
import ScopeMark from './ScopeMark.vue'
import SelectTick from './SelectTick.vue'

const shell = useShellContext()
const rows = usePresentedRows()
const showEntity = computed(() => shell.isEverything.value)
</script>

<template>
  <div class="dc-cards">
    <div
      v-for="entry in rows"
      :key="entry.key"
      class="dc-card"
    >
      <div class="dc-card__top dc-mono">
        <span class="dc-card__lead">
          <!-- Beside the ordinal, which is where the card starts being read. -->
          <SelectTick
            v-if="shell.selectable.value"
            :row="entry.row"
            :selected="entry.selected"
            :name="entry.parts.identity"
          />
          {{ entry.ordinal }}
          <span
            v-if="showEntity"
            class="dc-card__entity"
          >{{ entry.entityLabel }}</span>
        </span>
        <span class="dc-card__top-right">
          <StatusPill
            v-if="entry.parts.state"
            :status="entry.parts.state"
          />
          <ScopeMark :entry="entry" />
          <PinStar
            v-if="shell.pinnable.value"
            :row="entry.row"
            :name="entry.parts.identity"
            :pinned="entry.pinned"
          />
        </span>
      </div>
      <!-- The picture opens the record, as the name it stands beside does: a
           card is one press however much of it a reader aims at. Cards of a
           type with no `image` column are the same card without the picture,
           laid out by the class rather than by an empty box. -->
      <button
        type="button"
        class="dc-card__open"
        @click="shell.activate(entry.row)"
      >
        <RowPicture
          v-if="entry.parts.image"
          class="dc-card__image"
          :src="entry.parts.image"
        />
        <span class="dc-card__names">
          <span class="dc-card__primary">{{ entry.parts.identity }}</span>
          <span class="dc-card__secondary dc-mono">{{ entry.parts.reference }}</span>
        </span>
      </button>
      <!-- Each number under its own heading: a card has the room a table row
           does not, and `1.2k` on its own says nothing. -->
      <div class="dc-card__metrics dc-mono">
        <MetricDrill
          v-for="metric in entry.parts.metrics.slice(0, 2)"
          :key="metric.column.key ?? metric.label"
          :entry="entry"
          :column="metric.column"
        >
          {{ metric.label }} {{ metric.text }}
        </MetricDrill>
        <span
          v-if="entry.parts.updated"
          class="dc-card__date"
        >{{ entry.parts.updated }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dc-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 12px;
  padding: 16px;
}

.dc-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: var(--dc-bg-1);
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius);
}

.dc-card:hover {
  background: var(--dc-bg-2);
  border-color: var(--dc-line-2);
}

.dc-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
}

.dc-card__lead,
.dc-card__top-right {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.dc-card__entity {
  margin-left: 8px;
  padding: 2px 7px;
  border: 1px solid var(--dc-line);
  border-radius: var(--dc-radius-sm);
  color: var(--dc-fg-2);
}

.dc-card__open {
  display: flex;
  gap: 12px;
  padding: 0;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

/* The names stack whether or not there is a picture to their left. */
.dc-card__names {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

/*
 * Square, so that a wall of cards has one edge down the left of it however
 * different the pictures behind them are. Its own faint ground because a part
 * photographed on white and one cut out to nothing are the same picture here.
 */
.dc-card__image {
  flex: none;
  width: 64px;
  height: 64px;
  border-radius: var(--dc-radius-sm);
  background: var(--dc-bg-2);
}

.dc-card__primary {
  color: var(--dc-accent);
  font-size: var(--dc-text-heading);
  font-weight: var(--dc-weight-semibold);
  line-height: var(--dc-leading-tight);
}

.dc-card__secondary {
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-3);
  word-break: break-all;
}

.dc-card__metrics {
  display: flex;
  gap: 16px;
  margin-top: 2px;
  font-size: var(--dc-text-micro);
  color: var(--dc-fg-2);
}

.dc-card__date {
  margin-left: auto;
}
</style>
