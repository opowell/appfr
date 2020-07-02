<template>
  <div
    class="area"
    :style="styleObj"
  >
    <!-- SHOW CHILDREN AREAS -->
    <template v-if="area.childAreas && area.childAreas.length > 0">
      <button @click.left="toggleDir" style='flex: 0 0 20px'>td</button>
      <template v-for="(childArea, index) in area.childAreas">
        <appfr-area 
          :area="childArea"
          :key="index"
          :isLastArea='index === area.childAreas.length - 1'
        />
        <div 
          class="adjuster"
          v-if="index < area.childAreas.length - 1"
          :key="'adjuster' + index"
          :style='adjusterStyle'
          @mousedown.stop.prevent='startAdjust(index, childArea, index, area, $event)'
        />
      </template>
    </template>
    <!-- SHOW THIS AREA -->
    <template v-else>
      <div 
        class="area-content"
      >
        {{ area.content }}
      </div>
    </template>
  </div>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'AppfrArea',
  props: {
    area: {
      type: Object,
      default: () => { return { 
        childAreas: [],
        content: '',
        flex: '1 1 100px',
      } }
    },
    isLastArea: {
      type: Boolean,
      default: true
    },
  },
  mounted() {
    if (this.area.flexDirRow == null)
      Vue.set(this.area, 'flexDirRow', true) 
    if (this.area.flex == null)
      Vue.set(this.area, 'flex', '1 1 100px')
  },
  computed: {
    styleObj() {
      let out = {
        "flex-direction": this.area.flexDirRow ? "row" : "column"
      }
      if (this.isLastArea) {
        out.flex = '1 1 100px';
      } else {
        out.flex = this.area.flex;
      }
      return out;
    },
    adjusterStyle() {
      let cursor = this.area.flexDirRow ? 'ew-resize' : 'ns-resize';
      return {
        cursor: cursor,
      }
    },
  },
  methods: {
    toggleDir() {
      this.area.flexDirRow = !this.area.flexDirRow
    },
    startAdjust(index, curArea, indexOnParent, parent, ev) {
      let el = ev.currentTarget.previousSibling;
      this.adjustData = {
        index,
        curArea,
        indexOnParent,
        parent,
        startX: ev.pageX,
        startY: ev.pageY,
        origWidth: el.clientWidth,
        origHeight: el.clientHeight,
      }
      document.documentElement.addEventListener('mousemove', this.adjust);
      document.documentElement.addEventListener('mouseup', this.stopAdjust);
    },
    adjust(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      let size = null;
      if (this.area.flexDirRow) {
          size = this.adjustData.origWidth + (ev.pageX - this.adjustData.startX);
      } else {
          size = this.adjustData.origHeight + (ev.pageY - this.adjustData.startY);
      }
      this.adjustData.newSize = size;
      console.log('setting size to ' + size)
      this.adjustData.curArea.flex = '0 0 ' + size + 'px';
    },
    stopAdjust(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      document.documentElement.removeEventListener('mousemove', this.adjust);
      document.documentElement.removeEventListener('mouseup', this.stopAdjust);
      // let areaPath = [];
      // let parent = this.adjustData.parent;
      // let curArea = this.adjustData.curArea;
      // let indexOnParent = this.adjustData.indexOnParent;
      // while (parent != null) {
      //   areaPath.unshift(indexOnParent);
      //   curArea = parent;
      //   parent = curArea.parent;
      //   indexOnParent = curArea.indexOnParent;
      // }
      // this.$store.commit('setAreaSize', {
      //   windowId: this.window.id,
      //   areaPath,
      //   size: this.adjustData.newSize,
      // });
    },
  }
};

</script>

<style scoped>
.area {
  display: flex;
  flex: 1 1 auto;
}
.adjuster {
  flex: 0 0 1px;
  padding: 3px;
  background-color: brown;
}
</style>