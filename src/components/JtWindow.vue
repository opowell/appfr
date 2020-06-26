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
export default {
  name: 'JtWindow',
  props: {
    window: {
      type: Object,
      default: function() {
        return {
          w: 300,
          h: 200,
          x: 100,
          y: 100,
        }
      }
    },
    state: {
      type: Object,
      required: true
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
      left: this.window.x,
      top: this.window.y,
      width: this.window.w,
      height: this.window.h,

      resizeStartX: null,
      resizeStartY: null,
      moveStartX: null,
      moveStartY: null,

      resizeFn: null,
    };
  },
  computed: {
    parentWidth() {
      if (this.$el == null) {
        return 0;
      }
      return this.$el.parentElement.clientWidth;
    },
    parentHeight() {
      if (this.$el == null) {
        return 0;
      }
      return this.$el.parentElement.clientHeight;
    },
    isActive() {
      return !this.isMaximized || this === this.state.activeWindow;
    },
    isFocussed() {
      return this === this.state.activeWindow;
    },
		isMaximized() {
			return this.state.windowsMaximized;
		},
		zIndex() {
			const windows = this.state.windows;
			for (let i in windows) {
				if (windows[i] === this) {
					return i;
				}
			}
			return -1;
		},
    style() {
      let out = {
        zIndex: this.zIndex,
      }
      if (!this.isMaximized) {
        out.top = this.top + 'px';
        out.left = this.left + 'px';
        out.width = this.width + 'px';
        out.height = this.height + 'px';
      }
      return out;
    }
  },
  watch: {
    window: function(oldVal, newVal) {
      this.left = newVal.x;
      this.top = newVal.y;
      this.width = newVal.w;
      this.height = newVal.h;
    },
  },
  methods: {
    focus() {
      this.state.activeWindow = this
      let index = this.state.windows.indexOf(this)
      if (index < 0) return
      this.state.windows.splice(index, 1)
      this.state.windows.push(this)
    },
    click(ev) {
      this.focus();
      this.startMove(ev);
    },
    startMove(ev) {
      if (this.isMaximized) {
        return;
      }
      document.documentElement.addEventListener('mousemove', this.move);
      document.documentElement.addEventListener('mouseup', this.stopMove);
      this.moveStartX = ev.pageX;
      this.moveStartY = ev.pageY;
      this.origTop = this.top;
      this.origLeft = this.left;
    },
    getConstrainedLeft(x, w) {
      w = w || this.width
      x = Math.max(x, this.minLeft);
      x = Math.min(x, this.parentWidth - w);
      return x;
    },
    getConstrainedWidth(w, x) {
      x = x || this.left
      w = Math.max(w, this.minWidth);
      w = Math.min(w, this.parentWidth - x);
      return w;
    },
    getConstrainedTop(x) {
      x = Math.max(x, this.minTop);
      x = Math.min(x, this.parentHeight - this.height);
      return x;
    },
    move(ev) {
      let newLeft = this.origLeft + ev.pageX - this.moveStartX;
      this.left = this.getConstrainedLeft(newLeft);

      let newTop = this.origTop + ev.pageY - this.moveStartY;
      this.top = this.getConstrainedTop(newTop);
    },
    stopMove() {
      document.documentElement.removeEventListener('mousemove', this.move);
      document.documentElement.removeEventListener('mouseup', this.stopMove);
      this.$emit('saveWindowInfo', this);
    },

    startResizeTL(ev) {
      this.addMouseListeners(this.resizeTL);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origTop = this.top;
      this.origLeft = this.left;
      this.origWidth = this.width;
      this.origHeight = this.height;
    },
    // Resize methods need to be as fast as possible to prevent lag.
    resizeTL(ev) {
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth - deltaX >= this.minWidth) {
        this.left = this.origLeft + deltaX;
        this.width = this.origWidth - deltaX;
      }
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight - deltaY >= this.minHeight) {
        this.top = this.origTop + deltaY;
        this.height = this.origHeight - deltaY;
      }
    },

    startResizeT(ev) {
      this.addMouseListeners(this.resizeT);
      this.resizeStartY = ev.pageY;
      this.origTop = this.top;
      this.origHeight = this.height;
    },
    resizeT(ev) {
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight - deltaY >= this.minHeight) {
        this.top = this.origTop + deltaY;
        this.height = this.origHeight - deltaY;
      }
    },

    startResizeTR(ev) {
      this.addMouseListeners(this.resizeTR);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origTop = this.top;
      this.origLeft = this.left;
      this.origWidth = this.width;
      this.origHeight = this.height;
    },
    resizeTR(ev) {
      // Resize RIGHT
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth + deltaX >= this.minWidth) {
        this.width = this.origWidth + deltaX;
      }
      // Resize top
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight - deltaY >= this.minHeight) {
        this.top = this.origTop + deltaY;
        this.height = this.origHeight - deltaY;
      }
    },

    startResizeL(ev) {
      this.addMouseListeners(this.resizeL);
      this.resizeStartX = ev.pageX;
      this.origLeft = this.left;
      this.origWidth = this.width;
    },
    resizeL(ev) {
      const deltaX = ev.pageX - this.resizeStartX;
      let newLeft = this.origLeft + deltaX;
      newLeft = Math.max(this.minLeft, newLeft);
      let newWidth = this.origWidth + (this.origLeft - newLeft);
      this.width = Math.max(this.minWidth, newWidth)
      this.left = this.origLeft - (this.width - this.origWidth);
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
      this.origLeft = this.left;
      this.origWidth = this.width;
    },
    resizeR(ev) {
      const deltaX = ev.pageX - this.resizeStartX;
      let newWidth = this.origWidth + deltaX;
      newWidth = Math.min(newWidth, this.parentWidth - this.origLeft);
      this.width = Math.max(this.minWidth, newWidth)
      // const deltaX = ev.pageX - this.resizeStartX;
      // if (this.origWidth + deltaX >= this.minWidth) {
      //   this.width = this.origWidth + deltaX;
      // }
    },

    startResizeBL(ev) {
      this.addMouseListeners(this.resizeBL);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origLeft = this.left;
      this.origWidth = this.width;
      this.origHeight = this.height;
    },
    resizeBL(ev) {
      // LEFT
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth - deltaX >= this.minWidth) {
        this.left = this.origLeft + deltaX;
        this.width = this.origWidth - deltaX;
      }
      // BOTTOM
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight + deltaY >= this.minHeight) {
        this.height = this.origHeight + deltaY;
      }
    },

    startResizeB(ev) {
      this.addMouseListeners(this.resizeB);
      this.resizeStartY = ev.pageY;
      this.origHeight = this.height;
    },
    resizeB(ev) {
      // BOTTOM
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight + deltaY >= this.minHeight) {
        this.height = this.origHeight + deltaY;
      }
    },

    startResizeBR(ev) {
      this.addMouseListeners(this.resizeBR);
      this.resizeStartX = ev.pageX;
      this.resizeStartY = ev.pageY;
      this.origWidth = this.width;
      this.origHeight = this.height;
    },
    resizeBR(ev) {
      // RIGHT
      const deltaX = ev.pageX - this.resizeStartX;
      if (this.origWidth + deltaX >= this.minWidth) {
        this.width = this.origWidth + deltaX;
      }
      // BOTTOM
      const deltaY = ev.pageY - this.resizeStartY;
      if (this.origHeight + deltaY >= this.minHeight) {
        this.height = this.origHeight + deltaY;
      }
    },
  },
  mounted() {
    this.$emit('addWindow', this);
    this.state.windows.push(this);
    this.state.activeWindow = this
  },
};

</script>

<style scoped>
.window {
  position: absolute;
}

.handle {
  background-color: inherit;
  border-style: outset;
  border-width: 0px;
  margin: 0px;
  display: flex;
  width: 7px;
  height: 7px;
  border-color: #dae1e7;
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