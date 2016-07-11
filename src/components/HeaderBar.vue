<template>
  <div class="text-center">
    <div class="name">
      <span class="inner text-uppercase">
        Vue.js <span class="middle">GitHub</span> Explorer</h1>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
$c1: #042f40;
$c2: #ffffff;

.name {
  font: 100 6vh/1 Roboto;
  color: $c2;
}

.inner {
  background: $c1;
  margin: 4rem auto;
  padding: 0 2rem 1rem;
  display: inline-block;
  box-shadow: 0 2px 5px $c1;
}

.middle {
  color: $c1;
  font-size: 9vh;
  font-weight: 600;
  text-transform: initial;
  background: darken($c2, 10%);
  padding: 1rem;
  margin: 0 1rem;
}

</style>