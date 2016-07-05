<template>
  <ul class="nav nav-pills nav-justified">
    <li v-link-active><a v-link="{ path: '/files' }">Files</a></li>
    <li v-link-active><a v-link="{ path: '/contributors' }">Contributors</a></li>
    <li v-link-active><a v-link="{ path: '/commits' }">Commits</a></li>
    <li v-link-active><a v-link="{ path: '/pulls' }">Pull Requests</a></li>
  </ul>
</template>

<style lang="scss">
$c1: #042f40;

.nav-pills>li.active>a, .nav-pills>li.active>a:focus, .nav-pills>li.active>a:hover {
  background-color: $c1;
}

.nav-pills a {
  color: $c1;
}
</style>