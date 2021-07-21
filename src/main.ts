import Vue from 'vue'
import App from './examples/ex1/App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {faAlignCenter}          from '@fortawesome/free-solid-svg-icons/faAlignCenter'
import {faTimes}                from '@fortawesome/free-solid-svg-icons/faTimes'
import {faWindowClose}          from '@fortawesome/free-regular-svg-icons/faWindowClose'
import {faWindowMinimize}       from '@fortawesome/free-regular-svg-icons/faWindowMinimize'
import {faWindowRestore}        from '@fortawesome/free-regular-svg-icons/faWindowRestore'

import MyPanelA from "./examples/ex1/MyPanelA";
import MyPanelB from "./examples/ex1/MyPanelB";
Vue.component('my-panel-a', MyPanelA)
Vue.component('my-panel-b', MyPanelB)

library.add(
  faAlignCenter,
  faTimes,
  faWindowClose,
  faWindowMinimize,
  faWindowRestore,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
