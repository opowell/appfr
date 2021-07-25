<template>
  <div class="app">
    <menu-bar v-if="menu" :menu="menu" />
    <appfr-panel :panel="panel" />
  </div>
</template>

<script>
import MenuBar from './MenuBar.vue'
import AppfrPanel from './AppfrPanel.vue'

export default {
  name: 'AppfrApp',
  components: {
    AppfrPanel,
    MenuBar
  },
  props: {
    panel: {
      type: Object,
      default: () => {},
    },
    menu: {
      type: Array,
      default: null,
    }
  }
}
</script>
<style scoped>

div.app {
  display: flex;
  flex-direction: column;
  width: 100%;
}

</style>