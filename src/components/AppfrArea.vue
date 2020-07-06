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
          :parentArea='area'
          :indexOnParent='index'
        />
        <div 
          class="adjuster"
          v-if="index < area.childAreas.length - 1"
          :key="'adjuster' + index"
          :style='adjusterStyle'
          @mousedown.stop.prevent='startAdjust(childArea, $event)'
        />
      </template>
    </template>
    <!-- SHOW THIS AREA -->
    <template v-else>
          <div class='tabs'>
      <template>
          <span 
              v-for='(panel, index) in area.panels'
              :key='index'
              class='tab tabHover'
              :class='{"selected": isSelected(panel)}'
              @mousedown='setActivePanelIndex(index)'
              draggable="true"
              @dragstart='dragStart($event, panel)'
              @dragleave="dragLeaveTab($event, index)"
              @drop='dropOnTab(index, $event)'
              @dragover='dragOver'
              @dragenter="dragEnterTab(index, $event)"
          >
              {{ title(panel) }}
              <span style='width: 20px; display: flex; margin-left: 5px;'>
                  <span
                      class='closeButton'
                      @click.stop='closePanel(index)'
                      style='width: 20px'
                  >x</span>
              </span>
          </span>
          <jt-spacer
              @mousedown.native='startMove'
              :area='area'
          />
      </template>
    </div>
      <template v-if="area.panels && area.panels.length > 0">
        <div 
          v-for='(panel, index) in area.panels'
          v-bind:style='[area.activePanelInd === index ? {} : {"z-index": -1, "display": "none"}]'
          class='content'
          :is='panel.type'
          :panel='panel'
          :key='"panel-" + index'
        /> 
      </template>
      <div v-else-if="area.type"
        class="area-content-default"
        :is="area.type"
        :content="area.content"
      />
      <div v-else class="area-content area-content-default">
        {{ area.content }}
      </div>
    </template>
  </div>
</template>
<script>
import Vue from 'vue';
import JtSpacer from '@/components/JtSpacer.vue';

export default {
  name: 'AppfrArea',
  components: {
    JtSpacer
  },
  props: {
    indexOnParent: {
      type: Number
    },
    parentArea: {
      type: Object
    },
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
    if (this.area.activePanelInd == null) 
      Vue.set(this.area, 'activePanelInd', 0)
    this.area.component = this;
  },
  computed: {
    styleObj() {
      if (this.area.childAreas == null || this.area.childAreas.length < 1) {
        return {
          "flex-direction": "column",
        }
      }
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
    activePanel() {
      if (this.area.activePanelInd < 0 || this.area.panels == null || this.area.activePanelInd >= this.area.panels.length) {
        return null;
      } else {
        return this.area.panels[this.area.activePanelInd];
      }
    },
    areaId() {
      if (this.indexOnParent == null) {
        return;
      }
      return this.parent.component.areaId + ':' + this.indexOnParent;
    }
  },
  methods: {
    isSelected(panel) {
      return this.activePanel === panel;
    },
    toggleDir() {
      this.area.flexDirRow = !this.area.flexDirRow
    },
    startAdjust(curArea, ev) {
      let el = ev.currentTarget.previousSibling;
      this.adjustData = {
        curArea,
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
      this.adjustData.curArea.flex = '0 0 ' + size + 'px';
    },
    stopAdjust(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      document.documentElement.removeEventListener('mousemove', this.adjust);
      document.documentElement.removeEventListener('mouseup', this.stopAdjust);
      this.$emit('adjusted-size', this.adjustData.curArea)
    },
    dragEnterTab(index, ev) {
      // let targetData = {
      //   windowId: this.window.id,
      //   areaPath: this.areaPath,
      //   index,
      // };
      // let samePanel = this.samePanel(this.$store.state.dragData, targetData);
      // if (samePanel === false) {
        let el = ev.target;
        el.classList.add('highlight');
        try {
          let panel = JSON.parse(ev.dataTransfer.getData('panel'));
          this.area.panels.splice(index, 0, panel);
        } catch (err) {}
      // }
    },
    dragLeaveTab(ev, index) {
      ev.target.classList.remove('highlight');
      this.area.panels.splice(index, 1);
    },
    dragOver(ev) {
      ev.preventDefault();
    },
    title(panel) {
      if (panel.id != null) return panel.id;
      if (panel.type) return panel.type + ': ' + panel.content;
      return panel.content;
    },
    setActivePanelIndex(index) {
      this.area.activePanelInd = index;
    },
    dragStart(ev, panel) {
      ev.dataTransfer.setData('panel', JSON.stringify(panel))
    },
  }
};

</script>

<style scoped>
.area {
  display: flex;
  flex: 1 1 auto;
}
.area > * {
  flex: 1 1 auto;
}
.adjuster {
  flex: 0 0 1px;
  padding: 3px;
  background-color: brown;
}
.area-content-default {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
}

.tabHover:hover {
    background-color: #ff7f50b0;
}

.tabs {
    display: flex;
    flex: 0 0 auto;
    background-color: var(--tabsBGColor);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.tab {
    background-color: var(--tabBGColor);
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 25px;
    padding-right: 5px;
    cursor: default;
    border-right: 1px solid;
    display: flex;
    white-space: nowrap;
    color: var(--tabFontColor);
}
.tab.spacer {
    flex: 1 1 auto;
    background-color: transparent;
    border-right-width: 0px;
    padding: 0px;
    margin: 0px;
    color: inherit;
}
.highlight {
    background-color: #ff00004f;
}

.tab.highlight {
    background-color: #ff00004f;
} 

.selected {
    background-color: coral;
    color: white;
    z-index: 0;
}

.selected:hover {
    background-color: coral;
}

.selected .closeButton {
    display: flex;
}

.closeButton {
    display: none;
    align-self: center;
    color: #AAA;
}

.closeButton:hover {
    color: #000;
}

.tab:hover .closeButton {
    display: flex;
}
</style>