<template>
  <div>
    <input type="radio" id="open" value="open" v-model="state">
    <label class="select-radio" for="open">
      <span class="fa fa-exclamation-circle"></span> Open
    </label>
    <input type="radio" id="closed" value="closed" v-model="state">
    <label class="select-radio" for="closed">
      <span class="fa fa-check"></span> Closed
    </label>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
$c1: #042f40;

.select-radio {
  padding: 5px;
  color: $c1;
  opacity: 0.5;
}

.select-radio:hover {
  opacity: 1.0;
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + label {
  opacity: 1.0;
}
</style>