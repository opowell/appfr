# appfr
- Windows (maximize, resize, position)
- Areas (recursive, resize, drag and drop)
- Menu (keyboard shortcuts)
- App: set of windows, areas and a menu

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
