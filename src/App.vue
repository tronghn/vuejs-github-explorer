<template>
  <div>
    <div class="alert alert-danger animated" role="alert" v-if="errorState" 
      transition="slide" transition-mode="out-in">
      <p><strong>Oh no!</strong> An error occured: {{ errorMsg }}</p>
    </div>
    <header-bar></header-bar>
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="text-center">
          <form id="changeRepoForm" @submit.prevent="changeRepo()" class="form-inline">
            <div class="form-group">
              <input type="text" name="fullRepoName" @keyup.enter="changeRepo()" 
              v-model="fullRepoName" class="form-control" placeholder="username/repository">
              <button type="submit" class="btn btn-primary btn-repo">
                <i class="fa fa-search"></i>
              </button>
            </div>
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
          <router-view :username="username" :repo="repo" 
          class="animated" transition="fade" transition-mode="out-in"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue'

export default {
  components: {
    HeaderBar
  },
  data () {
    return {
      fullRepoName: '',
      username: '',
      repo: '',
      errorState: false,
      errorMsg: ''
    }
  },
  methods: {
    changeRepo () {
      this.errorState = false
      let splitData = this.fullRepoName.split('/')
      this.username = splitData[0]
      this.repo = splitData[1]
      if (this.repo === undefined) this.$emit('error', 'Invalid input')
      console.group('Vue Data')
      console.log('fullRepoName:', this.fullRepoName)
      console.log('username:', this.username)
      console.log('repo:', this.repo)
      console.groupEnd('Vue Data')
    }
  },
  events: {
    'error': function (msg) {
      this.errorState = true
      if (typeof msg === 'string') {
        this.errorMsg = msg
      } else {
        this.errorMsg = JSON.parse(msg.body).message
      }
      setTimeout(() => {
        this.errorState = false
      }, 4000)
    }
  }
}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
/* @import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'; */
@import '../node_modules/font-awesome/css/font-awesome.min.css';
@import '/static/animate.min.css';
@import url(http://fonts.googleapis.com/css?family=Roboto:100);

$c1: #042f40;

html {
  height: 100%;
}

body {
  font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
}


#changeRepoForm {
  margin-bottom: 30px;
}

.animated {
  animation-duration: .5s;
}

.alert {
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  text-align: center;
}

.form-control {
  border-radius: 6px 0px 0px 6px;
}

.btn-repo[type="submit"] {
    margin-left: -4px;
}

.btn-repo {
  border-radius: 0px 6px 6px 0px;
  border-color: $c1;
  background-color: $c1;
}

.btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open .dropdown-toggle.btn-primary {
  background-color: lighten($c1, 10%);
  border-color: $c1;
 }

.form-control:focus {
  border-color: $c1;
  box-shadow: 0 0 5px rgba(4, 47, 64, 0.5);
}

.nav-pills>li.active>a, .nav-pills>li.active>a:focus, .nav-pills>li.active>a:hover {
  background-color: $c1;
}

.nav-pills a {
  color: $c1;
}

</style>
