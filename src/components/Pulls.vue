<template>
  <div class="row">
    <div class="col-md-12">
      <div class="text-center">
        <div class="span6">
          <input type="radio" id="open" value="open" v-model="state">
          <label for="open">Open</label>
          <input type="radio" id="closed" value="closed" v-model="state">
          <label for="closed">Closed</label>
        </div>
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
        <caption>Showing {{ dataCount }} Pull Requests (page {{ pageNumber }})</caption>
        <thead>
          <tr>
            <th>By</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody v-for="pull in pulls">
          <tr is="PullsItem" :pull="pull" 
          class="animated" transition="fade" transition-mode="out-in">
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PullsItem from './PullsItem.vue'
import Store from '../store'
import FullRepoProps from '../mixins/FullRepoProps'
import Pagination from '../mixins/Pagination'

export default {
  components: {
    PullsItem
  },
  mixins: [FullRepoProps, Pagination],
  data () {
    return {
      state: 'open'
    }
  },
  computed: {
    pulls () {
      return this.data
    }
  },
  methods: {
    getData (pageNumber) {
      if (!this.nextPageAvailable) {
        Store.getPulls(this.fullRepoUrl, pageNumber, this.state)
        .then((response) => {
          this.data = response.json()
          this.dataCount = this.data.length
        })
      }
      this.getNextData(pageNumber)
    },
    getNextData (pageNumber) {
      Store.getPulls(this.fullRepoUrl, (pageNumber + 1), this.state)
      .then((response) => {
        this.dataNext = response.json()
        this.nextPageAvailable = (this.dataNext.length > 0)
      })
    },
    getPrevData (pageNumber) {
      Store.getPulls(this.fullRepoUrl, (pageNumber - 1), this.state)
      .then((response) => {
        this.dataPrev = response.json()
      })
    }
  },
  watch: {
    state () {
      this.pageNumber = 1
      this.nextPageAvailable = false
      this.getData(1)
    }
  }
}
</script>