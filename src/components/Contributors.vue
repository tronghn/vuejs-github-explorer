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
import MyMixin from '../mixins'

export default {
  mixins: [MyMixin],
  data () {
    return {
      contributorCount: 0
    }
  },
  computed: {
    contributors () {
      return this.data
    }
  },
  methods: {
    getData () {
      Store.getContributors(this.fullRepoUrl)
      .then((response) => {
        this.data = response.json()
        this.contributorCount = this.data.length
      })
    }
  }
}
</script>