<template>
  <div class='content'>
    My A: {{ panel.content }}
    <input />
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
div.content {
  background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>