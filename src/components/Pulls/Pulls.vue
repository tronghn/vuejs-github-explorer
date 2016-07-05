<template>
  <div>
    <div class="text-center">
      <state-switch :state.sync="state"></state-switch>
      <page-nav-btns 
      :next-page-available="nextPageAvailable" 
      :prev-page-available="prevPageAvailable"
      :page-number="pageNumber"></page-nav-btns>
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
</template>

<script>
import PullsItem from './PullsItem.vue'
import Api from '../../api'
import FullRepoProps from '../../mixins/FullRepoProps'
import Pagination from '../../mixins/Pagination'
import PageNavBtns from '../PageNavBtns.vue'
import StateSwitch from '../StateSwitch.vue'

export default {
  components: {
    PullsItem,
    PageNavBtns,
    StateSwitch
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
        Api.getPulls(this.fullRepoUrl, pageNumber, this.state)
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
      Api.getPulls(this.fullRepoUrl, (pageNumber + 1), this.state)
      .then((response) => {
        this.dataNext = response.json()
        this.nextPageAvailable = (this.dataNext.length > 0)
      })
      .catch((error) => {
        this.$dispatch('error', error)
      })
    },
    getPrevData (pageNumber) {
      Api.getPulls(this.fullRepoUrl, (pageNumber - 1), this.state)
      .then((response) => {
        this.dataPrev = response.json()
        this.prevPageAvailable = (this.dataPrev.length > 0)
      })
      .catch((error) => {
        this.$dispatch('error', error)
      })
    }
  },
  watch: {
    state () {
      this.reload()
    }
  }
}
</script>