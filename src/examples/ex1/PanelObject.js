import {DISPLAY} from "../../constants";
import MyPanelA from "./MyPanelA";
import MyPanelB from "./MyPanelB";

export const panelObject = {
  children: [
    {
      display: DISPLAY.FLEX,
      children: [
        {
          props: {
            content: 'AA'
          },
          type: MyPanelA,
        },
        {
          display: DISPLAY.TABS,
          flexDirRow: true,
          children: [
            {
              props: {
                content: 'AAA'
              },
              type: MyPanelA,
            },
            {
              props: {
                content: 'BBB'
              },
              type: MyPanelB,
            },
            {
              props: {
                content: 'CCC'
              },
              type: MyPanelB,
            },
          ]
        },
      ]
    },
    {
      props: {
        content: 'A'
      },
      type: MyPanelA,
    },
    {
      props: {
        content: 'B'
      },
      type: MyPanelB,
    },
  ]
}