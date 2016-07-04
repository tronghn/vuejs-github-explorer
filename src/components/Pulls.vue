<template>
  <div class="row">
    <div class="col-md-12">
      <div class="text-center">
        <!-- TODO: Should split state switching into own component -->
        <div class="span6">
          <input type="radio" id="open" value="open" v-model="state">
          <label class="select-radio" for="open">
            <i class="glyphicon glyphicon-retweet"></i> Open
          </label>
          <input type="radio" id="closed" value="closed" v-model="state">
          <label class="select-radio" for="closed">
            <i class="glyphicon glyphicon-ok"></i> Closed
          </label>
        </div>
        <!-- TODO: Should split pagination into own component -->
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

<style>
.select-radio {
  padding: 5px;
  color: #aaa;
}

.select-radio:hover {
  color: #555;
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + label {
  color: #000;
}
</style>

<script>
import PullsItem from './PullsItem.vue'
import Api from '../api'
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