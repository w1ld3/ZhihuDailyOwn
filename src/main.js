import Vue from 'vue'
// import App from './App'
import VueRouter from 'vue-router'
import { configRouter } from './route-config'
Vue.use(VueRouter)
export default router

// create router
var router = new VueRouter({
  history: true,
  saveScrollPosition: true
})

// configure router
configRouter(router)

/* eslint-disable no-new */
const app = Vue.extend(require('./App.vue'))
// const App = Vue.extend(require('./App.vue'))

router.start(app, '#app')

// just for debugging
window.router = router
