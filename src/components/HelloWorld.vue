<template>
  <div style='width: 100vw; height: 100vh; background-color: grey; position: relative; display: flex'>
    <appfr-panel :panel="panelObject" />
  </div>
</template>

<script>
import AppfrPanel from './AppfrPanel.vue';

export default {
  name: 'HelloWorld',
  components: {
    AppfrPanel,
  },
  data() {
    return {
      panelObject: {
        children: [
          {
            display: 'flex',
            children: [
              {
                content: 'AA',
                type: 'my-panel-a',
              },
              {
                display: 'flex',
                flexDirRow: false,
                children: [
                  {
                    content: 'AAA',
                    type: 'my-panel-a',
                  },
                  {
                    content: 'BBB',
                    type: 'my-panel-b',
                  },
                ]
              },
            ]
          },
          {
            content: 'A',
            type: 'my-panel-a',
          },
          {
            content: 'B',
            type: 'my-panel-b',
          },
        ]
      },
    }
  },
};
</script>

<style>
body {
  background-color: rgb(171, 171, 171);
}
</style>
<style scoped>
::v-deep .content {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
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
