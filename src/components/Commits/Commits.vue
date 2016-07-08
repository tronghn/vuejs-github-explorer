<template>
  <div>
    <div class="text-center">
      <page-nav-btns 
        :next-page-available="nextPageAvailable" 
        :prev-page-available="prevPageAvailable"
        :page-number="pageNumber"
        :prev-child="prev"
        :next-child="next"></page-nav-btns>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        Showing {{ dataCount }} commits (page {{ pageNumber }})
      </div>
      <div class="panel-body">
        <commits-item v-for="commit in commits" :commit="commit" class="animated" 
          transition="fade" transition-mode="out-in"></commits-item>
      </div>
    </div>
    <div class="text-center">
      <page-nav-btns 
        :next-page-available="nextPageAvailable" 
        :prev-page-available="prevPageAvailable"
        :page-number="pageNumber"
        :prev-child="prev"
        :next-child="next"></page-nav-btns>
    </div>
  </div>
</template>

<script>
import CommitsItem from './CommitsItem.vue'
import Api from '../../api'
import { setError } from '../../vuex/actions'
import RepoProps from '../../mixins/RepoProps'
import Pagination from '../../mixins/Pagination'
import PageNavBtns from '../PageNavBtns.vue'

export default {
  components: {
    CommitsItem,
    PageNavBtns
  },
  mixins: [RepoProps, Pagination],
  computed: {
    commits () {
      return this.data
    }
  },
  methods: {
    getData (pageNumber) {
      if (!this.nextPageAvailable) {
        Api.getCommits(this.username, this.repo, pageNumber)
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
      Api.getCommits(this.username, this.repo, (pageNumber + 1))
      .then((response) => {
        this.dataNext = response.json()
        this.nextPageAvailable = (this.dataNext.length > 0)
      })
      .catch((error) => {
        this.setError(error)
      })
    },
    getPrevData (pageNumber) {
      Api.getCommits(this.username, this.repo, (pageNumber - 1))
      .then((response) => {
        this.dataPrev = response.json()
        this.prevPageAvailable = (this.dataPrev.length > 0)
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