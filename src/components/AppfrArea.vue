<template>
  <div
    class="area"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'AppfrArea',
};

</script>

<style scoped>
.area {
  width: 200px;
  height: 100px;
  background-color: purple;
}
</style>