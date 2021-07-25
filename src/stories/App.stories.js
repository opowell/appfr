import AppfrApp from "../components/AppfrApp"

export default {
  title: 'App',
  component: AppfrApp,
  argTypes: {
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppfrApp },
  template: `
    <div style='display: flex; height: 800px'>
      <appfr-app v-bind="$props" />
    </div>
  `,
});

import {panelObject} from "../examples/ex1/PanelObject";
import StandardMenu from "./StandardMenu";

import MyPanelA from "../examples/ex1/MyPanelA";
import MyPanelB from "../examples/ex1/MyPanelB";
import Vue from 'vue'
Vue.component('my-panel-a', MyPanelA)
Vue.component('my-panel-b', MyPanelB)


export const StandardApp = Template.bind({});
StandardApp.args = {
  menu: StandardMenu,
  panel: panelObject
};