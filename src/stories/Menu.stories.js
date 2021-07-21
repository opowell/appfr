import MenuEl from '../components/MenuEl.vue'

export default {
  title: 'Menu',
  component: MenuEl,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { MenuEl },
  props: Object.keys(argTypes),
  template: '<div style="display: flex"><menu-el v-bind="$props" /></div>',
});

import StandardMenu from './StandardMenu'

export const Menu = Template.bind({})
Menu.args = {
  menuProp: {
    text: 'Menu',
    children: StandardMenu  
  }
}