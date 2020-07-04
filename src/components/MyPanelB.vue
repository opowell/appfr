<template>
  <div>
    My B: {{ panel.content }}
  </div>
</template>
<script>

export default {
  name: 'MyPanelB',
  props: [
    'panel',
  ]
};

</script>

<style scoped>
div {
  background-color: sienna;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>