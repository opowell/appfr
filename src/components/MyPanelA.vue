<template>
  <div>
    My A: {{ panel.content }}
  </div>
</template>
<script>

export default {
  name: 'MyPanelA',
  props: [
    'panel',
  ]
};

</script>

<style scoped>
div {
  background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>