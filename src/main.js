import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import CompFiles from './components/Files.vue'
import CompContributors from './components/Contributors.vue'
import CompCommits from './components/Commits.vue'

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
    component: CompFiles
  },
  '/contributors': {
    name: 'contributors',
    component: CompContributors
  },
  '/commits': {
    name: 'commits',
    component: CompCommits
  }
})

router.redirect({
  '/': '/files',

  '*': '/'
})

router.start(App, '#app')
