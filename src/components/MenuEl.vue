<template>
  <div v-if='menu === "divider"' class="divider" />
  <span
    v-else :ref='ref'
    class="menu"
    @mousedown.prevent.stop.left
    @click.stop.left
    @mouseup.prevent.stop.left='click'
    @mouseover='hover'
    @mouseleave="blur"
    @dblclick.left="callDblclickFunc"
    :class='{
       active: menu.isActive !== false,
       disabled: isDisabled,
       open: isOpen,
    }'
    :title='menu.title'
    @blur='blur'
  >
    <div v-show='menu.template != null' v-html="menu.template" />
    <div v-show='menu.text' class='text text-first'>{{firstLetter}}</div>
    <div v-show='menu.text' class='text text-rest'>{{rest}}</div>
    <div v-show='showArrow' class="arrow">&gt;</div>
    <div v-show='menu.children' class="dropdown" :class='{ open: isOpen, submenu: isSubMenu}'>
      <menu-el
        v-for="item in menu.children"
        :menu-prop='item'
        :parent-menu='menu'
        :key='item.id'
        @open="openChild(item)"
      />
    </div>
  </span>
</template>

<script>
import MenuElement from '../models/MenuElement'

export default {
  name: 'MenuEl',
  props: {
    menuProp: {
      type: Object,
      required: true
    },
    parentMenu: {
      type: MenuElement,
      default: () => null
    },
    dblclickFunc: {},
  },
  data() {
    let menu = this.menuProp
    if (menu.constructor.name !== MenuElement.name)
      menu = new MenuElement(this.menuProp, this.parentMenu)
    return {
      menu
    }
  },
  computed: {
    isOpen() {
      return this.menu.open
    },
    ref() {
      return this.menu ? this.menu.ref : null
    },
    hasChildren() {
      return this.menu.children != null && this.menu.children.length > 0
    },
    showArrow() {
      return this.parentMenu && this.hasChildren
    },
    isActive() {
      if (!this.rootPanel) return false
      return this.rootPanel.activeMenu === this.menu
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
    isSubMenu() {
      return this.parentMenu
    }
  },
  methods: {
    callDblclickFunc() {
      if (this.dblclickFunc != null) {
        this.dblclickFunc()
      }
    },
    openChild() {},
    click(ev) {
      this.menu.click(ev)
    },
    blur() {
      this.menu.open = false
    },
    hover() {
      this.menu.hover()
    },
  },
}
</script>

<style scoped>
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
}
.active {
  color: black;
}
.dropdown {
  z-index: 1000;
}
.dropdown.open {
  display: flex;
  flex-direction: column;
  width: max-content;
}

.dropdown.submenu {
  top: 0;
  left: 100%;
}

.dropdown .menu:hover {
  background-color: rgba(0,123,255,.25);
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

.text-rest {
  flex: 1 1 auto;
  padding-left: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.dropdown {
  display: none;
  margin: 0px;
  padding: 3px;
  transform: translate3d(0px, 0px, 0px) !important;
  border-radius: 0px;
  box-shadow: 1px 1px 1px 1px #00000057;
  background-color: hsla(0, 0%, 97%, 1);
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 10rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-clip: padding-box;
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
