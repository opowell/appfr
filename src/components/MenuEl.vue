<template>
  <div v-if='menu === "divider"' class="divider" />
  <span
    v-else :ref='ref'
    class="menu"
    @mousedown.prevent.stop.left
    @click.stop.left
    @mouseup.prevent.stop.left='click'
    @mouseover='hover'
    @dblclick.left="callDblclickFunc"
    :class='{
       active: menu.isActive !== false,
       disabled: isDisabled,
       open: isOpen,
    }'
    :title='menu.title'
    @blur='closeMenu'
  >
    <div v-show='menu.template != null' v-html="menu.template" />
    <!-- <i v-show='menu.icon || showIcon' :class='"icon fas fa-align-center"'></i> -->
    <template v-if='menu.icon'>
      <div class='icon'>
        <font-awesome-icon :icon="menu.icon"/>
        </div>
    </template>
    <!-- For spacing purposes -->
    <template v-else-if='showIcon'>
      <i class='icon' />
    </template>
    <div v-show='menu.text' class='text text-first'>{{firstLetter}}</div>
    <div v-show='menu.text' class='text text-rest'>{{rest}}</div>
    <!-- <div v-show="hasParent" class="shortcut-spacer"/> -->
    <div v-show="hasParent" class="shortcut">{{menu.shortcut}}</div>
    <div v-show='showArrow' class="arrow">&lt;</div>
    <div v-show='menu.children' class="dropdown" :class='{ open: isOpen}'>
      <menu-el
        v-for="item in menu.children"
        :menu='item'
        :showIcon='menu.showIcon'
        :key='item.id'
        :rootPanel='rootPanel'
      />
    </div>
  </span>
</template>

<script>
import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {faAlignCenter}          from '@fortawesome/free-solid-svg-icons/faAlignCenter'
import {faTimes}                from '@fortawesome/free-solid-svg-icons/faTimes'
import {faWindowClose}          from '@fortawesome/free-regular-svg-icons/faWindowClose'
import {faWindowMinimize}       from '@fortawesome/free-regular-svg-icons/faWindowMinimize'
import {faWindowRestore}        from '@fortawesome/free-regular-svg-icons/faWindowRestore'

library.add(
  faAlignCenter,
  faTimes,
  faWindowClose,
  faWindowMinimize,
  faWindowRestore,
)

export default {
  name: 'MenuEl',
  components: {
    FontAwesomeIcon
  },
  props: {
    menu: {
      type: [Object, String],
      default: {}
    },
    showIcon: {},
    dblclickFunc: {},
    enabled: {
      default: true,
    },
    disabled: {
      default: false,
    },
    rootPanel: {}
  },
  computed: {
    ref() {
      return this.menu ? this.menu.ref : null;
    },
    hasParent() {
      return this.menu.hasParent == null ? true : this.menu.hasParent;
    },
    hasChildren() {
      return this.menu.children != null && this.menu.children.length > 0;
    },
    showArrow() {
      return this.hasParent && this.hasChildren;
    },
    isActive() {
      if (!this.rootPanel) return false;
      return this.rootPanel.activeMenu === this.menu;
    },
    isDisabled() {
      if (!this.menu) {
        return false;
      }
      return Boolean(this.menu.disabled);
    },
    isOpen() {
      if (!this.rootPanel) return false;
      return this.rootPanel.isMenuOpen && this.isActive;
    },
    firstLetter() {
      if (this.menu.text == null) {
        return '';
      }
      return this.menu.text.substring(0, 1);
    },
    rest() {
      if (this.menu.text == null) {
        return '';
      }
      return this.menu.text.substring(1);
    },
  },
  methods: {
    callDblclickFunc() {
      if (this.dblclickFunc != null) {
        this.dblclickFunc();
      }
    },
    click(ev) {
      if (this.isDisabled) {
        return;
      }
      if (this.menu.action) {
        this.menu.action(this.menu.clickData, ev);
        if (!this.rootPanel) return;
        Vue.set(this.rootPanel, 'isMenuOpen', false);
      } else {
        if (!this.rootPanel) return;
        Vue.set(this.rootPanel, 'activeMenu', this.menu);
        Vue.set(this.rootPanel, 'isMenuOpen', !this.rootPanel.isMenuOpen);
      }
    },
    closeMenu() {
      this.rootPanel.isMenuOpen = false;
    },
    hover() {
      if (this.isDisabled) {
        return;
      }
      if (this.rootPanel == null) return;
      Vue.set(this.rootPanel, 'activeMenu', this.menu);
    },
  },
};
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
  background-color: #EEE;
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

.dropdown .menu:hover {
  background-color: rgba(0,123,255,.25);
}

.dropdown > .menu {
  /* width: max-content; */
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
