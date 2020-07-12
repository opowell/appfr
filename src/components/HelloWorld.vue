<template>
  <div>
    Panel
    <appfr-panel class="demo-area" :panel="demo1Panel" />

    <div>Area with Panels
      <appfr-area class="demo-area" :area="demoAreaWithPanels" />      
    </div>
    <div>
        Area: with child areas
      <appfr-area class="demo-area" :area="demoArea" />
    </div>
    <div>
      Windows
      <div class="hello">
        <appfr-window />
        <appfr-window 
          v-for="(window, i) in state.windows"
          :key="window.title"
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
import AppfrPanel from './AppfrPanel.vue';

export default {
  name: 'HelloWorld',
  components: {
    AppfrArea,
    AppfrPanel,
    AppfrWindow,
  },
  data() {
    return {
      state: {
        activeWindow: null,
        windows: [],
        windowsMaximized: false,
      },
      demo1Panel: {
        display: "tabs",
        children: [
          {
            content: 'A',
            type: 'my-panel-a'
          },
          {
            content: 'B',
            type: 'my-panel-b'
          },
        ]
      },
      demoAreaWithPanels: {
        panels: [
          {
            content: 'A',
            type: 'my-panel-a'
          },
          {
            content: 'B',
            type: 'my-panel-a'
          },
          {
            content: 'C',
            type: 'my-panel-b'
          },
        ]
      },
      demoArea: {
        childAreas: [
          {
            flexDirRow: false,
            childAreas: [
              { 
                content: '1b'
              }, 
              {
                content: '1b',
              }
            ]
          },
          {
            flexDirRow: false,
            childAreas: [
              { 
                childAreas: [
                  {content: '2ai'},
                  {content: '2aii'}
                ]
              }, 
              { content: '2b'}
            ]
          },
        ]
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
  background-color: rgb(203, 201, 201);
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

::v-deep .content {
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
  height: 300px;
  background-color: purple;
  display: flex;
}

::v-deep .area-content {
  background-color: hotpink;
  color: white;
}

</style>
