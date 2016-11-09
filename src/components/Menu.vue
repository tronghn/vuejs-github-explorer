<template>
  <div class="nav-vertical">
    <button type="button" class="toggle-nav btn btn-primary" 
      :class="{ 'toggle-nav-collapsed' : toggle }" @click="toggle = !toggle">
      <span :class="{'fa fa-chevron-right': toggle, 'fa fa-chevron-left': !toggle}"></span>
    </button>
    <ul class="nav nav-pills nav-stacked" :class="{'nav-pills-collapsed': toggle}">
      <router-link tag="li" :to="page.path" v-for="page in pages">
        <a :title="page.text">
          <span :class="'nav-icon fa ' + page.icon"></span>
          <transition name="custom-classes-transition"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in">
            <p v-show="!toggle" class="nav-text">{{ page.text }}</p>
          </transition>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toggle: false,
      pages: [
        {
          path: '/files',
          icon: 'fa-files-o',
          text: 'Files'
        },
        {
          path: '/contributors',
          icon: 'fa-users',
          text: 'Contributors'
        },
        {
          path: '/commits',
          icon: 'fa-code',
          text: 'Commits'
        },
        {
          path: '/pulls',
          icon: 'fa-code-fork',
          text: 'Pull Requests'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
$c1: #042f40;

.fa-code-fork {
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

.nav-pills>li.router-link-active>a, .nav-pills>li.router-link-active>a:focus, .nav-pills>li.router-link-active>a:hover {
  color: #fff;
  background-color: $c1;
  border-radius: 0;
}

.nav-pills a {
  color: #fff;
}

.nav-pills a:hover {
  color: #000;
  border-radius: 0;
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