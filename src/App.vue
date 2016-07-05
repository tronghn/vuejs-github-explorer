<template>
  <div>
    <div class="alert alert-danger animated" role="alert" v-if="errorState" 
      transition="slide" transition-mode="out-in">
      <p><strong>Oh no!</strong> An error occured: {{ errorMsg }}</p>
    </div>
    <header-bar></header-bar>
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <!-- TODO: Implement Vuex store for the Repo Form -->
        <repo-form :full-repo-name.sync="fullRepoName"></repo-form>
        <menu></menu>
        <hr>
        <router-view :username="username" :repo="repo" 
          class="animated" transition="fade" transition-mode="out-in"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'
import Menu from './components/Menu.vue'
import RepoForm from './components/RepoForm.vue'

export default {
  components: {
    HeaderBar,
    Menu,
    RepoForm
  },
  data () {
    return {
      fullRepoName: '',
      username: '',
      repo: '',
      errorState: false,
      errorMsg: ''
    }
  },
  methods: {
    changeRepo () {
      this.errorState = false
      let splitData = this.fullRepoName.split('/')
      this.username = splitData[0]
      this.repo = splitData[1]
      if (this.repo === undefined) this.$emit('error', 'Invalid input')
      console.group('Vue Data')
      console.log('fullRepoName:', this.fullRepoName)
      console.log('username:', this.username)
      console.log('repo:', this.repo)
      console.groupEnd('Vue Data')
    }
  },
  events: {
    'error': function (msg) {
      this.errorState = true
      if (typeof msg === 'string') {
        this.errorMsg = msg
      } else {
        this.errorMsg = JSON.parse(msg.body).message
      }
      setTimeout(() => {
        this.errorState = false
      }, 4000)
    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
/* @import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'; */
@import '../node_modules/font-awesome/css/font-awesome.min.css';
@import '/static/animate.min.css';
@import url(http://fonts.googleapis.com/css?family=Roboto:100);

$c1: #042f40;

html {
  height: 100%;
}

body {
  font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
}

.animated {
  animation-duration: .5s;
}

.alert {
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  text-align: center;
}
</style>
