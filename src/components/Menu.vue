<template>
  <div class="nav-vertical">
    <button type="button" class="toggle-nav btn btn-primary" 
      v-bind:class="{ 'toggle-nav-collapsed' : toggle }" @click="toggle = !toggle">
      <span v-bind:class="{'fa fa-chevron-right': toggle, 'fa fa-chevron-left': !toggle}"></span>
    </button>
    <ul class="nav nav-pills nav-stacked" v-bind:class="{'nav-pills-collapsed': toggle}">
      <li v-link-active>
        <a v-link="{ path: '/files' }">
          <span class="nav-icon fa fa-files-o"></span>
          <p v-show="!toggle" class="nav-text animated" transition="fade" transition-mode="out-in">Files</p>
        </a>
      </li>
      <li v-link-active>
        <a v-link="{ path: '/contributors' }">
          <span class="nav-icon fa fa-users"></span>
          <p v-show="!toggle" class="nav-text animated" transition="fade" transition-mode="out-in">Contributors</p>
        </a>
      </li>
      <li v-link-active>
        <a v-link="{ path: '/commits' }">
          <span class="nav-icon fa fa-code"></span>
          <p v-show="!toggle" class="nav-text animated" transition="fade" transition-mode="out-in">Commits</p>
        </a>
      </li>
      <li v-link-active>
        <a v-link="{ path: '/pulls' }">
          <span class="nav-icon icon-pr fa fa-code-fork"></span>
          <p v-show="!toggle" class="nav-text animated" transition="fade" transition-mode="out-in">Pull Requests</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toggle: false
    }
  }
}
</script>

<style lang="scss">
$c1: #042f40;

.icon-pr {
  margin-left: 0 !important;
}

.nav-icon {
  text-align: center;
  vertical-align: bottom;
  display: inline-block;
  width: 10px;
  height: 10px;
  font-size: 14px;
  line-height: 0;
  margin-left: -2px;
}

.nav-text {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 35px;
  white-space: nowrap;
}

.nav-pills {
  width: 140px;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
}

.nav-pills-collapsed {
  width: 40px;
}

.nav-pills>li.active>a, .nav-pills>li.active>a:focus, .nav-pills>li.active>a:hover {
  background-color: $c1;
}

.nav-pills a {
  color: #fff;
}

.nav-pills a:hover {
  color: #000;
}

.nav-vertical {
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  background-color: darken($c1, 10%);
  z-index: 2;
}

.toggle-nav {
  color: #fff;
  background-color: $c1;
  position: fixed;
  top: 15px;
  left: 130px;
  padding: 5px;
  border: 0;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
}

.toggle-nav-collapsed {
  left: 30px;
}

</style>