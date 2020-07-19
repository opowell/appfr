<template>
  <div 
    v-if="panel.children"
    :style="styleObj"
    class='appfr-panel'
    @mousedown.left.stop='clickWindow($event)'
  >
    <!-- FLEX CHILDREN -->
    <div
      style='display: flex; flex: 1 1 auto; flex-direction: column;'
    >
      <appfr-panel-header
        v-if="showHeaderComputed"
        style="flex: 0 0 auto"
        :rootPanel="rootPanel"
        :panel="panel"
        :menu="menu"
        @close="close"
        id='tabs-header'
      >
        <template v-slot:title v-if="panel.display === 'tabs'">
          <span
            v-for='(childPanel, index) in panel.children'
            :key='childPanel.id'
            class='tab tabHover'
            :class='{"selected": isSelected(childPanel)}'
            @mousedown.left.stop.prevent='setActiveChildIndex(index)'
            draggable="true"
            @dragstart='dragStart($event, childPanel)'
            @dragleave="dragLeaveTab($event, index)"
            @drop='dropOnTab(index, $event)'
            @dragover='dragOver'
            @dragenter="dragEnterTab(index, $event)"
          >
            {{ title(childPanel) }}
            <span style='width: 20px; display: flex; margin-left: 5px;'>
              <font-awesome-icon
                class='closeButton'
                @click.left.stop.prevent='closePanel(index)'
                icon="times"
                style='width: 20px'
              />
            </span>
          </span>
          <span style='flex: 1 1 auto' />
        </template>
      </appfr-panel-header>

      <div :style='childContainerStyle'>
        <template v-for="(childPanel, index) in panel.children">
          <appfr-panel
            :panel="childPanel"
            :key="childPanel.id"
            :isLastPanel='index === panel.children.length - 1'
            :parentPanel='panel'
            :indexOnParent='index'
            class='area flex-child'
          />
          <div 
            class="adjuster"
            v-if="showAdjusters && index < panel.children.length - 1"
            :key="'adjuster' + index"
            :style='adjusterStyle'
            @mousedown.left.stop.prevent='startAdjust(childPanel, $event)'
          />
        </template>
      </div>
    </div>
  </div>
  <div v-else
    @mousedown.left.stop='clickWindow($event)'
    class="window"
    :style="styleObj"
  >
    <span v-if="resizable" class="handle handle-tl" @mousedown.left.prevent.stop="startResizeTL" />
    <span v-if="resizable" class="handle handle-tc" @mousedown.left.prevent.stop="startResizeT" />
    <span v-if="resizable" class="handle handle-tr" @mousedown.left.prevent.stop="startResizeTR" />
    <span v-if="resizable" class="handle handle-ml" @mousedown.left.prevent.stop="startResizeL" />
    <span v-if="resizable" class="handle handle-mr" @mousedown.left.prevent.stop="startResizeR" />
    <span v-if="resizable" class="handle handle-bl" @mousedown.left.prevent.stop="startResizeBL" />
    <span v-if="resizable" class="handle handle-bc" @mousedown.left.prevent.stop="startResizeB" />
    <span v-if="resizable" class="handle handle-br" @mousedown.left.prevent.stop="startResizeBR" />
    <appfr-panel-header
      v-if="hasHeader"
      style="flex: 0 0 auto"
      :rootPanel="rootPanel"
      :panel="panel"
      :menu="menu"
      @close="close"
      id='tabs-header'
    >
      <template v-slot:title>
        <span
          class='tab tabHover'
          :class='{"selected": true}'
          draggable="true"
          @dragstart='dragStart($event, childPanel)'
          @dragleave="dragLeaveTab($event, index)"
          @drop='dropOnTab(index, $event)'
          @dragover='dragOver'
          @dragenter="dragEnterTab(index, $event)"
        >
          {{ title(panel) }}
          <span style='width: 20px; display: flex; margin-left: 5px;'>
            <font-awesome-icon
              class='closeButton'
              @click.left.stop.prevent='closePanel(index)'
              icon="times"
              style='width: 20px'
            />
          </span>
        </span>
        <span style='flex: 1 1 auto' />
      </template>
    </appfr-panel-header>
    <div class="content-container">
      <div
        class='content'
        :is='panel.type'
        :panel='panel'
      />
    </div>
  </div>
</template>

<script>
import JtSpacer from '@/components/JtSpacer.vue'
import MenuEl from '@/components/MenuEl.vue'
import AppfrPanelHeader from '@/components/AppfrPanelHeader.vue'
import Vue from 'vue';

export default {
  name: 'AppfrPanel',
  components: {
    JtSpacer,
    MenuEl,
    AppfrPanelHeader,
  },
  props: {
    indexOnParent: {
      type: Number,
      default: null,
    },
    panel: {
      type: Object,
      default: function() {
        return {};
      }
    },
    parentPanel: {
      type: Object,
      default: function() {
        return null;
      }
    },
    isLastPanel: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: Number,
      default: 100
    },
    minWidth: {
      type: Number,
      default: 200
    },
    minTop: {
      type: Number,
      default: 5
    },
    minLeft: {
      type: Number,
      default: 5
    },
    showHeader: {
      type: Boolean,
      default: null,
    }
  },
  computed: {
    menu() {
      const out = {
        icon: ["fas", "align-center"],
        hasParent: false,
        showIcon: true,
        children: [
          {
              text: "Toggle flex dir",
              action: this.toggleDir,
          },
          'divider',
          {
              text: "Next Panel",
              action: this.changeSelectedIndex,
              clickData: 1,
          },
          {
              text: "Previous Panel",
              action: this.changeSelectedIndex,
              clickData: -1,
          },
          {
              action: this.createChild,
              text: "Create child (Col)",
              clickData: false,
              hasParent: false,
          },
          {
              action: this.createChild,
              text: "Create child (Row)",
              clickData: true,
              hasParent: false,
          },
          {
              text: "New sibling of parent",
              hasParent: false,
              action: this.newSiblingOfParent,
          },
          "divider",
          {
              text: "Close Area",
              action: this.close,
          },
          {
              text: "Toggle parent dir.",
              action: this.toggleRowChildren,
          },
          "divider",
          {
              text: "(Next Window)",
          },
          {
              text: "(Previous Window)",
          },
          "divider",
          {
              hasParent: false,
              text: "(Minimize)",
          },
          {
              action: this.restore,
              text: "Restore",
          },
        ]
      };
      if (this.children) {
        out.children.unshift(
          {
            text: "Display: Flex",
            action: this.setDisplay,
            clickData: 'flex',
          },
          {
            text: "Display: Tabs",
            action: this.setDisplay,
            clickData: 'tabs',
          },
          {
            text: "Display: Windows",
            action: this.setDisplay,
            clickData: 'windows',
          },
          'divider',
        );
      }
      if (this.indexOnParent === 0) {
        out.children.unshift(
          {
            text: "Parent display: Flex",
            action: this.setField,
            clickData: {
              object: this.parentPanel,
              field: 'display',
              value: 'flex',
            },
          },
          {
            text: "Parent display: Tabs",
            action: this.setField,
            clickData: {
              object: this.parentPanel,
              field: 'display',
              value: 'tabs',
            },
          },
          {
            text: "Parent display: Windows",
            action: this.setField,
            clickData: {
              object: this.parentPanel,
              field: 'display',
              value: 'windows',
            },
          },
          'divider',
        );
      }
      return out;
    },
    showAdjusters() {
      return this.panel.display === 'flex';
    },
    childContainerStyle() {
      if (this.panel.display === 'flex') {
        return this.flexStyleObj
      }
      if (this.panel.display === 'tabs') {
        return {
          display: 'flex',
          flex: '1 1 auto',
        };
      }
      if (this.panel.display === 'windows') {
        return {
          flex: '1 1 auto',
          position: 'relative',
        }
      }
    },
    resizable() {
      if (this.panel.resizable != null) return this.panel.resizable
      if (this.parentPanel != null) return this.parentPanel.display === 'windows'
      return false;
    },
    hasHeader() {
      if (this.panel.hasHeader != null) return this.panel.hasHeader;
      if (this.parentPanel != null && this.parentPanel.display !== 'flex') return true;
      if (this.panel.children == null) return true;
      return false;
    },
    rootPanel() {
      if (this.parentPanel == null || this.parentPanel.$component == null) {
        return this.panel;
      }
      return this.parentPanel.$component.rootPanel
    },
    parentElement() {
      if (this.parentPanel == null) {
        return this.$el.parentElement;
      }
      return this.parentPanel.$component.$el;
    },
    parentWidth() {
      if (this.parentElement == null) {
        return 0;
      }
      return this.parentElement.clientWidth;
    },
    parentHeight() {
      if (this.parentElement == null) {
        return 0;
      }
      return this.parentElement.clientHeight;
    },
    activeChild() {
      if (this.panel.activeChildIndex < 0 || this.panel.children == null || this.panel.activeChildIndex >= this.panel.children.length) {
        return null;
      } else {
        return this.panel.children[this.panel.activeChildIndex];
      }
    },
    showHeaderComputed() {
      if (this.showHeader == null) {
        return this.panel.display === 'tabs'
      }
    },
    adjusterStyle() {
      let cursor = this.panel.flexDirRow ? 'ew-resize' : 'ns-resize';
      return {
        cursor: cursor,
      }
    },
    flexStyleObj() {
      let out = {
        display: "flex",
        flex: "1 1 auto",
        "flex-direction": this.panel.flexDirRow ? "row" : "column",
      }
      return out;
    },
    styleObj() {
      let out = {}

      if (this.parentPanel == null) {
        out.top = this.panel.y + 'px';
        out.left = this.panel.x + 'px';
        out["flex-direction"] = this.panel.flexDirRow ? "row" : "column";
        out.display = 'flex';
        if (this.isLastPanel) {
          out.flex = '1 1 100px';
        } else {
          out.flex = this.panel.flex;
        }
        return out;
      } 

      if (this.parentPanel.display === 'windows') {
        out.zIndex = this.panel.zIndex;
        out.position = 'absolute';
        if (!this.parentPanel.isMaximized) {
          out.top = this.panel.y + 'px';
          out.left = this.panel.x + 'px';
          out.width = this.panel.w + 'px';
          out.height = this.panel.h + 'px';
        }
      } else if (this.parentPanel.display === 'flex') {
        out["flex-direction"] = this.panel.flexDirRow ? "row" : "column";
        out.display = 'flex';
        if (this.isLastPanel) {
          out.flex = '1 1 100px';
        } else {
          out.flex = this.panel.flex;
        }
      } else {
        out.flex = '1 1 auto';
        out.width = 'unset';
        if (this.parentPanel.activeChildIndex !== this.indexOnParent) {
          out["z-index"] = -1;
          out.display = 'none';
        }
      }

      if (this.panel.children == null || this.panel.children.length === 0) {
        out["flex-direction"] = "column";
      }

      return out;
    },
  },
  methods: {
    setField({object, field, value}) {
      object[field] = value;
    },
    close() {
      if (this.parentPanel == null) return;
      console.log('splicing', this)
      this.parentPanel.children.splice(this.indexOnParent, 1);
    },
    changeSelectedIndex(change) {
      this.activeChildIndex += change;
      if (this.activeChildIndex < 0) this.activeChildIndex = this.children.length - 1;
      if (this.activeChildIndex > this.children.length - 1) this.activeChildIndex = 0;
    },
    clickWindow(ev) {
      this.rootPanel.isMenuOpen = false;
      if (this.parentPanel != null && this.parentPanel.display !== 'windows') return;
      this.focusWindow();
      this.startMove(ev);
    },
    focusWindow() {
      if (this.parentPanel == null) return;
      console.log('splicing')
      this.parentPanel.children.splice(this.indexOnParent, 1);
      this.parentPanel.children.push(this.panel);
    },
    startMove(ev) {
      if (this.isMaximized) {
        return;
      }
      document.documentElement.addEventListener('mousemove', this.move);
      document.documentElement.addEventListener('mouseup', this.stopMove);
      this.moveStartX = ev.pageX;
      this.moveStartY = ev.pageY;
      this.origTop = this.panel.y;
      this.origLeft = this.panel.x;
      console.log('startmove', ev, ev.pageX, ev.pageY, this.origTop, this.origLeft);
    },
    getConstrainedLeft(x, w) {
      w = w || this.panel.w
      x = Math.max(x, this.minLeft);
      x = Math.min(x, this.parentWidth - w - 18);
      return x;
    },
    getConstrainedWidth(w, x) {
      x = x || this.panel.x
      w = Math.max(w, this.minWidth);
      w = Math.min(w, this.parentWidth - x - 18);
      return w;
    },
    getConstrainedTop(x) {
      x = Math.max(x, this.minTop);
      x = Math.min(x, this.parentHeight - this.panel.h - 18);
      return x;
    },
    move(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      let newLeft = this.origLeft + ev.pageX - this.moveStartX;
      this.panel.x = this.getConstrainedLeft(newLeft);

      let newTop = this.origTop + ev.pageY - this.moveStartY;
      this.panel.y = this.getConstrainedTop(newTop);
      // console.log('move', newLeft, this.moveStartX, this.origLeft, this.panel.x, ev.pageX);
    },
    stopMove(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      document.documentElement.removeEventListener('mousemove', this.move);
      document.documentElement.removeEventListener('mouseup', this.stopMove);
      // this.$emit('saveWindowInfo', this);
    },
    setDisplay(x) {
      this.panel.display = x;
    },
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
      if (panel.title != null) return panel.title;
      if (panel.type) return panel.type + ': ' + panel.content;
      if (
        panel.children != null &&
        panel.activeChildIndex != null &&
        panel.activeChildIndex < panel.children.length
      ) {
        return this.title(panel.children[panel.activeChildIndex]);
      }
      return panel.id;
    },
    setActiveChildIndex(index) {
      this.panel.activeChildIndex = index;
    },
    setIfNull(obj, field, value) {
        if (obj[field] == null) {
            Vue.set(obj, field, value);
        }
    },
    startAdjust(panel, ev) {
      console.log('start adjust', panel, ev, this);
      let el = ev.currentTarget.previousSibling;
      this.adjustData = {
        panel,
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
      if (this.panel.flexDirRow) {
        size = this.adjustData.origWidth + (ev.pageX - this.adjustData.startX);
      } else {
        size = this.adjustData.origHeight + (ev.pageY - this.adjustData.startY);
      }
      this.adjustData.newSize = size;
      Vue.set(this.adjustData.panel, 'flex', '0 0 ' + size + 'px');
    },
    stopAdjust(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      document.documentElement.removeEventListener('mousemove', this.adjust);
      document.documentElement.removeEventListener('mouseup', this.stopAdjust);
      // this.$emit('adjusted-size', this.adjustData.panel)
    },

    startResizeTL(ev) {
      this.addMouseListeners(this.resizeTL);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origTop = this.panel.y;
      this.origLeft = this.panel.x;
      this.origWidth = this.panel.w;
      this.origHeight = this.panel.h;
    },
    // Resize methods need to be as fast as possible to prevent lag.
    resizeTL(ev) {
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth - deltaX >= this.minWidth) {
        this.panel.x = this.origLeft + deltaX;
        this.panel.w = this.origWidth - deltaX;
      }
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight - deltaY >= this.minHeight) {
        this.panel.y = this.origTop + deltaY;
        this.panel.h = this.origHeight - deltaY;
      }
    },

    startResizeT(ev) {
      this.addMouseListeners(this.resizeT);
      this.resizeStartY = ev.pageY;
      this.origTop = this.panel.y;
      this.origHeight = this.panel.h;
    },
    resizeT(ev) {
      const deltaY = ev.pageY - this.resizeStartY;
      let newTop = this.origTop + deltaY;
      newTop = Math.max(this.minTop, newTop);
      let newHeight = this.origHeight + (this.origTop - newTop);
      this.panel.h = Math.max(this.minHeight, newHeight)
      this.panel.y = this.origTop - (this.panel.h - this.origHeight);
    },

    startResizeTR(ev) {
      this.addMouseListeners(this.resizeTR);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origTop = this.panel.y;
      this.origLeft = this.panel.x;
      this.origWidth = this.panel.w;
      this.origHeight = this.panel.h;
    },
    resizeTR(ev) {
      // Resize RIGHT
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth + deltaX >= this.minWidth) {
        this.panel.w = this.origWidth + deltaX;
      }
      // Resize top
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight - deltaY >= this.minHeight) {
        this.panel.y = this.origTop + deltaY;
        this.panel.h = this.origHeight - deltaY;
      }
    },

    startResizeL(ev) {
      this.addMouseListeners(this.resizeL);
      this.resizeStartX = ev.pageX;
      this.origLeft = this.panel.x;
      this.origWidth = this.panel.w;
    },
    resizeL(ev) {
      const deltaX = ev.pageX - this.resizeStartX;
      let newLeft = this.origLeft + deltaX;
      newLeft = Math.max(this.minLeft, newLeft);
      let newWidth = this.origWidth + (this.origLeft - newLeft);
      this.panel.w = Math.max(this.minWidth, newWidth)
      this.panel.x = this.origLeft - (this.panel.w - this.origWidth);
    },

    removeMouseListeners() {
      document.documentElement.removeEventListener('mousemove', this.resizeFn);
      this.resizeFn = null
      document.documentElement.removeEventListener('mouseup', this.removeMouseListeners);
      this.$emit('saveWindowInfo', this);
    },

    addMouseListeners(resizeFn) {
      this.resizeFn = resizeFn
      document.documentElement.addEventListener('mousemove', resizeFn);
      document.documentElement.addEventListener('mouseup', this.removeMouseListeners);
    },

    startResizeR(ev) {
      this.addMouseListeners(this.resizeR);
      this.resizeStartX = ev.pageX;
      this.origWidth = this.panel.w;
    },
    resizeR(ev) {
      const deltaX = ev.pageX - this.resizeStartX;
      let newWidth = this.origWidth + deltaX;
      newWidth = Math.min(newWidth, this.parentWidth - this.panel.x - 18);
      this.panel.w = Math.max(this.minWidth, newWidth)
    },

    startResizeBL(ev) {
      this.addMouseListeners(this.resizeBL);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origLeft = this.panel.x;
      this.origWidth = this.panel.w;
      this.origHeight = this.panel.h;
    },
    resizeBL(ev) {
      // LEFT
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth - deltaX >= this.minWidth) {
        this.panel.x = this.origLeft + deltaX;
        this.panel.w = this.origWidth - deltaX;
      }
      // BOTTOM
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight + deltaY >= this.minHeight) {
        this.panel.h = this.origHeight + deltaY;
      }
    },

    startResizeB(ev) {
      this.addMouseListeners(this.resizeB);
      this.resizeStartY = ev.pageY;
      this.origHeight = this.panel.h;
    },
    resizeB(ev) {
      const deltaY = ev.pageY - this.resizeStartY;
      let newHeight = this.origHeight + deltaY;
      newHeight = Math.min(newHeight, this.parentHeight - this.panel.y);
      this.panel.h = Math.max(this.minHeight, newHeight)
    },

    startResizeBR(ev) {
      this.addMouseListeners(this.resizeBR);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origWidth = this.panel.w;
      this.origHeight = this.panel.h;
    },
    resizeBR(ev) {
      // RIGHT
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth + deltaX >= this.minWidth) {
        this.panel.w = this.origWidth + deltaX;
      }
      // BOTTOM
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight + deltaY >= this.minHeight) {
        this.panel.h = this.origHeight + deltaY;
      }
    },
  },
  mounted() {
    if (this.panel.children) {
        this.setIfNull(this.panel, 'activeChildIndex', this.panel.children.length > 0 ? 0 : -1);
    }
    this.setIfNull(this.panel, 'display', 'tabs');
    this.setIfNull(this.panel, 'flexDirRow', true);
    this.panel.$component = this;
  },
  beforeMount() {
    this.setIfNull(this.panel, 'x', this.minLeft);
    this.setIfNull(this.panel, 'y', this.minTop);
    this.setIfNull(this.panel, 'w', 300);
    this.setIfNull(this.panel, 'h', 200);
    this.setIfNull(this.panel, 'id', Math.random());
  }
}
</script>

<style scoped>
.appfr-panel {
  background-color: #9ac0d1;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

/* TABS */
.area {
  display: flex;
}

.adjuster {
  flex: 0 0 1px;
  padding: 3px;
}
.area-content-default {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
}

.tabHover:hover {
    background-color: #fff;
}

.tab {
    background-color: rgb(218, 229, 235);
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 25px;
    padding-right: 5px;
    cursor: default;
    border-right: 1px solid;
    display: flex;
    white-space: nowrap;
    color: var(--tabFontColor);
    align-items: center;
}
.tab.spacer {
    flex: 1 1 auto;
    background-color: transparent;
    border-right-width: 0px;
    padding: 0px;
    margin: 0px;
    color: inherit;
}

.window {
  background-color: rgb(185, 209, 234);;
  border: 1px outset #ddd;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;

  padding: 5px;
  display: flex;
  flex-direction: column;
}

.highlight {
    background-color: #ff00004f;
}

.tab.highlight {
    background-color: #ff00004f;
} 

.selected {
  background-color: #f5f5f5;
  z-index: 0;
}

.selected:hover {
    background-color: #fff;
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

.content-container {
  flex: 1 1 auto;
  align-items: stretch;
  justify-content: stretch;
  display: flex;
  overflow: scroll;
}

.content {
  flex: 1 1 auto;
}

.tab-content {
    background-color: white;
    color: black;
    flex: 1 1 auto;
    overflow: auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    padding: 10px;
}

.header {
  display: flex;
  flex: 0 0 auto;
  background-color: rgba(255,255,255,0.3);
  align-items: center;
}

.header > .title {
  flex: 1 1 auto;
}

.header > .close {
  flex: 0 0 auto;
}

.handle {
  background-color: inherit;
  border-width: 0px;
  display: flex;
  width: 7px;
  height: 7px;
  position: absolute;
}

.handle-tl {
  border-top-left-radius: 5px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  top: -5px;
  left: -5px;
  cursor: nwse-resize;
}

.handle-tc {
  border-top: 1px solid #000;
  width: calc(100% - 4px);
  left: 2px;
  top: -5px;
  cursor: ns-resize;
}

.handle > * {
  width: 100%;
}

.handle-tc > * {
  border-top: 1px solid #fff;
}

.handle-tl > * {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-top-left-radius: 5px;
}

.handle-tr > * {
  border-top: 1px solid #fff;
  border-right: 1px solid rgb(63, 206, 242);
  border-top-right-radius: 5px;
}

.handle-ml > *{
  border-left: 1px solid #fff;
}

.handle-mr > * {
  border-right: 1px solid rgb(63, 206, 242);
}

.handle-bc > * {
  border-bottom: 1px solid rgb(63, 206, 242);
}

.handle-bl > * {
  border-bottom-left-radius: 5px;
  border-bottom: 1px solid rgb(63, 206, 242);
  border-left: 1px solid #fff;
}

.handle-br > * {
  border-bottom-right-radius: 5px;
  border-bottom: 1px solid rgb(63, 206, 242);
  border-right: 1px solid rgb(63, 206, 242);
}

.handle-tr {
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  border-top-right-radius: 5px;
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
}

.handle-ml {
  border-left: 1px solid #000;
  height: calc(100% - 4px);
  top: 2px;
  left: -5px;
  cursor: ew-resize;
}

.handle-mr {
  border-right: 1px solid #000;
  height: calc(100% - 4px);
  top: 2px;
  right: -5px;
  cursor: ew-resize;
}

.handle-bl {
  border-left: 1px solid #000;
  border-bottom: 1px solid #000;
  border-bottom-left-radius: 5px;
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}

.handle-bc {
  width: calc(100% - 4px);
  left: 2px;
  bottom: -5px;
  border-bottom: 1px solid #000;
  cursor: ns-resize;
}

.handle-br {
  right: -5px;
  bottom: -5px;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  border-bottom-right-radius: 5px;
  cursor: nwse-resize;
}

.maxed {
  position: absolute;
  width: 100%;
  height: 100%;
}

.maxed > .handle {
    display: none;
}

.title-bar-icon {
    color: red;
    border: 1px solid rgba(0,0,0,0.4);
    border-radius: 3px;
    align-self: center;
}

.title-bar-icon:hover {
    background-color: #36a9fb;
}
</style>