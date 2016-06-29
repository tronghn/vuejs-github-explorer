export default {
  data () {
    return {
      data: []
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
  watch: {
    repo () {
      this.getData()
    }
  },
  created () {
    if (this.username && this.repo) this.getData()
  }
}
