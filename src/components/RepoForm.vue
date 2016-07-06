<template>
  <div class="text-center">
    <form id="changeRepoForm" @submit.prevent="this.$parent.changeRepo()" class="form-inline">
      <div class="form-group">
        <input type="text" name="fullRepoName" @keyup.enter="this.$parent.changeRepo()" 
        v-model="fullRepoName" class="form-control" placeholder="username/repository">
        <button type="submit" class="btn btn-primary btn-repo">
          <span class="fa fa-search"></span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    fullRepoName: {
      type: String,
      required: true
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
</style>