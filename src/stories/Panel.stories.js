import AppfrPanel from "../components/AppfrPanel"

export default {
  title: 'Panel',
  component: AppfrPanel,
  argTypes: {
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppfrPanel },
  template: `
    <div style='display: flex; height: 800px'>
      <appfr-panel v-bind="$props" />
    </div>
  `,
});

import {panelObject} from "../examples/ex1/PanelObject";
import singlePanel from "../examples/ex1/SinglePanel";

import MyPanelA from "../examples/ex1/MyPanelA";
import MyPanelB from "../examples/ex1/MyPanelB";
import Vue from 'vue'
Vue.component('my-panel-a', MyPanelA)
Vue.component('my-panel-b', MyPanelB)


export const SinglePanel = Template.bind({});
SinglePanel.args = {
  panel: singlePanel
};

export const SingleProblemPanel = Template.bind({});
SingleProblemPanel.args = {
  panel: {
    children: [
      {
        props: {
          content: 'Units'
        },
        type: 'my-panel-a'  
      }
    ]
  }
};

export const Simple = Template.bind({});
Simple.args = {
  panel: panelObject
};
