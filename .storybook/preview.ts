import type { Preview } from '@storybook/vue3-vite'
import '../src/style/tokens.css'
import './preview.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    backgrounds: { disable: true },
  },
}

export default preview
