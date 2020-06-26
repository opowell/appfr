<template>
  <div
    class="window"
    @mousedown="click"
    :class='{"focussed": isFocussed, "maxed": isMaximized, "active": isActive}'
    :style="style"
    @dblclick='toggleMaximized'
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
    toggleMaximized() {
      this.state.windowsMaximized = !this.state.windowsMaximized;
    },
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
      this.moveStartX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      this.moveStartY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      this.origTop = this.top;
      this.origLeft = this.left;

      console.log('start move from ' + this.left + ', ' + this.top);
    },
    move(ev) {
      const pageX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      let newLeft = this.origLeft + pageX - this.moveStartX;
      newLeft = Math.max(newLeft, this.minLeft);
      newLeft = Math.min(newLeft, this.parentWidth - this.width);
      this.left = newLeft;

      const pageY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      let newTop = this.origTop + pageY - this.moveStartY;
      newTop = Math.max(newTop, this.minTop);
      newTop = Math.min(newTop, this.parentHeight - this.height);
      this.top = newTop;

      // console.log('move to ' + newLeft + ', ' + newTop);
    },
    stopMove() {
      document.documentElement.removeEventListener('mousemove', this.move);
      document.documentElement.removeEventListener('mouseup', this.stopMove);
      this.$emit('saveWindowInfo', this);
    },

    startResizeTL(ev) {
      document.documentElement.addEventListener('mousemove', this.resizeTL);
      document.documentElement.addEventListener('mouseup', this.stopResizeTL);
      this.resizeStartX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      this.resizeStartY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      this.origTop = this.top;
      this.origLeft = this.left;
      this.origWidth = this.width;
      this.origHeight = this.height;
    },
    // This method needs to be as fast as possible to prevent lag.
    resizeTL(ev) {
      const pageX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      const deltaX = pageX - this.resizeStartX;
      if (this.origWidth - deltaX >= this.minWidth) {
        this.left = this.origLeft + deltaX;
        this.width = this.origWidth - deltaX;
      }
      const pageY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      const deltaY = pageY - this.resizeStartY;
      if (this.origHeight - deltaY >= this.minHeight) {
        this.top = this.origTop + deltaY;
        this.height = this.origHeight - deltaY;
      }
    },
    stopResizeTL() {
      this.removeMouseListeners(this.resizeTL, this.stopResizeTL);
    },

    startResizeT(ev) {
      this.addMouseListeners(this.resizeT, this.stopResizeT);
      this.resizeStartY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      this.origTop = this.top;
      this.origHeight = this.height;
    },
    resizeT(ev) {
      const pageY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      const deltaY = pageY - this.resizeStartY;
      if (this.origHeight - deltaY >= this.minHeight) {
        this.top = this.origTop + deltaY;
        this.height = this.origHeight - deltaY;
      }
    },
    stopResizeT() {
      document.documentElement.removeEventListener('mousemove', this.resizeT);
      document.documentElement.removeEventListener('mouseup', this.stopResizeT);
      this.$emit('saveWindowInfo', this);
    },

    startResizeTR(ev) {
      document.documentElement.addEventListener('mousemove', this.resizeTR);
      document.documentElement.addEventListener('mouseup', this.stopResizeTR);
      this.resizeStartX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      this.resizeStartY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      this.origTop = this.top;
      this.origLeft = this.left;
      this.origWidth = this.width;
      this.origHeight = this.height;
    },
    resizeTR(ev) {
      // Resize top
      const pageX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      const deltaX = pageX - this.resizeStartX;
      if (this.origWidth + deltaX >= this.minWidth) {
        this.width = this.origWidth + deltaX;
      }
      // Resize RIGHT
      const pageY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      const deltaY = pageY - this.resizeStartY;
      if (this.origHeight - deltaY >= this.minHeight) {
        this.top = this.origTop + deltaY;
        this.height = this.origHeight - deltaY;
      }
    },
    stopResizeTR() {
      this.removeMouseListeners(this.resizeTR, this.stopResizeTR);
    },

    startResizeL(ev) {
      document.documentElement.addEventListener('mousemove', this.resizeL);
      document.documentElement.addEventListener('mouseup', this.stopResizeL);
      this.resizeStartX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      this.origLeft = this.left;
      this.origWidth = this.width;
    },
    resizeL(ev) {
      const pageX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      const deltaX = pageX - this.resizeStartX;
      if (this.origWidth - deltaX >= this.minWidth) {
        this.left = this.origLeft + deltaX;
        this.width = this.origWidth - deltaX;
      }
    },
    stopResizeL() {
      this.removeMouseListeners(this.resizeL, this.stopResizeL)
    },

    removeMouseListeners(resizeFn, stopResizeFn) {
      document.documentElement.removeEventListener('mousemove', resizeFn);
      document.documentElement.removeEventListener('mouseup', stopResizeFn);
      this.$emit('saveWindowInfo', this);
    },

    addMouseListeners(resizeFn, stopResizeFn) {
      document.documentElement.addEventListener('mousemove', resizeFn);
      document.documentElement.addEventListener('mouseup', stopResizeFn);
    },

    startResizeR(ev) {
      this.addMouseListeners(this.resizeR, this.stopResizeR);
      this.resizeStartX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      this.origLeft = this.left;
      this.origWidth = this.width;
    },
    resizeR(ev) {
      const pageX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      const deltaX = pageX - this.resizeStartX;
      if (this.origWidth + deltaX >= this.minWidth) {
        this.width = this.origWidth + deltaX;
      }
    },
    stopResizeR() {
      this.removeMouseListeners(this.resizeR, this.stopResizeR);
    },

    startResizeBL(ev) {
      this.addMouseListeners(this.resizeBL, this.stopResizeBL);
      this.resizeStartX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      this.resizeStartY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      this.origLeft = this.left;
      this.origWidth = this.width;
      this.origHeight = this.height;
    },
    resizeBL(ev) {
      // LEFT
      const pageX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      const deltaX = pageX - this.resizeStartX;
      if (this.origWidth - deltaX >= this.minWidth) {
        this.left = this.origLeft + deltaX;
        this.width = this.origWidth - deltaX;
      }
      // BOTTOM
      const pageY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      const deltaY = pageY - this.resizeStartY;
      if (this.origHeight + deltaY >= this.minHeight) {
        this.height = this.origHeight + deltaY;
      }
    },
    stopResizeBL() {
      this.removeMouseListeners(this.resizeBL, this.stopResizeBL);
    },

    startResizeB(ev) {
      this.addMouseListeners(this.resizeB, this.stopResizeB);
      this.resizeStartY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      this.origHeight = this.height;
    },
    resizeB(ev) {
      // BOTTOM
      const pageY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      const deltaY = pageY - this.resizeStartY;
      if (this.origHeight + deltaY >= this.minHeight) {
        this.height = this.origHeight + deltaY;
      }
    },
    stopResizeB() {
      this.removeMouseListeners(this.resizeB, this.stopResizeB);
    },

    startResizeBR(ev) {
      this.addMouseListeners(this.resizeBR, this.stopResizeBR);
      this.resizeStartX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      this.resizeStartY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      this.origWidth = this.width;
      this.origHeight = this.height;
    },
    resizeBR(ev) {
      // RIGHT
      const pageX =
        typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX;
      const deltaX = pageX - this.resizeStartX;
      if (this.origWidth + deltaX >= this.minWidth) {
        this.width = this.origWidth + deltaX;
      }
      // BOTTOM
      const pageY =
        typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY;
      const deltaY = pageY - this.resizeStartY;
      if (this.origHeight + deltaY >= this.minHeight) {
        this.height = this.origHeight + deltaY;
      }
    },
    stopResizeBR() {
      this.removeMouseListeners(this.resizeBR, this.stopResizeBR);
    }
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