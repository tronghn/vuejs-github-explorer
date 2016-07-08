<template>
  <div class="btn-group" role="group">
    <button v-bind:class="{ 'disabled': !prevPageAvailable || pageNumber === 1 }" 
    type="button" class="btn btn-default" @click="prevChild()">
      Prev 30
    </button>
    <button v-bind:class="{ 'disabled': !nextPageAvailable }" type="button" 
    class="btn btn-default" @click="nextChild()">
      Next 30
    </button>
  </div>
</template>

<script>
export default {
  props: {
    prevPageAvailable: {
      type: Boolean,
      required: true
    },
    nextPageAvailable: {
      type: Boolean,
      required: true
    },
    pageNumber: {
      type: Number,
      required: true
    },
    prevChild: {
      type: Function,
      required: true
    },
    nextChild: {
      type: Function,
      required: true
    }
  }
}
</script>

<style>

.btn-group {
  margin-bottom: 10px;
}
</style>