<template>
  <div v-if='menu === "divider"' class="divider" />
  <div v-else style="display: flex" :class="classObj">
    <span
      ref='children'
      class="menu label"
      @mousedown.prevent.stop.left
      @click.stop.left
      @mouseup.prevent.stop.left='click'
      @mouseover.stop='hover'
      @mouseleave.stop="blur"
      @dblclick.left="callDblclickFunc"
      :class='{
        active: isActive,
        disabled: isDisabled,
        open: isOpen,
      }'
      :title='title'
    >
      <div v-if='menu && menu.text' class='text text-first'>{{firstLetter}}</div>
      <div v-if='menu && menu.text' class='text text-rest'>{{rest}}</div>
      <div v-if='showArrow' class="arrow">&gt;</div>
    </span>
    <span
      class="menu children"
      @mouseover.stop='hover'
      :class='{
        active: isActive,
        open: isOpen,
      }'
    >
      <div v-if='hasChildren' 
        class="dropdown"
        :class='{ open: isOpen, submenu: isSubMenu}'
      >
        <menu-el
          v-for="item in menu.children"
          :menu-prop='item'
          :parent-menu='menu'
          :key='item.id'
        />
      </div>
    </span>
  </div>

</template>

<script>
import Menu from '../models/Menu.ts'

export default {
  name: 'MenuEl',
  props: {
    menuProp: {
      type: Object,
      default: () => {}
    },
    parentMenu: {
      type: Menu,
      default: () => undefined
    },
    dblclickFunc: {}
  },
  data() {
    let menu = this.menuProp
    if (menu && menu.class !== 'parsed')
      menu = new Menu(this.menuProp, this.parentMenu)
    return {
      menu
    }
  },
  computed: {
    isOpen() {
      if (!this.menu) return false
      return this.menu.open
    },
    title() {
      if (!this.menu) return ''
      return this.menu.title
    },
    ref() {
      return (this.menu && this.menu.ref) ? this.menu.ref : 'menu'
    },
    hasChildren() {
      return this.menu && this.menu.children && this.menu.children.length
    },
    showArrow() {
      return this.hasChildren && !this.openDown
    },
    isActive() {
      if (!this.menu) return false
      return true
    },
    isDisabled() {
      if (!this.menu) return false
      return Boolean(this.menu.disabled)
    },
    firstLetter() {
      if (!this.menu.text) return ''
      return this.menu.text.substring(0, 1)
    },
    rest() {
      if (!this.menu.text) return ''
      return this.menu.text.substring(1)
    },
    classObj() {
      return {
        openDown: this.openDown,
        openRight: !this.openDown
      }
    },
    isSubMenu() {
      return !!this.parentMenu
    },
    openDown() {
      if (!this.menu) return false
      return this.menu.openDown || !this.parentMenu 
    }
  },
  mounted() {
    const self = this
    if (this.menu && !this.menu.parentMenu) {
      window.addEventListener("click", function(event) {
        self.menu.setOpen(false)
      })
    }
    if (this.menu)
      window.addEventListener("closeMenus", function(event) {
        self.menu.setOpen(false)
      })
  },
  methods: {
    callDblclickFunc() {
      if (this.dblclickFunc != null) {
        this.dblclickFunc()
      }
    },
    click(ev) {
      if (this.menu.disabled) return
      const newState = !this.menu.open
      window.dispatchEvent(new CustomEvent('closeMenus'))
      this.menu.setOpen(newState)
    },
    blur(ev) {
      // console.log(ev, this.ref, this.$refs[this.ref], ev.target, this.$refs[this.ref].contains(ev.toElement))
      if (this.$refs[this.ref]) {
        if (this.$refs[this.ref].contains(ev.toElement)) return
      }
      this.menu.blur()
    },
    hover() {
      this.menu.hover()
    },
  },
}
</script>

<style scoped>

.openDown {
  flex-direction: column;
}

.openRight {
  flex-direction: row;
}

.openRight .submenu {
  top: -4px;
}

.icon {
  padding: 0.5rem;
  cursor: default;
}
.divider {
  border-bottom: 1px solid;
  color: #888;
  margin: 2px 0px;
}

.shortcut-spacer {
  min-width: 3rem;
  flex: 1 1 auto;
}

.shortcut {
  padding: var(--menuTextPadding);
  margin-left: 6px;
}

.menu.label {
  padding: 2px 5px;
  flex: 1 1 auto;
}

.arrow {
  width: 20px;
  position: relative;
  padding-left: 3px;
  padding-right: 3px;
  text-align: center;
}
/* .icon:hover {
  background-color: #EEE
} */
.menu.open {
  box-shadow: none;
  outline: none;
  background-color: rgb(0, 122, 255);
}

.active {
  color: black;
}

.label.open {
  color: #fff;
}

.dropdown.open {
  display: flex;
  flex-direction: column;
  width: max-content;
  z-index: 1;
}

.dropdown > .menu {
  /* width: max-content */
  max-width: 20rem;
  width: 100%;
}

.menubar-focussed .text-first {
    text-decoration: underline;
}

.menu {
    display: flex;
    position: relative;
    border-width: 1px;
    border-color: transparent;
    border-style: solid;
}

.text {
    cursor: default;
    border-radius: 0px;
    outline: none;
    box-shadow: none;
    padding: var(--menuTextPadding);
}

.text-first {
  flex: 0 0 auto;
  padding-right: 0px;
}

.menu.children {
  border: 0;
}

.text-rest {
  flex: 1 1 auto;
  padding-left: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.dropdown {
  display: none;
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: #f0f0f0;
  position: absolute;
  min-width: 10rem;
  border: 1px solid rgba(0,0,0,.15);
}

.focussed {
    box-shadow: none;
    background-color: rgba(0, 123, 255, 0.25);
    border-color: rgba(0, 123, 255, 0.50);
}

.focussed:hover {
    background-color: rgba(0, 123, 255, 0.25);
    border-color: rgba(0, 123, 255, 0.50);
}

.disabled {
    color: rgba(99, 108, 114, 0.5) !important;
    cursor: default !important;
}

.dropdown .disabled:hover {
    background-color: inherit;
}

</style>
