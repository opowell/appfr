import MenuEl from "../components/MenuEl";

export default {
  title: 'Menu Element',
  component: MenuEl,
  argTypes: {
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MenuEl },
  template: '<menu-el v-bind="$props" />',
});

export const Text = Template.bind({});
Text.args = {
  menu: {
    text: 'text only'
  }
};

export const TextIcon = Template.bind({});
TextIcon.args = {
  menu: {
    text: 'text+icon',
    icon: 'window-close'
  }
};