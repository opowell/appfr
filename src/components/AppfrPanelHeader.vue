<template>
  <div style='display: flex; align-items: center'>
    <menu-el
      :dblclickFunc="emitClose"
      :menu='menu'
      :rootPanel='rootPanel'
    />
    <slot name="title">
      <div class="title">{{ title }}</div>
    </slot>
    <span 
      v-if='panel.showHeaderClose'
      style='width: 20px; display: flex; margin-left: 5px;'
    >
      <font-awesome-icon
        class='title-bar-icon'
        @click.left.stop.prevent='emitClose'
        icon="times"
        style='width: 20px'
      />
    </span>
  </div>
</template>

<script>
import MenuEl from './MenuEl.vue'

export default {
  name: 'AppfrPanelHeader',
  components: {
    MenuEl,
  },
  props: [
    'menu',
    'rootPanel',
    'title',
    'panel',
  ],
  methods: {
    emitClose() {
      this.$emit('close');
    }
  },
  beforeMount() {
    if (this.panel != null && this.panel.showHeaderClose == null) {
      this.panel.showHeaderClose = false;
    }
  }
}
</script>

<style scoped>
.title {
  flex: 1 1 auto;
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