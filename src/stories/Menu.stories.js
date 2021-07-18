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
  menuProp: [
    {
      text: 'File',
      children: [
        {
          text: 'New',
          action: x => {
            console.log('click', x)
          }
        },
        {
          text: 'Open'
        },
        {
          text: 'View',
          children: [
            {
              text: 'View 1'
            },
            {
              text: 'View 2'
            }
          ]
        }
      ]
    },
    {
      text: 'Edit',
      children: [
        {
          text: 'Copy'
        },
        {
          text: 'Paste'
        }
      ]
    },
    {
      text: 'Help',
      children: [
        {
          text: 'About'
        },
        {
          text: 'Register'
        }
      ]
    }]
};
