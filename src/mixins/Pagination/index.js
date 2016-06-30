export default {
  data () {
    return {
      dataPrev: [],
      dataNext: [],
      dataCount: 0,
      pageNumber: 1,
      nextPageAvailable: false
    }
  },
  methods: {
    prev () {
      if (this.pageNumber !== 1) {
        this.dataNext = this.data
        this.data = this.dataPrev
        this.getPrevData(this.pageNumber - 1)
        this.pageNumber--
        this.nextPageAvailable = true
      }
    },
    next () {
      if (this.nextPageAvailable) {
        this.dataPrev = this.data
        this.data = this.dataNext
        this.getNextData(this.pageNumber + 1)
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
