// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {asyncRouterMap} from './router'
import VueRouter from 'vue-router'
import './config/common'
import './config/vueFilter'
import {route, TOKEN} from './config/index'
import store from './store'
import storejs from 'storejs'
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)
// import './mock/index.js';
import * as filters from '@/config/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
  })
Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({
  routes: asyncRouterMap,
  scrollBehavior: () => ({y: 0}),
  linkActiveClass: 'open active',
  mode: 'hash'
})
router.beforeEach((to, from, next) => {

  if (to.path !== '/wechatCard/vip/list') {
    // 保存当前点击的默认tab
    storejs.remove('activeName')
  }
  const originalPush = VueRouter.prototype.push
    VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }
  let AppNo = store.getters.AppNo

  if(!AppNo&&to.path !== route.login){
    next(route.login)
    storejs.clear()
  }else if(AppNo && to.path !== route.login){
    if(!store.getters.AreaNo ||!store.getters.AreaList){
      // 地区和地区列表
      next(route.login)
    }
    if (from.path === '/'||from.path === route.login) {
      store.dispatch('GenerateRoutes').then(() => {
        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由,左侧
        next()
      }).catch((error) => {
        //失败返回到登录页面
        store.dispatch('LogOut').then(() => {
          next(route.login)
        })
      })
      store.dispatch('getNowRoutes', to); // 动态添加可访问路由,左侧
    }else{
      store.dispatch('getNowRoutes', to);
      next()
    }
  }else if(AppNo && to.path === route.login){
    store.dispatch('LogOut').then(() => {
      next()
    })
    storejs.clear()
  }else{
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
