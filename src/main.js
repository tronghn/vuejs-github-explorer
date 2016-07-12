import Vue from 'vue'
import App from './components/App.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'

import Files from './components/views/Files.vue'
import Contributors from './components/views/Contributors.vue'
import Commits from './components/views/Commits.vue'
import Pulls from './components/views/Pulls.vue'

Vue.config.debug = true

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueMoment)

Vue.transition('fade', {
  enterClass: 'fadeIn',
  leaveClass: 'fadeOut'
})

Vue.transition('slide', {
  enterClass: 'slideInDown',
  leaveClass: 'slideOutUp'
})

const router = new VueRouter({
  linkActiveClass: 'active',
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
