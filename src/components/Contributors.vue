<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      Top {{ contributorCount }} contributors
    </div>
    <div class="panel-body">
      <table class="table">
        <tbody>
          <tr v-for="contributor in contributors" class="animated" transition="fade" transition-mode="out-in">
            <td>
              <a href="{{ contributor.html_url }}"><img :src="contributor.avatar_url" width="20"></a>
              <a href="{{ contributor.html_url }}">{{ contributor.login }}</a>
            </td>
            <td class="text-right">
              {{ contributor.contributions }} contributions
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

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