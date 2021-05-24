import MainMenu from "../components/MainMenu";

export default {
  title: 'Menu',
  component: MainMenu,
  argTypes: {
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MainMenu },
  template: '<main-menu v-bind="$props" />',
});

export const Simple = Template.bind({});
Simple.args = {
  menu: [
    {
      text: 'File',
      children: [
        {
          text: 'New'
        },
        {
          text: 'Open'
        }
      ]
    },
    {
      text: 'Edit'
    },
    {
      text: 'Help'
    }]
};
