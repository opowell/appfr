<template>
  <div style='display: flex; align-items: center'>
    <slot name="menu">
      <menu-el
        :dblclickFunc="emitClose"
        :menu-prop='menu'
      />
    </slot>
    <slot name="title">
      <div class="title">{{ title }}</div>
    </slot>
    <slot name="close">
      <span 
        v-if='showClose'
        style='width: 20px; display: flex; margin-left: 5px;'
      >
        x
        <!-- <font-awesome-icon
          class='title-bar-icon'
          @click.left.stop.prevent='emitClose'
          icon="times"
          style='width: 20px'
        /> -->
      </span>
    </slot>
  </div>
</template>

<script>
import MenuEl from './MenuEl.vue'

export default {
  name: 'AppfrPanelHeader',
  components: {
    MenuEl,
  },
  props: {
    menu: {
      type: Object,
      default: () => undefined
    },
    showClose: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
  },
  methods: {
    emitClose() {
      this.$emit('close');
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