export default {
  data () {
    return {
      dataPrev: [],
      dataNext: [],
      pageNumber: 1,
      nextPageAvailable: false,
      prevPageAvailable: false
    }
  },
  computed: {
    dataCount () {
      return this.data.length
    }
  },
  methods: {
    prev () {
      if (this.pageNumber > 1) {
        this.prevPageAvailable = false // Disable prev button while getPrevData fetches data
        this.dataNext = this.data // Cache 'current' page in 'next'
        this.data = this.dataPrev // Assign 'prev' page as 'current'
        this.getPrevData(this.pageNumber - 1) // Prefetch a new 'prev' page (will re-enable prev button if successful)
        this.pageNumber--
        this.nextPageAvailable = true // Enable next button (we cached the 'current' page as the 'next')
      }
    },

    // Logic here is the same as above
    next () {
      if (this.nextPageAvailable) {
        this.nextPageAvailable = false
        this.dataPrev = this.data
        this.data = this.dataNext
        this.getNextData(this.pageNumber + 1)
        this.pageNumber++
        this.prevPageAvailable = true
      }
    },

    // Resets state. Called whenever the repository has changed
    reload () {
      this.pageNumber = 1
      this.prevPageAvailable = false
      this.nextPageAvailable = false
      this.getData(1)
    }
  },
  watch: {
    repo () {
      this.reload()
    }
  },
  created () {
    if (this.username && this.repo) this.getData(1)
  }
}
