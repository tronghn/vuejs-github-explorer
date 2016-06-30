<template>
  <div>
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="text-center">
          <h1>Vue.js GitHub Explorer</h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="text-center">
          <form id="changeRepoForm" @submit.prevent="changeRepo()" class="form-inline">
            <div class="form-group">
              <label for="fullRepoName">Full Repository Name</label>
              <input type="text" name="fullRepoName" @keyup.enter="changeRepo()" v-model="fullRepoName" class="form-control" placeholder="username/repository">
            </div>
            <input type="submit" class="btn btn-default" value="Get repository">
          </form>
        </div>
        <ul class="nav nav-pills nav-justified">
          <li v-link-active><a v-link="{ path: '/files' }">Files</a></li>
          <li v-link-active><a v-link="{ path: '/contributors' }">Contributors</a></li>
          <li v-link-active><a v-link="{ path: '/commits' }">Commits</a></li>
          <li v-link-active><a v-link="{ path: '/pulls' }">Pull Requests</a></li>
        </ul>
        <hr>
        <div>
          <router-view :username="username" :repo="repo" class="animated" transition="fade" transition-mode="out-in"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fullRepoName: '',
      username: '',
      repo: ''
    }
  },
  methods: {
    changeRepo () {
      let splitData = this.fullRepoName.split('/')
      this.username = splitData[0]
      this.repo = splitData[1]

      console.group('Vue Data')
      console.log('fullRepoName:', this.fullRepoName)
      console.log('username:', this.username)
      console.log('repo:', this.repo)
      console.groupEnd('Vue Data')
    }
  }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
@import '../node_modules/font-awesome/css/font-awesome.min.css';
@import '/static/animate.min.css';

html {
  height: 100%;
}

body {
  padding-top: 30px;
}

#changeRepoForm {
  margin-bottom: 30px;
}

.animated {
  animation-duration: .5s;
}

</style>
