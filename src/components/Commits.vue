<template>
  <div class="row">
  <div class="col-md-12">
    <div class="text-center">
      <div class="btn-group" role="group">
        <button v-bind:class="{ 'disabled': pageNumber == 1 }" type="button" 
        class="btn btn-default" v-on:click="prev()">
          Prev 30
        </button>
        <button v-bind:class="{ 'disabled': !nextPageAvailable }" type="button" 
        class="btn btn-default" v-on:click="next()">
          Next 30
        </button>
      </div>
    </div>
    <table class="table">
      <caption>Showing {{ commitCount }} commits (page {{ pageNumber }})</caption>
      <thead>
        <tr>
          <th>Committer</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody v-for="commit in commits">
        <tr is="CommitsItem" :commit="commit" 
        class="animated" transition="fade" transition-mode="out-in">
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import CommitsItem from './CommitsItem.vue'
import Store from '../store'
import FullRepoProps from '../mixins/FullRepoProps'
import Pagination from '../mixins/Pagination'

export default {
  components: {
    CommitsItem
  },
  mixins: [FullRepoProps, Pagination],
  computed: {
    commits () {
      return this.data
    }
  },
  methods: {
    getData (pageNumber) {
      if (!this.nextPageAvailable) {
        Store.getCommits(this.fullRepoUrl, pageNumber)
        .then((response) => {
          this.data = response.json()
          this.dataCount = this.data.length
        })
      }
      this.getNextData(pageNumber)
    },
    getNextData (pageNumber) {
      Store.getCommits(this.fullRepoUrl, (pageNumber + 1))
      .then((response) => {
        this.dataNext = response.json()
        this.nextPageAvailable = (this.dataNext.length > 0)
      })
    },
    getPrevData (pageNumber) {
      Store.getCommits(this.fullRepoUrl, (pageNumber - 1))
      .then((response) => {
        this.dataPrev = response.json()
      })
    }
  }
}
</script>