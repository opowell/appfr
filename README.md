# appfr
- Recursive, resize, drag and drop
- In Windows display mode: (maximize, move)
- Menu (keyboard shortcuts)

## properties
- displayMode: 'tabs', 'row', 'column', 'window'
- content: content to display in this panel.
- type: type of component to display in this panel.
- children: array of child components to display in this panel. Takes precedence over content.

## TODO
- Drag and drop tabs
- Menus
- Close panels
- Change display for parents from menu.

## Usage
```
// App.vue
<template>
    <appfr :app="app" />
</template>
<script>
import HelloPanel from 'HelloPanel.vue'

export default {
    components: {
        HelloPanel
    },
    data() {
        return {
            app: {
                menus: [
                    label: 'Say Hello'
                    items: [
                        {
                            label: 'World',
                            action: this.sayHello("World")
                        },
                    ]
                ],
                windows: [
                    {
                        areas: [
                            {
                                type: 'HelloPanel',
                                data: 'Vue'
                            }
                        ]
                    }
                ]
            }
        }
    },
    methods: {
        sayHello(x) {
            this.windows.areas.push({
                type: 'HelloPanel',
                data: x
            })
        }
    }
}

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
