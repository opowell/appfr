<template>
    <div class='main-menu no-text-select'>
        <menu-el
          v-for='menuEl in menu'
            :key='menuEl.text'
            :menu='menuEl'
            :style='menuElStyle'
            :root-panel="menu"
        />
        <div class='spacer'/>
    </div>
</template>

<script>

import MenuEl from './MenuEl'

export default {
  name: 'MainMenu',
  components: {
    MenuEl,
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    menuElStyle() { return {
      padding: '5px'
    }},
  }
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
