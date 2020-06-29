<template>
  <div>
    <div>
      Areas
      <div style='display: flex'>
        <appfr-area class="demo-area">
          1
        </appfr-area>
        <appfr-area class="demo-area">
          2
        </appfr-area>
      </div>
    </div>
    <div>
      <button @click.left="addWindow">Add Window</button>
      <button v-for="(window, i) in state.windows" :key="i" @click="focus(window)">{{ i }}</button>
      <div class="hello">
        <appfr-window />
        <appfr-window 
          v-for="(window, i) in state.windows"
          :key="i"
          :state="state"
          :window="window"
          @dblclick.native='toggleMaximized'
          @dblclick.left='doDblClick'
        >
          <template v-slot:body>
            <div class="header">
              <div class="title">Window {{ window.title }}</div>
              <div class="close" @click="close(i)">x</div>
            </div>
            <div class="content">
              <div style="padding: 1rem;">{{ window.title }}</div>
            </div>
          </template>
        </appfr-window>
      </div>
    </div>  
  </div>
</template>

<script>
import AppfrWindow from './AppfrWindow.vue';
import AppfrArea from './AppfrArea.vue';

export default {
  name: 'HelloWorld',
  components: {
    AppfrArea,
    AppfrWindow,
  },
  data() {
    return {
      state: {
        activeWindow: null,
        windows: [],
        windowsMaximized: false,
      }
    }
  },
  computed: {
    windowsLength() {
      return this.state.windows.length;
    }
  },
  mounted() {
    this.addWindow();
    this.addWindow();
  },
  methods: {
    close(i) {
      this.$refs.windows[i-1].close()
    },
    focus(window) {
      window.component.focus()
    },
    addWindow() {
      this.state.windows.push({
        title: this.state.windows.length + 1
      });
    },
    toggleMaximized() {
      this.state.windowsMaximized = !this.state.windowsMaximized;
    },
    doDblClick() {
      console.log('double click?!');
    }
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
  border: 1px outset #ddd;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
  color: grey;
}

::v-deep .window > .content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
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

.header {
  display: flex;
  flex: 0 0 auto;
}

.content {
  flex: 1 1 auto;
}

.header > .title {
  flex: 1 1 auto;
}

.header > .close {
  flex: 0 0 auto;
}

.demo-area {
  margin: 2rem;
}

</style>
