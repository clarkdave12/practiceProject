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

Vue.component('main-app', require('./App.vue').default)

const router = new VueRouter({
    mode: 'history',
    routes,
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
