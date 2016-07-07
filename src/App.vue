<template>
  <div>
    <div class="alert alert-danger animated" role="alert" v-show="errorState" 
      transition="slide" transition-mode="out-in">
      <p><strong>Oh no!</strong> An error occured: {{ errorMsg }}</p>
    </div>
    <menu></menu>
    <header-bar></header-bar>
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <repo-form></repo-form>
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
import store from './vuex/store'

export default {
  components: {
    HeaderBar,
    Menu,
    RepoForm
  },
  vuex: {
    getters: {
      errorMsg: state => state.errorMsg,
      errorState: state => state.errorState
    }
  },
  store
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
  overflow-x: hidden;
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
  z-index: 3;
  text-align: center;
  border-radius: 0;
}
</style>
