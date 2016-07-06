<template>
  <div class="text-center">
    <div class="name">
      Vue.js <span class="middle">GitHub</span> Explorer</h1>
    </div>
  </div>
</template>

<style lang="scss">
$c1: #042f40;
$c2: #ffffff;

.name {
  font-family: Roboto;
  font-size: 38px;
  color: $c2;
  background: $c1;
  text-transform: uppercase;
  text-align: center;
  margin: 40px auto;
  padding: 0 15px 5px 15px;
  display: inline-block;
}

.middle {
  color: $c1;
  font-size: 52px;
  font-weight: 600;
  text-transform: initial;
  background: darken($c2, 10%);
  padding: 20px;
  margin: 0 5px;
}

</style>