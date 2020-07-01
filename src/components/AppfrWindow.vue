<template>
  <div
    class="window"
    @mousedown="click"
    :class='{"focussed": isFocussed, "maxed": isMaximized, "active": isActive}'
    :style="style"
  >
    <slot name="body" />
    <span class="handle handle-tl" @mousedown.prevent.stop="startResizeTL">
      <span />
    </span>
    <span class="handle handle-tc" @mousedown.prevent.stop="startResizeT">
      <span />
    </span>
    <span class="handle handle-tr" @mousedown.prevent.stop="startResizeTR">
      <span />
    </span>
    <span class="handle handle-ml" @mousedown.prevent.stop="startResizeL">
      <span />
    </span>
    <span class="handle handle-mr" @mousedown.prevent.stop="startResizeR">
      <span />
    </span>
    <span class="handle handle-bl" @mousedown.prevent.stop="startResizeBL">
      <span />
    </span>
    <span class="handle handle-bc" @mousedown.prevent.stop="startResizeB">
      <span />
    </span>
    <span class="handle handle-br" @mousedown.prevent.stop="startResizeBR">
      <span />
    </span>
  </div>
</template>
<script>

import Vue from 'vue';

export default {
  name: 'AppfrWindow',
  props: {
    window: {
      type: Object,
      default: function() {
        return {
          w: null,
          h: null,
          x: null,
          y: null,
        }
      }
    },
    state: {
      type: Object,
      default: function() {
        return {
          windows: [],
          activeWindow: null
        }
      }
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
    }
  },
  data() {
    return {
      resizeStartX: null,
      resizeStartY: null,
      moveStartX: null,
      moveStartY: null,
      resizeFn: null,
    };
  },
  computed: {
    parentElement() {
      if (this.$el == null) {
        return null;
      }
      return this.$el.parentElement;
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
    isActive() {
      return !this.isMaximized || this.window === this.state.activeWindow;
    },
    isFocussed() {
      return this.window === this.state.activeWindow;
    },
		isMaximized() {
			return this.state.windowsMaximized;
    },
    stateWindows() {
      this.state.windows = this.state.windows || []
      return this.state.windows
    },
		zIndex() {
			const windows = this.stateWindows;
			for (let i in windows) {
				if (windows[i] === this.window) {
					return (i - 0) + 1;
				}
			}
			return 0;
		},
    style() {
      let out = {
        zIndex: this.zIndex,
      }
      if (!this.isMaximized) {
        out.top = this.window.y + 'px';
        out.left = this.window.x + 'px';
        out.width = this.window.w + 'px';
        out.height = this.window.h + 'px';
      }
      return out;
    }
  },
  methods: {
    close() {
      let index = this.stateWindows.indexOf(this.window)
      if (index < 0) return
      this.stateWindows.splice(index, 1)
    },
    focus() {
      this.state.activeWindow = this.window
      this.close();
      this.stateWindows.push(this.window);
    },
    click(ev) {
      this.focus();
      console.log('click ' + this.window.title, ev)
      this.startMove(ev);
    },
    startMove(ev) {
      console.log('startMove ' + this.window.title, ev)
      if (this.isMaximized) {
        return;
      }
      document.documentElement.addEventListener('mousemove', this.move);
      document.documentElement.addEventListener('mouseup', this.stopMove);
      this.moveStartX = ev.pageX;
      this.moveStartY = ev.pageY;
      this.origTop = this.window.y;
      this.origLeft = this.window.x;
    },
    getConstrainedLeft(x, w) {
      w = w || this.window.w
      x = Math.max(x, this.minLeft);
      x = Math.min(x, this.parentWidth - w - 18);
      return x;
    },
    getConstrainedWidth(w, x) {
      x = x || this.window.x
      w = Math.max(w, this.minWidth);
      w = Math.min(w, this.parentWidth - x - 18);
      return w;
    },
    getConstrainedTop(x) {
      x = Math.max(x, this.minTop);
      x = Math.min(x, this.parentHeight - this.window.h - 18);
      return x;
    },
    move(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      let newLeft = this.origLeft + ev.pageX - this.moveStartX;
      this.window.x = this.getConstrainedLeft(newLeft);

      let newTop = this.origTop + ev.pageY - this.moveStartY;
      this.window.y = this.getConstrainedTop(newTop);
    },
    stopMove(ev) {
      document.documentElement.removeEventListener('mousemove', this.move);
      document.documentElement.removeEventListener('mouseup', this.stopMove);
      this.$emit('saveWindowInfo', this);
    },

    startResizeTL(ev) {
      this.addMouseListeners(this.resizeTL);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origTop = this.window.y;
      this.origLeft = this.window.x;
      this.origWidth = this.window.w;
      this.origHeight = this.window.h;
    },
    // Resize methods need to be as fast as possible to prevent lag.
    resizeTL(ev) {
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth - deltaX >= this.minWidth) {
        this.window.x = this.origLeft + deltaX;
        this.window.w = this.origWidth - deltaX;
      }
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight - deltaY >= this.minHeight) {
        this.window.y = this.origTop + deltaY;
        this.window.h = this.origHeight - deltaY;
      }
    },

    startResizeT(ev) {
      this.addMouseListeners(this.resizeT);
      this.resizeStartY = ev.pageY;
      this.origTop = this.window.y;
      this.origHeight = this.window.h;
    },
    resizeT(ev) {
      const deltaY = ev.pageY - this.resizeStartY;
      let newTop = this.origTop + deltaY;
      newTop = Math.max(this.minTop, newTop);
      let newHeight = this.origHeight + (this.origTop - newTop);
      this.window.h = Math.max(this.minHeight, newHeight)
      this.window.y = this.origTop - (this.window.h - this.origHeight);
    },

    startResizeTR(ev) {
      this.addMouseListeners(this.resizeTR);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origTop = this.window.y;
      this.origLeft = this.window.x;
      this.origWidth = this.window.w;
      this.origHeight = this.window.h;
    },
    resizeTR(ev) {
      // Resize RIGHT
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth + deltaX >= this.minWidth) {
        this.window.w = this.origWidth + deltaX;
      }
      // Resize top
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight - deltaY >= this.minHeight) {
        this.window.y = this.origTop + deltaY;
        this.window.h = this.origHeight - deltaY;
      }
    },

    startResizeL(ev) {
      this.addMouseListeners(this.resizeL);
      this.resizeStartX = ev.pageX;
      this.origLeft = this.window.x;
      this.origWidth = this.window.w;
    },
    resizeL(ev) {
      const deltaX = ev.pageX - this.resizeStartX;
      let newLeft = this.origLeft + deltaX;
      newLeft = Math.max(this.minLeft, newLeft);
      let newWidth = this.origWidth + (this.origLeft - newLeft);
      this.window.w = Math.max(this.minWidth, newWidth)
      this.window.x = this.origLeft - (this.window.w - this.origWidth);
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
      this.origWidth = this.window.w;
    },
    resizeR(ev) {
      const deltaX = ev.pageX - this.resizeStartX;
      let newWidth = this.origWidth + deltaX;
      newWidth = Math.min(newWidth, this.parentWidth - this.window.x - 18);
      this.window.w = Math.max(this.minWidth, newWidth)
    },

    startResizeBL(ev) {
      this.addMouseListeners(this.resizeBL);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origLeft = this.window.x;
      this.origWidth = this.window.w;
      this.origHeight = this.window.h;
    },
    resizeBL(ev) {
      // LEFT
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth - deltaX >= this.minWidth) {
        this.window.x = this.origLeft + deltaX;
        this.window.w = this.origWidth - deltaX;
      }
      // BOTTOM
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight + deltaY >= this.minHeight) {
        this.window.h = this.origHeight + deltaY;
      }
    },

    startResizeB(ev) {
      this.addMouseListeners(this.resizeB);
      this.resizeStartY = ev.pageY;
      this.origHeight = this.window.h;
    },
    resizeB(ev) {
      const deltaY = ev.pageY - this.resizeStartY;
      let newHeight = this.origHeight + deltaY;
      newHeight = Math.min(newHeight, this.parentHeight - this.window.y);
      this.window.h = Math.max(this.minHeight, newHeight)
    },

    startResizeBR(ev) {
      this.addMouseListeners(this.resizeBR);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origWidth = this.window.w;
      this.origHeight = this.window.h;
    },
    resizeBR(ev) {
      // RIGHT
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth + deltaX >= this.minWidth) {
        this.window.w = this.origWidth + deltaX;
      }
      // BOTTOM
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight + deltaY >= this.minHeight) {
        this.window.h = this.origHeight + deltaY;
      }
    },
  },
  mounted() {
    this.state.newWindow = this.state.newWindow || {}
    let newWindow = this.state.newWindow

    newWindow.offset = newWindow.offset || 40;
    newWindow.leftOffset = newWindow.leftOffset || newWindow.offset;
    newWindow.topOffset = newWindow.topOffset || newWindow.offset;
    newWindow.width = newWindow.width || 300;
    newWindow.height = newWindow.height || 200;

    this.window = this.window || {}

    let index = this.state.windows.indexOf(this.window);
    if (index < 0) {
      this.state.windows.push(this.window)
      index = this.state.windows.length - 1
    }

    if (!this.window.x) Vue.set(this.window, 'x', Math.max(this.minLeft, index * newWindow.leftOffset))
    if (!this.window.y) Vue.set(this.window, 'y', Math.max(this.minTop, index * newWindow.topOffset))
    if (!this.window.w) Vue.set(this.window, 'w', newWindow.width)
    if (!this.window.h) Vue.set(this.window, 'h', newWindow.height)

    this.state.activeWindow = this.window;

    this.window.component = this;

this.$emit('addWindow', this);
  },
};

</script>

<style scoped>
.window {
  position: absolute;
  padding: 5px;
  display: flex;
  flex-direction: column;
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
</style>