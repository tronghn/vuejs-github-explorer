<template>
  <div class="text-center">
    <form id="changeRepoForm" @submit.prevent="changeRepo(fullRepoName)" class="form-inline">
      <div class="form-group">
        <div class="input-group">
          <input type="text" name="fullRepoName"  
            v-model="fullRepoName" class="form-control" placeholder="username/repository">
          <span class="input-group-btn">
            <button type="submit" class="btn btn-primary btn-repo">
              <span class="fa fa-search"></span>
            </button>
          </span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { setRepo } from '../vuex/actions'

export default {
  data () {
    return {
      fullRepoName: ''
    }
  },
  vuex: {
    actions: {
      changeRepo: setRepo
    }
  }
}
</script>

<style lang="scss">
$c1: #042f40;

#changeRepoForm {
  margin-bottom: 30px;
}

.form-control {
  border-radius: 6px 0px 0px 6px;
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

.form-control:focus, .form-control:active {
  border-color: #aaa;
  box-shadow: 0 0 2px $c1;
}
</style>