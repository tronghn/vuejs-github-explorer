import Vue from 'vue'
import App from './components/App.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'

import Files from './components/views/Files.vue'
import Contributors from './components/views/Contributors.vue'
import Commits from './components/views/Commits.vue'
import Pulls from './components/views/Pulls.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueMoment)

const router = new VueRouter({
  routes: [
    { path: '/files', name: 'files', component: Files },
    { path: '/contributors', name: 'contributors', component: Contributors },
    { path: '/commits', name: 'commits', component: Commits },
    { path: '/pulls', name: 'pulls', component: Pulls },
    { path: '/', redirect: '/files' },
    { path: '*', redirect: '/' }
  ]
})
new Vue({ // eslint-disable-line no-new
  router: router,
  ...App
}).$mount('#app')
