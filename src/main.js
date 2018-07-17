// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'

//导入vue-resource插件
import vueResource from 'vue-resource'
//使用vue-resource
Vue.use(vueResource);

//引入全局css
import "./common/stylus/index.styl" 

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
