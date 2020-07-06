<template>
    <div v-if="panel.children">
        <div v-if="panel.display === 'flex'" style='display: flex; flex: 1 1 auto;'>
            <button @click.left="toggleDir" style='flex: 0 0 20px'>td</button>
            <template v-for="(childPanel, index) in panel.children">
                <appfr-panel 
                    :panel="childPanel"
                    :key="index"
                    :isLastPanel='index === panel.children.length - 1'
                    :parentPanel='panel'
                    :indexOnParent='index'
                    class='area'
                />
                <div 
                    class="adjuster"
                    v-if="index < panel.children.length - 1"
                    :key="'adjuster' + index"
                    :style='adjusterStyle'
                    @mousedown.stop.prevent='startAdjust(childPanel, $event)'
                />
            </template>
        </div>
        <div v-else-if="panel.display === 'tabs'" style='display: flex; flex-direction: column; flex: 1 1 auto'>
            <div class='tabs'>
                <span 
                    v-for='(childPanel, index) in panel.children'
                    :key='index'
                    class='tab tabHover'
                    :class='{"selected": isSelected(childPanel)}'
                    @mousedown='setActiveChildIndex(index)'
                    draggable="true"
                    @dragstart='dragStart($event, childPanel)'
                    @dragleave="dragLeaveTab($event, index)"
                    @drop='dropOnTab(index, $event)'
                    @dragover='dragOver'
                    @dragenter="dragEnterTab(index, $event)"
                >
                    {{ title(childPanel) }}
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
                    :area='panel'
                />
            </div>
            <appfr-panel
                v-for='(child, index) in panel.children'
                v-bind:style='[panel.activeChildIndex === index ? {} : {"z-index": -1, "display": "none"}]'
                :panel='child'
                :key='"panel-" + index'
            />
        </div>
        <div v-else-if="panel.display === 'windows'">
            <div 
                v-for="(childPanel, index) in panel.children"
                :key="index"
                class="window"
            >
                <div class="header">
                    <div class="title">{{ title(childPanel) }}</div>
                    <div class="close" @click="close(i)">x</div>
                </div>
                <div class="content">
                    <appfr-panel
                      :panel="childPanel"
                      @dblclick.native='toggleMaximized'
                      @dblclick.left='doDblClick'
                    />
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="panel.type != null"
        class='content'
        :is='panel.type'
        :panel='panel'
        style='flex: 1 1 auto;'
    />
</template>

<script>
import JtSpacer from '@/components/JtSpacer.vue'
import Vue from 'vue';

export default {
  name: 'AppfrPanel',
  components: {
      JtSpacer
  },
  props: {
      panel: {
          type: Object,
          default: function() {
              return {
              }
          }
      },
  },
  computed: {
    activeChild() {
      if (this.panel.activeChildIndex < 0 || this.panel.children == null || this.panel.activeChildIndex >= this.panel.children.length) {
        return null;
      } else {
        return this.panel.children[this.panel.activeChildIndex];
      }
    },
    adjusterStyle() {
      let cursor = this.panel.flexDirRow ? 'ew-resize' : 'ns-resize';
      return {
        cursor: cursor,
      }
    },
  },
  methods: {
    toggleDir() {
      this.panel.flexDirRow = !this.panel.flexDirRow
    },
    isSelected(panel) {
      return this.activeChild === panel;
    },
    dragOver(ev) {
      ev.preventDefault();
    },
    title(panel) {
      if (panel.id != null) return panel.id;
      if (panel.type) return panel.type + ': ' + panel.content;
      return panel.content;
    },
    setActiveChildIndex(index) {
        console.log('set index', index);
      this.panel.activeChildIndex = index;
    },
    setIfNull(obj, field, value) {
        if (obj[field] == null) {
            Vue.set(obj, field, value);
        }
    }
  },
  mounted() {
    // this.setIfNull(this.panel, 'children', []);
    if (this.panel.children) {
        this.setIfNull(this.panel, 'activeChildIndex', this.panel.children.length > 0 ? 0 : -1);
    }
    this.setIfNull(this.panel, 'display', 'flex');
    this.setIfNull(this.panel, 'title', 'none');
  }
}
</script>

<style scoped>
.window {
  position: absolute;
  padding: 5px;
  display: flex;
  flex-direction: column;
}




/* TABS */
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

.content {
    flex: 1 1 auto;
}

.header {
  display: flex;
  flex: 0 0 auto;
}

.header > .title {
  flex: 1 1 auto;
}

.header > .close {
  flex: 0 0 auto;
}
</style>