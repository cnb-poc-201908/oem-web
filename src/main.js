import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/line";
import "echarts/lib/chart/scatter";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/dataZoom";
Vue.use(iView);
Vue.component("v-chart", ECharts);
Vue.prototype.$moment = moment;

Vue.config.productionTip = false

import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
