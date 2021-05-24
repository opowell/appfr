<template>
  <div>
    My B: {{ content }}
  </div>
</template>
<script>

export default {
  name: 'MyPanelB',
  props: {
    content: { type: String, default: '' }
  },
  data() {
    return {
      title: this.content
    }
  }
};

</script>

<style scoped>
div {
  background-color: #6081b0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>