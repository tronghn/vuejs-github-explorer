<template>
  <table class="table">
    <caption>Top {{ contributorCount }} contributors</caption>
    <thead>
      <tr>
        <th>Name</th>
        <th class="text-right">Contributions</th>
      </tr>
    </thead>
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
</template>

<script>
import Api from '../api'
import FullRepoProps from '../mixins/FullRepoProps'

export default {
  mixins: [FullRepoProps],
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
      Api.getContributors(this.fullRepoUrl)
      .then((response) => {
        this.data = response.json()
      })
      .catch((error) => {
        this.$dispatch('error', error)
      })
    }
  }
}
</script>