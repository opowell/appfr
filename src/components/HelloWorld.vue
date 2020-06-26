<template>
  <div>
    <button @click="addWindow">Add Window</button>
    <button v-for="i in numWindows" :key="i" @click="focus(i)">{{ i }}</button>
    <div class="hello">
      <jt-window 
        ref="windows"
        v-for="i in numWindows"
        :key="i"
        :state="state"
        @dblclick='toggleMaximized'
      >
        <template v-slot:body>
          <div style="padding: 1rem;">{{ i }}</div>
        </template>
      </jt-window>
    </div>
  </div>  
</template>

<script>
import JtWindow from './JtWindow.vue';

export default {
  name: 'HelloWorld',
  components: {
    JtWindow,
  },
  data() {
    return {
      numWindows: 2,
      state: {
        activeWindow: null,
        windows: [],
        windowsMaximized: false,
      }
    }
  },
  methods: {
    focus(i) {
      this.$refs.windows[i-1].focus()
    },
    addWindow() {
      this.numWindows++
    },
    toggleMaximized() {
      this.state.windowsMaximized = !this.state.windowsMaximized;
    },
  },
};
</script>

<style scoped>
.hello {
  width: 800px;
  height: 600px;
  background-color: blue;
  position: relative;
}

::v-deep .window {
  background-color: green;
  position: absolute;
  border: 1px outset #ddd;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
  color: grey;
}

::v-deep .window.focussed {
  background-color: lightgreen;
  color: black;
}

::v-deep .maxed {
  box-shadow: none;
  border: none;
  border-radius: 0px;
}
</style>
