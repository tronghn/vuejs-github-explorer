<template>
  <div>
    <div class="text-center">
      <state-switch></state-switch> <!-- TODO: sync will be removed in Vue 2.0 -->
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
        <transition-group name="custom-classes-transition"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in">
          <pull v-show="pulls.length > 0" v-for="pull in pulls" :key="pull.number" :pull="pull"></pull>
        </transition-group>
        <div v-show="pulls.length <= 0" class="text-center" >
          <div v-show="state === 'open'">
            <h3>There aren't any open pull requests</h3>
          </div>
          <div v-show="state === 'closed'">
            <h3>There aren't any closed pull requests</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pull from '../Pull.vue'
import Api from '../../api'
import { setError } from '../../vuex/actions'
import RepoProps from '../../mixins/RepoProps'
import Pagination from '../../mixins/Pagination'
import PageNavBtns from '../PageNavBtns.vue'
import StateSwitch from '../StateSwitch.vue'

export default {
  components: {
    Pull,
    PageNavBtns,
    StateSwitch
  },
  mixins: [RepoProps, Pagination],
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
          this.data = response.body
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
        this.dataNext = response.body
        this.nextPageAvailable = (this.dataNext.length > 0)
      })
      .catch((error) => {
        this.setError(error)
      })
    },
    getPrevData (pageNumber) {
      Api.getPulls(this.username, this.repo, (pageNumber - 1), this.state)
      .then((response) => {
        this.dataPrev = response.body
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
    },
    getters: {
      state: state => state.switchState
    }
  }
}
</script>