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
import MyMixin from '../mixins'

export default {
  components: {
    CommitsItem
  },
  mixins: [MyMixin],
  data () {
    return {
      commitCount: 0,
      commitsPrev: [],
      commitsNext: [],
      pageNumber: 1,
      nextPageAvailable: false
    }
  },
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
          this.commitCount = this.data.length
        })
      }
      this.getNextCommits(pageNumber)
    },
    getNextCommits (pageNumber) {
      Store.getCommits(this.fullRepoUrl, (pageNumber + 1))
      .then((response) => {
        this.commitsNext = response.json()
        this.nextPageAvailable = (this.commitsNext.length > 0)
      })
    },
    getPrevCommits (pageNumber) {
      Store.getCommits(this.fullRepoUrl, (pageNumber - 1))
      .then((response) => {
        this.commitsPrev = response.json()
      })
    },
    prev () {
      if (this.pageNumber !== 1) {
        this.commitsNext = this.data
        this.data = this.commitsPrev
        this.getPrevCommits(this.pageNumber - 1)
        this.pageNumber--
        this.nextPageAvailable = true
      }
    },
    next () {
      if (this.nextPageAvailable) {
        this.commitsPrev = this.data
        this.data = this.commitsNext
        this.getNextCommits(this.pageNumber + 1)
        this.pageNumber++
      }
    }
  },
  watch: {
    repo () {
      this.pageNumber = 1
      this.nextPageAvailable = false
      this.getData(1)
    }
  },
  created () {
    if (this.username && this.repo) this.getData(1)
  }
}
</script>