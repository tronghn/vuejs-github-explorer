<template>
  <div>
    <input type="radio" id="open" :value="state" :checked="state === 'open'" @click="changeState('open')">
    <label class="select-radio" for="open">
      <span class="fa fa-exclamation-circle"></span> Open
    </label>
    <input type="radio" id="closed" :value="state" :checked="state === 'closed'" @click="changeState('closed')">
    <label class="select-radio" for="closed">
      <span class="fa fa-check"></span> Closed
    </label>
  </div>
</template>

<script>
import { setSwitchState } from '../vuex/actions'

export default {
  vuex: {
    actions: {
      changeState: setSwitchState
    },
    getters: {
      state: state => state.switchState
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