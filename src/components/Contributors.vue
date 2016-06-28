<template>
  <div class="row">
  <div class="col-md-12">
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
  </div>
  </div>
</template>

<script>
import Store from '../store'

export default {
  data () {
    return {
      contributorCount: 0,
      contributors: []
    }
  },
  props: {
    username: {
      type: String,
      required: true
    },
    repo: {
      type: String,
      required: true
    }
  },
  computed: {
    fullRepoUrl () {
      return this.username + '/' + this.repo
    }
  },
  methods: {
    getContributors () {
      Store.getContributors(this.fullRepoUrl)
      .then((response) => {
        this.contributors = response.json()
        this.contributorCount = this.contributors.length
      })
    }
  },
  watch: {
    repo () {
      this.getContributors()
    }
  },
  created () {
    if (this.username && this.repo) this.getContributors()
  }
}
</script>