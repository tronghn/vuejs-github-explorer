import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'

import Files from './components/Files.vue'
import Contributors from './components/Contributors.vue'
import Commits from './components/Commits.vue'
import Pulls from './components/Pulls.vue'

Vue.config.debug = true

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueMoment)

Vue.transition('fade', {
  enterClass: 'fadeIn',
  leaveClass: 'fadeOut'
})

const router = new VueRouter({
  linkActiveClass: 'active',
  saveScrollPosition: true,
  transitionOnLoad: true
})

router.map({
  '/files': {
    name: 'files',
    component: Files
  },
  '/contributors': {
    name: 'contributors',
    component: Contributors
  },
  '/commits': {
    name: 'commits',
    component: Commits
  },
  '/pulls': {
    name: 'pulls',
    component: Pulls
  }
})

router.redirect({
  '/': '/files',

  '*': '/'
})

router.start(App, '#app')
