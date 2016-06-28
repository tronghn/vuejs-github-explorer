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

export default {
  components: {
    CommitsItem
  },
  data () {
    return {
      commitCount: 0,
      commits: [],
      commitsPrev: [],
      commitsNext: [],
      pageNumber: 1,
      nextPageAvailable: false
    }
  },
  props: {
    username: {
      type: String,
      required: true
    },
    repo: {
      type: String,
      required: true
    }
  },
  computed: {
    fullRepoUrl () {
      return this.username + '/' + this.repo
    }
  },
  methods: {
    getCommits (pageNumber) {
      if (!this.nextPageAvailable) {
        Store.getCommits(this.fullRepoUrl, pageNumber)
        .then((response) => {
          this.commits = response.json()
          this.commitCount = this.commits.length
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
        this.commitsNext = this.commits
        this.commits = this.commitsPrev
        this.getPrevCommits(this.pageNumber - 1)
        this.pageNumber--
        this.nextPageAvailable = true
      }
    },
    next () {
      if (this.nextPageAvailable) {
        this.commitsPrev = this.commits
        this.commits = this.commitsNext
        this.getNextCommits(this.pageNumber + 1)
        this.pageNumber++
      }
    }
  },
  watch: {
    repo () {
      this.pageNumber = 1
      this.nextPageAvailable = false
      this.getCommits(1)
    }
  },
  created () {
    if (this.username && this.repo) this.getCommits(1)
  }
}
</script>