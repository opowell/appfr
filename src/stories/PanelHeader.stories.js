import AppfrPanelHeader from "../components/AppfrPanelHeader"

export default {
  title: 'PanelHeader',
  component: AppfrPanelHeader,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppfrPanelHeader },
  template: `
    <appfr-panel-header v-bind="$props" />
  `,
});

import StandardMenu from "./StandardMenu";

export const SinglePanel = Template.bind({});
SinglePanel.args = {
  menu: {
    text: 'Menu',
    children: StandardMenu  
  },
  showClose: true,
  title: 'Single Panel Header'
};