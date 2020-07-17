<template>
  <div style='width: 800px; height: 600px; background-color: grey; position: relative; display: flex'>
    <appfr-panel :panel="panelObject" />
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
      panelObject: {
        children: [
          {
            content: 'A',
            type: 'my-panel-a'
          },
          {
            content: 'BBBB',
            type: 'my-panel-b'
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
  padding: 0rem;
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
