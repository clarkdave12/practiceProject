import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import routes from './routes'
import {registerURL, loginURL, getHeader, userURL, isAuth} from './config'

window.registerURL = registerURL
window.loginURL = loginURL
window.getHeader = getHeader
window.userURL = userURL
window.isAuth = isAuth
window.axios = axios

Vue.use(VueRouter)

window.bus = new Vue()

Vue.component('main-app', require('./App.vue').default)

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
  /* For authenticated User */
  if(to.meta.forUser) {
    const access_token = window.localStorage.getItem('access_token')

    if(access_token) {
      next()
    }
    else {
      next('/login')
    }
  }
  else {
    next()
  }

  /* For visitors */
  if(to.meta.forVisitor) {
    const access_token = window.localStorage.getItem('access_token')

    if(!access_token) {
      next()
    }
    else {
      next('/home')
    }
  }
  else {
    next()
  }

})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
