<template>
  <div class='content'>
    My A: {{ content }}
    <input />
  </div>
</template>
<script>

export default {
  name: 'MyPanelA',
  props: {
    content: { type: String, default: '' }
  }
};

</script>

<style scoped>
div.content {
  background-color: #4d4d4d;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>