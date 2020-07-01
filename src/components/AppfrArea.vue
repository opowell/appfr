<template>
  <div
    class="area"
    :style="styleObj"
  >
    <template v-if="area.childAreas && area.childAreas.length > 0">
      <button @click.left="toggleDir">toggle dir</button>
      <template v-for="(childArea, index) in area.childAreas">
        <appfr-area :area="childArea" :key="index" />
        <div class="spacer" v-if="index < area.childAreas.length - 1" :key="'spacer' + index" />
      </template>
    </template>
    <template v-else>
      <div class="area-content">{{ area.content }}</div>
    </template>
  </div>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'AppfrArea',
  props: {
    area: {
      type: Object,
      default: () => { return { childAreas: [], content: '' } }
    },
  },
  mounted() {
    if (this.area.flexDirRow == null)
      Vue.set(this.area, 'flexDirRow', true) 
  },
  computed: {
    styleObj() {
      return {
        "flex-direction": this.area.flexDirRow ? "row" : "column"
      }
    }
  },
  methods: {
    toggleDir() {
      this.area.flexDirRow = !this.area.flexDirRow
    }
  }
};

</script>

<style scoped>
.area {
  display: flex;
  flex: 1 1 auto;
}
.spacer {
  flex: 0 0 10px;
  background-color: brown;
}
</style>