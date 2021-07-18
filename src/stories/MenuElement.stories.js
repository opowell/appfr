import MenuEl from '../components/MenuEl.vue'

export default {
  title: 'Menu Element',
  component: MenuEl,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: { MenuEl },
  props: Object.keys(argTypes),
  template: '<menu-el v-bind="$props" />',
});

export const Text = Template.bind({});
Text.args = {
  menuProp: {
    text: 'text only'
  }
};

export const TextIcon = Template.bind({});
TextIcon.args = {
  menuProp: {
    text: 'text+icon',
    icon: 'window-close'
  }
};

export const WithChildren = Template.bind({})
WithChildren.args = {
  menuProp: {
    text: 'Children',
    children:   [
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
      }
    ]  
  }
}