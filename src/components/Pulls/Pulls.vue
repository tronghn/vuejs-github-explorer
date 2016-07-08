<template>
  <div>
    <div class="text-center">
      <state-switch :state.sync="state"></state-switch> <!-- TODO: sync will be removed in Vue 2.0 -->
      <page-nav-btns 
      :next-page-available="nextPageAvailable" 
      :prev-page-available="prevPageAvailable"
      :page-number="pageNumber"
      :prev-child="prev"
      :next-child="next"></page-nav-btns>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        Showing {{ dataCount }} Pull Requests (page {{ pageNumber }})
      </div>
      <div class="panel-body">
        <table class="table">
          <caption></caption>
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
  </div>
</template>

<script>
import PullsItem from './PullsItem.vue'
import Api from '../../api'
import { setError } from '../../vuex/actions'
import RepoProps from '../../mixins/RepoProps'
import Pagination from '../../mixins/Pagination'
import PageNavBtns from '../PageNavBtns.vue'
import StateSwitch from '../StateSwitch.vue'

export default {
  components: {
    PullsItem,
    PageNavBtns,
    StateSwitch
  },
  mixins: [RepoProps, Pagination],
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
        Api.getPulls(this.username, this.repo, pageNumber, this.state)
        .then((response) => {
          this.data = response.json()
        })
        .catch((error) => {
          this.setError(error)
        })
      }
      this.getNextData(pageNumber)
    },
    getNextData (pageNumber) {
      Api.getPulls(this.username, this.repo, (pageNumber + 1), this.state)
      .then((response) => {
        this.dataNext = response.json()
        this.nextPageAvailable = (this.dataNext.length > 0)
      })
      .catch((error) => {
        this.setError(error)
      })
    },
    getPrevData (pageNumber) {
      Api.getPulls(this.username, this.repo, (pageNumber - 1), this.state)
      .then((response) => {
        this.dataPrev = response.json()
        this.prevPageAvailable = (this.dataPrev.length > 0)
      })
      .catch((error) => {
        this.setError(error)
      })
    }
  },
  watch: {
    state () {
      this.reload()
    }
  },
  vuex: {
    actions: {
      setError
    }
  }
}
</script>