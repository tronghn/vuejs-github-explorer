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
        <router-view class="animated" transition="fade" transition-mode="out-in"></router-view>
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
@import '../node_modules/font-awesome/css/font-awesome.min.css';
@import './assets/animate.min.css';
@import url(https://fonts.googleapis.com/css?family=Roboto:100);

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

.panel-default > .panel-heading {
  color: #777;
}

.cell-avatar {
  margin-right: 10px;
  border-radius: 5px;
}

.cell-avatar:hover {
  box-shadow: 0 0 5px $c1;
}

.cell-title {
  color: #000;
}

.cell-author {
  color: #444;
}

.cell-sha {
  width: 80px;
}
</style>
