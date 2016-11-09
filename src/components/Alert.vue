<template>
  <transition name="custom-classes-transition"
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp"
    mode="out-in">
    <div class="alert alert-danger" role="alert" v-show="errorState">
      <p><strong>Oh no!</strong> An error occured: {{ errorMsg }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  vuex: {
    getters: {
      errorMsg: state => state.errorMsg,
      errorState: state => state.errorState
    }
  }
}
</script>

<style>
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