import Vue from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";
import './assets/styles.css';

Vue.use(VueMapbox, {mapboxgl: Mapbox});

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(Antd);

new Vue({
  render: h => h(App),
}).$mount('#app')
