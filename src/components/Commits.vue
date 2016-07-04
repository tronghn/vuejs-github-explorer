<template>
  <div class="row">
  <div class="col-md-12">
    <div class="text-center">
      <!-- TODO: Should split pagination (incl. CSS) into own component -->
      <div class="btn-group" role="group">
        <button v-bind:class="{ 'disabled': !prevPageAvailable || pageNumber === 1 }" 
        type="button" class="btn btn-default" @click="prev()">
          Prev 30
        </button>
        <button v-bind:class="{ 'disabled': !nextPageAvailable }" type="button" 
        class="btn btn-default" @click="next()">
          Next 30
        </button>
      </div>
    </div>
    <table class="table">
      <caption>Showing {{ dataCount }} commits (page {{ pageNumber }})</caption>
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
import Api from '../api'
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
        Api.getCommits(this.fullRepoUrl, pageNumber)
        .then((response) => {
          this.data = response.json()
        })
        .catch((error) => {
          this.$dispatch('error', error)
        })
      }
      this.getNextData(pageNumber)
    },
    getNextData (pageNumber) {
      Api.getCommits(this.fullRepoUrl, (pageNumber + 1))
      .then((response) => {
        this.dataNext = response.json()
        this.nextPageAvailable = (this.dataNext.length > 0)
      })
      .catch((error) => {
        this.$dispatch('error', error)
      })
    },
    getPrevData (pageNumber) {
      Api.getCommits(this.fullRepoUrl, (pageNumber - 1))
      .then((response) => {
        this.dataPrev = response.json()
        this.prevPageAvailable = (this.dataPrev.length > 0)
      })
      .catch((error) => {
        this.$dispatch('error', error)
      })
    }
  }
}
</script>