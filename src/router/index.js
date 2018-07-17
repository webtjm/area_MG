import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Goods from '../components/goods/goods.vue';
import Seller from '../components/seller/seller.vue';
import Ratings from '../components/ratings/ratings.vue';

const routes = [
  { path: '/goods', component: Goods , meta : {keepAlive:true} },
  { path: '/seller', component: Seller , meta : {keepAlive:true}},
  { path: '/ratings', component: Ratings , meta : {keepAlive:true} },
  { path: '*', redirect: '/goods' }   /*默认跳转路由*/
  ]
  
  const router = new Router({
    linkActiveClass:'active',
    routes // （缩写）相当于 routes: routes
  })
  

export default router;
