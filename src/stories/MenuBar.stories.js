import MenuBar from "../components/MenuBar"

export default {
  title: 'MenuBar',
  component: MenuBar,
  argTypes: {
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MenuBar },
  template: '<menu-bar v-bind="$props" />',
});

import StandardMenu from './StandardMenu'

export const MenuBarEl = Template.bind({});
MenuBarEl.args = {
  menu: StandardMenu
};
