import Vue from 'vue'
import App from './App.vue'
import MyPanelA from './components/MyPanelA.vue';
import MyPanelB from './components/MyPanelB.vue';

Vue.config.productionTip = false

Vue.component('my-panel-a', MyPanelA)
Vue.component('my-panel-b', MyPanelB)
new Vue({
  render: h => h(App),
}).$mount('#app')
