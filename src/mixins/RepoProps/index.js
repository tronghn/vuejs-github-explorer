export default {
  data () {
    return {
      data: []
    }
  },
  vuex: {
    getters: {
      username: state => state.username,
      repo: state => state.repo
    }
  },
  watch: {
    username () {
      this.getData()
    },
    repo () {
      this.getData()
    }
  },
  created () {
    if (this.username && this.repo) this.getData()
  }
}
