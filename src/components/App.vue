<template>
  <div>
    <alert></alert>
    <menu></menu>
    <header-comp></header-comp>
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <repo-form></repo-form>
        <router-view class="animated" transition="fade" transition-mode="out-in"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComp from './Header.vue'
import Menu from './Menu.vue'
import RepoForm from './RepoForm.vue'
import Alert from './Alert.vue'
import store from '../vuex/store'

export default {
  components: {
    HeaderComp,
    Menu,
    RepoForm,
    Alert
  },
  store
}
</script>

<style lang="scss">
@import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../../node_modules/font-awesome/css/font-awesome.min.css';
@import '../assets/animate.min.css';
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

.panel-default > .panel-heading {
  color: #777;
}

.cell-row {
  padding: 5px;
  margin: 0 0px 10px;
  border-radius: 5px;
}

.cell-row:hover {
  background-color: #eee;
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
  text-overflow: ellipsis;
}

.cell-author, .cell-author a {
  color: #444;
}

.cell-sha {
  width: 80px;
}
</style>
