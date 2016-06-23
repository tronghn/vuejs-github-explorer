module.exports = {
    template: require('./template.html'),
    data: function() {
        return {
            commitCount: 0,
            commits: [],
            pageNumber: 1,
            nextPageAvailable: false,
        };
    },
    props: {
        username: {
            type: String,
            required: true
        },
        repo: {
            type: String,
            required: true
        },
    },
    computed: {
        fullRepoUrl: function() {
            return this.username + '/' + this.repo;
        },
    },
    methods: {
        getCommits: function(pageNumber) {
            this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/commits?page=' + pageNumber,
                function(data) {
                    this.commits = data;
                    this.commitCount = data.length;
                });
            this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/commits?page=' + (pageNumber + 1),
                function(data) {
                    var tmpCommits = data;
                    this.nextPageAvailable = (tmpCommits.length > 0);
                });
        },
        prev: function() {
            if (this.pageNumber != 1) {
                this.pageNumber--;
                this.getCommits(this.pageNumber);
            }
        },
        next: function() {
            if (this.nextPageAvailable) {
                this.pageNumber++;
                this.getCommits(this.pageNumber);
            }
        }
    },
    watch: {
        repo: function(newVal, oldVal) {
            this.pageNumber = 1;
            this.getCommits(1);
        }
    },
    created: function() {
        if (this.username && this.repo) this.getCommits(1);
    },
};
