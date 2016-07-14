<template>
  <div class="alert alert-danger animated" role="alert" v-show="errorState" 
    transition="slide" transition-mode="out-in">
    <p><strong>Oh no!</strong> An error occured: {{ errorMsg }}</p>
  </div>
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