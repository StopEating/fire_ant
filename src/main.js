// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import layer from 'layui-layer'
import $ from 'jquery'
//在main.js引入qs
import qs from 'qs'
import BaiduMap from 'vue-baidu-map'
import * as echarts from 'echarts'

//配全局属性配置，在任意组件内可以使用this.$qs获取qs对象
Vue.use(BaiduMap, { ak: 'PLYSnRNzvhB1SapXxzRSnGMEO3vbKxnk' })
Vue.prototype.$qs = qs

axios.defaults.headers.post['Content-Type'] = 'application/json';
window.jQuery = $
window.$ = $
Vue.use(layer)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
