<template>
    <div class='main-menu no-text-select'>
        <menu-el
          v-for='menuEl in parentMenu.children'
            :key='menuEl.text'
            :menu-prop='menuEl'
            :parent-menu="parentMenu"
        />
        <div class='spacer'/>
    </div>
</template>

<script>

import MenuEl from './MenuEl'
import Menu from '../models/Menu'

export default {
  name: 'MenuBar',
  components: {
    MenuEl,
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      parentMenu: {}
    }
  },
  mounted() {
    this.parentMenu = new Menu({
      children: this.menu,
      childrenOpenDown: true
    })

    const self = this
    window.addEventListener("click", function(event) {
      self.parentMenu.setOpen(false)
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main-menu {
   display: flex;
    z-index: 1039; /* z-index of modal backdrops is 1040 */
    flex: 0 0 auto;
    background-color: aliceblue;
    color: black;
}

.main-menu .menu {
    padding: 0px 7px;
}


/* zTree
 .main-menu .menu:hover {
    background-color:rgba(0, 123, 255, 0.13);
    color: #000;
    border-color: rgba(0, 123, 255, 0.26);
} */

.main-menu .menu:hover {
    background-color:var(--menuHoverBGColor);
    border-color:var(--menuHoverBorderColor);
}

.main-menu .disabled:hover {
    background-color: inherit;
    border-color: transparent;
}

.spacer {
    flex: 1 1 auto;
}

</style>
