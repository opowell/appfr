import {DISPLAY} from "../../constants";

export const panelObject = {
  children: [
    {
      display: DISPLAY.ROW,
      children: [
        {
          props: {
            content: 'Units'
          },
          type: 'my-panel-a',
        },
        {
          display: DISPLAY.TABS,
          children: [
            {
              props: {
                content: 'Map'
              },
              type: 'my-panel-a',
            },
            {
              props: {
                content: 'Actions'
              },
              type: 'my-panel-b',
            },
            {
              props: {
                content: 'Players'
              },
              type: 'my-panel-b',
            },
          ]
        },
      ]
    },
    {
      props: {
        content: 'Help'
      },
      type: 'my-panel-a',
    },
    {
      props: {
        content: 'About'
      },
      type: 'my-panel-b',
    },
  ]
}