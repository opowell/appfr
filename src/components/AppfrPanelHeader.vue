<template>
  <div style='display: flex; align-items: center'>
    <menu-el
      :dblclickFunc="$emit('close')"
      :menu='menu'
      :rootPanel='rootPanel'
    />
    <slot name="title">
      <div class="title">{{ title }}</div>
    </slot>
    <span style='width: 20px; display: flex; margin-left: 5px;'>
      <font-awesome-icon
        class='title-bar-icon'
        @click.left.stop.prevent='$emit("close")'
        icon="times"
        style='width: 20px'
      />
    </span>
  </div>
</template>

<script>
import MenuEl from '@/components/MenuEl.vue'

export default {
  name: 'AppfrPanelHeader',
  components: {
    MenuEl,
  },
  props: [
    'menu',
    'rootPanel',
    'panel',
    'title',
  ] 
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