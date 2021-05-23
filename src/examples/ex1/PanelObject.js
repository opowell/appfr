import {DISPLAY} from "../../constants";

export const panelObject = {
  children: [
    {
      display: DISPLAY.FLEX,
      children: [
        {
          props: {
            content: 'AA'
          },
          type: 'my-panel-a',
        },
        {
          display: DISPLAY.TABS,
          flexDirRow: true,
          children: [
            {
              props: {
                content: 'AAA'
              },
              type: 'my-panel-a',
            },
            {
              props: {
                content: 'BBB'
              },
              type: 'my-panel-b',
            },
            {
              props: {
                content: 'CCC'
              },
              type: 'my-panel-b',
            },
          ]
        },
      ]
    },
    {
      props: {
        content: 'A'
      },
      type: 'my-panel-a',
    },
    {
      props: {
        content: 'B'
      },
      type: 'my-panel-b',
    },
  ]
}