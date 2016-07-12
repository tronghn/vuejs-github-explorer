<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      Top {{ contributorCount }} contributors
    </div>
    <div class="panel-body row">
      <div class="col-md-4 row-mrgn-btm" v-for="(index, contributor) in contributors">
        <div class="pull-right">#{{ index + 1 }}</div>
        <a href="{{ contributor.html_url }}">
          <img class="pull-left cell-avatar" :src="contributor.avatar_url" width="40">
          <div class="content-heading cell-author">
            <strong>{{ contributor.login }}</strong>
          </div>
        </a>
        <small>
          {{ contributor.contributions }} contributions
        </small>
      </div>
    </div>
  </div>
</template>

<style>
.row-mrgn-btm {
  margin-bottom: 20px;
}
</style>

<script>
import Api from '../api'
import RepoProps from '../mixins/RepoProps'
import { setError } from '../vuex/actions'

export default {
  mixins: [RepoProps],
  computed: {
    contributors () {
      return this.data
    },
    contributorCount () {
      return this.data.length
    }
  },
  methods: {
    getData () {
      Api.getContributors(this.username, this.repo)
      .then((response) => {
        this.data = response.json()
      })
      .catch((error) => {
        this.setError(error)
      })
    }
  },
  vuex: {
    actions: {
      setError
    }
  }
}
</script>