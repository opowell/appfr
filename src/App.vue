<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>